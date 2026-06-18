import * as React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

// 🏷️ Исправлен URL сайта
const SITE_URL = "https://arenda-chistoty.ru";

// 🔍 Функция для мета-тегов (опционально)
const setMetaTags = () => {
  // Канонический URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", SITE_URL);
  } else {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = SITE_URL;
    document.head.appendChild(link);
  }

  // Мета-тег для вьюпорта (уже есть в HTML, но на всякий случай)
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0";
    document.head.appendChild(meta);
  }

  // Мета-тег для темы (темная/светлая)
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#0cb8a0";
    document.head.appendChild(meta);
  }
};

// 🔄 Выполняем один раз при загрузке
setMetaTags();

// ⚡ Получаем корневой элемент с проверкой
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    '❌ Не удалось найти элемент #root. Проверьте, что в HTML есть <div id="root"></div>',
  );
}

// ✅ Создаем корень с StrictMode для лучшей отладки
const root = createRoot(rootElement);

// 🚀 Рендерим приложение
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// 📊 (Опционально) Для замера производительности в dev-режиме
if (import.meta.env.DEV) {
  console.log("🔧 Режим разработки");
  console.log(`🌐 Сайт: ${SITE_URL}`);
}

// 🧹 (Опционально) Для очистки при размонтировании
// export const cleanup = () => {
//   root.unmount();
// };
