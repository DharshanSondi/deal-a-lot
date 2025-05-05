
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export function HeroSection({ searchQuery, setSearchQuery, handleSearch }: HeroSectionProps) {
  return (
    <section className="pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              <span>Best deals across e-commerce platforms</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find the <span className="text-primary">Best Deals</span> in One Place
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-md">
              DiscountHub aggregates the best offers from Amazon, Flipkart, Meesho, and more to save you time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/deals">
                  Explore Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-elegant animate-scale-in relative">
            <div className="aspect-video relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Shopping"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
              
              {/* Search Bar */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                <div className="w-full max-w-md mx-auto relative">
                  <form onSubmit={handleSearch} className="glass backdrop-blur-md rounded-full flex items-center p-1 pl-4 pr-1 shadow-elegant">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Search for products, brands, etc."
                      className="bg-transparent border-none focus:outline-none flex-grow text-sm py-2 text-foreground placeholder:text-muted-foreground"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="rounded-full ml-1">
                      Search
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
