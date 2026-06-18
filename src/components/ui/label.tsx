import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ LABEL
// ============================================================

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        required: "after:content-['*'] after:ml-0.5 after:text-red-500",
        optional:
          "after:content-['(опционально)'] after:ml-1 after:text-gray-400 after:font-normal",
        error: "text-red-500",
        success: "text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface LabelWithSchemaProps extends React.ComponentProps<typeof Label> {
  /** ID поля, с которым связан лейбл */
  htmlFor?: string;
  /** Текст лейбла */
  children: React.ReactNode;
  /** Тип поля для микроразметки */
  schemaType?:
    | "name"
    | "email"
    | "telephone"
    | "address"
    | "url"
    | "text"
    | "password";
  /** Описание поля (для микроразметки) */
  description?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Label с микроразметкой
 * Используйте для связи лейблов с полями ввода.
 */
export function LabelWithSchema({
  htmlFor,
  children,
  schemaType = "text",
  description,
  className,
  ...props
}: LabelWithSchemaProps) {
  // Формируем микроразметку для лейбла
  const labelLd = {
    "@context": "https://schema.org",
    "@type": "PropertyValue",
    name: typeof children === "string" ? children : "Поле ввода",
    valueReference: {
      "@type": "DataType",
      name: schemaType,
    },
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка лейбла */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(labelLd)}</script>
      </Helmet>

      <Label htmlFor={htmlFor} className={cn("block", className)} {...props}>
        {children}
      </Label>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Лейбл для поля "Имя"
 */
export const NameLabel: React.FC<
  Omit<LabelWithSchemaProps, "schemaType" | "children">
> = (props) => (
  <LabelWithSchema schemaType="name" {...props}>
    Имя
  </LabelWithSchema>
);

/**
 * Лейбл для поля "Телефон"
 */
export const PhoneLabel: React.FC<
  Omit<LabelWithSchemaProps, "schemaType" | "children">
> = (props) => (
  <LabelWithSchema schemaType="telephone" {...props}>
    Номер телефона
  </LabelWithSchema>
);

/**
 * Лейбл для поля "Email"
 */
export const EmailLabel: React.FC<
  Omit<LabelWithSchemaProps, "schemaType" | "children">
> = (props) => (
  <LabelWithSchema schemaType="email" {...props}>
    Email
  </LabelWithSchema>
);

/**
 * Лейбл для поля "Адрес"
 */
export const AddressLabel: React.FC<
  Omit<LabelWithSchemaProps, "schemaType" | "children">
> = (props) => (
  <LabelWithSchema schemaType="address" {...props}>
    Адрес
  </LabelWithSchema>
);

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ ЛЕЙБЛОВ (например, для формы)
// ============================================================

interface LabelGroupProps {
  /** Дочерние элементы (лейблы) */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Заголовок группы */
  title?: string;
  /** Описание группы */
  description?: string;
}

export function LabelGroup({
  children,
  className,
  title,
  description,
}: LabelGroupProps) {
  return (
    <div className={cn("space-y-1", className)}>
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
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ПОЛЯ С ЛЕЙБЛОМ И ОПИСАНИЕМ
// ============================================================

interface FieldWithLabelProps {
  /** ID поля */
  id: string;
  /** Лейбл */
  label: string;
  /** Описание (подсказка) */
  description?: string;
  /** Поле ввода */
  children: React.ReactNode;
  /** Тип поля для микроразметки */
  schemaType?:
    | "name"
    | "email"
    | "telephone"
    | "address"
    | "url"
    | "text"
    | "password";
  /** Состояние ошибки */
  error?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Дополнительные классы для лейбла */
  labelClassName?: string;
}

export function FieldWithLabel({
  id,
  label,
  description,
  children,
  schemaType = "text",
  error = false,
  className,
  labelClassName,
}: FieldWithLabelProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <LabelWithSchema
        htmlFor={id}
        schemaType={schemaType}
        description={description}
        className={cn(error && "text-red-500", labelClassName)}
      >
        {label}
      </LabelWithSchema>

      {children}

      {description && (
        <p className="text-xs" style={{ color: "var(--gray)" }}>
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ВИЗУАЛЬНО СКРЫТОГО ЛЕЙБЛА (для доступности)
// ============================================================

interface VisuallyHiddenLabelProps {
  /** Текст лейбла (виден только скринридерам) */
  children: React.ReactNode;
  /** ID поля, с которым связан лейбл */
  htmlFor: string;
}

export function VisuallyHiddenLabel({
  children,
  htmlFor,
}: VisuallyHiddenLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="sr-only">
      {children}
    </Label>
  );
}
