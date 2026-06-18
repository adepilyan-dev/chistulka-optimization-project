import * as React from "react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ CARD
// ============================================================

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CardWithSchemaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Тип карточки */
  cardType?:
    | "Service"
    | "Product"
    | "Article"
    | "Review"
    | "Event"
    | "Person"
    | "Organization";
  /** Название (для микроразметки) */
  name?: string;
  /** Описание (для микроразметки) */
  description?: string;
  /** URL (для микроразметки) */
  url?: string;
  /** Изображение (для микроразметки) */
  image?: string;
  /** Цена (для Product/Service) */
  price?: number;
  /** Валюта (для Product/Service) */
  priceCurrency?: string;
  /** Рейтинг (для Review) */
  ratingValue?: number;
  /** Количество отзывов (для Review) */
  reviewCount?: number;
  /** Дата публикации (для Article) */
  datePublished?: string;
  /** Автор (для Article) */
  author?: string;
  /** Дополнительные классы */
  className?: string;
  children?: React.ReactNode;
}

/**
 * Компонент Card с микроразметкой
 * Используйте для карточек услуг, товаров, статей и отзывов.
 */
export function CardWithSchema({
  cardType = "Service",
  name,
  description,
  url,
  image,
  price,
  priceCurrency = "RUB",
  ratingValue,
  reviewCount,
  datePublished,
  author,
  className,
  children,
  ...props
}: CardWithSchemaProps) {
  // Формируем базовую микроразметку
  const cardLd: any = {
    "@context": "https://schema.org",
    "@type": cardType,
    ...(name && { name: name }),
    ...(description && { description: description }),
    ...(url && { url: url }),
    ...(image && { image: image }),
  };

  // Добавляем специфические поля для разных типов
  if (cardType === "Service" || cardType === "Product") {
    if (price !== undefined) {
      cardLd.offers = {
        "@type": "Offer",
        price: price,
        priceCurrency: priceCurrency,
        availability: "https://schema.org/InStock",
      };
    }
  }

  if (cardType === "Review" && ratingValue !== undefined) {
    cardLd.reviewRating = {
      "@type": "Rating",
      ratingValue: ratingValue,
      ...(reviewCount && { reviewCount: reviewCount }),
    };
  }

  if (cardType === "Article") {
    if (datePublished) {
      cardLd.datePublished = datePublished;
    }
    if (author) {
      cardLd.author = {
        "@type": "Person",
        name: author,
      };
    }
  }

  return (
    <>
      {/* Микроразметка карточки */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(cardLd)}</script>
      </Helmet>

      {/* Визуальная карточка */}
      <Card
        className={cn(
          "overflow-hidden hover-lift transition-all duration-300",
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КАРТОЧКИ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

interface ServiceCardProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** URL изображения */
  image: string;
  /** Цена (опционально) */
  price?: number;
  /** Ссылка на страницу услуги */
  href: string;
  /** Бейдж (Хит, Популярно и т.д.) */
  badge?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  children?: React.ReactNode;
}

/**
 * Карточка услуги с микроразметкой Service
 */
export function ServiceCard({
  title,
  description,
  image,
  price,
  href,
  badge,
  className,
  children,
}: ServiceCardProps) {
  return (
    <CardWithSchema
      cardType="Service"
      name={title}
      description={description}
      url={href}
      image={image}
      price={price}
      className={cn("group", className)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {badge && <div className="absolute top-3 right-3">{badge}</div>}
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-oswald">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between items-center">
        {price !== undefined && (
          <span
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--teal)" }}
          >
            от {price.toLocaleString("ru")} ₽
          </span>
        )}
        <a
          href={href}
          className="text-sm font-semibold flex items-center gap-1 transition-all hover:gap-2"
          style={{ color: "var(--teal)" }}
        >
          Подробнее →
        </a>
      </CardFooter>
    </CardWithSchema>
  );
}

/**
 * Карточка отзыва с микроразметкой Review
 */
interface ReviewCardProps {
  /** Имя автора */
  author: string;
  /** Текст отзыва */
  text: string;
  /** Рейтинг (1-5) */
  rating: number;
  /** Роль автора (опционально) */
  role?: string;
  /** Инициалы для аватара */
  initials: string;
  /** Дополнительные классы */
  className?: string;
}

export function ReviewCard({
  author,
  text,
  rating,
  role,
  initials,
  className,
}: ReviewCardProps) {
  return (
    <CardWithSchema
      cardType="Review"
      name={`Отзыв от ${author}`}
      description={text}
      ratingValue={rating}
      reviewCount={1}
      className={cn("bg-[var(--light-bg)]", className)}
    >
      <CardContent className="pt-6">
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              ★
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
          "{text}"
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "var(--teal)" }}
        >
          {initials}
        </div>
        <div>
          <div
            className="font-semibold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {author}
          </div>
          {role && (
            <div className="text-xs" style={{ color: "var(--gray)" }}>
              {role}
            </div>
          )}
        </div>
      </CardFooter>
    </CardWithSchema>
  );
}

/**
 * Карточка статьи блога с микроразметкой Article
 */
interface ArticleCardProps {
  /** Заголовок */
  title: string;
  /** Описание */
  description: string;
  /** URL изображения */
  image: string;
  /** Ссылка на статью */
  href: string;
  /** Дата публикации */
  date: string;
  /** Автор */
  author: string;
  /** Категория */
  category?: string;
  /** Время чтения */
  readTime?: string;
  /** Дополнительные классы */
  className?: string;
}

export function ArticleCard({
  title,
  description,
  image,
  href,
  date,
  author,
  category,
  readTime,
  className,
}: ArticleCardProps) {
  return (
    <CardWithSchema
      cardType="Article"
      name={title}
      description={description}
      url={href}
      image={image}
      datePublished={date}
      author={author}
      className={cn("group overflow-hidden", className)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <CardHeader>
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--gray)" }}
        >
          {category && <span className="section-tag">{category}</span>}
          {readTime && <span>{readTime} чтения</span>}
        </div>
        <CardTitle className="font-oswald text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs" style={{ color: "var(--gray)" }}>
          {date} • {author}
        </span>
        <a
          href={href}
          className="text-sm font-semibold flex items-center gap-1 transition-all hover:gap-2"
          style={{ color: "var(--teal)" }}
        >
          Читать →
        </a>
      </CardFooter>
    </CardWithSchema>
  );
}
