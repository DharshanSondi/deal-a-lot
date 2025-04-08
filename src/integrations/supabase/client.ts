
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rdthioybiyrnhfynxxpx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdGhpb3liaXlybmhmeW54eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODIyMjcsImV4cCI6MjA1ODQ1ODIyN30.tfS0LOdxRQgCUb2hpheAET3jtsoVzgVphQYpUAxtiPI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});
