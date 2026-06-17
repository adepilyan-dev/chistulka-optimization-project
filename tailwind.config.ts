import { useState, useEffect, useRef, lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('@/components/HeavyChart'));
const ChatWidget = lazy(() => import('@/components/ChatWidget'));

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [shouldLoadChart, setShouldLoadChart] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadChart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div>Контент страницы</div>
      
      <div ref={chartRef}>
        {shouldLoadChart && (
          <Suspense fallback={<div>Загрузка графика...</div>}>
            <HeavyChart />
          </Suspense>
        )}
      </div>

      <button onClick={() => setShowChat(true)}>
        Открыть чат
      </button>
      
      {showChat && (
        <Suspense fallback={<div>Загрузка чата...</div>}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  );
}