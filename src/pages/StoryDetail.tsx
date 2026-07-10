import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getStoryBySlug, STORIES } from "@/data/stories";
import { useMaxConsent, MAX_LINK } from "@/hooks/useMaxConsent";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import logo from "@/assets/logo.webp";

export default function StoryDetail() {
  const { slug } = useParams();
  const story = getStoryBySlug(slug);
  const { consent, setConsent, openMax } = useMaxConsent();
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!story) return <Navigate to="/istorii-klientov" replace />;

  const other = STORIES.filter((s) => s.slug !== story.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.intro,
    image: story.afterImg,
    author: { "@type": "Organization", name: "Аренда Чистоты" },
    about: {
      "@type": "Service",
      name: story.serviceTitle,
      url: `https://arenda-chistoty.ru/uslugi/${story.serviceSlug}`,
    },
    review: {
      "@type": "Review",
      author: { "@type": "Person", name: story.clientName },
      reviewBody: story.quote,
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title={story.seoTitle}
        description={story.seoDescription}
        path={`/istorii-klientov/${story.slug}`}
        image={story.afterImg}
        type="article"
        jsonLd={jsonLd}
        breadcrumbs={[
          { label: "Истории клиентов", href: "/istorii-klientov" },
          { label: story.title },
        ]}
      />

      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Аренда Чистоты"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>
          <Link to="/istorii-klientov" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            Все истории
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Breadcrumbs items={[
          { label: "Истории клиентов", href: "/istorii-klientov" },
          { label: story.title },
        ]} />

        <div className="flex items-center gap-3 mb-4">
          <span className="section-tag text-xs">{story.categoryLabel}</span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>{story.clientName} · {story.clientRole}</span>
        </div>

        <h1 className="font-oswald font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--dark)" }}>
          {story.title}
        </h1>

        {/* До/После */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-sm" style={{ aspectRatio: "4/3" }}>
          <img
            src={story.beforeImg}
            alt={`До — ${story.title}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: showAfter ? 0 : 1 }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <img
            src={story.afterImg}
            alt={`После — ${story.title}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: showAfter ? 1 : 0 }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-0 rounded-full overflow-hidden shadow-lg z-10">
            <button
              onClick={() => setShowAfter(false)}
              className="px-5 py-2 text-sm font-semibold transition-all"
              style={{ background: !showAfter ? "var(--yellow)" : "rgba(255,255,255,0.85)", color: "var(--dark)" }}
            >
              До
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className="px-5 py-2 text-sm font-semibold transition-all"
              style={{ background: showAfter ? "var(--yellow)" : "rgba(255,255,255,0.85)", color: "var(--dark)" }}
            >
              После
            </button>
          </div>
        </div>

        <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm space-y-5">
          <p className="text-base leading-relaxed" style={{ color: "var(--gray)" }}>
            {story.intro}
          </p>

          <h2 className="font-oswald font-semibold text-xl pt-2" style={{ color: "var(--dark)" }}>
            В чём была сложность
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--gray)" }}>
            {story.problem}
          </p>

          <h2 className="font-oswald font-semibold text-xl pt-2" style={{ color: "var(--dark)" }}>
            Как мы решили задачу
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--gray)" }}>
            {story.solution}
          </p>

          <h2 className="font-oswald font-semibold text-xl pt-2" style={{ color: "var(--dark)" }}>
            Результат
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--gray)" }}>
            {story.result}
          </p>

          <div className="rounded-2xl p-5 mt-4" style={{ background: "var(--light-bg)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Quote" size={18} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--dark)" }}>{story.clientName}</span>
            </div>
            <p className="text-sm leading-relaxed italic" style={{ color: "var(--gray)" }}>
              «{story.quote}»
            </p>
          </div>

          <div className="pt-6 mt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--dark)" }}>
                Похожая задача? Мы поможем.
              </p>
              <Link to={`/uslugi/${story.serviceSlug}`} className="text-xs font-semibold" style={{ color: "var(--teal)" }}>
                Подробнее об услуге «{story.serviceTitle}» →
              </Link>
            </div>
            <div className="flex flex-col items-end gap-2">
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMax}
                className="btn-primary px-6 py-2.5 text-sm font-oswald whitespace-nowrap flex items-center gap-2"
              >
                <Icon name="MessageCircle" size={16} />
                Оставить заявку
              </a>
              <ConsentCheckbox checked={consent} onChange={setConsent} />
            </div>
          </div>
        </article>

        {other.length > 0 && (
          <div className="mt-12">
            <h3 className="font-oswald font-bold text-xl mb-5" style={{ color: "var(--dark)" }}>Читайте также</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {other.map((s) => (
                <Link key={s.slug} to={`/istorii-klientov/${s.slug}`} className="card-clean overflow-hidden group">
                  <div className="h-36 overflow-hidden">
                    <img src={s.afterImg} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="section-tag text-xs">{s.categoryLabel}</span>
                    <h4 className="font-oswald font-bold text-base leading-snug mt-3" style={{ color: "var(--dark)" }}>{s.title}</h4>
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