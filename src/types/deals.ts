
export interface Deal {
  id: string;
  title: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  platform: string;
  category?: string;
  isNew?: boolean;
  rating?: number;
  ratingCount?: number;
  link?: string;
}
