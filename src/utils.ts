import { OpenAPIV3 } from "openapi-types";

export function parseParametersToObject(parameters: OpenAPIV3.ParameterObject[]) {
  if (!parameters) {
    return { type: 'object' };
  }
  const result: Record<string, any> = {
    type: 'object',
    properties: {},
  };
  for (const param of parameters) {
    if (param.in === 'query' || param.in === 'path') {
      const name = param.name;
      const schema = param.schema as OpenAPIV3.SchemaObject;

      let items = (schema as any)?.items
      if (items && '$ref' in items) {
        items = { type: 'string' }
      }

      result.properties[name] = {
        type: schema?.type || 'string',
        items: items,
        enum: schema?.enum,
        default: schema?.default,
        description: param.description,
      };
      if (param.required) {
        if (!result.required) {
          result.required = [];
        }
        result.required.push(name);
      }
    }
  }
  return result;
}
