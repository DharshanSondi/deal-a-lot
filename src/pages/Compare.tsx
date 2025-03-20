
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, X, Plus, ChevronDown, ChevronUp, ExternalLink, ShoppingBag } from "lucide-react";
import { mockDeals } from "@/data/mock-deals";

export default function Compare() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [compareFeatures, setCompareFeatures] = useState<string[]>([
    "price",
    "discount",
    "rating",
    "platform",
  ]);
  
  const filteredProducts = mockDeals.filter(
    deal => deal.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(true);
  };
  
  const addProduct = (product: any) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };
  
  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
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
              Compare prices and features across different platforms
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
                    if (e.target.value.length > 2) {
                      setShowSearchResults(true);
                    } else {
                      setShowSearchResults(false);
                    }
                  }}
                  className="flex-grow"
                />
                <Button type="submit" disabled={searchQuery.length < 3}>
                  Search
                </Button>
              </div>
            </form>
            
            {showSearchResults && searchQuery.length > 2 && (
              <div className="bg-background rounded-lg shadow-md overflow-y-auto max-h-60 animate-fade-in">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="p-3 flex items-center gap-3 border-b border-border/50 last:border-0 hover:bg-secondary/30 cursor-pointer"
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
              <div className="text-sm text-muted-foreground mb-2">Selected Products ({selectedProducts.length}/3)</div>
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
                      onClick={() => removeProduct(product.id)}
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
                    <div className="flex flex-wrap gap-2">
                      <FeatureToggle 
                        feature="price" 
                        label="Price" 
                        active={compareFeatures.includes("price")} 
                        onToggle={toggleFeature} 
                      />
                      <FeatureToggle 
                        feature="discount" 
                        label="Discount" 
                        active={compareFeatures.includes("discount")} 
                        onToggle={toggleFeature} 
                      />
                      <FeatureToggle 
                        feature="rating" 
                        label="Rating" 
                        active={compareFeatures.includes("rating")} 
                        onToggle={toggleFeature} 
                      />
                      <FeatureToggle 
                        feature="platform" 
                        label="Platform" 
                        active={compareFeatures.includes("platform")} 
                        onToggle={toggleFeature} 
                      />
                    </div>
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

interface FeatureToggleProps {
  feature: string;
  label: string;
  active: boolean;
  onToggle: (feature: string) => void;
}

function FeatureToggle({ feature, label, active, onToggle }: FeatureToggleProps) {
  return (
    <button
      onClick={() => onToggle(feature)}
      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
        active 
          ? "bg-primary/10 text-primary" 
          : "bg-secondary/50 text-muted-foreground"
      }`}
    >
      {label}
    </button>
  );
}

interface ComparisonCardProps {
  product: any;
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
    <div className="bg-card rounded-xl overflow-hidden shadow-elegant">
      <div className="relative aspect-[3/2] bg-secondary/30">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full glass backdrop-blur-sm"
          onClick={onRemove}
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
        <h3 className="font-medium line-clamp-2 mb-2">{product.title}</h3>
        
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
        </div>
        
        <div className="mt-4">
          <Button size="sm" className="w-full rounded-full" asChild>
            <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
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
  products: any[];
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
      <div className="bg-secondary/20 rounded-xl p-4">
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
      
      <div className="bg-secondary/20 rounded-xl p-4">
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
      
      <div className="bg-secondary/20 rounded-xl p-4">
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
