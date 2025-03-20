
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { DealCard } from "@/components/ui/deal-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Smartphone, Shirt, Home, Heart, ShoppingBag, Gamepad, Utensils, Baby, Laptop } from "lucide-react";
import { mockDeals } from "@/data/mock-deals";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  count: number;
}

const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronics",
    icon: <Smartphone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 256,
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing, accessories, and more",
    icon: <Shirt className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    count: 182,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Furniture, appliances, and decor",
    icon: <Home className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    count: 143,
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    description: "Skincare, makeup, and wellness",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80",
    count: 118,
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun for all ages",
    icon: <Gamepad className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 92,
  },
  {
    id: "grocery",
    name: "Grocery & Gourmet",
    description: "Food, beverages, and pantry essentials",
    icon: <Utensils className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 87,
  },
  {
    id: "baby",
    name: "Baby Products",
    description: "Everything for babies and toddlers",
    icon: <Baby className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    count: 64,
  },
  {
    id: "computers",
    name: "Computers & Accessories",
    description: "Laptops, desktops, and peripherals",
    icon: <Laptop className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    count: 128,
  },
];

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
          <div className="glass rounded-xl shadow-elegant overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <img
                  src={categories.find(c => c.id === selectedCategory)?.image}
                  alt={categories.find(c => c.id === selectedCategory)?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-r" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-muted-foreground md:max-w-xs">
                    {categories.find(c => c.id === selectedCategory)?.description}
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
                      filteredDeals.map((deal, index) => (
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
                      .map((deal, index) => (
                        <DealListItem key={deal.id} deal={deal} />
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="new" className="mt-4 space-y-4">
                    {filteredDeals
                      .filter(deal => deal.isNew)
                      .map((deal, index) => (
                        <DealListItem key={deal.id} deal={deal} />
                      ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Featured Deals in Selected Category */}
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Featured {categories.find(c => c.id === selectedCategory)?.name} Deals
              </h2>
              <Button 
                variant="outline" 
                className="rounded-full" 
                asChild
              >
                <Link to={`/deals?category=${selectedCategory}`}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
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

interface DealListItemProps {
  deal: any;
}

function DealListItem({ deal }: DealListItemProps) {
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
