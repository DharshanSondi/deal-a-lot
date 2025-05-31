
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Deal } from "@/types/deals";
import { useEnhancedDeals } from "./useEnhancedDeals";

export function useDealsData() {
  const {
    deals: enhancedDeals,
    isLoading: enhancedLoading,
    fetchDeals,
    forceRefresh
  } = useEnhancedDeals({
    enableRealTime: true,
    refreshInterval: 30
  });

  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDeals(enhancedDeals);
    setIsLoading(enhancedLoading);
  }, [enhancedDeals, enhancedLoading]);

  const fetchFilteredDeals = async (
    searchQuery: string,
    selectedPlatforms: Record<string, boolean>,
    selectedCategories: Record<string, boolean>
  ) => {
    setIsLoading(true);
    
    try {
      // Filter the enhanced deals based on search and filters
      let filteredDeals = enhancedDeals;
      
      // Apply search filter
      if (searchQuery) {
        filteredDeals = filteredDeals.filter(deal => 
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (deal.description && deal.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Apply platform filter
      const activePlatforms = Object.entries(selectedPlatforms)
        .filter(([_, isSelected]) => isSelected)
        .map(([platform]) => platform);
        
      if (activePlatforms.length > 0) {
        filteredDeals = filteredDeals.filter(deal => activePlatforms.includes(deal.platform));
      }
      
      // Apply category filter
      const activeCategories = Object.entries(selectedCategories)
        .filter(([_, isSelected]) => isSelected)
        .map(([category]) => category);
        
      if (activeCategories.length > 0) {
        filteredDeals = filteredDeals.filter(deal => 
          deal.category && activeCategories.includes(deal.category.toLowerCase())
        );
      }
      
      setDeals(filteredDeals);
      
      toast.success("Deals filtered successfully", {
        description: `Found ${filteredDeals.length} deals matching your criteria`
      });
    } catch (error) {
      console.error("Error filtering deals:", error);
      toast.error("Failed to filter deals", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDeals = async () => {
    try {
      await forceRefresh();
      toast.success("Deals refreshed", {
        description: "Latest deals have been fetched from all sources"
      });
    } catch (error) {
      console.error("Error refreshing deals:", error);
      toast.error("Failed to refresh deals", {
        description: "Please try again later."
      });
    }
  };

  return { 
    deals, 
    isLoading, 
    fetchDeals: refreshDeals, 
    fetchFilteredDeals 
  };
}
