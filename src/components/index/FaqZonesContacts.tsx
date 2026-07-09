import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { DISTRICTS } from "@/data/districts";
import { SERVICES_DATA } from "@/data/services";
import { ymGoal } from "@/hooks/useYandexMetrika";
import { useInView, FAQ_ITEMS } from "@/components/index/IndexShared";

export function Faq() {
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

export function Zones() {
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

        <div className={`mt-10 ${inView ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--gray)" }}>Популярные запросы</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES_DATA.slice(0, 3).flatMap((s) =>
              DISTRICTS.filter((d) => d.type === "district").map((d) => (
                <Link
                  key={`${s.slug}-${d.slug}`}
                  to={`/uslugi/${s.slug}/${d.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]"
                  style={{ borderColor: "var(--border)", color: "var(--dark)", background: "white" }}
                >
                  {s.shortTitle} — {d.name}
                </Link>
              ))
            )}
          </div>
        </div>

        <div className={`mt-8 text-center ${inView ? "animate-fade-up stagger-4" : "opacity-0"}`}>
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

function ContactForm({ inView }: { inView: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !consent) return;
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
        ymGoal("form_submit");
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
          disabled={!name || !phone || !consent || loading}
        >
          {loading ? "Отправляем..." : "Вызвать мастера"}
        </button>
        {error && (
          <p className="text-xs text-center font-semibold" style={{ color: "#e53e3e" }}>
            Не удалось отправить заявку. Позвоните нам: <a href="tel:+79189682882" style={{ color: "#e53e3e" }}>8(918)968-28-82</a>
          </p>
        )}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 shrink-0 accent-teal-500"
            style={{ width: 15, height: 15 }}
          />
          <span className="text-xs leading-snug" style={{ color: "var(--gray)" }}>
            Я даю согласие на обработку{" "}
            <a href="/privacy" className="underline" style={{ color: "var(--teal)" }}>персональных данных</a>
          </span>
        </label>
      </div>
    </div>
  );
}

export function Contacts() {
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
                { icon: "Phone", label: "Телефон", value: "8(918)968-28-82", sub: "Звоните в любое время", link: "tel:+79189682882", goal: "phone_click" },
                { icon: "MessageSquare", label: "WhatsApp", value: "Написать в WhatsApp", sub: "Онлайн 9:00–22:00", link: "https://wa.me/79189682882", goal: "whatsapp_click" },
                { icon: "MessageCircle", label: "MAX", value: "Написать в MAX", sub: "Онлайн 9:00–22:00", link: "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc", goal: "max_click" },
                { icon: "Users", label: "ВКонтакте", value: "Группа ВКонтакте", sub: "Отзывы и акции", link: "https://vk.com/club239497134", goal: "vk_click" },
                { icon: "MapPin", label: "Адрес", value: "Краснодар", sub: "Работаем по всему городу и краю", link: null, goal: null },
              ].map((c) => {
                const Tag = c.link ? "a" : "div";
                return (
                  <Tag
                    key={c.label}
                    {...(c.link ? { href: c.link, target: c.link.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    onClick={() => c.goal && ymGoal(c.goal)}
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