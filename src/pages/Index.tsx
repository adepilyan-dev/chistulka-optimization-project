import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES_DATA } from "@/data/services";
import { DISTRICTS } from "@/data/districts";

// ============ УТИЛИТЫ ============

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ============ ДАННЫЕ ============

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Sofa",
    title: "Химчистка диванов",
    desc: "Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа — работаем с любым материалом.",
    color: "#0cb8a0",
    badge: "Хит",
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/c2718891-9bd7-4f8a-ac92-acfc09feef9e.png",
  },
  {
    icon: "ArmchairIcon",
    title: "Химчистка кресел",
    desc: "Офисные, обеденные, игровые кресла. Глубокая чистка без разборки, сушка за 2–4 часа.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/f6c66867-ed54-4baa-a3b0-e449639855ab.png",
  },
  {
    icon: "BedDouble",
    title: "Химчистка матрасов",
    desc: "Устраняем клещей, грибок, пятна и неприятные запахи. Безопасно для детей и аллергиков.",
    color: "#0cb8a0",
    badge: "Популярно",
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/62526030-2235-4d63-b775-59db14eb60d6.png",
  },
  {
    icon: "LayoutGrid",
    title: "Химчистка ковров",
    desc: "Шерсть, синтетика, ковры ручной работы. Выездная чистка на дому или в нашем цеху.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/162a3567-348a-4939-9f38-e0bb5fd2ad1c.png",
  },
  {
    icon: "Armchair",
    title: "Химчистка стульев",
    desc: "Обеденные группы, барные стулья, пуфики. Быстро — один стул от 15 минут.",
    color: "#0cb8a0",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/29030555-9276-4331-9b6c-2191a008deca.jpg",
  },
  {
    icon: "Car",
    title: "Химчистка автосалона",
    desc: "Сиденья, потолок, дверные панели. Профессиональное оборудование и безопасные средства.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/08d35f06-6ecd-4c21-a709-42f23a1e4951.jpg",
  },
];

const STATS = [
  { num: "3 000+", label: "предметов мебели" },
  { num: "10 лет", label: "на рынке" },
  { num: "99%", label: "пятен выводим" },
  { num: "2–4 ч", label: "время высыхания" },
];

const REVIEWS = [
  {
    name: "Елена Морозова",
    role: "Владелица квартиры",
    text: "Диван-то думала уже не спасти — кот поработал знатно. После химчистки как новый! Запах ушёл полностью.",
    rating: 5,
    avatar: "ЕМ",
  },
  {
    name: "Дмитрий Козлов",
    role: "Руководитель офиса",
    text: "Заказывали химчистку всех кресел в переговорной. Приехали быстро, сделали аккуратно, к утру всё высохло.",
    rating: 5,
    avatar: "ДК",
  },
  {
    name: "Анастасия Петрова",
    role: "Молодая мама",
    text: "Матрас для ребёнка — важно, чтобы без химии. Ребята объяснили всё про состав, сделали безопасно. Рекомендую!",
    rating: 5,
    avatar: "АП",
  },
  {
    name: "Михаил Волков",
    role: "Владелец автомобиля",
    text: "Чистили сиденья в BMW — результат на уровне автодилера. Цена в два раза ниже, а качество такое же.",
    rating: 5,
    avatar: "МВ",
  },
];

const GALLERY_ITEMS = [
  { label: "Химчистка дивана", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/c2718891-9bd7-4f8a-ac92-acfc09feef9e.png", ratio: "1/1" },
  { label: "Химчистка кресла", tag: "Кресло", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/0afd214c-0c7a-4540-91db-7c0d68e4e0b7.png", ratio: "1/1" },
  { label: "Химчистка матраса", tag: "Матрас", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/62526030-2235-4d63-b775-59db14eb60d6.png", ratio: "1/1" },
  { label: "Химчистка ковра", tag: "Ковёр", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/162a3567-348a-4939-9f38-e0bb5fd2ad1c.png", ratio: "4/3" },
  { label: "Химчистка кресла (классика)", tag: "Кресло", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/f6c66867-ed54-4baa-a3b0-e449639855ab.png", ratio: "1/1" },
  { label: "Химчистка дивана (бархат)", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/c2718891-9bd7-4f8a-ac92-acfc09feef9e.png", ratio: "4/3" },
];

const FURNITURE_ITEMS = [
  { id: "sofa_2", label: "Диван 2-местный", emoji: "🛋️", price: 3500 },
  { id: "sofa_3", label: "Диван 3-местный", emoji: "🛋️", price: 4500 },
  { id: "sofa_corner", label: "Угловой диван", emoji: "🛋️", price: 5500 },
  { id: "chair", label: "Кресло", emoji: "🪑", price: 2500 },
  { id: "mattress_s", label: "Матрас 1-спальный", emoji: "🛏️", price: 3000 },
  { id: "mattress_d", label: "Матрас 2-спальный", emoji: "🛏️", price: 3800 },
  { id: "carpet_s", label: "Ковёр до 6 м²", emoji: "🏡", price: 2800 },
  { id: "carpet_l", label: "Ковёр от 6 м²", emoji: "🏡", price: 3800 },
  { id: "car_seat", label: "Авто (салон)", emoji: "🚗", price: 4500 },
  { id: "dining_chair", label: "Стул обеденный", emoji: "🪑", price: 600 },
];

const EXTRA_OPTIONS = [
  { key: "express", label: "Экспресс-сушка (1–2 ч)", price: 800 },
  { key: "deodorant", label: "Устранение запахов", price: 500 },
  { key: "nano", label: "Нано-защита ткани", price: 700 },
  { key: "disinfect", label: "Дезинфекция", price: 400 },
];

// ============ ХУКИ ============

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ============ КОМПОНЕНТЫ ============

function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/b6cb14ab-4c2a-4c89-a582-9b46d4e0a360.jpg"
            alt="Аренда Чистоты"
            className="h-10 w-auto object-contain"
          />
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {/* Услуги */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <a href="#services" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--teal)]" style={{ color: "var(--dark)" }}>
              Услуги
              <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </a>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2 z-50">
                <div className="bg-white rounded-2xl shadow-xl border py-2 min-w-[220px]" style={{ borderColor: "rgba(12,184,160,0.15)" }}>
                  {SERVICES_DATA.map((s) => (
                    <Link key={s.slug} to={`/uslugi/${s.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                      style={{ color: "var(--dark)" }} onClick={() => setServicesOpen(false)}>
                      <Icon name={s.icon} size={16} style={{ color: "var(--teal)" }} />
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Услуги").map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:text-[var(--teal)]" style={{ color: "var(--dark)", fontFamily: "'Golos Text', sans-serif" }}>
              {l.label}
            </a>
          ))}
          <Link to="/nashi-raboty" className="text-sm font-medium transition-colors hover:text-[var(--teal)]" style={{ color: "var(--dark)", fontFamily: "'Golos Text', sans-serif" }}>
            Наши работы
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+79189682882" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="Phone" size={16} />
            8 918 968-28-82
          </a>
          <button onClick={() => scrollToId("contacts")} className="btn-primary px-5 py-2 text-sm">Вызвать мастера</button>
        </div>
        <button className="lg:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} style={{ color: "var(--dark)" }}>
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {/* Услуги моб */}
          <a href="#services" className="py-2 font-medium text-sm" style={{ color: "var(--dark)" }} onClick={() => setOpen(false)}>Услуги</a>
          <div className="pl-3 flex flex-col gap-1 pb-1">
            {SERVICES_DATA.map((s) => (
              <Link key={s.slug} to={`/uslugi/${s.slug}`}
                className="py-1.5 text-sm flex items-center gap-2"
                style={{ color: "var(--teal)" }} onClick={() => setOpen(false)}>
                <Icon name={s.icon} size={14} />
                {s.shortTitle}
              </Link>
            ))}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Услуги").map((l) => (
            <a key={l.href} href={l.href} className="py-2 font-medium text-sm" style={{ color: "var(--dark)" }} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Link to="/nashi-raboty" className="py-2 font-medium text-sm" style={{ color: "var(--dark)" }} onClick={() => setOpen(false)}>Наши работы</Link>
          <button onClick={() => { setOpen(false); scrollToId("contacts"); }} className="btn-primary px-5 py-2.5 mt-2 text-sm">Вызвать мастера</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg" id="home">
      <div className="absolute top-24 right-12 w-80 h-80 rounded-full opacity-25 animate-float pointer-events-none" style={{ background: "radial-gradient(circle, var(--teal), transparent)" }} />
      <div className="absolute bottom-24 left-8 w-52 h-52 rounded-full opacity-20 animate-float pointer-events-none" style={{ animationDelay: "2s", background: "radial-gradient(circle, #ffe227, transparent)" }} />
      <div className="absolute top-36 right-24 hidden xl:block animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-28 h-28">
          <defs><path id="circle-path" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" /></defs>
          <text fontSize="11" fontFamily="Golos Text" fill="var(--teal)" letterSpacing="3">
            <textPath href="#circle-path">КЛИНИНГ • ПРОФЕССИОНАЛЬНО • БЫСТРО •</textPath>
          </text>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="animate-fade-up stagger-1">
              <span className="section-tag">Аренда Чистоты — химчистка мебели</span>
            </div>
            <h1 className="font-oswald font-bold animate-fade-up stagger-2" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--dark)", lineHeight: 1.1 }}>
              Химчистка мебели{" "}
              <span className="relative inline-block">
                <span style={{ color: "var(--teal)" }}>в Краснодаре</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9 Q50 2 100 8 Q150 14 198 6" stroke="#ffe227" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {" "}с выездом на дом
            </h1>
            <p className="speakable text-lg animate-fade-up stagger-3" style={{ color: "var(--gray)", maxWidth: 480 }}>
              Профессиональная химчистка диванов, кресел, матрасов и ковров в Краснодаре. Выезд на дом, безопасные средства, сушка за 2–4 часа.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <button onClick={() => scrollToId("contacts")} className="btn-primary px-8 py-3.5 text-base font-oswald flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                Вызвать мастера
              </button>
              <button onClick={() => scrollToId("prices")} className="btn-outline px-8 py-3.5 text-base font-oswald flex items-center gap-2">
                <Icon name="Calculator" size={18} />
                Рассчитать цену
              </button>
            </div>
            <div className="flex flex-wrap gap-5 pt-2 animate-fade-up stagger-5">
              {["Гарантия 100%", "Без предоплаты", "Безопасно для детей"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--gray)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--teal)" }}>
                    <Icon name="Check" size={11} className="text-white" />
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in stagger-3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/ce53b60a-fcdf-4aa5-951f-6fff06f91683.jpg"
                alt="Химчистка кресла — до и после | Аренда Чистоты Краснодар"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,184,160,0.12) 0%, transparent 60%)" }} />
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "var(--teal-light)" }}>⭐</div>
              <div>
                <div className="font-oswald font-bold text-lg" style={{ color: "var(--dark)" }}>4.98 / 5.0</div>
                <div className="text-xs" style={{ color: "var(--gray)" }}>1 240 отзывов</div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-3 py-2 sm:px-4 sm:py-3 animate-float" style={{ animationDelay: "2.5s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#ffe227" }}>
                  <Icon name="Zap" size={16} style={{ color: "var(--dark)" }} />
                </div>
                <div>
                  <div className="font-oswald font-bold text-sm" style={{ color: "var(--dark)" }}>Уже сегодня</div>
                  <div className="text-xs" style={{ color: "var(--gray)" }}>Свободные слоты</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up stagger-6">
          {STATS.map((s) => (
            <div key={s.num} className="text-center p-4 rounded-2xl" style={{ background: "rgba(12,184,160,0.07)", border: "1px solid rgba(12,184,160,0.12)" }}>
              <div className="font-oswald font-bold text-2xl md:text-3xl" style={{ color: "var(--teal)" }}>{s.num}</div>
              <div className="text-sm mt-1" style={{ color: "var(--gray)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Химчистка диванов", "Химчистка кресел", "Химчистка матрасов", "Чистка ковров", "Автохимчистка", "Удаление пятен"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4" style={{ background: "var(--teal)" }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-oswald font-medium text-white text-sm uppercase tracking-widest">
            <Icon name="Star" size={13} className="text-yellow-300 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-20" style={{ background: "var(--light-bg)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Наши услуги</span>
          <h2 className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Химчистка любой мебели с выездом
          </h2>
          <p className={`mt-3 text-base max-w-xl mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
            Работаем с диванами, креслами, матрасами, коврами и автомобилями
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const sd = SERVICES_DATA.find((d) => d.title === s.title);
            return (
            <div key={s.title} className={`card-clean relative overflow-hidden group ${inView ? `animate-fade-up stagger-${Math.min(i + 1, 6)}` : "opacity-0"}`}>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.img}
                  alt={`${s.title} в Краснодаре`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {s.badge && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: s.color === "#c9a800" ? "#ffe227" : "var(--teal)", color: s.color === "#c9a800" ? "var(--dark)" : "white" }}>
                    {s.badge}
                  </span>
                )}
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center shadow-md bg-white">
                  <Icon name={s.icon} size={22} style={{ color: s.color }} />
                </div>
              </div>
              <div className="p-6 pt-7">
                <h3 className="font-oswald font-bold text-lg mb-2" style={{ color: "var(--dark)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{s.desc}</p>
                {sd ? (
                  <Link to={`/uslugi/${sd.slug}`} className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3" style={{ color: "var(--teal)" }}>
                    Подробнее <Icon name="ArrowRight" size={15} />
                  </Link>
                ) : (
                  <button onClick={() => scrollToId("contacts")} className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3" style={{ color: "var(--teal)" }}>
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

function Calculator() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [extras, setExtras] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const toggleExtra = (key: string) =>
    setExtras((prev) => prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]);

  const changeCount = (id: string, delta: number) =>
    setCounts((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: next };
    });

  const itemsTotal = FURNITURE_ITEMS.reduce((sum, item) => sum + (counts[item.id] || 0) * item.price, 0);
  const extrasTotal = extras.reduce((sum, e) => {
    const opt = EXTRA_OPTIONS.find((o) => o.key === e);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const total = itemsTotal + extrasTotal;
  const hasItems = Object.values(counts).some((c) => c > 0);

  const selectedSummary = FURNITURE_ITEMS
    .filter((f) => counts[f.id])
    .map((f) => `${f.emoji} ${f.label} × ${counts[f.id]}`)
    .join(", ");

  return (
    <section id="prices" className="py-20 relative overflow-hidden dark-mesh-bg">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`} style={{ background: "rgba(12,184,160,0.2)", color: "#6ee7db" }}>
            Калькулятор цен
          </span>
          <h2 className={`font-oswald font-bold mt-4 text-white ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Рассчитайте стоимость за 30 секунд
          </h2>
          <p className={`mt-3 max-w-md mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
            Без скрытых платежей — цена окончательная
          </p>
        </div>

        <div className={`bg-white rounded-3xl p-6 md:p-10 shadow-2xl ${inView ? "animate-scale-in stagger-3" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Левая часть — выбор мебели и доп. услуги */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "var(--dark)" }}>Выберите мебель</label>
                <div className="space-y-2">
                  {FURNITURE_ITEMS.map((item) => {
                    const count = counts[item.id] || 0;
                    return (
                      <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-xl transition-all" style={{ background: count > 0 ? "var(--teal-light)" : "#f9fafb", border: count > 0 ? "1.5px solid var(--teal)" : "1.5px solid transparent" }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg">{item.emoji}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: "var(--dark)" }}>{item.label}</div>
                            <div className="text-xs" style={{ color: "var(--gray)" }}>{item.price.toLocaleString("ru")} ₽</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => changeCount(item.id, -1)} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all" style={{ background: count > 0 ? "var(--teal)" : "#e5e7eb", color: count > 0 ? "white" : "#9ca3af" }}>−</button>
                          <span className="w-5 text-center text-sm font-semibold" style={{ color: "var(--dark)" }}>{count}</span>
                          <button onClick={() => changeCount(item.id, 1)} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all" style={{ background: "var(--teal)", color: "white" }}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "var(--dark)" }}>Доп. услуги</label>
                <div className="space-y-2">
                  {EXTRA_OPTIONS.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleExtra(opt.key)}>
                      <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0" style={{ background: extras.includes(opt.key) ? "var(--teal)" : "transparent", borderColor: extras.includes(opt.key) ? "var(--teal)" : "#d1d5db" }}>
                        {extras.includes(opt.key) && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <span className="text-sm" style={{ color: "var(--dark)" }}>{opt.label} <span style={{ color: "var(--gray)" }}>(+{opt.price} ₽)</span></span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая часть — итог */}
            <div className="flex flex-col justify-between gap-4">
              <div className="rounded-2xl p-6" style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)" }}>
                {hasItems ? (
                  <>
                    <div className="text-xs mb-3 leading-relaxed" style={{ color: "var(--gray)" }}>{selectedSummary}</div>
                    <div className="border-t pt-3 space-y-1">
                      <div className="flex justify-between text-sm" style={{ color: "var(--gray)" }}>
                        <span>Мебель</span><span>{itemsTotal.toLocaleString("ru")} ₽</span>
                      </div>
                      {extrasTotal > 0 && (
                        <div className="flex justify-between text-sm" style={{ color: "var(--gray)" }}>
                          <span>Доп. услуги</span><span>+{extrasTotal.toLocaleString("ru")} ₽</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-center py-4" style={{ color: "var(--gray)" }}>Выберите мебель слева, чтобы рассчитать стоимость</div>
                )}
                <div className="border-t mt-4 pt-4 text-center">
                  <div className="text-sm mb-1" style={{ color: "var(--gray)" }}>Итого:</div>
                  <div className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)", color: hasItems ? "var(--teal)" : "#d1d5db", lineHeight: 1 }}>
                    {total > 0 ? `${total.toLocaleString("ru")} ₽` : "0 ₽"}
                  </div>
                </div>
              </div>

              <button onClick={() => scrollToId("contacts")} className="w-full btn-primary py-3.5 font-oswald font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-40" disabled={!hasItems}>
                <Icon name="Calendar" size={18} />
                {hasItems ? `Заказать за ${total.toLocaleString("ru")} ₽` : "Выберите мебель"}
              </button>
              <button onClick={() => scrollToId("contacts")} className="w-full py-3 rounded-full text-sm font-semibold transition-all hover:bg-gray-50" style={{ color: "var(--gray)", border: "1px solid #e5e7eb" }}>
                Обсудить условия
              </button>
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#fffbe0" }}>
                <Icon name="Info" size={15} style={{ color: "#c9a800" }} />
                <span className="text-xs" style={{ color: "#7a6200" }}>Скидка 10% на первый заказ!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className={`relative ${inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img
                    src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/d094ad5b-a76b-4a14-ad88-7d73d2d3a774.jpg"
                    alt="Химчистка дивана на дому в Краснодаре"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl p-5" style={{ background: "#ffe227" }}>
                  <div className="font-oswald font-bold text-3xl" style={{ color: "var(--dark)" }}>10+</div>
                  <div className="text-sm font-semibold mt-1" style={{ color: "var(--dark-2)" }}>лет на рынке</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img
                    src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/4aefd336-06ed-4dc6-84f8-86b03f8805e9.jpg"
                    alt="Химчистка матраса"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 whitespace-nowrap" style={{ border: "1px solid var(--border)" }}>
              <div className="flex -space-x-2">
                {["А", "М", "К"].map((l) => (
                  <div key={l} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white" style={{ background: "var(--teal)" }}>{l}</div>
                ))}
              </div>
              <div>
                <div className="font-oswald font-bold text-sm" style={{ color: "var(--dark)" }}>3 000+ заказов</div>
                <div className="text-xs" style={{ color: "var(--gray)" }}>довольных клиентов</div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <span className={`section-tag ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`}>О компании</span>
            <h2 className={`font-oswald font-bold ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--dark)" }}>
              Почему выбирают «Аренду Чистоты»
            </h2>
            <p className={`text-base leading-relaxed ${inView ? "animate-fade-up stagger-3" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
              С 2016 года специализируемся на химчистке мебели в Краснодаре. Профессиональное оборудование, безопасные средства и выезд в удобное для вас время.
            </p>
            <div className={`space-y-3 ${inView ? "animate-fade-up stagger-4" : "opacity-0"}`}>
              {[
                { icon: "ShieldCheck", text: "Гарантия результата — перечистим бесплатно" },
                { icon: "Leaf", text: "Гипоаллергенные средства, безопасны для детей" },
                { icon: "Clock", text: "Выезд 7 дней в неделю, с 8:00 до 22:00" },
                { icon: "Wallet", text: "Оплата после приёмки результата" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--teal-light)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "var(--teal)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--dark)" }}>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

const HOW_STEPS = [
  {
    num: "01",
    icon: "Search",
    title: "Осмотр и диагностика",
    text: "Бесплатно оцениваем степень загрязнения и тип ткани. Называем точную цену до начала работ — без скрытых доплат.",
  },
  {
    num: "02",
    icon: "Wind",
    title: "Сухая чистка",
    text: "Удаляем пыль, шерсть и мусор из всех складок мощным профессиональным пылесосом.",
  },
  {
    num: "03",
    icon: "Droplets",
    title: "Выведение пятен",
    text: "Точечно обрабатываем сложные загрязнения специализированными пятновыводителями под каждый тип пятна.",
  },
  {
    num: "04",
    icon: "Sparkles",
    title: "Основная мойка",
    text: "Наносим средство, вспениваем, вымываем грязь экстрактором горячей воды — машина вытягивает загрязнения из глубины.",
  },
  {
    num: "05",
    icon: "CheckCircle",
    title: "Сушка и финиш",
    text: "Ускоряем сушку воздуходувкой, поднимаем ворс, проводим финальный осмотр вместе с клиентом. Принимаете — платите.",
  },
];

function HowWeWork() {
  const { ref, inView } = useInView();
  return (
    <section id="how" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Процесс</span>
          <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Как мы работаем
          </h2>
          <p className={`mt-3 text-base max-w-xl mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
            5 шагов от звонка до чистого дивана — прозрачно, без сюрпризов
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {HOW_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`relative card-clean p-5 flex flex-col gap-3 ${inView ? `animate-fade-up stagger-${Math.min(i + 2, 6)}` : "opacity-0"}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--teal-light)" }}
                >
                  <Icon name={step.icon} size={20} style={{ color: "var(--teal)" }} />
                </div>
                <span
                  className="font-oswald font-bold text-2xl"
                  style={{ color: "rgba(12,184,160,0.15)" }}
                >
                  {step.num}
                </span>
              </div>
              <h3 className="font-oswald font-bold text-base leading-snug" style={{ color: "var(--dark)" }}>
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--gray)" }}>
                {step.text}
              </p>
              {i < HOW_STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10"
                  style={{ background: "var(--yellow)" }}
                >
                  <Icon name="ChevronRight" size={14} style={{ color: "var(--dark)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${inView ? "animate-fade-up stagger-6" : "opacity-0"}`}>
          {[
            { src: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/52db93f3-6b44-4461-825a-8f573412e67b.jpg", alt: "Мастер Аренда Чистоты чистит кресла в ресторане" },
            { src: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/7b2d4644-7da2-4b65-a5d8-0ee651819090.jpg", alt: "Химчистка матраса в детской комнате" },
            { src: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/3883dcbc-ec95-4d82-a6a4-1bc371e3823b.jpg", alt: "Чистка ковра с помощью экстрактора" },
            { src: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/b8f3b941-b079-4a94-8843-d814bf91c83a.jpg", alt: "Профессиональная химчистка мебели на дому" },
          ].map((photo) => (
            <div key={photo.src} className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const RATING_PLATFORMS = [
  {
    name: "Яндекс Карты",
    rating: "4.9",
    reviews: "840+",
    icon: "MapPin",
    color: "#FF4433",
    href: "https://yandex.ru/maps/org/arenda_chistoty",
  },
  {
    name: "Zoon.ru",
    rating: "5.0",
    reviews: "210+",
    icon: "Star",
    color: "#FF8C00",
    href: "https://zoon.ru",
  },
  {
    name: "Профи.ру",
    rating: "4.98",
    reviews: "190+",
    icon: "Award",
    color: "#6C47FF",
    href: "https://profi.ru",
  },
];

function TrustRatings() {
  const { ref, inView } = useInView();
  return (
    <section className="py-14" style={{ background: "var(--dark)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className={`font-oswald font-bold text-white ${inView ? "animate-fade-up" : "opacity-0"}`} style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Нас проверили тысячи клиентов
          </h2>
          <p className={`mt-2 text-sm ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ color: "rgba(255,255,255,0.5)" }}>
            Независимые оценки на ведущих платформах
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {RATING_PLATFORMS.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 rounded-2xl p-5 transition-all hover:scale-[1.02] ${inView ? `animate-fade-up stagger-${i + 2}` : "opacity-0"}`}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${p.color}22` }}
              >
                <Icon name={p.icon} size={22} style={{ color: p.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm">{p.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-oswald font-bold text-xl" style={{ color: "var(--yellow)" }}>{p.rating}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>/ {p.reviews} отзывов</span>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} style={{ color: "var(--yellow)", fontSize: 12 }}>★</span>
                  ))}
                </div>
              </div>
              <Icon name="ExternalLink" size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
            </a>
          ))}
        </div>
        <div className={`text-center ${inView ? "animate-fade-up stagger-5" : "opacity-0"}`}>
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-8 py-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="font-oswald font-bold text-4xl" style={{ color: "var(--yellow)" }}>4.98</div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: "var(--yellow)", fontSize: 18 }}>★</span>
                ))}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>средний рейтинг по всем платформам · 1240+ отзывов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, inView } = useInView();
  return (
    <section id="reviews" className="py-20" style={{ background: "var(--light-bg)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Отзывы</span>
          <h2 className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Что говорят клиенты
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={r.name} className={`card-clean p-5 flex flex-col ${inView ? `animate-fade-up stagger-${Math.min(i + 2, 6)}` : "opacity-0"}`}>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--gray)" }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "var(--teal)" }}>
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--dark)" }}>{r.name}</div>
                  <div className="text-xs" style={{ color: "var(--gray)" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, inView } = useInView();
  const bgColors = ["var(--teal-light)", "#fffbe0", "var(--teal-light)", "#fffbe0", "var(--teal-light)", "#fffbe0"];
  return (
    <section id="gallery" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="text-center sm:text-left">
            <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Реальные результаты</span>
            <h2 className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
              Наши работы
            </h2>
          </div>
          <Link
            to="/nashi-raboty"
            className={`btn-outline px-6 py-2.5 text-sm font-oswald flex items-center gap-2 whitespace-nowrap ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}
          >
            Смотреть все работы
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`relative rounded-2xl overflow-hidden cursor-pointer hover-lift group ${inView ? `animate-fade-up stagger-${Math.min(i + 1, 6)}` : "opacity-0"}`}
              style={{ aspectRatio: item.ratio, background: bgColors[i] }}
            >
              <img
                src={item.img}
                alt={`${item.label} в Краснодаре`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.85)", color: "var(--dark)" }}>{item.tag}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                <span className="text-white font-semibold text-sm">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-8 ${inView ? "animate-fade-up stagger-6" : "opacity-0"}`}>
          <Link to="/nashi-raboty" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm font-oswald">
            <Icon name="Images" size={18} />
            Смотреть все 6+ работ с фото до и после
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Сколько времени занимает химчистка?",
    a: "В среднем чистка одного дивана занимает 1–1,5 часа. Мебель высыхает за 2–4 часа в зависимости от типа обивки и влажности в помещении.",
  },
  {
    q: "Вы приезжаете на дом?",
    a: "Да, мы работаем с выездом на дом по Краснодару и пригороду. Всё оборудование привозим с собой — вам не нужно ничего готовить заранее.",
  },
  {
    q: "Безопасны ли средства для детей и животных?",
    a: "Мы используем профессиональную гипоаллергенную химию, безопасную для детей, аллергиков и домашних животных. После чистки не остаётся вредных запахов.",
  },
  {
    q: "Сколько стоит химчистка дивана?",
    a: "Стоимость зависит от размера и типа обивки. Точную цену можно рассчитать в калькуляторе на сайте или уточнить по телефону — мастер назовёт её до начала работ.",
  },
  {
    q: "Удалите ли вы старые и стойкие пятна?",
    a: "В большинстве случаев да — мы выводим пятна от кофе, вина, жира, мочи и других загрязнений. Результат зависит от давности и природы пятна; мастер оценит это на месте.",
  },
  {
    q: "Как оплатить услугу?",
    a: "Оплата принимается наличными или переводом после выполнения работ, когда вы убедитесь в результате.",
  },
  {
    q: "У вас дешевле, чем у других? В чём подвох?",
    a: "Подвоха нет. Мы работаем без посредников и имеем собственную базу в Краснодаре — это снижает наши расходы. Именно поэтому можем предложить цены ниже среднерыночных при высоком качестве и с гарантией результата. Оплата только после приёмки.",
  },
  {
    q: "У меня очень сложное пятно от вина или крови. Вы его гарантированно выведете?",
    a: "В большинстве случаев — да. Мастер бесплатно оценит пятно на месте и сразу скажет о прогнозе. Если вывести не удастся — вы ничего не платите. Мы не берём деньги за попытку.",
  },
];

function Faq() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Вопросы</span>
          <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Частые вопросы
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`card-clean overflow-hidden ${inView ? `animate-fade-up stagger-${Math.min(i + 2, 6)}` : "opacity-0"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5"
                >
                  <span className="font-oswald font-semibold text-base" style={{ color: "var(--dark)" }}>{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ color: "var(--teal)", transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "240px" : "0" }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const { ref, inView } = useInView();
  return (
    <section id="blog" className="py-20" style={{ background: "var(--light-bg)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Блог</span>
            <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
              Советы по чистоте
            </h2>
          </div>
          <button onClick={() => scrollToId("contacts")} className={`btn-primary px-6 py-2.5 text-sm font-oswald flex items-center gap-2 ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}>
            <Icon name="MessageCircle" size={16} />
            Задать вопрос
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className={`card-clean overflow-hidden cursor-pointer group block ${inView ? `animate-fade-up stagger-${i + 3}` : "opacity-0"}`}>
              <div className="h-40 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-tag text-xs">{post.tag}</span>
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.readTime} чтения</span>
                </div>
                <h3 className="font-oswald font-bold text-base leading-snug mb-3" style={{ color: "var(--dark)" }}>{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.date}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "var(--teal)" }}>
                    Читать <Icon name="ArrowRight" size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const FURNITURE_TYPES = [
  { key: "sofa", label: "Диван", emoji: "🛋️" },
  { key: "chair", label: "Кресло", emoji: "🪑" },
  { key: "mattress", label: "Матрас", emoji: "🛏️" },
  { key: "carpet", label: "Ковёр", emoji: "🏡" },
  { key: "auto", label: "Авто", emoji: "🚗" },
  { key: "other", label: "Другое", emoji: "✨" },
];

function ContactForm({ inView }: { inView: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://functions.poehali.dev/e0c4663b-8df6-4eed-958d-8a57089eb58a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className={`rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 ${inView ? "animate-scale-in stagger-4" : "opacity-0"}`} style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)", minHeight: 280 }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "var(--teal-light)" }}>✅</div>
        <h3 className="font-oswald font-bold text-xl" style={{ color: "var(--dark)" }}>Заявка принята!</h3>
        <p className="text-sm" style={{ color: "var(--gray)" }}>Перезвоним в течение 15 минут и уточним детали.</p>
        <button onClick={() => { setSent(false); setName(""); setPhone(""); }}
          className="text-sm font-semibold mt-2" style={{ color: "var(--teal)" }}>
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 md:p-8 ${inView ? "animate-scale-in stagger-4" : "opacity-0"}`} style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)" }}>
      <h3 className="font-oswald font-bold text-xl mb-1" style={{ color: "var(--dark)" }}>Оставить заявку</h3>
      <p className="text-xs mb-6" style={{ color: "var(--gray)" }}>Перезвоним в течение 15 минут</p>

      <div className="space-y-3">
        {[
          { placeholder: "Ваше имя", type: "text", icon: "User", value: name, setter: setName },
          { placeholder: "Номер телефона", type: "tel", icon: "Phone", value: phone, setter: setPhone },
        ].map((field) => (
          <div key={field.placeholder} className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name={field.icon} size={16} style={{ color: "var(--gray)" }} />
            </div>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm outline-none"
              style={{ border: "1px solid var(--border)", color: "var(--dark)", fontFamily: "'Golos Text', sans-serif" }}
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full btn-primary py-3.5 font-oswald font-semibold text-base disabled:opacity-50"
          disabled={!name || !phone || loading}
        >
          {loading ? "Отправляем..." : "Вызвать мастера"}
        </button>
        {error && (
          <p className="text-xs text-center font-semibold" style={{ color: "#e53e3e" }}>
            Не удалось отправить заявку. Позвоните нам: <a href="tel:+79189682882" style={{ color: "#e53e3e" }}>8 918 968-28-82</a>
          </p>
        )}
        <p className="text-xs text-center" style={{ color: "var(--gray)" }}>
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  );
}

function Zones() {
  const { ref, inView } = useInView();
  const districts = DISTRICTS.filter((d) => d.type === "district");
  const micros = DISTRICTS.filter((d) => d.type === "micro");

  return (
    <section id="zones" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Зоны выезда</span>
          <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Работаем по всему Краснодару
          </h2>
          <p className={`mt-3 text-base max-w-xl mx-auto ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
            Выезжаем в любой район и микрорайон города — без доплат за выезд
          </p>
        </div>

        {/* Округа */}
        <div className={`mb-8 ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--gray)" }}>Округа</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {districts.map((d) => (
              <Link
                key={d.slug}
                to={`/himchistka-${d.slug}`}
                className="group flex items-center gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm border transition-all hover:border-[var(--teal)] hover:shadow-md"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[var(--teal)]" style={{ background: "rgba(12,184,160,0.1)" }}>
                  <Icon name="MapPin" size={16} style={{ color: "var(--teal)" }} className="group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: "var(--dark)" }}>{d.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--teal)" }}>Подробнее →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Микрорайоны */}
        <div className={`${inView ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--gray)" }}>Микрорайоны и посёлки</p>
          <div className="flex flex-wrap gap-2">
            {micros.map((d) => (
              <Link
                key={d.slug}
                to={`/himchistka-${d.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]"
                style={{ borderColor: "var(--border)", color: "var(--dark)", background: "white" }}
              >
                <Icon name="MapPin" size={12} style={{ color: "var(--teal)" }} />
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-10 text-center ${inView ? "animate-fade-up stagger-4" : "opacity-0"}`}>
          <p className="text-sm" style={{ color: "var(--gray)" }}>
            Не нашли свой район?{" "}
            <a href="tel:+79189682882" className="font-semibold" style={{ color: "var(--teal)" }}>
              Позвоните — выедем куда нужно
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const { ref, inView } = useInView();
  return (
    <section id="contacts" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Контакты</span>
            <h2 className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
              Вызвать мастера на дом
            </h2>
            <p className={`mt-3 mb-8 text-base ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
              Позвоните или оставьте заявку — ответим в течение 15 минут, приедем в удобное время.
            </p>
            <div className={`space-y-4 ${inView ? "animate-fade-up stagger-3" : "opacity-0"}`}>
              {[
                { icon: "Phone", label: "Телефон", value: "8 918 968-28-82", sub: "Звоните в любое время", link: "tel:+79189682882" },
                { icon: "MessageCircle", label: "MAX", value: "Написать в MAX", sub: "Онлайн 9:00–22:00", link: "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc" },
                { icon: "MapPin", label: "Адрес", value: "Краснодар", sub: "Работаем по всему городу и краю", link: null },
              ].map((c) => {
                const Tag = c.link ? "a" : "div";
                return (
                  <Tag
                    key={c.label}
                    {...(c.link ? { href: c.link, target: c.link.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 p-4 rounded-2xl hover-lift cursor-pointer" style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--teal-light)" }}>
                      <Icon name={c.icon} size={20} style={{ color: "var(--teal)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--gray)" }}>{c.label}</div>
                      <div className="font-semibold text-sm" style={{ color: "var(--dark)" }}>{c.value}</div>
                      <div className="text-xs" style={{ color: "var(--gray)" }}>{c.sub}</div>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>

          <ContactForm inView={inView} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-wrap justify-center gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                {l.label}
              </a>
            ))}
            <Link to="/nashi-raboty" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
              Наши работы
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                Политика конфиденциальности
              </Link>
              <Link to="/cookie-policy" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                Политика Cookie
              </Link>
            </div>
          <div className="flex items-center gap-3">
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Аренда Чистоты</div>
            <a
              href="https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ background: "rgba(12,184,160,0.15)", color: "var(--teal)", border: "1px solid rgba(12,184,160,0.3)" }}
            >
              <Icon name="MessageCircle" size={13} />
              Написать в MAX
            </a>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 z-[90] flex flex-col gap-3">
      <a
        href="https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в MAX"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        style={{ background: "var(--teal)" }}
      >
        <Icon name="MessageCircle" size={26} className="text-white" />
      </a>
      <a
        href="tel:+79189682882"
        aria-label="Позвонить"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 animate-float"
        style={{ background: "#ffe227" }}
      >
        <Icon name="Phone" size={24} style={{ color: "var(--dark)" }} />
      </a>
    </div>
  );
}

export default function Index() {
  const seoLd = [
    {
      "@context": "https://schema.org",
      "@type": "CleaningService",
      name: "Аренда Чистоты",
      alternateName: "Химчистка мебели Краснодар",
      description: "Профессиональная химчистка диванов, кресел, матрасов, ковров и автомобилей в Краснодаре с выездом на дом. Сушка за 2–4 часа, безопасные средства.",
      image: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/1f8a12d2-02a6-452c-a1cb-4fa8f342c646.jpg",
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
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
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
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка диванов в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-divanov" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка кресел в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-kresel" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка матрасов в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-matrasov" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка ковров в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-kovrov" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка автосалона в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-avtosalona" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Химчистка стульев в Краснодаре", url: "https://arenda-chistoty.online/uslugi/himchistka-stulev" } },
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
          acceptedAnswer: { "@type": "Answer", text: "Химчистка дивана в Краснодаре стоит от 3 500 рублей. Угловой диван — от 5 500 рублей. Точную цену назовёт мастер при осмотре." },
        },
        {
          "@type": "Question",
          name: "Выезжаете ли вы на дом для химчистки мебели?",
          acceptedAnswer: { "@type": "Answer", text: "Да, мы работаем с выездом на дом по всему Краснодару. Привозим всё оборудование с собой, ничего готовить не нужно." },
        },
        {
          "@type": "Question",
          name: "Сколько сохнет мебель после химчистки?",
          acceptedAnswer: { "@type": "Answer", text: "Мебель высыхает за 2–4 часа. Мы используем профессиональные воздуходувки для ускорения сушки." },
        },
        {
          "@type": "Question",
          name: "Безопасна ли химчистка для детей и животных?",
          acceptedAnswer: { "@type": "Answer", text: "Да, мы используем гипоаллергенные профессиональные средства, безопасные для детей, аллергиков и домашних животных." },
        },
        {
          "@type": "Question",
          name: "Как вызвать мастера по химчистке в Краснодаре?",
          acceptedAnswer: { "@type": "Answer", text: "Позвоните по номеру 8 918 968-28-82 или оставьте заявку на сайте. Работаем ежедневно с 9:00 до 22:00." },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Seo
        title="Химчистка мягкой мебели в Краснодаре — выезд на дом | Аренда Чистоты"
        description="★4.98 из 5 (1240 отзывов) Химчистка мебели в Краснодаре с выездом на дом. Диваны, кресла, матрасы, ковры, автомобили. Безопасные средства, сушка 2–4 часа, гарантия результата. ☎ 8 918 968-28-82"
        keywords="химчистка мебели, химчистка мебели краснодар, химчистка мягкой мебели, химчистка мягкой мебели краснодар, химчистка мебели на дому, химчистка мебели на дому краснодар, химчистка мягкой мебели на дому, химчистка мебели цена, химчистка мебели на дому цена, химчистка мебели краснодар на дому цена, химчистка мягкой мебели краснодар цена, стоимость химчистки мебели, сколько стоит химчистка мебели, услуги химчистки мебели, услуги химчистки мягкой мебели, профессиональная химчистка мебели, профессиональная химчистка мягкой мебели, лучшая химчистка мебели, химчистка мебели с выездом, выездная химчистка мебели, выездная химчистка мягкой мебели, химчистка мебели и ковров, химчистка ковров мягкой мебели, химчистка мягкой мебели с выездом на дом, сухая химчистка мебели, влажная химчистка мебели, химчистка тканевой мебели, химчистка обивки мебели, химчистка обивки мягкой мебели, химчистка кожаной мебели, химчистка домашней мебели, химчистка мебели диванов, химчистка дивана чистка мебели, химчистка мебели матрасов, заказать химчистку мебели, химчистка мебели недорого, химчистка мягкой мебели недорого, химчистка мебели на дому недорого, клининг химчистка мебели, химчистка мебели авто, химчистка мебели автомобиля, химчистка салона автомобиля мебели, химчистка мебели пятен, химчистка мебели от запахов, химчистка мебели моча, аренда чистоты краснодар"
        path="/"
        jsonLd={seoLd}
      />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Calculator />
      <About />
      <HowWeWork />
      <TrustRatings />
      <Reviews />
      <Gallery />
      <Blog />
      <Faq />
      <Contacts />
      <Footer />
      <FloatingActions />
    </div>
  );
}