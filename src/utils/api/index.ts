
// Re-export functions from the API modules
export { fetchDealsFromAllPlatforms, fetchDealById } from './deals';
export { fetchMockDeals } from './mock-deals';
export { 
  fetchAmazonDeals, 
  fetchRapidApiDeals, 
  fetchCommissionJunctionDeals 
} from './affiliate-apis';
export { 
  aggregateDealsFromAllSources, 
  refreshDealCache, 
  getCachedDeals 
} from './deal-aggregator';
