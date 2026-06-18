
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
import ServicePage from "./pages/ServicePage";
import DistrictPage from "./pages/DistrictPage";
import ServiceDistrictPage from "./pages/ServiceDistrictPage";
import NotFound from "./pages/NotFound";
import Works from "./pages/Works";
import SeoAdmin from "./pages/SeoAdmin";
import Landing from "./pages/Landing";
import CookieBanner from "./components/CookieBanner";
import { useYandexMetrika } from "./hooks/useYandexMetrika";
import { SeoNotFound } from "./components/Seo";
import NotFoundContent from "./components/NotFoundContent";

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
        <Route path="/uslugi/:slug" element={<ServicePage />} />
        <Route path="/uslugi/:slug/:district" element={<ServiceDistrictPage />} />
        <Route path="/himchistka-:district" element={<DistrictPage />} />
        <Route path="/nashi-raboty" element={<Works />} />
        <Route path="/seo-panel" element={<SeoAdmin />} />
        <Route path="/landing" element={<Landing />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<><SeoNotFound /><NotFoundContent /></>} />
      </Routes>
      <CookieBanner />
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