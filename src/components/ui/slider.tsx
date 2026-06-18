import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SLIDER
// ============================================================

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SliderWithSchemaProps {
  /** Текущее значение */
  value: number[];
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Обработчик изменения */
  onValueChange?: (value: number[]) => void;
  /** Заголовок слайдера (для микроразметки) */
  label?: string;
  /** Описание слайдера */
  description?: string;
  /** Тип значения для микроразметки */
  schemaType?: "Price" | "Rating" | "Quantity";
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли слайдер */
  disabled?: boolean;
  /** Валюта (для Price) */
  currency?: string;
}

/**
 * Компонент Slider с микроразметкой
 * Используйте для выбора цен, рейтингов, количества.
 */
export function SliderWithSchema({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  label,
  description,
  schemaType = "Quantity",
  className,
  disabled = false,
  currency = "₽",
}: SliderWithSchemaProps) {
  // Формируем микроразметку
  const sliderLd = {
    "@context": "https://schema.org",
    "@type":
      schemaType === "Price" ? "PriceSpecification" : "QuantitativeValue",
    ...(label && { name: label }),
    ...(description && { description: description }),
    ...(schemaType === "Price" && {
      price: value[0] || 0,
      priceCurrency: currency,
    }),
    ...(schemaType !== "Price" && {
      value: value[0] || 0,
      minValue: min,
      maxValue: max,
    }),
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(sliderLd)}</script>
      </Helmet>

      <div className={cn("space-y-2", className)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--dark)" }}
            >
              {label}
            </label>
            <span
              className="font-oswald font-bold text-sm"
              style={{ color: "var(--teal)" }}
            >
              {schemaType === "Price"
                ? `${value[0] || 0} ${currency}`
                : value[0] || 0}
            </span>
          </div>
        )}

        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={onValueChange}
          disabled={disabled}
          className={className}
        />

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
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА ЦЕНЫ
// ============================================================

interface PriceSliderProps {
  /** Текущая цена */
  value: number[];
  /** Минимальная цена */
  min?: number;
  /** Максимальная цена */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Обработчик изменения */
  onValueChange?: (value: number[]) => void;
  /** Валюта */
  currency?: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли слайдер */
  disabled?: boolean;
}

export function PriceSlider({
  value,
  min = 0,
  max = 10000,
  step = 100,
  onValueChange,
  currency = "₽",
  className,
  disabled = false,
}: PriceSliderProps) {
  const minPrice = value[0] || min;
  const maxPrice = value[1] || max;

  return (
    <SliderWithSchema
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
      label="Цена"
      description={`от ${minPrice} до ${maxPrice} ${currency}`}
      schemaType="Price"
      currency={currency}
      className={className}
      disabled={disabled}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА РЕЙТИНГА
// ============================================================

interface RatingSliderProps {
  /** Текущий рейтинг */
  value: number[];
  /** Обработчик изменения */
  onValueChange?: (value: number[]) => void;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли слайдер */
  disabled?: boolean;
}

export function RatingSlider({
  value,
  onValueChange,
  className,
  disabled = false,
}: RatingSliderProps) {
  return (
    <SliderWithSchema
      value={value}
      min={0}
      max={5}
      step={0.5}
      onValueChange={onValueChange}
      label="Рейтинг"
      description={`${value[0] || 0} из 5 звёзд`}
      schemaType="Rating"
      className={className}
      disabled={disabled}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА КОЛИЧЕСТВА
// ============================================================

interface QuantitySliderProps {
  /** Текущее количество */
  value: number[];
  /** Обработчик изменения */
  onValueChange?: (value: number[]) => void;
  /** Максимальное количество */
  max?: number;
  /** Минимальное количество */
  min?: number;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли слайдер */
  disabled?: boolean;
}

export function QuantitySlider({
  value,
  onValueChange,
  max = 10,
  min = 1,
  className,
  disabled = false,
}: QuantitySliderProps) {
  return (
    <SliderWithSchema
      value={value}
      min={min}
      max={max}
      step={1}
      onValueChange={onValueChange}
      label="Количество"
      description={`${value[0] || 1} шт.`}
      schemaType="Quantity"
      className={className}
      disabled={disabled}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ДВОЙНОГО СЛАЙДЕРА (диапазон цен)
// ============================================================

interface RangeSliderProps {
  /** Текущий диапазон [min, max] */
  value: number[];
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Обработчик изменения */
  onValueChange?: (value: number[]) => void;
  /** Валюта */
  currency?: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли слайдер */
  disabled?: boolean;
}

export function RangeSlider({
  value,
  min = 0,
  max = 10000,
  step = 100,
  onValueChange,
  currency = "₽",
  className,
  disabled = false,
}: RangeSliderProps) {
  const [localValue, setLocalValue] = React.useState(value);

  const handleChange = (newValue: number[]) => {
    setLocalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <SliderWithSchema
        value={localValue}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        label="Диапазон цен"
        description={`от ${localValue[0]} до ${localValue[1]} ${currency}`}
        schemaType="Price"
        currency={currency}
        disabled={disabled}
      />

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--gray)" }}
          >
            От
          </label>
          <input
            type="number"
            value={localValue[0]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= min && val <= localValue[1]) {
                handleChange([val, localValue[1]]);
              }
            }}
            className="w-full rounded-lg border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
        <div className="flex-1">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--gray)" }}
          >
            До
          </label>
          <input
            type="number"
            value={localValue[1]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= max && val >= localValue[0]) {
                handleChange([localValue[0], val]);
              }
            }}
            className="w-full rounded-lg border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
      </div>
    </div>
  );
}
