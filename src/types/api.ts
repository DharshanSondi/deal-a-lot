
export interface ApiProvider {
  name: string;
  type: 'affiliate' | 'scraping' | 'direct';
  isActive: boolean;
  baseUrl?: string;
  apiKey?: string;
  rateLimit?: number;
}

export interface DealSource {
  id: string;
  name: string;
  platform: string;
  category: string;
  lastUpdated: string;
  isActive: boolean;
  apiProvider?: ApiProvider;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  source?: string;
  timestamp?: string;
  totalResults?: number;
}

export interface RealTimeConfig {
  updateInterval: number; // in minutes
  maxRetries: number;
  enableBackup: boolean;
  sources: DealSource[];
}
