import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Seo from "@/components/Seo";

// 🌀 Ленивая загрузка иконки (не критична для первого экрана)
const Icon = lazy(() => import("@/components/ui/icon"));

// 📝 Константы вынесены за пределы компонента
const SECTIONS = [
  {
    title: "1. Общие положения",
    text: "Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта arenda-chistoty.ru (далее — «Сайт»), оказывающего услуги химчистки мебели в Краснодаре. Оператором персональных данных является самозанятый Депилян Артур Ашотович. Используя Сайт, вы соглашаетесь с условиями данной Политики.",
  },
  {
    title: "2. Какие данные мы собираем",
    text: "Мы собираем персональные данные, которые вы добровольно предоставляете при оформлении заявки: имя, номер телефона, удобное время для звонка, тип мебели и комментарии. Также автоматически собираются технические данные: файлы cookie, IP-адрес, тип браузера и сведения о посещениях через системы веб-аналитики.",
  },
  {
    title: "3. Цели обработки данных",
    text: "Ваши данные используются для: связи с вами и оформления заказа на химчистку; уточнения деталей услуги; информирования о статусе заявки; улучшения качества обслуживания и работы Сайта. Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.",
  },
  {
    title: "4. Файлы cookie",
    text: "Сайт использует файлы cookie для корректной работы и анализа посещаемости. Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу некоторых функций Сайта.",
  },
  {
    title: "5. Защита данных",
    text: "Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.",
  },
  {
    title: "6. Права пользователя",
    text: "Вы вправе запросить информацию об обрабатываемых данных, потребовать их уточнения, блокирования или удаления, а также отозвать согласие на обработку. Для этого свяжитесь с нами по телефону 8 918 968-28-82.",
  },
  {
    title: "7. Изменения политики",
    text: "Мы оставляем за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на этой странице.",
  },
];

// ✅ Исправлен URL сайта в тексте
const CONTACT_INFO = {
  operator: "самозанятый Депилян Артур Ашотович",
  inn: "232506771920",
  address: "350075, Краснодарский край, г. Краснодар, ул. им. Селезнёва, д. 4Б",
  phone: "+79189682882",
  phoneDisplay: "8 918 968-28-82",
  email: "arenda-chistoty.ru@yandex.ru",
};

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      {/* 🔍 SEO — обновлен noindex */}
      <Seo
        title="Политика конфиденциальности | Аренда Чистоты"
        description="Политика обработки персональных данных сайта arenda-chistoty.ru — химчистка мебели в Краснодаре."
        path="/privacy"
        noindex={true}
        // ✅ Добавлен канонический URL
        canonical="https://arenda-chistoty.ru/privacy"
      />

      {/* ⚡ Шапка — критический элемент */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          {/* 🖼️ Логотип с оптимизацией */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="На главную"
          >
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты — химчистка мебели в Краснодаре"
              className="h-9 w-auto object-contain"
              width="120"
              height="36"
              // ✅ Добавлены атрибуты для оптимизации
              fetchpriority="high"
              decoding="async"
            />
          </Link>

          {/* 🔙 Кнопка "На главную" */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--teal)" }}
          >
            <Suspense fallback={<span>←</span>}>
              <Icon name="ArrowLeft" size={16} />
            </Suspense>
            На главную
          </Link>
        </div>
      </header>

      {/* 📄 Основной контент */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1
          className="font-oswald font-bold mb-2"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            color: "var(--dark)",
          }}
        >
          Политика конфиденциальности
        </h1>
        <p className="text-sm mb-8 sm:mb-10" style={{ color: "var(--gray)" }}>
          Последнее обновление:{" "}
          {new Date().toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2
                className="font-oswald font-semibold text-lg mb-2"
                style={{ color: "var(--dark)" }}
              >
                {s.title}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray)" }}
              >
                {s.text}
              </p>
            </section>
          ))}

          {/* 📞 Контакты */}
          <section
            className="pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <h2
              className="font-oswald font-semibold text-lg mb-2"
              style={{ color: "var(--dark)" }}
            >
              Контакты
            </h2>
            <div
              className="text-sm leading-relaxed space-y-1"
              style={{ color: "var(--gray)" }}
            >
              <p>
                По всем вопросам, связанным с обработкой персональных данных,
                обращайтесь:
              </p>
              <p>
                <strong>Оператор:</strong> {CONTACT_INFO.operator}
              </p>
              <p>
                <strong>ИНН:</strong> {CONTACT_INFO.inn}
              </p>
              <p>
                <strong>Юридический адрес:</strong> {CONTACT_INFO.address}
              </p>
              <p>
                <strong>Телефон:</strong>{" "}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  style={{ color: "var(--teal)" }}
                  className="font-medium hover:underline"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  style={{ color: "var(--teal)" }}
                  className="font-medium hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>
                <strong>Время работы:</strong> ежедневно с 9:00 до 22:00
              </p>
            </div>
          </section>
        </div>

        {/* 🦶 Дополнительная навигация внизу */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--teal)" }}
          >
            <Suspense fallback={<span>←</span>}>
              <Icon name="ArrowLeft" size={16} />
            </Suspense>
            Вернуться на главную
          </Link>
        </div>
      </main>

      {/* 🦶 Футер (опционально) */}
      <footer
        className="py-6 text-center text-xs"
        style={{ color: "var(--gray)" }}
      >
        <p>© {new Date().getFullYear()} Аренда Чистоты · Все права защищены</p>
      </footer>
    </div>
  );
}
