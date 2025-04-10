
export interface Deal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  category?: string;
  platform: string;
  externalUrl: string;
  created: string;
  expires: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  deals: T[];
  totalResults?: number;
}
