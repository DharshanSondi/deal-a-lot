
import { useState, useEffect } from "react";
import { Deal } from "@/types/deals";
import { aggregateDealsFromAllSources, getCachedDeals, refreshDealCache } from "@/utils/api/deal-aggregator";
import { toast } from "@/hooks/use-toast";

interface UseEnhancedDealsProps {
  query?: string;
  category?: string;
  enableRealTime?: boolean;
  refreshInterval?: number; // in minutes
}

export function useEnhancedDeals({
  query = "",
  category = "",
  enableRealTime = true,
  refreshInterval = 30
}: UseEnhancedDealsProps = {}) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDeals = async (useCache: boolean = true) => {
    setIsLoading(true);
    try {
      // Try to get cached deals first
      if (useCache) {
        const cached = getCachedDeals();
        if (cached && cached.length > 0) {
          setDeals(cached);
          setLastUpdated(new Date());
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh deals from all sources
      const response = await aggregateDealsFromAllSources(query, category);
      
      if (response.success) {
        setDeals(response.data);
        setLastUpdated(new Date());
        
        // Add manual deals
        const manualDeals = JSON.parse(localStorage.getItem('manualDeals') || '[]');
        if (manualDeals.length > 0) {
          setDeals(prev => [...manualDeals, ...prev]);
        }
      } else {
        toast({
          title: "Error fetching deals",
          description: response.error || "Failed to fetch deals from sources",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in useEnhancedDeals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch deals",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const forceRefresh = async () => {
    await refreshDealCache();
    await fetchDeals(false);
    toast({
      title: "Deals refreshed",
      description: "Latest deals have been fetched from all sources"
    });
  };

  useEffect(() => {
    fetchDeals();
  }, [query, category]);

  // Set up auto-refresh if enabled
  useEffect(() => {
    if (!enableRealTime) return;

    const interval = setInterval(() => {
      console.log("Auto-refreshing deals...");
      fetchDeals(false);
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [enableRealTime, refreshInterval]);

  return {
    deals,
    isLoading,
    lastUpdated,
    fetchDeals,
    forceRefresh
  };
}
