<div align="center">
  <p>
    <a align="center" href="https://developers.moralis.com/" target="_blank">
      <img src="https://raw.githubusercontent.com/MoralisWeb3/moralis-analytics-js/main/assets/moralis-logo.svg" alt="Moralis Analytics" height=200/>
    </a>
    <h1 align="center">Moralis MCP Server</h1>
  </p>
  <p>
    A TypeScript-based MCP server that implements a wrapper to the Moralis rest API.
  </p>
  <br/>
</div>

![smithery badge](https://smithery.ai/badge/@MoralisWeb3/moralis-mcp-server)

## 🧠 Overview
The **Moralis MCP Server** is a local or cloud-deployable engine that connects natural language prompts to real blockchain insights — allowing AI models to query wallet activity, token metrics, dapp usage, and more without custom code or SQL.

Built on top of the [Model Context Protocol](https://github.com/modelcontextprotocol/spec), this server makes it easy for LLMs to talk to Moralis APIs in a consistent, explainable, and extensible way.

- 🔗 Fully pluggable: swap LLMs, customize retrieval logic, or extend with your own tools
- 🧱 Works with OpenAI, Claude, and open-source models
- 🧠 Powers agents, devtools, bots, dashboards, and beyond

## ⚙️ Common Use Cases

- 🤖 AI agents & assistants: “What’s this wallet’s trading history?”
- 📈 Devtools: on-chain QA, testing, CLI integrations
- 📊 Dashboards: natural language to charts/data
- 📉 Monitoring: alerting & summarization for tokens/dapps
- 🧠 Trading bots: LLM-driven strategies with real blockchain grounding

## 🔐 Getting an API Key

To use this MCP server with Moralis APIs, you'll need an API key:

1. Go to [Moralis](https://admin.moralis.com) developer portal
2. Sign up and log in
3. Navigate to your [API Keys page](https://admin.moralis.com/api-keys) from the main menu
4. Copy your key and configure it in your config file (see next section), or set it in your environment:
```bash
export MORALIS_API_KEY=<your_api_key>
```
> ⚠️ Note: Some features and endpoints require a Moralis paid plan. For full access and production-grade performance, we recommend signing up for a paid tier.

## 🚀 Usage with a Client

To connect the MCP server to a compatible client (e.g. Claude Desktop, OpenAI-compatible agents, VS Code extensions, etc.), configure the client to launch the server as a subprocess.

Most clients support a simple config file - for example, you might create a file like mcp.json in the client’s configuration directory with the following:

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

This setup can be adapted for any client that supports MCP servers. Replace the example values with those specific to your use case.

### Installing via Smithery

To install Moralis API Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@MoralisWeb3/moralis-mcp-server):

```bash
npx -y @smithery/cli install @MoralisWeb3/moralis-mcp-server --client claude
```


## 🖥️ Using as a Server

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

## 🛠 Development

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

### 🐞 Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.


## 💬 Example Prompts

Here are some example prompts you can use with your AI agent through the MCP server:

```
- What’s the current price of PEPE and Ethereum?

- What is the current trading sentiment for TOSHI on Base — bullish or bearish?

- Show me the NFTs owned by `vitalik.eth` on Base.

- What tokens does wallet `0xab71...4321` hold?

- When was wallet 0xabc...123 first and last seen active on Ethereum, Base, and Polygon?

- Show me the complete transaction history for 0xabc...123 across Ethereum, Base, and BNB Chain.

- What is the current net worth in USD of wallet 0xabc...123?

- Find wallet addresses that are likely associated with Coinbase.

- Analyze the current holder distribution of SPX6900 — include whales, small holders, and recent growth trends.

- Show me PEPE’s daily OHLC data for the past 30 days and provide a summary of the trend — is it bullish or bearish?
```

These prompts are parsed and mapped to structured Moralis API calls using the MCP method registry.

> 💡 You can also build custom prompts based on any supported method.


## 📚 API Reference

The Moralis MCP Server wraps and translates prompts into Moralis REST API calls. You can explore the underlying API surface here:

🔗 **[Moralis Swagger Docs (v2.2)](https://deep-index.moralis.io/api-docs-2.2/)**

This documentation covers endpoints for:

- Token pricing
- Wallet activity
- NFT metadata and ownership
- Transfers and transactions
- And more


