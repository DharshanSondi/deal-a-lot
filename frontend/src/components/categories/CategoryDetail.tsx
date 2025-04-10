
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types/categories";
import { Deal } from "@/types/deals";
import { DealListItem } from "./DealListItem";

interface CategoryDetailProps {
  selectedCategory: string;
  categories: Category[];
  filteredDeals: Deal[];
}

export function CategoryDetail({ selectedCategory, categories, filteredDeals }: CategoryDetailProps) {
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="glass rounded-xl shadow-elegant overflow-hidden mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img
            src={currentCategory?.image}
            alt={currentCategory?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-r" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {currentCategory?.name}
            </h2>
            <p className="text-muted-foreground md:max-w-xs">
              {currentCategory?.description}
            </p>
            <Button 
              className="mt-4 rounded-full self-start" 
              asChild
            >
              <Link to={`/deals?category=${selectedCategory}`}>
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Top Deals</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full" 
              asChild
            >
              <Link to={`/deals?category=${selectedCategory}`}>
                View All
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="trending">
            <TabsList className="glass backdrop-blur-sm">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="discounts">Best Discounts</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="mt-4 space-y-4">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <DealListItem key={deal.id} deal={deal} />
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No trending deals available in this category at the moment.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="discounts" className="mt-4 space-y-4">
              {filteredDeals
                .sort((a, b) => b.discountPercentage - a.discountPercentage)
                .map((deal) => (
                  <DealListItem key={deal.id} deal={deal} />
                ))}
            </TabsContent>
            
            <TabsContent value="new" className="mt-4 space-y-4">
              {filteredDeals
                .filter(deal => deal.isNew)
                .map((deal) => (
                  <DealListItem key={deal.id} deal={deal} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
