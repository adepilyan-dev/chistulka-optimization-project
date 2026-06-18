// ============================
// Индикатор загрузки заявки
// ============================

export function OrderProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const getStatus = () => {
    if (progress < 30)
      return { label: "Обработка заявки", variant: "default" as const };
    if (progress < 60)
      return { label: "Подбор мастера", variant: "warning" as const };
    if (progress < 90)
      return { label: "Выезд мастера", variant: "gradient" as const };
    return { label: "✅ Готово!", variant: "success" as const };
  };

  const status = getStatus();

  return (
    <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border">
      <h3 className="font-oswald font-bold text-lg">Статус заявки</h3>
      <Progress
        value={progress}
        variant={status.variant}
        size="lg"
        showValue
        label={status.label}
        pulsate={progress < 100}
      />
      {progress === 100 && (
        <p className="text-sm text-green-600 font-medium">
          Мастер выехал к вам! Ожидайте звонка.
        </p>
      )}
    </div>
  );
}

// ============================
// Индикатор качества
// ============================

export function QualityIndicator({ rating }: { rating: number }) {
  const getVariant = () => {
    if (rating >= 4.5) return "success";
    if (rating >= 3.5) return "warning";
    return "error";
  };

  const getLabel = () => {
    if (rating >= 4.5) return "Отлично";
    if (rating >= 3.5) return "Хорошо";
    return "Требуется улучшение";
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Качество</span>
        <span className="text-sm font-bold text-teal">{rating}/5</span>
      </div>
      <Progress value={(rating / 5) * 100} variant={getVariant()} size="sm" />
      <span className="text-xs text-muted-foreground">{getLabel()}</span>
    </div>
  );
}

// ============================
// Индикатор выполнения шагов
// ============================

export function StepsProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const steps = ["Осмотр", "Диагностика", "Чистка", "Сушка", "Финиш"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Шаг {currentStep} из {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {steps[currentStep - 1] || "Готово"}
        </span>
      </div>
      <Progress
        value={(currentStep / totalSteps) * 100}
        variant="gradient"
        size="sm"
        animated
        showValue={false}
      />
    </div>
  );
}

// ============================
// Индикатор загрузки видео
// ============================

export function VideoProgress({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 95));
    }, 300);

    return () => clearInterval(timer);
  }, [isLoading]);

  React.useEffect(() => {
    if (progress === 95 && isLoading) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-3">
        <Icon name="Video" size={16} className="text-teal" />
        <span className="text-sm font-medium">
          {progress < 100 ? "Загрузка видео..." : "✅ Готово!"}
        </span>
        <span className="text-sm text-muted-foreground ml-auto">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress
        value={progress}
        variant={progress === 100 ? "success" : "gradient"}
        size="sm"
        animated={progress < 100}
        pulsate={progress < 100 && progress > 0}
      />
    </div>
  );
}
