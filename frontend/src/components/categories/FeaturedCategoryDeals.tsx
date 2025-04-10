
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/types/categories";
import { Deal } from "@/types/deals";
import { Badge } from "@/components/ui/badge";

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
  
  // Function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Featured {currentCategory?.name} Deals
      </h2>
      
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDeals.map(deal => (
            <Link 
              key={deal.id}
              to={`/deal/${deal.id}`}
              className="glass rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={deal.imageUrl} 
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.isNew && (
                  <Badge variant="secondary" className="absolute top-2 right-2 font-medium bg-primary/80 text-white">
                    New
                  </Badge>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium line-clamp-2 mb-2">{deal.title}</h3>
                
                <div className="flex items-baseline mb-2">
                  <div className="font-bold mr-2">{formatCurrency(deal.discountedPrice)}</div>
                  <div className="text-sm line-through text-muted-foreground">{formatCurrency(deal.originalPrice)}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-0">
                    {deal.discountPercentage}% off
                  </Badge>
                  <span className="text-xs text-muted-foreground capitalize">{deal.platform}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-xl">
          <p className="text-muted-foreground">
            No {currentCategory?.name.toLowerCase()} deals available at the moment. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
