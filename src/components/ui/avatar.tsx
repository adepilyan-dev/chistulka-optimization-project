import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ AVATAR
// ============================================================

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface AuthorAvatarProps {
  /** Имя автора */
  name: string;
  /** URL изображения (опционально) */
  image?: string;
  /** Инициалы для fallback */
  initials?: string;
  /** Должность/роль автора */
  role?: string;
  /** URL профиля (ссылка на страницу автора) */
  profileUrl?: string;
  /** Email автора */
  email?: string;
  /** Социальные сети */
  sameAs?: string[];
  /** Размер аватара */
  size?: "sm" | "md" | "lg" | "xl";
  /** Дополнительные классы */
  className?: string;
  /** Отображать имя рядом с аватаркой */
  showName?: boolean;
}

/**
 * Компонент аватара автора с микроразметкой Person и Author
 * Используйте для отзывов, статей блога и других мест, где нужно указать автора.
 */
export function AuthorAvatar({
  name,
  image,
  initials,
  role,
  profileUrl,
  email,
  sameAs,
  size = "md",
  className,
  showName = false,
}: AuthorAvatarProps) {
  // Определяем размеры
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-lg",
  };

  // Формируем микроразметку Person + Author
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    ...(image && { image: image }),
    ...(role && { jobTitle: role }),
    ...(profileUrl && { url: profileUrl }),
    ...(email && { email: email }),
    ...(sameAs && sameAs.length > 0 && { sameAs: sameAs }),
  };

  // Формируем микроразметку Author для статей
  const authorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    ...(image && { image: image }),
    ...(profileUrl && { url: profileUrl }),
  };

  return (
    <>
      {/* Микроразметка Person */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      </Helmet>

      {/* Визуальный компонент */}
      <div
        className={cn("flex items-center gap-3", className)}
        itemScope
        itemType="https://schema.org/Person"
      >
        <Avatar className={sizeClasses[size]}>
          {image ? (
            <AvatarImage
              src={image}
              alt={`Аватар ${name}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <AvatarFallback className="bg-[var(--teal)] text-white font-oswald">
              {initials || name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        {showName && (
          <div>
            {profileUrl ? (
              <a
                href={profileUrl}
                className="font-semibold text-sm hover:text-[var(--teal)] transition-colors"
                style={{ color: "var(--dark)" }}
                itemProp="url"
              >
                <span itemProp="name">{name}</span>
              </a>
            ) : (
              <span
                className="font-semibold text-sm"
                style={{ color: "var(--dark)" }}
                itemProp="name"
              >
                {name}
              </span>
            )}
            {role && (
              <p
                className="text-xs"
                style={{ color: "var(--gray)" }}
                itemProp="jobTitle"
              >
                {role}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
// ГРУППА АВАТАРОВ ДЛЯ ОТЗЫВОВ
// ============================================================

interface ReviewAuthorAvatarProps {
  /** Имя автора отзыва */
  name: string;
  /** Инициалы */
  initials: string;
  /** Роль (например, "Владелица квартиры") */
  role: string;
  /** URL изображения (опционально) */
  image?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Специализированный компонент для отзывов
 * Автоматически добавляет микроразметку ReviewAuthor
 */
export function ReviewAuthorAvatar({
  name,
  initials,
  role,
  image,
  className,
}: ReviewAuthorAvatarProps) {
  const reviewAuthorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    ...(image && { image: image }),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewAuthorLd)}
        </script>
      </Helmet>

      <div className={cn("flex items-center gap-3", className)}>
        <Avatar className="h-10 w-10">
          {image ? (
            <AvatarImage
              src={image}
              alt={`Аватар ${name}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <AvatarFallback className="bg-[var(--teal)] text-white font-oswald text-xs">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--dark)" }}>
            {name}
          </p>
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            {role}
          </p>
        </div>
      </div>
    </>
  );
}
