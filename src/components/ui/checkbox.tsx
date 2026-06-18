import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ CHECKBOX
// ============================================================

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CheckboxWithLabelProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Текст лейбла */
  label: string;
  /** ID для связи с лейблом */
  id?: string;
  /** Описание (дополнительный текст под чекбоксом) */
  description?: string;
  /** Ссылка на политику (для согласия) */
  privacyPolicyLink?: string;
  /** Дополнительные классы для контейнера */
  className?: string;
  /** Дочерние элементы (например, ссылки внутри лейбла) */
  children?: React.ReactNode;
}

/**
 * Компонент Checkbox с лейблом и микроразметкой
 * Используйте для форм согласия, выбора опций и т.д.
 */
export function CheckboxWithLabel({
  label,
  id,
  description,
  privacyPolicyLink,
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: CheckboxWithLabelProps) {
  const checkboxId = id || `checkbox-${React.useId()}`;

  // Формируем микроразметку для согласия (если есть ссылка на политику)
  const consentLd = privacyPolicyLink
    ? {
        "@context": "https://schema.org",
        "@type": "UserConsent",
        name: "Согласие на обработку персональных данных",
        description: label,
        hasPolicy: {
          "@type": "PrivacyPolicy",
          url: privacyPolicyLink,
        },
      }
    : null;

  return (
    <>
      {/* Микроразметка согласия */}
      {consentLd && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(consentLd)}
          </script>
        </Helmet>
      )}

      <div className={cn("flex items-start gap-3", className)}>
        <Checkbox
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-1 flex-shrink-0"
          aria-describedby={
            description ? `${checkboxId}-description` : undefined
          }
          {...props}
        />
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium leading-5 cursor-pointer"
            style={{ color: "var(--dark)" }}
          >
            {label}
            {children}
          </label>
          {description && (
            <p
              id={`${checkboxId}-description`}
              className="text-xs leading-relaxed"
              style={{ color: "var(--gray)" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Чекбокс согласия с политикой конфиденциальности
 */
export function PrivacyCheckbox({
  checked,
  onCheckedChange,
  className,
  privacyPolicyLink = "/privacy",
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  privacyPolicyLink?: string;
}) {
  return (
    <CheckboxWithLabel
      label="Я соглашаюсь с политикой конфиденциальности"
      description="Ваши данные используются только для обработки заявки"
      privacyPolicyLink={privacyPolicyLink}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={className}
    >
      <a
        href={privacyPolicyLink}
        className="text-[var(--teal)] hover:underline ml-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Подробнее
      </a>
    </CheckboxWithLabel>
  );
}

/**
 * Чекбокс согласия на подписку
 */
export function SubscribeCheckbox({
  checked,
  onCheckedChange,
  className,
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <CheckboxWithLabel
      label="Подписаться на новости и акции"
      description="Не чаще 1 раза в месяц, можно отписаться в любой момент"
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={className}
    />
  );
}

/**
 * Группа чекбоксов для выбора услуг
 */
interface ServiceCheckboxProps {
  /** Название услуги */
  label: string;
  /** Описание услуги */
  description?: string;
  /** Цена (опционально) */
  price?: number;
  /** ID услуги */
  serviceId: string;
  /** Состояние */
  checked?: boolean;
  /** Обработчик изменения */
  onCheckedChange?: (checked: boolean) => void;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceCheckbox({
  label,
  description,
  price,
  serviceId,
  checked,
  onCheckedChange,
  className,
}: ServiceCheckboxProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border transition-all",
        className,
      )}
    >
      <CheckboxWithLabel
        label={label}
        description={description}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex-1"
      />
      {price !== undefined && (
        <span
          className="font-oswald font-bold text-sm whitespace-nowrap"
          style={{ color: "var(--teal)" }}
        >
          {price.toLocaleString("ru")} ₽
        </span>
      )}
    </div>
  );
}
