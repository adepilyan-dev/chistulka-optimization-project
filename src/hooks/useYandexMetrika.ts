import { useEffect } from "react";

const YM_ID = 101026698;

declare global {
  interface Window {
    ym?: (id: number, action: string, options?: Record<string, unknown>) => void;
  }
}

export function useYandexMetrika() {
  useEffect(() => {
    if (localStorage.getItem("cookie_consent") === "yes") initMetrika();
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookie_consent" && e.newValue === "yes") initMetrika();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}

function initMetrika() {
  if (window.ym) return;

  window.ym = () => undefined;

  const script = document.createElement("script");
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.async = true;
  script.onload = () => {
    window.ym?.(YM_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
    });
  };
  document.head.appendChild(script);
}
