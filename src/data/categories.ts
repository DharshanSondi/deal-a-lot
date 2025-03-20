
import React from "react";
import { Smartphone, Shirt, Home, Heart, ShoppingBag, Gamepad, Utensils, Baby, Laptop } from "lucide-react";
import { Category } from "@/types/categories";

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronics",
    icon: <Smartphone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 256,
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing, accessories, and more",
    icon: <Shirt className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    count: 182,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Furniture, appliances, and decor",
    icon: <Home className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    count: 143,
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    description: "Skincare, makeup, and wellness",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80",
    count: 118,
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun for all ages",
    icon: <Gamepad className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 92,
  },
  {
    id: "grocery",
    name: "Grocery & Gourmet",
    description: "Food, beverages, and pantry essentials",
    icon: <Utensils className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 87,
  },
  {
    id: "baby",
    name: "Baby Products",
    description: "Everything for babies and toddlers",
    icon: <Baby className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 64,
  },
  {
    id: "computers",
    name: "Computers & Accessories",
    description: "Laptops, desktops, and peripherals",
    icon: <Laptop className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    count: 128,
  },
];
