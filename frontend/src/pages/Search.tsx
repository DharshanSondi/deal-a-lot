
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { DealCard } from "@/components/ui/deal-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { mockDeals } from "@/data/mock-deals";
import { Deal } from "@/types/deals";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // In a real app, you would fetch from an API with the search query
    setTimeout(() => {
      if (query) {
        const filteredDeals = mockDeals.filter(
          (deal) =>
            deal.title.toLowerCase().includes(query.toLowerCase()) ||
            (deal.description &&
              deal.description.toLowerCase().includes(query.toLowerCase()))
        );
        setDeals(filteredDeals);
      } else {
        setDeals([]);
      }
      setIsLoading(false);
    }, 500);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {query
                ? `Showing results for "${query}"`
                : "Search for deals across all platforms"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative flex w-full">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 pr-10 py-2 rounded-l-full"
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
              </div>
              <Button type="submit" className="rounded-r-full">
                Search
              </Button>
            </form>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl glass shadow-elegant animate-pulse h-[360px]"
                />
              ))}
            </div>
          ) : deals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              {query ? (
                <>
                  <div className="mb-4 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try a different search query or browse our deals
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-4 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Enter a search query</h3>
                  <p className="text-muted-foreground">
                    Start typing to search for deals
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
