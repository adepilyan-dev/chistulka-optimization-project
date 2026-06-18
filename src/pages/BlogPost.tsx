import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense, useMemo } from "react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostBySlug, BLOG_POSTS } from "@/data/blog";

// 🌀 Ленивая загрузка иконок (не критичны для первого экрана)
const Icon = lazy(() => import("@/components/ui/icon"));

// ✅ Исправлен URL сайта
const SITE_URL = "https://arenda-chistoty.ru";
const PHONE = "+79189682882";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // 🔄 Скролл наверх при загрузке
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // 🚫 404 если нет поста
  if (!post) return <Navigate to="/" replace />;

  // 📝 Мемоизация SEO-данных
  const articleLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.img,
      datePublished: post.date,
      author: { "@type": "Organization", name: "Аренда Чистоты" },
      publisher: {
        "@type": "Organization",
        name: "Аренда Чистоты",
        logo: {
          "@type": "ImageObject",
          url: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg",
        },
      },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    }),
    [post],
  );

  // 📦 Другие посты
  const otherPosts = useMemo(
    () => BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2),
    [post.slug],
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      {/* 🔍 SEO */}
      <Seo
        title={post.seoTitle ?? `${post.title} | Блог «Аренда Чистоты»`}
        description={post.seoDescription ?? post.excerpt}
        keywords={post.keywords}
        path={`/blog/${post.slug}`}
        image={post.img}
        type="article"
        jsonLd={articleLd}
        breadcrumbs={[{ label: "Блог", href: "/#blog" }, { label: post.title }]}
        canonical={`${SITE_URL}/blog/${post.slug}`}
      />

      {/* ⚡ Шапка */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="На главную"
          >
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
              width="120"
              height="36"
              fetchpriority="high"
              decoding="async"
            />
          </Link>
          <Link
            to="/#blog"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--teal)" }}
          >
            <Suspense fallback={<span>←</span>}>
              <Icon name="ArrowLeft" size={16} />
            </Suspense>
            В блог
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* 🍞 Хлебные крошки */}
        <Breadcrumbs
          items={[{ label: "Блог", href: "/#blog" }, { label: post.title }]}
        />

        {/* 🏷️ Мета-информация */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className="section-tag text-xs">{post.tag}</span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>
            {post.date}
          </span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>
            · {post.readTime} чтения
          </span>
        </div>

        {/* 📝 Заголовок */}
        <h1
          className="font-oswald font-bold mb-6 leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "var(--dark)",
          }}
        >
          {post.title}
        </h1>

        {/* 🖼️ Изображение */}
        <div className="rounded-3xl overflow-hidden mb-8 shadow-sm">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-auto object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            width="768"
            height="432"
          />
        </div>

        {/* 📖 Контент */}
        <article
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm space-y-5"
          style={{ border: "1px solid var(--border)" }}
        >
          {post.content.map((block, i) => {
            if (block.type === "h") {
              return (
                <h2
                  key={i}
                  className="font-oswald font-semibold text-xl pt-2"
                  style={{ color: "var(--dark)" }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items?.map((it, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--gray)" }}
                    >
                      <Suspense
                        fallback={<span className="text-teal text-sm">✓</span>}
                      >
                        <Icon
                          name="Check"
                          size={17}
                          style={{ color: "var(--teal)" }}
                          className="flex-shrink-0 mt-0.5"
                        />
                      </Suspense>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="text-base leading-relaxed"
                style={{ color: "var(--gray)" }}
              >
                {block.text}
              </p>
            );
          })}

          {/* 📞 CTA в конце статьи */}
          <div
            className="pt-6 mt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--dark)" }}>
              Нужна химчистка мебели? Вызовите мастера прямо сейчас.
            </p>
            <Link
              to="/#contacts"
              className="btn-primary px-6 py-2.5 text-sm font-oswald whitespace-nowrap"
            >
              Вызвать мастера
            </Link>
          </div>
        </article>

        {/* 📚 Другие посты */}
        {otherPosts.length > 0 && (
          <div className="mt-12">
            <h3
              className="font-oswald font-bold text-xl mb-5"
              style={{ color: "var(--dark)" }}
            >
              Читайте также
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-2xl overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 group"
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="200"
                    />
                  </div>
                  <div className="p-5">
                    <span className="section-tag text-xs">{p.tag}</span>
                    <h4
                      className="font-oswald font-bold text-base leading-snug mt-3"
                      style={{ color: "var(--dark)" }}
                    >
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 🦶 Футер */}
      <footer
        className="border-t bg-white mt-12"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "var(--gray)" }}
        >
          <span>© {new Date().getFullYear()} Аренда Чистоты, Краснодар</span>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              style={{ color: "var(--gray)" }}
              className="hover:underline"
            >
              Конфиденциальность
            </Link>
            <a
              href={`tel:${PHONE}`}
              style={{ color: "var(--teal)" }}
              className="font-medium"
            >
              8 918 968-28-82
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
