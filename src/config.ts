// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

export type SchemaConfig = {
  /** Tool prefix */
  prefix?: string;
  /** API URL */
  baseUrl: string;
  /** OpenAPI URL */
  specUrl: string;
};

const configs: Record<string, SchemaConfig> = {
  evm:  {
    prefix: 'evm_',
    baseUrl:
      process.env.API_BASE_URL || 'https://deep-index.moralis.io/api/v2.2',
    specUrl:
      process.env.API_SPEC_URL ||
      'https://deep-index.moralis.io/api-docs-2.2/v2.2/swagger.json',
  },
  solana: {
    prefix: 'solana_',
    baseUrl: process.env.SOLANA_BASE_URL || 'https://solana-gateway.moralis.io',
    specUrl:
      process.env.SOLANA_SPEC_URL ||
      'https://solana-gateway.moralis.io/api-json',
  }
}

/**
 * Server Environment Configuration
 */
export class Config {
  static SERVER_NAME = process.env.SERVER_NAME || 'Moralis MCP';
  static SERVER_VERSION = process.env.SERVER_VERSION || '1.0.0';
  static SERVER_CONFIG = configs[process.env.SERVER_CONFIG || ''];
  static MORALIS_API_KEY = process.env.MORALIS_API_KEY
  static EVM_CONFIG = configs.evm;
  static SOL_CONFIG = configs.solana;
}
