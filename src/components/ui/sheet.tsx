import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SHEET
// ============================================================

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Закрыть</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SheetWithSchemaProps {
  /** Заголовок панели */
  title: string;
  /** Описание панели */
  description?: string;
  /** Содержимое панели */
  children: React.ReactNode;
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка, которая открывает панель) */
  trigger: React.ReactNode;
  /** Сторона, с которой выезжает панель */
  side?: "top" | "bottom" | "left" | "right";
  /** Тип содержимого для микроразметки */
  schemaType?: "WebPage" | "Service" | "Product" | "Menu" | "Article";
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Sheet с микроразметкой
 * Используйте для мобильного меню, корзины, деталей услуги.
 */
export function SheetWithSchema({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger,
  side = "right",
  schemaType = "WebPage",
  className,
}: SheetWithSchemaProps) {
  // Формируем микроразметку
  const sheetLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка содержимого панели */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(sheetLd)}</script>
      </Helmet>

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side={side}
          className={cn("w-full sm:max-w-md", className)}
        >
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ МОБИЛЬНОГО МЕНЮ
// ============================================================

interface MobileMenuSheetProps {
  /** Элементы меню */
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  /** Открыто ли меню */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка бургера) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function MobileMenuSheet({
  items,
  open,
  onOpenChange,
  trigger,
  className,
}: MobileMenuSheetProps) {
  return (
    <SheetWithSchema
      title="Меню"
      description="Навигация по сайту"
      schemaType="Menu"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      side="left"
      className={className}
    >
      <div className="mt-4 space-y-2">
        {items.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <details key={index} className="group">
                <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium hover:text-[var(--teal)]">
                  <span className="flex items-center gap-2">
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </span>
                  <span className="text-xs transition-transform group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <div
                  className="mt-1 space-y-1 border-l-2 pl-4"
                  style={{ borderColor: "var(--teal)" }}
                >
                  {item.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={child.href}
                      className="block py-2 text-sm hover:text-[var(--teal)]"
                      onClick={() => onOpenChange?.(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </details>
            );
          }

          return (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-2 py-2 text-sm font-medium hover:text-[var(--teal)]"
              onClick={() => onOpenChange?.(false)}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </a>
          );
        })}
      </div>
    </SheetWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ДЕТАЛЕЙ УСЛУГИ
// ============================================================

interface ServiceDetailSheetProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** Изображение */
  image?: string;
  /** Цена */
  price?: number;
  /** Характеристики */
  features?: string[];
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка "Подробнее") */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceDetailSheet({
  title,
  description,
  image,
  price,
  features,
  open,
  onOpenChange,
  trigger,
  className,
}: ServiceDetailSheetProps) {
  return (
    <SheetWithSchema
      title={title}
      description={description}
      schemaType="Service"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      side="right"
      className={className}
    >
      <div className="mt-4 space-y-4">
        {image && (
          <img
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full rounded-lg object-cover max-h-48"
            loading="lazy"
            decoding="async"
          />
        )}
        <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
          {description}
        </p>
        {features && features.length > 0 && (
          <ul className="space-y-1">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--dark)" }}
              >
                <span className="text-[var(--teal)]">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        {price !== undefined && (
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--gray)" }}
            >
              Стоимость
            </span>
            <span
              className="font-oswald font-bold text-xl"
              style={{ color: "var(--teal)" }}
            >
              {price.toLocaleString("ru")} ₽
            </span>
          </div>
        )}
        <button
          className="w-full btn-primary py-3 font-oswald font-semibold"
          onClick={() => onOpenChange?.(false)}
        >
          Заказать
        </button>
      </div>
    </SheetWithSchema>
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ КОРЗИНЫ
// ============================================================

interface CartSheetProps {
  /** Товары в корзине */
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка корзины) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function CartSheet({
  items,
  open,
  onOpenChange,
  trigger,
  className,
}: CartSheetProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <SheetWithSchema
      title="Корзина"
      description={`${items.length} товаров на сумму ${total.toLocaleString("ru")} ₽`}
      schemaType="Product"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      side="right"
      className={className}
    >
      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-center py-8" style={{ color: "var(--gray)" }}>
            Корзина пуста
          </p>
        ) : (
          <>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg p-3"
                  style={{ background: "var(--light-bg)" }}
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--dark)" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--gray)" }}>
                      {item.quantity} × {item.price.toLocaleString("ru")} ₽
                    </p>
                  </div>
                  <span
                    className="font-oswald font-bold text-sm"
                    style={{ color: "var(--teal)" }}
                  >
                    {(item.price * item.quantity).toLocaleString("ru")} ₽
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "var(--gray)" }}
              >
                Итого
              </span>
              <span
                className="font-oswald font-bold text-xl"
                style={{ color: "var(--teal)" }}
              >
                {total.toLocaleString("ru")} ₽
              </span>
            </div>
            <button
              className="w-full btn-primary py-3 font-oswald font-semibold"
              onClick={() => onOpenChange?.(false)}
            >
              Оформить заказ
            </button>
          </>
        )}
      </div>
    </SheetWithSchema>
  );
}
