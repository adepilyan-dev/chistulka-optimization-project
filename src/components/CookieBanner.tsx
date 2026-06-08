import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "yes");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-[100] sm:max-w-xs animate-fade-up">
      <div className="bg-white rounded-xl shadow-xl border p-3.5 flex items-center gap-3" style={{ borderColor: "rgba(12,184,160,0.2)" }}>
        <Icon name="Cookie" size={18} style={{ color: "var(--teal)" }} className="flex-shrink-0" />
        <p className="text-xs leading-snug flex-1" style={{ color: "var(--gray)" }}>
          Мы используем cookie.{" "}
          <a href="/privacy" className="underline" style={{ color: "var(--teal)" }}>Подробнее</a>
        </p>
        <button onClick={accept} className="btn-primary px-4 py-1.5 text-xs font-semibold whitespace-nowrap flex-shrink-0">
          Ок
        </button>
      </div>
    </div>
  );
}