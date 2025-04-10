
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { CategoryDetail } from "@/components/categories/CategoryDetail";
import { FeaturedCategoryDeals } from "@/components/categories/FeaturedCategoryDeals";
import { categories } from "@/data/categories";
import { mockDeals } from "@/data/mock-deals";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  
  const filteredDeals = mockDeals.filter(
    (deal) => deal.category && deal.category.toLowerCase() === selectedCategory
  ).slice(0, 4);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground">
              Explore deals by category to find exactly what you're looking for
            </p>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => setSelectedCategory(category.id)}
                isSelected={selectedCategory === category.id}
              />
            ))}
          </div>
          
          {/* Category Detail */}
          <CategoryDetail
            selectedCategory={selectedCategory}
            categories={categories}
            filteredDeals={filteredDeals}
          />
          
          {/* Featured Deals in Selected Category */}
          <FeaturedCategoryDeals
            selectedCategory={selectedCategory}
            categories={categories}
            filteredDeals={filteredDeals}
          />
        </div>
      </div>
    </div>
  );
}
