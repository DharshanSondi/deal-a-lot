
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { DealCard } from "@/components/ui/deal-card";
import { mockDeals } from "@/data/mock-deals";
import { Deal } from "@/types/deals";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const [savedDeals, setSavedDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch saved deals from localStorage
    setTimeout(() => {
      const savedDealIds = JSON.parse(localStorage.getItem("savedDeals") || "[]");
      const userSavedDeals = mockDeals.filter(deal => savedDealIds.includes(deal.id));
      setSavedDeals(userSavedDeals);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Your Saved Deals</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
              ))}
            </div>
          ) : savedDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedDeals.map(deal => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass rounded-xl">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No saved deals yet</h3>
              <p className="text-muted-foreground mb-6">
                Start saving deals you like by clicking the heart icon
              </p>
              <Button asChild>
                <a href="/deals">Browse Deals</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
