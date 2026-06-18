import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SKELETON
// ============================================================

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С ARIA-ПОДДЕРЖКОЙ
// ============================================================

interface SkeletonWithAriaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Является ли скелетон активным (показывать анимацию) */
  isLoading?: boolean;
  /** ARIA-лейбл для скринридеров */
  ariaLabel?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Skeleton с поддержкой ARIA
 * Используйте для отображения состояния загрузки.
 */
export function SkeletonWithAria({
  isLoading = true,
  ariaLabel = "Загрузка...",
  className,
  ...props
}: SkeletonWithAriaProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ КАРТОЧКИ УСЛУГИ
// ============================================================

interface ServiceCardSkeletonProps {
  /** Количество карточек в строке */
  columns?: 1 | 2 | 3 | 4;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceCardSkeleton({
  columns = 3,
  className,
}: ServiceCardSkeletonProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="mt-4 h-6 w-3/4" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СПИСКА
// ============================================================

interface ListSkeletonProps {
  /** Количество элементов в списке */
  count?: number;
  /** Дополнительные классы */
  className?: string;
  /** С отступами между элементами */
  spaced?: boolean;
}

export function ListSkeleton({
  count = 5,
  className,
  spaced = true,
}: ListSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ГАЛЕРЕИ
// ============================================================

interface GallerySkeletonProps {
  /** Количество изображений */
  count?: number;
  /** Дополнительные классы */
  className?: string;
  /** Соотношение сторон */
  aspectRatio?: "square" | "video" | "portrait";
}

export function GallerySkeleton({
  count = 6,
  className,
  aspectRatio = "video",
}: GallerySkeletonProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("w-full rounded-lg", aspectClasses[aspectRatio])}
        />
      ))}
    </div>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ОТЗЫВОВ
// ============================================================

interface ReviewSkeletonProps {
  /** Количество отзывов */
  count?: number;
  /** Дополнительные классы */
  className?: string;
}

export function ReviewSkeleton({ count = 4, className }: ReviewSkeletonProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-1 h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ЗАГРУЗКИ СТРАНИЦЫ (полный экран)
// ============================================================

interface PageLoaderProps {
  /** Текст загрузки */
  text?: string;
  /** Дополнительные классы */
  className?: string;
}

export function PageLoader({
  text = "Загрузка...",
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] gap-4",
        className,
      )}
    >
      <div className="relative">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-[var(--teal)]" />
        </div>
      </div>
      <Skeleton className="h-4 w-32" />
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  );
}
