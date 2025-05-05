
// Supabase Edge Function: Get Flipkart Offers
// This function fetches real-time offers from Flipkart's API endpoints

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers to allow cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define endpoints for different offer types
const ENDPOINTS = {
  ALL_OFFERS: "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json",
  DEALS_OF_THE_DAY: "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Parse request body to determine which endpoint to use
    // Updated to get parameters from request body instead of URL query
    const { type = "all" } = await req.json();
    
    // Select the appropriate endpoint
    const apiEndpoint = type === "dotd" 
      ? ENDPOINTS.DEALS_OF_THE_DAY 
      : ENDPOINTS.ALL_OFFERS;
    
    console.log(`Fetching Flipkart offers from: ${apiEndpoint}`);
    
    // Fetch data from Flipkart API
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    
    // Process the data to match our app's format
    const processedDeals = processFlipkartOffers(data);

    return new Response(
      JSON.stringify({ 
        success: true,
        deals: processedDeals
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(`Error fetching Flipkart offers:`, error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Failed to fetch offers from Flipkart",
        deals: [] 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

// Function to transform Flipkart API response to our app's deal format
function processFlipkartOffers(data) {
  try {
    if (!data || !data.allOffersList) {
      return [];
    }
    
    return data.allOffersList.map(offer => {
      // Extract relevant information from the offer
      const title = offer.title || "Flipkart Offer";
      const description = offer.description || "";
      const imageUrl = offer.imageUrls?.[0]?.url || "https://rukminim2.flixcart.com/www/300/300/promos/24/06/2020/d1e8a4f1-265a-4e06-b18a-621a8830a234.png";
      const externalUrl = offer.url || "";
      
      // Extract price information if available
      const originalPriceMatch = description.match(/MRP:?\s*(?:Rs\.|₹)?(\d+(?:,\d+)*)/i);
      const discountedPriceMatch = description.match(/Price:?\s*(?:Rs\.|₹)?(\d+(?:,\d+)*)/i);
      const discountPercentageMatch = description.match(/(\d+)%\s*(?:OFF|discount)/i);
      
      // Parse prices and calculate discount if not explicitly provided
      let originalPrice = originalPriceMatch ? parseInt(originalPriceMatch[1].replace(/,/g, '')) : 0;
      let discountedPrice = discountedPriceMatch ? parseInt(discountedPriceMatch[1].replace(/,/g, '')) : 0;
      let discountPercentage = discountPercentageMatch ? parseInt(discountPercentageMatch[1]) : 0;
      
      // If we have both prices but no percentage, calculate it
      if (originalPrice && discountedPrice && !discountPercentage) {
        discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
      }
      
      // If we have percentage and one price, calculate the other
      if (discountPercentage && originalPrice && !discountedPrice) {
        discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
      } else if (discountPercentage && discountedPrice && !originalPrice) {
        originalPrice = Math.round(discountedPrice / (1 - discountPercentage / 100));
      }
      
      // If we still don't have valid prices, set default values
      if (!originalPrice || !discountedPrice) {
        originalPrice = 1000;
        discountPercentage = 20;
        discountedPrice = 800;
      }

      // Format into our app's deal structure
      return {
        id: `flipkart-${Math.random().toString(36).substring(2, 10)}`,
        title,
        description,
        originalPrice,
        discountedPrice,
        discountPercentage,
        imageUrl,
        platform: 'flipkart',
        externalUrl,
        rating: 4.2 + Math.random() * 0.7, // Random rating between 4.2 and 4.9
        ratingCount: Math.floor(100 + Math.random() * 900), // Random rating count between 100 and 999
        category: offer.category || "general",
        isNew: Math.random() > 0.7,
        isTrending: Math.random() > 0.5,
      };
    });
  } catch (error) {
    console.error("Error processing Flipkart offers:", error);
    return [];
  }
}
