// HomePage.jsx — полностью исправленная главная страница
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import { SERVICES_DATA } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import {
  scrollToId,
  useInView,
  NAV_LINKS,
  SERVICES,
  STATS,
  FURNITURE_ITEMS,
  EXTRA_OPTIONS,
} from "@/components/index/IndexShared";

// ============================================================
// 1. НАВИГАЦИЯ
// ============================================================
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
      role="navigation"
      aria-label="Главное меню"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Логотип — ссылка на главную */}
        <Link
          to="/"
          className="flex items-center"
          aria-label="Аренда Чистоты — на главную"
        >
          <img
            src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
            alt="Аренда Чистоты — химчистка мебели в Краснодаре"
            className="h-10 w-auto object-contain"
            width="120"
            height="40"
          />
        </Link>

        {/* Десктопное меню */}
        <div className="hidden lg:flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="#services"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--teal)]"
              style={{ color: "var(--dark)" }}
            >
              Услуги
              <Icon
                name="ChevronDown"
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </a>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2 z-50">
                <div
                  className="bg-white rounded-2xl shadow-xl border py-2 min-w-[220px]"
                  style={{ borderColor: "rgba(12,184,160,0.15)" }}
                >
                  {SERVICES_DATA.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/uslugi/${s.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                      style={{ color: "var(--dark)" }}
                    >
                      <Icon
                        name={s.icon}
                        size={16}
                        style={{ color: "var(--teal)" }}
                      />
                      {s.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Услуги").map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[var(--teal)]"
              style={{
                color: "var(--dark)",
                fontFamily: "'Golos Text', sans-serif",
              }}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/nashi-raboty"
            className="text-sm font-medium transition-colors hover:text-[var(--teal)]"
            style={{
              color: "var(--dark)",
              fontFamily: "'Golos Text', sans-serif",
            }}
          >
            Наши работы
          </Link>
          <Link
            to="/landing"
            className="text-sm font-semibold px-3 py-1 rounded-full animate-pulse"
            style={{
              background: "rgba(255,226,39,0.2)",
              color: "#a07c00",
              border: "1px solid #ffe227",
            }}
          >
            🎁 Акция −10%
          </Link>
        </div>

        {/* Контакты */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+79189682882"
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--teal)" }}
          >
            <Icon name="Phone" size={16} />8 918 968-28-82
          </a>
          <button
            onClick={() => scrollToId("contacts")}
            className="btn-primary px-5 py-2 text-sm"
            aria-label="Вызвать мастера"
          >
            Вызвать мастера
          </button>
        </div>

        {/* Мобильное меню */}
        <button
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--dark)" }}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Мобильное меню (выпадающее) */}
      {open && (
        <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-1 animate-fade-in">
          <a
            href="#services"
            className="py-2 font-medium text-sm"
            style={{ color: "var(--dark)" }}
            onClick={() => setOpen(false)}
          >
            Услуги
          </a>
          <div className="pl-3 flex flex-col gap-1 pb-1">
            {SERVICES_DATA.map((s) => (
              <Link
                key={s.slug}
                to={`/uslugi/${s.slug}`}
                className="py-1.5 text-sm flex items-center gap-2"
                style={{ color: "var(--teal)" }}
                onClick={() => setOpen(false)}
              >
                <Icon name={s.icon} size={14} />
                {s.shortTitle}
              </Link>
            ))}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Услуги").map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 font-medium text-sm"
              style={{ color: "var(--dark)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/nashi-raboty"
            className="py-2 font-medium text-sm"
            style={{ color: "var(--dark)" }}
            onClick={() => setOpen(false)}
          >
            Наши работы
          </Link>
          <Link
            to="/landing"
            className="py-2 font-semibold text-sm"
            style={{ color: "#a07c00" }}
            onClick={() => setOpen(false)}
          >
            🎁 Акция −10%
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              scrollToId("contacts");
            }}
            className="btn-primary px-5 py-2.5 mt-2 text-sm"
          >
            Вызвать мастера
          </button>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// 2. БЕГУЩАЯ СТРОКА
// ============================================================
export function Marquee() {
  const items = [
    "Химчистка диванов",
    "Химчистка кресел",
    "Химчистка матрасов",
    "Чистка ковров",
    "Автохимчистка",
    "Удаление пятен",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4" style={{ background: "var(--teal)" }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-oswald font-medium text-white text-sm uppercase tracking-widest"
          >
            <Icon
              name="Star"
              size={13}
              className="text-yellow-300 flex-shrink-0"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 3. ГЕРОЙ (ШАПКА)
// ============================================================
export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      id="home"
      aria-labelledby="hero-title"
    >
      {/* Декоративные элементы */}
      <div
        className="absolute top-24 right-12 w-80 h-80 rounded-full opacity-25 animate-float pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--teal), transparent)",
        }}
      />
      <div
        className="absolute bottom-24 left-8 w-52 h-52 rounded-full opacity-20 animate-float pointer-events-none"
        style={{
          animationDelay: "2s",
          background: "radial-gradient(circle, #ffe227, transparent)",
        }}
      />
      <div className="absolute top-36 right-24 hidden xl:block animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-28 h-28" aria-hidden="true">
          <defs>
            <path
              id="circle-path"
              d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
            />
          </defs>
          <text
            fontSize="11"
            fontFamily="Golos Text"
            fill="var(--teal)"
            letterSpacing="3"
          >
            <textPath href="#circle-path">
              КЛИНИНГ • ПРОФЕССИОНАЛЬНО • БЫСТРО •
            </textPath>
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка — текст */}
          <div className="space-y-7">
            <div className="animate-fade-up stagger-1">
              <span className="section-tag">
                Аренда Чистоты — химчистка мебели
              </span>
            </div>

            <h1
              id="hero-title"
              className="font-oswald font-bold animate-fade-up stagger-2"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--dark)",
                lineHeight: 1.1,
              }}
            >
              Химчистка мебели{" "}
              <span className="relative inline-block">
                <span style={{ color: "var(--teal)" }}>в Краснодаре</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9 Q50 2 100 8 Q150 14 198 6"
                    stroke="#ffe227"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              с выездом на дом
            </h1>

            {/* ✅ Блок с описанием компании (исправлено) */}
            <blockquote
              className="text-lg animate-fade-up stagger-3"
              style={{ color: "var(--gray)", maxWidth: 480 }}
            >
              Профессиональная химчистка диванов, кресел, матрасов и ковров в
              Краснодаре. Выезд на дом, безопасные средства для детей и
              животных, сушка за 2–4 часа. Работаем по всему городу:
              Центральный, Прикубанский, Карасунский и Западный округа.
              <footer
                className="mt-2 text-sm font-semibold"
                style={{ color: "var(--teal)" }}
              >
                — Гарантия качества от «Аренды Чистоты»
              </footer>
            </blockquote>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <button
                onClick={() => scrollToId("contacts")}
                className="btn-primary px-8 py-3.5 text-base font-oswald flex items-center gap-2"
                aria-label="Вызвать мастера"
              >
                <Icon name="Calendar" size={18} />
                Вызвать мастера
              </button>
              <button
                onClick={() => scrollToId("prices")}
                className="btn-outline px-8 py-3.5 text-base font-oswald flex items-center gap-2"
                aria-label="Рассчитать цену"
              >
                <Icon name="Calculator" size={18} />
                Рассчитать цену
              </button>
            </div>

            {/* Преимущества */}
            <div className="flex flex-wrap gap-5 pt-2 animate-fade-up stagger-5">
              {["Гарантия 100%", "Без предоплаты", "Безопасно для детей"].map(
                (t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--gray)" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "var(--teal)" }}
                    >
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    {t}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Правая колонка — изображение */}
          <div className="relative animate-scale-in stagger-3">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/ce53b60a-fcdf-4aa5-951f-6fff06f91683.jpg"
                alt="Химчистка кресла — до и после | Аренда Чистоты Краснодар"
                className="w-full h-full object-cover"
                width="800"
                height="600"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(12,184,160,0.12) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Бейдж с рейтингом */}
            <div
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "var(--teal-light)" }}
              >
                ⭐
              </div>
              <div>
                <div
                  className="font-oswald font-bold text-lg"
                  style={{ color: "var(--dark)" }}
                >
                  4.98 / 5.0
                </div>
                <div className="text-xs" style={{ color: "var(--gray)" }}>
                  1 240 отзывов
                </div>
              </div>
            </div>

            {/* Бейдж "Уже сегодня" */}
            <div
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-3 py-2 sm:px-4 sm:py-3 animate-float"
              style={{ animationDelay: "2.5s" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#ffe227" }}
                >
                  <Icon name="Zap" size={16} style={{ color: "var(--dark)" }} />
                </div>
                <div>
                  <div
                    className="font-oswald font-bold text-sm"
                    style={{ color: "var(--dark)" }}
                  >
                    Уже сегодня
                  </div>
                  <div className="text-xs" style={{ color: "var(--gray)" }}>
                    Свободные слоты
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up stagger-6">
          {STATS.map((s) => (
            <div
              key={s.num}
              className="text-center p-4 rounded-2xl"
              style={{
                background: "rgba(12,184,160,0.07)",
                border: "1px solid rgba(12,184,160,0.12)",
              }}
            >
              <div
                className="font-oswald font-bold text-2xl md:text-3xl"
                style={{ color: "var(--teal)" }}
              >
                {s.num}
              </div>
              <div className="text-sm mt-1" style={{ color: "var(--gray)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4. УСЛУГИ
// ============================================================
export function Services() {
  const { ref, inView } = useInView();
  return (
    <section
      id="services"
      className="py-20"
      style={{ background: "var(--light-bg)" }}
      aria-labelledby="services-title"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}
          >
            Наши услуги
          </span>
          <h2
            id="services-title"
            className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}
          >
            Химчистка любой мебели с выездом
          </h2>
          <p
            className={`mt-3 text-base max-w-xl mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}
            style={{ color: "var(--gray)" }}
          >
            Работаем с диванами, креслами, матрасами, коврами и автомобилями
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const sd = SERVICES_DATA.find((d) => d.title === s.title);
            return (
              <div
                key={s.title}
                className={`card-clean relative overflow-hidden group flex flex-col ${inView ? `animate-fade-up stagger-${Math.min(i + 1, 6)}` : "opacity-0"}`}
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={s.img}
                    alt={`${s.title} в Краснодаре — выездная химчистка`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  {s.badge && (
                    <span
                      className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background:
                          s.color === "#c9a800" ? "#ffe227" : "var(--teal)",
                        color: s.color === "#c9a800" ? "var(--dark)" : "white",
                      }}
                    >
                      {s.badge}
                    </span>
                  )}
                  <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center shadow-md bg-white">
                    <Icon name={s.icon} size={22} style={{ color: s.color }} />
                  </div>
                </div>
                <div className="p-6 pt-7 flex flex-col flex-1">
                  <h3
                    className="font-oswald font-bold text-lg mb-2"
                    style={{ color: "var(--dark)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--gray)" }}
                  >
                    {s.desc}
                  </p>
                  {sd ? (
                    <>
                      <Link
                        to={`/uslugi/${sd.slug}`}
                        className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3"
                        style={{ color: "var(--teal)" }}
                      >
                        Подробнее <Icon name="ArrowRight" size={15} />
                      </Link>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {DISTRICTS.slice(0, 3).map((d) => (
                          <Link
                            key={d.slug}
                            to={`/uslugi/${sd.slug}/${d.slug}`}
                            className="text-xs px-2.5 py-1 rounded-full border transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]"
                            style={{
                              borderColor: "var(--border)",
                              color: "var(--gray)",
                            }}
                          >
                            {d.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => scrollToId("contacts")}
                      className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3"
                      style={{ color: "var(--teal)" }}
                    >
                      Подробнее <Icon name="ArrowRight" size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 5. КАЛЬКУЛЯТОР ЦЕН
// ============================================================
export function Calculator() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [extras, setExtras] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const toggleExtra = (key: string) =>
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key],
    );

  const changeCount = (id: string, delta: number) =>
    setCounts((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });

  const itemsTotal = FURNITURE_ITEMS.reduce(
    (sum, item) => sum + (counts[item.id] || 0) * item.price,
    0,
  );
  const extrasTotal = extras.reduce((sum, e) => {
    const opt = EXTRA_OPTIONS.find((o) => o.key === e);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const total = itemsTotal + extrasTotal;
  const hasItems = Object.values(counts).some((c) => c > 0);

  const selectedSummary = FURNITURE_ITEMS.filter((f) => counts[f.id])
    .map((f) => `${f.emoji} ${f.label} × ${counts[f.id]}`)
    .join(", ");

  return (
    <section
      id="prices"
      className="py-20 relative overflow-hidden dark-mesh-bg"
      aria-labelledby="calculator-title"
    >
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span
            className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}
            style={{ background: "rgba(12,184,160,0.2)", color: "#6ee7db" }}
          >
            Калькулятор цен
          </span>
          <h2
            id="calculator-title"
            className={`font-oswald font-bold mt-4 text-white ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Рассчитайте стоимость за 30 секунд
          </h2>
          <p
            className={`mt-3 max-w-md mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}
          >
            Без скрытых платежей — цена окончательная
          </p>
        </div>

        <div
          className={`bg-white rounded-3xl p-6 md:p-10 shadow-2xl ${inView ? "animate-scale-in stagger-3" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Левая колонка — выбор мебели */}
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "var(--dark)" }}
                >
                  Выберите мебель
                </label>
                <div className="space-y-2">
                  {FURNITURE_ITEMS.map((item) => {
                    const count = counts[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2 px-3 rounded-xl transition-all"
                        style={{
                          background:
                            count > 0 ? "var(--teal-light)" : "#f9fafb",
                          border:
                            count > 0
                              ? "1.5px solid var(--teal)"
                              : "1.5px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg" aria-hidden="true">
                            {item.emoji}
                          </span>
                          <div className="min-w-0">
                            <div
                              className="text-sm font-medium truncate"
                              style={{ color: "var(--dark)" }}
                            >
                              {item.label}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "var(--gray)" }}
                            >
                              {item.price.toLocaleString("ru")} ₽
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => changeCount(item.id, -1)}
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all"
                            style={{
                              background: count > 0 ? "var(--teal)" : "#e5e7eb",
                              color: count > 0 ? "white" : "#9ca3af",
                            }}
                            aria-label={`Уменьшить количество ${item.label}`}
                          >
                            −
                          </button>
                          <span
                            className="w-5 text-center text-sm font-semibold"
                            style={{ color: "var(--dark)" }}
                          >
                            {count}
                          </span>
                          <button
                            onClick={() => changeCount(item.id, 1)}
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all"
                            style={{
                              background: "var(--teal)",
                              color: "white",
                            }}
                            aria-label={`Увеличить количество ${item.label}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "var(--dark)" }}
                >
                  Доп. услуги
                </label>
                <div className="space-y-2">
                  {EXTRA_OPTIONS.map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleExtra(opt.key)}
                    >
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0"
                        style={{
                          background: extras.includes(opt.key)
                            ? "var(--teal)"
                            : "transparent",
                          borderColor: extras.includes(opt.key)
                            ? "var(--teal)"
                            : "#d1d5db",
                        }}
                      >
                        {extras.includes(opt.key) && (
                          <Icon name="Check" size={12} className="text-white" />
                        )}
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: "var(--dark)" }}
                      >
                        {opt.label}
                      </span>
                      <span
                        className="ml-auto text-xs font-semibold"
                        style={{ color: "var(--teal)" }}
                      >
                        +{opt.price.toLocaleString("ru")} ₽
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка — итог */}
            <div className="flex flex-col justify-between gap-4">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--light-bg)",
                  border: "1px solid rgba(12,184,160,0.15)",
                }}
              >
                {hasItems ? (
                  <>
                    <div
                      className="text-xs mb-3 leading-relaxed"
                      style={{ color: "var(--gray)" }}
                    >
                      {selectedSummary}
                    </div>
                    <div className="border-t pt-3 space-y-1">
                      <div
                        className="flex justify-between text-sm"
                        style={{ color: "var(--gray)" }}
                      >
                        <span>Мебель</span>
                        <span>{itemsTotal.toLocaleString("ru")} ₽</span>
                      </div>
                      {extrasTotal > 0 && (
                        <div
                          className="flex justify-between text-sm"
                          style={{ color: "var(--gray)" }}
                        >
                          <span>Доп. услуги</span>
                          <span>+{extrasTotal.toLocaleString("ru")} ₽</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    className="text-sm text-center py-4"
                    style={{ color: "var(--gray)" }}
                  >
                    Выберите мебель слева, чтобы рассчитать стоимость
                  </div>
                )}
                <div className="border-t mt-4 pt-4 text-center">
                  <div
                    className="text-sm mb-1"
                    style={{ color: "var(--gray)" }}
                  >
                    Итого:
                  </div>
                  <div
                    className="font-oswald font-bold"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 2.8rem)",
                      color: hasItems ? "var(--teal)" : "#d1d5db",
                      lineHeight: 1,
                    }}
                  >
                    {total > 0 ? `${total.toLocaleString("ru")} ₽` : "0 ₽"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToId("contacts")}
                className="w-full btn-primary py-3.5 font-oswald font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-40"
                disabled={!hasItems}
              >
                <Icon name="Calendar" size={18} />
                {hasItems
                  ? `Заказать за ${total.toLocaleString("ru")} ₽`
                  : "Выберите мебель"}
              </button>
              <button
                onClick={() => scrollToId("contacts")}
                className="w-full py-3 rounded-full text-sm font-semibold transition-all hover:bg-gray-50"
                style={{ color: "var(--gray)", border: "1px solid #e5e7eb" }}
              >
                Обсудить условия
              </button>
              <div
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "#fffbe0" }}
              >
                <Icon name="Info" size={15} style={{ color: "#c9a800" }} />
                <span className="text-xs" style={{ color: "#7a6200" }}>
                  Скидка 10% на первый заказ!
                </span>
              </div>
              <p
                className="text-xs text-center"
                style={{ color: "var(--gray)" }}
              >
                * Цены справочные. Точную стоимость назовёт мастер при осмотре —
                бесплатно.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 6. ГЛАВНАЯ СТРАНИЦА (СБОРКА)
// ============================================================
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Химчистка мебели в Краснодаре — Аренда Чистоты</title>
        <meta
          name="description"
          content="Профессиональная химчистка диванов, кресел, матрасов и ковров в Краснодаре с выездом на дом. Безопасно для детей и животных. Гарантия качества. Закажите сегодня!"
        />
        <meta
          name="keywords"
          content="химчистка мебели Краснодар, химчистка диванов, выездная химчистка, чистка мебели на дому"
        />
        <link rel="canonical" href="https://arenda-chistoty.ru/" />
      </Helmet>

      <main>
        <Navbar />
        <Hero />
        <Marquee />
        <Services />
        <Calculator />
        {/* Добавьте сюда остальные секции: Отзывы, Контакты, Футер */}
      </main>
    </>
  );
}
