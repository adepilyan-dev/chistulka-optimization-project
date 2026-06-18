import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";

const COOKIE_TYPES = [
  {
    title: "Необходимые",
    always: true,
    desc: "Обязательны для работы сайта. Без них невозможна навигация, сохранение ваших предпочтений и безопасность. Отключить их нельзя.",
    examples: [
      { name: "cookie_consent", purpose: "Хранит ваш выбор по использованию файлов cookie", expires: "1 год" },
    ],
  },
  {
    title: "Аналитические",
    always: false,
    desc: "Помогают нам понимать, как посетители используют сайт: какие страницы просматривают, откуда приходят. Данные собираются анонимно.",
    examples: [
      { name: "_analytics_session", purpose: "Сессия посещения — анонимный идентификатор визита", expires: "30 минут" },
    ],
  },
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title="Политика использования cookie | Аренда Чистоты"
        description="Как сайт arenda-chistoty.online использует файлы cookie: типы, назначение и способы управления согласием."
        path="/cookie-policy"
        noindex={true}
      />

      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Cookie" size={28} style={{ color: "var(--teal)" }} />
          <h1 className="font-oswald font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--dark)" }}>
            Политика Cookie
          </h1>
        </div>
        <p className="text-sm mb-10" style={{ color: "var(--gray)" }}>
          Последнее обновление: 10 июня 2026 года
        </p>

        <div className="space-y-5">
          {/* Что такое cookie */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="font-oswald font-semibold text-xl mb-3" style={{ color: "var(--dark)" }}>Что такое файлы cookie?</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
              Cookie — небольшие текстовые файлы, которые сайт сохраняет в вашем браузере при посещении. Они помогают сайту запоминать ваши действия и предпочтения, чтобы вам не приходилось вводить их заново при следующем визите.
            </p>
          </div>

          {/* Как мы используем */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="font-oswald font-semibold text-xl mb-3" style={{ color: "var(--dark)" }}>Как мы используем cookie</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
              Мы используем файлы cookie, чтобы сайт работал корректно и чтобы понимать, как посетители им пользуются. Аналитические cookie подключаются только после вашего явного согласия.
            </p>
          </div>

          {/* Таблицы по типам */}
          {COOKIE_TYPES.map((type) => (
            <div key={type.title} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-oswald font-semibold text-xl" style={{ color: "var(--dark)" }}>{type.title} cookie</h2>
                {type.always && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: "rgba(12,184,160,0.12)", color: "var(--teal)" }}>
                    Всегда активны
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--gray)" }}>{type.desc}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--dark)" }}>Название</th>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--dark)" }}>Назначение</th>
                      <th className="text-left py-2 font-semibold whitespace-nowrap" style={{ color: "var(--dark)" }}>Срок хранения</th>
                    </tr>
                  </thead>
                  <tbody>
                    {type.examples.map((ex) => (
                      <tr key={ex.name} style={{ borderBottom: "1px solid #f9f9f9" }}>
                        <td className="py-2.5 pr-4 font-mono font-semibold" style={{ color: "var(--teal)" }}>{ex.name}</td>
                        <td className="py-2.5 pr-4 leading-snug" style={{ color: "var(--gray)" }}>{ex.purpose}</td>
                        <td className="py-2.5 whitespace-nowrap" style={{ color: "var(--gray)" }}>{ex.expires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Управление */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="font-oswald font-semibold text-xl mb-3" style={{ color: "var(--dark)" }}>Как управлять cookie</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gray)" }}>
              Вы можете изменить своё решение в любой момент: отзыв согласия удалит данные об аналитике из вашего браузера. Также cookie можно отключить в настройках браузера, однако это может повлиять на работу некоторых функций сайта.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("cookie_consent");
                window.location.reload();
              }}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all hover:bg-gray-50"
              style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
            >
              <Icon name="RotateCcw" size={15} />
              Изменить моё согласие
            </button>
          </div>

          {/* Контакты */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="font-oswald font-semibold text-xl mb-2" style={{ color: "var(--dark)" }}>Контакты</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
              Если у вас есть вопросы по использованию cookie, свяжитесь с нами:<br />
              Оператор: самозанятый Депилян Артур Ашотович<br />
              Телефон: <a href="tel:+79189682882" style={{ color: "var(--teal)" }} className="font-medium">8 918 968-28-82</a><br />
              Email: <a href="mailto:arenda-chistoty.ru@yandex.ru" style={{ color: "var(--teal)" }} className="font-medium">arenda-chistoty.ru@yandex.ru</a><br />
              Адрес: г. Краснодар<br />
              Время работы: ежедневно с 9:00 до 22:00
            </p>
          </div>

          <p className="text-xs text-center pb-4" style={{ color: "var(--gray)" }}>
            См. также:{" "}
            <Link to="/privacy" style={{ color: "var(--teal)" }} className="underline">
              Политика конфиденциальности
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}