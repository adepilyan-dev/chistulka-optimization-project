import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 1️⃣ Ленивая загрузка компонентов (заменяем HeavyChart на ваш реальный компонент)
const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'), // 🔄 ЗАМЕНИТЕ на путь к вашему компоненту
  { 
    ssr: false,
    loading: () => <div className="p-4 text-center">Загрузка графика...</div>
  }
);

const ChatWidget = dynamic(
  () => import('@/components/ChatWidget'), // 🔄 ЗАМЕНИТЕ на путь к вашему виджету
  { ssr: false }
);

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [shouldLoadChart, setShouldLoadChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // 2️⃣ Отслеживаем, когда блок с графиком появляется в зоне видимости
  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadChart(true);
          observer.disconnect(); // Отключаем после срабатывания
        }
      },
      { threshold: 0.1 } // Когда 10% блока видно
    );

    observer.observe(chartRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Остальной контент страницы */}
      <h1>Главная страница</h1>
      
      {/* Другой контент до графика */}
      <div className="h-screen bg-gray-100">
        Здесь много контента, который видно сразу
      </div>

      {/* 3️⃣ Блок с графиком — загружается при скролле */}
      <div ref={chartRef} id="chart-section" className="h-screen">
        {shouldLoadChart ? (
          <HeavyChart />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Прокрутите ниже для загрузки графика</p>
          </div>
        )}
      </div>

      {/* 4️⃣ Блок с чатом — загружается только при клике */}
      <div className="h-screen bg-gray-50">
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Открыть чат для консультации
          </button>
        ) : (
          <div className="h-[500px]">
            <ChatWidget />
          </div>
        )}
      </div>
    </div>
  );
}