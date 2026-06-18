import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense, useMemo } from "react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getServiceBySlug, SERVICES_DATA } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { ymGoal } from "@/hooks/useYandexMetrika";

// 🌀 Ленивая загрузка иконок (не критичны для первого экрана)
const Icon = lazy(() => import("@/components/ui/icon"));

// ✅ Исправлен URL сайта
const SITE_URL = "https://arenda-chistoty.ru";
const PHONE = "+79189682882";
const PHONE_DISPLAY = "8 918 968-28-82";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  // 🔄 Скролл наверх при загрузке
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // 🚫 404 если нет услуги
  if (!service) return <Navigate to="/" replace />;

  // 📝 Мемоизация SEO-данных для предотвращения лишних пересчетов
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.seoDescription,
      image: service.img,
      provider: {
        "@type": "LocalBusiness",
        name: "Аренда Чистоты",
        telephone: PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Краснодар",
          addressCountry: "RU",
        },
      },
      areaServed: { "@type": "City", name: "Краснодар" },
      offers: service.prices.map((p) => ({
        "@type": "Offer",
        name: p.label,
        price: p.price.replace(/[^\d]/g, ""),
        priceCurrency: "RUB",
      })),
    }),
    [service],
  );

  // 📦 Другие услуги и районы
  const otherServices = useMemo(
    () => SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3),
    [service.slug],
  );
  const districts = useMemo(() => DISTRICTS.slice(0, 8), []);

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      {/* 🔍 SEO */}
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={service.keywords}
        path={`/uslugi/${service.slug}`}
        image={service.img}
        jsonLd={jsonLd}
        breadcrumbs={[
          { label: "Услуги", href: "/#services" },
          { label: service.title },
        ]}
        canonical={`${SITE_URL}/uslugi/${service.slug}`}
      />

      {/* ⚡ Шапка */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
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
            to="/#services"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--teal)" }}
          >
            <Suspense fallback={<span>←</span>}>
              <Icon name="ArrowLeft" size={16} />
            </Suspense>
            Все услуги
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* 🍞 Хлебные крошки */}
        <Breadcrumbs
          items={[
            { label: "Услуги", href: "/#services" },
            { label: service.title },
          ]}
        />

        {/* 🖼️ Hero-секция */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 items-center">
          <div>
            <span className="section-tag mb-3 inline-block">Услуга</span>
            <h1
              className="font-oswald font-bold mb-4"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--dark)",
              }}
            >
              {service.h1}
            </h1>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--gray)" }}
            >
              {service.lead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                onClick={() => ymGoal("phone_click")}
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 font-semibold"
              >
                <Suspense fallback={<span>📞</span>}>
                  <Icon name="Phone" size={18} />
                </Suspense>
                Позвонить
              </a>
              <a
                href="/#contacts"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full border transition-all hover:bg-gray-50"
                style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
              >
                <Suspense fallback={<span>✉️</span>}>
                  <Icon name="MessageSquare" size={18} />
                </Suspense>
                Оставить заявку
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              width="600"
              height="450"
            />
          </div>
        </div>

        {/* ⭐ Преимущества */}
        <div className="mb-12">
          <h2
            className="font-oswald font-bold text-2xl mb-6"
            style={{ color: "var(--dark)" }}
          >
            Почему выбирают нас
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-3 sm:gap-4 items-start"
                style={{ border: "1px solid var(--border)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(12,184,160,0.1)" }}
                >
                  <Suspense fallback={<span>✨</span>}>
                    <Icon
                      name={b.icon}
                      size={20}
                      style={{ color: "var(--teal)" }}
                    />
                  </Suspense>
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--dark)" }}
                  >
                    {b.title}
                  </p>
                  <p
                    className="text-sm leading-snug"
                    style={{ color: "var(--gray)" }}
                  >
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💰 Цены */}
        <div className="mb-12">
          <h2
            className="font-oswald font-bold text-2xl mb-6"
            style={{ color: "var(--dark)" }}
          >
            Стоимость
          </h2>
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {service.prices.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom:
                    i < service.prices.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--dark)" }}
                >
                  {item.label}
                </span>
                <span
                  className="font-oswald font-bold text-lg"
                  style={{ color: "var(--teal)" }}
                >
                  {item.price}
                </span>
              </div>
            ))}
            <div
              className="px-6 py-4 text-xs"
              style={{
                background: "rgba(12,184,160,0.05)",
                color: "var(--gray)",
              }}
            >
              Точную стоимость назовёт мастер при осмотре. Выезд и оценка —
              бесплатно.
            </div>
          </div>
        </div>

        {/* ❓ FAQ */}
        <div className="mb-12">
          <h2
            className="font-oswald font-bold text-2xl mb-6"
            style={{ color: "var(--dark)" }}
          >
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {service.faq.map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-2xl p-5 shadow-sm"
                style={{ border: "1px solid var(--border)" }}
              >
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--dark)" }}
                >
                  {item.q}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--gray)" }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📞 CTA-блок */}
        <div
          className="rounded-3xl p-5 sm:p-8 md:p-10 mb-8 md:mb-12 text-center"
          style={{ background: "var(--teal)" }}
        >
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl mb-3">
            Записаться на {service.title.toLowerCase()}
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Бесплатный выезд мастера и оценка объёма работ
          </p>
          <a
            href={`tel:${PHONE}`}
            onClick={() => ymGoal("phone_click")}
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3 rounded-full text-base transition-all hover:opacity-90"
            style={{ color: "var(--teal)" }}
          >
            <Suspense fallback={<span>📞</span>}>
              <Icon name="Phone" size={18} />
            </Suspense>
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* 🗺️ По районам */}
        <div className="mb-12">
          <h2
            className="font-oswald font-bold text-2xl mb-2"
            style={{ color: "var(--dark)" }}
          >
            {service.title} по районам Краснодара
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--gray)" }}>
            Выезжаем в любой район города — без доплат
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {districts.map((od) => (
              <Link
                key={od.slug}
                to={`/uslugi/${service.slug}/${od.slug}`}
                className="bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  color: "var(--dark)",
                  border: "1px solid var(--border)",
                }}
              >
                <Suspense fallback={<span>📍</span>}>
                  <Icon
                    name="MapPin"
                    size={14}
                    style={{ color: "var(--teal)" }}
                  />
                </Suspense>
                {od.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 🔄 Другие услуги */}
        <div>
          <h2
            className="font-oswald font-bold text-2xl mb-6"
            style={{ color: "var(--dark)" }}
          >
            Другие услуги
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/uslugi/${s.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
                <div className="p-4">
                  <p
                    className="font-oswald font-semibold"
                    style={{ color: "var(--dark)" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--teal)" }}
                  >
                    Подробнее{" "}
                    <Suspense fallback={<span>→</span>}>
                      <Icon name="ArrowRight" size={12} />
                    </Suspense>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* 🦶 Футер */}
      <footer
        className="border-t bg-white mt-12"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
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
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
