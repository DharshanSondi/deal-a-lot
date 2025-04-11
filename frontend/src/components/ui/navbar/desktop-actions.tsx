
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, User, LogOut } from "lucide-react";

interface DesktopActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
}

export function DesktopActions({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoggedIn,
  handleLogout
}: DesktopActionsProps) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-40 px-3 py-1 text-sm rounded-full border border-border bg-background/80 focus:outline-none"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
          type="submit"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>

      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        asChild
      >
        <Link to="/wishlist">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Link>
      </Button>

      {isLoggedIn ? (
        <div className="relative group">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full group-hover:bg-secondary/80"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <div className="absolute right-0 mt-2 w-48 origin-top-right 
            rounded-xl glass shadow-elegant py-1 opacity-0 invisible scale-95
            group-hover:opacity-100 group-hover:visible group-hover:scale-100
            transition-all duration-200 ease-smooth">
            <Link 
              to="/profile" 
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-md mx-1"
            >
              Profile
            </Link>
            <Link 
              to="/wishlist" 
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-md mx-1"
            >
              Saved Deals
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary/50 rounded-md mx-1"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Button 
          variant="default" 
          size="sm" 
          className="rounded-full" 
          asChild
        >
          <Link to="/auth">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
