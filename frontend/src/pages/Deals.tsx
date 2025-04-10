import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDealsFromAllPlatforms } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { DealsSearch } from "@/components/deals/DealsSearch";
import { DealsActionBar } from "@/components/deals/DealsActionBar";
import { DealsFilter } from "@/components/deals/DealsFilter";
import { DealsTabContent } from "@/components/deals/DealsTabContent";
import { DealProps } from "@/components/ui/deal-card";

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
          <DealsHeader 
            title="Explore Deals" 
            description="Browse through our collection of deals from top e-commerce platforms" 
          />
          
          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center">
            <DealsSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSubmit={handleSearch} 
            />
            
            <DealsActionBar 
              sortOrder={sortOrder} 
              setSortOrder={setSortOrder} 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
              fetchFilteredDeals={fetchFilteredDeals} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <DealsFilter 
              selectedPlatforms={selectedPlatforms}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              handlePlatformChange={handlePlatformChange}
              handleCategoryChange={handleCategoryChange}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
              showFilters={showFilters}
            />
            
            {/* Deals Grid */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="glass backdrop-blur-sm">
                  <TabsTrigger value="all">All Deals</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="new">New Arrivals</TabsTrigger>
                  <TabsTrigger value="offers">Best Offers</TabsTrigger>
                </TabsList>
                
                <DealsTabContent tabValue="all" deals={filteredDeals} isLoading={isLoading} />
                <DealsTabContent tabValue="trending" deals={filteredDeals} isLoading={isLoading} />
                <DealsTabContent tabValue="new" deals={filteredDeals} isLoading={isLoading} />
                <DealsTabContent tabValue="offers" deals={filteredDeals} isLoading={isLoading} />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
