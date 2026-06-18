import * as React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import App from "./App";
import "./index.css";

// ⚡ Корневой элемент
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("❌ Элемент #root не найден");
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#1a1a2e;">
      <div style="text-align:center;">
        <h1 style="font-size:2rem;margin-bottom:1rem;color:#0cb8a0;">Аренда Чистоты</h1>
        <p style="color:#6c757d;">Загрузка...</p>
      </div>
    </div>
  `;
  throw new Error("❌ Элемент #root не найден");
}

// 📦 Компонент-обертка с fallback
function Root() {
  return (
    <StrictMode>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #e5e7eb",
                  borderTopColor: "#0cb8a0",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ color: "#6c757d" }}>Загрузка...</p>
            </div>
          </div>
        }
      >
        <App />
      </Suspense>
    </StrictMode>
  );
}

// ✅ Рендеринг с обработкой ошибок
try {
  const root = createRoot(rootElement);
  root.render(<Root />);
} catch (error) {
  console.error("❌ Ошибка при рендеринге:", error);
  rootElement.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#1a1a2e;">
      <div style="text-align:center;max-width:400px;padding:2rem;">
        <h1 style="font-size:2rem;margin-bottom:1rem;color:#e53e3e;">⚠️ Ошибка загрузки</h1>
        <p style="color:#6c757d;margin-bottom:1rem;">Пожалуйста, обновите страницу или попробуйте позже.</p>
        <button 
          onclick="location.reload()"
          style="padding:0.75rem 2rem;background:#0cb8a0;color:white;border:none;border-radius:9999px;cursor:pointer;font-size:1rem;"
        >
          Обновить
        </button>
      </div>
    </div>
  `;
}

// Добавляем CSS для анимации спиннера
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
