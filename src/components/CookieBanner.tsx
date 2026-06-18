// ============================
// CookieBanner с интеграцией аналитики
// ============================

import CookieBanner from "@/components/CookieBanner";
import { ymGoal } from "@/hooks/useYandexMetrika";

export function AppCookieBanner() {
  return (
    <CookieBanner
      position="bottom-right"
      theme="light"
      title="🍪 Мы используем cookie"
      onAccept={() => {
        ymGoal("cookie_accept");
        // Включаем аналитику
        if (typeof window !== "undefined" && window.ym) {
          window.ym(109829163, "userParams", { cookies: true });
        }
      }}
      onDecline={() => {
        ymGoal("cookie_decline");
        // Отключаем аналитику
        if (typeof window !== "undefined" && window.ym) {
          window.ym(109829163, "userParams", { cookies: false });
        }
      }}
    />
  );
}

// ============================
// Использование в App
// ============================

export default function App() {
  return (
    <div>
      {/* ... */}
      <AppCookieBanner />
    </div>
  );
}
