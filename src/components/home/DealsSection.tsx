
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DealCard, DealProps } from "@/components/ui/deal-card";
import { ArrowRight } from "lucide-react";

interface DealsSectionProps {
  title: string;
  description: string;
  deals: DealProps[];
  isLoading: boolean;
  limit?: number;
}

export function DealsSection({ title, description, deals, isLoading, limit = 4 }: DealsSectionProps) {
  return (
    <section className="py-16">
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
          ) : deals.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No deals available right now. Please check back later.</p>
            </div>
          ) : (
            deals.map((deal) => (
              <DealCard key={deal.id} {...deal} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
