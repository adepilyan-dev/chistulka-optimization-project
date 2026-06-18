import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TOOLTIP
// ============================================================

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface TooltipWithSchemaProps {
  /** Содержимое подсказки */
  content: React.ReactNode;
  /** Дочерний элемент (триггер) */
  children: React.ReactNode;
  /** Заголовок подсказки (для микроразметки) */
  title?: string;
  /** Описание подсказки (для микроразметки) */
  description?: string;
  /** Тип подсказки для микроразметки */
  schemaType?: "Help" | "FAQ" | "Info";
  /** Дополнительные классы */
  className?: string;
  /** Сторона отображения */
  side?: "top" | "right" | "bottom" | "left";
  /** Отступ от триггера */
  sideOffset?: number;
  /** Задержка перед появлением */
  delayDuration?: number;
}

/**
 * Компонент Tooltip с микроразметкой
 * Используйте для подсказок, пояснений, дополнительной информации.
 */
export function TooltipWithSchema({
  content,
  children,
  title,
  description,
  schemaType = "Help",
  className,
  side = "top",
  sideOffset = 4,
  delayDuration = 200,
}: TooltipWithSchemaProps) {
  // Формируем микроразметку
  const tooltipLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(tooltipLd)}</script>
      </Helmet>

      <TooltipProvider delayDuration={delayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn("cursor-help inline-block", className)}>
              {children}
            </span>
          </TooltipTrigger>
          <TooltipContent side={side} sideOffset={sideOffset}>
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПОДСКАЗКИ С ИКОНКОЙ
// ============================================================

interface HelpTooltipProps {
  /** Текст подсказки */
  text: string;
  /** Заголовок подсказки (опционально) */
  title?: string;
  /** Дополнительные классы */
  className?: string;
  /** Сторона отображения */
  side?: "top" | "right" | "bottom" | "left";
  /** Триггер (по умолчанию иконка "?") */
  trigger?: React.ReactNode;
}

export function HelpTooltip({
  text,
  title,
  className,
  side = "top",
  trigger,
}: HelpTooltipProps) {
  const defaultTrigger = (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white transition-colors hover:bg-[var(--teal-dark)]"
      style={{ background: "var(--teal)" }}
    >
      ?
    </span>
  );

  return (
    <TooltipWithSchema
      content={
        <div className="space-y-1 max-w-xs">
          {title && (
            <p className="font-medium text-sm" style={{ color: "var(--dark)" }}>
              {title}
            </p>
          )}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--gray)" }}
          >
            {text}
          </p>
        </div>
      }
      title={title || "Подсказка"}
      description={text}
      schemaType="Help"
      className={className}
      side={side}
    >
      {trigger || defaultTrigger}
    </TooltipWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПОДСКАЗКИ С ЦЕНОЙ
// ============================================================

interface PriceTooltipProps {
  /** Цена */
  price: number;
  /** Валюта */
  currency?: string;
  /** Описание цены */
  description?: string;
  /** Дополнительные классы */
  className?: string;
  /** Триггер */
  children: React.ReactNode;
}

export function PriceTooltip({
  price,
  currency = "₽",
  description,
  className,
  children,
}: PriceTooltipProps) {
  return (
    <TooltipWithSchema
      content={
        <div className="space-y-1">
          <p
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--teal)" }}
          >
            {price.toLocaleString("ru")} {currency}
          </p>
          {description && (
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
        </div>
      }
      title="Цена"
      description={`${price.toLocaleString("ru")} ${currency}`}
      schemaType="Info"
      className={className}
    >
      {children}
    </TooltipWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПОДСКАЗКИ С РЕЙТИНГОМ
// ============================================================

interface RatingTooltipProps {
  /** Рейтинг */
  rating: number;
  /** Количество отзывов */
  reviews?: number;
  /** Дополнительные классы */
  className?: string;
  /** Триггер */
  children: React.ReactNode;
}

export function RatingTooltip({
  rating,
  reviews,
  className,
  children,
}: RatingTooltipProps) {
  return (
    <TooltipWithSchema
      content={
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★</span>
            <span
              className="font-oswald font-bold text-lg"
              style={{ color: "var(--dark)" }}
            >
              {rating.toFixed(1)}
            </span>
          </div>
          {reviews !== undefined && (
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              {reviews} отзывов
            </p>
          )}
        </div>
      }
      title={`Рейтинг ${rating.toFixed(1)}`}
      description={reviews !== undefined ? `${reviews} отзывов` : "Рейтинг"}
      schemaType="Info"
      className={className}
    >
      {children}
    </TooltipWithSchema>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ПОДСКАЗКИ С ПОЛНЫМ ОПИСАНИЕМ УСЛУГИ
// ============================================================

interface ServiceTooltipProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** Цена (опционально) */
  price?: number;
  /** Дополнительные классы */
  className?: string;
  /** Триггер */
  children: React.ReactNode;
}

export function ServiceTooltip({
  title,
  description,
  price,
  className,
  children,
}: ServiceTooltipProps) {
  return (
    <TooltipWithSchema
      content={
        <div className="space-y-2 max-w-xs">
          <h4
            className="font-oswald font-bold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--gray)" }}
          >
            {description}
          </p>
          {price !== undefined && (
            <p
              className="font-oswald font-bold text-sm"
              style={{ color: "var(--teal)" }}
            >
              {price.toLocaleString("ru")} ₽
            </p>
          )}
        </div>
      }
      title={title}
      description={description}
      schemaType="Service"
      className={className}
      side="right"
    >
      {children}
    </TooltipWithSchema>
  );
}
