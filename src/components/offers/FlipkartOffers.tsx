
import React from "react";
import { DealCard } from "@/components/ui/deal-card";
import { useFlipkartOffers, OfferType } from "@/hooks/useFlipkartOffers";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FlipkartOffersProps {
  title: string;
  description: string;
  offerType: OfferType;
  limit?: number;
}

export function FlipkartOffers({ 
  title, 
  description, 
  offerType, 
  limit = 4 
}: FlipkartOffersProps) {
  const { offers, isLoading } = useFlipkartOffers(offerType, limit);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/deals">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
            ))
          ) : offers.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No offers available right now. Please check back later.</p>
            </div>
          ) : (
            offers.map((offer) => (
              <DealCard key={offer.id} {...offer} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
