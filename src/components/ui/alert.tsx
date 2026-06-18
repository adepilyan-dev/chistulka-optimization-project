import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ ALERT (с улучшенной доступностью)
// ============================================================

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        // Добавляем варианты для SEO-уведомлений
        info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-500",
        success:
          "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-500",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-500",
        promo:
          "border-purple-200 bg-purple-50 text-purple-800 [&>svg]:text-purple-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    aria-live="polite"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface AlertWithSchemaProps {
  /** Заголовок уведомления */
  title: string;
  /** Описание уведомления */
  description: string;
  /** Вариант стиля */
  variant?:
    | "default"
    | "destructive"
    | "info"
    | "success"
    | "warning"
    | "promo";
  /** Тип уведомления для микроразметки */
  schemaType?:
    | "SpecialAnnouncement"
    | "Offer"
    | "Warning"
    | "HealthTopicContent";
  /** Дата окончания акции (если применимо) */
  expiryDate?: string;
  /** Дополнительные классы */
  className?: string;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Действие (кнопка/ссылка) */
  action?: React.ReactNode;
}

/**
 * Компонент Alert с автоматической микроразметкой
 * Используйте для важных уведомлений, акций и предупреждений.
 */
export function AlertWithSchema({
  title,
  description,
  variant = "default",
  schemaType = "SpecialAnnouncement",
  expiryDate,
  className,
  icon,
  action,
}: AlertWithSchemaProps) {
  // Формируем микроразметку
  const alertLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    description: description,
    ...(expiryDate && { expires: expiryDate }),
    ...(variant === "promo" && {
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "RUB",
      },
    }),
  };

  return (
    <>
      {/* Микроразметка уведомления */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(alertLd)}</script>
      </Helmet>

      {/* Визуальное уведомление */}
      <Alert variant={variant} className={className}>
        {icon && <span className="absolute left-4 top-4">{icon}</span>}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center gap-3">
          <span>{description}</span>
          {action && <span className="mt-1 sm:mt-0">{action}</span>}
        </AlertDescription>
      </Alert>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ ВАРИАНТЫ ДЛЯ SEO
// ============================================================

/**
 * Компонент для акций и спецпредложений
 */
export function PromoAlert({
  title,
  description,
  expiryDate,
  className,
  action,
}: Omit<AlertWithSchemaProps, "variant" | "schemaType">) {
  return (
    <AlertWithSchema
      title={title}
      description={description}
      variant="promo"
      schemaType="Offer"
      expiryDate={expiryDate}
      className={className}
      action={action}
    />
  );
}

/**
 * Компонент для важных предупреждений
 */
export function WarningAlert({
  title,
  description,
  className,
}: Omit<
  AlertWithSchemaProps,
  "variant" | "schemaType" | "expiryDate" | "action"
>) {
  return (
    <AlertWithSchema
      title={title}
      description={description}
      variant="warning"
      schemaType="Warning"
      className={className}
    />
  );
}

/**
 * Компонент для информационных сообщений
 */
export function InfoAlert({
  title,
  description,
  className,
}: Omit<
  AlertWithSchemaProps,
  "variant" | "schemaType" | "expiryDate" | "action"
>) {
  return (
    <AlertWithSchema
      title={title}
      description={description}
      variant="info"
      schemaType="HealthTopicContent"
      className={className}
    />
  );
}

// ============================================================
// ЭКСПОРТ СТАНДАРТНЫХ КОМПОНЕНТОВ
// ============================================================

export { Alert, AlertTitle, AlertDescription };
