import { lazy, Suspense, useMemo } from "react";
import Seo from "@/components/Seo";

// ⚡ Компоненты "над сгибом" — загружаем сразу (критические для первого экрана)
import {
  Navbar,
  Hero,
  Marquee,
  Services,
  Calculator,
} from "@/components/index/IndexTop";
import {
  About,
  HowWeWork,
  TrustRatings,
  Reviews,
} from "@/components/index/IndexMiddle";

// 🌀 Компоненты "под сгибом" — загружаем лениво (не влияют на LCP/FCP)
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

// ✅ Исправлен URL сайта
const SITE_URL = "https://arenda-chistoty.ru";

// 🏷️ Микроразметка вынесена в useMemo для предотвращения пересоздания
const SEO_LD = useMemo(
  () => [
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
      url: SITE_URL,
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
              url: `${SITE_URL}/uslugi/himchistka-divanov`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Химчистка кресел в Краснодаре",
              url: `${SITE_URL}/uslugi/himchistka-kresel`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Химчистка матрасов в Краснодаре",
              url: `${SITE_URL}/uslugi/himchistka-matrasov`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Химчистка ковров в Краснодаре",
              url: `${SITE_URL}/uslugi/himchistka-kovrov`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Химчистка автосалона в Краснодаре",
              url: `${SITE_URL}/uslugi/himchistka-avtosalona`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Химчистка стульев в Краснодаре",
              url: `${SITE_URL}/uslugi/himchistka-stulev`,
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
  ],
  [],
);

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* 🔍 SEO */}
      <Seo
        title="Химчистка мебели в Краснодаре с выездом | Аренда Чистоты"
        description="★4.98/5 (1240 отзывов) Химчистка диванов, кресел, матрасов и ковров в Краснодаре. Выезд на дом, сушка 2–4 часа, безопасные средства. ☎ 8 918 968-28-82"
        keywords="химчистка мебели, химчистка мебели краснодар, химчистка мягкой мебели, химчистка мягкой мебели краснодар, химчистка мебели на дому, химчистка мебели на дому краснодар, химчистка мягкой мебели на дому, химчистка мебели цена, химчистка мебели на дому цена, химчистка мебели краснодар на дому цена, химчистка мягкой мебели краснодар цена, стоимость химчистки мебели, сколько стоит химчистка мебели, услуги химчистки мебели, услуги химчистки мягкой мебели, профессиональная химчистка мебели, профессиональная химчистка мягкой мебели, лучшая химчистка мебели, химчистка мебели с выездом, выездная химчистка мебели, выездная химчистка мягкой мебели, химчистка мебели и ковров, химчистка ковров мягкой мебели, химчистка мягкой мебели с выездом на дом, сухая химчистка мебели, влажная химчистка мебели, химчистка тканевой мебели, химчистка обивки мебели, химчистка обивки мягкой мебели, химчистка кожаной мебели, химчистка домашней мебели, химчистка мебели диванов, химчистка дивана чистка мебели, химчистка мебели матрасов, заказать химчистку мебели, химчистка мебели недорого, химчистка мягкой мебели недорого, химчистка мебели на дому недорого, клининг химчистка мебели, химчистка мебели авто, химчистка мебели автомобиля, химчистка салона автомобиля мебели, химчистка мебели пятен, химчистка мебели от запахов, химчистка мебели моча, аренда чистоты краснодар"
        path="/"
        jsonLd={SEO_LD}
        canonical={SITE_URL}
      />

      {/* ⚡ Критические компоненты — загружаются сразу */}
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Calculator />
      <About />
      <HowWeWork />
      <TrustRatings />
      <Reviews />

      {/* 🌀 Ленивая загрузка компонентов "под сгибом" */}
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <Faq />
      </Suspense>
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <Contacts />
      </Suspense>
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingActions />
      </Suspense>
    </div>
  );
}
