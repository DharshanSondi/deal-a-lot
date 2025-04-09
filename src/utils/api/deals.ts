
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
