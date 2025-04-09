
// GET Deals API Function
// This function retrieves deals from the database

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Sample function to get deals
    // In a real app, you would connect to your database tables
    const mockDeals = [
      { id: 1, title: "50% off Electronics", store: "Amazon", price: 299 },
      { id: 2, title: "BOGO Clothing Items", store: "Flipkart", price: 499 },
      { id: 3, title: "Flash Sale on Gadgets", store: "Meesho", price: 199 },
    ];

    return new Response(JSON.stringify({ deals: mockDeals }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching deals:`, error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
