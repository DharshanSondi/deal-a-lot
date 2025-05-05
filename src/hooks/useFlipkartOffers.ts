
import { useState, useEffect } from "react";
import { Deal } from "@/types/deals";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { mockDeals } from "@/data/mock-deals";

export enum OfferType {
  ALL = "all",
  DEALS_OF_THE_DAY = "dotd"
}

export function useFlipkartOffers(offerType: OfferType = OfferType.ALL, limit: number = 4) {
  const [offers, setOffers] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers();
  }, [offerType]);

  const fetchOffers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the Supabase function with proper body parameter
      const { data, error } = await supabase.functions.invoke("get-flipkart-offers", {
        body: { type: offerType }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success && Array.isArray(data.deals) && data.deals.length > 0) {
        // Apply limit and set offers
        setOffers(data.deals.slice(0, limit));
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        console.warn("Using mock data because API returned no deals");
        // Use filtered mock data as a fallback
        const filteredMocks = mockDeals
          .filter(deal => deal.platform === "flipkart")
          .filter(deal => offerType === OfferType.DEALS_OF_THE_DAY ? deal.isNew : true)
          .slice(0, limit);
        
        setOffers(filteredMocks);
        toast.info("Using sample data", {
          description: "Flipkart API not available. Showing sample data instead."
        });
      }
    } catch (error) {
      console.error("Error fetching Flipkart offers:", error);
      setError(error.message);
      
      // Use mock data as fallback
      const filteredMocks = mockDeals
        .filter(deal => deal.platform === "flipkart")
        .filter(deal => offerType === OfferType.DEALS_OF_THE_DAY ? deal.isNew : true)
        .slice(0, limit);
      
      setOffers(filteredMocks);
      
      toast.error("Failed to fetch Flipkart offers", {
        description: "Using sample data instead. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { offers, isLoading, error, refetch: fetchOffers };
}
