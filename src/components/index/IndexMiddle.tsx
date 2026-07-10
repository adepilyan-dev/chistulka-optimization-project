import Icon from "@/components/ui/icon";
import { useInView, HOW_STEPS, REVIEWS } from "@/components/index/IndexShared";

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

export function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div className={`relative ${inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img
                    src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/d094ad5b-a76b-4a14-ad88-7d73d2d3a774.jpg"
                    alt="Химчистка дивана на дому в Краснодаре"
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    decoding="async"
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
                    fetchPriority="high"
                    decoding="async"
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

export function HowWeWork() {
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
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--teal-light)" }}>
                  <Icon name={step.icon} size={20} style={{ color: "var(--teal)" }} />
                </div>
                <span className="font-oswald font-bold text-2xl" style={{ color: "rgba(12,184,160,0.15)" }}>
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
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustRatings() {
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}22` }}>
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

export function Reviews() {
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