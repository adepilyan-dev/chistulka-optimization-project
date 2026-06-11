import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getServiceBySlug, SERVICES_DATA } from "@/data/services";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "var(--light-bg)" }}>
        <Icon name="FileQuestion" size={48} style={{ color: "var(--teal)" }} />
        <h1 className="font-oswald font-bold text-2xl mt-4 mb-2" style={{ color: "var(--dark)" }}>Услуга не найдена</h1>
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold mt-2" style={{ color: "var(--teal)" }}>
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    image: service.img,
    provider: {
      "@type": "LocalBusiness",
      name: "Аренда Чистоты",
      telephone: "+79189682882",
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
      price: p.price,
      priceCurrency: "RUB",
    })),
  };

  const other = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
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
      />

      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/b6cb14ab-4c2a-4c89-a582-9b46d4e0a360.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link to="/#services" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            Все услуги
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-12">

        <Breadcrumbs items={[
          { label: "Услуги", href: "/#services" },
          { label: service.title },
        ]} />

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 items-center">
          <div>
            <span className="section-tag mb-3 inline-block">Услуга</span>
            <h1 className="font-oswald font-bold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)" }}>
              {service.h1}
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--gray)" }}>
              {service.lead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79189682882"
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 font-semibold"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
              <a
                href="/#contacts"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full border transition-all hover:bg-gray-50"
                style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
              >
                Оставить заявку
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Преимущества */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Почему выбирают нас
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-3 sm:gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,184,160,0.1)" }}>
                  <Icon name={b.icon} size={20} style={{ color: "var(--teal)" }} />
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--dark)" }}>{b.title}</p>
                  <p className="text-sm leading-snug" style={{ color: "var(--gray)" }}>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Цены */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Стоимость
          </h2>
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {service.prices.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: i < service.prices.length - 1 ? "1px solid #f0f0f0" : "none" }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>{item.label}</span>
                <span className="font-oswald font-bold text-lg" style={{ color: "var(--teal)" }}>{item.price}</span>
              </div>
            ))}
            <div className="px-6 py-4 text-xs" style={{ background: "rgba(12,184,160,0.05)", color: "var(--gray)" }}>
              Точную стоимость назовёт мастер при осмотре. Выезд и оценка — бесплатно.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {service.faq.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="font-semibold mb-2" style={{ color: "var(--dark)" }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-5 sm:p-8 md:p-10 mb-8 md:mb-12 text-center" style={{ background: "var(--teal)" }}>
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl mb-3">
            Записаться на {service.title.toLowerCase()}
          </h2>
          <p className="text-white/80 text-sm mb-6">Бесплатный выезд мастера и оценка объёма работ</p>
          <a
            href="tel:+79189682882"
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3 rounded-full text-base transition-all hover:opacity-90"
            style={{ color: "var(--teal)" }}
          >
            <Icon name="Phone" size={18} />
            8 918 968-28-82
          </a>
        </div>

        {/* Другие услуги */}
        <div>
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Другие услуги
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {other.map((s) => (
              <Link
                key={s.slug}
                to={`/uslugi/${s.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover-lift group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="font-oswald font-semibold" style={{ color: "var(--dark)" }}>{s.title}</p>
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--teal)" }}>
                    Подробнее <Icon name="ArrowRight" size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Footer mini */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--gray)" }}>
          <span>© 2026 Аренда Чистоты, Краснодар</span>
          <div className="flex gap-4">
            <Link to="/privacy" style={{ color: "var(--gray)" }} className="hover:underline">Конфиденциальность</Link>
            <Link to="/cookie-policy" style={{ color: "var(--gray)" }} className="hover:underline">Cookie</Link>
            <a href="tel:+79189682882" style={{ color: "var(--teal)" }} className="font-medium">8 918 968-28-82</a>
          </div>
        </div>
      </footer>
    </div>
  );
}