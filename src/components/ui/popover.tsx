import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ POPOVER
// ============================================================

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface PopoverWithSchemaProps {
  /** Заголовок попапа */
  title?: string;
  /** Описание попапа */
  description?: string;
  /** Тип контента для микроразметки */
  schemaType?: "Service" | "Product" | "Person" | "Organization" | "FAQ";
  /** Триггер (элемент, при клике на который появляется попап) */
  trigger: React.ReactNode;
  /** Содержимое попапа */
  children: React.ReactNode;
  /** Открыт ли попап (управляемое состояние) */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Дополнительные классы */
  className?: string;
  /** Дополнительные классы для содержимого */
  contentClassName?: string;
  /** Позиция попапа */
  align?: "start" | "center" | "end";
  /** Отступ от триггера */
  sideOffset?: number;
}

/**
 * Компонент Popover с микроразметкой
 * Используйте для подсказок, фильтров, дополнительной информации.
 */
export function PopoverWithSchema({
  title,
  description,
  schemaType = "Service",
  trigger,
  children,
  open,
  onOpenChange,
  className,
  contentClassName,
  align = "center",
  sideOffset = 4,
}: PopoverWithSchemaProps) {
  // Формируем микроразметку
  const popoverLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка содержимого */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(popoverLd)}</script>
      </Helmet>

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <span className={cn("cursor-pointer", className)}>{trigger}</span>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-80 p-4", contentClassName)}
          align={align}
          sideOffset={sideOffset}
        >
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПОДСКАЗОК (HELP)
// ============================================================

interface HelpPopoverProps {
  /** Текст подсказки */
  text: string;
  /** Заголовок подсказки (опционально) */
  title?: string;
  /** Дополнительные классы */
  className?: string;
  /** Триггер (по умолчанию иконка "?") */
  trigger?: React.ReactNode;
}

export function HelpPopover({
  text,
  title,
  className,
  trigger,
}: HelpPopoverProps) {
  const defaultTrigger = (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white transition-colors hover:bg-[var(--teal-dark)]"
      style={{ background: "var(--teal)" }}
    >
      ?
    </span>
  );

  return (
    <PopoverWithSchema
      title={title || "Подсказка"}
      description={text}
      schemaType="FAQ"
      trigger={trigger || defaultTrigger}
      className={cn("inline-flex", className)}
    >
      <div className="space-y-2">
        {title && (
          <h4
            className="font-oswald font-semibold text-sm"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </h4>
        )}
        <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
          {text}
        </p>
      </div>
    </PopoverWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ФИЛЬТРОВ
// ============================================================

interface FilterPopoverProps {
  /** Текущее значение фильтра */
  value?: string;
  /** Список опций */
  options: Array<{ label: string; value: string }>;
  /** Обработчик изменения */
  onChange: (value: string) => void;
  /** Триггер (кнопка фильтра) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function FilterPopover({
  value,
  options,
  onChange,
  trigger,
  className,
}: FilterPopoverProps) {
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <PopoverWithSchema
      title="Фильтры"
      description="Выберите опцию для фильтрации"
      schemaType="Service"
      trigger={trigger}
      className={className}
    >
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded-lg px-3 py-2 text-sm text-left transition-colors hover:bg-gray-50",
              option.value === value && "bg-[var(--teal-light)] font-medium",
            )}
            style={{
              color: option.value === value ? "var(--teal)" : "var(--dark)",
            }}
          >
            {option.label}
            {option.value === value && (
              <span className="ml-2 text-[var(--teal)]">✓</span>
            )}
          </button>
        ))}
      </div>
    </PopoverWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ИНФОРМАЦИИ
// ============================================================

interface InfoPopoverProps {
  /** Заголовок */
  title: string;
  /** Содержимое */
  children: React.ReactNode;
  /** Триггер (по умолчанию иконка "i") */
  trigger?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function InfoPopover({
  title,
  children,
  trigger,
  className,
}: InfoPopoverProps) {
  const defaultTrigger = (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors hover:bg-gray-50"
      style={{ borderColor: "var(--teal)", color: "var(--teal)" }}
    >
      i
    </span>
  );

  return (
    <PopoverWithSchema
      title={title}
      description={typeof children === "string" ? children : "Информация"}
      schemaType="Organization"
      trigger={trigger || defaultTrigger}
      className={cn("inline-flex", className)}
    >
      <div className="space-y-2">
        <h4
          className="font-oswald font-semibold text-sm"
          style={{ color: "var(--dark)" }}
        >
          {title}
        </h4>
        <div
          className="text-sm leading-relaxed"
          style={{ color: "var(--gray)" }}
        >
          {children}
        </div>
      </div>
    </PopoverWithSchema>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ПОПАПА С ЦЕНОЙ И КНОПКОЙ ЗАКАЗА
// ============================================================

interface PricePopoverProps {
  /** Название услуги */
  title: string;
  /** Цена */
  price: number;
  /** Описание (опционально) */
  description?: string;
  /** Обработчик заказа */
  onOrder?: () => void;
  /** Триггер (кнопка с ценой) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function PricePopover({
  title,
  price,
  description,
  onOrder,
  trigger,
  className,
}: PricePopoverProps) {
  return (
    <PopoverWithSchema
      title={title}
      description={
        description || `Стоимость услуги: ${price.toLocaleString("ru")} ₽`
      }
      schemaType="Service"
      trigger={trigger}
      className={className}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--dark)" }}
          >
            {title}
          </span>
          <span
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--teal)" }}
          >
            {price.toLocaleString("ru")} ₽
          </span>
        </div>

        {description && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--gray)" }}
          >
            {description}
          </p>
        )}

        <button
          onClick={() => {
            onOrder?.();
          }}
          className="w-full btn-primary py-2.5 text-sm font-oswald"
        >
          Заказать
        </button>
      </div>
    </PopoverWithSchema>
  );
}
