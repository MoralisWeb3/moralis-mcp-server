#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest,
  ListPromptsRequestSchema,
  type Prompt,
  GetPromptRequestSchema,
  type GetPromptRequest,
  type GetPromptResult,
} from '@modelcontextprotocol/sdk/types.js';
import SwaggerParser from '@apidevtools/swagger-parser';
import { extractToolsFromApi } from './parser/index.js';
import { Config } from './config.js';
import { getSpec } from './utils/get-spec.js';
import type { OpenAPIV3DocumentX } from './types/open-api-document-x.js';
import { executeApiTool, type McpToolDefinition } from './utils/execute-api-tool.js';

const spec = (await getSpec(Config.API_SPEC_URL)) as OpenAPIV3DocumentX;

Config.SERVER_NAME = spec.info.title;
Config.SERVER_VERSION = spec.info.version;

/**
 * MCP Server instance
 */
export const server = new Server(
  { name: Config.SERVER_NAME, version: Config.SERVER_VERSION },
  { capabilities: { tools: {}, prompts: {} } },
);

const api = (await SwaggerParser.dereference(spec)) as OpenAPIV3DocumentX;
const tools = extractToolsFromApi(api);
const blacklist = Array.isArray(api['x-mcp-blacklist'])
  ? api['x-mcp-blacklist'].map((e) => e.toLowerCase())
  : [];

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map();
for (const tool of tools) {
  if (blacklist.includes(tool.name)) {
    continue;
  }

  toolDefinitionMap.set(tool.name, tool);
}

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes = {
  ApiKeyAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'X-API-Key',
    'x-default': 'test',
  },
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(
    (def) => ({
      name: def.name,
      description: def.description,
      inputSchema: def.inputSchema,
    }),
  );
  return { tools: toolsForClient };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest, c): Promise<CallToolResult> => {
    const { name: toolName, arguments: toolArgs } = request.params;
    const toolDefinition = toolDefinitionMap.get(toolName);
    if (!toolDefinition) {
      console.error(`Error: Unknown tool requested: ${toolName}`);
      return {
        content: [
          { type: 'text', text: `Error: Unknown tool requested: ${toolName}` },
        ],
      };
    }
    return executeApiTool(
      toolName,
      toolDefinition,
      toolArgs ?? {},
      securitySchemes,
      c.authInfo?.token,
    );
  },
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  const promptsForClient: Prompt[] = [];
  for (const tool of toolDefinitionMap.values()) {
    if (tool.prompt) {
      promptsForClient.push({
        name: tool.name,
        description: tool.prompt,
        arguments: tool.parameters,
      });
    }
  }

  return { prompts: promptsForClient };
});

server.setRequestHandler(
  GetPromptRequestSchema,
  async (request: GetPromptRequest, c): Promise<GetPromptResult> => {
    const { name: toolName, arguments: toolArgs } = request.params;
    const toolDefinition = toolDefinitionMap.get(toolName);
    if (!toolDefinition) {
      console.error(`Error: Unknown prompt requested: ${toolName}`);
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Error: Unknown prompt requested: ${toolName}`,
            },
          },
        ],
      };
    }
    const toolResult = await executeApiTool(
      toolName,
      toolDefinition,
      toolArgs ?? {},
      securitySchemes,
      c.authInfo?.token,
    );

    return {
      messages: toolResult.content.map((content) => ({
        role: 'user',
        content,
      })),
    };
  },
);
