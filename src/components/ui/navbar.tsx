
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X,
  Heart,
  Tag,
  BarChart3,
  LogOut,
} from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, icon, isActive, onClick }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center px-3 py-2 text-sm rounded-full transition-all duration-300",
      "hover:bg-secondary/80 focus-ring",
      isActive 
        ? "bg-secondary font-medium text-foreground" 
        : "text-foreground/70"
    )}
    onClick={onClick}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </Link>
);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      closeMenu();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-smooth",
        isScrolled ? "glass shadow-elegant" : "bg-transparent",
        isMenuOpen ? "bg-background" : ""
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-medium focus-ring rounded-md"
        >
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            DH
          </div>
          <span className="text-xl font-semibold tracking-tight">
            DiscountHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink 
            href="/"
            label="Home"
            isActive={location.pathname === '/'}
          />
          <NavLink 
            href="/deals"
            label="Deals"
            isActive={location.pathname === '/deals'}
          />
          <NavLink 
            href="/categories"
            label="Categories"
            isActive={location.pathname === '/categories'}
          />
          <NavLink 
            href="/compare"
            label="Compare"
            isActive={location.pathname === '/compare'}
          />
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              type="submit"
            >
              <Search className="h-5 w-5" />
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

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full focus-ring"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      {isMenuOpen && (
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
      )}
    </header>
  );
}
