import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SEPARATOR
// ============================================================

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SeparatorWithSchemaProps {
  /** Заголовок раздела (для микроразметки) */
  title?: string;
  /** Описание раздела (для микроразметки) */
  description?: string;
  /** Ориентация */
  orientation?: "horizontal" | "vertical";
  /** Декоративный ли разделитель */
  decorative?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Толщина разделителя */
  thickness?: "thin" | "medium" | "thick";
  /** Цвет разделителя */
  color?: "default" | "teal" | "gray" | "light";
  /** Стиль разделителя */
  style?: "solid" | "dashed" | "dotted";
  /** Дочерние элементы (текст между разделителями) */
  children?: React.ReactNode;
}

/**
 * Компонент Separator с микроразметкой
 * Используйте для разделения разделов на странице.
 */
export function SeparatorWithSchema({
  title,
  description,
  orientation = "horizontal",
  decorative = true,
  className,
  thickness = "thin",
  color = "default",
  style = "solid",
  children,
}: SeparatorWithSchemaProps) {
  // Толщина
  const thicknessClasses = {
    thin: "h-[1px]",
    medium: "h-[2px]",
    thick: "h-[3px]",
  };

  // Цвета
  const colorClasses = {
    default: "bg-border",
    teal: "bg-[var(--teal)]",
    gray: "bg-gray-300",
    light: "bg-gray-100",
  };

  // Стили
  const styleClasses = {
    solid: "",
    dashed: "border-t-2 border-dashed border-border",
    dotted: "border-t-2 border-dotted border-border",
  };

  // Формируем микроразметку
  const separatorLd =
    title || description
      ? {
          "@context": "https://schema.org",
          "@type": "WebPageElement",
          ...(title && { name: title }),
          ...(description && { description: description }),
        }
      : null;

  // Если есть дочерние элементы (текст между разделителями)
  if (children) {
    return (
      <>
        {/* Микроразметка */}
        {separatorLd && (
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify(separatorLd)}
            </script>
          </Helmet>
        )}

        <div className="relative flex items-center w-full">
          <Separator
            orientation={orientation}
            decorative={decorative}
            className={cn(
              "flex-1",
              thicknessClasses[thickness],
              colorClasses[color],
              styleClasses[style],
              className,
            )}
          />
          <span
            className="mx-4 text-sm font-medium whitespace-nowrap"
            style={{ color: "var(--gray)" }}
          >
            {children}
          </span>
          <Separator
            orientation={orientation}
            decorative={decorative}
            className={cn(
              "flex-1",
              thicknessClasses[thickness],
              colorClasses[color],
              styleClasses[style],
            )}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Микроразметка */}
      {separatorLd && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(separatorLd)}
          </script>
        </Helmet>
      )}

      <Separator
        orientation={orientation}
        decorative={decorative}
        className={cn(
          thicknessClasses[thickness],
          colorClasses[color],
          styleClasses[style],
          className,
        )}
      />
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ РАЗДЕЛИТЕЛЯ С ТЕКСТОМ
// ============================================================

interface TextSeparatorProps {
  /** Текст между разделителями */
  text: string;
  /** Дополнительные классы */
  className?: string;
  /** Цвет текста */
  textColor?: "default" | "teal" | "gray";
  /** Размер текста */
  textSize?: "sm" | "base" | "lg";
}

export function TextSeparator({
  text,
  className,
  textColor = "gray",
  textSize = "sm",
}: TextSeparatorProps) {
  const colorClasses = {
    default: "text-[var(--dark)]",
    teal: "text-[var(--teal)]",
    gray: "text-[var(--gray)]",
  };

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  return (
    <SeparatorWithSchema
      title={text}
      className={className}
      thickness="thin"
      color="default"
      style="solid"
    >
      <span className={cn(colorClasses[textColor], sizeClasses[textSize])}>
        {text}
      </span>
    </SeparatorWithSchema>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ РАЗДЕЛИТЕЛЯ В СПИСКЕ (с точками)
// ============================================================

interface DotSeparatorProps {
  /** Дополнительные классы */
  className?: string;
}

export function DotSeparator({ className }: DotSeparatorProps) {
  return (
    <SeparatorWithSchema
      className={cn("w-1 h-1 rounded-full bg-gray-300", className)}
      orientation="horizontal"
      decorative={true}
      thickness="thin"
      color="gray"
      style="solid"
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ РАЗДЕЛИТЕЛЯ РАЗДЕЛОВ
// ============================================================

interface SectionSeparatorProps {
  /** Название раздела (для микроразметки) */
  sectionName?: string;
  /** Дополнительные классы */
  className?: string;
}

export function SectionSeparator({
  sectionName,
  className,
}: SectionSeparatorProps) {
  return (
    <SeparatorWithSchema
      title={sectionName || "Раздел"}
      className={cn("my-8", className)}
      thickness="medium"
      color="teal"
      style="solid"
      decorative={false}
    />
  );
}
