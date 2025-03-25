
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
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  rating?: number;
  ratingCount?: number;
  isOutOfStock?: boolean;
}
