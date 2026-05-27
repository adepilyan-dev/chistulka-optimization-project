import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ============ ДАННЫЕ ============

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Sofa",
    title: "Химчистка диванов",
    desc: "Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа — работаем с любым материалом.",
    color: "#0cb8a0",
    badge: "Хит",
  },
  {
    icon: "ArmchairIcon",
    title: "Химчистка кресел",
    desc: "Офисные, обеденные, игровые кресла. Глубокая чистка без разборки, сушка за 2–4 часа.",
    color: "#c9a800",
    badge: null,
  },
  {
    icon: "BedDouble",
    title: "Химчистка матрасов",
    desc: "Устраняем клещей, грибок, пятна и неприятные запахи. Безопасно для детей и аллергиков.",
    color: "#0cb8a0",
    badge: "Популярно",
  },
  {
    icon: "LayoutGrid",
    title: "Химчистка ковров",
    desc: "Шерсть, синтетика, ковры ручной работы. Выездная чистка на дому или в нашем цеху.",
    color: "#c9a800",
    badge: null,
  },
  {
    icon: "Armchair",
    title: "Химчистка стульев",
    desc: "Обеденные группы, барные стулья, пуфики. Быстро — один стул от 15 минут.",
    color: "#0cb8a0",
    badge: null,
  },
  {
    icon: "Car",
    title: "Химчистка автосалона",
    desc: "Сиденья, потолок, дверные панели. Профессиональное оборудование и безопасные средства.",
    color: "#c9a800",
    badge: null,
  },
];

const STATS = [
  { num: "3 000+", label: "предметов мебели" },
  { num: "8 лет", label: "на рынке" },
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

const BLOG_POSTS = [
  {
    tag: "Советы",
    title: "Как продлить жизнь дивану: 5 простых правил",
    date: "18 мая 2026",
    readTime: "3 мин",
    emoji: "🛋️",
    bg: "#e0f7f4",
  },
  {
    tag: "Лайфхак",
    title: "Что делать сразу после того, как пролили на диван",
    date: "10 мая 2026",
    readTime: "4 мин",
    emoji: "💧",
    bg: "#fffbe0",
  },
  {
    tag: "Рейтинг",
    title: "Велюр, кожа или ткань: какую мебель легче чистить",
    date: "2 мая 2026",
    readTime: "5 мин",
    emoji: "✨",
    bg: "#e0f7f4",
  },
];

const GALLERY_ITEMS = [
  { label: "Диван до и после", tag: "Диван", emoji: "🛋️", ratio: "4/3" },
  { label: "Кресло до и после", tag: "Кресло", emoji: "🪑", ratio: "1/1" },
  { label: "Матрас до и после", tag: "Матрас", emoji: "🛏️", ratio: "1/1" },
  { label: "Ковёр до и после", tag: "Ковёр", emoji: "🏡", ratio: "4/3" },
  { label: "Автомобиль до и после", tag: "Авто", emoji: "🚗", ratio: "1/1" },
  { label: "Стулья до и после", tag: "Стулья", emoji: "✨", ratio: "1/1" },
];

const CLEANING_TYPES = [
  { id: "standard", label: "Стандартная", pricePerSqm: 45 },
  { id: "general", label: "Генеральная", pricePerSqm: 90 },
  { id: "repair", label: "После ремонта", pricePerSqm: 120 },
  { id: "office", label: "Офисная", pricePerSqm: 55 },
];

const EXTRA_OPTIONS = [
  { key: "windows", label: "Мытьё окон", price: 800 },
  { key: "balcony", label: "Уборка балкона", price: 500 },
  { key: "fridge", label: "Чистка холодильника", price: 400 },
  { key: "oven", label: "Чистка духовки", price: 350 },
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--teal)" }}>
            <Icon name="Sparkles" size={18} className="text-white" />
          </div>
          <span className="font-oswald font-bold text-xl" style={{ color: "var(--dark)" }}>
            Чисто<span style={{ color: "var(--teal)" }}>тел</span>
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:text-[var(--teal)]" style={{ color: "var(--dark)", fontFamily: "'Golos Text', sans-serif" }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="Phone" size={16} />
            8 800 123-45-67
          </a>
          <button className="btn-primary px-5 py-2 text-sm">Вызвать мастера</button>
        </div>
        <button className="lg:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} style={{ color: "var(--dark)" }}>
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="py-2 font-medium text-sm" style={{ color: "var(--dark)" }} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button className="btn-primary px-5 py-2.5 mt-2 text-sm">Вызвать мастера</button>
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
              <span className="section-tag">Химчистка мебели №1 в СПб</span>
            </div>
            <h1 className="font-oswald font-bold animate-fade-up stagger-2" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--dark)", lineHeight: 1.1 }}>
              Ваша мебель будет{" "}
              <span className="relative inline-block">
                <span style={{ color: "var(--teal)" }}>как новая</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9 Q50 2 100 8 Q150 14 198 6" stroke="#ffe227" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              снова
            </h1>
            <p className="text-lg animate-fade-up stagger-3" style={{ color: "var(--gray)", maxWidth: 480 }}>
              Профессиональная химчистка диванов, кресел, матрасов и ковров. Выезд на дом, безопасные средства, сушка за 2–4 часа.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <button className="btn-primary px-8 py-3.5 text-base font-oswald flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                Вызвать мастера
              </button>
              <button className="btn-outline px-8 py-3.5 text-base font-oswald flex items-center gap-2">
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
                src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/c2bbf050-4ef8-4377-b66f-968f0a0f879d.jpg"
                alt="Профессиональная уборка"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,184,160,0.12) 0%, transparent 60%)" }} />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "var(--teal-light)" }}>⭐</div>
              <div>
                <div className="font-oswald font-bold text-lg" style={{ color: "var(--dark)" }}>4.98 / 5.0</div>
                <div className="text-xs" style={{ color: "var(--gray)" }}>1 240 отзывов</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 animate-float" style={{ animationDelay: "2.5s" }}>
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
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`card-clean p-6 relative cursor-pointer ${inView ? `animate-fade-up stagger-${Math.min(i + 1, 6)}` : "opacity-0"}`}>
              {s.badge && (
                <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: s.color === "#c9a800" ? "#ffe227" : "var(--teal)", color: s.color === "#c9a800" ? "var(--dark)" : "white" }}>
                  {s.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.color === "#c9a800" ? "#fffbe0" : "var(--teal-light)" }}>
                <Icon name={s.icon} size={22} style={{ color: s.color }} />
              </div>
              <h3 className="font-oswald font-bold text-lg mb-2" style={{ color: "var(--dark)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{s.desc}</p>
              <button className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3" style={{ color: "var(--teal)" }}>
                Подробнее <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [area, setArea] = useState(50);
  const [type, setType] = useState("standard");
  const [extras, setExtras] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const currentType = CLEANING_TYPES.find((t) => t.id === type)!;
  const toggleExtra = (key: string) =>
    setExtras((prev) => prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]);

  const basePrice = Math.round(area * currentType.pricePerSqm);
  const extrasTotal = extras.reduce((sum, e) => {
    const opt = EXTRA_OPTIONS.find((o) => o.key === e);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const total = basePrice + extrasTotal;

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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "var(--dark)" }}>Тип уборки</label>
                <div className="grid grid-cols-2 gap-2">
                  {CLEANING_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: type === t.id ? "var(--teal)" : "var(--teal-light)",
                        color: type === t.id ? "white" : "var(--teal-dark)",
                        border: type === t.id ? "2px solid var(--teal)" : "2px solid transparent",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--dark)" }}>
                  Площадь: <span style={{ color: "var(--teal)" }}>{area} м²</span>
                </label>
                <input
                  type="range" min={20} max={300} step={5} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 rounded-full outline-none cursor-pointer"
                  style={{ accentColor: "var(--teal)" }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--gray)" }}>
                  <span>20 м²</span><span>300 м²</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "var(--dark)" }}>Доп. услуги</label>
                <div className="space-y-2">
                  {EXTRA_OPTIONS.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleExtra(opt.key)}>
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0"
                        style={{ background: extras.includes(opt.key) ? "var(--teal)" : "transparent", borderColor: extras.includes(opt.key) ? "var(--teal)" : "#d1d5db" }}
                      >
                        {extras.includes(opt.key) && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <span className="text-sm" style={{ color: "var(--dark)" }}>{opt.label} <span style={{ color: "var(--gray)" }}>(+{opt.price} ₽)</span></span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="rounded-2xl p-6 text-center" style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)" }}>
                <div className="text-sm mb-1" style={{ color: "var(--gray)" }}>Базовая стоимость</div>
                <div className="font-oswald font-bold text-2xl" style={{ color: "var(--dark)" }}>{basePrice.toLocaleString("ru")} ₽</div>
                {extrasTotal > 0 && (
                  <div className="mt-2 text-sm" style={{ color: "var(--gray)" }}>+ доп. услуги: {extrasTotal.toLocaleString("ru")} ₽</div>
                )}
                <div className="border-t mt-4 pt-4">
                  <div className="text-sm mb-1" style={{ color: "var(--gray)" }}>Итого:</div>
                  <div className="font-oswald font-bold" style={{ fontSize: "2.8rem", color: "var(--teal)", lineHeight: 1 }}>
                    {total.toLocaleString("ru")} ₽
                  </div>
                  <div className="text-xs mt-2" style={{ color: "var(--gray)" }}>{currentType.pricePerSqm} ₽/м² · {area} м²</div>
                </div>
              </div>

              <button className="w-full btn-primary py-3.5 font-oswald font-semibold text-base flex items-center justify-center gap-2">
                <Icon name="Calendar" size={18} />
                Заказать за {total.toLocaleString("ru")} ₽
              </button>
              <button className="w-full py-3 rounded-full text-sm font-semibold transition-all hover:bg-gray-50" style={{ color: "var(--gray)", border: "1px solid #e5e7eb" }}>
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
                <div className="rounded-2xl aspect-square flex items-center justify-center text-7xl" style={{ background: "var(--teal-light)" }}>🛋️</div>
                <div className="rounded-2xl p-5" style={{ background: "#ffe227" }}>
                  <div className="font-oswald font-bold text-3xl" style={{ color: "var(--dark)" }}>8+</div>
                  <div className="text-sm font-semibold mt-1" style={{ color: "var(--dark-2)" }}>лет на рынке</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl p-5" style={{ background: "var(--teal)" }}>
                  <div className="font-oswald font-bold text-3xl text-white">20+</div>
                  <div className="text-sm font-semibold mt-1 text-white/80">мастеров</div>
                </div>
                <div className="rounded-2xl aspect-video flex items-center justify-center text-5xl" style={{ background: "var(--teal-light)" }}>✨</div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <span className={`section-tag ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`}>О компании</span>
            <h2 className={`font-oswald font-bold ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--dark)" }}>
              Возвращаем мебели первозданный вид
            </h2>
            <p className={`text-base leading-relaxed ${inView ? "animate-fade-up stagger-3" : "opacity-0"}`} style={{ color: "var(--gray)" }}>
              С 2018 года специализируемся на химчистке мебели в Санкт-Петербурге. Профессиональное оборудование, безопасные средства и выезд в удобное для вас время.
            </p>
            <div className={`space-y-3 ${inView ? "animate-fade-up stagger-4" : "opacity-0"}`}>
              {[
                { icon: "ShieldCheck", text: "Страховая ответственность — возместим ущерб" },
                { icon: "Leaf", text: "Гипоаллергенные средства, безопасны для детей" },
                { icon: "Clock", text: "Выезд 7 дней в неделю, с 8:00 до 22:00" },
                { icon: "Award", text: "Лауреат премии «Лучший клининг СПб 2025»" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--teal-light)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "var(--teal)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--dark)" }}>{item.text}</span>
                </div>
              ))}
            </div>
            <button className={`btn-primary px-7 py-3 font-oswald font-semibold text-sm ${inView ? "animate-fade-up stagger-5" : "opacity-0"}`}>
              Познакомиться с командой
            </button>
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
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Галерея</span>
          <h2 className={`font-oswald font-bold mt-4 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Наши работы
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`relative rounded-2xl overflow-hidden cursor-pointer hover-lift group ${inView ? `animate-fade-up stagger-${Math.min(i + 1, 6)}` : "opacity-0"}`}
              style={{ aspectRatio: item.ratio, background: bgColors[i] }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-5xl">{item.emoji}</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: "var(--dark)" }}>{item.tag}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all flex items-end p-4">
                <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all">{item.label}</span>
              </div>
            </div>
          ))}
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
          <button className={`btn-outline px-6 py-2 text-sm font-oswald ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}>
            Все статьи
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <div key={post.title} className={`card-clean overflow-hidden cursor-pointer ${inView ? `animate-fade-up stagger-${i + 3}` : "opacity-0"}`}>
              <div className="h-40 flex items-center justify-center text-5xl" style={{ background: post.bg }}>{post.emoji}</div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-tag text-xs">{post.tag}</span>
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.readTime} чтения</span>
                </div>
                <h3 className="font-oswald font-bold text-base leading-snug mb-3" style={{ color: "var(--dark)" }}>{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.date}</span>
                  <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--teal)" }}>
                    Читать <Icon name="ArrowRight" size={13} />
                  </button>
                </div>
              </div>
            </div>
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
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (key: string) =>
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);

  const handleSubmit = () => {
    if (!name || !phone) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className={`rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 ${inView ? "animate-scale-in stagger-4" : "opacity-0"}`} style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)", minHeight: 320 }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "var(--teal-light)" }}>✅</div>
        <h3 className="font-oswald font-bold text-xl" style={{ color: "var(--dark)" }}>Заявка принята!</h3>
        <p className="text-sm" style={{ color: "var(--gray)" }}>Перезвоним в течение 15 минут и уточним детали.</p>
        <button onClick={() => { setSent(false); setSelected([]); setName(""); setPhone(""); setTime(""); setComment(""); }}
          className="text-sm font-semibold mt-2" style={{ color: "var(--teal)" }}>
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 md:p-8 ${inView ? "animate-scale-in stagger-4" : "opacity-0"}`} style={{ background: "var(--light-bg)", border: "1px solid rgba(12,184,160,0.15)" }}>
      <h3 className="font-oswald font-bold text-xl mb-1" style={{ color: "var(--dark)" }}>Оставить заявку</h3>
      <p className="text-xs mb-4" style={{ color: "var(--gray)" }}>Выберите, что нужно почистить</p>

      {/* Тип мебели */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {FURNITURE_TYPES.map((f) => {
          const active = selected.includes(f.key);
          return (
            <button
              key={f.key}
              onClick={() => toggle(f.key)}
              className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: active ? "var(--teal)" : "white",
                color: active ? "white" : "var(--dark)",
                border: active ? "2px solid var(--teal)" : "2px solid var(--border)",
              }}
            >
              <span className="text-xl">{f.emoji}</span>
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {[
          { placeholder: "Ваше имя", type: "text", icon: "User", value: name, setter: setName },
          { placeholder: "Номер телефона", type: "tel", icon: "Phone", value: phone, setter: setPhone },
          { placeholder: "Удобное время для звонка", type: "text", icon: "Clock", value: time, setter: setTime },
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
        <textarea
          placeholder="Комментарий (необязательно)"
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none resize-none"
          style={{ border: "1px solid var(--border)", color: "var(--dark)", fontFamily: "'Golos Text', sans-serif" }}
        />
        <button
          onClick={handleSubmit}
          className="w-full btn-primary py-3.5 font-oswald font-semibold text-base disabled:opacity-50"
          disabled={!name || !phone}
        >
          {selected.length > 0
            ? `Вызвать мастера — ${selected.map((k) => FURNITURE_TYPES.find((f) => f.key === k)?.label).join(", ")}`
            : "Вызвать мастера"}
        </button>
        <p className="text-xs text-center" style={{ color: "var(--gray)" }}>
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
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
                { icon: "Phone", label: "Телефон", value: "8 800 123-45-67", sub: "Бесплатно по России" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (921) 123-45-67", sub: "Онлайн 9:00–22:00" },
                { icon: "MapPin", label: "Адрес", value: "Санкт-Петербург", sub: "Работаем по всему городу" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-2xl hover-lift cursor-pointer" style={{ border: "1px solid var(--border)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--teal-light)" }}>
                    <Icon name={c.icon} size={20} style={{ color: "var(--teal)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--gray)" }}>{c.label}</div>
                    <div className="font-semibold text-sm" style={{ color: "var(--dark)" }}>{c.value}</div>
                    <div className="text-xs" style={{ color: "var(--gray)" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--teal)" }}>
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg text-white">Чисто<span style={{ color: "var(--teal)" }}>тел</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Чистотел</div>
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
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Calculator />
      <About />
      <Reviews />
      <Gallery />
      <Blog />
      <Contacts />
      <Footer />
    </div>
  );
}