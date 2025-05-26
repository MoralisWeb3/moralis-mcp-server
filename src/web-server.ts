/**
 * Web server setup for HTTP-based MCP communication using Hono
 */
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { streamSSE } from 'hono/streaming';
import { v4 as uuid } from 'uuid';
import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  type JSONRPCMessage,
  JSONRPCMessageSchema,
} from '@modelcontextprotocol/sdk/types.js';
import type { Context } from 'hono';
import type { SSEStreamingApi } from 'hono/streaming';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { Config } from './config.js';

interface AuthInfo {
  token?: string;
}

/**
 * Custom SSE Transport implementation using Hono's streaming API
 */
class SSETransport implements Transport {
  private _sessionId: string;
  private stream: SSEStreamingApi;
  private messageUrl: string;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage, extra?: { authInfo?: AuthInfo }) => void;

  constructor(messageUrl: string, stream: SSEStreamingApi) {
    this._sessionId = uuid();
    this.stream = stream;
    this.messageUrl = messageUrl;

    // Set up stream abort handler
    this.stream.onAbort(() => {
      console.error(`SSE connection aborted for session ${this._sessionId}`);
      this.close();
    });
  }

  get sessionId(): string {
    return this._sessionId;
  }

  async start(): Promise<void> {
    if (this.stream.closed) {
      throw new Error('SSE transport already closed!');
    }

    // Send the endpoint information
    await this.stream.writeSSE({
      event: 'endpoint',
      data: `${this.messageUrl}?sessionId=${this._sessionId}`,
    });

    // Send session ID and connection info in a format the client can understand
    await this.stream.writeSSE({
      event: 'session',
      data: JSON.stringify({
        type: 'session_id',
        session_id: this._sessionId,
      }),
    });

    // Send a welcome notification
    await this.send({
      jsonrpc: '2.0',
      method: 'notification',
      params: {
        type: 'welcome',
        clientInfo: {
          sessionId: this._sessionId,
          serverName: Config.SERVER_NAME,
          serverVersion: Config.SERVER_VERSION,
        },
      },
    });
  }

  async handlePostMessage(c: Context): Promise<Response> {
    if (this.stream?.closed) {
      return c.text('SSE connection closed', 400);
    }

    try {
      // Parse and validate the message
      const body = await c.req.json();

      try {
        // Parse and validate the message
        const parsedMessage = JSONRPCMessageSchema.parse(body);

        // Forward to the message handler
        if (this.onmessage) {
          this.onmessage(parsedMessage, { authInfo: { token: c.req.header('X-API-Key') } });
          return c.text('Accepted', 202);
        } else {
          return c.text('No message handler defined', 500);
        }
      } catch (error) {
        if (this.onerror) {
          this.onerror(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
        console.error('Error parsing message:', error);
        return c.text('Invalid message format', 400);
      }
    } catch (error) {
      if (this.onerror) {
        this.onerror(error instanceof Error ? error : new Error(String(error)));
      }
      console.error('Error processing request:', error);
      return c.text('Error processing message', 400);
    }
  }

  async close(): Promise<void> {
    if (this.stream && !this.stream.closed) {
      this.stream.abort();
    }

    if (this.onclose) {
      this.onclose();
    }
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (this.stream.closed) {
      throw new Error('Not connected');
    }

    await this.stream.writeSSE({
      event: 'message',
      data: JSON.stringify(message),
    });
  }
}

/**
 * Sets up a web server for the MCP server using Server-Sent Events (SSE)
 *
 * @param server The MCP Server instance
 * @param port The port to listen on (default: 3000)
 * @returns The Hono app instance
 */
export async function setupWebServer(server: Server, port = 3000) {
  // Create Hono app
  const app = new Hono();

  // Enable CORS
  app.use('*', cors());

  // Store active SSE transports by session ID
  const transports: { [sessionId: string]: SSETransport } = {};

  // Add a simple health check endpoint
  app.get('/health', (c) => {
    return c.json({
      status: 'OK',
      server: Config.SERVER_NAME,
      version: Config.SERVER_VERSION,
    });
  });

  // SSE endpoint for clients to connect to
  app.get('/sse', (c) => {
    return streamSSE(c, async (stream) => {
      // Create SSE transport
      const transport = new SSETransport('/api/messages', stream);
      const sessionId = transport.sessionId;

      console.error(`New SSE connection established: ${sessionId}`);

      // Store the transport
      transports[sessionId] = transport;

      // Set up cleanup on transport close
      transport.onclose = () => {
        console.error(`SSE connection closed for session ${sessionId}`);
        delete transports[sessionId];
      };

      // Make the transport available to the MCP server
      try {
        transport.onmessage = async (message: JSONRPCMessage) => {
          try {
            // The server will automatically send a response via the transport
            // if the message has an ID (i.e., it's a request, not a notification)
          } catch (error) {
            console.error('Error handling MCP message:', error);
          }
        };

        // Connect to the MCP server
        await server.connect(transport);
      } catch (error) {
        console.error(
          `Error connecting transport for session ${sessionId}:`,
          error,
        );
      }

      // Keep the stream open until aborted
      while (!stream.closed) {
        await stream.sleep(1000);
      }
    });
  });

  // API endpoint for clients to send messages
  app.post('/api/messages', async (c) => {
    const sessionId = c.req.query('sessionId');

    if (!sessionId) {
      return c.json({ error: 'Missing sessionId query parameter' }, 400);
    }

    const transport = transports[sessionId];

    if (!transport) {
      return c.json(
        { error: 'No active session found with the provided sessionId' },
        404,
      );
    }

    return transport.handlePostMessage(c);
  });

  // Static files for the web client (if any)
  app.get('/*', async (c) => {
    const filePath = c.req.path === '/' ? '/index.html' : c.req.path;
    try {
      // Use Node.js fs to serve static files
      const fs = await import('node:fs');
      const path = await import('node:path');
      const { fileURLToPath } = await import('node:url');

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const publicPath = path.join(__dirname, '..', '..', 'public');
      const fullPath = path.join(publicPath, filePath);

      // Simple security check to prevent directory traversal
      if (!fullPath.startsWith(publicPath)) {
        return c.text('Forbidden', 403);
      }

      try {
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
          const content = fs.readFileSync(fullPath);

          // Set content type based on file extension
          const ext = path.extname(fullPath).toLowerCase();
          let contentType = 'text/plain';

          switch (ext) {
            case '.html':
              contentType = 'text/html';
              break;
            case '.css':
              contentType = 'text/css';
              break;
            case '.js':
              contentType = 'text/javascript';
              break;
            case '.json':
              contentType = 'application/json';
              break;
            case '.png':
              contentType = 'image/png';
              break;
            case '.jpg':
              contentType = 'image/jpeg';
              break;
            case '.svg':
              contentType = 'image/svg+xml';
              break;
          }

          return new Response(content, {
            headers: { 'Content-Type': contentType },
          });
        }
      } catch (err) {
        // File not found or other error
        return c.text('Not Found', 404);
      }
    } catch (err) {
      console.error('Error serving static file:', err);
      return c.text('Internal Server Error', 500);
    }

    return c.text('Not Found', 404);
  });

  // Start the server
  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.error(`MCP Web Server running at http://localhost:${info.port}`);
      console.error(`- SSE Endpoint: http://localhost:${info.port}/sse`);
      console.error(
        `- Messages Endpoint: http://localhost:${info.port}/api/messages?sessionId=YOUR_SESSION_ID`,
      );
      console.error(`- Health Check: http://localhost:${info.port}/health`);
    },
  );

  return app;
}
