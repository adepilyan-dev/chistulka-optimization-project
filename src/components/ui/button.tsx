import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ BUTTON
// ============================================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Добавляем брендовый вариант для вашего сайта
        brand: "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)]/90",
        "brand-outline":
          "border-2 border-[var(--teal)] text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ButtonWithSchemaProps extends Omit<ButtonProps, "asChild"> {
  /** Тип действия для микроразметки */
  actionType?:
    | "OrderAction"
    | "ContactAction"
    | "ReserveAction"
    | "BookAction"
    | "CallAction"
    | "ConfirmAction"
    | "CheckoutAction"
    | "SubscribeAction";
  /** URL действия (для микроразметки) */
  actionUrl?: string;
  /** Описание действия */
  actionDescription?: string;
  /** Цена (для OrderAction) */
  price?: number;
  /** Валюта (для OrderAction) */
  priceCurrency?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Button с микроразметкой Action
 * Используйте для кнопок с важными действиями (заказ, звонок, запись).
 */
export function ButtonWithSchema({
  children,
  actionType = "ConfirmAction",
  actionUrl,
  actionDescription,
  price,
  priceCurrency = "RUB",
  className,
  variant = "brand",
  size = "default",
  onClick,
  ...props
}: ButtonWithSchemaProps) {
  // Формируем микроразметку действия
  const actionLd = {
    "@context": "https://schema.org",
    "@type": actionType,
    name: typeof children === "string" ? children : "Действие",
    ...(actionDescription && { description: actionDescription }),
    ...(actionUrl && { target: actionUrl }),
    ...(price !== undefined && {
      price: price,
      priceCurrency: priceCurrency,
    }),
    potentialAction: {
      "@type": actionType,
      ...(actionUrl && { target: actionUrl }),
    },
  };

  // Обработка клика с отправкой цели в Яндекс.Метрику
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Отправка цели в Яндекс.Метрику (если доступна)
    if (window.ym) {
      window.ym("form_submit", actionType);
    }
    onClick?.(e);
  };

  return (
    <>
      {/* Микроразметка действия */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(actionLd)}</script>
      </Helmet>

      {/* Кнопка с улучшенной доступностью */}
      <Button
        variant={variant}
        size={size}
        className={cn("font-oswald tracking-wide", className)}
        onClick={handleClick}
        aria-label={typeof children === "string" ? children : undefined}
        {...props}
      >
        {children}
      </Button>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КНОПКИ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Кнопка "Заказать" — для оформления заказа
 */
export function OrderButton({
  children = "Заказать",
  price,
  onClick,
  className,
  ...props
}: Omit<ButtonWithSchemaProps, "actionType"> & { price?: number }) {
  return (
    <ButtonWithSchema
      actionType="OrderAction"
      price={price}
      actionDescription="Оформление заказа на химчистку мебели"
      onClick={onClick}
      className={cn("btn-primary", className)}
      {...props}
    >
      {children}
    </ButtonWithSchema>
  );
}

/**
 * Кнопка "Позвонить" — для звонка
 */
export function CallButton({
  phone = "+79189682882",
  children = "Позвонить",
  onClick,
  className,
  ...props
}: Omit<ButtonWithSchemaProps, "actionType" | "actionUrl"> & {
  phone?: string;
}) {
  return (
    <ButtonWithSchema
      actionType="CallAction"
      actionUrl={`tel:${phone}`}
      actionDescription="Позвонить в Аренда Чистоты"
      onClick={onClick}
      className={cn("bg-green-500 text-white hover:bg-green-600", className)}
      {...props}
    >
      {children}
    </ButtonWithSchema>
  );
}

/**
 * Кнопка "Записаться" — для записи на услугу
 */
export function BookButton({
  children = "Записаться",
  onClick,
  className,
  ...props
}: Omit<ButtonWithSchemaProps, "actionType">) {
  return (
    <ButtonWithSchema
      actionType="BookAction"
      actionDescription="Запись на химчистку мебели"
      onClick={onClick}
      className={cn("btn-primary", className)}
      {...props}
    >
      {children}
    </ButtonWithSchema>
  );
}

/**
 * Кнопка "Оставить заявку" — для формы
 */
export function ContactButton({
  children = "Оставить заявку",
  onClick,
  className,
  ...props
}: Omit<ButtonWithSchemaProps, "actionType">) {
  return (
    <ButtonWithSchema
      actionType="ContactAction"
      actionDescription="Оставить заявку на химчистку"
      onClick={onClick}
      className={cn("btn-primary", className)}
      {...props}
    >
      {children}
    </ButtonWithSchema>
  );
}

/**
 * Кнопка "Рассчитать цену" — для калькулятора
 */
export function CalculateButton({
  children = "Рассчитать цену",
  onClick,
  className,
  ...props
}: Omit<ButtonWithSchemaProps, "actionType">) {
  return (
    <ButtonWithSchema
      actionType="ConfirmAction"
      actionDescription="Расчёт стоимости химчистки"
      onClick={onClick}
      variant="outline"
      className={className}
      {...props}
    >
      {children}
    </ButtonWithSchema>
  );
}
