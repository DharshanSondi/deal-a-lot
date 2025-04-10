
export interface Deal {
  id: string;
  title: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  platform: string;
  externalUrl: string;
  rating: number;
  reviewCount?: number;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  created?: string;
  expires?: string;
}
