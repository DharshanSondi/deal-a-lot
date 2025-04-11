
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { DealsSearch } from "@/components/deals/DealsSearch";
import { DealsActionBar } from "@/components/deals/DealsActionBar";
import { DealsFilter } from "@/components/deals/DealsFilter";
import { DealsTabs } from "@/components/deals/DealsTabs";
import { useDealsData } from "@/hooks/useDealsData";
import { useDealsFilters } from "@/hooks/useDealsFilters";

export default function Deals() {
  const [showFilters, setShowFilters] = useState(false);
  const { deals, isLoading, fetchFilteredDeals } = useDealsData();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedPlatforms,
    selectedCategories,
    priceRange,
    sortOrder,
    activeTab,
    filteredDeals,
    setActiveTab,
    setPriceRange,
    setSortOrder,
    handlePlatformChange,
    handleCategoryChange,
    resetFilters
  } = useDealsFilters(deals);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredDeals(searchQuery, selectedPlatforms, selectedCategories);
  };

  const handleApplyFilters = () => {
    fetchFilteredDeals(searchQuery, selectedPlatforms, selectedCategories);
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
              fetchFilteredDeals={handleApplyFilters} 
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
              <DealsTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                deals={filteredDeals}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
