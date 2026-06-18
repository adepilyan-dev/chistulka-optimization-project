import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SCROLL AREA
// ============================================================

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ScrollAreaWithSchemaProps {
  /** Заголовок области */
  title?: string;
  /** Описание области */
  description?: string;
  /** Содержимое */
  children: React.ReactNode;
  /** Тип контента для микроразметки */
  schemaType?: "Article" | "Service" | "Product" | "CreativeWork";
  /** Максимальная высота */
  maxHeight?: string | number;
  /** Дополнительные классы */
  className?: string;
  /** Дополнительные классы для содержимого */
  contentClassName?: string;
  /** ID для якорной ссылки */
  id?: string;
}

/**
 * Компонент ScrollArea с микроразметкой
 * Используйте для длинных списков, статей, галерей.
 */
export function ScrollAreaWithSchema({
  title,
  description,
  children,
  schemaType = "CreativeWork",
  maxHeight = "300px",
  className,
  contentClassName,
  id,
}: ScrollAreaWithSchemaProps) {
  // Формируем микроразметку
  const scrollLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка содержимого */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(scrollLd)}</script>
      </Helmet>

      <div id={id} className={cn("space-y-2", className)}>
        {title && (
          <h3
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm" style={{ color: "var(--gray)" }}>
            {description}
          </p>
        )}

        <ScrollArea
          className={cn("rounded-lg border p-4", contentClassName)}
          style={{
            maxHeight:
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          }}
        >
          {children}
        </ScrollArea>
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СПИСКА УСЛУГ
// ============================================================

interface ServiceListProps {
  /** Список услуг */
  services: Array<{
    name: string;
    description?: string;
    price?: number;
    icon?: React.ReactNode;
  }>;
  /** Заголовок */
  title?: string;
  /** Максимальная высота */
  maxHeight?: string | number;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceList({
  services,
  title = "Наши услуги",
  maxHeight = "400px",
  className,
}: ServiceListProps) {
  return (
    <ScrollAreaWithSchema
      title={title}
      description={`${services.length} услуг доступно`}
      schemaType="Service"
      maxHeight={maxHeight}
      className={className}
    >
      <div className="space-y-3 pr-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3">
              {service.icon && <span className="text-lg">{service.icon}</span>}
              <div>
                <div
                  className="font-medium text-sm"
                  style={{ color: "var(--dark)" }}
                >
                  {service.name}
                </div>
                {service.description && (
                  <div className="text-xs" style={{ color: "var(--gray)" }}>
                    {service.description}
                  </div>
                )}
              </div>
            </div>
            {service.price !== undefined && (
              <span
                className="font-oswald font-bold text-sm"
                style={{ color: "var(--teal)" }}
              >
                {service.price.toLocaleString("ru")} ₽
              </span>
            )}
          </div>
        ))}
      </div>
    </ScrollAreaWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ГАЛЕРЕИ
// ============================================================

interface GalleryScrollProps {
  /** Список изображений */
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  /** Заголовок */
  title?: string;
  /** Максимальная высота */
  maxHeight?: string | number;
  /** Дополнительные классы */
  className?: string;
}

export function GalleryScroll({
  images,
  title = "Галерея",
  maxHeight = "500px",
  className,
}: GalleryScrollProps) {
  return (
    <ScrollAreaWithSchema
      title={title}
      description={`${images.length} работ в галерее`}
      schemaType="CreativeWork"
      maxHeight={maxHeight}
      className={className}
      contentClassName="p-0"
    >
      <div className="grid grid-cols-2 gap-3 p-1">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {image.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{image.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollAreaWithSchema>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ГОРИЗОНТАЛЬНОЙ ПРОКРУТКИ
// ============================================================

interface HorizontalScrollProps {
  /** Содержимое (обычно flex-элементы) */
  children: React.ReactNode;
  /** Заголовок */
  title?: string;
  /** Дополнительные классы */
  className?: string;
  /** Класс для контейнера содержимого */
  contentClassName?: string;
}

export function HorizontalScroll({
  children,
  title,
  className,
  contentClassName,
}: HorizontalScrollProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h3
          className="font-oswald font-bold text-lg"
          style={{ color: "var(--dark)" }}
        >
          {title}
        </h3>
      )}

      <ScrollArea className="w-full">
        <div className={cn("flex gap-4 pb-4", contentClassName)}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
