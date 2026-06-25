import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostBySlug, BLOG_POSTS } from "@/data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/" replace />;

  const other = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
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
    mainEntityOfPage: `https://arenda-chistoty.online/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title={post.seoTitle ?? `${post.title} | Блог «Аренда Чистоты»`}
        description={post.seoDescription ?? post.excerpt}
        keywords={post.keywords}
        path={`/blog/${post.slug}`}
        image={post.img}
        type="article"
        jsonLd={articleLd}
        breadcrumbs={[
          { label: "Блог", href: "/#blog" },
          { label: post.title },
        ]}
      />
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>
          <Link to="/#blog" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            В блог
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={[
          { label: "Блог", href: "/#blog" },
          { label: post.title },
        ]} />
        <div className="flex items-center gap-3 mb-4">
          <span className="section-tag text-xs">{post.tag}</span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>{post.date}</span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>· {post.readTime} чтения</span>
        </div>

        <h1 className="font-oswald font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--dark)" }}>
          {post.title}
        </h1>

        <div className="rounded-3xl overflow-hidden mb-8 shadow-sm">
          <img src={post.img} alt={post.title} className="w-full h-auto object-cover" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm space-y-5">
          {post.content.map((block, i) => {
            if (block.type === "h") {
              return (
                <h2 key={i} className="font-oswald font-semibold text-xl pt-2" style={{ color: "var(--dark)" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items?.map((it, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
                      <Icon name="Check" size={17} style={{ color: "var(--teal)" }} className="flex-shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--gray)" }}>
                {block.text}
              </p>
            );
          })}

          <div className="pt-6 mt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium" style={{ color: "var(--dark)" }}>
              Нужна химчистка мебели? Вызовите мастера прямо сейчас.
            </p>
            <Link to="/#contacts" className="btn-primary px-6 py-2.5 text-sm font-oswald whitespace-nowrap">
              Вызвать мастера
            </Link>
          </div>
        </article>

        {other.length > 0 && (
          <div className="mt-12">
            <h3 className="font-oswald font-bold text-xl mb-5" style={{ color: "var(--dark)" }}>Читайте также</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {other.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="card-clean overflow-hidden group">
                  <div className="h-36 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="section-tag text-xs">{p.tag}</span>
                    <h4 className="font-oswald font-bold text-base leading-snug mt-3" style={{ color: "var(--dark)" }}>{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}