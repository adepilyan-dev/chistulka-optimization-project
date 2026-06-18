import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TOGGLE
// ============================================================

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        brand:
          "data-[state=on]:bg-[var(--teal)] data-[state=on]:text-white hover:bg-muted hover:text-muted-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ToggleWithSchemaProps {
  /** Состояние переключателя */
  pressed?: boolean;
  /** Обработчик изменения */
  onPressedChange?: (pressed: boolean) => void;
  /** Заголовок переключателя (для микроразметки) */
  label: string;
  /** Описание переключателя */
  description?: string;
  /** ID переключателя */
  id?: string;
  /** Тип для микроразметки */
  schemaType?: "Boolean" | "Preference" | "Setting";
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли переключатель */
  disabled?: boolean;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Текст (опционально) */
  children?: React.ReactNode;
  /** Вариант стиля */
  variant?: "default" | "outline" | "brand";
  /** Размер */
  size?: "default" | "sm" | "lg";
}

/**
 * Компонент Toggle с микроразметкой
 * Используйте для фильтров, настроек, переключения режимов.
 */
export function ToggleWithSchema({
  pressed,
  onPressedChange,
  label,
  description,
  id,
  schemaType = "Preference",
  className,
  disabled = false,
  icon,
  children,
  variant = "default",
  size = "default",
}: ToggleWithSchemaProps) {
  const toggleId = id || `toggle-${React.useId()}`;

  // Формируем микроразметку
  const toggleLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: label,
    ...(description && { description: description }),
    ...(pressed !== undefined && { value: pressed }),
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(toggleLd)}</script>
      </Helmet>

      <div className="flex items-center gap-3">
        <Toggle
          id={toggleId}
          pressed={pressed}
          onPressedChange={onPressedChange}
          disabled={disabled}
          variant={variant}
          size={size}
          className={cn(
            "gap-2",
            variant === "brand" &&
              "data-[state=on]:bg-[var(--teal)] data-[state=on]:text-white",
            className,
          )}
          aria-label={label}
        >
          {icon && <span className="text-base">{icon}</span>}
          {children}
        </Toggle>
        <div>
          <label
            htmlFor={toggleId}
            className="cursor-pointer text-sm font-medium"
            style={{ color: "var(--dark)" }}
          >
            {label}
          </label>
          {description && (
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ФИЛЬТРОВ
// ============================================================

interface FilterToggleProps {
  /** Состояние */
  pressed?: boolean;
  /** Обработчик изменения */
  onPressedChange?: (pressed: boolean) => void;
  /** Название фильтра */
  label: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли фильтр */
  disabled?: boolean;
}

export function FilterToggle({
  pressed,
  onPressedChange,
  label,
  className,
  disabled = false,
}: FilterToggleProps) {
  return (
    <ToggleWithSchema
      pressed={pressed}
      onPressedChange={onPressedChange}
      label={label}
      schemaType="Preference"
      className={className}
      disabled={disabled}
      variant="outline"
      size="sm"
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАСТРОЕК
// ============================================================

interface SettingToggleProps {
  /** Состояние */
  pressed?: boolean;
  /** Обработчик изменения */
  onPressedChange?: (pressed: boolean) => void;
  /** Название настройки */
  label: string;
  /** Описание настройки */
  description?: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключена ли настройка */
  disabled?: boolean;
}

export function SettingToggle({
  pressed,
  onPressedChange,
  label,
  description,
  className,
  disabled = false,
}: SettingToggleProps) {
  return (
    <ToggleWithSchema
      pressed={pressed}
      onPressedChange={onPressedChange}
      label={label}
      description={description}
      schemaType="Setting"
      className={className}
      disabled={disabled}
      variant="brand"
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ ПЕРЕКЛЮЧАТЕЛЕЙ (с использованием Toggle)
// ============================================================

interface ToggleGroupSimpleProps {
  /** Список опций */
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Заголовок группы */
  title?: string;
  /** Дополнительные классы */
  className?: string;
}

export function ToggleGroupSimple({
  options,
  value,
  onValueChange,
  title,
  className,
}: ToggleGroupSimpleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h3
          className="font-oswald font-bold text-sm"
          style={{ color: "var(--dark)" }}
        >
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Toggle
            key={option.value}
            pressed={value === option.value}
            onPressedChange={() => onValueChange?.(option.value)}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            {option.icon && <span className="text-base">{option.icon}</span>}
            <span>{option.label}</span>
          </Toggle>
        ))}
      </div>
    </div>
  );
}
