#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import openApiSpec from './moralis.json' with { type: "json" };
import { config } from 'dotenv';
import { HttpClient, HttpClientError } from "./http-client.js";
import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { NewToolMethod, OpenAPIToMCPConverter } from "./parser.js";
config()

export class MoralisServer extends Server {
  private httpClient: HttpClient
  private tools: Map<string, NewToolMethod>
  private openApiLookup: Map<string, OpenAPIV3.OperationObject & { method: string, path: string }>
  constructor() {
    super(
      {
        name: "moralis",
        version: "0.1.0",
      },
      {
        capabilities: {
          // resources: {},
          tools: {},
          // prompts: {},
        },
      })
    const baseUrl = 'https://deep-index.moralis.io/api/v2.2'
    if (!process.env.MORALIS_API_KEY){
      throw new Error('MORALIS_API_KEY is not set')
    }
    this.httpClient = new HttpClient({
      baseUrl,
      headers: {
        'x-api-key': process.env.MORALIS_API_KEY
      }
    }, openApiSpec as OpenAPIV3_1.Document)

    // Convert OpenAPI spec to MCP tools
    const converter = new OpenAPIToMCPConverter(openApiSpec as OpenAPIV3_1.Document)
    const { openApiLookup } = converter.convertToMCPTools();
    this.tools = new Map();

    this.openApiLookup = openApiLookup;

    for (const tool of openApiLookup.values()) {
      this.tools.set(tool.operationId as string, {
        description: tool.description || '',
        inputSchema: (tool.parameters || { type: 'object' }) as any,
        name: tool.operationId as string,
        returnSchema: { type: 'object' } 
      })
    }   
    this.setUpTools()    
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.connect(transport);

  }
  private findOperation(operationId: string): OpenAPIV3.OperationObject & { method: string, path: string } | null {
    const operation = this.openApiLookup.get(operationId) ?? null
    return operation
  }
  private setUpTools() {
    this.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [];

      // Add methods as separate tools to match the MCP format
      for (const [_toolName, method] of this.tools) {
        tools.push({
          name: `${method.name}`,
          description: method.description,
          inputSchema: method.inputSchema as Tool['inputSchema']
        });
      }
      return { tools };
    });

    // Handle tool calling
    this.setRequestHandler(CallToolRequestSchema, async request => {
      // console.log('calling tool', request.params)
      const { name, arguments: params } = request.params

      // Find the operation in OpenAPI spec
      const operation = this.findOperation(`API-${name}`)
      // console.log('operations', this.openApiLookup)
      if (!operation) {
        throw new Error(`Method ${name} not found`)
      }

      try {
        // Execute the operation
        const response = await this.httpClient.executeOperation(
          operation,
          params
        )

        // Convert response to MCP format
        return {
          content: [
            {
              type: 'text', // currently this is the only type that seems to be used by mcp server
              text: JSON.stringify(response.data) // TODO: pass through the http status code text?
            }
          ]
        };
      } catch (error) {
        console.error('Error in tool call', error);
        if (error instanceof HttpClientError) {
          console.error('HttpClientError encountered, returning structured error', error)
          const data = error.data?.response?.data ?? error.data ?? {};
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: "error", // TODO: get this from http status code?
                  ...(typeof data === 'object' ? data : { data: data }),
                })
              }
            ]
          };
        }
        throw error;
      }
    })
  }
}
const server = new MoralisServer()

server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
