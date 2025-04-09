import { Deal } from "@/types/deals";
import { supabase } from "@/integrations/supabase/client";

interface ApiResponse {
  success: boolean;
  deals: Deal[];
  error?: string;
}

// This function fetches real deals from our edge function that aggregates deals from multiple platforms
export async function fetchDealsFromAllPlatforms(
  query: string = "",
  limit: number = 50,
  platform: string = "",
  category: string = ""
): Promise<ApiResponse> {
  try {
    console.log("Fetching deals with query:", query, "limit:", limit, "platform:", platform, "category:", category);
    
    // Call the Supabase edge function to get deals
    const { data, error } = await supabase.functions.invoke("get-deals", {
      body: {
        query,
        limit,
        platform,
        category
      }
    });

    if (error) {
      console.error("Error calling get-deals function:", error);
      return {
        success: false,
        deals: [],
        error: "Failed to fetch deals from platforms. Please try again later."
      };
    }

    console.log("Fetched deals:", data.deals.length);
    
    return {
      success: true,
      deals: data.deals,
    };
  } catch (error) {
    console.error("Error fetching deals:", error);
    return {
      success: false,
      deals: [],
      error: "Failed to fetch deals from platforms. Please try again later.",
    };
  }
}

// Fallback to fetch mock data if the edge function fails
async function fetchMockDeals(
  query: string = "",
  limit: number = 10,
  platform: string = ""
): Promise<ApiResponse> {
  console.log("Falling back to mock deals with query:", query);
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  try {
    const dealsByPlatform = {
      amazon: generateMockDeals("amazon", query, limit),
      flipkart: generateMockDeals("flipkart", query, limit),
      meesho: generateMockDeals("meesho", query, limit)
    };
    
    let allDeals = [];
    
    if (platform) {
      // If platform is specified, only get deals from that platform
      allDeals = dealsByPlatform[platform as keyof typeof dealsByPlatform] || [];
    } else {
      // Otherwise get deals from all platforms
      allDeals = [
        ...dealsByPlatform.amazon,
        ...dealsByPlatform.flipkart,
        ...dealsByPlatform.meesho
      ];
    }
    
    // Filter by search query if provided
    if (query) {
      allDeals = allDeals.filter(deal => 
        deal.title.toLowerCase().includes(query.toLowerCase()) || 
        (deal.description && deal.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    return {
      success: true,
      deals: allDeals.slice(0, limit),
    };
  } catch (error) {
    console.error("Error fetching mock deals:", error);
    return {
      success: false,
      deals: [],
      error: "Failed to fetch mock deals. Please try again later.",
    };
  }
}

function generateMockDeals(platform: string, query: string = "", limit: number = 10): Deal[] {
  return Array.from({ length: limit }).map((_, index) => {
    const randomDiscount = Math.floor(Math.random() * 50) + 10;
    let originalPrice;
    
    switch (platform) {
      case 'amazon':
        originalPrice = Math.floor(Math.random() * 10000) + 1000;
        break;
      case 'flipkart':
        originalPrice = Math.floor(Math.random() * 8000) + 2000;
        break;
      case 'meesho':
        originalPrice = Math.floor(Math.random() * 3000) + 500;
        break;
      default:
        originalPrice = Math.floor(Math.random() * 5000) + 1000;
    }
    
    const discountedPrice = Math.round(originalPrice * (100 - randomDiscount) / 100);
    const categories = ["Electronics", "Fashion", "Home", "Beauty", "Toys"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    return {
      id: `${platform}-${Date.now()}-${index}`,
      title: query
        ? `${platform.charAt(0).toUpperCase() + platform.slice(1)} ${query} Item ${index + 1}`
        : `${platform.charAt(0).toUpperCase() + platform.slice(1)} Deal ${index + 1}`,
      description: `Great deal from ${platform} with fast delivery!`,
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      discountPercentage: randomDiscount,
      imageUrl: `https://picsum.photos/seed/${platform}${Date.now()}${index}/400/300`,
      platform: platform as 'amazon' | 'flipkart' | 'meesho' | 'other',
      externalUrl: `https://www.${platform}.com`,
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
      ratingCount: Math.floor(Math.random() * 1000) + 100,
      isNew: Math.random() > 0.7,
      isTrending: Math.random() > 0.8,
      category: category,
    };
  });
}

// Function to get the real product URL (in a real implementation)
export function getProductExternalUrl(deal: Deal): string {
  // In a real implementation, this would construct the actual product URL
  // based on the platform and product ID
  switch (deal.platform) {
    case 'amazon':
      return `https://www.amazon.in/dp/${deal.id.split('-')[1]}`;
    case 'flipkart':
      return `https://www.flipkart.com/product/${deal.id.split('-')[1]}`;
    case 'meesho':
      return `https://www.meesho.com/product/${deal.id.split('-')[1]}`;
    default:
      return deal.externalUrl;
  }
}
