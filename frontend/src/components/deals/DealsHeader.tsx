
import React from "react";
import { assets } from "@/assets/assets";

interface DealsHeaderProps {
  title: string;
  description: string;
  showIcon?: boolean;
}

export function DealsHeader({ title, description, showIcon = false }: DealsHeaderProps) {
  return (
    <div className="mb-8 flex items-center">
      {showIcon && (
        <img 
          src={assets.order_icon} 
          alt="Deals" 
          className="w-10 h-10 mr-4 rounded-full" 
        />
      )}
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
