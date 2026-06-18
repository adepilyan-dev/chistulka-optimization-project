import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ PROGRESS
// ============================================================

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ProgressWithSchemaProps {
  /** Текущее значение (0-100) */
  value: number;
  /** Максимальное значение (по умолчанию 100) */
  max?: number;
  /** Заголовок прогресса */
  label?: string;
  /** Описание прогресса */
  description?: string;
  /** Цвет прогресса */
  color?: "teal" | "yellow" | "red" | "blue" | "green" | "purple";
  /** Тип для микроразметки */
  schemaType?:
    | "Skill"
    | "EducationalOccupationalCredential"
    | "QuantitativeValue";
  /** Показывать ли процент */
  showPercentage?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Дополнительные классы для индикатора */
  indicatorClassName?: string;
}

/**
 * Компонент Progress с микроразметкой
 * Используйте для отображения навыков, достижений, прогресса задач.
 */
export function ProgressWithSchema({
  value,
  max = 100,
  label,
  description,
  color = "teal",
  schemaType = "QuantitativeValue",
  showPercentage = false,
  className,
  indicatorClassName,
}: ProgressWithSchemaProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  // Цвета для индикатора
  const colorClasses = {
    teal: "bg-[var(--teal)]",
    yellow: "bg-yellow-400",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  // Формируем микроразметку
  const progressLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(label && { name: label }),
    ...(description && { description: description }),
    ...(schemaType === "QuantitativeValue" && {
      value: value,
      maxValue: max,
      unitText: "percent",
    }),
  };

  return (
    <>
      {/* Микроразметка прогресса */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(progressLd)}</script>
      </Helmet>

      <div className={cn("space-y-1.5", className)}>
        {/* Заголовок и значение */}
        {(label || showPercentage) && (
          <div className="flex items-center justify-between text-sm">
            {label && (
              <span className="font-medium" style={{ color: "var(--dark)" }}>
                {label}
              </span>
            )}
            {showPercentage && (
              <span
                className="font-oswald font-bold"
                style={{ color: "var(--teal)" }}
              >
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Прогресс-бар */}
        <Progress
          value={percentage}
          className={cn("h-2.5", className)}
          {...({ ref: undefined } as any)}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full flex-1 transition-all duration-500 ease-out",
              colorClasses[color],
              indicatorClassName,
            )}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </Progress>

        {/* Описание */}
        {description && (
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            {description}
          </p>
        )}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАВЫКОВ
// ============================================================

interface SkillProgressProps {
  /** Название навыка */
  name: string;
  /** Уровень навыка (0-100) */
  level: number;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function SkillProgress({
  name,
  level,
  icon,
  className,
}: SkillProgressProps) {
  return (
    <ProgressWithSchema
      value={level}
      max={100}
      label={name}
      schemaType="Skill"
      showPercentage
      color="teal"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ КАЧЕСТВА УСЛУГ
// ============================================================

interface QualityIndicatorProps {
  /** Название услуги */
  serviceName: string;
  /** Качество (0-100) */
  quality: number;
  /** Количество отзывов */
  reviews?: number;
  /** Дополнительные классы */
  className?: string;
}

export function QualityIndicator({
  serviceName,
  quality,
  reviews,
  className,
}: QualityIndicatorProps) {
  return (
    <ProgressWithSchema
      value={quality}
      max={100}
      label="Качество"
      description={`${serviceName} — ${quality}% удовлетворённых клиентов${reviews ? ` (${reviews} отзывов)` : ""}`}
      schemaType="QuantitativeValue"
      color="green"
      showPercentage
      className={className}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ СТЕППЕРА (многошаговый процесс)
// ============================================================

interface StepperProgressProps {
  /** Текущий шаг (начиная с 1) */
  currentStep: number;
  /** Общее количество шагов */
  totalSteps: number;
  /** Названия шагов */
  stepLabels: string[];
  /** Дополнительные классы */
  className?: string;
}

export function StepperProgress({
  currentStep,
  totalSteps,
  stepLabels,
  className,
}: StepperProgressProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <ProgressWithSchema
        value={progress}
        max={100}
        label={`Шаг ${currentStep} из ${totalSteps}`}
        color="teal"
        showPercentage={false}
      />

      <div className="flex justify-between">
        {stepLabels.slice(0, totalSteps).map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                  isActive && "bg-[var(--teal)] text-white",
                  isCompleted && "bg-[var(--teal-light)] text-[var(--teal)]",
                  !isActive && !isCompleted && "bg-gray-100 text-gray-400",
                )}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={cn(
                  "text-xs text-center max-w-16",
                  isActive && "font-semibold",
                  isActive && "text-[var(--dark)]",
                  !isActive && "text-gray-400",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ АНИМАЦИИ ЗАГРУЗКИ
// ============================================================

interface LoadingProgressProps {
  /** Заголовок загрузки */
  label?: string;
  /** Состояние загрузки (true/false) */
  isLoading?: boolean;
  /** Дополнительные классы */
  className?: string;
}

export function LoadingProgress({
  label = "Загрузка...",
  isLoading = true,
  className,
}: LoadingProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    let interval: NodeJS.Timeout;
    let current = 0;

    // Анимация прогресса до 95%
    const animate = () => {
      if (current < 95) {
        const increment = Math.random() * 10 + 1;
        current = Math.min(95, current + increment);
        setProgress(current);
        interval = setTimeout(animate, 500 + Math.random() * 1000);
      }
    };

    animate();

    return () => clearTimeout(interval);
  }, [isLoading]);

  // Если загрузка завершена, показываем 100%
  const displayValue = isLoading ? progress : 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: "var(--gray)" }}>{label}</span>
        <span
          className="font-oswald font-bold"
          style={{ color: "var(--teal)" }}
        >
          {Math.round(displayValue)}%
        </span>
      </div>

      <Progress
        value={displayValue}
        className="h-2"
        {...({ ref: undefined } as any)}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out",
            displayValue === 100 ? "bg-green-500" : "bg-[var(--teal)]",
          )}
          style={{ transform: `translateX(-${100 - displayValue}%)` }}
        />
      </Progress>
    </div>
  );
}
