// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

/**
 * Server Environment Configuration
 */
export class Config {
  static SERVER_NAME: string;
  static SERVER_VERSION: string;
  static MORALIS_API_KEY = process.env.MORALIS_API_KEY;
  static API_BASE_URL =
    process.env.API_BASE_URL || 'https://deep-index.moralis.io/api/v2.2';
  static API_SPEC_URL =
    process.env.API_SPEC_URL ||
    'https://deep-index.moralis.io/api-docs-2.2/v2.2/swagger.json';
}
