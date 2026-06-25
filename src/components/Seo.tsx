import { Helmet } from "react-helmet-async";

const SITE = "https://arenda-chistoty.online";
const DEFAULT_IMAGE =
  "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/1f8a12d2-02a6-452c-a1cb-4fa8f342c646.jpg";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string;
  jsonLd?: object;
  breadcrumbs?: BreadcrumbItem[];
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
  breadcrumbs,
}: SeoProps) {
  const url = `${SITE}${path}`;

  const breadcrumbLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE + "/" },
          ...breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: b.label,
            ...(b.href ? { item: SITE + b.href } : { item: url }),
          })),
        ],
      }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
    </Helmet>
  );
}

export function SeoNotFound() {
  return (
    <Helmet>
      <title>Страница не найдена | Аренда Чистоты</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}