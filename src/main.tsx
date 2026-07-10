import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import fontsCssUrl from './fonts.css?url'
import indexCssUrl from './index.css?url'

// Грузим CSS неблокирующе (preload + swap на stylesheet после загрузки),
// чтобы браузер не ждал загрузку стилей перед первой отрисовкой страницы.
function loadStylesheetAsync(href: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = () => {
    link.onload = null;
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
}
loadStylesheetAsync(fontsCssUrl);
loadStylesheetAsync(indexCssUrl);

createRoot(document.getElementById("root")!).render(<App />);