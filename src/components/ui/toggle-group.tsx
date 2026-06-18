import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TOGGLE GROUP
// ============================================================

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ToggleOption {
  /** Значение опции */
  value: string;
  /** Отображаемый текст */
  label: string;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Описание (для микроразметки) */
  description?: string;
}

interface ToggleGroupWithSchemaProps {
  /** Заголовок группы (для микроразметки) */
  title?: string;
  /** Описание группы */
  description?: string;
  /** Список опций */
  options: ToggleOption[];
  /** Текущее значение */
  value?: string | string[];
  /** Обработчик изменения */
  onValueChange?: (value: string | string[]) => void;
  /** Тип для микроразметки */
  schemaType?: "Category" | "Service" | "Preference";
  /** Множественный выбор */
  multiple?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Размер */
  size?: "default" | "sm" | "lg";
  /** Вариант стиля */
  variant?: "default" | "outline";
}

/**
 * Компонент ToggleGroup с микроразметкой
 * Используйте для выбора категорий, фильтров, настроек.
 */
export function ToggleGroupWithSchema({
  title,
  description,
  options,
  value,
  onValueChange,
  schemaType = "Preference",
  multiple = false,
  className,
  size = "default",
  variant = "default",
}: ToggleGroupWithSchemaProps) {
  // Формируем микроразметку
  const toggleLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
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

  const handleValueChange = (newValue: string | string[]) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(toggleLd)}</script>
      </Helmet>

      <div className={cn("space-y-2", className)}>
        {title && (
          <h3
            className="font-oswald font-bold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            {description}
          </p>
        )}

        <ToggleGroup
          type={multiple ? "multiple" : "single"}
          value={value}
          onValueChange={handleValueChange}
          size={size}
          variant={variant}
          className="flex-wrap"
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className="flex items-center gap-1.5 px-3 py-1.5"
            >
              {option.icon && <span className="text-base">{option.icon}</span>}
              <span>{option.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ФИЛЬТРОВ
// ============================================================

interface FilterToggleGroupProps {
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
}

export function FilterToggleGroup({
  value,
  onValueChange,
  className,
}: FilterToggleGroupProps) {
  const options: ToggleOption[] = [
    { value: "all", label: "Все", icon: "📋" },
    { value: "sofa", label: "Диваны", icon: "🛋️" },
    { value: "chair", label: "Кресла", icon: "🪑" },
    { value: "mattress", label: "Матрасы", icon: "🛏️" },
    { value: "carpet", label: "Ковры", icon: "🏡" },
    { value: "auto", label: "Авто", icon: "🚗" },
  ];

  return (
    <ToggleGroupWithSchema
      title="Фильтр услуг"
      description="Выберите категорию"
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Category"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ РАЗМЕРА
// ============================================================

interface SizeToggleGroupProps {
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
}

export function SizeToggleGroup({
  value,
  onValueChange,
  className,
}: SizeToggleGroupProps) {
  const options: ToggleOption[] = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ];

  return (
    <ToggleGroupWithSchema
      title="Размер"
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Preference"
      className={className}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ МНОЖЕСТВЕННОГО ВЫБОРА
// ============================================================

interface MultiSelectToggleGroupProps {
  /** Текущие значения */
  value?: string[];
  /** Обработчик изменения */
  onValueChange?: (value: string[]) => void;
  /** Список опций */
  options: ToggleOption[];
  /** Заголовок */
  title?: string;
  /** Дополнительные классы */
  className?: string;
}

export function MultiSelectToggleGroup({
  value,
  onValueChange,
  options,
  title,
  className,
}: MultiSelectToggleGroupProps) {
  return (
    <ToggleGroupWithSchema
      title={title || "Выберите опции"}
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Preference"
      multiple
      className={className}
    />
  );
}
