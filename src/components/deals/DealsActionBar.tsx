
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DealsActionBarProps {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  fetchFilteredDeals: () => void;
}

export function DealsActionBar({ 
  sortOrder, 
  setSortOrder, 
  showFilters, 
  setShowFilters, 
  fetchFilteredDeals 
}: DealsActionBarProps) {
  return (
    <div className="flex gap-2 w-full lg:w-auto">
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="rounded-full w-full lg:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="discount-high">Highest Discount</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating-high">Highest Rating</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        className="rounded-full flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Filters</span>
      </Button>
      
      <Button
        variant="default"
        className="rounded-full"
        onClick={fetchFilteredDeals}
      >
        Apply
      </Button>
    </div>
  );
}
