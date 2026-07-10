import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useInView, GALLERY_ITEMS } from "@/components/index/IndexShared";

export function Gallery() {
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
            className={`px-6 py-2.5 text-sm font-oswald font-semibold flex items-center gap-2 whitespace-nowrap rounded-full ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}
            style={{ background: "var(--yellow)", color: "var(--dark)" }}
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
                decoding="async"
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
        <div className={`text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 ${inView ? "animate-fade-up stagger-6" : "opacity-0"}`}>
          <Link to="/nashi-raboty" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm font-oswald">
            <Icon name="Images" size={18} />
            Смотреть все работы
          </Link>
          <Link
            to="/istorii-klientov"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-oswald font-semibold rounded-full border transition-all hover:bg-gray-50"
            style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
          >
            <Icon name="BookOpen" size={18} />
            Истории клиентов
          </Link>
        </div>
      </div>
    </section>
  );
}