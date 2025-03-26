
import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { 
  Star, 
  X, 
  Plus, 
  ExternalLink, 
  ShoppingBag,
  Search,
  Loader2
} from "lucide-react";
import { Deal } from "@/types/deals";
import { fetchDealsFromAllPlatforms, getProductExternalUrl } from "@/utils/e-commerce-apis";

export default function Compare() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Deal[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [compareFeatures, setCompareFeatures] = useState<string[]>([
    "price",
    "discount",
    "rating",
    "platform",
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Deal[]>([]);
  
  // Load previously compared products from localStorage if available
  useEffect(() => {
    const savedComparisons = localStorage.getItem("comparedProducts");
    if (savedComparisons) {
      try {
        const parsedProducts = JSON.parse(savedComparisons);
        setSelectedProducts(parsedProducts.slice(0, 3));
      } catch (error) {
        console.error("Error loading saved comparisons:", error);
      }
    }
  }, []);

  // Save compared products to localStorage
  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem("comparedProducts", JSON.stringify(selectedProducts));
    }
  }, [selectedProducts]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim().length < 3) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 3 characters to search",
      });
      return;
    }
    
    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      const response = await fetchDealsFromAllPlatforms(searchQuery, 5);
      
      if (response.success) {
        setSearchResults(response.deals);
        
        if (response.deals.length === 0) {
          toast({
            title: "No products found",
            description: `We couldn't find any products matching "${searchQuery}"`,
          });
        }
      } else {
        toast({
          title: "Error searching products",
          description: response.error || "Failed to search for products",
          variant: "destructive",
        });
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "An unexpected error occurred while searching",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const addProduct = (product: Deal) => {
    if (selectedProducts.length < 3) {
      // Check if product is already in comparison
      if (selectedProducts.some(p => p.id === product.id)) {
        toast({
          title: "Product already added",
          description: "This product is already in your comparison",
        });
        return;
      }
      
      setSelectedProducts([...selectedProducts, product]);
      setSearchQuery("");
      setShowSearchResults(false);
      
      toast({
        title: "Product added",
        description: "Product added to comparison",
      });
    } else {
      toast({
        title: "Maximum products reached",
        description: "You can compare up to 3 products at a time",
      });
    }
  };
  
  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    
    toast({
      title: "Product removed",
      description: "Product removed from comparison",
    });
  };
  
  const clearComparison = () => {
    setSelectedProducts([]);
    localStorage.removeItem("comparedProducts");
    
    toast({
      title: "Comparison cleared",
      description: "All products have been removed from comparison",
    });
  };
  
  const toggleFeature = (feature: string) => {
    if (compareFeatures.includes(feature)) {
      setCompareFeatures(compareFeatures.filter(f => f !== feature));
    } else {
      setCompareFeatures([...compareFeatures, feature]);
    }
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
            <p className="text-muted-foreground">
              Compare prices and features across different platforms in real-time
            </p>
          </div>
          
          {/* Product Search */}
          <div className="glass rounded-xl p-6 shadow-elegant mb-8">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for products to compare..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length === 0) {
                      setShowSearchResults(false);
                    }
                  }}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isSearching || searchQuery.length < 3}>
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Search
                </Button>
              </div>
            </form>
            
            {showSearchResults && (
              <div className="bg-background/90 backdrop-blur-sm rounded-lg shadow-md overflow-y-auto max-h-60 animate-fade-in">
                {isSearching ? (
                  <div className="p-4 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Searching across platforms...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div 
                      key={product.id}
                      className="p-3 flex items-center gap-3 border-b border-border/50 last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors"
                      onClick={() => addProduct(product)}
                    >
                      <div className="w-10 h-10 rounded bg-secondary/20 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium line-clamp-1">{product.title}</div>
                        <div className="text-xs text-muted-foreground">{formatCurrency(product.discountedPrice)}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.platform}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-primary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No products found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">Selected Products ({selectedProducts.length}/3)</div>
                {selectedProducts.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearComparison}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProducts.map((product) => (
                  <Badge 
                    key={product.id} 
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1.5"
                  >
                    <span className="text-sm">{product.title.substring(0, 20)}...</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 hover:bg-destructive/10 hover:text-destructive rounded-full ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProduct(product.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {selectedProducts.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Search and add products to compare (up to 3)
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Comparison Features */}
          {selectedProducts.length > 0 && (
            <div className="mb-8">
              <Card className="shadow-elegant border-0">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Comparison Features</h3>
                    <ToggleGroup type="multiple" variant="outline" className="flex flex-wrap gap-2">
                      <ToggleGroupItem 
                        value="price" 
                        aria-label="Toggle price"
                        data-state={compareFeatures.includes("price") ? "on" : "off"}
                        onClick={() => toggleFeature("price")}
                        className="rounded-full"
                      >
                        Price
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="discount" 
                        aria-label="Toggle discount"
                        data-state={compareFeatures.includes("discount") ? "on" : "off"}
                        onClick={() => toggleFeature("discount")}
                        className="rounded-full"
                      >
                        Discount
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="rating" 
                        aria-label="Toggle rating"
                        data-state={compareFeatures.includes("rating") ? "on" : "off"}
                        onClick={() => toggleFeature("rating")}
                        className="rounded-full"
                      >
                        Rating
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="platform" 
                        aria-label="Toggle platform"
                        data-state={compareFeatures.includes("platform") ? "on" : "off"}
                        onClick={() => toggleFeature("platform")}
                        className="rounded-full"
                      >
                        Platform
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Comparison Table */}
          {selectedProducts.length > 0 && (
            <div className="glass rounded-xl overflow-hidden shadow-elegant">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {selectedProducts.map((product) => (
                  <ComparisonCard 
                    key={product.id} 
                    product={product} 
                    features={compareFeatures}
                    onRemove={() => removeProduct(product.id)}
                  />
                ))}
                
                {selectedProducts.length === 1 && (
                  <div className="hidden sm:flex items-center justify-center bg-secondary/20 rounded-xl p-6 h-full">
                    <div className="text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                          <Plus className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="font-medium mb-1">Add More Products</h3>
                      <p className="text-sm text-muted-foreground">
                        Add up to 2 more products to compare
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedProducts.length === 2 && (
                  <div className="hidden md:flex items-center justify-center bg-secondary/20 rounded-xl p-6 h-full">
                    <div className="text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                          <Plus className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="font-medium mb-1">Add One More</h3>
                      <p className="text-sm text-muted-foreground">
                        Add 1 more product to compare
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedProducts.length >= 2 && (
                <div className="p-4 bg-card">
                  <div className="text-center mb-4">
                    <h3 className="font-medium">Comparison Summary</h3>
                  </div>
                  <ComparisonSummary products={selectedProducts} />
                </div>
              )}
            </div>
          )}
          
          {/* Empty State */}
          {selectedProducts.length === 0 && (
            <div className="text-center py-12 glass rounded-xl shadow-elegant">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                  <ShoppingBag className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-xl font-medium mb-2">Start Comparing Products</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Search for products above and add them to compare prices and features across different platforms.
              </p>
              <Button onClick={() => document.querySelector('input')?.focus()}>
                Add Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ComparisonCardProps {
  product: Deal;
  features: string[];
  onRemove: () => void;
}

function ComparisonCard({ product, features, onRemove }: ComparisonCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const getPlatformColor = (platform: string): string => {
    switch (platform) {
      case 'amazon':
        return 'bg-[#FF9900]/10 text-[#FF9900]';
      case 'flipkart':
        return 'bg-[#2874F0]/10 text-[#2874F0]';
      case 'meesho':
        return 'bg-[#F43397]/10 text-[#F43397]';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all">
      <div className="relative aspect-[3/2] bg-secondary/30">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full glass backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant="outline" 
            className={`font-medium backdrop-blur-sm border-0 ${getPlatformColor(product.platform)}`}
          >
            {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium line-clamp-2 mb-2 h-12">{product.title}</h3>
        
        <div className="space-y-3">
          {features.includes("price") && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Price</div>
              <div className="flex items-center justify-between">
                <div className="font-medium">{formatCurrency(product.discountedPrice)}</div>
                <div className="text-sm line-through text-muted-foreground">
                  {formatCurrency(product.originalPrice)}
                </div>
              </div>
            </div>
          )}
          
          {features.includes("discount") && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Discount</div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-0">
                {product.discountPercentage}% off
              </Badge>
            </div>
          )}
          
          {features.includes("rating") && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Rating</div>
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted-foreground/30"
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{product.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
          
          {features.includes("platform") && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Platform</div>
              <Badge 
                variant="outline" 
                className={`${getPlatformColor(product.platform)} border-0`}
              >
                {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Button size="sm" className="w-full rounded-full" asChild>
            <a href={getProductExternalUrl(product)} target="_blank" rel="noopener noreferrer">
              View Deal
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ComparisonSummaryProps {
  products: Deal[];
}

function ComparisonSummary({ products }: ComparisonSummaryProps) {
  // Find the best deal based on price
  const bestPriceDeal = [...products].sort((a, b) => a.discountedPrice - b.discountedPrice)[0];
  
  // Find the highest discount
  const bestDiscountDeal = [...products].sort((a, b) => b.discountPercentage - a.discountPercentage)[0];
  
  // Find the highest rated
  const bestRatedDeal = [...products].sort((a, b) => b.rating - a.rating)[0];
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Best Price</h4>
          <Badge 
            variant="outline" 
            className="bg-primary/10 text-primary border-0"
          >
            Save {formatCurrency(
              products.reduce((acc, p) => Math.max(acc, p.discountedPrice), 0) - bestPriceDeal.discountedPrice
            )}
          </Badge>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-secondary/20 overflow-hidden mr-3">
            <img 
              src={bestPriceDeal.imageUrl} 
              alt={bestPriceDeal.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium line-clamp-1">{bestPriceDeal.title}</div>
            <div className="text-sm">{formatCurrency(bestPriceDeal.discountedPrice)}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Highest Discount</h4>
          <Badge 
            variant="outline" 
            className="bg-green-500/10 text-green-600 border-0"
          >
            {bestDiscountDeal.discountPercentage}% off
          </Badge>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-secondary/20 overflow-hidden mr-3">
            <img 
              src={bestDiscountDeal.imageUrl} 
              alt={bestDiscountDeal.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium line-clamp-1">{bestDiscountDeal.title}</div>
            <div className="text-sm">
              <span className="font-medium">{formatCurrency(bestDiscountDeal.discountedPrice)}</span>
              <span className="text-xs line-through text-muted-foreground ml-1">
                {formatCurrency(bestDiscountDeal.originalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Highest Rated</h4>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm">{bestRatedDeal.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-secondary/20 overflow-hidden mr-3">
            <img 
              src={bestRatedDeal.imageUrl} 
              alt={bestRatedDeal.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium line-clamp-1">{bestRatedDeal.title}</div>
            <div className="text-xs text-muted-foreground">
              Best quality based on ratings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
