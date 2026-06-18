import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ HOVER CARD
// ============================================================

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface HoverCardWithSchemaProps {
  /** Заголовок карточки */
  title?: string;
  /** Описание карточки */
  description?: string;
  /** Изображение (опционально) */
  image?: string;
  /** Цена (опционально) */
  price?: number;
  /** Рейтинг (опционально) */
  rating?: number;
  /** Тип содержимого для микроразметки */
  schemaType?: "Service" | "Product" | "Person" | "Organization";
  /** Триггер (элемент, при наведении на который появляется карточка) */
  children: React.ReactNode;
  /** Содержимое карточки */
  content: React.ReactNode;
  /** Открыта ли карточка (управляемое состояние) */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Дополнительные классы */
  className?: string;
  /** Дополнительные классы для содержимого */
  contentClassName?: string;
}

/**
 * Компонент HoverCard с микроразметкой
 * Используйте для подсказок к услугам, деталей товаров, информации об авторе.
 */
export function HoverCardWithSchema({
  title,
  description,
  image,
  price,
  rating,
  schemaType = "Service",
  children,
  content,
  open,
  onOpenChange,
  className,
  contentClassName,
}: HoverCardWithSchemaProps) {
  // Формируем микроразметку
  const hoverCardLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
    ...(description && { description: description }),
    ...(image && { image: image }),
    ...(price !== undefined && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
      },
    }),
    ...(rating !== undefined && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        bestRating: 5,
      },
    }),
  };

  return (
    <>
      {/* Микроразметка содержимого */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(hoverCardLd)}
        </script>
      </Helmet>

      <HoverCard open={open} onOpenChange={onOpenChange}>
        <HoverCardTrigger asChild>
          <span className={cn("cursor-help", className)}>{children}</span>
        </HoverCardTrigger>
        <HoverCardContent
          className={cn("w-72 p-4", contentClassName)}
          align="center"
          sideOffset={8}
        >
          {content || (
            <div className="space-y-2">
              {image && (
                <img
                  src={image}
                  alt={title || "Изображение"}
                  width={200}
                  height={120}
                  className="w-full rounded-lg object-cover max-h-32"
                  loading="lazy"
                  decoding="async"
                />
              )}
              {title && (
                <h4
                  className="font-oswald font-semibold text-base"
                  style={{ color: "var(--dark)" }}
                >
                  {title}
                </h4>
              )}
              {description && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--gray)" }}
                >
                  {description}
                </p>
              )}
              {price !== undefined && (
                <p
                  className="font-oswald font-bold text-sm"
                  style={{ color: "var(--teal)" }}
                >
                  {price.toLocaleString("ru")} ₽
                </p>
              )}
              {rating !== undefined && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--dark)" }}
                  >
                    {rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ УСЛУГ
// ============================================================

interface ServiceHoverCardProps {
  /** Название услуги */
  title: string;
  /** Краткое описание */
  description: string;
  /** Изображение */
  image?: string;
  /** Цена */
  price?: number;
  /** Рейтинг */
  rating?: number;
  /** Дополнительные характеристики */
  features?: string[];
  /** Триггер (элемент, при наведении на который появляется карточка) */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент HoverCard для услуг
 * Автоматически добавляет микроразметку Service
 */
export function ServiceHoverCard({
  title,
  description,
  image,
  price,
  rating,
  features,
  children,
  className,
}: ServiceHoverCardProps) {
  const content = (
    <div className="space-y-2">
      {image && (
        <img
          src={image}
          alt={title}
          width={200}
          height={120}
          className="w-full rounded-lg object-cover max-h-32"
          loading="lazy"
          decoding="async"
        />
      )}
      <h4
        className="font-oswald font-semibold text-base"
        style={{ color: "var(--dark)" }}
      >
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
        {description}
      </p>
      {features && features.length > 0 && (
        <ul className="text-xs space-y-0.5" style={{ color: "var(--gray)" }}>
          {features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-1">
              <span className="text-[var(--teal)]">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {price !== undefined && (
          <span
            className="font-oswald font-bold text-sm"
            style={{ color: "var(--teal)" }}
          >
            {price.toLocaleString("ru")} ₽
          </span>
        )}
        {rating !== undefined && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--gray)" }}
          >
            ★ {rating.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <HoverCardWithSchema
      title={title}
      description={description}
      image={image}
      price={price}
      rating={rating}
      schemaType="Service"
      content={content}
      className={className}
    >
      {children}
    </HoverCardWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ АВТОРА
// ============================================================

interface AuthorHoverCardProps {
  /** Имя автора */
  name: string;
  /** Должность или роль */
  role?: string;
  /** Аватар (изображение) */
  avatar?: string;
  /** Количество отзывов */
  reviewCount?: number;
  /** Рейтинг */
  rating?: number;
  /** Ссылка на профиль */
  profileUrl?: string;
  /** Триггер (элемент, при наведении на который появляется карточка) */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент HoverCard для автора
 * Автоматически добавляет микроразметку Person
 */
export function AuthorHoverCard({
  name,
  role,
  avatar,
  reviewCount,
  rating,
  profileUrl,
  children,
  className,
}: AuthorHoverCardProps) {
  const content = (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <div>
          <h4
            className="font-oswald font-semibold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {name}
          </h4>
          {role && (
            <p className="text-xs" style={{ color: "var(--gray)" }}>
              {role}
            </p>
          )}
        </div>
      </div>
      {rating !== undefined && (
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--gray)" }}
        >
          <span className="text-yellow-400">★</span>
          <span className="font-semibold" style={{ color: "var(--dark)" }}>
            {rating.toFixed(1)}
          </span>
          {reviewCount !== undefined && <span>({reviewCount} отзывов)</span>}
        </div>
      )}
      {profileUrl && (
        <a
          href={profileUrl}
          className="text-xs font-semibold hover:underline"
          style={{ color: "var(--teal)" }}
        >
          Перейти к профилю →
        </a>
      )}
    </div>
  );

  return (
    <HoverCardWithSchema
      title={name}
      description={role || "Автор"}
      schemaType="Person"
      content={content}
      className={className}
    >
      {children}
    </HoverCardWithSchema>
  );
}
