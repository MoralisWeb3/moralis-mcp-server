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
      const schema = param.schema;
      if (schema && !('$ref' in schema)) {
        result.properties[name] = {
          type: schema.type,
          description: param.description,
        };
        if (schema.enum) {
          result.properties[name].enum = schema.enum;
        }
      }
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
