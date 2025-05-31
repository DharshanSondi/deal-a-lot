import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TourGuide } from "@/components/onboarding/TourGuide";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Update import paths to work correctly in the frontend folder structure
import Index from "@/pages/Index";
import Deals from "@/pages/Deals";
import DealDetail from "@/pages/DealDetail";
import Categories from "@/pages/Categories";
import Compare from "@/pages/Compare";
import AuthPage from "@/pages/AuthPage";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Wishlist from "@/pages/Wishlist";
import Search from "@/pages/Search";
import ContactUs from "@/pages/ContactUs";
import HelpCenter from "@/pages/HelpCenter";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Admin from "@/pages/Admin";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  // Check if user has seen the tour
  useEffect(() => {
    // Try to detect first-time users
    const hasSeenTour = localStorage.getItem("discounthub-tour-completed");
    if (!hasSeenTour) {
      // We'll let the TourGuide component handle the tour
      localStorage.setItem("discounthub-tour-enabled", "true");
    }
  }, []);

  // Set up auth state listener at the app level
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed in App:", event);
        
        if (event === 'SIGNED_IN' && session) {
          toast.success("Login successful", {
            description: "Welcome to DiscountHub!",
            className: "bg-background border-green-500",
          });
        } else if (event === 'SIGNED_OUT') {
          toast.info("Signed out successfully", {
            className: "bg-background border-blue-500",
          });
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Get user's preferred theme
  const getPreferredTheme = (): "system" | "dark" | "light" => {
    const savedTheme = localStorage.getItem("discounthub-theme");
    if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
      return savedTheme as "system" | "dark" | "light";
    }
    return "system";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={getPreferredTheme()}>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: "group glass shadow-elegant border border-border",
                title: "font-medium",
                description: "text-muted-foreground",
              },
              duration: 4000,
            }}
          />
          <TourGuide />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deal/:id" element={<DealDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/saved-deals" element={<Navigate to="/wishlist" replace />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
