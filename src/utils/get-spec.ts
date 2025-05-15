import axios from 'axios';
import type { OpenAPIV3 } from 'openapi-types';

export async function getSpec(url: string) {
  let spec: OpenAPIV3.Document;
  try {
    const { data } = await axios.get(url);
    spec = data;
  } catch (error: any) {
    console.error(
      'Failed to fetch OpenAPI spec:',
      error?.response.status,
      error?.response.statusText,
    );
    process.exit(1);
  }
  return spec;
}
