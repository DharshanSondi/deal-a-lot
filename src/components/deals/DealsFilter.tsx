
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface DealsFilterProps {
  selectedPlatforms: Record<string, boolean>;
  selectedCategories: Record<string, boolean>;
  priceRange: number[];
  handlePlatformChange: (platform: string) => void;
  handleCategoryChange: (category: string) => void;
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
  showFilters: boolean;
}

export function DealsFilter({
  selectedPlatforms,
  selectedCategories,
  priceRange,
  handlePlatformChange,
  handleCategoryChange,
  setPriceRange,
  resetFilters,
  showFilters
}: DealsFilterProps) {
  return (
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
  );
}
