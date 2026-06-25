import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BLOG_POSTS } from "@/data/blog";
import { DISTRICTS } from "@/data/districts";
import { SERVICES_DATA } from "@/data/services";
import { ymGoal } from "@/hooks/useYandexMetrika";
import { NAV_LINKS } from "@/components/index/IndexShared";

export function Footer() {
  const mainDistricts = DISTRICTS.filter((d) => d.type === "district");
  const microDistricts = DISTRICTS.filter((d) => d.type === "micro").slice(0, 8);

  return (
    <footer style={{ background: "var(--dark)" }}>
      {/* SEO-блок со ссылками */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Услуги</p>
            <ul className="space-y-2">
              {SERVICES_DATA.map((s) => (
                <li key={s.slug}>
                  <Link to={`/uslugi/${s.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Районы</p>
            <ul className="space-y-2">
              {mainDistricts.map((d) => (
                <li key={d.slug}>
                  <Link to={`/himchistka-${d.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {d.name}
                  </Link>
                </li>
              ))}
              {microDistricts.map((d) => (
                <li key={d.slug}>
                  <Link to={`/himchistka-${d.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Полезное</p>
            <ul className="space-y-2">
              {BLOG_POSTS.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Компания</p>
            <ul className="space-y-2">
              {[
                { label: "Наши работы", to: "/nashi-raboty" },
                { label: "Отзывы клиентов", to: "/otzyvy" },
                { label: "Политика конфиденциальности", to: "/privacy" },
                { label: "Политика Cookie", to: "/cookie-policy" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                {l.label}
              </a>
            ))}
            <Link to="/nashi-raboty" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
              Наши работы
            </Link>
            <Link to="/otzyvy" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
              Отзывы
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                Политика конфиденциальности
              </Link>
              <Link to="/cookie-policy" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                Политика Cookie
              </Link>
            </div>
            <div className="text-xs text-center md:text-right mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
              Самозанятый Депилян Артур Ашотович · ИНН 232506771920 · 350075, Краснодарский край, г. Краснодар, ул. им. Селезнёва, д. 4Б
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Аренда Чистоты</div>
              <a
                href="https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ background: "rgba(12,184,160,0.15)", color: "var(--teal)", border: "1px solid rgba(12,184,160,0.3)" }}
              >
                <Icon name="MessageCircle" size={13} />
                MAX
              </a>
              <a
                href="https://vk.com/club239497134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ background: "rgba(12,184,160,0.15)", color: "var(--teal)", border: "1px solid rgba(12,184,160,0.3)" }}
              >
                <Icon name="Users" size={13} />
                ВКонтакте
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 z-[90] flex flex-col gap-3">
      <a
        href="https://wa.me/79189682882"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onClick={() => ymGoal("whatsapp_click")}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        style={{ background: "#25d366" }}
      >
        <Icon name="MessageSquare" size={24} className="text-white" />
      </a>
      <a
        href="https://vk.com/club239497134"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ВКонтакте"
        onClick={() => ymGoal("vk_click")}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        style={{ background: "#0077ff" }}
      >
        <Icon name="Users" size={24} className="text-white" />
      </a>
      <a
        href="https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в MAX"
        onClick={() => ymGoal("max_click")}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        style={{ background: "var(--teal)" }}
      >
        <Icon name="MessageCircle" size={26} className="text-white" />
      </a>
      <a
        href="tel:+79189682882"
        aria-label="Позвонить"
        onClick={() => ymGoal("phone_click")}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 animate-float"
        style={{ background: "#ffe227" }}
      >
        <Icon name="Phone" size={24} style={{ color: "var(--dark)" }} />
      </a>
    </div>
  );
}
