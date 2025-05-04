
export interface Deal {
  id: string;
  title: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  platform: 'amazon' | 'flipkart' | 'meesho' | 'other';
  externalUrl: string;
  rating: number;  // Changed from optional to required
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  ratingCount?: number;
  isOutOfStock?: boolean;
}

export interface ApiResponse<T = Deal[]> {
  success: boolean;
  deals: T;
  error?: string; // Changed from message to error
  totalResults?: number;
}
