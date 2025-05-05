
// Follow Deno's recommended practices for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Required Flipkart API headers
const FLIPKART_AFFILIATE_ID = Deno.env.get("FLIPKART_AFFILIATE_ID") || "";
const FLIPKART_AFFILIATE_TOKEN = Deno.env.get("FLIPKART_AFFILIATE_TOKEN") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching Flipkart deals of the day...");

    if (!FLIPKART_AFFILIATE_ID || !FLIPKART_AFFILIATE_TOKEN) {
      throw new Error("Missing Flipkart affiliate credentials");
    }

    const res = await fetch("https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json", {
      headers: {
        "Fk-Affiliate-Id": FLIPKART_AFFILIATE_ID,
        "Fk-Affiliate-Token": FLIPKART_AFFILIATE_TOKEN,
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Flipkart API returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    
    // Transform Flipkart API response to match our Deal interface
    const deals = transformFlipkartOffers(data);

    return new Response(
      JSON.stringify({
        success: true,
        deals,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching Flipkart deals of the day:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        deals: [],
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 but with error in payload for better client handling
      }
    );
  }
});

// Helper function to transform Flipkart API response to our Deal interface
function transformFlipkartOffers(data: any): any[] {
  try {
    if (!data.dotdList) {
      return [];
    }

    return data.dotdList.map((offer: any, index: number) => {
      const discountedPrice = Math.round(offer.price * (1 - (offer.discountPercentage || 0) / 100));
      
      return {
        id: `flipkart-dotd-${offer.offerId || index}`,
        title: offer.title || "Flipkart Deal of the Day",
        description: offer.description || "",
        originalPrice: offer.price || 0,
        discountedPrice: discountedPrice,
        discountPercentage: offer.discountPercentage || 0,
        imageUrl: offer.imageUrl || "https://via.placeholder.com/300x300?text=Flipkart+Deal",
        platform: "flipkart",
        externalUrl: offer.url || "",
        rating: offer.rating || 4.5,
        category: offer.category || "Deals of the Day",
        isNew: true,
        isTrending: true,
      };
    });
  } catch (error) {
    console.error("Error transforming Flipkart deals of the day:", error);
    return [];
  }
}
