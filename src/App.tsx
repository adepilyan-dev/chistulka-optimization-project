
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import BlogPost from "./pages/BlogPost";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import { useYandexMetrika } from "./hooks/useYandexMetrika";
import { SeoNotFound } from "./components/Seo";

const queryClient = new QueryClient();

function AppInner() {
  useYandexMetrika();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<><SeoNotFound /><NotFound /></>} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppInner />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;