import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { STORIES } from "@/data/stories";
import logo from "@/assets/logo.webp";

const PHONE = "+79189682882";
const PHONE_DISPLAY = "8(918)968-28-82";

export default function Stories() {
  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title="Истории клиентов — реальные кейсы химчистки мебели | Аренда Чистоты"
        description="Реальные истории клиентов: как мы решали сложные задачи химчистки диванов, кресел, матрасов, ковров и автосалонов в Краснодаре. Фото до и после, подробный разбор."
        keywords="истории клиентов химчистка мебели, кейсы химчистки краснодар, отзывы с фото химчистка, реальные примеры химчистки мебели"
        path="/istorii-klientov"
        breadcrumbs={[{ label: "Истории клиентов" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Истории клиентов Аренда Чистоты",
          description: "Подборка реальных кейсов химчистки мебели с фото до и после",
        }}
      />

      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Аренда Чистоты"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              loading="eager"
              decoding="async"
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Истории клиентов" }]} />

        <div className="text-center mb-12">
          <h1
            className="font-oswald font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)" }}
          >
            Истории клиентов
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--gray)" }}>
            Реальные задачи, с которыми к нам обращаются клиенты в Краснодаре — и как мы их решаем
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((s) => (
            <Link
              key={s.slug}
              to={`/istorii-klientov/${s.slug}`}
              className="card-clean overflow-hidden group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.beforeImg}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "var(--teal)", color: "white" }}
                >
                  {s.categoryLabel}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-oswald font-bold text-base leading-snug mb-2" style={{ color: "var(--dark)" }}>
                  {s.title}
                </h2>
                <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--gray)" }}>
                  {s.intro}
                </p>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#f0f0f0" }}>
                  <span className="text-xs font-medium" style={{ color: "var(--gray)" }}>{s.clientName}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "var(--teal)" }}>
                    Читать <Icon name="ArrowRight" size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-8 md:p-12 text-center mt-12" style={{ background: "var(--teal)" }}>
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl mb-3">
            Есть похожая задача?
          </h2>
          <p className="text-white/80 text-sm mb-6">Расскажите о своей проблеме — мастер оценит и предложит решение</p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3 rounded-full text-base transition-all hover:opacity-90"
            style={{ color: "var(--teal)" }}
          >
            <Icon name="Phone" size={18} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </main>
    </div>
  );
}
