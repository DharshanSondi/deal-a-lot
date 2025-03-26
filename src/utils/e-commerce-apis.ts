import { Deal } from "@/types/deals";

interface ApiResponse {
  success: boolean;
  deals: Deal[];
  error?: string;
}

// This function aggregates deals from multiple platforms
export async function fetchDealsFromAllPlatforms(
  query: string = "",
  limit: number = 10
): Promise<ApiResponse> {
  try {
    // In a production environment, these API calls would be made from a backend
    // to keep API keys secure. For this demo, we're simulating the responses.
    const [amazonDeals, flipkartDeals, meeshoDeals] = await Promise.all([
      fetchAmazonDeals(query, limit),
      fetchFlipkartDeals(query, limit),
      fetchMeeshoDeals(query, limit),
    ]);

    const allDeals = [
      ...amazonDeals.deals,
      ...flipkartDeals.deals,
      ...meeshoDeals.deals,
    ].slice(0, limit);

    return {
      success: true,
      deals: allDeals,
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

// Simulated Amazon API (in real implementation, this would call the Amazon API)
async function fetchAmazonDeals(
  query: string = "",
  limit: number = 5
): Promise<ApiResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const deals: Deal[] = Array.from({ length: limit }).map((_, index) => ({
    id: `amazon-${Date.now()}-${index}`,
    title: query
      ? `Amazon ${query} Item ${index + 1}`
      : `Amazon Best Deal ${index + 1}`,
    description: "This is an amazing deal from Amazon with fast delivery options!",
    originalPrice: Math.floor(Math.random() * 10000) + 1000,
    discountedPrice: Math.floor(Math.random() * 1000) + 500,
    discountPercentage: Math.floor(Math.random() * 50) + 10,
    imageUrl: `https://picsum.photos/seed/amazon${index}/400/300`,
    platform: "amazon",
    externalUrl: "https://www.amazon.in",
    rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
    ratingCount: Math.floor(Math.random() * 1000) + 100,
    isNew: Math.random() > 0.7,
    isTrending: Math.random() > 0.8,
  }));

  return {
    success: true,
    deals,
  };
}

// Simulated Flipkart API
async function fetchFlipkartDeals(
  query: string = "",
  limit: number = 5
): Promise<ApiResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const deals: Deal[] = Array.from({ length: limit }).map((_, index) => ({
    id: `flipkart-${Date.now()}-${index}`,
    title: query
      ? `Flipkart ${query} Item ${index + 1}`
      : `Flipkart Special Deal ${index + 1}`,
    description: "Exclusive Flipkart deal with additional bank offers!",
    originalPrice: Math.floor(Math.random() * 8000) + 2000,
    discountedPrice: Math.floor(Math.random() * 1500) + 1000,
    discountPercentage: Math.floor(Math.random() * 40) + 15,
    imageUrl: `https://picsum.photos/seed/flipkart${index}/400/300`,
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com",
    rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
    ratingCount: Math.floor(Math.random() * 2000) + 500,
    isNew: Math.random() > 0.6,
    isTrending: Math.random() > 0.7,
  }));

  return {
    success: true,
    deals,
  };
}

// Simulated Meesho API
async function fetchMeeshoDeals(
  query: string = "",
  limit: number = 5
): Promise<ApiResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const deals: Deal[] = Array.from({ length: limit }).map((_, index) => ({
    id: `meesho-${Date.now()}-${index}`,
    title: query
      ? `Meesho ${query} Item ${index + 1}`
      : `Meesho Budget Deal ${index + 1}`,
    description: "Affordable and quality products from Meesho!",
    originalPrice: Math.floor(Math.random() * 3000) + 500,
    discountedPrice: Math.floor(Math.random() * 400) + 200,
    discountPercentage: Math.floor(Math.random() * 60) + 20,
    imageUrl: `https://picsum.photos/seed/meesho${index}/400/300`,
    platform: "meesho",
    externalUrl: "https://www.meesho.com",
    rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
    ratingCount: Math.floor(Math.random() * 500) + 50,
    isNew: Math.random() > 0.5,
    isTrending: Math.random() > 0.85,
  }));

  return {
    success: true,
    deals,
  };
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
