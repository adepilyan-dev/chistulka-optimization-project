import { Navigate, useParams } from "react-router-dom";
import { getServiceBySlug } from "@/data/services";
import { getDistrictBySlug } from "@/data/districts";
import ServicePage from "./ServicePage";
import DistrictPage from "./DistrictPage";

export default function HimchistkaRouter() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  const SLUG_ALIASES: Record<string, string> = { stulyev: "stulev" };
  const normalizedSlug = SLUG_ALIASES[slug] ?? slug;
  const serviceSlug = `himchistka-${normalizedSlug}`;
  const service = getServiceBySlug(serviceSlug);
  if (service) {
    return <ServicePage overrideSlug={serviceSlug} overridePath={`/himchistka-${slug}`} />;
  }

  const district = getDistrictBySlug(slug);
  if (district) {
    return <DistrictPage />;
  }

  return <Navigate to="/" replace />;
}