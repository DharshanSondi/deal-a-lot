
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Index from "./pages/Index";
import Deals from "./pages/Deals";
import DealDetail from "./pages/DealDetail";
import Categories from "./pages/Categories";
import Compare from "./pages/Compare";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";

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
              }
            }}
          />
          <BrowserRouter>
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
              <Route path="/saved-deals" element={<Navigate to="/wishlist" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
