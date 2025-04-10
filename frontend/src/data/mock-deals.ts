import { Deal } from "@/types/deals";

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Apple iPhone 13 (128GB) - Midnight",
    description: "15 cm (6.1-inch) Super Retina XDR display, A15 Bionic chip for lightning-fast performance",
    originalPrice: 79900,
    discountedPrice: 59999,
    discountPercentage: 25,
    imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
    rating: 4.5,
    platform: "amazon",
    externalUrl: "https://www.amazon.in/",
    category: "electronics",
    isNew: false,
    isTrending: true,
  },
  {
    id: "2",
    title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    description: "Industry leading noise cancellation with Dual Noise Sensor technology",
    originalPrice: 29990,
    discountedPrice: 22990,
    discountPercentage: 23,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1488&q=80",
    rating: 4.7,
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com/",
    category: "electronics",
    isNew: true,
    isTrending: false,
  },
  {
    id: "3",
    title: "Samsung Galaxy S22 Ultra 256GB - Phantom Black",
    description: "The Samsung Galaxy S22 Ultra features an immersive 6.8-inch Dynamic AMOLED 2X display, S Pen functionality, and a powerful camera system for stunning photos day and night.",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    originalPrice: 109999,
    discountedPrice: 94999,
    discountPercentage: 14,
    rating: 4.7,
    reviewCount: 1857,
    isNew: false,
    isFeatured: true,
    category: "electronics",
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com",
    created: new Date("2023-02-10").toISOString(),
    expires: new Date("2023-07-15").toISOString()
  },
  {
    id: "4",
    title: "Apple MacBook Air M2 Chip 8GB RAM 256GB SSD",
    description: "Supercharged by the M2 chip, the redesigned MacBook Air combines incredible performance and up to 18 hours of battery life into an impossibly thin design.",
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    originalPrice: 119900,
    discountedPrice: 107910,
    discountPercentage: 10,
    rating: 4.8,
    reviewCount: 1245,
    isNew: true,
    isFeatured: true,
    category: "electronics",
    platform: "croma",
    externalUrl: "https://www.croma.com",
    created: new Date("2023-03-01").toISOString(),
    expires: new Date("2023-08-01").toISOString()
  },
  {
    id: "5",
    title: "Dell XPS 15 - Intel Core i7, 16GB RAM, 512GB SSD",
    description: "Premium laptop with a stunning 15.6-inch InfinityEdge display, powerful performance, and long battery life for professionals and creators.",
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    originalPrice: 149990,
    discountedPrice: 129990,
    discountPercentage: 13,
    rating: 4.6,
    reviewCount: 832,
    isNew: true,
    isFeatured: false,
    category: "electronics",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-04-01").toISOString(),
    expires: new Date("2023-09-01").toISOString()
  },
  {
    id: "6",
    title: "Bose QuietComfort Earbuds II - Noise Cancelling",
    description: "The world's best noise cancelling in-ear headphones with personalized sound and up to 6 hours of battery life.",
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 24900,
    discountedPrice: 19900,
    discountPercentage: 20,
    rating: 4.7,
    reviewCount: 1524,
    isNew: true,
    isFeatured: false,
    category: "electronics",
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com",
    created: new Date("2023-03-15").toISOString(),
    expires: new Date("2023-08-15").toISOString()
  },
  
  // Fashion Category
  {
    id: "f1",
    title: "Men's Classic-Fit Wrinkle-Resistant Flat-Front Chino Pant",
    description: "These classic-fit chinos feature wrinkle-resistant fabric for a polished look that lasts all day. The flat-front design offers a clean, sleek appearance.",
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    originalPrice: 2499,
    discountedPrice: 1599,
    discountPercentage: 36,
    rating: 4.5,
    reviewCount: 2347,
    isNew: false,
    isFeatured: true,
    category: "fashion",
    platform: "myntra",
    externalUrl: "https://www.myntra.com",
    created: new Date("2023-02-05").toISOString(),
    expires: new Date("2023-07-10").toISOString()
  },
  {
    id: "f2",
    title: "Women's Cotton Blend Straight Kurta with Palazzo Set",
    description: "This elegant kurta and palazzo set is crafted from soft, breathable cotton blend fabric, perfect for everyday wear and special occasions.",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    originalPrice: 2999,
    discountedPrice: 1259,
    discountPercentage: 58,
    rating: 4.3,
    reviewCount: 1856,
    isNew: false,
    isFeatured: true,
    category: "fashion",
    platform: "ajio",
    externalUrl: "https://www.ajio.com",
    created: new Date("2023-01-25").toISOString(),
    expires: new Date("2023-06-20").toISOString()
  },
  {
    id: "f3",
    title: "Levi's 511 Slim Fit Men's Jeans - Dark Wash",
    description: "The 511 Slim Fit Jeans are a modern slim with room to move—a classic since 2006. These jeans sit below the waist with a slim fit through the hip and thigh.",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
    originalPrice: 3599,
    discountedPrice: 2159,
    discountPercentage: 40,
    rating: 4.6,
    reviewCount: 3289,
    isNew: false,
    isFeatured: false,
    category: "fashion",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-02-18").toISOString(),
    expires: new Date("2023-07-18").toISOString()
  },
  {
    id: "f4",
    title: "Women's Floral Print Maxi Dress - Summer Collection",
    description: "This beautiful floral print maxi dress features a flattering silhouette, adjustable straps, and lightweight fabric perfect for summer days.",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=746&q=80",
    originalPrice: 1999,
    discountedPrice: 1399,
    discountPercentage: 30,
    rating: 4.4,
    reviewCount: 982,
    isNew: true,
    isFeatured: true,
    category: "fashion",
    platform: "myntra",
    externalUrl: "https://www.myntra.com",
    created: new Date("2023-03-10").toISOString(),
    expires: new Date("2023-08-10").toISOString()
  },
  
  // Home & Kitchen Category
  {
    id: "h1",
    title: "Prestige Electric Kettle 1.5L - Silver",
    description: "This 1500W electric kettle boils water quickly with auto shut-off for safety. The 1.5L capacity is perfect for families, and the cordless design offers convenience.",
    imageUrl: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    originalPrice: 1495,
    discountedPrice: 999,
    discountPercentage: 33,
    rating: 4.4,
    reviewCount: 4532,
    isNew: false,
    isFeatured: true,
    category: "home",
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com",
    created: new Date("2023-01-10").toISOString(),
    expires: new Date("2023-06-15").toISOString()
  },
  {
    id: "h2",
    title: "Wonderchef Nutri-Blend 400W Mixer Grinder with 3 Jars",
    description: "This versatile mixer grinder features a powerful 400W motor and comes with 3 jars for different kitchen tasks. Perfect for smoothies, chutneys, and grinding spices.",
    imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    originalPrice: 3999,
    discountedPrice: 2199,
    discountPercentage: 45,
    rating: 4.6,
    reviewCount: 2875,
    isNew: true,
    isFeatured: true,
    category: "home",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-03-05").toISOString(),
    expires: new Date("2023-08-05").toISOString()
  },
  {
    id: "h3",
    title: "Philips Air Purifier with HEPA Filter - AC1215/20",
    description: "Philips AC1215/20 Air Purifier removes 99.97% of airborne pollutants with its HEPA filter. Ideal for rooms up to 32 sq.m, with air quality feedback and auto mode.",
    imageUrl: "https://images.unsplash.com/photo-1573649263085-db3f7c4ca6f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 10995,
    discountedPrice: 8499,
    discountPercentage: 23,
    rating: 4.5,
    reviewCount: 1842,
    isNew: false,
    isFeatured: false,
    category: "home",
    platform: "croma",
    externalUrl: "https://www.croma.com",
    created: new Date("2023-02-14").toISOString(),
    expires: new Date("2023-07-14").toISOString()
  },
  {
    id: "h4",
    title: "Borosil Glass Food Storage Containers Set of 3",
    description: "Microwave-safe glass containers with airtight lids, perfect for storing leftovers and meal prep. Dishwasher safe and BPA-free.",
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercentage: 33,
    rating: 4.7,
    reviewCount: 932,
    isNew: true,
    isFeatured: false,
    category: "home",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-03-25").toISOString(),
    expires: new Date("2023-08-25").toISOString()
  },
  
  // Beauty & Health Category
  {
    id: "b1",
    title: "Mamaearth Vitamin C Face Serum with Vitamin C and Turmeric",
    description: "This brightening serum combines the power of Vitamin C and turmeric to reduce dark spots and even out skin tone, giving you radiant, glowing skin.",
    imageUrl: "https://images.unsplash.com/photo-1596097635121-14b65d4f9c09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    originalPrice: 999,
    discountedPrice: 699,
    discountPercentage: 30,
    rating: 4.5,
    reviewCount: 5423,
    isNew: false,
    isFeatured: true,
    category: "beauty",
    platform: "nykaa",
    externalUrl: "https://www.nykaa.com",
    created: new Date("2023-02-20").toISOString(),
    expires: new Date("2023-07-20").toISOString()
  },
  {
    id: "b2",
    title: "Forest Essentials Facial Ubtan - 50g",
    description: "Traditional Ayurvedic cleansing powder made with pure herbs, saffron, and turmeric for bright, clear skin. Gentle exfoliating properties for all skin types.",
    imageUrl: "https://images.unsplash.com/photo-1643185694496-e163f7ab8e28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 1575,
    discountedPrice: 1260,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 1264,
    isNew: false,
    isFeatured: false,
    category: "beauty",
    platform: "nykaa",
    externalUrl: "https://www.nykaa.com",
    created: new Date("2023-01-15").toISOString(),
    expires: new Date("2023-06-15").toISOString()
  },
  {
    id: "b3",
    title: "Himalaya Wellness Pure Herbs Ashvagandha - 60 Tablets",
    description: "Ayurvedic supplement that helps reduce stress and anxiety, improves energy, and promotes overall wellness and immunity.",
    imageUrl: "https://images.unsplash.com/photo-1577384051049-abc431aafe56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 290,
    discountedPrice: 199,
    discountPercentage: 31,
    rating: 4.6,
    reviewCount: 3872,
    isNew: true,
    isFeatured: true,
    category: "beauty",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-03-05").toISOString(),
    expires: new Date("2023-08-05").toISOString()
  },
  
  // Toys & Games Category
  {
    id: "t1",
    title: "LEGO Classic Large Creative Brick Box Building Set",
    description: "Inspire endless creativity with this LEGO Classic set featuring colorful bricks in 33 different colors. Includes windows, eyes, and lots of wheels for creating vehicles.",
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    originalPrice: 2999,
    discountedPrice: 2399,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 3241,
    isNew: false,
    isFeatured: true,
    category: "toys",
    platform: "firstcry",
    externalUrl: "https://www.firstcry.com",
    created: new Date("2023-02-15").toISOString(),
    expires: new Date("2023-07-15").toISOString()
  },
  {
    id: "t2",
    title: "Nerf Elite 2.0 Commander RD-6 Blaster",
    description: "Motorized Nerf blaster with 6-dart rotating drum and tactical rails. Includes 12 official Nerf Elite darts for indoor and outdoor fun.",
    imageUrl: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercentage: 33,
    rating: 4.4,
    reviewCount: 542,
    isNew: true,
    isFeatured: false,
    category: "toys",
    platform: "amazon",
    externalUrl: "https://www.amazon.com",
    created: new Date("2023-03-10").toISOString(),
    expires: new Date("2023-08-10").toISOString()
  },
  {
    id: "t3",
    title: "Funskool Monopoly - The Original Board Game",
    description: "The classic property trading board game for 2-6 players. Buy, sell, trade, and build your way to become the wealthiest player and win!",
    imageUrl: "https://images.unsplash.com/photo-1611371805429-8b5c1f0ab9c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    originalPrice: 899,
    discountedPrice: 699,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 1589,
    isNew: false,
    isFeatured: true,
    category: "toys",
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com",
    created: new Date("2023-01-20").toISOString(),
    expires: new Date("2023-06-20").toISOString()
  },
  
  // Additional deals
  {
    id: "13",
    title: "HP Pavilion Gaming Laptop",
    description: "15.6 inch FHD, Ryzen 5, 8GB RAM, 512GB SSD, NVIDIA GTX 1650",
    originalPrice: 72990,
    discountedPrice: 59990,
    discountPercentage: 18,
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
    rating: 4.3,
    platform: "amazon",
    externalUrl: "https://www.amazon.in/",
    category: "electronics",
    isNew: true,
    isTrending: false,
  },
  {
    id: "14",
    title: "OnePlus 10T 5G",
    description: "16GB RAM, 256GB Storage, 150W SuperVOOC Charging, Snapdragon 8+ Gen 1",
    originalPrice: 55999,
    discountedPrice: 49999,
    discountPercentage: 11,
    imageUrl: "https://images.unsplash.com/photo-1642465203912-8a6ccc370a0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    rating: 4.6,
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com/",
    category: "electronics",
    isNew: true,
    isTrending: true,
  },
  {
    id: "15",
    title: "Adidas Ultraboost 22",
    description: "Men's Running Shoes with responsive Boost cushioning",
    originalPrice: 16999,
    discountedPrice: 11999,
    discountPercentage: 29,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    rating: 4.5,
    platform: "flipkart",
    externalUrl: "https://www.flipkart.com/",
    category: "fashion",
    isNew: false,
    isTrending: true,
  },
  {
    id: "16",
    title: "Samsung Galaxy Tab S8+",
    description: "12.4 inch AMOLED Display, 8GB RAM, 256GB ROM, S Pen Included",
    originalPrice: 74999,
    discountedPrice: 65999,
    discountPercentage: 12,
    imageUrl: "https://images.unsplash.com/photo-1659356429137-4285c4f1e0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
    rating: 4.7,
    platform: "amazon",
    externalUrl: "https://www.amazon.in/",
    category: "electronics",
    isNew: false,
    isTrending: false,
  },
  {
    id: "17",
    title: "IKEA BILLY Bookcase",
    description: "White bookcase with adjustable shelves, perfect for your home library",
    originalPrice: 7999,
    discountedPrice: 6499,
    discountPercentage: 19,
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80",
    rating: 4.2,
    platform: "meesho",
    externalUrl: "https://www.meesho.com/",
    category: "home",
    isNew: false,
    isTrending: false,
  },
  {
    id: "18",
    title: "Levi's Men's 511 Slim Fit Jeans",
    description: "Classic slim fit jeans with stretch for comfort",
    originalPrice: 3499,
    discountedPrice: 1999,
    discountPercentage: 43,
    imageUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1509&q=80",
    rating: 4.4,
    platform: "meesho",
    externalUrl: "https://www.meesho.com/",
    category: "fashion",
    isNew: false,
    isTrending: false,
  },
  {
    id: "19",
    title: "Fitbit Versa 3 Health & Fitness Smartwatch",
    description: "Built-in GPS, Active Zone Minutes, Voice Assistant",
    originalPrice: 18999,
    discountedPrice: 14999,
    discountPercentage: 21,
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80",
    rating: 4.3,
    platform: "amazon",
    externalUrl: "https://www.amazon.in/",
    category: "electronics",
    isNew: false,
    isTrending: true,
  },
  {
    id: "20",
    title: "Nestasia Ceramic Dinner Set",
    description: "18-piece ceramic dinner set, dishwasher and microwave safe",
    originalPrice: 4999,
    discountedPrice: 2999,
    discountPercentage: 40,
    imageUrl: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80",
    rating: 4.1,
    platform: "meesho",
    externalUrl: "https://www.meesho.com/",
    category: "home",
    isNew: true,
    isTrending: false,
  }
];
