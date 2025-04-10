
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
    <Link to={`/deal/${deal.id}`} className="group glass rounded-lg p-3 flex gap-3 hover:shadow-sm transition-all">
      <div className="relative w-20 h-20 bg-secondary/30 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={deal.imageUrl} 
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {deal.isNew && (
          <Badge variant="secondary" className="absolute top-0 right-0 text-[0.6rem] bg-primary text-white">
            NEW
          </Badge>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">{deal.title}</h4>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="font-medium text-sm">{formatCurrency(deal.discountedPrice)}</div>
          <div className="text-xs line-through text-muted-foreground">{formatCurrency(deal.originalPrice)}</div>
          <Badge className="bg-green-500/10 text-green-600 text-[0.6rem] border-0">
            {deal.discountPercentage}% off
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground mt-1 capitalize">{deal.platform}</div>
      </div>
    </Link>
  );
}
