
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DealCard, DealProps } from "@/components/ui/deal-card";
import { Navbar } from "@/components/ui/navbar";
import { Search, ArrowRight, Tag, BarChart3, ShoppingBag, TrendingUp } from "lucide-react";
import { mockDeals } from "@/data/mock-deals";
import { FlipkartOffers } from "@/components/offers/FlipkartOffers";
import { OfferType } from "@/hooks/useFlipkartOffers";

export default function Index() {
  const [trendingDeals, setTrendingDeals] = useState<DealProps[]>([]);
  const [newDeals, setNewDeals] = useState<DealProps[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const trending = mockDeals.filter(deal => deal.isTrending).slice(0, 4);
    const newArrivals = mockDeals.filter(deal => deal.isNew).slice(0, 4);

    setTimeout(() => {
      setTrendingDeals(trending);
      setNewDeals(newArrivals);
      setLoaded(true);
    }, 500);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:pt-36 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                <span>Best deals across e-commerce platforms</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Find the <span className="text-primary">Best Deals</span> in One Place
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-md">
                DiscountHub aggregates the best offers from Amazon, Flipkart, Meesho, and more to save you time and money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/deals">
                    Explore Deals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elegant animate-scale-in relative">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Shopping"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
                
                {/* Search Bar */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                  <div className="w-full max-w-md mx-auto relative">
                    <form onSubmit={handleSearch} className="glass backdrop-blur-md rounded-full flex items-center p-1 pl-4 pr-1 shadow-elegant">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <input
                        type="text"
                        placeholder="Search for products, brands, etc."
                        className="bg-transparent border-none focus:outline-none flex-grow text-sm py-2 text-foreground placeholder:text-muted-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" size="sm" className="rounded-full ml-1">
                        Search
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Flipkart Offers */}
      <FlipkartOffers 
        title="Flipkart Deals of the Day" 
        description="Limited-time hot picks with great discounts from Flipkart" 
        offerType={OfferType.DEALS_OF_THE_DAY}
        limit={4}
      />

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose DiscountHub?</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              We help you find the best deals across multiple platforms in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals Aggregated</h3>
              <p className="text-muted-foreground">
                We collect the top deals from Amazon, Flipkart, Meesho, and other e-commerce sites.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in delay-150">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Price Comparison</h3>
              <p className="text-muted-foreground">
                Compare prices across multiple platforms to ensure you get the best deal.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 shadow-elegant flex flex-col items-center text-center animate-fade-in delay-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Categories</h3>
              <p className="text-muted-foreground">
                Browse deals by categories and find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Flipkart Offers Section */}
      <FlipkartOffers 
        title="Current Flipkart Offers" 
        description="Best ongoing offers from Flipkart updated in real-time" 
        offerType={OfferType.ALL}
        limit={4}
      />

      {/* Trending Deals Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Trending Deals</h2>
              <p className="text-muted-foreground mt-1">
                Most popular deals based on user activity
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to="/deals">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loaded ? (
              trendingDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground mt-1">
                The latest deals added to our platform
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to="/deals">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loaded ? (
              newDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="glass rounded-2xl shadow-elegant overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Stay Updated with the Best Deals
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and never miss out on the latest deals and discounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="rounded-full">Subscribe</Button>
                </div>
              </div>
              <div className="hidden md:block relative">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Newsletter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 font-medium mb-4">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                  DH
                </div>
                <span className="text-xl font-semibold">DiscountHub</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Aggregating the best deals from across the web to save you time and money.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/deals" className="text-muted-foreground hover:text-foreground">Deals</Link></li>
                <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
                <li><Link to="/compare" className="text-muted-foreground hover:text-foreground">Compare</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/categories/electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
                <li><Link to="/categories/fashion" className="text-muted-foreground hover:text-foreground">Fashion</Link></li>
                <li><Link to="/categories/home" className="text-muted-foreground hover:text-foreground">Home & Kitchen</Link></li>
                <li><Link to="/categories/beauty" className="text-muted-foreground hover:text-foreground">Beauty & Health</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Email: info@discounthub.com</li>
                <li className="text-muted-foreground">Phone: +91 1234567890</li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DiscountHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
