import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { fetchDealsFromAllPlatforms } from "@/utils/api";
import { Deal } from "@/types/deals";
import { Link } from "react-router-dom";

export default function Compare() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("electronics");

  useEffect(() => {
    fetchDealsForCategory();
  }, [category]);

  const fetchDealsForCategory = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDealsFromAllPlatforms("", 50, "", category);
      if (response.success) {
        setDeals(response.deals);
      }
    } catch (error) {
      console.error("Error fetching deals for comparison:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDealToComparison = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal && selectedDeals.length < 3 && !selectedDeals.some(d => d.id === dealId)) {
      setSelectedDeals([...selectedDeals, deal]);
    }
  };

  const removeDealFromComparison = (dealId: string) => {
    setSelectedDeals(selectedDeals.filter(deal => deal.id !== dealId));
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
            <Button 
              variant="ghost" 
              className="rounded-full mb-4" 
              asChild
            >
              <Link to="/deals">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Deals
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
            <p className="text-muted-foreground">
              Compare up to 3 products side by side to find the best deal
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select Products</CardTitle>
                <CardDescription>Choose products to compare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                        <SelectItem value="beauty">Beauty & Health</SelectItem>
                        <SelectItem value="toys">Toys & Games</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Products ({selectedDeals.length}/3)</label>
                    <div className="space-y-2">
                      {isLoading ? (
                        <div className="animate-pulse space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-10 bg-secondary rounded"></div>
                          ))}
                        </div>
                      ) : (
                        <Select 
                          disabled={selectedDeals.length >= 3} 
                          onValueChange={addDealToComparison}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Add product to compare" />
                          </SelectTrigger>
                          <SelectContent>
                            {deals.filter(deal => !selectedDeals.some(d => d.id === deal.id))
                              .map(deal => (
                                <SelectItem key={deal.id} value={deal.id}>
                                  {deal.title.length > 30 
                                    ? `${deal.title.substring(0, 30)}...` 
                                    : deal.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Selected Products</label>
                    <div className="space-y-2">
                      {selectedDeals.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No products selected</p>
                      ) : (
                        selectedDeals.map(deal => (
                          <div key={deal.id} className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                            <span className="text-sm truncate max-w-[180px]">{deal.title}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeDealFromComparison(deal.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Comparison</CardTitle>
                <CardDescription>Side by side comparison of selected products</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDeals.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Select products to compare</p>
                    <Button asChild>
                      <Link to="/deals">Browse Deals</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Feature</TableHead>
                          {selectedDeals.map(deal => (
                            <TableHead key={deal.id}>
                              <div className="space-y-1">
                                <div className="h-20 w-20 mx-auto bg-secondary/30 rounded overflow-hidden">
                                  <img 
                                    src={deal.imageUrl} 
                                    alt={deal.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="font-medium text-center line-clamp-2">
                                  {deal.title}
                                </div>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Price</TableCell>
                          {selectedDeals.map(deal => (
                            <TableCell key={`${deal.id}-price`} className="text-center">
                              <div className="font-bold text-lg">{formatCurrency(deal.discountedPrice)}</div>
                              <div className="text-sm line-through text-muted-foreground">
                                {formatCurrency(deal.originalPrice)}
                              </div>
                              <div className="text-sm text-green-600">
                                {deal.discountPercentage}% off
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Platform</TableCell>
                          {selectedDeals.map(deal => (
                            <TableCell key={`${deal.id}-platform`} className="text-center">
                              {deal.platform.charAt(0).toUpperCase() + deal.platform.slice(1)}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Rating</TableCell>
                          {selectedDeals.map(deal => (
                            <TableCell key={`${deal.id}-rating`} className="text-center">
                              <div className="flex items-center justify-center">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor" 
                                  className="w-4 h-4 text-yellow-500 mr-1"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                                    clipRule="evenodd" 
                                  />
                                </svg>
                                {deal.rating.toFixed(1)}
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Category</TableCell>
                          {selectedDeals.map(deal => (
                            <TableCell key={`${deal.id}-category`} className="text-center">
                              {deal.category || "General"}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Actions</TableCell>
                          {selectedDeals.map(deal => (
                            <TableCell key={`${deal.id}-actions`} className="text-center">
                              <div className="flex flex-col gap-2">
                                <Button size="sm" asChild>
                                  <Link to={`/deal/${deal.id}`}>
                                    View Details
                                  </Link>
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                  <a 
                                    href={deal.externalUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    Buy Now
                                  </a>
                                </Button>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
