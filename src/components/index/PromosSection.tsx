import Icon from "@/components/ui/icon";
import { scrollToId, useInView } from "@/components/index/IndexShared";

const PROMOS = [
  {
    icon: "Gift",
    badge: "−10%",
    title: "Скидка на первый заказ",
    text: "Оформите заявку на сайте впервые — скидка 10% на любую услугу химчистки мебели.",
    color: "var(--teal)",
  },
  {
    icon: "Heart",
    badge: "−10%",
    title: "Скидка пенсионерам",
    text: "Постоянная скидка 10% на все услуги химчистки для пенсионеров. Достаточно сообщить об этом при заказе.",
    color: "#c9482e",
  },
];

export function Promos() {
  const { ref, inView } = useInView();
  return (
    <section id="promos" className="py-20" style={{ background: "var(--light-bg)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Акции</span>
          <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
            Выгодные предложения
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PROMOS.map((p, i) => (
            <div
              key={p.title}
              className={`card-clean p-6 md:p-8 flex flex-col items-start ${inView ? `animate-fade-up stagger-${i + 2}` : "opacity-0"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,184,160,0.1)" }}>
                  <Icon name={p.icon} size={22} style={{ color: p.color }} />
                </div>
                <span className="font-oswald font-bold text-2xl" style={{ color: p.color }}>{p.badge}</span>
              </div>
              <h3 className="font-oswald font-bold text-lg mb-2" style={{ color: "var(--dark)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--gray)" }}>{p.text}</p>
              <button
                onClick={() => scrollToId("contacts")}
                className="mt-auto text-sm font-semibold flex items-center gap-1.5 transition-all hover:gap-2.5"
                style={{ color: "var(--teal)" }}
              >
                Оставить заявку <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
