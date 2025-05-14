// List of blacklisted operation IDs with reasons for exclusion
export const blacklistedOperationIds = new Set<string>([
  // Duplicate endpoints
  "getnfttraitsbycollectionpaginate", // duplicate of traits by collection
  "getnftcontractmetadata", // duplicate of get bulk metadata
  "gettokenprice", // duplicate of getMultipleTokenPrice
  "getnativebalance", // duplicate of the multi balance endpoint
  "gettokenanalytics", // duplicate of getMultipleTokenAnalytics endpoint

  // Utility endpoints (return no data)
  "resyncnftrarity",
  "syncnftcontract",
  "resyncmetadata",
  "runcontractfunction",
  "web3apiversion",
  "endpointweights",

  // Legacy endpoints
  "getwallettokenbalances",
  "gettokenmetadatabysymbol",
  "getwallettransactions",
  "getwallettransactionsverbose",
  "gettransaction",
  "getpairprice",
  "reviewcontracts",
  "gettrendingtokens",
  "getwallettokentransfers",
  "getwalletnfttransfers",
  "getpairreserves",
  "getpairaddress",
  "gettokenstats",

  // Not popular
  "resolveaddresstodomain",
  "resolvedomain",
  "getnftfloorpricebytoken",
  "getblockstats",

  // Only configured on Ronin
  "getnewtokensbyexchange",
  "getbondingtokensbyexchange",
  "getgraduatedtokensbyexchange",
  "gettokenbondingstatus",

  // Prefer more powerful alternatives
  "getaggregatedtokenpairstats", // getMultipleTokenAnalytics is better
]);
