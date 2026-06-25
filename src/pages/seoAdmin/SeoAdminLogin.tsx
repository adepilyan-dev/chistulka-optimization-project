import Icon from "@/components/ui/icon";

interface Props {
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  authError: boolean;
  onLogin: () => void;
}

export function SeoAdminLogin({ password, setPassword, loading, authError, onLogin }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
      <div className="w-full max-w-sm mx-4 rounded-2xl p-8" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--teal)" }}>
            <Icon name="ShieldCheck" size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-base">SEO-панель</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Аренда Чистоты</div>
          </div>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "#0f172a", border: authError ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)", color: "white" }}
          />
          {authError && <p className="text-xs" style={{ color: "#ef4444" }}>Неверный пароль</p>}
          <button
            onClick={onLogin}
            disabled={!password || loading}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "var(--teal)", color: "white" }}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </div>
      </div>
    </div>
  );
}
