export const moralisApiTools = [
  {
    "name": "getWalletNFTs",
    "description": "Get NFTs by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the wallet"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "exclude_spam": {
          "type": "boolean",
          "default": false,
          "description": "Should spam NFTs be excluded from the result?"
        },
        "token_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The addresses to get balances for (optional)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getMultipleNFTs",
    "description": "Get Multiple NFTs",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": []
    }
  },
  {
    "name": "getWalletNFTTransfers",
    "description": "Get NFT transfers by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The wallet address of the sender or recipient of the transfers"
        },
        "contract_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "List of contract addresses of transfers"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "string",
          "description": "To get the reserves at this block number"
        },
        "from_date": {
          "type": "string",
          "description": "The date from where to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get transfers up until this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletNFTCollections",
    "description": "Get NFT collections by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The wallet address of the owner of NFTs in the collections"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "exclude_spam": {
          "type": "boolean",
          "default": false,
          "description": "Should spam NFTs be excluded from the result?"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "token_counts": {
          "type": "boolean",
          "default": false,
          "description": "Should token counts per collection be included in the response?"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getContractNFTs",
    "description": "Get NFTs by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "totalRanges": {
          "type": "integer",
          "description": "The number of subranges to split the results into"
        },
        "range": {
          "type": "integer",
          "description": "The desired subrange to query"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTOwners",
    "description": "Get NFT owners by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTContractTransfers",
    "description": "Get NFT transfers by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from where to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from where to get the transfers.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The date from where to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get transfers up until this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTByContractTraits",
    "description": "Get NFTs by traits",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "limit": {
          "type": "integer",
          "default": 100,
          "description": "The desired page size of the result."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        },
        "traits": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "address",
        "traits"
      ]
    }
  },
  {
    "name": "getNFTTraitsByCollection",
    "description": "Get NFT traits by collection",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTTraitsByCollectionPaginate",
    "description": "Get NFT traits by collection paginate",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "resyncNFTRarity",
    "description": "Resync NFT Trait",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTTrades",
    "description": "Get NFT trades by collection",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the trades from"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "marketplace": {
          "type": "string",
          "enum": [
            "opensea",
            "blur",
            "looksrare",
            "x2y2",
            "0xprotocol"
          ],
          "default": "opensea",
          "description": "Marketplace from which to get the trades. See [supported Marketplaces](https://docs.moralis.io/web3-data-api/evm/nft-marketplaces)."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "nft_metadata": {
          "type": "boolean",
          "default": false,
          "description": "Include the NFT Metadata of the NFT Token"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTTradesByToken",
    "description": "Get NFT trades by token",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the trades from"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "nft_metadata": {
          "type": "boolean",
          "default": false,
          "description": "Include the NFT Metadata of the NFT Token"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The token ID of the NFT contract"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getNFTTradesByWallet",
    "description": "Get NFT trades by wallet address",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the trades from"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "nft_metadata": {
          "type": "boolean",
          "default": false,
          "description": "Include the NFT Metadata of the NFT Token"
        },
        "address": {
          "type": "string",
          "description": "The owner wallet address"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTContractMetadata",
    "description": "Get NFT collection metadata",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTBulkContractMetadata",
    "description": "Get metadata for multiple NFT contracts",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "addresses": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "addresses"
      ]
    }
  },
  {
    "name": "getNFTMetadata",
    "description": "Get NFT metadata",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The ID of the token"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getNFTTransfers",
    "description": "Get NFT transfers by token ID",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The ID of the token"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getNFTTokenIdOwners",
    "description": "Get NFT owners by token ID",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The ID of the token"
        },
        "format": {
          "type": "string",
          "enum": [
            "decimal",
            "hex"
          ],
          "default": "decimal",
          "description": "The format of the token ID"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "normalizeMetadata": {
          "type": "boolean",
          "default": false,
          "description": "Should normalized metadata be returned?"
        },
        "media_items": {
          "type": "boolean",
          "default": false,
          "description": "Should preview media data be returned?"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "syncNFTContract",
    "description": "Resync NFT Contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "reSyncMetadata",
    "description": "Resync NFT metadata",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The ID of the token"
        },
        "flag": {
          "type": "string",
          "enum": [
            "uri",
            "metadata"
          ],
          "default": "uri",
          "description": "The type of resync to operate"
        },
        "mode": {
          "type": "string",
          "enum": [
            "async",
            "sync"
          ],
          "default": "async",
          "description": "To define the behaviour of the endpoint"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getNFTContractSalePrices",
    "description": "Get NFT sold price by collection",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "days": {
          "type": "integer",
          "description": "The number of days to look back to find the lowest price\nIf not provided 7 days will be the default and 365 is the maximum\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT collection"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTSalePrices",
    "description": "Get NFT sold price by token",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "days": {
          "type": "integer",
          "description": "The number of days to look back to find the lowest price\nIf not provided 7 days will be the default and 365 is the maximum\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT collection"
        },
        "token_id": {
          "type": "string",
          "description": "The token id of the NFT collection"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getTokenPrice",
    "description": "Get ERC20 token price",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the token contract"
        },
        "exchange": {
          "type": "string",
          "description": "The factory name or address of the token exchange"
        },
        "to_block": {
          "type": "integer",
          "description": "The block number from which the token price should be checked"
        },
        "include": {
          "type": "string",
          "enum": [
            "percent_change"
          ],
          "default": "",
          "description": "If the result should contain the 24hr percent change"
        },
        "max_token_inactivity": {
          "type": "number",
          "description": "Exclude tokens inactive for more than the given amount of days"
        },
        "min_pair_side_liquidity_usd": {
          "type": "number",
          "description": "Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getSwapsByTokenAddress",
    "description": "Get swap transactions by token address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The token address to get transaction for"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "fromBlock": {
          "type": "integer",
          "description": "The minimum block number from which to get the token transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "toBlock": {
          "type": "string",
          "description": "The block number to get the token transactions from"
        },
        "fromDate": {
          "type": "string",
          "description": "The start date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "toDate": {
          "type": "string",
          "description": "The end date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "transactionTypes": {
          "type": "string",
          "description": "Array of transaction types. Allowed values are 'buy', 'sell'."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getTokenHolders",
    "description": "Get holders summary by token address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "tokenAddress": {
          "type": "string",
          "description": "The token address to get transaction for"
        }
      },
      "required": [
        "tokenAddress"
      ]
    }
  },
  {
    "name": "getHistoricalTokenHolders",
    "description": "Get holders summary by token address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "tokenAddress": {
          "type": "string",
          "description": "The chain to query"
        },
        "fromDate": {
          "type": "string",
          "description": "The starting date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'fromBlock' or 'fromDate'\n* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.\n"
        },
        "toDate": {
          "type": "string",
          "description": "The ending date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'toBlock' or 'toDate'\n* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.\n"
        },
        "limit": {
          "type": "integer",
          "description": "The number of results to return"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)"
        },
        "timeFrame": {
          "type": "string",
          "enum": [
            "1min",
            "5min",
            "10min",
            "30min",
            "1h",
            "4h",
            "12h",
            "1d",
            "1w",
            "1m"
          ],
          "default": "1min",
          "description": "The time frame to group the data by"
        }
      },
      "required": [
        "tokenAddress",
        "fromDate",
        "toDate",
        "timeFrame"
      ]
    }
  },
  {
    "name": "getMultipleTokenPrices",
    "description": "Get Multiple ERC20 token prices",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "include": {
          "type": "string",
          "enum": [
            "percent_change"
          ],
          "default": "",
          "description": "If the result should contain the 24hr percent change"
        },
        "max_token_inactivity": {
          "type": "number",
          "description": "Exclude tokens inactive for more than the given amount of days"
        },
        "min_pair_side_liquidity_usd": {
          "type": "number",
          "description": "Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair."
        }
      },
      "required": []
    }
  },
  {
    "name": "getTokenOwners",
    "description": "Get ERC20 token owners by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "token_address": {
          "type": "string",
          "description": "The address of the token contract"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        }
      },
      "required": [
        "token_address"
      ]
    }
  },
  {
    "name": "getWalletTokenBalances",
    "description": "Get ERC20 token balance by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address from which token balances will be checked"
        },
        "to_block": {
          "type": "number",
          "description": "The block number up to which the balances will be checked."
        },
        "token_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The addresses to get balances for (optional)"
        },
        "exclude_spam": {
          "type": "boolean",
          "default": true,
          "description": "Exclude spam tokens from the result"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletTokenTransfers",
    "description": "Get ERC20 token transactions by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from which to get the transactions.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get the transactions up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the wallet"
        },
        "contract_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "List of contract addresses of transfers"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getTokenMetadata",
    "description": "Get ERC20 token metadata by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The addresses to get metadata for"
        }
      },
      "required": [
        "addresses"
      ]
    }
  },
  {
    "name": "getTokenMetadataBySymbol",
    "description": "Get ERC20 token metadata by symbols",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "symbols": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The symbols to get metadata for"
        }
      },
      "required": [
        "symbols"
      ]
    }
  },
  {
    "name": "getTokenTransfers",
    "description": "Get ERC20 token transactions by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transfers\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from which to get the transfers.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get transfers up until this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the token contract"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNativeBalance",
    "description": "Get native balance by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address from which the native balance will be checked"
        },
        "to_block": {
          "type": "number",
          "description": "The block number up to which the balances will be checked."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNativeBalancesForAddresses",
    "description": "Get balance for a set of wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "to_block": {
          "type": "number",
          "description": "The block number on which the balances should be checked"
        },
        "wallet_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The addresses to get metadata for"
        }
      },
      "required": [
        "wallet_addresses"
      ]
    }
  },
  {
    "name": "getWalletApprovals",
    "description": "Get ERC20 approvals by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "address": {
          "type": "string",
          "description": "The wallet address from which to retrieve active ERC20 token approvals"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletHistory",
    "description": "Get complete history of wallets",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from which to get the transactions.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get the transactions up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the wallet"
        },
        "include_internal_transactions": {
          "type": "boolean",
          "description": "If the result should contain the internal transactions."
        },
        "nft_metadata": {
          "type": "boolean",
          "description": "If the result should contain the nft metadata."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletTokenBalancesPrice",
    "description": "Get ERC20 token balances with prices by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address from which token balances will be checked"
        },
        "to_block": {
          "type": "number",
          "description": "The block number up to which the balances will be checked."
        },
        "token_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The addresses to get balances for (optional)"
        },
        "exclude_spam": {
          "type": "boolean",
          "default": false,
          "description": "Exclude spam tokens from the result"
        },
        "exclude_unverified_contracts": {
          "type": "boolean",
          "default": false,
          "description": "Exclude unverified contracts from the result"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "exclude_native": {
          "type": "boolean",
          "default": false,
          "description": "Exclude native balance from the result"
        },
        "max_token_inactivity": {
          "type": "number",
          "description": "Exclude tokens inactive for more than the given amount of days"
        },
        "min_pair_side_liquidity_usd": {
          "type": "number",
          "description": "Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletNetWorth",
    "description": "Get wallet net worth",
    "input_schema": {
      "type": "object",
      "properties": {
        "chains": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The chains to query"
        },
        "address": {
          "type": "string",
          "description": "The wallet address"
        },
        "exclude_spam": {
          "type": "boolean",
          "default": false,
          "description": "Exclude spam tokens from the result"
        },
        "exclude_unverified_contracts": {
          "type": "boolean",
          "default": false,
          "description": "Exclude unverified contracts from the result"
        },
        "max_token_inactivity": {
          "type": "number",
          "description": "Exclude tokens inactive for more than the given amount of days"
        },
        "min_pair_side_liquidity_usd": {
          "type": "number",
          "description": "Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletTransactions",
    "description": "Get native transactions by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from which to get the transactions.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get the transactions up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the wallet"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "include": {
          "type": "string",
          "description": "If the result should contain the internal transactions."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletTransactionsVerbose",
    "description": "Get decoded transactions by wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "from_block": {
          "type": "integer",
          "description": "The minimum block number from which to get the transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_block": {
          "type": "integer",
          "description": "The maximum block number from which to get the transactions.\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "from_date": {
          "type": "string",
          "description": "The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "to_date": {
          "type": "string",
          "description": "Get the transactions up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "address": {
          "type": "string",
          "description": "The address of the wallet"
        },
        "include": {
          "type": "string",
          "description": "If the result should contain the internal transactions."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getTransaction",
    "description": "Get transaction by hash",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "transaction_hash": {
          "type": "string",
          "description": "The transaction hash"
        },
        "include": {
          "type": "string",
          "description": "If the result should contain the internal transactions."
        }
      },
      "required": [
        "transaction_hash"
      ]
    }
  },
  {
    "name": "getTransactionVerbose",
    "description": "Get decoded transaction by hash",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "transaction_hash": {
          "type": "string",
          "description": "The transaction hash"
        },
        "include": {
          "type": "string",
          "description": "If the result should contain the internal transactions."
        }
      },
      "required": [
        "transaction_hash"
      ]
    }
  },
  {
    "name": "getBlock",
    "description": "Get block by hash",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "block_number_or_hash": {
          "type": "string",
          "description": "The block number or block hash"
        },
        "include": {
          "type": "string",
          "description": "If the result should contain the internal transactions."
        }
      },
      "required": [
        "block_number_or_hash"
      ]
    }
  },
  {
    "name": "getLatestBlockNumber",
    "description": "Get latest block number.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": [
        "chain"
      ]
    }
  },
  {
    "name": "getDateToBlock",
    "description": "Get block by date",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "date": {
          "type": "string",
          "description": "Unix date in milliseconds or a datestring (format in seconds or datestring accepted by momentjs)"
        }
      },
      "required": [
        "date"
      ]
    }
  },
  {
    "name": "runContractFunction",
    "description": "Run contract function",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the contract"
        },
        "function_name": {
          "type": "string",
          "description": "The function name of the contract"
        }
      },
      "required": [
        "address",
        "function_name"
      ]
    }
  },
  {
    "name": "web3ApiVersion",
    "description": "Get API version",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "endpointWeights",
    "description": "Get weights of endpoints",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "resolveAddress",
    "description": "ENS lookup by address",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The address to be resolved"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "resolveDomain",
    "description": "Resolve Unstoppable domain",
    "input_schema": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string",
          "enum": [
            "eth",
            "0x1"
          ],
          "default": "eth",
          "description": "The currency to query"
        },
        "domain": {
          "type": "string",
          "description": "The domain to be resolved"
        }
      },
      "required": [
        "domain"
      ]
    }
  },
  {
    "name": "resolveAddressToDomain",
    "description": "Resolve Address to Unstoppable domain",
    "input_schema": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string",
          "enum": [
            "eth",
            "0x1"
          ],
          "default": "eth",
          "description": "The currency to query"
        },
        "address": {
          "type": "string",
          "description": "The address to be resolved"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "resolveENSDomain",
    "description": "ENS lookup by domain",
    "input_schema": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "string",
          "description": "The domain to be resolved"
        }
      },
      "required": [
        "domain"
      ]
    }
  },
  {
    "name": "getPairPrice",
    "description": "Get DEX token pair price",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the reserves from"
        },
        "to_date": {
          "type": "string",
          "description": "Get the price up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "token0_address": {
          "type": "string",
          "description": "The token0 address"
        },
        "token1_address": {
          "type": "string",
          "description": "The token1 address"
        },
        "exchange": {
          "type": "string",
          "description": "The factory name or address of the token exchange"
        }
      },
      "required": [
        "token0_address",
        "token1_address"
      ]
    }
  },
  {
    "name": "getPairReserves",
    "description": "Get DEX token pair reserves",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the reserves from"
        },
        "to_date": {
          "type": "string",
          "description": "Get the reserves up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "pair_address": {
          "type": "string",
          "description": "The liquidity pair address"
        }
      },
      "required": [
        "pair_address"
      ]
    }
  },
  {
    "name": "getPairAddress",
    "description": "Get DEX token pair address",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "to_block": {
          "type": "string",
          "description": "The block number to get the reserves from"
        },
        "to_date": {
          "type": "string",
          "description": "Get the reserves up to this date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "exchange": {
          "type": "string",
          "enum": [
            "uniswapv2",
            "uniswapv3",
            "sushiswapv2",
            "pancakeswapv2",
            "pancakeswapv1",
            "quickswap"
          ],
          "description": "The factory name or address of the token exchange"
        },
        "token0_address": {
          "type": "string",
          "description": "The token0 address"
        },
        "token1_address": {
          "type": "string",
          "description": "The token1 address"
        }
      },
      "required": [
        "exchange",
        "token0_address",
        "token1_address"
      ]
    }
  },
  {
    "name": "getTopERC20TokensByMarketCap",
    "description": "Get top ERC20 tokens",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getTopERC20TokensByPriceMovers",
    "description": "Get top ERC20 tokens",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getTopNFTCollectionsByMarketCap",
    "description": "Get top NFT collections",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getHottestNFTCollectionsByTradingVolume",
    "description": "Get hottest NFT collections",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getTopCryptoCurrenciesByMarketCap",
    "description": "Get top crypto currencies by market cap",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getTopCryptoCurrenciesByTradingVolume",
    "description": "Get top crypto currencies by trading volume",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "reviewContracts",
    "description": "Review contracts",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": []
    }
  },
  {
    "name": "getDefiSummary",
    "description": "Get the defi summary of a wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "Wallet address"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getDefiPositionsByProtocol",
    "description": "Get detailed defi positions by protocol for a wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "Wallet address"
        },
        "protocol": {
          "type": "string",
          "description": "The protocol to query"
        }
      },
      "required": [
        "address",
        "protocol"
      ]
    }
  },
  {
    "name": "getDefiPositionsSummary",
    "description": "Get the positions summary of a wallet",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "Wallet address"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletActiveChains",
    "description": "Get the wallet active chains",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "Wallet address"
        },
        "chains": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The chains to query"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletStats",
    "description": "Get the wallet stats",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "Wallet address"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTCollectionStats",
    "description": "Get the nft collection stats",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT collection"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTFloorPriceByContract",
    "description": "Get NFT floor price by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getNFTFloorPriceByToken",
    "description": "Get NFT floor price by token",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "token_id": {
          "type": "string",
          "description": "The token ID of the NFT"
        }
      },
      "required": [
        "address",
        "token_id"
      ]
    }
  },
  {
    "name": "getNFTHistoricalFloorPriceByContract",
    "description": "Get historical NFT floor price by contract",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "interval": {
          "type": "string",
          "description": "The duration to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the NFT contract"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        }
      },
      "required": [
        "interval",
        "address"
      ]
    }
  },
  {
    "name": "getTokenStats",
    "description": "Get the erc20 token stats",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The address of the erc20 token"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getBlockStats",
    "description": "Get the block stats",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "block_number_or_hash": {
          "type": "string",
          "description": "The block number or hash"
        }
      },
      "required": [
        "block_number_or_hash"
      ]
    }
  },
  {
    "name": "getFilteredTokens",
    "description": "Returns a list of tokens that match the specified filters and criteria.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The blockchain identifier"
        },
        "filters": {
          "type": "array",
          "description": "List of filters to apply",
          "items": {
            "type": "object",
            "properties": {
              "metric": {
                "type": "string",
                "description": "The metric to filter on"
              },
              "timeFrame": {
                "type": "string",
                "description": "The time frame for the filter"
              },
              "gt": {
                "type": "number",
                "description": "Greater-than value for the filter"
              },
              "lt": {
                "type": "number",
                "description": "Less-than value for the filter"
              },
              "eq": {
                "type": "number",
                "description": "Equal-to value for the filter"
              }
            },
            "required": [
              "metric",
              "timeFrame"
            ],
            "additionalProperties": true
          }
        },
        "sortBy": {
          "type": "object",
          "description": "Metric and time frame to sort by",
          "properties": {
            "metric": {
              "type": "string",
              "description": "The metric to sort by"
            },
            "timeFrame": {
              "type": "string",
              "description": "The time frame for sorting"
            },
            "type": {
              "type": "string",
              "description": "The order of sorting",
              "enum": [
                "ASC",
                "DESC"
              ]
            }
          },
          "required": [
            "metric",
            "timeFrame",
            "type"
          ],
          "additionalProperties": true
        },
        "timeFramesToReturn": {
          "type": "array",
          "description": "List of time frames to return in the response",
          "items": {
            "type": "string"
          }
        },
        "metricsToReturn": {
          "type": "array",
          "description": "List of metrics to return in the response",
          "items": {
            "type": "string"
          }
        },
        "limit": {
          "type": "number",
          "description": "Maximum number of results"
        }
      },
      "required": [
        "chain",
        "filters",
        "sortBy",
        "limit"
      ]
    }
  },
  {
    "name": "getRisingLiquidityTokens",
    "description": "Get tokens with rising liquidity",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "one_month_liquidity_change_usd": {
          "type": "number",
          "description": "The minimum one month liquidity change in usd of a token"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "twitter_followers": {
          "type": "number",
          "description": "The minimum twitter followers of a token"
        },
        "one_month_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month volume change in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "one_month_price_percent_change_usd": {
          "type": "number",
          "description": "The minimum one month price percent change of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getBuyingPressureTokens",
    "description": "Get tokens with buying pressure",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "one_month_net_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month net volume change in usd of a token"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "twitter_followers": {
          "type": "number",
          "description": "The minimum twitter followers of a token"
        },
        "one_month_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month volume change in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "one_month_price_percent_change_usd": {
          "type": "number",
          "description": "The minimum one month price percent change of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getSolidPerformersTokens",
    "description": "Get tokens with solid performance",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "one_month_net_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month net volume change in usd of a token"
        },
        "one_week_net_volume_change_usd": {
          "type": "number",
          "description": "The minimum one week net volume change in usd of a token"
        },
        "one_day_net_volume_change_usd": {
          "type": "number",
          "description": "The minimum one day net volume change in usd of a token"
        },
        "one_month_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month volume change in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "one_month_price_percent_change_usd": {
          "type": "number",
          "description": "The minimum one month price percent change of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getExperiencedBuyersTokens",
    "description": "Get tokens with experienced buyers",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "one_week_experienced_net_buyers_change": {
          "type": "number",
          "description": "The minimum one week experienced buyers change of a token"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getRiskyBetsTokens",
    "description": "Get tokens with risky bets",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "max_market_cap": {
          "type": "number",
          "description": "The maximum market cap in usd of a token"
        },
        "one_week_holders_change": {
          "type": "number",
          "description": "The minimum one week holders change of a token"
        },
        "one_week_net_volume_change_usd": {
          "type": "number",
          "description": "The minimum one week net volume change in usd of a token"
        },
        "one_month_volume_change_usd": {
          "type": "number",
          "description": "The minimum one month volume change in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "one_month_price_percent_change_usd": {
          "type": "number",
          "description": "The minimum one month price percent change of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getBlueChipTokens",
    "description": "Get tokens with blue chip",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "min_token_age_in_days": {
          "type": "number",
          "description": "The minimum age of token in days"
        },
        "time_frame": {
          "type": "string",
          "description": "The time frame used for price percent change ordering in response"
        }
      },
      "required": []
    }
  },
  {
    "name": "getTopGainersTokens",
    "description": "Get tokens with top gainers",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "time_frame": {
          "type": "string",
          "description": "The time frame used for price percent change ordering in response"
        }
      },
      "required": []
    }
  },
  {
    "name": "getTopLosersTokens",
    "description": "Get tokens with top losers",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        },
        "time_frame": {
          "type": "string",
          "description": "The time frame used for price percent change ordering in response"
        }
      },
      "required": []
    }
  },
  {
    "name": "getTrendingTokens",
    "description": "Get trending tokens",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "min_market_cap": {
          "type": "number",
          "description": "The minimum market cap in usd of a token"
        },
        "security_score": {
          "type": "number",
          "description": "The minimum security score of a token"
        }
      },
      "required": []
    }
  },
  {
    "name": "getDiscoveryToken",
    "description": "Get token details",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "token_address": {
          "type": "string",
          "description": "The address of the token"
        }
      },
      "required": [
        "chain",
        "token_address"
      ]
    }
  },
  {
    "name": "getWalletProfitabilitySummary",
    "description": "Get Wallet Profitability Summary",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The wallet address for which profitability summary is to be retrieved."
        },
        "days": {
          "type": "string",
          "description": "Timeframe in days for the profitability summary. Options include 'all', '7', '30', '60', '90' default is 'all'."
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getWalletProfitability",
    "description": "Get Wallet Profitability",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The wallet address for which profitability is to be retrieved."
        },
        "days": {
          "type": "string",
          "description": "Timeframe in days for which profitability is calculated, Options include 'all', '7', '30', '60', '90' default is 'all'."
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "token_addresses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The token addresses list to filter the result with"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getTopProfitableWalletPerToken",
    "description": "Get Top Profitable Wallets for a Token",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The ERC20 token address."
        },
        "days": {
          "type": "string",
          "description": "Timeframe in days for which profitability is calculated, Options include 'all', '7', '30' default is 'all'."
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "searchTokens",
    "description": "Search for tokens based on contract address, token name or token symbol. Premium endpoint available as an add-on. Please contact support for access details.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chains": {
          "type": "string",
          "description": "The chains to query"
        },
        "query": {
          "type": "string",
          "description": "The query to search"
        },
        "limit": {
          "type": "number",
          "description": "The desired page size of the result."
        }
      },
      "required": []
    }
  },
  {
    "name": "searchEntities",
    "description": "Search Entities",
    "input_schema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "The search query"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        }
      },
      "required": [
        "query"
      ]
    }
  },
  {
    "name": "getEntity",
    "description": "Get Entity By Id",
    "input_schema": {
      "type": "object",
      "properties": {
        "entityId": {
          "type": "string"
        }
      },
      "required": [
        "entityId"
      ]
    }
  },
  {
    "name": "getEntityCategories",
    "description": "Get Entity Categories",
    "input_schema": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        }
      },
      "required": []
    }
  },
  {
    "name": "getEntitiesByCategory",
    "description": "Get Entities By Category",
    "input_schema": {
      "type": "object",
      "properties": {
        "categoryId": {
          "type": "string",
          "description": "The category Id"
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        }
      },
      "required": [
        "categoryId"
      ]
    }
  },
  {
    "name": "getPairCandlesticks",
    "description": "Get OHLCV by pair address",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The pair address"
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "timeframe": {
          "type": "string",
          "enum": [
            "1s",
            "10s",
            "30s",
            "1min",
            "5min",
            "10min",
            "30min",
            "1h",
            "4h",
            "12h",
            "1d",
            "1w",
            "1M"
          ],
          "default": "1h",
          "description": "The timeframe"
        },
        "currency": {
          "type": "string",
          "enum": [
            "usd",
            "native"
          ],
          "default": "usd",
          "description": "The currency"
        },
        "fromDate": {
          "type": "string",
          "description": "The starting date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'fromBlock' or 'fromDate'\n* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.\n"
        },
        "toDate": {
          "type": "string",
          "description": "The ending date (format in seconds or datestring accepted by momentjs)\n* Provide the param 'toBlock' or 'toDate'\n* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.\n"
        },
        "limit": {
          "type": "integer",
          "description": "The number of results to return"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)"
        }
      },
      "required": [
        "address",
        "timeframe",
        "currency",
        "fromDate",
        "toDate"
      ]
    }
  },
  {
    "name": "getPairStats",
    "description": "Get pair stats",
    "input_schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The pair address"
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getTokenPairs",
    "description": "Get token pairs by address",
    "input_schema": {
      "type": "object",
      "properties": {
        "token_address": {
          "type": "string",
          "description": "The address of the token"
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "limit": {
          "type": "integer",
          "description": "The number of results to return"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)"
        }
      },
      "required": [
        "token_address",
        "chain"
      ]
    }
  },
  {
    "name": "getAggregatedTokenPairStats",
    "description": "Get aggregated token pair statistics by address",
    "input_schema": {
      "type": "object",
      "properties": {
        "token_address": {
          "type": "string",
          "description": "The address of the token"
        },
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": [
        "token_address",
        "chain"
      ]
    }
  },
  {
    "name": "getSwapsByWalletAddress",
    "description": "Get swap transactions by wallet address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The wallet address token-transactions are to be retrieved for."
        },
        "tokenAddress": {
          "type": "string",
          "description": "The token address to get transaction for (optional)"
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "fromBlock": {
          "type": "integer",
          "description": "The minimum block number from which to get the token transactions\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "toBlock": {
          "type": "string",
          "description": "The block number to get the token transactions from"
        },
        "fromDate": {
          "type": "string",
          "description": "The start date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'from_block' or 'from_date'\n* If 'from_date' and 'from_block' are provided, 'from_block' will be used.\n"
        },
        "toDate": {
          "type": "string",
          "description": "The end date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'to_block' or 'to_date'\n* If 'to_date' and 'to_block' are provided, 'to_block' will be used.\n"
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "transactionTypes": {
          "type": "string",
          "description": "Array of transaction types. Allowed values are 'buy', 'sell'."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getSwapsByPairAddress",
    "description": "Get swap transactions by pair address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The pair address token-transactions are to be retrieved for."
        },
        "cursor": {
          "type": "string",
          "description": "The cursor returned in the previous response (used for getting the next page)."
        },
        "limit": {
          "type": "integer",
          "description": "The desired page size of the result."
        },
        "fromBlock": {
          "type": "integer",
          "description": "The minimum block number from which to get the token transactions\n* Provide the param 'fromBlock' or 'fromDate'\n* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.\n"
        },
        "toBlock": {
          "type": "string",
          "description": "The block number to get the token transactions from"
        },
        "fromDate": {
          "type": "string",
          "description": "The start date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'fromBlock' or 'fromDate'\n* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.\n"
        },
        "toDate": {
          "type": "string",
          "description": "The end date from which to get the token transactions (format in seconds or datestring accepted by momentjs)\n* Provide the param 'toBlock' or 'toDate'\n* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.\n"
        },
        "order": {
          "type": "string",
          "description": "The order of the result, in ascending (ASC) or descending (DESC)"
        },
        "transactionTypes": {
          "type": "string",
          "description": "Array of transaction types. Allowed values are 'buy', 'sell', 'addLiquidity', 'removeLiquidity'."
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getSnipersByPairAddress",
    "description": "Get snipers by pair address.",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "address": {
          "type": "string",
          "description": "The pair address token-transactions are to be retrieved for."
        },
        "blocksAfterCreation": {
          "type": "integer",
          "default": 3,
          "description": "Number of blocks after the creation\n"
        }
      },
      "required": [
        "address"
      ]
    }
  },
  {
    "name": "getVolumeStatsByChain",
    "description": "Get volume and chain data",
    "input_schema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "getVolumeStatsByCategory",
    "description": "Get volume and chain data by categories",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        }
      },
      "required": []
    }
  },
  {
    "name": "getTimeSeriesVolume",
    "description": " Retrieve timeseries volume data by chain",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "interval": {
          "type": "string",
          "enum": [
            "oneDay",
            "sevenDays",
            "thirtyDays"
          ],
          "default": "oneDay",
          "description": "The interval to query"
        }
      },
      "required": [
        "interval"
      ]
    }
  },
  {
    "name": "getTimeSeriesVolumeByCategory",
    "description": "Retrieve timeseries volume data by category",
    "input_schema": {
      "type": "object",
      "properties": {
        "chain": {
          "type": "string",
          "description": "The chain to query"
        },
        "interval": {
          "type": "string",
          "enum": [
            "oneDay",
            "sevenDays",
            "thirtyDays"
          ],
          "default": "oneDay",
          "description": "The interval to query"
        },
        "categoryId": {
          "type": "string",
          "description": "The category id"
        }
      },
      "required": [
        "interval",
        "categoryId"
      ]
    }
  }
]