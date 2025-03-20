
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ExternalLink, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';

export interface DealProps {
  id: string;
  title: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  rating: number;
  platform: 'amazon' | 'flipkart' | 'meesho' | 'other';
  externalUrl: string;
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isOutOfStock?: boolean;
}

export function DealCard({
  id,
  title,
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  imageUrl,
  rating,
  platform,
  externalUrl,
  category,
  isNew = false,
  isTrending = false,
  isOutOfStock = false,
}: DealProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // Check if deal is saved in wishlist
    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    const isSaved = savedDeals.includes(id);
    setIsLiked(isSaved);
  }, [id]);

  const handleLikeToggle = () => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save deals",
        variant: "destructive",
      });
      return;
    }

    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    let newSavedDeals;
    
    if (isLiked) {
      newSavedDeals = savedDeals.filter((dealId: string) => dealId !== id);
      toast({
        title: "Deal removed",
        description: "Removed from your saved deals",
      });
    } else {
      newSavedDeals = [...savedDeals, id];
      toast({
        title: "Deal saved",
        description: "Added to your saved deals",
      });
    }
    
    localStorage.setItem("savedDeals", JSON.stringify(newSavedDeals));
    setIsLiked(!isLiked);
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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 card-hover border-0 shadow-elegant glass",
      isOutOfStock && "opacity-70",
      "h-full flex flex-col"
    )}>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 animate-pulse">
            <ShoppingBag className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            "hover:scale-105"
          )}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 p-3 flex justify-between">
          <div className="flex gap-2">
            {isNew && (
              <Badge variant="secondary" className="font-medium bg-primary/70 text-white backdrop-blur-sm">
                New
              </Badge>
            )}
            {isTrending && (
              <Badge variant="secondary" className="font-medium bg-red-500/70 text-white backdrop-blur-sm">
                Trending
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="font-medium bg-gray-500/70 text-white backdrop-blur-sm">
                Out of Stock
              </Badge>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "font-medium backdrop-blur-sm border-0",
              getPlatformColor(platform)
            )}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 rounded-full glass backdrop-blur-sm transition-all duration-300",
            isLiked ? "text-red-500 bg-red-500/10" : "text-foreground/70 hover:text-red-500"
          )}
          onClick={handleLikeToggle}
        >
          <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        <div className="absolute bottom-3 left-3 flex items-center glass backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="flex-grow flex flex-col pt-4">
        <div className="space-y-1 flex-grow">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          {description && (
            <p className="text-sm text-foreground/70 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <div className="font-medium text-lg">{formatCurrency(discountedPrice)}</div>
            <div className="text-sm line-through text-foreground/50">{formatCurrency(originalPrice)}</div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-0">
            {discountPercentage}% off
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4 pt-0">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full rounded-full" 
            asChild
          >
            <Link to={`/deal/${id}`}>
              View Deal
            </Link>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full rounded-full" 
            asChild
          >
            <a 
              href={externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Buy Now
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
