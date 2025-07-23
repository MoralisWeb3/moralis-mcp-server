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
import { Config, type SchemaConfig } from './config.js';
import { getSpec } from './utils/get-spec.js';
import type { OpenAPIV3DocumentX } from './types/open-api-document-x.js';
import {
  executeApiTool,
  type McpToolDefinition,
} from './utils/execute-api-tool.js';

async function mapToolDefinitions(config: SchemaConfig) {
  const spec = (await getSpec(config.specUrl)) as OpenAPIV3DocumentX;
  const api = (await SwaggerParser.dereference(spec)) as OpenAPIV3DocumentX;

  const tools = extractToolsFromApi(api, config.prefix);
  const blacklist = Array.isArray(api['x-mcp-blacklist'])
    ? api['x-mcp-blacklist'].map((e) => `${config.prefix}${e.toLowerCase()}`)
    : [];

  const toolDefinitionMap: Record<string, McpToolDefinition> = {};
  for (const tool of tools) {
    if (blacklist.includes(tool.name)) continue;
    toolDefinitionMap[tool.name] = {
      ...tool,
      baseUrl: config.baseUrl,
    };
  }
  return toolDefinitionMap;
}

export async function serverSetup(
  config: SchemaConfig | SchemaConfig[] = [
    Config.EVM_CONFIG,
    Config.SOL_CONFIG,
  ],
) {
  let configArray = Array.isArray(config) ? config : [config];
  if (Config.SERVER_CONFIG) configArray = [Config.SERVER_CONFIG];

  /**
   * MCP Server instance
   */
  const server = new Server(
    { name: Config.SERVER_NAME, version: Config.SERVER_VERSION },
    { capabilities: { tools: {}, prompts: {} } },
  );

  /**
   * Map of tool definitions by name
   */
  let toolDefinitionMap: Record<string, McpToolDefinition> = {};
  for (const config of configArray)
    toolDefinitionMap = {
      ...toolDefinitionMap,
      ...(await mapToolDefinitions(config)),
    };

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
    const toolsForClient: Tool[] = Object.values(toolDefinitionMap).map(
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
      const toolDefinition = toolDefinitionMap[toolName];
      if (!toolDefinition) {
        console.error(`Error: Unknown tool requested: ${toolName}`);
        return {
          content: [
            {
              type: 'text',
              text: `Error: Unknown tool requested: ${toolName}`,
            },
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
    for (const tool of Object.values(toolDefinitionMap)) {
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
      const toolDefinition = toolDefinitionMap[toolName];
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
  return server;
}
