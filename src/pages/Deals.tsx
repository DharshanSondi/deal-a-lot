
import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { DealCard, DealProps } from "@/components/ui/deal-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { fetchDealsFromAllPlatforms } from "@/utils/api";
import { toast } from "@/hooks/use-toast";

export default function Deals() {
  const [deals, setDeals] = useState<DealProps[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<DealProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({
    amazon: false,
    flipkart: false,
    meesho: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({
    electronics: false,
    fashion: false,
    home: false,
    beauty: false,
    toys: false,
    books: false,
    appliances: false,
    sports: false,
    grocery: false,
  });
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOrder, setSortOrder] = useState("discount-high");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDealsFromAllPlatforms("", 100);
      if (response.success) {
        setDeals(response.deals);
        setFilteredDeals(response.deals);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch deals. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedPlatforms, selectedCategories, priceRange, sortOrder, activeTab, deals]);

  const applyFilters = () => {
    let result = [...deals];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (deal.description && deal.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by platform
    const activePlatforms = Object.entries(selectedPlatforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
      
    if (activePlatforms.length > 0) {
      result = result.filter(deal => activePlatforms.includes(deal.platform));
    }
    
    // Filter by category
    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
      
    if (activeCategories.length > 0) {
      result = result.filter(deal => 
        deal.category && activeCategories.includes(deal.category.toLowerCase())
      );
    }
    
    // Filter by price range
    result = result.filter(deal => 
      deal.discountedPrice >= priceRange[0] && deal.discountedPrice <= priceRange[1]
    );
    
    // Filter by tab
    switch (activeTab) {
      case "trending":
        result = result.filter(deal => deal.isTrending);
        break;
      case "new":
        result = result.filter(deal => deal.isNew);
        break;
      case "offers":
        result = result.filter(deal => deal.discountPercentage >= 30);
        break;
      default:
        // All deals, no filter needed
        break;
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "price-low":
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount-high":
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case "rating-high":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting
        break;
    }
    
    setFilteredDeals(result);
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedPlatforms({
      amazon: false,
      flipkart: false,
      meesho: false,
    });
    setSelectedCategories({
      electronics: false,
      fashion: false,
      home: false,
      beauty: false,
      toys: false,
      books: false,
      appliances: false,
      sports: false,
      grocery: false,
    });
    setPriceRange([0, 50000]);
    setSortOrder("discount-high");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredDeals();
  };

  const fetchFilteredDeals = async () => {
    setIsLoading(true);
    
    // Determine if any platform is selected
    const activePlatforms = Object.entries(selectedPlatforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
    
    // Determine if any category is selected
    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
    
    // Select first platform/category if multiple are selected (API only accepts one)
    const platformFilter = activePlatforms.length > 0 ? activePlatforms[0] : "";
    const categoryFilter = activeCategories.length > 0 ? activeCategories[0] : "";
    
    try {
      const response = await fetchDealsFromAllPlatforms(
        searchQuery, 
        100, 
        platformFilter, 
        categoryFilter
      );
      
      if (response.success) {
        setDeals(response.deals);
        // Filters will be applied by the useEffect
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch deals. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching filtered deals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore Deals</h1>
            <p className="text-muted-foreground">
              Browse through our collection of deals from top e-commerce platforms
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center">
            <form onSubmit={handleSearch} className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10 pr-4 py-2 rounded-full"
                placeholder="Search for deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </form>
            
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
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="glass rounded-xl p-6 shadow-elegant sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Platform Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Platforms</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="amazon"
                          checked={selectedPlatforms.amazon}
                          onCheckedChange={() => handlePlatformChange('amazon')}
                        />
                        <Label htmlFor="amazon" className="ml-2">Amazon</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="flipkart"
                          checked={selectedPlatforms.flipkart}
                          onCheckedChange={() => handlePlatformChange('flipkart')}
                        />
                        <Label htmlFor="flipkart" className="ml-2">Flipkart</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="meesho"
                          checked={selectedPlatforms.meesho}
                          onCheckedChange={() => handlePlatformChange('meesho')}
                        />
                        <Label htmlFor="meesho" className="ml-2">Meesho</Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="electronics"
                          checked={selectedCategories.electronics}
                          onCheckedChange={() => handleCategoryChange('electronics')}
                        />
                        <Label htmlFor="electronics" className="ml-2">Electronics</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="fashion"
                          checked={selectedCategories.fashion}
                          onCheckedChange={() => handleCategoryChange('fashion')}
                        />
                        <Label htmlFor="fashion" className="ml-2">Fashion</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="home"
                          checked={selectedCategories.home}
                          onCheckedChange={() => handleCategoryChange('home')}
                        />
                        <Label htmlFor="home" className="ml-2">Home & Kitchen</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="beauty"
                          checked={selectedCategories.beauty}
                          onCheckedChange={() => handleCategoryChange('beauty')}
                        />
                        <Label htmlFor="beauty" className="ml-2">Beauty & Health</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="toys"
                          checked={selectedCategories.toys}
                          onCheckedChange={() => handleCategoryChange('toys')}
                        />
                        <Label htmlFor="toys" className="ml-2">Toys & Games</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="books"
                          checked={selectedCategories.books}
                          onCheckedChange={() => handleCategoryChange('books')}
                        />
                        <Label htmlFor="books" className="ml-2">Books</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="appliances"
                          checked={selectedCategories.appliances}
                          onCheckedChange={() => handleCategoryChange('appliances')}
                        />
                        <Label htmlFor="appliances" className="ml-2">Appliances</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="sports"
                          checked={selectedCategories.sports}
                          onCheckedChange={() => handleCategoryChange('sports')}
                        />
                        <Label htmlFor="sports" className="ml-2">Sports & Fitness</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="grocery"
                          checked={selectedCategories.grocery}
                          onCheckedChange={() => handleCategoryChange('grocery')}
                        />
                        <Label htmlFor="grocery" className="ml-2">Grocery</Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Price Range</h4>
                      <span className="text-sm text-muted-foreground">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 50000]}
                      max={50000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">₹0</span>
                      <span className="text-xs text-muted-foreground">₹50,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Deals Grid */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="glass backdrop-blur-sm">
                  <TabsTrigger value="all">All Deals</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="new">New Arrivals</TabsTrigger>
                  <TabsTrigger value="offers">Best Offers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <DealsGrid deals={filteredDeals} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="trending" className="mt-6">
                  <DealsGrid deals={filteredDeals} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="new" className="mt-6">
                  <DealsGrid deals={filteredDeals} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="offers" className="mt-6">
                  <DealsGrid deals={filteredDeals} isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DealsGridProps {
  deals: DealProps[];
  isLoading: boolean;
}

function DealsGrid({ deals, isLoading }: DealsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="mb-4 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h3 className="text-xl font-medium mb-2">No deals found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} {...deal} />
      ))}
    </div>
  );
}
