import * as React from "react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ INPUT
// ============================================================

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface InputWithSchemaProps extends React.ComponentProps<"input"> {
  /** Лейбл для поля */
  label?: string;
  /** Описание поля */
  description?: string;
  /** ID для связи с лейблом */
  id?: string;
  /** Тип данных для микроразметки */
  schemaType?: "name" | "email" | "telephone" | "address" | "url" | "text";
  /** Обязательное поле */
  required?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Дополнительные классы для контейнера */
  containerClassName?: string;
}

/**
 * Компонент Input с микроразметкой
 * Используйте для форм с важными полями (имя, телефон, email).
 */
export function InputWithSchema({
  label,
  description,
  id,
  schemaType = "text",
  required = false,
  error = false,
  errorMessage,
  containerClassName,
  className,
  ...props
}: InputWithSchemaProps) {
  const inputId = id || `input-${React.useId()}`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  // Формируем микроразметку для поля
  const inputLd = {
    "@context": "https://schema.org",
    "@type": "PropertyValue",
    name: label || props.placeholder || "Поле ввода",
    value: props.value || "",
    valueReference: {
      "@type": "DataType",
      name: schemaType,
    },
  };

  // Определяем HTML-атрибуты для доступности
  const ariaProps = {
    ...(description && { "aria-describedby": descriptionId }),
    ...(error && errorMessage && { "aria-errormessage": errorId }),
    ...(error && { "aria-invalid": true }),
  };

  return (
    <>
      {/* Микроразметка поля */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(inputLd)}</script>
      </Helmet>

      <div className={cn("space-y-1.5", containerClassName)}>
        {/* Лейбл */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn("text-sm font-medium", error && "text-red-500")}
            style={{ color: error ? "#ef4444" : "var(--dark)" }}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {/* Поле ввода */}
        <Input
          id={inputId}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          required={required}
          aria-required={required}
          {...ariaProps}
          {...props}
        />

        {/* Описание */}
        {description && !error && (
          <p
            id={descriptionId}
            className="text-sm"
            style={{ color: "var(--gray)" }}
          >
            {description}
          </p>
        )}

        {/* Сообщение об ошибке */}
        {error && errorMessage && (
          <p
            id={errorId}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            <span>❌</span>
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Поле для ввода имени
 */
export const NameInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    InputWithSchemaProps,
    "schemaType" | "type" | "placeholder" | "label" | "autoComplete"
  >
>((props, ref) => (
  <InputWithSchema
    ref={ref}
    type="text"
    label="Ваше имя"
    placeholder="Иван Иванов"
    schemaType="name"
    autoComplete="name"
    {...props}
  />
));
NameInput.displayName = "NameInput";

/**
 * Поле для ввода телефона
 */
export const PhoneInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    InputWithSchemaProps,
    "schemaType" | "type" | "placeholder" | "label" | "autoComplete"
  >
>((props, ref) => (
  <InputWithSchema
    ref={ref}
    type="tel"
    label="Номер телефона"
    placeholder="+7 918 968-28-82"
    schemaType="telephone"
    autoComplete="tel"
    {...props}
  />
));
PhoneInput.displayName = "PhoneInput";

/**
 * Поле для ввода email
 */
export const EmailInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    InputWithSchemaProps,
    "schemaType" | "type" | "placeholder" | "label" | "autoComplete"
  >
>((props, ref) => (
  <InputWithSchema
    ref={ref}
    type="email"
    label="Email"
    placeholder="example@mail.ru"
    schemaType="email"
    autoComplete="email"
    {...props}
  />
));
EmailInput.displayName = "EmailInput";

/**
 * Поле для ввода адреса
 */
export const AddressInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    InputWithSchemaProps,
    "schemaType" | "type" | "placeholder" | "label" | "autoComplete"
  >
>((props, ref) => (
  <InputWithSchema
    ref={ref}
    type="text"
    label="Адрес"
    placeholder="Краснодар, ул. Селезнёва, 4Б"
    schemaType="address"
    autoComplete="street-address"
    {...props}
  />
));
AddressInput.displayName = "AddressInput";

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ ПОЛЕЙ (например, Имя + Телефон)
// ============================================================

interface InputGroupProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Направление */
  direction?: "row" | "column";
}

export function InputGroup({
  children,
  className,
  direction = "column",
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-4",
        direction === "row" ? "flex-row flex-wrap" : "flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ПОЛЯ С КНОПКОЙ
// ============================================================

interface InputWithButtonProps extends InputWithSchemaProps {
  /** Текст кнопки */
  buttonText: string;
  /** Обработчик клика по кнопке */
  onButtonClick: () => void;
  /** Отключена ли кнопка */
  buttonDisabled?: boolean;
  /** Позиция кнопки */
  buttonPosition?: "left" | "right";
  /** Вариант кнопки */
  buttonVariant?: "primary" | "outline";
}

export function InputWithButton({
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  buttonPosition = "right",
  buttonVariant = "primary",
  className,
  ...props
}: InputWithButtonProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center gap-2">
        {buttonPosition === "left" && (
          <button
            type="button"
            onClick={onButtonClick}
            disabled={buttonDisabled}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              buttonVariant === "primary"
                ? "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)]"
                : "border border-[var(--border)] hover:bg-gray-50",
              buttonDisabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {buttonText}
          </button>
        )}
        <InputWithSchema {...props} />
        {buttonPosition === "right" && (
          <button
            type="button"
            onClick={onButtonClick}
            disabled={buttonDisabled}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              buttonVariant === "primary"
                ? "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)]"
                : "border border-[var(--border)] hover:bg-gray-50",
              buttonDisabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
