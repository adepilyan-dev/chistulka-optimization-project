import { Navigate, useLocation } from "react-router-dom";
import { getServiceBySlug } from "@/data/services";
import ServicePage from "./ServicePage";

const PATH_TO_SLUG: Record<string, string> = {
  "/himchistka-divanov": "himchistka-divanov",
  "/himchistka-kresel": "himchistka-kresel",
  "/himchistka-matrasov": "himchistka-matrasov",
  "/himchistka-kovrov": "himchistka-kovrov",
  "/himchistka-stulyev": "himchistka-stulev",
  "/himchistka-stulev": "himchistka-stulev",
  "/himchistka-avtosalona": "himchistka-avtosalona",
};

export default function ServiceRedirect() {
  const { pathname } = useLocation();
  const slug = PATH_TO_SLUG[pathname];

  if (!slug) return <Navigate to="/" replace />;

  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/" replace />;

  return <ServicePage overrideSlug={slug} overridePath={pathname} />;
}