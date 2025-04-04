
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "./navbar/brand-logo";
import { DesktopNav } from "./navbar/desktop-nav";
import { DesktopActions } from "./navbar/desktop-actions";
import { MobileMenu } from "./navbar/mobile-menu";

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

  // Check initial auth state
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    checkUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed in navbar:", event, !!session);
        setIsLoggedIn(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <BrandLogo />
        <DesktopNav location={location} />
        <DesktopActions 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />

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

      <MobileMenu 
        isMenuOpen={isMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        closeMenu={closeMenu}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        location={location}
      />
    </header>
  );
}
