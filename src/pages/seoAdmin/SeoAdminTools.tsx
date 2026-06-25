import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { IndexNowResult } from "./seoAdminTypes";
import { INDEXNOW_URL } from "./seoAdminTypes";

// ── Robots ────────────────────────────────────────────────────────────────────

interface RobotsProps {
  robots: string;
  setRobots: (v: string) => void;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}

export function SeoAdminRobots({ robots, setRobots, saving, saved, onSave }: RobotsProps) {
  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl p-6" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <Icon name="Bot" size={18} style={{ color: "var(--teal)" }} />
          <h2 className="font-bold">robots.txt</h2>
        </div>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Управляет тем, какие страницы поисковики могут индексировать.{" "}
          <code className="px-1 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.08)" }}>Disallow:</code>{" "}
          — закрыть страницу от индексации.
        </p>
        <textarea
          value={robots}
          onChange={(e) => setRobots(e.target.value)}
          rows={18}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono"
          style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", color: "#6ee7db", fontSize: "12px", lineHeight: "1.7" }}
        />
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40"
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
    </div>
  );
}

// ── Sitemap ───────────────────────────────────────────────────────────────────

export function SeoAdminSitemap() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IndexNowResult | null>(null);

  async function sendIndexNow() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(INDEXNOW_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const json = await res.json();
      setResult(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl p-6" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <Icon name="Map" size={18} style={{ color: "var(--teal)" }} />
          <h2 className="font-bold">Sitemap.xml</h2>
        </div>
        <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
          Sitemap генерируется автоматически на основе всех страниц сайта и обновляется при каждом деплое.
        </p>
        <div className="space-y-3">
          <a
            href="https://arenda-chistoty.online/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
            style={{ background: "rgba(12,184,160,0.1)", border: "1px solid rgba(12,184,160,0.3)" }}
          >
            <div className="flex items-center gap-3">
              <Icon name="FileCode" size={16} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-medium">sitemap.xml</span>
            </div>
            <Icon name="ExternalLink" size={14} style={{ color: "var(--teal)" }} />
          </a>
          <a
            href="https://arenda-chistoty.online/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-sm font-medium">robots.txt</span>
            </div>
            <Icon name="ExternalLink" size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          </a>
          <a
            href="https://webmaster.yandex.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
            style={{ background: "rgba(255,68,51,0.08)", border: "1px solid rgba(255,68,51,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <Icon name="Globe" size={16} style={{ color: "#FF4433" }} />
              <span className="text-sm font-medium">Яндекс.Вебмастер</span>
            </div>
            <Icon name="ExternalLink" size={14} style={{ color: "#FF4433" }} />
          </a>
        </div>

        <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Статистика sitemap</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Страниц всего", value: "39" },
              { label: "Услуги", value: "12" },
              { label: "Районы", value: "20" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: "#0f172a" }}>
                <div className="font-bold text-xl" style={{ color: "var(--teal)" }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Быстрая отправка в Яндекс</p>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            После публикации изменений отправьте все URL в Яндекс через IndexNow — страницы попадут в индекс быстрее.
          </p>
          <button
            onClick={sendIndexNow}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "#facc15", color: "#0f172a" }}
          >
            <Icon name={loading ? "Loader" : "Zap"} size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "Отправляем..." : "Отправить sitemap в Яндекс"}
          </button>

          {result && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
                <Icon name="CheckCircle" size={15} />
                Отправлено {result.urls_sent} URL
              </div>
              <div className="space-y-1.5">
                {result.results.map((r) => (
                  <div
                    key={r.endpoint}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
                    style={{ background: "#0f172a", border: `1px solid ${r.status === 202 || r.status === 200 ? "rgba(12,184,160,0.3)" : "rgba(255,100,100,0.3)"}` }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{r.endpoint.replace("https://", "")}</span>
                    <span className="font-bold" style={{ color: r.status === 202 || r.status === 200 ? "var(--teal)" : "#f87171" }}>
                      {r.status === 202 || r.status === 200 ? `✓ ${r.status}` : `✗ ${r.status}`}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>202 — URL приняты в очередь на обход</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── IndexNow ──────────────────────────────────────────────────────────────────

interface IndexNowProps {
  loading: boolean;
  result: IndexNowResult | null;
  onSend: () => void;
}

export function SeoAdminIndexNow({ loading, result, onSend }: IndexNowProps) {
  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl p-6" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Zap" size={18} style={{ color: "#facc15" }} />
          <h2 className="font-bold">IndexNow</h2>
        </div>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
          Моментально уведомляет Яндекс об обновлениях сайта. Нажмите кнопку после публикации новых страниц или изменений.
        </p>

        <button
          onClick={onSend}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
          style={{ background: "#facc15", color: "#0f172a" }}
        >
          <Icon name={loading ? "Loader" : "Send"} size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Отправляем..." : "Отправить все URL в Яндекс"}
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
              <Icon name="CheckCircle" size={16} />
              Отправлено {result.urls_sent} URL
            </div>
            <div className="space-y-2">
              {result.results.map((r) => (
                <div
                  key={r.endpoint}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm"
                  style={{ background: "#0f172a", border: `1px solid ${r.status === 202 || r.status === 200 ? "rgba(12,184,160,0.3)" : "rgba(255,100,100,0.3)"}` }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{r.endpoint.replace("https://", "")}</span>
                  <span className="font-bold" style={{ color: r.status === 202 || r.status === 200 ? "var(--teal)" : "#f87171" }}>
                    {r.status === 202 || r.status === 200 ? `✓ ${r.status}` : `✗ ${r.status}`}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>202 — URL приняты в очередь на обход</p>
          </div>
        )}
      </div>
    </div>
  );
}