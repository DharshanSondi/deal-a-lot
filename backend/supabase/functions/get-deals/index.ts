
// GET Deals API Function
// This function retrieves deals from various e-commerce platforms

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

// IMPORTANT: Add CORS headers to allow cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { query = "", limit = 50, platform = "", category = "" } = body;

    console.log(`Fetching deals with: query=${query}, limit=${limit}, platform=${platform}, category=${category}`);

    // Create a Supabase client with the service role key for admin access
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generate more realistic pre-defined product data
    const deals = generateDeals(query, limit, platform, category);

    return new Response(
      JSON.stringify({ 
        deals, 
        success: true 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(`Error fetching deals:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to fetch deals", 
        success: false,
        deals: [] 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

function generateDeals(query = "", limit = 50, platform = "", category = "") {
  // Pre-defined products from Amazon, Flipkart, and Meesho
  const preDefinedDeals = [
    // Amazon Electronics
    {
      id: "amazon-1",
      title: "Apple iPhone 15 (128GB) - Blue",
      description: "6.1-inch Super Retina XDR display, A16 Bionic chip, 48MP camera system, Dynamic Island",
      originalPrice: 79900,
      discountedPrice: 74900,
      discountPercentage: 6,
      imageUrl: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
      platform: "amazon",
      externalUrl: "https://www.amazon.in/dp/B0CHX2F5QT",
      rating: 4.5,
      ratingCount: 2456,
      category: "electronics",
      isNew: true,
      isTrending: true
    },
    {
      id: "amazon-2",
      title: "OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB)",
      description: "Snapdragon 8 Gen 3, 50MP+48MP+64MP Hasselblad camera, 5400 mAh battery with 100W charging",
      originalPrice: 64999,
      discountedPrice: 57999,
      discountPercentage: 11,
      imageUrl: "https://m.media-amazon.com/images/I/61cU9RYxgvL._SX679_.jpg",
      platform: "amazon",
      externalUrl: "https://www.amazon.in/dp/B0CT18PKP8",
      rating: 4.3,
      ratingCount: 1287,
      category: "electronics",
      isTrending: true
    },
    {
      id: "amazon-3",
      title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB)",
      description: "Dynamic AMOLED 2X display, 200MP camera system, Snapdragon 8 Gen 3, S Pen included",
      originalPrice: 129999,
      discountedPrice: 119999,
      discountPercentage: 8,
      imageUrl: "https://m.media-amazon.com/images/I/71CXhVypIkL._SX679_.jpg",
      platform: "amazon",
      externalUrl: "https://www.amazon.in/dp/B0CSZYVVP9",
      rating: 4.6,
      ratingCount: 834,
      category: "electronics",
      isNew: true,
      isTrending: true
    },
    // Amazon Home
    {
      id: "amazon-4",
      title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
      description: "7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer",
      originalPrice: 9995,
      discountedPrice: 6995,
      discountPercentage: 30,
      imageUrl: "https://m.media-amazon.com/images/I/71WtwEvYDOS._SX679_.jpg",
      platform: "amazon",
      externalUrl: "https://www.amazon.in/dp/B01NBKTPTS",
      rating: 4.7,
      ratingCount: 5672,
      category: "home",
      isTrending: true
    },
    {
      id: "amazon-5",
      title: "Dyson V15 Detect Cordless Vacuum Cleaner",
      description: "Precisely-angled laser makes invisible dust visible on hard floors, LCD screen shows real-time science proof",
      originalPrice: 65900,
      discountedPrice: 55900,
      discountPercentage: 15,
      imageUrl: "https://m.media-amazon.com/images/I/61a0Ro9xfPL._SX679_.jpg",
      platform: "amazon",
      externalUrl: "https://www.amazon.in/dp/B0BW4S7X2F",
      rating: 4.4,
      ratingCount: 789,
      category: "home",
      isNew: true
    },
    
    // Flipkart Electronics
    {
      id: "flipkart-1",
      title: "APPLE MacBook Air M3 (16GB RAM, 512GB SSD)",
      description: "13.6-inch Liquid Retina display, 8-core CPU, 10-core GPU, MagSafe charging, 1080p FaceTime HD camera",
      originalPrice: 149900,
      discountedPrice: 139900,
      discountPercentage: 7,
      imageUrl: "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/y/i/o/macbook-air-mxuw3hn-a-thin-and-light-laptop-apple-original-imagtye4xkkqjbfu.jpeg",
      platform: "flipkart",
      externalUrl: "https://www.flipkart.com/product/p/itme?pid=COMGZCF8HZGJGZWT",
      rating: 4.8,
      ratingCount: 456,
      category: "electronics",
      isNew: true,
      isTrending: true
    },
    {
      id: "flipkart-2",
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      description: "Industry Leading Noise Cancellation, 30-hour battery life, Speak-to-chat function, Multi-point connection",
      originalPrice: 34990,
      discountedPrice: 27990,
      discountPercentage: 20,
      imageUrl: "https://rukminim2.flixcart.com/image/416/416/l3rmzrk0/headphone/e/q/g/-original-imagetjyhhphtvfu.jpeg",
      platform: "flipkart",
      externalUrl: "https://www.flipkart.com/product/p/itme?pid=ACCG43FFBXRGZHEQ",
      rating: 4.7,
      ratingCount: 1245,
      category: "electronics",
      isTrending: true
    },
    // Flipkart Fashion
    {
      id: "flipkart-3",
      title: "Nike Air Jordan 1 Mid Basketball Shoes For Men",
      description: "Iconic style with premium leather upper, Air-Sole unit for lightweight cushioning, rubber outsole for traction",
      originalPrice: 12995,
      discountedPrice: 9995,
      discountPercentage: 23,
      imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/r/e/m/-original-imaghvb5rkpxdczz.jpeg",
      platform: "flipkart",
      externalUrl: "https://www.flipkart.com/product/p/itme?pid=SHOG9URYHZGTCREM",
      rating: 4.5,
      ratingCount: 834,
      category: "fashion",
      isTrending: true
    },
    {
      id: "flipkart-4",
      title: "ADIDAS Ultraboost 22 Running Shoes For Men",
      description: "Responsive Boost midsole, Primeknit+ upper, Continental™ Rubber outsole for extraordinary grip",
      originalPrice: 19999,
      discountedPrice: 14999,
      discountPercentage: 25,
      imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/l/a/t/-original-imagg6rc35knznhw.jpeg",
      platform: "flipkart",
      externalUrl: "https://www.flipkart.com/product/p/itme?pid=SHOG6G8VXJKYBDWR",
      rating: 4.6,
      ratingCount: 567,
      category: "fashion",
      isNew: true
    },
    
    // Meesho Fashion
    {
      id: "meesho-1",
      title: "Fashionable Trendy Women Dresses",
      description: "Trendy Fancy Crepe Printed Maxi Dresses For Women, comfortable and stylish",
      originalPrice: 1999,
      discountedPrice: 499,
      discountPercentage: 75,
      imageUrl: "https://images.meesho.com/images/products/178529700/j0b3e_512.jpg",
      platform: "meesho",
      externalUrl: "https://www.meesho.com/product/178529700",
      rating: 4.2,
      ratingCount: 345,
      category: "fashion",
      isNew: true
    },
    {
      id: "meesho-2",
      title: "Men's Cotton Blend Straight Kurta",
      description: "Traditional solid kurta with elegant design, perfect for festivals and occasions",
      originalPrice: 1299,
      discountedPrice: 399,
      discountPercentage: 69,
      imageUrl: "https://images.meesho.com/images/products/10097324/78f90_512.jpg",
      platform: "meesho",
      externalUrl: "https://www.meesho.com/product/10097324",
      rating: 4.3,
      ratingCount: 789,
      category: "fashion",
      isTrending: true
    },
    // Meesho Home
    {
      id: "meesho-3",
      title: "Elegant Printed Bedsheet Set",
      description: "Double bed cotton bedsheet with 2 pillow covers, colorfast and easy to wash",
      originalPrice: 1499,
      discountedPrice: 499,
      discountPercentage: 67,
      imageUrl: "https://images.meesho.com/images/products/42041547/bdpsz_512.jpg",
      platform: "meesho",
      externalUrl: "https://www.meesho.com/product/42041547",
      rating: 4.1,
      ratingCount: 456,
      category: "home"
    },
    {
      id: "meesho-4",
      title: "Stylish Artificial Flowers with Pot",
      description: "Decorative artificial flowers for home decor, perfect for living room or office",
      originalPrice: 899,
      discountedPrice: 299,
      discountPercentage: 67,
      imageUrl: "https://images.meesho.com/images/products/13752588/acpiq_512.jpg",
      platform: "meesho",
      externalUrl: "https://www.meesho.com/product/13752588",
      rating: 4.4,
      ratingCount: 234,
      category: "home",
      isNew: true
    }
  ];
  
  // Create a deep copy of the pre-defined deals array
  let filteredDeals = JSON.parse(JSON.stringify(preDefinedDeals));
  
  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredDeals = filteredDeals.filter(deal => 
      deal.title.toLowerCase().includes(searchTerm) || 
      deal.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by platform
  if (platform) {
    filteredDeals = filteredDeals.filter(deal => deal.platform === platform.toLowerCase());
  }
  
  // Filter by category
  if (category) {
    filteredDeals = filteredDeals.filter(deal => deal.category === category.toLowerCase());
  }
  
  // Apply limit
  const limitedDeals = filteredDeals.slice(0, limit);
  
  return limitedDeals;
}
