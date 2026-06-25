import Icon from "@/components/ui/icon";
import type { PageSeo, SeoData, PageForm } from "./seoAdminTypes";

interface Props {
  data: SeoData | null;
  selectedPage: PageSeo | null;
  form: PageForm;
  setForm: (f: PageForm) => void;
  saving: boolean;
  saved: boolean;
  onSelectPage: (page: PageSeo) => void;
  onSavePage: () => void;
}

export function SeoAdminPages({ data, selectedPage, form, setForm, saving, saved, onSelectPage, onSavePage }: Props) {
  const titleLen = form.title.length;
  const descLen = form.description.length;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Список страниц */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          Страницы ({data?.pages.length})
        </p>
        {data?.pages.map((page) => (
          <button
            key={page.page_key}
            onClick={() => onSelectPage(page)}
            className="w-full text-left px-4 py-3 rounded-xl transition-all"
            style={{
              background: selectedPage?.page_key === page.page_key ? "rgba(12,184,160,0.15)" : "#1e293b",
              border: selectedPage?.page_key === page.page_key ? "1px solid var(--teal)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-sm font-medium text-white">{page.page_label}</div>
            <div className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{page.page_key}</div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: page.title ? "rgba(12,184,160,0.2)" : "rgba(255,255,255,0.06)", color: page.title ? "var(--teal)" : "rgba(255,255,255,0.3)" }}>
                Title {page.title ? "✓" : "—"}
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: page.description ? "rgba(12,184,160,0.2)" : "rgba(255,255,255,0.06)", color: page.description ? "var(--teal)" : "rgba(255,255,255,0.3)" }}>
                Desc {page.description ? "✓" : "—"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Редактор */}
      <div className="lg:col-span-2">
        {!selectedPage ? (
          <div className="rounded-2xl flex flex-col items-center justify-center gap-3 py-20" style={{ background: "#1e293b", border: "1px dashed rgba(255,255,255,0.1)" }}>
            <Icon name="MousePointerClick" size={32} style={{ color: "rgba(255,255,255,0.2)" }} />
            <p style={{ color: "rgba(255,255,255,0.3)" }} className="text-sm">Выберите страницу слева</p>
          </div>
        ) : (
          <div className="rounded-2xl p-6 space-y-5" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base">{selectedPage.page_label}</h2>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{selectedPage.page_key}</p>
              </div>
              <a
                href={`https://arenda-chistoty.online${selectedPage.page_key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              >
                <Icon name="ExternalLink" size={12} />
                Открыть
              </a>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Title</label>
                <span className="text-xs" style={{ color: titleLen > 60 ? "#ef4444" : titleLen > 50 ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>
                  {titleLen}/60
                </span>
              </div>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                placeholder="Заголовок страницы для поисковиков"
              />
              {/* Превью */}
              {form.title && (
                <div className="mt-2 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Превью в Яндексе:</p>
                  <p className="text-sm" style={{ color: "#4285f4" }}>{form.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#0d904f" }}>arenda-chistoty.online{selectedPage.page_key}</p>
                  {form.description && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{form.description.slice(0, 120)}{form.description.length > 120 ? "…" : ""}</p>}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Description</label>
                <span className="text-xs" style={{ color: descLen > 160 ? "#ef4444" : descLen > 140 ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>
                  {descLen}/160
                </span>
              </div>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                placeholder="Описание страницы для поисковиков (до 160 символов)"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.6)" }}>Keywords</label>
              <textarea
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                placeholder="ключевое слово 1, ключевое слово 2, ..."
              />
            </div>

            {/* Schema.org */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.6)" }}>Schema.org JSON-LD</label>
              <textarea
                value={form.schema_json}
                onChange={(e) => setForm({ ...form, schema_json: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", color: "#6ee7db", fontSize: "11px" }}
                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "CleaningService"\n}'}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onSavePage}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                style={{ background: "var(--teal)", color: "white" }}
              >
                <Icon name={saving ? "Loader" : "Save"} size={15} className={saving ? "animate-spin" : ""} />
                {saving ? "Сохраняем..." : "Сохранить"}
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--teal)" }}>
                  <Icon name="CheckCircle" size={15} />
                  Сохранено
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
