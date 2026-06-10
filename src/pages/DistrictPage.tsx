import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import { getDistrictBySlug, DISTRICTS } from "@/data/districts";
import { SERVICES_DATA } from "@/data/services";

const HERO_IMG = "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/1f8a12d2-02a6-452c-a1cb-4fa8f342c646.jpg";

const BENEFITS = [
  { icon: "MapPin", title: "Работаем по всему Краснодару", text: "Выезжаем в любой район города — без доплат за выезд" },
  { icon: "Clock", title: "Приедем в день заявки", text: "В большинстве случаев мастер приезжает в день обращения" },
  { icon: "ShieldCheck", title: "Безопасно для семьи", text: "Гипоаллергенная химия — безопасна для детей и животных" },
  { icon: "Banknote", title: "Без предоплаты", text: "Оплата только после выполнения работ, когда убедитесь в результате" },
];

export default function DistrictPage() {
  const { district } = useParams();
  const d = getDistrictBySlug(district);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [district]);

  if (!d) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "var(--light-bg)" }}>
        <Icon name="FileQuestion" size={48} style={{ color: "var(--teal)" }} />
        <h1 className="font-oswald font-bold text-2xl mt-4 mb-2" style={{ color: "var(--dark)" }}>Район не найден</h1>
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold mt-2" style={{ color: "var(--teal)" }}>
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
      </div>
    );
  }

  const seoTitle = `Химчистка мебели ${d.nameGen} Краснодара — выезд на дом | Аренда Чистоты`;
  const seoDescription = `Профессиональная химчистка мягкой мебели, диванов, кресел, матрасов и ковров ${d.nameGen} Краснодара. Выезд на дом, сушка 2–4 часа, безопасные средства. Недорого. ☎ 8 918 968-28-82`;
  const n = d.name;
  const keywords = [
    // Общие
    `химчистка мебели ${n}`, `химчистка мебели ${n} краснодар`,
    `химчистка мягкой мебели ${n}`, `химчистка мягкой мебели ${n} краснодар`,
    `химчистка мебели на дому ${n}`, `химчистка мебели на дому ${n} краснодар`,
    `химчистка мебели ${n} цена`, `химчистка мебели ${n} краснодар цена`,
    `химчистка мебели ${n} недорого`, `выездная химчистка мебели ${n}`,
    `профессиональная химчистка мебели ${n}`, `лучшая химчистка мебели ${n}`,
    `заказать химчистку мебели ${n}`, `химчистка мягкой мебели ${n} на дому`,
    `клининг химчистка мебели ${n}`, `химчистка мебели с выездом ${n}`,
    // Диваны
    `химчистка диванов ${n}`, `химчистка дивана на дому ${n}`,
    `химчистка дивана ${n} краснодар`, `химчистка дивана ${n} цена`,
    `химчистка дивана ${n} недорого`, `чистка дивана ${n}`,
    `химчистка мягкой мебели диванов ${n}`, `химчистка дивана от запаха ${n}`,
    // Кресла
    `химчистка кресел ${n}`, `химчистка кресла на дому ${n}`,
    `химчистка кресла ${n} краснодар`, `чистка кресел ${n}`,
    // Матрасы
    `химчистка матрасов ${n}`, `химчистка матраса на дому ${n}`,
    `химчистка матраса ${n} краснодар`, `чистка матраса от пятен ${n}`,
    `удаление клещей из матраса ${n}`,
    // Ковры
    `химчистка ковров ${n}`, `химчистка ковра на дому ${n}`,
    `химчистка ковра ${n} краснодар`, `чистка ковра ${n}`,
    `химчистка мебели и ковров ${n}`,
    // Авто
    `химчистка автосалона ${n}`, `чистка сидений автомобиля ${n}`,
    `химчистка салона авто ${n} краснодар`,
    // Стулья
    `химчистка стульев ${n}`, `чистка стульев ${n} краснодар`,
  ].join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Аренда Чистоты",
    description: seoDescription,
    telephone: "+79189682882",
    url: `https://arenda-chistoty.ru/himchistka-${d.slug}`,
    areaServed: { "@type": "Place", name: `${d.name}, Краснодар` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
  };

  const otherDistricts = DISTRICTS.filter((x) => x.slug !== d.slug).slice(0, 6);

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        path={`/himchistka-${d.slug}`}
        image={HERO_IMG}
        jsonLd={jsonLd}
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
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
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
              Химчистка мебели<br />
              <span style={{ color: "var(--teal)" }}>{d.nameGen}</span>
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--gray)" }}>
              {d.description} Выезжаем на дом, чистим диваны, кресла, матрасы, ковры и автосалоны. Сушка за 2–4 часа.
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
            <img src={HERO_IMG} alt={`Химчистка мебели ${d.name}`} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Преимущества */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Почему выбирают нас
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
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

        {/* Услуги */}
        <div className="mb-12">
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Что чистим {d.nameGen}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_DATA.map((s) => (
              <Link
                key={s.slug}
                to={`/uslugi/${s.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover-lift group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={`${s.title} ${d.name}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-oswald font-semibold text-sm" style={{ color: "var(--dark)" }}>{s.title}</p>
                  <Icon name="ArrowRight" size={14} style={{ color: "var(--teal)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-8 md:p-10 mb-12 text-center" style={{ background: "var(--teal)" }}>
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl mb-3">
            Вызвать мастера {d.nameGen}
          </h2>
          <p className="text-white/80 text-sm mb-6">Бесплатный выезд и оценка стоимости — без обязательств</p>
          <a
            href="tel:+79189682882"
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3 rounded-full text-base transition-all hover:opacity-90"
            style={{ color: "var(--teal)" }}
          >
            <Icon name="Phone" size={18} />
            8 918 968-28-82
          </a>
        </div>

        {/* Другие районы */}
        <div>
          <h2 className="font-oswald font-bold text-2xl mb-6" style={{ color: "var(--dark)" }}>
            Работаем и в других районах
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherDistricts.map((od) => (
              <Link
                key={od.slug}
                to={`/himchistka-${od.slug}`}
                className="bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2 hover-lift"
                style={{ color: "var(--dark)" }}
              >
                <Icon name="MapPin" size={14} style={{ color: "var(--teal)" }} />
                {od.name}
              </Link>
            ))}
            <Link
              to="/"
              className="bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2 hover-lift"
              style={{ color: "var(--teal)" }}
            >
              <Icon name="Map" size={14} />
              Все районы
            </Link>
          </div>
        </div>

      </main>

      {/* Footer mini */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--gray)" }}>
          <span>© 2024 Аренда Чистоты, Краснодар</span>
          <div className="flex gap-4">
            <Link to="/privacy" style={{ color: "var(--gray)" }} className="hover:underline">Конфиденциальность</Link>
            <a href="tel:+79189682882" style={{ color: "var(--teal)" }} className="font-medium">8 918 968-28-82</a>
          </div>
        </div>
      </footer>
    </div>
  );
}