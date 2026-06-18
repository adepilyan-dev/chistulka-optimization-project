import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Helmet } from "react-helmet-async";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ COLLAPSIBLE
// ============================================================

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CollapsibleWithSchemaProps {
  /** Заголовок/вопрос */
  title: string;
  /** Содержимое/ответ */
  content: React.ReactNode;
  /** Тип контента для микроразметки */
  schemaType?: "Question" | "Product" | "Service" | "Article";
  /** Открыт ли по умолчанию */
  defaultOpen?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Классы для контента */
  contentClassName?: string;
  /** Иконка (по умолчанию ChevronDown) */
  icon?: React.ReactNode;
  /** Позиция иконки */
  iconPosition?: "left" | "right";
}

/**
 * Компонент Collapsible с микроразметкой
 * Используйте для FAQ, раскрывающихся описаний услуг, меню.
 */
export function CollapsibleWithSchema({
  title,
  content,
  schemaType = "Question",
  defaultOpen = false,
  className,
  contentClassName,
  icon,
  iconPosition = "right",
}: CollapsibleWithSchemaProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  // Формируем микроразметку
  const collapsibleLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    ...(schemaType === "Question" && {
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof content === "string"
            ? content
            : "Содержимое раскрывается по клику",
      },
    }),
  };

  const defaultIcon = icon || (
    <ChevronDown
      className={cn(
        "h-4 w-4 transition-transform duration-200 flex-shrink-0",
        isOpen && "rotate-180",
      )}
      style={{ color: "var(--teal)" }}
    />
  );

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(collapsibleLd)}
        </script>
      </Helmet>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn("w-full", className)}
      >
        <CollapsibleTrigger
          className={cn(
            "w-full flex items-center justify-between gap-4 p-4 rounded-xl transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]",
            isOpen && "bg-[var(--teal-light)]",
          )}
          aria-label={`${isOpen ? "Скрыть" : "Показать"}: ${title}`}
        >
          {iconPosition === "left" && defaultIcon}
          <span
            className="font-oswald font-semibold text-left"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </span>
          {iconPosition === "right" && defaultIcon}
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(
            "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            contentClassName,
          )}
        >
          <div
            className="p-4 pt-2 text-sm leading-relaxed"
            style={{ color: "var(--gray)" }}
          >
            {content}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ FAQ
// ============================================================

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  /** Массив вопросов и ответов */
  items: FAQItem[];
  /** Заголовок секции */
  title?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для отображения списка FAQ с микроразметкой
 * Автоматически добавляет микроразметку FAQPage
 */
export function FAQAccordion({ items, title, className }: FAQAccordionProps) {
  // Микроразметка FAQPage
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className={cn("space-y-4", className)}>
        {title && (
          <h3
            className="font-oswald font-bold text-xl"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h3>
        )}
        {items.map((item, index) => (
          <CollapsibleWithSchema
            key={index}
            title={item.question}
            content={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ОПИСАНИЯ УСЛУГ
// ============================================================

interface ServiceDetailProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** Дополнительная информация */
  details?: React.ReactNode;
  /** Изображение (опционально) */
  image?: string;
  /** Цена (опционально) */
  price?: number;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для раскрывающегося описания услуги
 * С микроразметкой Service
 */
export function ServiceDetail({
  title,
  description,
  details,
  image,
  price,
  className,
}: ServiceDetailProps) {
  const content = (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
        {description}
      </p>
      {image && (
        <img
          src={image}
          alt={title}
          width={400}
          height={200}
          className="rounded-xl w-full object-cover max-h-48"
          loading="lazy"
          decoding="async"
        />
      )}
      {details && <div>{details}</div>}
      {price !== undefined && (
        <p
          className="font-oswald font-bold text-lg"
          style={{ color: "var(--teal)" }}
        >
          от {price.toLocaleString("ru")} ₽
        </p>
      )}
    </div>
  );

  return (
    <CollapsibleWithSchema
      title={title}
      content={content}
      schemaType="Service"
      className={cn("border rounded-xl overflow-hidden", className)}
      contentClassName="px-4 pb-4"
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ МЕНЮ (навигация)
// ============================================================

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface CollapsibleMenuProps {
  /** Массив пунктов меню */
  items: MenuItem[];
  /** Дополнительные классы */
  className?: string;
  /** Уровень вложенности */
  level?: number;
}

/**
 * Компонент для сворачиваемого меню (мобильная навигация)
 */
export function CollapsibleMenu({
  items,
  className,
  level = 0,
}: CollapsibleMenuProps) {
  const paddingLeft = level * 16;

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;

        if (hasChildren) {
          return (
            <Collapsible key={index}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between p-3 rounded-lg transition-all hover:bg-gray-50",
                  level === 0 && "font-oswald font-semibold",
                )}
                style={{ paddingLeft: paddingLeft + 12 }}
              >
                <span style={{ color: "var(--dark)" }}>{item.label}</span>
                <ChevronRight
                  className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90"
                  style={{ color: "var(--gray)" }}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <CollapsibleMenu items={item.children!} level={level + 1} />
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <a
            key={index}
            href={item.href || "#"}
            className={cn(
              "block p-3 rounded-lg transition-all hover:bg-gray-50",
              level === 0 && "font-oswald font-semibold",
            )}
            style={{ paddingLeft: paddingLeft + 12, color: "var(--dark)" }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
