import * as React from "react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TEXTAREA
// ============================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface TextareaWithSchemaProps extends TextareaProps {
  /** Лейбл для поля */
  label?: string;
  /** Описание поля */
  description?: string;
  /** ID для связи с лейблом */
  id?: string;
  /** Тип данных для микроразметки */
  schemaType?: "text" | "comment" | "message" | "description";
  /** Обязательное поле */
  required?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Дополнительные классы для контейнера */
  containerClassName?: string;
  /** Счетчик символов */
  showCounter?: boolean;
  /** Максимальное количество символов */
  maxLength?: number;
}

/**
 * Компонент Textarea с микроразметкой
 * Используйте для полей ввода сообщений, комментариев, отзывов.
 */
export function TextareaWithSchema({
  label,
  description,
  id,
  schemaType = "message",
  required = false,
  error = false,
  errorMessage,
  containerClassName,
  className,
  showCounter = false,
  maxLength,
  value,
  onChange,
  ...props
}: TextareaWithSchemaProps) {
  const textareaId = id || `textarea-${React.useId()}`;
  const descriptionId = `${textareaId}-description`;
  const errorId = `${textareaId}-error`;
  const [charCount, setCharCount] = React.useState(0);

  // Формируем микроразметку
  const textareaLd = {
    "@context": "https://schema.org",
    "@type": "PropertyValue",
    name: label || "Поле ввода",
    valueReference: {
      "@type": "DataType",
      name: schemaType,
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
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
        <script type="application/ld+json">{JSON.stringify(textareaLd)}</script>
      </Helmet>

      <div className={cn("space-y-1.5", containerClassName)}>
        {/* Лейбл */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn("text-sm font-medium", error && "text-red-500")}
            style={{ color: error ? "#ef4444" : "var(--dark)" }}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {/* Текстовое поле */}
        <Textarea
          id={textareaId}
          className={cn(
            "transition-colors",
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          required={required}
          aria-required={required}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...ariaProps}
          {...props}
        />

        {/* Счетчик символов */}
        {showCounter && maxLength && (
          <div
            className={cn(
              "text-xs text-right transition-colors",
              charCount > maxLength * 0.9 ? "text-yellow-500" : "",
              charCount >= maxLength ? "text-red-500" : "",
              "text-gray-400",
            )}
          >
            {charCount} / {maxLength}
          </div>
        )}

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
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ОТЗЫВОВ
// ============================================================

interface ReviewTextareaProps
  extends Omit<
    TextareaWithSchemaProps,
    "schemaType" | "placeholder" | "label"
  > {
  /** Дополнительные классы */
  className?: string;
}

export function ReviewTextarea({ className, ...props }: ReviewTextareaProps) {
  return (
    <TextareaWithSchema
      label="Ваш отзыв"
      placeholder="Напишите, что вам понравилось, а что можно улучшить..."
      schemaType="comment"
      className={cn("min-h-[120px]", className)}
      {...props}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СООБЩЕНИЙ
// ============================================================

interface MessageTextareaProps
  extends Omit<
    TextareaWithSchemaProps,
    "schemaType" | "placeholder" | "label"
  > {
  /** Дополнительные классы */
  className?: string;
}

export function MessageTextarea({ className, ...props }: MessageTextareaProps) {
  return (
    <TextareaWithSchema
      label="Сообщение"
      placeholder="Опишите вашу задачу или вопрос..."
      schemaType="message"
      className={cn("min-h-[100px]", className)}
      {...props}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ОПИСАНИЯ УСЛУГИ
// ============================================================

interface DescriptionTextareaProps
  extends Omit<
    TextareaWithSchemaProps,
    "schemaType" | "placeholder" | "label"
  > {
  /** Дополнительные классы */
  className?: string;
}

export function DescriptionTextarea({
  className,
  ...props
}: DescriptionTextareaProps) {
  return (
    <TextareaWithSchema
      label="Описание"
      placeholder="Подробное описание..."
      schemaType="description"
      className={cn("min-h-[100px]", className)}
      {...props}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ АДМИН-ПАНЕЛИ (SEO-оптимизация)
// ============================================================

interface SeoTextareaProps
  extends Omit<TextareaWithSchemaProps, "schemaType" | "placeholder"> {
  /** Дополнительные классы */
  className?: string;
}

export function SeoTextarea({ className, ...props }: SeoTextareaProps) {
  return (
    <TextareaWithSchema
      placeholder="Введите SEO-текст..."
      schemaType="description"
      className={cn("min-h-[120px] font-mono text-sm", className)}
      {...props}
    />
  );
}
