import { useEffect } from "react";

const INDEXNOW_URL = "https://functions.poehali.dev/ecd240df-f369-4051-8134-8b010135c891";
const STORAGE_KEY = "indexnow_last_sent";
const INTERVAL_MS = 24 * 60 * 60 * 1000;

export function useIndexNow() {
  useEffect(() => {
    const last = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    if (last && now - Number(last) < INTERVAL_MS) return;

    fetch(INDEXNOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(() => localStorage.setItem(STORAGE_KEY, String(now)))
      .catch(() => {});
  }, []);
}
