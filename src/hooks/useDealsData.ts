
import { useState, useEffect } from "react";
import { fetchDealsFromAllPlatforms } from "@/utils/api";
import { toast } from "sonner";
import { Deal } from "@/types/deals";

export function useDealsData() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDealsFromAllPlatforms("", 100);
      if (response.success) {
        setDeals(response.deals);
      } else {
        toast.error("Failed to fetch deals", {
          description: response.message || "Please try again later."
        });
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch deals", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredDeals = async (
    searchQuery: string,
    selectedPlatforms: Record<string, boolean>,
    selectedCategories: Record<string, boolean>
  ) => {
    setIsLoading(true);
    
    // Determine if any platform is selected
    const activePlatforms = Object.entries(selectedPlatforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
    
    // Determine if any category is selected
    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
    
    // Select first platform/category if multiple are selected (API only accepts one)
    const platformFilter = activePlatforms.length > 0 ? activePlatforms[0] : "";
    const categoryFilter = activeCategories.length > 0 ? activeCategories[0] : "";
    
    try {
      const response = await fetchDealsFromAllPlatforms(
        searchQuery, 
        100, 
        platformFilter, 
        categoryFilter
      );
      
      if (response.success) {
        setDeals(response.deals);
      } else {
        toast.error("Failed to fetch deals", {
          description: response.message || "Please try again later."
        });
      }
    } catch (error) {
      console.error("Error fetching filtered deals:", error);
      toast.error("Failed to fetch deals", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { deals, isLoading, fetchDeals, fetchFilteredDeals };
}
