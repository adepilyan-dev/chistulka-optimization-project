import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import { REVIEWS } from "@/components/index/IndexShared";

const PHONE = "+79189682882";
const PHONE_DISPLAY = "8 918 968-28-82";
const FORM_URL = "https://functions.poehali.dev/e0c4663b-8df6-4eed-958d-8a57089eb58a";

const ALL_REVIEWS = [
  ...REVIEWS,
  {
    name: "Ольга Семёнова",
    role: "Хозяйка дома",
    text: "Заказала химчистку углового дивана — огромный, думала не справятся. Справились отлично, даже старые пятна убрали. Буду заказывать каждый год.",
    rating: 5,
    avatar: "ОС",
    service: "Химчистка диванов",
  },
  {
    name: "Игорь Баранов",
    role: "Владелец кафе",
    text: "Чистили диваны в зале — 8 штук. Приехали вдвоём, управились за 4 часа. Утром открылись как обычно. Очень доволен.",
    rating: 5,
    avatar: "ИБ",
    service: "Химчистка диванов",
  },
  {
    name: "Татьяна Лебедева",
    role: "Молодая мама",
    text: "Детский матрас пришлось чистить после болезни. Мастер приехал на следующий день, объяснил что и как. Теперь матрас как новый и без запаха.",
    rating: 5,
    avatar: "ТЛ",
    service: "Химчистка матрасов",
  },
  {
    name: "Сергей Громов",
    role: "Владелец автомобиля",
    text: "Чистили кожаный салон Кia Sorento. Пятна от кофе, потёртости — убрали всё. Мастер аккуратный, инструменты профессиональные.",
    rating: 5,
    avatar: "СГ",
    service: "Химчистка автосалона",
  },
  {
    name: "Наталья Фролова",
    role: "Дизайнер интерьеров",
    text: "Рекомендую своим клиентам после ремонта — строительная пыль везде. Результат всегда хороший, работают аккуратно и без запаха.",
    rating: 5,
    avatar: "НФ",
    service: "Химчистка кресел",
  },
  {
    name: "Виктор Павлов",
    role: "Пенсионер",
    text: "Ковёр советский, шерстяной. Думал, уже не отмоют. Мастер предупредил честно что получится — и сделал именно так. Запах ушёл, цвет посвежел.",
    rating: 5,
    avatar: "ВП",
    service: "Химчистка ковров",
  },
  {
    name: "Ксения Иванова",
    role: "Владелица квартиры",
    text: "Заехали в новую квартиру, купили б/у диван. После химчистки он стал нашим — без запахов прежних хозяев. Спасибо!",
    rating: 5,
    avatar: "КИ",
    service: "Химчистка диванов",
  },
  {
    name: "Александр Мельник",
    role: "Руководитель",
    text: "Офис 200 кв.м., 30 офисных кресел. Ребята пришли в выходной, к понедельнику всё было готово. Цена адекватная для такого объёма.",
    rating: 5,
    avatar: "АМ",
    service: "Химчистка кресел",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Аренда Чистоты",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.98",
    reviewCount: "1240",
    bestRating: "5",
  },
  review: ALL_REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={14}
          style={{ color: i < rating ? "#f5b300" : "#e5e7eb", fill: i < rating ? "#f5b300" : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}

import { useState } from "react";

export default function Reviews() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !consent) return;
    setLoading(true);
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) setSent(true);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title="Отзывы о химчистке мебели в Краснодаре | Аренда Чистоты"
        description="Реальные отзывы клиентов о химчистке диванов, кресел, матрасов и ковров в Краснодаре. Рейтинг 4.98 из 5 по 1240 отзывам. ☎ 8 918 968-28-82"
        path="/otzyvy"
        keywords="отзывы химчистка мебели краснодар, отзывы аренда чистоты, химчистка диванов отзывы краснодар, отзывы клиентов химчистка мебели"
        jsonLd={jsonLd}
        breadcrumbs={[{ label: "Отзывы" }]}
      />

      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
              loading="eager"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--teal)" }}>
              <Icon name="ArrowLeft" size={15} />
              На главную
            </Link>
            <a
              href={`tel:${PHONE}`}
              className="hidden sm:flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full"
              style={{ background: "var(--teal)", color: "white" }}
            >
              <Icon name="Phone" size={14} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1
            className="font-oswald font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)" }}
          >
            Отзывы клиентов
          </h1>
          <p className="text-sm mb-4" style={{ color: "var(--gray)" }}>
            Химчистка мебели в Краснодаре — оцените нас сами
          </p>
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="Star" size={20} style={{ color: "#f5b300", fill: "#f5b300" }} />
              ))}
            </div>
            <span className="font-oswald font-bold text-2xl" style={{ color: "var(--dark)" }}>4.98</span>
            <span className="text-sm" style={{ color: "var(--gray)" }}>из 5 · 1 240 отзывов</span>
          </div>
        </div>

        {/* Сетка отзывов */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {ALL_REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                {"service" in r && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(12,184,160,0.1)", color: "var(--teal)" }}
                  >
                    {r.service}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--gray)" }}>
                «{r.text}»
              </p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#f0f0f0" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "rgba(12,184,160,0.12)", color: "var(--teal)" }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--dark)" }}>{r.name}</p>
                  <p className="text-xs" style={{ color: "var(--gray)" }}>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-8 md:p-12 text-center"
          style={{ background: "var(--teal)" }}
        >
          <h2 className="font-oswald font-bold text-2xl md:text-3xl text-white mb-2">
            Станьте следующим довольным клиентом
          </h2>
          <p className="text-white/80 text-sm mb-8">Выезд в день заявки · Без предоплаты · Сушка 2–4 часа</p>

          {sent ? (
            <div className="bg-white/20 rounded-2xl p-6 max-w-sm mx-auto">
              <p className="text-white font-semibold text-lg">✅ Заявка принята!</p>
              <p className="text-white/80 text-sm mt-1">Перезвоним в течение 15 минут</p>
            </div>
          ) : (
            <div className="max-w-sm mx-auto space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: "none", background: "white", color: "var(--dark)" }}
              />
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: "none", background: "white", color: "var(--dark)" }}
              />
              <button
                onClick={handleSubmit}
                disabled={!name || !phone || !consent || loading}
                className="w-full py-3 rounded-xl font-oswald font-semibold text-base disabled:opacity-50"
                style={{ background: "var(--dark)", color: "white" }}
              >
                {loading ? "Отправляем..." : "Вызвать мастера"}
              </button>
              <label className="flex items-start gap-2 cursor-pointer justify-center">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 shrink-0"
                  style={{ width: 15, height: 15 }}
                />
                <span className="text-xs leading-snug text-white/70">
                  Я даю согласие на обработку{" "}
                  <a href="/privacy" className="underline text-white/90">персональных данных</a>
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Ссылки на услуги */}
        <div className="mt-12">
          <h2 className="font-oswald font-bold text-xl mb-5" style={{ color: "var(--dark)" }}>
            Наши услуги
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Химчистка диванов", href: "/uslugi/himchistka-divanov" },
              { label: "Химчистка кресел", href: "/uslugi/himchistka-kresel" },
              { label: "Химчистка матрасов", href: "/uslugi/himchistka-matrasov" },
              { label: "Химчистка ковров", href: "/uslugi/himchistka-kovrov" },
              { label: "Химчистка стульев", href: "/uslugi/himchistka-stulyev" },
              { label: "Химчистка автосалона", href: "/uslugi/himchistka-avtosalona" },
            ].map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="text-sm font-medium px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                style={{ color: "var(--teal)", border: "1px solid rgba(12,184,160,0.2)" }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}