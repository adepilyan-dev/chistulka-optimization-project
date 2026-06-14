import { lazy, Suspense, useEffect } from "react";
import Seo from "@/components/Seo";
import { Navbar, Hero, Marquee } from "@/components/index/IndexTop";

// Lazy loading для компонентов, которые не видны сразу
const Services = lazy(() =>
  import("@/components/index/IndexTop").then((m) => ({ default: m.Services })),
);
const Calculator = lazy(() =>
  import("@/components/index/IndexTop").then((m) => ({
    default: m.Calculator,
  })),
);
const About = lazy(() =>
  import("@/components/index/IndexMiddle").then((m) => ({ default: m.About })),
);
const HowWeWork = lazy(() =>
  import("@/components/index/IndexMiddle").then((m) => ({
    default: m.HowWeWork,
  })),
);
const TrustRatings = lazy(() =>
  import("@/components/index/IndexMiddle").then((m) => ({
    default: m.TrustRatings,
  })),
);
const Reviews = lazy(() =>
  import("@/components/index/IndexMiddle").then((m) => ({
    default: m.Reviews,
  })),
);
const Gallery = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({
    default: m.Gallery,
  })),
);
const Blog = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({ default: m.Blog })),
);
const Faq = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({ default: m.Faq })),
);
const Zones = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({ default: m.Zones })),
);
const Contacts = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({
    default: m.Contacts,
  })),
);
const Footer = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({ default: m.Footer })),
);
const FloatingActions = lazy(() =>
  import("@/components/index/IndexBottom").then((m) => ({
    default: m.FloatingActions,
  })),
);

// Компонент-скелетон для загрузки
const SectionSkeleton = () => (
  <div className="w-full py-12 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);

// SEO структурированные данные (вынесены для чистоты)
const SEO_LD = [
  {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: "Аренда Чистоты",
    alternateName: "Химчистка мебели Краснодар",
    description:
      "Профессиональная химчистка диванов, кресел, матрасов, ковров и автомобилей в Краснодаре с выездом на дом. Сушка за 2–4 часа, безопасные средства.",
    image:
      "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/1f8a12d2-02a6-452c-a1cb-4fa8f342c646.jpg",
    telephone: "+79189682882",
    url: "https://arenda-chistoty.online/",
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Наличные, банковский перевод",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      addressCountry: "RU",
      addressCountryName: "Россия",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.0355,
      longitude: 38.9753,
    },
    areaServed: {
      "@type": "City",
      name: "Краснодар",
      sameAs: "https://www.wikidata.org/wiki/Q37640",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.98",
      reviewCount: "1240",
      bestRating: "5",
      worstRating: "1",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+79189682882",
      contactType: "customer service",
      areaServed: "RU",
      availableLanguage: "Russian",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "22:00",
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги химчистки",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка диванов в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-divanov",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка кресел в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-kresel",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка матрасов в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-matrasov",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка ковров в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-kovrov",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка автосалона в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-avtosalona",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Химчистка стульев в Краснодаре",
            url: "https://arenda-chistoty.online/uslugi/himchistka-stulev",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько стоит химчистка дивана в Краснодаре?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Химчистка дивана в Краснодаре стоит от 3 500 рублей. Угловой диван — от 5 500 рублей. Точную цену назовёт мастер при осмотре.",
        },
      },
      {
        "@type": "Question",
        name: "Выезжаете ли вы на дом для химчистки мебели?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы работаем с выездом на дом по всему Краснодару. Привозим всё оборудование с собой, ничего готовить не нужно.",
        },
      },
      {
        "@type": "Question",
        name: "Сколько сохнет мебель после химчистки?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мебель высыхает за 2–4 часа. Мы используем профессиональные воздуходувки для ускорения сушки.",
        },
      },
      {
        "@type": "Question",
        name: "Безопасна ли химчистка для детей и животных?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы используем гипоаллергенные профессиональные средства, безопасные для детей, аллергиков и домашних животных.",
        },
      },
      {
        "@type": "Question",
        name: "Как вызвать мастера по химчистке в Краснодаре?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Позвоните по номеру 8 918 968-28-82 или оставьте заявку на сайте. Работаем ежедневно с 9:00 до 22:00.",
        },
      },
    ],
  },
];

// Компонент обёртки для lazy загрузки
const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionSkeleton />}>{children}</Suspense>
);

export default function Index() {
  // Предзагрузка критических компонентов после загрузки страницы
  useEffect(() => {
    // Предзагружаем следующие секции через секунду после загрузки
    const timer = setTimeout(() => {
      const modules = [
        import("@/components/index/IndexMiddle"),
        import("@/components/index/IndexBottom"),
      ];
      Promise.all(modules).catch(console.error);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Отправка в аналитику
  useEffect(() => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(109765159, "hit", window.location.href);
    }
  }, []);

  return (
    <div className="min-h-screen bg-light-bg">
      <Seo
        title="Химчистка мебели в Краснодаре с выездом | Аренда Чистоты"
        description="★4.98/5 (1240 отзывов) Химчистка диванов, кресел, матрасов и ковров в Краснодаре. Выезд на дом, сушка 2–4 часа, безопасные средства. ☎ 8 918 968-28-82"
        keywords="химчистка мебели, химчистка мебели краснодар, химчистка мягкой мебели, химчистка мягкой мебели краснодар, химчистка мебели на дому, химчистка мебели на дому краснодар, химчистка мягкой мебели на дому, химчистка мебели цена, химчистка мебели на дому цена, химчистка мебели краснодар на дому цена, химчистка мягкой мебели краснодар цена, стоимость химчистки мебели, сколько стоит химчистка мебели, услуги химчистки мебели, услуги химчистки мягкой мебели, профессиональная химчистка мебели, профессиональная химчистка мягкой мебели, лучшая химчистка мебели, химчистка мебели с выездом, выездная химчистка мебели, выездная химчистка мягкой мебели, химчистка мебели и ковров, химчистка ковров мягкой мебели, химчистка мягкой мебели с выездом на дом, сухая химчистка мебели, влажная химчистка мебели, химчистка тканевой мебели, химчистка обивки мебели, химчистка обивки мягкой мебели, химчистка кожаной мебели, химчистка домашней мебели, химчистка мебели диванов, химчистка дивана чистка мебели, химчистка мебели матрасов, заказать химчистку мебели, химчистка мебели недорого, химчистка мягкой мебели недорого, химчистка мебели на дому недорого, клининг химчистка мебели, химчистка мебели авто, химчистка мебели автомобиля, химчистка салона автомобиля мебели, химчистка мебели пятен, химчистка мебели от запахов, химчистка мебели моча, аренда чистоты краснодар"
        path="/"
        jsonLd={SEO_LD}
      />

      {/* Критические компоненты (загружаются сразу) */}
      <Navbar />
      <Hero />
      <Marquee />

      {/* Остальные компоненты с lazy loading */}
      <LazySection>
        <Services />
      </LazySection>
      <LazySection>
        <Calculator />
      </LazySection>
      <LazySection>
        <About />
      </LazySection>
      <LazySection>
        <HowWeWork />
      </LazySection>
      <LazySection>
        <TrustRatings />
      </LazySection>
      <LazySection>
        <Reviews />
      </LazySection>
      <LazySection>
        <Gallery />
      </LazySection>
      <LazySection>
        <Blog />
      </LazySection>
      <LazySection>
        <Faq />
      </LazySection>
      <LazySection>
        <Zones />
      </LazySection>
      <LazySection>
        <Contacts />
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
      <LazySection>
        <FloatingActions />
      </LazySection>
    </div>
  );
}
