import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SWITCH
// ============================================================

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SwitchWithSchemaProps {
  /** Состояние переключателя */
  checked?: boolean;
  /** Обработчик изменения */
  onCheckedChange?: (checked: boolean) => void;
  /** Заголовок переключателя (для микроразметки) */
  label: string;
  /** Описание переключателя */
  description?: string;
  /** ID переключателя */
  id?: string;
  /** Тип настройки для микроразметки */
  schemaType?: "Boolean" | "Preference" | "Setting";
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли переключатель */
  disabled?: boolean;
}

/**
 * Компонент Switch с микроразметкой
 * Используйте для настроек, фильтров, переключения режимов.
 */
export function SwitchWithSchema({
  checked,
  onCheckedChange,
  label,
  description,
  id,
  schemaType = "Preference",
  className,
  disabled = false,
}: SwitchWithSchemaProps) {
  const switchId = id || `switch-${React.useId()}`;

  // Формируем микроразметку
  const switchLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: label,
    ...(description && { description: description }),
    ...(checked !== undefined && { value: checked }),
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(switchLd)}</script>
      </Helmet>

      <div className={cn("flex items-start gap-3", className)}>
        <Switch
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="mt-0.5"
        />
        <div>
          <label
            htmlFor={switchId}
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
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАСТРОЕК
// ============================================================

interface SettingSwitchProps {
  /** Состояние */
  checked?: boolean;
  /** Обработчик изменения */
  onCheckedChange?: (checked: boolean) => void;
  /** Название настройки */
  label: string;
  /** Описание настройки */
  description?: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключена ли настройка */
  disabled?: boolean;
}

export function SettingSwitch({
  checked,
  onCheckedChange,
  label,
  description,
  className,
  disabled = false,
}: SettingSwitchProps) {
  return (
    <SwitchWithSchema
      checked={checked}
      onCheckedChange={onCheckedChange}
      label={label}
      description={description}
      schemaType="Setting"
      className={className}
      disabled={disabled}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ФИЛЬТРОВ
// ============================================================

interface FilterSwitchProps {
  /** Состояние */
  checked?: boolean;
  /** Обработчик изменения */
  onCheckedChange?: (checked: boolean) => void;
  /** Название фильтра */
  label: string;
  /** Дополнительные классы */
  className?: string;
  /** Отключен ли фильтр */
  disabled?: boolean;
}

export function FilterSwitch({
  checked,
  onCheckedChange,
  label,
  className,
  disabled = false,
}: FilterSwitchProps) {
  return (
    <SwitchWithSchema
      checked={checked}
      onCheckedChange={onCheckedChange}
      label={label}
      schemaType="Preference"
      className={className}
      disabled={disabled}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ ПЕРЕКЛЮЧАТЕЛЕЙ
// ============================================================

interface SwitchGroupProps {
  /** Заголовок группы */
  title: string;
  /** Описание группы */
  description?: string;
  /** Переключатели */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function SwitchGroup({
  title,
  description,
  children,
  className,
}: SwitchGroupProps) {
  // Микроразметка для группы
  const groupLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    ...(description && { description: description }),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(groupLd)}</script>
      </Helmet>

      <div className={cn("space-y-4", className)}>
        <div>
          <h3
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </>
  );
}
