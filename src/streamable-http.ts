/**
 * StreamableHTTP server setup for HTTP-based MCP communication using Hono
 */
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { v4 as uuid } from 'uuid';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { JSONRPCError } from '@modelcontextprotocol/sdk/types.js';
import { toReqRes, toFetchResponse } from 'fetch-to-node';
import { Config } from './config.js';

// Constants
const JSON_RPC = '2.0';

/**
 * StreamableHTTP MCP Server handler
 */
class MCPStreamableHttpServer {
  server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  /**
   * Handle GET requests (typically used for static files)
   */
  async handleGetRequest(c: any) {
    console.error(
      'GET request received - StreamableHTTP transport only supports POST',
    );
    return c.text('Method Not Allowed', 405, {
      Allow: 'POST',
    });
  }

  /**
   * Handle POST requests (all MCP communication)
   */
  async handlePostRequest(c: any) {
    try {
      const transport: StreamableHTTPServerTransport =
        new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
      await this.server.connect(transport);

      const body = await c.req.json();

      // Convert Fetch Request to Node.js req/res
      const { req, res } = toReqRes(c.req.raw);

      await transport.handleRequest(req, res, body);
      res.on('close', () => {
        console.log('Request closed');
        transport.close();
        this.server.close();
      });

      // Convert Node.js response back to Fetch Response
      return toFetchResponse(res);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      return c.json(this.createErrorResponse('Internal server error.'), 500);
    }
  }

  /**
   * Create a JSON-RPC error response
   */
  private createErrorResponse(message: string): JSONRPCError {
    return {
      jsonrpc: JSON_RPC,
      error: {
        code: -32000,
        message: message,
      },
      id: uuid(),
    };
  }
}

/**
 * Sets up a web server for the MCP server using StreamableHTTP transport
 *
 * @param server The MCP Server instance
 * @param port The port to listen on (default: 3000)
 * @returns The Hono app instance
 */
export async function setupStreamableHttpServer(server: Server, port = 3000) {
  // Create Hono app
  const app = new Hono();

  // Enable CORS
  app.use('*', cors());

  // Create MCP handler
  const mcpHandler = new MCPStreamableHttpServer(server);

  // Add a simple health check endpoint
  app.get('/health', (c) => {
    return c.json({
      status: 'OK',
      server: Config.SERVER_NAME,
      version: Config.SERVER_VERSION,
    });
  });

  // Main MCP endpoint supporting both GET and POST
  app.get('/mcp', (c) => mcpHandler.handleGetRequest(c));
  app.post('/mcp', (c) => mcpHandler.handlePostRequest(c));

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
      console.error(
        `MCP StreamableHTTP Server running at http://localhost:${info.port}`,
      );
      console.error(`- MCP Endpoint: http://localhost:${info.port}/mcp`);
      console.error(`- Health Check: http://localhost:${info.port}/health`);
    },
  );

  return app;
}
