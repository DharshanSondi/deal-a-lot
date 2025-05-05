
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
    // Parse the request body to get the type of offers to fetch
    const { type = "all" } = await req.json();
    
    // Determine which endpoint to call based on the offer type
    const endpoint = type === "dotd" 
      ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json"
      : "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
    
    console.log(`Fetching Flipkart offers from: ${endpoint}`);

    if (!FLIPKART_AFFILIATE_ID || !FLIPKART_AFFILIATE_TOKEN) {
      throw new Error("Missing Flipkart affiliate credentials");
    }

    const res = await fetch(endpoint, {
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
    
    // Transform Flipkart API response based on offer type
    const deals = type === "dotd" 
      ? transformDotdOffers(data)
      : transformAllOffers(data);

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
    console.error("Error fetching Flipkart offers:", error);
    
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

// Helper function to transform all offers
function transformAllOffers(data: any): any[] {
  try {
    if (!data.allOffersList) {
      return [];
    }

    return data.allOffersList.map((offer: any, index: number) => {
      const originalPrice = parseFloat(offer.price) || 1000;
      const discountPercentage = parseFloat(offer.discountPercentage) || 10;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
      
      return {
        id: `flipkart-${offer.offerId || index}-${Date.now()}`,
        title: offer.title || "Flipkart Offer",
        description: offer.description || "",
        originalPrice,
        discountedPrice,
        discountPercentage,
        imageUrl: offer.imageUrl || "https://via.placeholder.com/300x300?text=Flipkart+Offer",
        platform: "flipkart",
        externalUrl: offer.url || "",
        rating: 4.2,
        category: offer.category || "General",
      };
    });
  } catch (error) {
    console.error("Error transforming all offers:", error);
    return [];
  }
}

// Helper function to transform deals of the day
function transformDotdOffers(data: any): any[] {
  try {
    if (!data.dotdList) {
      return [];
    }

    return data.dotdList.map((offer: any, index: number) => {
      const originalPrice = parseFloat(offer.price) || 1000;
      const discountPercentage = parseFloat(offer.discountPercentage) || 15;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
      
      return {
        id: `flipkart-dotd-${offer.offerId || index}-${Date.now()}`,
        title: offer.title || "Flipkart Deal of the Day",
        description: offer.description || "",
        originalPrice,
        discountedPrice,
        discountPercentage,
        imageUrl: offer.imageUrl || "https://via.placeholder.com/300x300?text=Flipkart+Deal",
        platform: "flipkart",
        externalUrl: offer.url || "",
        rating: 4.5,
        category: "Deals of the Day",
        isNew: true,
        isTrending: true,
      };
    });
  } catch (error) {
    console.error("Error transforming deals of the day:", error);
    return [];
  }
}
