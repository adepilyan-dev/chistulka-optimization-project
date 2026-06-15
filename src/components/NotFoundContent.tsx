import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function NotFoundContent() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--light-bg)" }}>
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/b6cb14ab-4c2a-4c89-a582-9b46d4e0a360.jpg"
              alt="Аренда Чистоты"
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(12,184,160,0.1)" }}>
            <Icon name="FileQuestion" size={40} style={{ color: "var(--teal)" }} />
          </div>
          <p className="font-oswald font-bold text-7xl mb-2" style={{ color: "var(--teal)" }}>404</p>
          <h1 className="font-oswald font-bold text-2xl mb-3" style={{ color: "var(--dark)" }}>
            Страница не найдена
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--gray)" }}>
            Возможно, страница была удалена или адрес введён с ошибкой. Вернитесь на главную или выберите нужную услугу.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3 font-semibold"
            >
              <Icon name="Home" size={18} />
              На главную
            </Link>
            <a
              href="tel:+79189682882"
              className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full border transition-all hover:bg-gray-50"
              style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
            >
              <Icon name="Phone" size={18} />
              Позвонить
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-left">
            <Link to="/uslugi/himchistka-divanov" className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover-lift">
              <Icon name="Sofa" size={20} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>Химчистка диванов</span>
            </Link>
            <Link to="/uslugi/himchistka-kovrov" className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover-lift">
              <Icon name="LayoutGrid" size={20} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>Химчистка ковров</span>
            </Link>
            <Link to="/uslugi/himchistka-matrasov" className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover-lift">
              <Icon name="Bed" size={20} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>Химчистка матрасов</span>
            </Link>
            <Link to="/nashi-raboty" className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover-lift">
              <Icon name="Images" size={20} style={{ color: "var(--teal)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--dark)" }}>Наши работы</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-sm" style={{ color: "var(--gray)" }}>
          © 2026 Аренда Чистоты, Краснодар
        </div>
      </footer>
    </div>
  );
}
