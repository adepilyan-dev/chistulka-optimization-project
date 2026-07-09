
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CookieBanner from "./components/CookieBanner";
import { useYandexMetrika } from "./hooks/useYandexMetrika";
import { SeoNotFound } from "./components/Seo";
import NotFoundContent from "./components/NotFoundContent";

const Privacy = lazy(() => import("./pages/Privacy"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ServiceDistrictPage = lazy(() => import("./pages/ServiceDistrictPage"));
const Works = lazy(() => import("./pages/Works"));
const SeoAdmin = lazy(() => import("./pages/SeoAdmin"));
const Landing = lazy(() => import("./pages/Landing"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ServiceRedirect = lazy(() => import("./pages/ServiceRedirect"));

const queryClient = new QueryClient();

function AppInner() {
  useYandexMetrika();
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/uslugi/:slug" element={<ServicePage />} />
          <Route path="/uslugi/:slug/:district" element={<ServiceDistrictPage />} />
          <Route path="/himchistka-:slug" element={<ServiceRedirect />} />
          <Route path="/nashi-raboty" element={<Works />} />
          <Route path="/seo-panel" element={<SeoAdmin />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/otzyvy" element={<Reviews />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<><SeoNotFound /><NotFoundContent /></>} />
        </Routes>
      </Suspense>
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