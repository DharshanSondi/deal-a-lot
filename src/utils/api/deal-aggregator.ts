
import { Deal, ApiResponse } from "@/types/deals";
import { fetchAmazonDeals, fetchRapidApiDeals, fetchCommissionJunctionDeals } from "./affiliate-apis";
import { fetchDealsFromAllPlatforms } from "./deals";

interface AggregatorConfig {
  enableAmazon: boolean;
  enableRapidApi: boolean;
  enableCommissionJunction: boolean;
  enableMockData: boolean;
  maxDealsPerSource: number;
}

const defaultConfig: AggregatorConfig = {
  enableAmazon: true,
  enableRapidApi: true,
  enableCommissionJunction: true,
  enableMockData: true,
  maxDealsPerSource: 10
};

export const aggregateDealsFromAllSources = async (
  query: string = "",
  category: string = "",
  config: Partial<AggregatorConfig> = {}
): Promise<ApiResponse<Deal[]>> => {
  const finalConfig = { ...defaultConfig, ...config };
  console.log("Aggregating deals with config:", finalConfig);

  const dealPromises: Promise<ApiResponse<Deal[]>>[] = [];
  
  try {
    // Add Amazon deals
    if (finalConfig.enableAmazon) {
      dealPromises.push(fetchAmazonDeals(category, query));
    }
    
    // Add RapidAPI deals
    if (finalConfig.enableRapidApi) {
      dealPromises.push(fetchRapidApiDeals(query, finalConfig.maxDealsPerSource));
    }
    
    // Add Commission Junction deals
    if (finalConfig.enableCommissionJunction) {
      dealPromises.push(fetchCommissionJunctionDeals("default"));
    }
    
    // Add existing mock data
    if (finalConfig.enableMockData) {
      dealPromises.push(fetchDealsFromAllPlatforms(query, finalConfig.maxDealsPerSource, "", category));
    }

    const results = await Promise.allSettled(dealPromises);
    const allDeals: Deal[] = [];
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        allDeals.push(...result.value.data);
        console.log(`Source ${index} contributed ${result.value.data.length} deals`);
      } else {
        console.warn(`Source ${index} failed:`, result.status === 'rejected' ? result.reason : result.value.error);
      }
    });

    // Remove duplicates and sort by discount percentage
    const uniqueDeals = removeDuplicateDeals(allDeals);
    const sortedDeals = uniqueDeals.sort((a, b) => b.discountPercentage - a.discountPercentage);

    return {
      success: true,
      data: sortedDeals,
      source: "aggregated",
      timestamp: new Date().toISOString(),
      totalResults: sortedDeals.length
    };

  } catch (error) {
    console.error("Deal aggregation error:", error);
    return {
      success: false,
      data: [],
      error: "Failed to aggregate deals from sources"
    };
  }
};

function removeDuplicateDeals(deals: Deal[]): Deal[] {
  const seen = new Set<string>();
  return deals.filter(deal => {
    const key = `${deal.title.toLowerCase()}-${deal.discountedPrice}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export const refreshDealCache = async (): Promise<void> => {
  console.log("Refreshing deal cache...");
  try {
    const freshDeals = await aggregateDealsFromAllSources();
    if (freshDeals.success) {
      localStorage.setItem('cachedDeals', JSON.stringify({
        deals: freshDeals.data,
        timestamp: Date.now(),
        ttl: 30 * 60 * 1000 // 30 minutes
      }));
      console.log("Deal cache refreshed with", freshDeals.data.length, "deals");
    }
  } catch (error) {
    console.error("Failed to refresh deal cache:", error);
  }
};

export const getCachedDeals = (): Deal[] | null => {
  try {
    const cached = localStorage.getItem('cachedDeals');
    if (!cached) return null;
    
    const { deals, timestamp, ttl } = JSON.parse(cached);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem('cachedDeals');
      return null;
    }
    
    return deals;
  } catch (error) {
    console.error("Failed to get cached deals:", error);
    return null;
  }
};
