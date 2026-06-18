import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ BADGE
// ============================================================

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Добавляем варианты для SEO-меток
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80",
        promo:
          "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200/80",
        brand:
          "border-transparent bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface BadgeWithSchemaProps {
  /** Текст бейджа */
  children: React.ReactNode;
  /** Вариант стиля */
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "promo"
    | "brand";
  /** Тип бейджа для микроразметки */
  schemaType?: "Offer" | "Product" | "Service" | "CreativeWork" | "Thing";
  /** Свойство, которое описывает бейдж (например, "availability", "price", "rating") */
  schemaProperty?: string;
  /** Значение свойства (например, "InStock", "⭐⭐⭐⭐⭐") */
  schemaValue?: string;
  /** Дополнительные классы */
  className?: string;
  /** Роль для доступности */
  role?: string;
  /** ID для связывания с элементом */
  id?: string;
}

/**
 * Компонент Badge с автоматической микроразметкой
 * Используйте для меток: "Хит", "Популярно", "Скидка", "Новинка" и т.д.
 */
export function BadgeWithSchema({
  children,
  variant = "default",
  schemaType = "Thing",
  schemaProperty,
  schemaValue,
  className,
  role = "status",
  id,
}: BadgeWithSchemaProps) {
  // Формируем микроразметку
  const badgeLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(schemaProperty && schemaValue && { [schemaProperty]: schemaValue }),
    ...(typeof children === "string" && { name: children }),
  };

  return (
    <>
      {/* Микроразметка бейджа */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(badgeLd)}</script>
      </Helmet>

      {/* Визуальный бейдж */}
      <Badge
        variant={variant}
        className={cn("font-oswald tracking-wide", className)}
        role={role}
        id={id}
      >
        {children}
      </Badge>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ БЕЙДЖИ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Бейдж "Хит" — для самых популярных услуг
 */
export function HitBadge({ className }: { className?: string }) {
  return (
    <BadgeWithSchema
      variant="promo"
      schemaType="Product"
      schemaProperty="popularity"
      schemaValue="high"
      className={cn(
        "bg-purple-100 text-purple-800 border-purple-200",
        className,
      )}
    >
      🔥 Хит
    </BadgeWithSchema>
  );
}

/**
 * Бейдж "Популярно" — для популярных услуг
 */
export function PopularBadge({ className }: { className?: string }) {
  return (
    <BadgeWithSchema
      variant="warning"
      schemaType="Product"
      schemaProperty="popularity"
      schemaValue="medium"
      className={cn(
        "bg-yellow-100 text-yellow-800 border-yellow-200",
        className,
      )}
    >
      ⭐ Популярно
    </BadgeWithSchema>
  );
}

/**
 * Бейдж "Акция" — для товаров и услуг со скидкой
 */
export function PromoBadge({
  className,
  discount,
}: {
  className?: string;
  discount?: string;
}) {
  return (
    <BadgeWithSchema
      variant="brand"
      schemaType="Offer"
      schemaProperty="priceSpecification"
      schemaValue={discount || "Скидка"}
      className={cn(
        "bg-[var(--teal)] text-white border-[var(--teal)]",
        className,
      )}
    >
      🎁 {discount || "Скидка"}
    </BadgeWithSchema>
  );
}

/**
 * Бейдж "Новинка" — для новых услуг или статей
 */
export function NewBadge({ className }: { className?: string }) {
  return (
    <BadgeWithSchema
      variant="success"
      schemaType="CreativeWork"
      schemaProperty="datePublished"
      schemaValue={new Date().toISOString().split("T")[0]}
      className={cn("bg-green-100 text-green-800 border-green-200", className)}
    >
      ✨ Новинка
    </BadgeWithSchema>
  );
}

/**
 * Бейдж "Гарантия" — для услуг с гарантией
 */
export function GuaranteeBadge({ className }: { className?: string }) {
  return (
    <BadgeWithSchema
      variant="success"
      schemaType="Service"
      schemaProperty="available"
      schemaValue="true"
      className={cn("bg-blue-100 text-blue-800 border-blue-200", className)}
    >
      ✅ Гарантия
    </BadgeWithSchema>
  );
}

/**
 * Бейдж для рейтинга (звезды)
 */
export function RatingBadge({
  rating,
  className,
}: {
  rating: string;
  className?: string;
}) {
  return (
    <BadgeWithSchema
      variant="warning"
      schemaType="Product"
      schemaProperty="ratingValue"
      schemaValue={rating}
      className={cn(
        "bg-yellow-50 text-yellow-700 border-yellow-200",
        className,
      )}
    >
      ⭐ {rating}
    </BadgeWithSchema>
  );
}
