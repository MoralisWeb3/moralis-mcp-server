#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Config } from './config.js';
import { serverSetup } from './server.js';
import { setupWebServer } from './web-server.js';
import { setupStreamableHttpServer } from './streamable-http.js';

enum TransportType {
  STDIO = 'stdio',
  WEB = 'web',
  STREAMABLE_HTTP = 'streamable-http',
}

async function startStdioServer() {
  // Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    (await serverSetup()).connect(transport);
    console.error(
      `${Config.SERVER_NAME} Server (v${Config.SERVER_VERSION}) running on stdio`,
    );
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
}

async function startWebServer() {
  // Set up Web Server transport
  try {
    await setupWebServer(await serverSetup(), 3000);
  } catch (error) {
    console.error('Error setting up web server:', error);
    process.exit(1);
  }
}

async function startStreamableHttpServer() {
  // Set up StreamableHTTP transport
  try {
    await setupStreamableHttpServer(await serverSetup(), 3000);
  } catch (error) {
    console.error('Error setting up StreamableHTTP server:', error);
    process.exit(1);
  }
}

/**
 * Main function to start the server
 */
async function main(transport: string) {
  switch (transport) {
    case TransportType.STDIO:
      await startStdioServer();
      break;
    case TransportType.WEB:
      await startWebServer();
      break;
    case TransportType.STREAMABLE_HTTP:
      await startStreamableHttpServer();
      break;
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
  console.error('Shutting down MCP server...');
  process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// accepts an optional argument --transport to specify the transport type
let transport = process.env.MCP_TRANSPORT || TransportType.STDIO;
const args = process.argv.slice(2);
if (args.length > 0) {
  const transportType = args[0];
  if (transportType === '--transport' && args[1]) {
    transport = args[1];
  } else {
    console.error(
      'Invalid argument. Use --transport followed by the transport type (stdio, web, streamable-http).',
    );
    process.exit(1);
  }
}

// Start the server
main(transport).catch((error) => {
  console.error('Fatal error in main execution:', error);
  process.exit(1);
});
