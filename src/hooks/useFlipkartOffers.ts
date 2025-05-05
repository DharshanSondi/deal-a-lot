
import { useState, useEffect } from "react";
import { Deal } from "@/types/deals";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export enum OfferType {
  ALL = "all",
  DEALS_OF_THE_DAY = "dotd"
}

export function useFlipkartOffers(offerType: OfferType = OfferType.ALL, limit: number = 4) {
  const [offers, setOffers] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, [offerType]);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-flipkart-offers", {
        query: { type: offerType }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success && Array.isArray(data.deals)) {
        // Apply limit and set offers
        setOffers(data.deals.slice(0, limit));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching Flipkart offers:", error);
      toast.error("Failed to fetch Flipkart offers", {
        description: "Please try again later."
      });
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { offers, isLoading, refetch: fetchOffers };
}
