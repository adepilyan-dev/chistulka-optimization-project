import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { debounce } from "lodash"; // или реализовать свой debounce

// 🌀 Ленивая загрузка иконок (не критичны для первого экрана)
const Icon = lazy(() => import("@/components/ui/icon"));

const API_URL =
  "https://functions.poehali.dev/0cb39cbb-0651-41ab-bd6f-8c9932206449";

interface PageSeo {
  page_key: string;
  page_label: string;
  title: string;
  description: string;
  keywords: string;
  schema_json: string;
  updated_at: string | null;
}

interface SeoData {
  pages: PageSeo[];
  robots: string;
}

type Tab = "pages" | "robots" | "sitemap";

// ✅ Исправлен URL сайта
const SITE_URL = "https://arenda-chistoty.ru";
const SITE_DOMAIN = "arenda-chistoty.ru";

// 📊 Статистика для sitemap
const SITEMAP_STATS = [
  { label: "Страниц всего", value: "33" },
  { label: "Услуги", value: "6" },
  { label: "Районы", value: "20" },
];

export default function SeoAdmin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<SeoData | null>(null);
  const [tab, setTab] = useState<Tab>("pages");
  const [selectedPage, setSelectedPage] = useState<PageSeo | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    keywords: "",
    schema_json: "",
  });
  const [robots, setRobots] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // 🔒 Мемоизация заголовков
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    }),
    [password],
  );

  // ⚡ Функция логина с улучшенной обработкой
  const login = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch(API_URL, { headers });
      if (res.status === 401) {
        setAuthError(true);
        return;
      }
      if (!res.ok) throw new Error("Network response was not ok");
      const json: SeoData = await res.json();
      setData(json);
      setRobots(json.robots);
      setAuthed(true);
    } catch {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  }, [password, headers]);

  // 🔄 Функция перезагрузки
  const reload = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { headers });
      if (!res.ok) throw new Error("Failed to reload");
      const json: SeoData = await res.json();
      setData(json);
      setRobots(json.robots);
    } catch {
      // Ошибка загрузки
    }
  }, [headers]);

  // 📝 Выбор страницы
  const selectPage = useCallback((page: PageSeo) => {
    setSelectedPage(page);
    setForm({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      schema_json: page.schema_json,
    });
    setSaved(false);
  }, []);

  // 💾 Сохранение страницы
  const savePage = useCallback(async () => {
    if (!selectedPage) return;
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`${API_URL}/page`, {
        method: "POST",
        headers,
        body: JSON.stringify({ page_key: selectedPage.page_key, ...form }),
      });
      setSaved(true);
      await reload();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // Ошибка сохранения
    } finally {
      setSaving(false);
    }
  }, [selectedPage, form, headers, reload]);

  // 💾 Сохранение robots.txt
  const saveRobots = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`${API_URL}/robots`, {
        method: "POST",
        headers,
        body: JSON.stringify({ content: robots }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // Ошибка сохранения
    } finally {
      setSaving(false);
    }
  }, [robots, headers]);

  // 📐 Валидация длины
  const titleLen = form.title.length;
  const descLen = form.description.length;

  // 🔑 Автоматический вход по Enter
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") login();
    },
    [login],
  );

  // ⚡ Если не авторизован — показываем форму входа
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0f172a" }}
      >
        <div
          className="w-full max-w-sm mx-4 rounded-2xl p-8"
          style={{
            background: "#1e293b",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--teal)" }}
            >
              <Suspense
                fallback={<span className="text-white text-xl">🔒</span>}
              >
                <Icon name="ShieldCheck" size={20} className="text-white" />
              </Suspense>
            </div>
            <div>
              <div className="font-bold text-white text-base">SEO-панель</div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {SITE_DOMAIN}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "#0f172a",
                border: authError
                  ? "1px solid #ef4444"
                  : "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
              autoFocus
            />
            {authError && (
              <p className="text-xs" style={{ color: "#ef4444" }}>
                Неверный пароль
              </p>
            )}
            <button
              onClick={login}
              disabled={!password || loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 hover:opacity-90"
              style={{ background: "var(--teal)", color: "white" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Вход...
                </span>
              ) : (
                "Войти"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Основной рендер
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0f172a", color: "white" }}
    >
      {/* 🏷️ Шапка */}
      <div
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#1e293b" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--teal)" }}
          >
            <Suspense fallback={<span className="text-white text-sm">🔍</span>}>
              <Icon name="Search" size={16} className="text-white" />
            </Suspense>
          </div>
          <span className="font-bold text-base">SEO-дашборд</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(12,184,160,0.2)", color: "var(--teal)" }}
          >
            {SITE_DOMAIN}
          </span>
        </div>
        <button
          onClick={() => {
            setAuthed(false);
            setPassword("");
            setData(null);
          }}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <Suspense fallback={<span>🚪</span>}>
            <Icon name="LogOut" size={13} />
          </Suspense>
          Выйти
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 📑 Вкладки */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "#1e293b" }}
        >
          {(
            [
              { key: "pages", label: "Страницы", icon: "FileText" },
              { key: "robots", label: "Robots.txt", icon: "Bot" },
              { key: "sitemap", label: "Sitemap", icon: "Map" },
            ] as { key: Tab; label: string; icon: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t.key ? "var(--teal)" : "transparent",
                color: tab === t.key ? "white" : "rgba(255,255,255,0.5)",
              }}
            >
              <Suspense
                fallback={<span className="w-3.5 h-3.5 inline-block" />}
              >
                <Icon name={t.icon} size={14} />
              </Suspense>
              {t.label}
            </button>
          ))}
        </div>

        {/* 📄 Вкладка: Страницы */}
        {tab === "pages" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Список страниц */}
            <div className="space-y-2">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Страницы ({data?.pages.length || 0})
              </p>
              {data?.pages.map((page) => (
                <button
                  key={page.page_key}
                  onClick={() => selectPage(page)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all"
                  style={{
                    background:
                      selectedPage?.page_key === page.page_key
                        ? "rgba(12,184,160,0.15)"
                        : "#1e293b",
                    border:
                      selectedPage?.page_key === page.page_key
                        ? "1px solid var(--teal)"
                        : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="text-sm font-medium text-white">
                    {page.page_label}
                  </div>
                  <div
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {page.page_key}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: page.title
                          ? "rgba(12,184,160,0.2)"
                          : "rgba(255,255,255,0.06)",
                        color: page.title
                          ? "var(--teal)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      Title {page.title ? "✓" : "—"}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: page.description
                          ? "rgba(12,184,160,0.2)"
                          : "rgba(255,255,255,0.06)",
                        color: page.description
                          ? "var(--teal)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      Desc {page.description ? "✓" : "—"}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* ✏️ Редактор */}
            <div className="lg:col-span-2">
              {!selectedPage ? (
                <div
                  className="rounded-2xl flex flex-col items-center justify-center gap-3 py-20"
                  style={{
                    background: "#1e293b",
                    border: "1px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <Suspense fallback={<span className="text-2xl">👆</span>}>
                    <Icon
                      name="MousePointerClick"
                      size={32}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </Suspense>
                  <p
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    className="text-sm"
                  >
                    Выберите страницу слева
                  </p>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-6 space-y-5"
                  style={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-base">
                        {selectedPage.page_label}
                      </h2>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {selectedPage.page_key}
                      </p>
                    </div>
                    <a
                      href={`${SITE_URL}${selectedPage.page_key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      <Suspense fallback={<span>↗</span>}>
                        <Icon name="ExternalLink" size={12} />
                      </Suspense>
                      Открыть
                    </a>
                  </div>

                  {/* Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className="text-xs font-semibold"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Title
                      </label>
                      <span
                        className="text-xs"
                        style={{
                          color:
                            titleLen > 60
                              ? "#ef4444"
                              : titleLen > 50
                                ? "#f59e0b"
                                : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {titleLen}/60
                      </span>
                    </div>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500/50"
                      style={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      placeholder="Заголовок страницы для поисковиков"
                    />
                    {form.title && (
                      <div
                        className="mt-2 p-3 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p
                          className="text-xs mb-1"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Превью в Яндексе:
                        </p>
                        <p className="text-sm" style={{ color: "#4285f4" }}>
                          {form.title}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#0d904f" }}
                        >
                          {SITE_DOMAIN}
                          {selectedPage.page_key}
                        </p>
                        {form.description && (
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {form.description.slice(0, 120)}
                            {form.description.length > 120 ? "…" : ""}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className="text-xs font-semibold"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Description
                      </label>
                      <span
                        className="text-xs"
                        style={{
                          color:
                            descLen > 160
                              ? "#ef4444"
                              : descLen > 140
                                ? "#f59e0b"
                                : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {descLen}/160
                      </span>
                    </div>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-teal-500/50"
                      style={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      placeholder="Описание страницы для поисковиков (до 160 символов)"
                    />
                  </div>

                  {/* Keywords */}
                  <div>
                    <label
                      className="text-xs font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Keywords
                    </label>
                    <textarea
                      value={form.keywords}
                      onChange={(e) =>
                        setForm({ ...form, keywords: e.target.value })
                      }
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-teal-500/50"
                      style={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      placeholder="ключевое слово 1, ключевое слово 2, ..."
                    />
                  </div>

                  {/* Schema.org */}
                  <div>
                    <label
                      className="text-xs font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Schema.org JSON-LD
                    </label>
                    <textarea
                      value={form.schema_json}
                      onChange={(e) =>
                        setForm({ ...form, schema_json: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono focus:ring-2 focus:ring-teal-500/50"
                      style={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#6ee7db",
                        fontSize: "11px",
                      }}
                      placeholder={
                        '{\n  "@context": "https://schema.org",\n  "@type": "CleaningService"\n}'
                      }
                    />
                  </div>

                  {/* Кнопки */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={savePage}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 hover:opacity-90"
                      style={{ background: "var(--teal)", color: "white" }}
                    >
                      {saving ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Сохраняем...
                        </>
                      ) : (
                        <>
                          <Suspense fallback={<span>💾</span>}>
                            <Icon name="Save" size={15} />
                          </Suspense>
                          Сохранить
                        </>
                      )}
                    </button>
                    {saved && (
                      <span
                        className="flex items-center gap-1.5 text-sm"
                        style={{ color: "var(--teal)" }}
                      >
                        <Suspense fallback={<span>✅</span>}>
                          <Icon name="CheckCircle" size={15} />
                        </Suspense>
                        Сохранено
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🤖 Вкладка: Robots.txt */}
        {tab === "robots" && (
          <div className="max-w-2xl">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Suspense fallback={<span>🤖</span>}>
                  <Icon name="Bot" size={18} style={{ color: "var(--teal)" }} />
                </Suspense>
                <h2 className="font-bold">robots.txt</h2>
              </div>
              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Управляет тем, какие страницы поисковики могут индексировать.{" "}
                <code
                  className="px-1 py-0.5 rounded text-xs"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  Disallow:
                </code>{" "}
                — закрыть страницу от индексации.
              </p>
              <textarea
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                rows={18}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono focus:ring-2 focus:ring-teal-500/50"
                style={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#6ee7db",
                  fontSize: "12px",
                  lineHeight: "1.7",
                }}
              />
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={saveRobots}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 hover:opacity-90"
                  style={{ background: "var(--teal)", color: "white" }}
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Сохраняем...
                    </>
                  ) : (
                    <>
                      <Suspense fallback={<span>💾</span>}>
                        <Icon name="Save" size={15} />
                      </Suspense>
                      Сохранить
                    </>
                  )}
                </button>
                {saved && (
                  <span
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: "var(--teal)" }}
                  >
                    <Suspense fallback={<span>✅</span>}>
                      <Icon name="CheckCircle" size={15} />
                    </Suspense>
                    Сохранено
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 🗺️ Вкладка: Sitemap */}
        {tab === "sitemap" && (
          <div className="max-w-2xl">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Suspense fallback={<span>🗺️</span>}>
                  <Icon name="Map" size={18} style={{ color: "var(--teal)" }} />
                </Suspense>
                <h2 className="font-bold">Sitemap.xml</h2>
              </div>
              <p
                className="text-sm mb-5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Sitemap генерируется автоматически на основе всех страниц сайта
                и обновляется при каждом деплое.
              </p>
              <div className="space-y-3">
                <a
                  href={`${SITE_URL}/sitemap.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
                  style={{
                    background: "rgba(12,184,160,0.1)",
                    border: "1px solid rgba(12,184,160,0.3)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Suspense fallback={<span>📄</span>}>
                      <Icon
                        name="FileCode"
                        size={16}
                        style={{ color: "var(--teal)" }}
                      />
                    </Suspense>
                    <span className="text-sm font-medium">sitemap.xml</span>
                  </div>
                  <Suspense fallback={<span>↗</span>}>
                    <Icon
                      name="ExternalLink"
                      size={14}
                      style={{ color: "var(--teal)" }}
                    />
                  </Suspense>
                </a>
                <a
                  href={`${SITE_URL}/robots.txt`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Suspense fallback={<span>📝</span>}>
                      <Icon
                        name="FileText"
                        size={16}
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      />
                    </Suspense>
                    <span className="text-sm font-medium">robots.txt</span>
                  </div>
                  <Suspense fallback={<span>↗</span>}>
                    <Icon
                      name="ExternalLink"
                      size={14}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                  </Suspense>
                </a>
                <a
                  href="https://webmaster.yandex.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:opacity-80"
                  style={{
                    background: "rgba(255,68,51,0.08)",
                    border: "1px solid rgba(255,68,51,0.2)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Suspense fallback={<span>🌐</span>}>
                      <Icon
                        name="Globe"
                        size={16}
                        style={{ color: "#FF4433" }}
                      />
                    </Suspense>
                    <span className="text-sm font-medium">
                      Яндекс.Вебмастер
                    </span>
                  </div>
                  <Suspense fallback={<span>↗</span>}>
                    <Icon
                      name="ExternalLink"
                      size={14}
                      style={{ color: "#FF4433" }}
                    />
                  </Suspense>
                </a>
              </div>

              <div
                className="mt-6 rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Статистика sitemap
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SITEMAP_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="text-center p-3 rounded-lg"
                      style={{ background: "#0f172a" }}
                    >
                      <div
                        className="font-bold text-xl"
                        style={{ color: "var(--teal)" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
