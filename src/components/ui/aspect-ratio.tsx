import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ ASPECT RATIO
// ============================================================

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С SEO-ОПТИМИЗАЦИЕЙ
// ============================================================

interface ImageWithAspectRatioProps {
  /** URL изображения */
  src: string;
  /** Альтернативный текст (обязательно для SEO) */
  alt: string;
  /** Соотношение сторон (ширина:высота) */
  ratio?: number;
  /** Ширина изображения (для атрибута width) */
  width?: number;
  /** Высота изображения (для атрибута height) */
  height?: number;
  /** Дополнительные классы */
  className?: string;
  /** Загружать лениво */
  lazy?: boolean;
  /** Приоритет загрузки (для LCP) */
  fetchPriority?: "high" | "low" | "auto";
  /** Заголовок изображения (для микроразметки) */
  title?: string;
  /** Описание изображения (для микроразметки) */
  description?: string;
  /** Дополнительные свойства для img */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /** Дочерние элементы (если нужно вложить что-то поверх) */
  children?: React.ReactNode;
}

/**
 * Компонент для отображения изображений с фиксированным соотношением сторон
 * и автоматической микроразметкой ImageObject
 */
export function ImageWithAspectRatio({
  src,
  alt,
  ratio = 4 / 3,
  width,
  height,
  className,
  lazy = true,
  fetchPriority = "auto",
  title,
  description,
  imgProps,
  children,
}: ImageWithAspectRatioProps) {
  // Формируем микроразметку для изображения
  const imageLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: src,
    ...(title && { name: title }),
    ...(description && { description: description }),
    ...(alt && { caption: alt }),
    ...(width && height && { width: width, height: height }),
    uploadDate: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      {/* Микроразметка ImageObject */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(imageLd)}</script>
      </Helmet>

      {/* Сам компонент с изображением */}
      <div className={cn("relative overflow-hidden", className)}>
        <AspectRatio ratio={ratio}>
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={lazy ? "lazy" : "eager"}
            fetchPriority={fetchPriority}
            decoding="async"
            className="w-full h-full object-cover"
            {...imgProps}
          />
          {children}
        </AspectRatio>
      </div>
    </>
  );
}

// ============================================================
// СПЕЦИАЛИЗИРОВАННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Изображение для карточки услуги (соотношение 4:3)
 */
export function ServiceImage({
  src,
  alt,
  title,
  className,
  ...props
}: Omit<ImageWithAspectRatioProps, "ratio">) {
  return (
    <ImageWithAspectRatio
      src={src}
      alt={alt}
      ratio={4 / 3}
      title={title || alt}
      className={cn("rounded-2xl", className)}
      {...props}
    />
  );
}

/**
 * Изображение для героя/баннера (соотношение 16:9)
 */
export function HeroImage({
  src,
  alt,
  title,
  className,
  ...props
}: Omit<ImageWithAspectRatioProps, "ratio">) {
  return (
    <ImageWithAspectRatio
      src={src}
      alt={alt}
      ratio={16 / 9}
      title={title || alt}
      fetchPriority="high"
      lazy={false}
      className={cn("rounded-3xl", className)}
      {...props}
    />
  );
}

/**
 * Изображение для галереи (соотношение 1:1)
 */
export function GalleryImage({
  src,
  alt,
  title,
  className,
  ...props
}: Omit<ImageWithAspectRatioProps, "ratio">) {
  return (
    <ImageWithAspectRatio
      src={src}
      alt={alt}
      ratio={1}
      title={title || alt}
      className={cn("rounded-2xl", className)}
      {...props}
    />
  );
}
