
import React from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/categories";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  return (
    <button
      className={cn(
        "glass h-full flex flex-col shadow-elegant overflow-hidden rounded-xl transition-all",
        "hover:shadow-md hover:scale-[1.02] cursor-pointer",
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent flex items-end p-3">
          <div className="flex items-center justify-between w-full">
            <div className="bg-background/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
              {category.count} deals
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center mb-2">
          <div className="p-1.5 bg-primary/10 rounded-md text-primary mr-2">
            {category.icon}
          </div>
          <h3 className="font-semibold">{category.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {category.description}
        </p>
      </div>
    </button>
  );
}
