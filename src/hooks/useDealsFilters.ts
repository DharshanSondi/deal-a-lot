
import { useState, useEffect } from "react";
import { Deal } from "@/types/deals";

export interface DealsFilterState {
  searchQuery: string;
  selectedPlatforms: Record<string, boolean>;
  selectedCategories: Record<string, boolean>;
  priceRange: number[];
  sortOrder: string;
  activeTab: string;
}

export function useDealsFilters(deals: Deal[]) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({
    amazon: false,
    flipkart: false,
    meesho: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({
    electronics: false,
    fashion: false,
    home: false,
    beauty: false,
    toys: false,
    books: false,
    appliances: false,
    sports: false,
    grocery: false,
  });
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOrder, setSortOrder] = useState("discount-high");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedPlatforms({
      amazon: false,
      flipkart: false,
      meesho: false,
    });
    setSelectedCategories({
      electronics: false,
      fashion: false,
      home: false,
      beauty: false,
      toys: false,
      books: false,
      appliances: false,
      sports: false,
      grocery: false,
    });
    setPriceRange([0, 50000]);
    setSortOrder("discount-high");
  };

  // Handler for platform selection
  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Apply filters to the deals
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedPlatforms, selectedCategories, priceRange, sortOrder, activeTab, deals]);

  const applyFilters = () => {
    let result = [...deals];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (deal.description && deal.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by platform
    const activePlatforms = Object.entries(selectedPlatforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
      
    if (activePlatforms.length > 0) {
      result = result.filter(deal => activePlatforms.includes(deal.platform));
    }
    
    // Filter by category
    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
      
    if (activeCategories.length > 0) {
      result = result.filter(deal => 
        deal.category && activeCategories.includes(deal.category.toLowerCase())
      );
    }
    
    // Filter by price range
    result = result.filter(deal => 
      deal.discountedPrice >= priceRange[0] && deal.discountedPrice <= priceRange[1]
    );
    
    // Filter by tab
    switch (activeTab) {
      case "trending":
        result = result.filter(deal => deal.isTrending);
        break;
      case "new":
        result = result.filter(deal => deal.isNew);
        break;
      case "offers":
        result = result.filter(deal => deal.discountPercentage >= 30);
        break;
      default:
        // All deals, no filter needed
        break;
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "price-low":
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount-high":
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case "rating-high":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting
        break;
    }
    
    setFilteredDeals(result);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedPlatforms,
    selectedCategories,
    priceRange,
    sortOrder,
    activeTab,
    filteredDeals,
    setActiveTab,
    setPriceRange,
    setSortOrder,
    handlePlatformChange,
    handleCategoryChange,
    resetFilters
  };
}
