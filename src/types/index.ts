// src/types/index.ts

/**
 * Core type definitions for the openapi-to-mcp generator
 */
import type { OpenAPIV3 } from 'openapi-types';
import type { JSONSchema7 } from 'json-schema';

/**
 * Transport types supported by the MCP server
 */
export type TransportType = 'stdio' | 'web' | 'streamable-http';

/**
 * MCP Tool Definition describes a tool extracted from an OpenAPI spec
 * for use in Model Context Protocol server
 */
export interface McpToolDefinition {
  /** Name of the tool, must be unique */
  name: string;
  /** Human-readable description of the tool */
  description: string;
  /** JSON Schema that defines the input parameters */
  inputSchema: JSONSchema7 | boolean;
  /** HTTP method for the operation (get, post, etc.) */
  method: string;
  /** URL path template with parameter placeholders */
  pathTemplate: string;
  /** OpenAPI parameter objects for this operation */
  parameters: OpenAPIV3.ParameterObject[];
  /** Parameter names and locations for execution */
  executionParameters: { name: string; in: string }[];
  /** Content type for request body, if applicable */
  requestBodyContentType?: string;
  /** Security requirements for this operation */
  securityRequirements: OpenAPIV3.SecurityRequirementObject[];
  /** Original operation ID from the OpenAPI spec */
  operationId: string;
  /** Optional prompt for the tool */
  prompt?: string;
}

/**
 * Helper type for JSON objects
 */
export type JsonObject = Record<string, any>;
