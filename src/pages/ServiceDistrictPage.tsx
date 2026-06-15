import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getServiceBySlug, SERVICES_DATA } from "@/data/services";
import { getDistrictBySlug, DISTRICTS } from "@/data/districts";

export default function ServiceDistrictPage() {
  const { slug, district } = useParams();
  const service = getServiceBySlug(slug);
  const d = getDistrictBySlug(district);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, district]);

  if (!service || !d) return <Navigate to="/" replace />;

  const seoTitle = `${service.title} ${d.nameGen} Краснодара — выезд на дом | Аренда Чистоты`;
  const seoDescription = `★4.98 из 5 (1240 отзывов) ${service.title} ${d.nameGen} Краснодара с выездом на дом. ${service.seoDescription.split(".")[1] ?? "Быстро, качественно, без предоплаты."} ☎ 8 918 968-28-82`;
  const keywords = [
    `${service.title.toLowerCase()} ${d.name}`,
    `${service.title.toLowerCase()} ${d.name} краснодар`,
    `${service.title.toLowerCase()} ${d.name} на дому`,
    `${service.title.toLowerCase()} ${d.name} цена`,
    `${service.title.toLowerCase()} ${d.name} недорого`,
    `${service.title.toLowerCase()} ${d.name} выезд`,
    `химчистка мебели ${d.name}`,
    `химчистка мебели ${d.name} краснодар`,
  ].join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} ${d.nameGen}`,
    description: seoDescription,
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
    areaServed: { "@type": "Place", name: `${d.name}, Краснодар` },
    offers: service.prices.map((p) => ({
      "@type": "Offer",
      name: p.label,
      price: p.price,
      priceCurrency: "RUB",
    })),
  };

  const otherServices = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3);
  const otherDistricts = DISTRICTS.filter((x) => x.slug !== d.slug).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        path={`/uslugi/${service.slug}/${d.slug}`}
        image={service.img}
        jsonLd={jsonLd}
        breadcrumbs={[
          { label: "Услуги", href: "/#services" },
          { label: service.title, href: `/uslugi/${service.slug}` },
          { label: d.name },
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
          <Link to={`/uslugi/${service.slug}`} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            {service.title}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        <Breadcrumbs items={[
          { label: "Услуги", href: "/#services" },
          { label: service.title, href: `/uslugi/${service.slug}` },
          { label: d.name },
        ]} />

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="section-tag">Краснодар</span>
              {d.parentDistrict && (
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "#f5f5f5", color: "var(--gray)" }}>
                  {d.parentDistrict}
                </span>
              )}
            </div>
            <h1 className="font-oswald font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--dark)", lineHeight: 1.15 }}>
              {service.title}<br />
              <span style={{ color: "var(--teal)" }}>{d.nameGen}</span>
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--gray)" }}>
              {service.lead} Работаем {d.nameGen} — выезжаем на дом без доплат.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79189682882"
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 font-semibold"
              >
                <Icon name="Phone" size={18} />
                8 918 968-28-82
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
              alt={`${service.title} ${d.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* О районе */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-8 md:mb-12 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,184,160,0.1)" }}>
            <Icon name="MapPin" size={20} style={{ color: "var(--teal)" }} />
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--dark)" }}>Работаем {d.nameGen}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{d.description}</p>
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
            Стоимость {service.title.toLowerCase()} {d.nameGen}
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
            Заказать {service.title.toLowerCase()} {d.nameGen}
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

        {/* Эта услуга в других районах */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            {service.title} в других районах
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {otherDistricts.map((od) => (
              <Link
                key={od.slug}
                to={`/uslugi/${service.slug}/${od.slug}`}
                className="bg-white rounded-2xl p-4 shadow-sm hover-lift flex items-center gap-3 group"
              >
                <Icon name="MapPin" size={16} style={{ color: "var(--teal)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>{od.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Другие услуги */}
        <div>
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Другие услуги {d.nameGen}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/uslugi/${s.slug}/${d.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover-lift group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={`${s.title} ${d.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {s.badge && <span className="absolute top-3 left-3 section-tag text-xs">{s.badge}</span>}
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold" style={{ color: "var(--dark)" }}>{s.title}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--teal)" }}>{d.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}