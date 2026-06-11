import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";
import { WORKS, WORK_CATEGORIES, WorkCase } from "@/data/works";

const ITEMS_PER_PAGE = 6;

function WorkCard({ work, onClick }: { work: WorkCase; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-clean overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={work.beforeImg}
          alt={`До — ${work.title}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
        />
        <img
          src={work.afterImg}
          alt={`После — ${work.title}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "var(--teal)", color: "white" }}
          >
            {work.categoryLabel}
          </span>
        </div>
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300"
          style={{
            background: hovered ? "var(--yellow)" : "rgba(0,0,0,0.55)",
            color: hovered ? "var(--dark)" : "white",
          }}
        >
          <span>{hovered ? "После" : "До"}</span>
          <Icon name="ArrowLeftRight" size={12} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-oswald font-bold text-base mb-1" style={{ color: "var(--dark)" }}>
          {work.title}
        </h3>
        <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--gray)" }}>
          {work.stain}
        </p>
        <button
          className="text-xs font-semibold flex items-center gap-1 transition-colors"
          style={{ color: "var(--teal)" }}
        >
          Подробнее
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>
    </div>
  );
}

function WorkModal({ work, onClose }: { work: WorkCase; onClose: () => void }) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(13,31,30,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative" style={{ aspectRatio: "16/9" }}>
          <img
            src={work.beforeImg}
            alt="До"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: showAfter ? 0 : 1 }}
          />
          <img
            src={work.afterImg}
            alt="После"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: showAfter ? 1 : 0 }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Icon name="X" size={18} style={{ color: "white" }} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-0 rounded-full overflow-hidden shadow-lg z-10">
            <button
              onClick={() => setShowAfter(false)}
              className="px-5 py-2 text-sm font-semibold transition-all"
              style={{
                background: !showAfter ? "var(--yellow)" : "rgba(255,255,255,0.85)",
                color: "var(--dark)",
              }}
            >
              До
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className="px-5 py-2 text-sm font-semibold transition-all"
              style={{
                background: showAfter ? "var(--yellow)" : "rgba(255,255,255,0.85)",
                color: "var(--dark)",
              }}
            >
              После
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--teal-light)", color: "var(--teal-dark)" }}
            >
              {work.categoryLabel}
            </span>
          </div>
          <h2 className="font-oswald font-bold text-2xl mb-2" style={{ color: "var(--dark)" }}>
            {work.title}
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--gray)" }}>
            {work.description}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl p-3" style={{ background: "#fff3f3" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "#c0392b" }}>Загрязнение</p>
              <p className="text-sm" style={{ color: "var(--dark)" }}>{work.stain}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "var(--teal-light)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--teal-dark)" }}>Результат</p>
              <p className="text-sm" style={{ color: "var(--dark)" }}>{work.result}</p>
            </div>
          </div>
          <a
            href="tel:+79180000000"
            className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Icon name="Phone" size={16} />
            Заказать такую же чистку
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWork, setSelectedWork] = useState<WorkCase | null>(null);

  const filtered = activeCategory === "all"
    ? WORKS
    : WORKS.filter((w) => w.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      <Seo
        title="Наши работы — фото до и после химчистки мебели | Аренда Чистоты"
        description="Реальные примеры химчистки диванов, матрасов, кресел и ковров в Краснодаре. Фото до и после. Выезд на дом — от 1 500 ₽."
        keywords="химчистка мебели фото до после, примеры работ химчистки краснодар, портфолио химчистка диванов, до и после химчистка диван, результаты химчистки краснодар"
        path="/nashi-raboty"
        breadcrumbs={[{ label: "Наши работы" }]}
      />

      <div style={{ background: "var(--light-bg)", minHeight: "100vh" }}>
        <div className="container max-w-5xl mx-auto px-4 py-8">

          {/* Хлебные крошки */}
          <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--gray)" }}>
            <Link to="/" className="hover:text-teal transition-colors" style={{ color: "var(--teal)" }}>
              Главная
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span>Наши работы</span>
          </nav>

          {/* Заголовок */}
          <div className="mb-8">
            <span className="section-tag mb-3">Портфолио</span>
            <h1 className="font-oswald font-bold text-3xl sm:text-4xl mb-3" style={{ color: "var(--dark)" }}>
              Наши работы: реальные примеры химчистки мебели в Краснодаре
            </h1>
            <p className="text-base" style={{ color: "var(--gray)" }}>
              Только честные фото «до» и «после» — без фотошопа и постановочных снимков.
              Наведите на карточку, чтобы увидеть результат.
            </p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-2 mb-8">
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategory(cat.key)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat.key
                    ? { background: "var(--teal)", color: "white" }
                    : { background: "white", color: "var(--gray)", border: "1px solid #e5e7eb" }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Сетка кейсов */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {paginated.map((work) => (
                <WorkCard key={work.id} work={work} onClick={() => setSelectedWork(work)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20" style={{ color: "var(--gray)" }}>
              <Icon name="ImageOff" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">Пока нет работ в этой категории</p>
            </div>
          )}

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ border: "1px solid #e5e7eb", color: "var(--gray)" }}
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                  style={
                    currentPage === page
                      ? { background: "var(--teal)", color: "white" }
                      : { border: "1px solid #e5e7eb", color: "var(--gray)" }
                  }
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ border: "1px solid #e5e7eb", color: "var(--gray)" }}
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          )}

          {/* Видео */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <span className="section-tag mb-2">Видео</span>
              <h2 className="font-oswald font-bold text-2xl sm:text-3xl mt-3" style={{ color: "var(--dark)" }}>
                Смотрите процесс чистки
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/a09dded2-1bce-46ac-8780-85fe20b3c779.mp4",
                "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/8c635586-f22a-4b62-a465-7d9b741cd25c.mp4",
              ].map((src, i) => (
                <div key={i} className="card-clean overflow-hidden">
                  <video
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full"
                    style={{ aspectRatio: "16/9", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Блок CTA */}
          <div
            className="rounded-2xl p-8 text-center mb-12"
            style={{ background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)" }}
          >
            <h2 className="font-oswald font-bold text-2xl sm:text-3xl text-white mb-2">
              Хотите такой же результат?
            </h2>
            <p className="text-white/80 mb-6 text-sm">
              Выезд мастера бесплатно. Оценка стоимости на месте.
            </p>
            <a
              href="tel:+79180000000"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
            >
              <Icon name="Phone" size={18} />
              Заказать чистку
            </a>
          </div>

          {/* SEO-текст */}
          <div className="prose max-w-none">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "white", border: "1px solid rgba(12,184,160,0.12)" }}
            >
              <h2 className="font-oswald font-bold text-xl mb-4" style={{ color: "var(--dark)" }}>
                О нашей технологии химчистки мебели
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
                <p>
                  <strong style={{ color: "var(--dark)" }}>Химчистка диванов в Краснодаре</strong> — одна из наших
                  ключевых услуг. Мы используем профессиональное оборудование итальянских и немецких
                  производителей: аппараты горячей экстракции удаляют загрязнения из глубины ворса,
                  а не только с поверхности. Результат сохраняется 6–12 месяцев при обычной
                  эксплуатации.
                </p>
                <p>
                  <strong style={{ color: "var(--dark)" }}>Химчистка матрасов</strong> — особенно важна для
                  семей с детьми и аллергиков. В матрасе накапливаются пылевые клещи, споры плесени
                  и органические загрязнения. После нашей обработки матрас проходит ультрафиолетовую
                  санацию и дезинфицирующую обработку — безопасную для детей и домашних животных.
                </p>
                <p>
                  <strong style={{ color: "var(--dark)" }}>Химчистка кресел и мягкой мебели</strong> на деревянном
                  каркасе требует особой аккуратности: мы защищаем деревянные элементы и фурнитуру
                  при работе с влажными составами. Кожаную мебель дополнительно обрабатываем
                  кондиционирующим составом, восстанавливающим эластичность кожи.
                </p>
                <p>
                  Все работы выполняем <strong style={{ color: "var(--dark)" }}>с выездом на дом в Краснодаре</strong>.
                  Время высыхания — 2–4 часа. Принимаем заказы ежедневно с 8:00 до 21:00.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Плавающая кнопка */}
      <a
        href="tel:+79180000000"
        className="fixed bottom-6 right-6 z-50 btn-primary flex items-center gap-2 px-5 py-3 text-sm font-semibold shadow-xl"
        style={{ boxShadow: "0 8px 32px rgba(255,226,39,0.45)" }}
      >
        <Icon name="Phone" size={16} />
        Заказать выезд
      </a>

      {/* Попап */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </>
  );
}