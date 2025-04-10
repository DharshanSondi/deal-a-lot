
import { config } from "@/config/environment";

export const supabaseConfig = {
  url: config.supabaseUrl,
  anonKey: config.supabaseAnonKey,
  apiUrl: config.apiUrl,
};
