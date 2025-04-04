
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Tag, 
  BarChart3, 
  ShoppingBag, 
  Heart, 
  User,
  LogOut 
} from "lucide-react";
import { NavLink } from "./nav-link";

interface MobileMenuProps {
  isMenuOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  closeMenu: () => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
  location: { pathname: string };
}

export function MobileMenu({
  isMenuOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  closeMenu,
  isLoggedIn,
  handleLogout,
  location
}: MobileMenuProps) {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden glass border-t border-border/50 animate-fade-in">
      <div className="px-4 py-3 space-y-1">
        <form onSubmit={handleSearch} className="relative flex w-full mb-3">
          <input
            type="text"
            placeholder="Search for deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-full border border-border bg-background/80 focus:outline-none"
          />
          <Button 
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <NavLink 
          href="/"
          label="Home"
          isActive={location.pathname === '/'}
          onClick={closeMenu}
        />
        <NavLink 
          href="/deals"
          label="Deals"
          icon={<Tag className="h-4 w-4" />}
          isActive={location.pathname === '/deals'}
          onClick={closeMenu}
        />
        <NavLink 
          href="/categories"
          label="Categories"
          icon={<BarChart3 className="h-4 w-4" />}
          isActive={location.pathname === '/categories'}
          onClick={closeMenu}
        />
        <NavLink 
          href="/compare"
          label="Compare"
          icon={<ShoppingBag className="h-4 w-4" />}
          isActive={location.pathname === '/compare'}
          onClick={closeMenu}
        />
        <NavLink 
          href="/wishlist"
          label="Wishlist"
          icon={<Heart className="h-4 w-4" />}
          isActive={location.pathname === '/wishlist'}
          onClick={closeMenu}
        />
        
        {isLoggedIn ? (
          <>
            <NavLink 
              href="/profile"
              label="Profile"
              icon={<User className="h-4 w-4" />}
              isActive={location.pathname === '/profile'}
              onClick={closeMenu}
            />
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center w-full px-3 py-2 text-sm rounded-full text-destructive hover:bg-secondary/80 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </>
        ) : (
          <div className="pt-2">
            <Button 
              className="w-full rounded-full" 
              asChild
            >
              <Link 
                to="/auth" 
                onClick={closeMenu}
              >
                Sign In
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
