import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Seo from "@/components/Seo";

const SECTIONS = [
  {
    title: "1. Общие положения",
    text: "Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта arenda-chistoty.online (далее — «Сайт»), оказывающего услуги химчистки мебели в Краснодаре. Оператором персональных данных является самозанятый Депилян Артур Ашотович. Используя Сайт, вы соглашаетесь с условиями данной Политики.",
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

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: "var(--light-bg)" }}>
      <Seo
        title="Политика конфиденциальности | Аренда Чистоты"
        description="Политика обработки персональных данных сайта arenda-chistoty.online — химчистка мебели в Краснодаре."
        path="/privacy"
        noindex={true}
      />
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/11571f12-8820-4684-967e-430f28b0c7da.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--teal)" }}>
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-oswald font-bold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--dark)" }}>
          Политика конфиденциальности
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--gray)" }}>
          Последнее обновление: 8 июня 2026 года
        </p>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-oswald font-semibold text-lg mb-2" style={{ color: "var(--dark)" }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{s.text}</p>
            </section>
          ))}

          <section className="pt-4 border-t">
            <h2 className="font-oswald font-semibold text-lg mb-2" style={{ color: "var(--dark)" }}>Контакты</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:<br />
              Оператор: самозанятый Депилян Артур Ашотович<br />
              ИНН: 232506771920<br />
              Юридический адрес: 350075, Краснодарский край, г. Краснодар, ул. им. Селезнёва, д. 4Б<br />
              Телефон: <a href="tel:+79189682882" style={{ color: "var(--teal)" }} className="font-medium">8 918 968-28-82</a><br />
              Email: <a href="mailto:arenda-chistoty.ru@yandex.ru" style={{ color: "var(--teal)" }} className="font-medium">arenda-chistoty.ru@yandex.ru</a><br />
              Время работы: ежедневно с 9:00 до 22:00
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}