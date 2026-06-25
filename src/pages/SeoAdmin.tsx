import { useState } from "react";
import Icon from "@/components/ui/icon";
import { API_URL, INDEXNOW_URL } from "./seoAdmin/seoAdminTypes";
import type { SeoData, Tab, PageSeo, PageForm, IndexNowResult } from "./seoAdmin/seoAdminTypes";
import { SeoAdminLogin } from "./seoAdmin/SeoAdminLogin";
import { SeoAdminPages } from "./seoAdmin/SeoAdminPages";
import { SeoAdminRobots, SeoAdminSitemap, SeoAdminIndexNow } from "./seoAdmin/SeoAdminTools";

export default function SeoAdmin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<SeoData | null>(null);
  const [tab, setTab] = useState<Tab>("pages");
  const [selectedPage, setSelectedPage] = useState<PageSeo | null>(null);
  const [form, setForm] = useState<PageForm>({ title: "", description: "", keywords: "", schema_json: "" });
  const [robots, setRobots] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [indexNowLoading, setIndexNowLoading] = useState(false);
  const [indexNowResult, setIndexNowResult] = useState<IndexNowResult | null>(null);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${password}` };

  async function login() {
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch(API_URL, { headers });
      if (res.status === 401) { setAuthError(true); return; }
      const json: SeoData = await res.json();
      setData(json);
      setRobots(json.robots);
      setAuthed(true);
    } catch {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  }

  async function reload() {
    const res = await fetch(API_URL, { headers });
    const json: SeoData = await res.json();
    setData(json);
    setRobots(json.robots);
  }

  function selectPage(page: PageSeo) {
    setSelectedPage(page);
    setForm({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      schema_json: page.schema_json,
    });
    setSaved(false);
  }

  async function savePage() {
    if (!selectedPage) return;
    setSaving(true);
    setSaved(false);
    await fetch(`${API_URL}/page`, {
      method: "POST",
      headers,
      body: JSON.stringify({ page_key: selectedPage.page_key, ...form }),
    });
    setSaving(false);
    setSaved(true);
    await reload();
    setTimeout(() => setSaved(false), 3000);
  }

  async function saveRobots() {
    setSaving(true);
    setSaved(false);
    await fetch(`${API_URL}/robots`, {
      method: "POST",
      headers,
      body: JSON.stringify({ content: robots }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function sendIndexNow() {
    setIndexNowLoading(true);
    setIndexNowResult(null);
    try {
      const res = await fetch(INDEXNOW_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const json = await res.json();
      setIndexNowResult(json);
    } finally {
      setIndexNowLoading(false);
    }
  }

  if (!authed) {
    return (
      <SeoAdminLogin
        password={password}
        setPassword={setPassword}
        loading={loading}
        authError={authError}
        onLogin={login}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f172a", color: "white" }}>
      {/* Шапка */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#1e293b" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--teal)" }}>
            <Icon name="Search" size={16} className="text-white" />
          </div>
          <span className="font-bold text-base">SEO-дашборд</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(12,184,160,0.2)", color: "var(--teal)" }}>
            arenda-chistoty.online
          </span>
        </div>
        <button
          onClick={() => { setAuthed(false); setPassword(""); setData(null); }}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <Icon name="LogOut" size={13} />
          Выйти
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Вкладки */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ background: "#1e293b" }}>
          {([
            { key: "pages", label: "Страницы", icon: "FileText" },
            { key: "robots", label: "Robots.txt", icon: "Bot" },
            { key: "sitemap", label: "Sitemap", icon: "Map" },
            { key: "indexnow", label: "IndexNow", icon: "Zap" },
          ] as { key: Tab; label: string; icon: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t.key ? "var(--teal)" : "transparent",
                color: tab === t.key ? "white" : "rgba(255,255,255,0.5)",
              }}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "pages" && (
          <SeoAdminPages
            data={data}
            selectedPage={selectedPage}
            form={form}
            setForm={setForm}
            saving={saving}
            saved={saved}
            onSelectPage={selectPage}
            onSavePage={savePage}
          />
        )}

        {tab === "robots" && (
          <SeoAdminRobots
            robots={robots}
            setRobots={setRobots}
            saving={saving}
            saved={saved}
            onSave={saveRobots}
          />
        )}

        {tab === "sitemap" && <SeoAdminSitemap />}

        {tab === "indexnow" && (
          <SeoAdminIndexNow
            loading={indexNowLoading}
            result={indexNowResult}
            onSend={sendIndexNow}
          />
        )}
      </div>
    </div>
  );
}
