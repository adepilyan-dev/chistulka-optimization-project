import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ ACCORDION (без изменений)
// ============================================================

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ FAQPage
// ============================================================

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionWithSchemaProps {
  items: FAQItem[];
  /** ID для секции, если используется как часть страницы */
  sectionId?: string;
  /** Заголовок секции (опционально) */
  title?: string;
  /** Описание секции (опционально) */
  description?: string;
  /** Дополнительные классы для обёртки */
  className?: string;
}

/**
 * Компонент Accordion с автоматической микроразметкой FAQPage
 * Используйте его для блоков с частыми вопросами на странице.
 */
export function AccordionWithSchema({
  items,
  sectionId = "faq",
  title = "Часто задаваемые вопросы",
  description,
  className,
}: AccordionWithSchemaProps) {
  // Формируем микроразметку FAQPage
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
    <section id={sectionId} className={cn("py-8", className)}>
      {/* Микроразметка FAQPage */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      {/* Заголовок секции (опционально) */}
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--dark)" }}>
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Аккордеон */}
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-oswald text-base hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className="text-sm leading-relaxed"
              style={{ color: "var(--gray)" }}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// ============================================================
// ЭКСПОРТ СТАНДАРТНЫХ КОМПОНЕНТОВ
// ============================================================

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
