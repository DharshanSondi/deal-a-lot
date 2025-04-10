
// Environment configuration
type Environment = 'development' | 'production' | 'staging';

interface EnvironmentConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

// Get the current environment
const getEnvironment = (): Environment => {
  if (import.meta.env.MODE === 'production') {
    return 'production';
  }
  return import.meta.env.VITE_ENVIRONMENT as Environment || 'development';
};

// Environment-specific configurations
const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://rdthioybiyrnhfynxxpx.supabase.co',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdGhpb3liaXlybmhmeW54eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODIyMjcsImV4cCI6MjA1ODQ1ODIyN30.tfS0LOdxRQgCUb2hpheAET3jtsoVzgVphQYpUAxtiPI',
    isDevelopment: true,
    isProduction: false,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://api.discounthub.com',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://rdthioybiyrnhfynxxpx.supabase.co',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdGhpb3liaXlybmhmeW54eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODIyMjcsImV4cCI6MjA1ODQ1ODIyN30.tfS0LOdxRQgCUb2hpheAET3jtsoVzgVphQYpUAxtiPI',
    isDevelopment: false,
    isProduction: true,
  },
  staging: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://staging.discounthub.com',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://rdthioybiyrnhfynxxpx.supabase.co',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdGhpb3liaXlybmhmeW54eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODIyMjcsImV4cCI6MjA1ODQ1ODIyN30.tfS0LOdxRQgCUb2hpheAET3jtsoVzgVphQYpUAxtiPI',
    isDevelopment: true,
    isProduction: false,
  },
};

// Get the current environment configuration
const getCurrentConfig = (): EnvironmentConfig => {
  const env = getEnvironment();
  return environments[env];
};

export const config = getCurrentConfig();
