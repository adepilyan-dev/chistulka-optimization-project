import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ RADIO GROUP
// ============================================================

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface RadioOption {
  /** Значение опции */
  value: string;
  /** Отображаемый текст */
  label: string;
  /** Описание (опционально) */
  description?: string;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
}

interface RadioGroupWithSchemaProps {
  /** Название группы (для микроразметки) */
  name: string;
  /** Описание группы */
  description?: string;
  /** Список опций */
  options: RadioOption[];
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Отключена ли группа */
  disabled?: boolean;
  /** Тип для микроразметки */
  schemaType?: "Service" | "Product" | "Category";
  /** Дополнительные классы */
  className?: string;
  /** Класс для контейнера опций */
  optionsClassName?: string;
}

/**
 * Компонент RadioGroup с микроразметкой
 * Используйте для выбора услуг, опций, фильтров.
 */
export function RadioGroupWithSchema({
  name,
  description,
  options,
  value,
  onValueChange,
  disabled = false,
  schemaType = "Service",
  className,
  optionsClassName,
}: RadioGroupWithSchemaProps) {
  // Формируем микроразметку
  const radioLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: name,
    ...(description && { description: description }),
    potentialAction: {
      "@type": "ChooseAction",
      actionOption: options.map((option) => ({
        "@type": "Thing",
        name: option.label,
        ...(option.description && { description: option.description }),
      })),
    },
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(radioLd)}</script>
      </Helmet>

      <div className={cn("space-y-2", className)}>
        {/* Заголовок группы */}
        <div className="space-y-0.5">
          <h3
            className="font-oswald font-semibold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {name}
          </h3>
          {description && (
            <p className="text-xs" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
        </div>

        {/* Радио-группа */}
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          className={cn("space-y-1.5", optionsClassName)}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3 transition-all cursor-pointer",
                "hover:bg-gray-50",
                value === option.value &&
                  "bg-[var(--teal-light)] border border-[var(--teal)]",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={`radio-${option.value}`}
                disabled={disabled}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <span className="flex-shrink-0">{option.icon}</span>
                  )}
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--dark)" }}
                  >
                    {option.label}
                  </span>
                </div>
                {option.description && (
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--gray)" }}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА УСЛУГ
// ============================================================

interface ServiceRadioProps {
  /** Название группы */
  name?: string;
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceRadio({
  name = "Выберите услугу",
  value,
  onValueChange,
  className,
}: ServiceRadioProps) {
  const options: RadioOption[] = [
    {
      value: "sofa",
      label: "Химчистка диванов",
      description:
        "Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа.",
      icon: "🛋️",
    },
    {
      value: "chair",
      label: "Химчистка кресел",
      description:
        "Офисные, обеденные, игровые кресла. Глубокая чистка без разборки.",
      icon: "🪑",
    },
    {
      value: "mattress",
      label: "Химчистка матрасов",
      description: "Устраняем клещей, грибок, пятна и неприятные запахи.",
      icon: "🛏️",
    },
    {
      value: "carpet",
      label: "Химчистка ковров",
      description:
        "Шерсть, синтетика, ковры ручной работы. Выездная чистка на дому.",
      icon: "🏡",
    },
  ];

  return (
    <RadioGroupWithSchema
      name={name}
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Service"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА РАЙОНА
// ============================================================

interface DistrictRadioProps {
  /** Название группы */
  name?: string;
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
}

export function DistrictRadio({
  name = "Выберите район",
  value,
  onValueChange,
  className,
}: DistrictRadioProps) {
  const options: RadioOption[] = [
    { value: "central", label: "Центральный округ", icon: "🏛️" },
    { value: "prikubanskiy", label: "Прикубанский округ", icon: "🌳" },
    { value: "karasunsky", label: "Карасунский округ", icon: "🏘️" },
    { value: "zapadnyy", label: "Западный округ", icon: "🌅" },
    { value: "other", label: "Другой район", icon: "📍" },
  ];

  return (
    <RadioGroupWithSchema
      name={name}
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Category"
      className={className}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ВЕРТИКАЛЬНОГО МЕНЮ-ВЫБОРА
// ============================================================

interface MenuRadioProps {
  /** Название группы */
  name: string;
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Список опций с иконками */
  options: RadioOption[];
  /** Дополнительные классы */
  className?: string;
}

export function MenuRadio({
  name,
  value,
  onValueChange,
  options,
  className,
}: MenuRadioProps) {
  return (
    <RadioGroupWithSchema
      name={name}
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Category"
      className={className}
      optionsClassName="space-y-0.5"
    />
  );
}
