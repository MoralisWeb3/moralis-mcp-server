<div align="center">
  <p>
    <a align="center" href="https://moralis.io" target="_blank">
      <img src="https://raw.githubusercontent.com/MoralisWeb3/moralis-analytics-js/main/assets/moralis-logo.svg" alt="Moralis Analytics" height=200/>
    </a>
    <h1 align="center">Moralis MCP Server</h1>
  </p>
  <p>
    A TypeScript-based MCP server that implements a wrapper to the Moralis rest API.
  </p>
  <br/>
</div>

## Usage with a Client

To use this server with a client, you need to configure the client to communicate with the MCP server. Below is an example configuration for a generic client setup:

### Step 1: Create a Configuration File

Create a configuration file in the appropriate directory for your client. For example, if your client uses a configuration directory, you might create a file named `mcp.json` in that directory.

### Example Configuration

```json
{
  "mcpServers": {
    "serverName": {
      "command": "npx @moralisweb3/api-mcp-server",
      "args": [],
      "env": {
        "MORALIS_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

### Notes

This setup can be adapted for any client that supports MCP servers. Replace the example values with those specific to your use case.

## Using as a server

The server accepts an optional `--transport` argument to specify the transport type. The available transport types are:

- `stdio`: Communicates over standard input/output (default).
- `web`: Starts a HTTP server for communication.
- `streamable-http`: Starts an HTTP server with streamable endpoints.

### Examples

1. **Using the default `stdio` transport**:
  ```bash
  moralis-api-mcp --transport stdio
  ```

2. **Using the `web` transport**:
  ```bash
  moralis-api-mcp --transport web
  ```

  This will start a HTTP server. You can send requests to the server using tools like `curl` or Postman.

3. **Using the `streamable-http` transport**:
  ```bash
  moralis-api-mcp --transport streamable-http
  ```

  This will start an HTTP server. You can send requests to the server using tools like `curl` or Postman.

### Notes
- Ensure that the required environment variables (e.g., `MORALIS_API_KEY`) are set before starting the server.
- For custom configurations, you can pass additional arguments or environment variables as needed.
- Refer to the documentation for more details on each transport type.

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
