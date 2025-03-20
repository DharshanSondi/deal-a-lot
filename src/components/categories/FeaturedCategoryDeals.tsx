
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DealCard } from "@/components/ui/deal-card";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types/categories";
import { Deal } from "@/types/deals";

interface FeaturedCategoryDealsProps {
  selectedCategory: string;
  categories: Category[];
  filteredDeals: Deal[];
}

export function FeaturedCategoryDeals({ 
  selectedCategory, 
  categories, 
  filteredDeals 
}: FeaturedCategoryDealsProps) {
  const currentCategory = categories.find(c => c.id === selectedCategory);
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Featured {currentCategory?.name} Deals
        </h2>
        <Button 
          variant="outline" 
          className="rounded-full" 
          asChild
        >
          <Link to={`/deals?category=${selectedCategory}`}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDeals.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>
    </div>
  );
}
