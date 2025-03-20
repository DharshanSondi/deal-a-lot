
import React from "react";
import { Category } from "@/types/categories";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  return (
    <button
      className={`glass rounded-xl overflow-hidden shadow-elegant transition-all duration-300 relative hover:scale-[1.02] active:scale-[0.98] h-32 sm:h-40 ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="flex items-center mb-1">
          <div className="h-7 w-7 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center text-primary mr-2">
            {category.icon}
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {category.count} deals available
        </p>
      </div>
    </button>
  );
}
