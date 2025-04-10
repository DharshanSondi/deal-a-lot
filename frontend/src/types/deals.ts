
export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  platform: string;
  imageUrl: string;
  externalUrl: string;
  isNew?: boolean;
  isTrending?: boolean;
  rating?: number;
  category?: string;
  featuredImage?: string;
}
