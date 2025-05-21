import type { OpenAPIV3 } from 'openapi-types';

interface DocumentX {
  'x-mcp-prompt'?: string;
}

export interface OpenAPIV3DocumentX extends OpenAPIV3.Document<DocumentX> {
  'x-mcp-blacklist': string[];
}
