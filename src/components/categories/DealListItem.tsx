
import React from "react";
import { Link } from "react-router-dom";
import { Deal } from "@/types/deals";

interface DealListItemProps {
  deal: Deal;
}

export function DealListItem({ deal }: DealListItemProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link to={`/deal/${deal.id}`} className="flex gap-4 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary/30">
        <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{deal.title}</h4>
        <div className="flex items-center mt-1">
          <span className="font-medium text-sm">{formatCurrency(deal.discountedPrice)}</span>
          <span className="text-xs line-through text-muted-foreground ml-2">
            {formatCurrency(deal.originalPrice)}
          </span>
          <span className="text-xs text-green-600 ml-2">
            {deal.discountPercentage}% off
          </span>
        </div>
        <div className="flex items-center mt-1">
          <div className="h-4 w-4 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10 text-primary">
            {deal.platform.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            {deal.platform.charAt(0).toUpperCase() + deal.platform.slice(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
