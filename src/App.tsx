import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Ленивая загрузка страниц
const Index = lazy(() => import("@/pages/Index"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const ServiceDistrictPage = lazy(() => import("@/pages/ServiceDistrictPage"));
const DistrictPage = lazy(() => import("@/pages/DistrictPage"));
const Works = lazy(() => import("@/pages/Works"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #e5e7eb",
                  borderTopColor: "#0cb8a0",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ color: "#6c757d" }}>Загрузка страницы...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi/:slug" element={<ServicePage />} />
          <Route
            path="/uslugi/:slug/:district"
            element={<ServiceDistrictPage />}
          />
          <Route path="/himchistka-:district" element={<DistrictPage />} />
          <Route path="/nashi-raboty" element={<Works />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
