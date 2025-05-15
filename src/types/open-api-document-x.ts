import type { OpenAPIV3 } from 'openapi-types';

export interface OpenAPIV3DocumentX extends OpenAPIV3.Document {
  'x-mcp-blacklist': string[];
}
