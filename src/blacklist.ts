// List of blacklisted operation IDs with reasons for exclusion
export const blacklistedOperationIds = new Set<string>([
  // Duplicate endpoints
  "getNFTTraitsByCollectionPaginate", // duplicate of traits by collection
  "getNFTContractMetadata", // duplicate of get bulk metadata
  "getTokenPrice", // duplicate of getMultipleTokenPrice
  "getNativeBalance", // duplicate of the multi balance endpoint
  "getTokenAnalytics", // duplicate of getMultipleTokenAnalytics endpoint

  // Utility endpoints (return no data)
  "resyncNFTRarity",
  "syncNFTContract",
  "reSyncMetadata",
  "runContractFunction",
  "web3ApiVersion",
  "endpointWeights",

  // Legacy endpoints
  "getWalletTokenBalances",
  "getTokenMetadataBySymbol",
  "getWalletTransactions",
  "getWalletTransactionsVerbose",
  "getTransaction",
  "getPairPrice",
  "reviewContracts",
  "getTrendingTokens",
  "getWalletTokenTransfers",
  "getWalletNFTTransfers",
  "getPairReserves",
  "getPairAddress",
  "getTokenStats",

  // Not popular
  "resolveAddressToDomain",
  "resolveDomain",
  "getNFTFloorPriceByToken",
  "getBlockStats",

  // Only configured on Ronin
  "getNewTokensByExchange",
  "getBondingTokensByExchange",
  "getGraduatedTokensByExchange",
  "getTokenBondingStatus",

  // Prefer more powerful alternatives
  "getAggregatedTokenPairStats", // getMultipleTokenAnalytics is better
]);
