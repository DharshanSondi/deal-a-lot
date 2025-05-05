
import React from "react";
import { Tag, BarChart3, ShoppingBag } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose DiscountHub?</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            We help you find the best deals across multiple platforms in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Deals Aggregated</h3>
            <p className="text-muted-foreground">
              We collect the top deals from Amazon, Flipkart, Meesho, and other e-commerce sites.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in delay-150">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Price Comparison</h3>
            <p className="text-muted-foreground">
              Compare prices across multiple platforms to ensure you get the best deal.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in delay-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Categories</h3>
            <p className="text-muted-foreground">
              Browse deals by categories and find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
