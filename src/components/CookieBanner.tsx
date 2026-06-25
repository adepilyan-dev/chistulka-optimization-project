import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const decide = (value: string) => {
    localStorage.setItem("cookie_consent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-[100] sm:max-w-xs animate-fade-up">
      <div className="bg-white rounded-xl shadow-xl border p-3.5" style={{ borderColor: "rgba(12,184,160,0.2)" }}>
        <div className="flex items-start gap-2.5 mb-3">
          <Icon name="Cookie" size={18} style={{ color: "var(--teal)" }} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-snug" style={{ color: "var(--gray)" }}>
            Нажимая «Принять», вы соглашаетесь с{" "}
            <Link to="/privacy" className="underline" style={{ color: "var(--teal)" }}>политикой конфиденциальности</Link>{" "}
            и использованием{" "}
            <Link to="/cookie-policy" className="underline" style={{ color: "var(--teal)" }}>cookie</Link>.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => decide("no")} className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all hover:bg-gray-50" style={{ color: "var(--gray)", border: "1px solid #e5e7eb" }}>
            Отклонить
          </button>
          <button onClick={() => decide("yes")} className="flex-1 btn-primary px-3 py-1.5 text-xs font-semibold">
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}