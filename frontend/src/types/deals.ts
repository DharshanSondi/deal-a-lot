
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
  rating: number;
  reviewCount?: number;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  created?: string;
  expires?: string;
  ratingCount?: number;
  isOutOfStock?: boolean;
}
