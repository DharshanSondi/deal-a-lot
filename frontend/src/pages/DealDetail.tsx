
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  ArrowLeft, 
  Star, 
  ThumbsUp, 
  Share, 
  ShoppingCart, 
  Heart
} from "lucide-react";
import { mockDeals } from "@/data/mock-deals";
import { Deal } from "@/types/deals";
import { toast } from "sonner";

export default function DealDetail() {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundDeal = mockDeals.find(d => d.id === id) || null;
      setDeal(foundDeal);
      setIsLoading(false);
      
      // Check if deal is in wishlist
      const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
      setIsLiked(savedDeals.includes(id));
    }, 500);
  }, [id]);
  
  const handleLikeToggle = () => {
    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    let newSavedDeals;
    
    if (isLiked) {
      newSavedDeals = savedDeals.filter((dealId: string) => dealId !== id);
      toast.success("Deal removed", {
        description: "Removed from your saved deals",
      });
    } else {
      newSavedDeals = [...savedDeals, id];
      toast.success("Deal saved", {
        description: "Added to your saved deals",
      });
    }
    
    localStorage.setItem("savedDeals", JSON.stringify(newSavedDeals));
    setIsLiked(!isLiked);
  };
  
  const handleShare = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied", {
      description: "Deal link copied to clipboard",
    });
  };
  
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
        return 'bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20';
      case 'flipkart':
        return 'bg-[#2874F0]/10 text-[#2874F0] hover:bg-[#2874F0]/20';
      case 'meesho':
        return 'bg-[#F43397]/10 text-[#F43397] hover:bg-[#F43397]/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-16">
        <Navbar />
        <div className="pt-28 md:pt-36 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-2/3 bg-secondary rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-[4/3] bg-secondary rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 w-full bg-secondary rounded"></div>
                  <div className="h-4 w-3/4 bg-secondary rounded"></div>
                  <div className="h-10 w-1/3 bg-secondary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen pb-16">
        <Navbar />
        <div className="pt-28 md:pt-36 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl font-bold mb-4">Deal Not Found</h1>
            <p className="text-muted-foreground mb-6">The deal you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/deals">Browse All Deals</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
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
            
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {deal.isNew && (
                <Badge variant="secondary" className="font-medium bg-primary/70 text-white">
                  New
                </Badge>
              )}
              {deal.isTrending && (
                <Badge variant="secondary" className="font-medium bg-red-500/70 text-white">
                  Trending
                </Badge>
              )}
              <Badge 
                variant="outline" 
                className={`font-medium border-0 ${getPlatformColor(deal.platform)}`}
              >
                {deal.platform.charAt(0).toUpperCase() + deal.platform.slice(1)}
              </Badge>
              <Badge variant="outline" className="font-medium border-0 bg-secondary/50">
                {deal.category?.charAt(0).toUpperCase() + deal.category?.slice(1) || 'General'}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold">{deal.title}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Deal Image */}
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-secondary/30">
              <img 
                src={deal.imageUrl} 
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Deal Info */}
            <div>
              <div className="mb-6">
                <p className="text-lg text-muted-foreground mb-4">
                  {deal.description}
                </p>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-medium">{deal.rating?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 mb-6">
                <div className="flex items-baseline mb-2">
                  <div className="text-3xl font-bold mr-3">{formatCurrency(deal.discountedPrice)}</div>
                  <div className="text-lg line-through text-muted-foreground">{formatCurrency(deal.originalPrice)}</div>
                </div>
                
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-0 mb-4">
                  {deal.discountPercentage}% off
                </Badge>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button className="flex-1 rounded-full" asChild>
                    <a 
                      href={deal.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Now
                    </a>
                  </Button>
                  <Button 
                    variant={isLiked ? "default" : "outline"} 
                    className={`rounded-full ${isLiked ? 'bg-red-500 hover:bg-red-600' : ''}`} 
                    onClick={handleLikeToggle}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="ml-2">{isLiked ? 'Saved' : 'Save'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full" 
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6">
                <h3 className="font-medium mb-3">Deal Highlights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Save {formatCurrency(deal.originalPrice - deal.discountedPrice)} on this purchase</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Free delivery available on orders above ₹499</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Limited time offer, grab it before it expires</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Similar Deals Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Deals You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockDeals
                .filter(d => d.category === deal.category && d.id !== deal.id)
                .slice(0, 4)
                .map(similarDeal => (
                  <Link
                    key={similarDeal.id}
                    to={`/deal/${similarDeal.id}`}
                    className="glass p-4 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-secondary/30">
                      <img 
                        src={similarDeal.imageUrl} 
                        alt={similarDeal.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium line-clamp-2 mb-1">{similarDeal.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{formatCurrency(similarDeal.discountedPrice)}</div>
                      <Badge className="bg-green-500/10 text-green-600 border-0">
                        {similarDeal.discountPercentage}% off
                      </Badge>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
