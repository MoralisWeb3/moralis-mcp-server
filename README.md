<div align="center">
    <a align="center" href="https://moralis.io" target="_blank">
      <img src="https://raw.githubusercontent.com/MoralisWeb3/moralis-analytics-js/main/assets/moralis-logo.svg" alt="Moralis Analytics" height=200/>
    </a>
    <h1 align="center">Moralis MCP Server</h1>
  <p>
  </p>
  <p>
    A TypeScript-based MCP server that implements a wrapper to the Moralis rest API.
  </p>
  <br/>
</div>

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

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "moralis-test": {
      "command": "/path/to/moralis/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
