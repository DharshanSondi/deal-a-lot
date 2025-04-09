// GET Deals API Function
// This function retrieves deals from various e-commerce platforms

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
    // Get query parameters
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const platform = url.searchParams.get("platform") || "";
    const category = url.searchParams.get("category") || "";

    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // In a production environment, you would fetch real deals from e-commerce APIs
    // For now, we'll generate more realistic mock data
    const deals = generateDeals(query, limit, platform, category);

    return new Response(JSON.stringify({ deals, success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching deals:`, error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

function generateDeals(query = "", limit = 50, platform = "", category = "") {
  // Generate a realistic set of deals
  const platforms = ['amazon', 'flipkart', 'meesho'];
  const categories = ['electronics', 'fashion', 'home', 'beauty', 'toys', 'books', 'appliances', 'sports', 'grocery'];
  
  // Popular electronics products
  const electronics = [
    { name: "Apple iPhone 15", desc: "Latest model with A16 Bionic chip and improved camera", price: 79900 },
    { name: "Samsung Galaxy S24 Ultra", desc: "5G smartphone with 108MP camera and S Pen", price: 109999 },
    { name: "Sony WH-1000XM5", desc: "Industry-leading noise cancellation headphones", price: 29990 },
    { name: "Apple MacBook Air M3", desc: "Ultra-thin laptop with all-day battery life", price: 114900 },
    { name: "OnePlus 12", desc: "Flagship killer with Snapdragon 8 Gen 3", price: 64999 },
    { name: "Apple Watch Series 9", desc: "Advanced health monitoring and fitness tracking", price: 41900 },
    { name: "Dell XPS 15", desc: "Premium laptop with 4K OLED display", price: 149990 },
    { name: "iPad Pro 12.9", desc: "Powerful tablet with M2 chip and Liquid Retina XDR display", price: 119900 },
    { name: "Bose QuietComfort Earbuds II", desc: "True wireless noise cancelling earbuds", price: 24900 },
    { name: "LG C3 65-inch OLED TV", desc: "4K Smart TV with perfect blacks and infinite contrast", price: 179990 },
    { name: "DJI Mini 4 Pro", desc: "Ultralight drone with 4K camera and obstacle avoidance", price: 89900 },
    { name: "Canon EOS R6 Mark II", desc: "Full-frame mirrorless camera for professionals", price: 239990 },
  ];
  
  // Popular fashion products
  const fashion = [
    { name: "Levi's 501 Original Jeans", desc: "Iconic straight fit denim", price: 4999 },
    { name: "Nike Air Jordan 1", desc: "Legendary basketball shoes", price: 12995 },
    { name: "Ray-Ban Aviator Sunglasses", desc: "Classic timeless design", price: 6990 },
    { name: "Adidas Ultraboost", desc: "Premium running shoes with responsive cushioning", price: 15999 },
    { name: "Casio G-Shock", desc: "Rugged digital watch with world time", price: 9995 },
    { name: "Tommy Hilfiger Men's Polo", desc: "Classic fit with flag logo", price: 3999 },
    { name: "Michael Kors Jet Set Tote", desc: "Designer handbag with signature print", price: 24990 },
    { name: "Allen Solly Formal Shirt", desc: "Wrinkle-free cotton formal shirt", price: 1999 },
    { name: "Puma Active T-Shirt", desc: "Moisture-wicking training tee", price: 1499 },
    { name: "H&M Slim Fit Blazer", desc: "Modern cut jacket for formal occasions", price: 6999 },
  ];
  
  // Popular home products
  const home = [
    { name: "Philips Air Fryer", desc: "Healthy cooking with 90% less fat", price: 12999 },
    { name: "Dyson V12 Vacuum", desc: "Powerful cordless cleaning", price: 44990 },
    { name: "Instant Pot Duo", desc: "7-in-1 pressure cooker", price: 9995 },
    { name: "Cello Water Bottle Set", desc: "Pack of 6 glass bottles with lids", price: 1299 },
    { name: "Milton Thermosteel Flask", desc: "24-hour temperature retention", price: 999 },
    { name: "Urban Ladder Sofa", desc: "3-seater fabric sofa with wooden accents", price: 49990 },
    { name: "Nilkamal Plastic Chair Set", desc: "Pack of 4 durable outdoor chairs", price: 2999 },
    { name: "Bombay Dyeing Bed Sheet", desc: "100% cotton king size with 2 pillow covers", price: 1499 },
    { name: "Prestige Induction Cooktop", desc: "1800W with auto shut-off", price: 3499 },
    { name: "Bajaj OTG Oven", desc: "35L capacity with temperature control", price: 7990 },
  ];
  
  // Map all products by category
  const productsByCategory = {
    electronics,
    fashion,
    home,
    beauty: [
      { name: "Maybelline Fit Me Foundation", desc: "Matte + Poreless for natural finish", price: 499 },
      { name: "MAC Retro Matte Lipstick", desc: "Ruby Woo - classic red shade", price: 1950 },
      { name: "Forest Essentials Face Wash", desc: "Ayurvedic cleansing with neem", price: 1175 },
      { name: "Lakme Eyeconic Kajal", desc: "Long-lasting waterproof eye liner", price: 299 },
      { name: "L'Oreal Paris Shampoo", desc: "Total Repair 5 damaged hair formula", price: 599 },
    ],
    toys: [
      { name: "LEGO Classic Creative Box", desc: "1500 pieces for endless creativity", price: 2999 },
      { name: "Funskool Monopoly", desc: "Classic property trading board game", price: 999 },
      { name: "Nerf Elite Blaster", desc: "Dart gun with tactical rail", price: 1499 },
      { name: "Hot Wheels 10 Car Pack", desc: "Die-cast vehicles collection", price: 799 },
      { name: "Barbie Dreamhouse", desc: "3-story doll house with furniture", price: 9999 },
    ],
    books: [
      { name: "Atomic Habits", desc: "James Clear's guide to building good habits", price: 499 },
      { name: "Ikigai", desc: "Japanese secret to a long and happy life", price: 350 },
      { name: "The Psychology of Money", desc: "Morgan Housel's timeless lessons", price: 399 },
      { name: "Harry Potter Box Set", desc: "Complete collection of all 7 books", price: 3999 },
      { name: "Rich Dad Poor Dad", desc: "Robert Kiyosaki's financial education classic", price: 399 },
    ],
    appliances: [
      { name: "Samsung 8kg Washing Machine", desc: "Fully automatic front load with inverter", price: 38990 },
      { name: "LG 260L Refrigerator", desc: "Frost-free double door with smart inverter", price: 29990 },
      { name: "Haier 1.5 Ton AC", desc: "5-star split AC with copper condenser", price: 35990 },
      { name: "IFB Microwave Oven", desc: "30L convection model with starter kit", price: 15990 },
      { name: "Crompton Ceiling Fan", desc: "1200mm high-speed with remote control", price: 2999 },
    ],
    sports: [
      { name: "Yonex Badminton Racket", desc: "Astrox series graphite frame", price: 4999 },
      { name: "Cosco Cricket Kit", desc: "Full set with bat, ball, and pads", price: 2999 },
      { name: "Nivia Football", desc: "FIFA approved match ball", price: 999 },
      { name: "Fitbit Charge 5", desc: "Advanced fitness tracker with GPS", price: 14999 },
      { name: "Strauss Yoga Mat", desc: "6mm thickness anti-slip exercise mat", price: 799 },
    ],
    grocery: [
      { name: "Tata Sampann Dal Pack", desc: "Assorted pulses, 5kg multipack", price: 799 },
      { name: "Fortune Sunflower Oil", desc: "5L refined cooking oil", price: 999 },
      { name: "MDH Spices Box", desc: "Set of 12 essential Indian spices", price: 599 },
      { name: "Himalayan Honey", desc: "500g pure unprocessed natural honey", price: 449 },
      { name: "Kellogg's Corn Flakes", desc: "1kg family pack breakfast cereal", price: 399 },
    ],
  };
  
  let allProducts = [];
  
  // If category is specified, only get products from that category
  if (category && productsByCategory[category.toLowerCase()]) {
    allProducts = [...productsByCategory[category.toLowerCase()]];
  } else {
    // Otherwise get products from all categories
    Object.values(productsByCategory).forEach(categoryProducts => {
      allProducts = [...allProducts, ...categoryProducts];
    });
  }
  
  // Filter by search query if provided
  if (query) {
    const lowerQuery = query.toLowerCase();
    allProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.desc.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Generate deals from the filtered products
  return allProducts.slice(0, limit).map((product, index) => {
    // Randomize the platform if not specified
    const dealPlatform = platform ? platform : platforms[Math.floor(Math.random() * platforms.length)];
    
    // Determine category if product was added without explicit category
    let dealCategory;
    for (const [cat, products] of Object.entries(productsByCategory)) {
      if (products.some(p => p.name === product.name)) {
        dealCategory = cat;
        break;
      }
    }
    
    // If category still not found, pick random one
    if (!dealCategory) {
      dealCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    
    const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10-60% discount
    const discountedPrice = Math.round(product.price * (100 - discountPercentage) / 100);
    
    return {
      id: `${dealPlatform}-${Date.now()}-${index}`,
      title: product.name,
      description: product.desc,
      originalPrice: product.price,
      discountedPrice: discountedPrice,
      discountPercentage: discountPercentage,
      imageUrl: `https://picsum.photos/seed/${dealPlatform}${Date.now()}${index}/400/300`,
      platform: dealPlatform,
      externalUrl: dealPlatform === 'amazon' ? 'https://www.amazon.in/' : 
                  dealPlatform === 'flipkart' ? 'https://www.flipkart.com/' : 
                  'https://www.meesho.com/',
      rating: (Math.floor(Math.random() * 15) + 30) / 10, // 3.0-4.5 rating
      ratingCount: Math.floor(Math.random() * 3000) + 100, // 100-3100 ratings
      isNew: Math.random() > 0.7,
      isTrending: Math.random() > 0.8,
      category: dealCategory,
      isOutOfStock: Math.random() > 0.95, // 5% chance of being out of stock
    };
  });
}
