
import { Deal, ApiResponse } from "@/types/deals";
import { mockDeals } from "@/data/mock-deals";

// This is a mock implementation that simulates API calls to fetch deals
export const fetchDealsFromAllPlatforms = async (
  query: string = "", 
  limit: number = 20, 
  sortBy: string = "", 
  category: string = ""
): Promise<ApiResponse<Deal>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    // Filter deals based on parameters
    let filteredDeals = [...mockDeals];
    
    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredDeals = filteredDeals.filter(deal => 
        deal.title.toLowerCase().includes(searchTerm) || 
        deal.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by category
    if (category) {
      filteredDeals = filteredDeals.filter(deal => 
        deal.category && deal.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Sort deals
    if (sortBy) {
      switch (sortBy) {
        case "price_low":
          filteredDeals.sort((a, b) => a.discountedPrice - b.discountedPrice);
          break;
        case "price_high":
          filteredDeals.sort((a, b) => b.discountedPrice - a.discountedPrice);
          break;
        case "discount":
          filteredDeals.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
        case "rating":
          filteredDeals.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filteredDeals.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
          break;
        default:
          // Default sorting - featured first, then by discount percentage
          filteredDeals.sort((a, b) => {
            if (a.isFeatured !== b.isFeatured) {
              return a.isFeatured ? -1 : 1;
            }
            return b.discountPercentage - a.discountPercentage;
          });
      }
    }
    
    // Apply limit
    const limitedDeals = filteredDeals.slice(0, limit);
    
    return {
      success: true,
      deals: limitedDeals,
      totalResults: filteredDeals.length
    };
  } catch (error) {
    console.error("Error fetching deals:", error);
    return {
      success: false,
      message: "Failed to fetch deals. Please try again later.",
      deals: []
    };
  }
};

// Function to fetch a single deal by ID
export const fetchDealById = async (id: string): Promise<Deal | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  try {
    const deal = mockDeals.find(deal => deal.id === id);
    return deal || null;
  } catch (error) {
    console.error("Error fetching deal:", error);
    return null;
  }
};
