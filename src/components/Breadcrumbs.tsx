// ============================
// Хлебные крошки на странице услуги + района
// ============================

export function ServiceDistrictPage() {
  // URL: /uslugi/himchistka-divanov/tsentralnyy-okrug
  const { serviceSlug, districtSlug } = useParams();

  const service = SERVICES_DATA.find((s) => s.slug === serviceSlug);
  const district = DISTRICTS.find((d) => d.slug === districtSlug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Услуги", href: "/uslugi", icon: "Briefcase" },
          {
            label: service?.shortTitle || "Услуга",
            href: `/uslugi/${serviceSlug}`,
            icon: "Sofa",
          },
          { label: district?.name || "Район", icon: "MapPin" },
        ]}
        separator={
          <Icon name="ChevronRight" size={14} className="text-gray-300" />
        }
        className="mb-8"
      />

      <h1 className="font-oswald text-3xl font-bold text-teal">
        {service?.title} в {district?.name}
      </h1>
    </div>
  );
}

// ============================
// Хлебные крошки на странице блога
// ============================

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Блог", href: "/blog", icon: "Newspaper" },
          {
            label: post?.category || "Статьи",
            href: `/blog/category/${post?.category}`,
          },
          { label: post?.title || "Статья" },
        ]}
        maxItems={3}
        homeLabel="🏠"
        showHomeIcon={false}
      />

      <article>
        <h1 className="font-oswald text-3xl font-bold">{post?.title}</h1>
      </article>
    </div>
  );
}

// ============================
// Хлебные крошки с длинным путём
// ============================

export function DeepPage() {
  return (
    <Breadcrumbs
      items={[
        { label: "Каталог", href: "/catalog" },
        { label: "Мебель", href: "/catalog/furniture" },
        { label: "Мягкая мебель", href: "/catalog/furniture/soft" },
        { label: "Диваны", href: "/catalog/furniture/soft/sofas" },
        {
          label: "Угловые диваны",
          href: "/catalog/furniture/soft/sofas/corner",
        },
        {
          label: "Диван угловой 3-местный",
          href: "/catalog/furniture/soft/sofas/corner/3seat",
        },
        { label: "Чехол для дивана" },
      ]}
      maxItems={4}
      ellipsis
      separator={<span className="text-teal-300 mx-0.5">/</span>}
    />
  );
}
