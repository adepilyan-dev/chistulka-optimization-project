import dynamic from 'next/dynamic';

// Загружается только когда пользователь доскроллит до блока
const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'),
  { 
    ssr: false,  // Не рендерить на сервере
    loading: () => <div>Загрузка графика...</div> 
  }
);

// Загружается только при клике на кнопку
const ChatWidget = dynamic(
  () => import('@/components/ChatWidget'),
  { ssr: false }
);

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div>
      {/* Чарт загрузится, когда появится в зоне видимости */}
      <div id="chart-section">
        <HeavyChart />
      </div>
      
      {/* Чат загрузится только после клика */}
      <button onClick={() => setShowChat(true)}>
        Открыть чат
      </button>
      {showChat && <ChatWidget />}
    </div>
  );
}