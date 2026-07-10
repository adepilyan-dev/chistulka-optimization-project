import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/hooks/useYandexMetrika";
import { useMaxConsent, MAX_LINK } from "@/hooks/useMaxConsent";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { WORKS } from "@/data/works";

const PHONE = "+79189682882";
const PHONE_DISPLAY = "8(918)968-28-82";

const SERVICES = [
  { icon: "Sofa", label: "Диван", price: "от 3 500 ₽" },
  { icon: "Armchair", label: "Кресло", price: "от 1 500 ₽" },
  { icon: "Bed", label: "Матрас", price: "от 2 500 ₽" },
  { icon: "Square", label: "Ковёр", price: "от 200 ₽/м²" },
  { icon: "Car", label: "Автосалон", price: "от 4 000 ₽" },
  { icon: "Layers", label: "Угловой диван", price: "от 5 500 ₽" },
];

const BENEFITS = [
  { icon: "Clock", text: "Выезд в день обращения" },
  { icon: "Wind", text: "Сушка за 2–4 часа" },
  { icon: "Shield", text: "Безопасные средства" },
  { icon: "MapPin", text: "Работаем по всему Краснодару" },
];

const REVIEWS = [
  { name: "Анна К.", text: "Диван стал как новый! Мастер приехал через 2 часа после звонка, всё сделал аккуратно.", stars: 5 },
  { name: "Дмитрий В.", text: "Чистили угловой диван и два кресла. Пятна от кофе ушли полностью, запаха нет.", stars: 5 },
  { name: "Марина С.", text: "Матрас после домашних животных — запах исчез полностью, средства безопасные.", stars: 5 },
];

function WorkCard({ work }: { work: (typeof WORKS)[0] }) {
  const [showAfter, setShowAfter] = useState(false);
  const hasBoth = work.beforeImg !== work.afterImg;
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid var(--border)" }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={showAfter ? work.afterImg : work.beforeImg}
          alt={work.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: showAfter ? "var(--teal)" : "#e53e3e", color: "white" }}>
            {showAfter ? "После" : "До"}
          </span>
        </div>
        {hasBoth && (
          <button
            onClick={() => setShowAfter((v) => !v)}
            className="absolute bottom-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-full shadow transition-all hover:opacity-90"
            style={{ background: "white", color: "var(--dark)" }}
          >
            {showAfter ? "← До" : "После →"}
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold mb-1" style={{ color: "var(--teal)" }}>{work.categoryLabel}</div>
        <div className="font-semibold text-sm mb-1" style={{ color: "var(--dark)" }}>{work.title}</div>
        <div className="text-xs" style={{ color: "var(--gray)" }}>{work.result}</div>
      </div>
    </div>
  );
}

function Timer() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="font-mono font-bold text-yellow-300">
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

function LeadForm({ compact = false }: { compact?: boolean }) {
  const { consent, setConsent, openMax } = useMaxConsent();
  return (
    <div className={compact ? "" : "text-center"}>
      {!compact && (
        <p className="text-xs font-semibold mb-3 text-center" style={{ color: "var(--teal)" }}>
          🎁 Скидка 10% при заявке с сайта
        </p>
      )}
      <div className={compact ? "flex flex-col sm:flex-row items-start gap-3" : "space-y-2"}>
        <a
          href={MAX_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => openMax(e, () => ymGoal("max_click"))}
          className="w-full btn-primary py-3 font-oswald font-semibold text-base whitespace-nowrap flex items-center justify-center gap-2"
          style={compact ? { minWidth: 200 } : {}}
        >
          <Icon name="MessageCircle" size={18} />
          Написать в MAX
        </a>
        <ConsentCheckbox checked={consent} onChange={setConsent} center={!compact} />
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* Шапка */}
      <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-oswald font-bold text-lg" style={{ color: "var(--dark)" }}>Аренда Чистоты</div>
            <div className="text-xs" style={{ color: "var(--gray)" }}>Химчистка мебели в Краснодаре</div>
          </div>
          <a
            href={`tel:${PHONE}`}
            onClick={() => ymGoal("phone_click")}
            className="flex items-center gap-2 font-oswald font-semibold text-base px-5 py-2.5 rounded-full"
            style={{ background: "var(--yellow)", color: "var(--dark)" }}
          >
            <Icon name="Phone" size={16} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      {/* Акционный баннер */}
      <div className="py-2.5 text-center text-sm font-semibold text-white" style={{ background: "var(--teal)" }}>
        🎁 Скидка 10% при заявке с сайта · Акция действует ещё <Timer />
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16" style={{ background: "var(--dark)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(12,184,160,0.2)", color: "var(--teal)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--teal)" }}></span>
                Принимаем заявки · Краснодар
              </div>
              <h1 className="font-oswald font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
                Химчистка мебели<br />
                <span style={{ color: "var(--yellow)" }}>на дому в Краснодаре</span>
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                Выезжаем в день обращения. Диваны, кресла, матрасы, ковры — сушка за 2–4 часа. Безопасные средства, детям и животным не вредит.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {BENEFITS.map((b) => (
                  <div key={b.text} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,184,160,0.15)" }}>
                      <Icon name={b.icon} size={16} style={{ color: "var(--teal)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["АК", "ДВ", "МС"].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold" style={{ background: "var(--teal)", color: "white" }}>{i}</div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">★★★★★ 4.98 / 5</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>1 240 отзывов</div>
                </div>
              </div>
            </div>

            {/* Форма */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
              <h2 className="font-oswald font-bold text-xl mb-1" style={{ color: "var(--dark)" }}>Оставить заявку</h2>
              <p className="text-xs mb-5" style={{ color: "var(--gray)" }}>Перезвоним в течение 15 минут · Выезд бесплатно</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Цены */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-tag">Цены</span>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mt-3" style={{ color: "var(--dark)" }}>Сколько стоит химчистка?</h2>
            <p className="text-sm mt-2" style={{ color: "var(--gray)" }}>Точную цену назовёт мастер при осмотре — без скрытых доплат</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm text-center" style={{ border: "1px solid var(--border)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "var(--teal-light)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--teal)" }} />
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--dark)" }}>{s.label}</div>
                <div className="font-oswald font-bold text-base" style={{ color: "var(--teal)" }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как работаем */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-tag">Процесс</span>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mt-3" style={{ color: "var(--dark)" }}>Как проходит химчистка</h2>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { n: "1", icon: "Phone", title: "Звонок", text: "Оставьте заявку — перезвоним за 15 минут" },
              { n: "2", icon: "CalendarCheck", title: "Приезд", text: "Мастер приедет в удобное для вас время" },
              { n: "3", icon: "Sparkles", title: "Чистка", text: "Профессиональное оборудование и безопасные средства" },
              { n: "4", icon: "Wind", title: "Сушка", text: "Мебель высыхает за 2–4 часа прямо у вас дома" },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 relative" style={{ background: "var(--teal-light)" }}>
                  <Icon name={step.icon} size={24} style={{ color: "var(--teal)" }} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ background: "var(--teal)" }}>{step.n}</span>
                </div>
                <div className="font-semibold mb-1" style={{ color: "var(--dark)" }}>{step.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--gray)" }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши работы — до/после */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-tag">Наши работы</span>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mt-3" style={{ color: "var(--dark)" }}>Результаты до и после</h2>
            <p className="text-sm mt-2" style={{ color: "var(--gray)" }}>Реальные фото наших клиентов — без фотошопа</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKS.slice(0, 6).map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-tag">Отзывы</span>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mt-3" style={{ color: "var(--dark)" }}>Что говорят клиенты</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-1 mb-3 text-yellow-400 text-sm">{"★".repeat(r.stars)}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gray)" }}>«{r.text}»</p>
                <div className="font-semibold text-sm" style={{ color: "var(--dark)" }}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-форма снизу */}
      <section className="py-12" style={{ background: "var(--dark)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(255,226,39,0.15)", color: "var(--yellow)" }}>
            🎁 Скидка 10% при заявке с сайта
          </div>
          <h2 className="font-oswald font-bold text-white mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            Вызвать мастера на дом
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Бесплатный выезд и оценка · Перезвоним за 15 минут
          </p>
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <LeadForm compact />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              onClick={() => ymGoal("phone_click")}
              className="flex items-center gap-2 font-oswald font-semibold text-lg"
              style={{ color: "var(--yellow)" }}
            >
              <Icon name="Phone" size={20} />
              {PHONE_DISPLAY}
            </a>
            <span style={{ color: "rgba(255,255,255,0.2)" }} className="hidden sm:block">|</span>
            <a
              href="https://wa.me/79189682882"
              onClick={() => ymGoal("whatsapp_click")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#25d366" }}
            >
              <Icon name="MessageSquare" size={18} />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-6 text-center text-xs space-y-1.5" style={{ background: "#0a1918", color: "rgba(255,255,255,0.3)" }}>
        <div>© 2026 Аренда Чистоты · Краснодар</div>
        <div>Самозанятый Депилян Артур Ашотович · ИНН 232506771920 · 350075, Краснодарский край, г. Краснодар, ул. им. Селезнёва, д. 4Б</div>
        <div>
          <a href="/privacy" className="underline hover:text-white transition-colors">Политика конфиденциальности</a>
          {" · "}
          <a href="/" className="underline hover:text-white transition-colors">На главный сайт</a>
        </div>
      </footer>

      {/* Плавающая кнопка звонка */}
      <a
        href={`tel:${PHONE}`}
        onClick={() => ymGoal("phone_click")}
        aria-label="Позвонить"
        className="fixed bottom-6 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 animate-float"
        style={{ background: "var(--yellow)" }}
      >
        <Icon name="Phone" size={24} style={{ color: "var(--dark)" }} />
      </a>
    </div>
  );
}