import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ DRAWER
// ============================================================

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      <div
        className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
        aria-hidden="true"
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface DrawerWithSchemaProps {
  /** Заголовок выдвижной панели */
  title: string;
  /** Описание выдвижной панели */
  description?: string;
  /** Тип контента для микроразметки */
  schemaType?: "Product" | "Service" | "Article" | "Menu";
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка, которая открывает панель) */
  trigger: React.ReactNode;
  /** Содержимое панели */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Drawer с микроразметкой
 * Используйте для корзины, фильтров, меню, деталей.
 */
export function DrawerWithSchema({
  title,
  description,
  schemaType = "Service",
  open,
  onOpenChange,
  trigger,
  children,
  className,
}: DrawerWithSchemaProps) {
  // Формируем микроразметку
  const drawerLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка содержимого */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(drawerLd)}</script>
      </Helmet>

      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className={cn("max-h-[85vh]", className)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ МОБИЛЬНОГО МЕНЮ
// ============================================================

interface MobileMenuDrawerProps {
  /** Элементы меню */
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка бургера) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export function MobileMenuDrawer({
  items,
  open,
  onOpenChange,
  trigger,
  className,
}: MobileMenuDrawerProps) {
  return (
    <DrawerWithSchema
      title="Меню"
      description="Навигация по сайту"
      schemaType="Menu"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      className={className}
    >
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-gray-50"
            style={{ color: "var(--dark)" }}
            onClick={() => onOpenChange?.(false)}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </DrawerWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ДЕТАЛЕЙ УСЛУГИ
// ============================================================

interface ServiceDetailsDrawerProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** Изображение */
  image?: string;
  /** Цена */
  price?: number;
  /** Список характеристик */
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

export function ServiceDetailsDrawer({
  title,
  description,
  image,
  price,
  features,
  open,
  onOpenChange,
  trigger,
  className,
}: ServiceDetailsDrawerProps) {
  return (
    <DrawerWithSchema
      title={title}
      description={description}
      schemaType="Service"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      className={className}
    >
      <div className="p-4 space-y-4">
        {image && (
          <img
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full rounded-xl object-cover max-h-48"
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
          onClick={() => onOpenChange?.(false)}
          className="w-full btn-primary py-3 font-oswald font-semibold"
        >
          Заказать
        </button>
      </div>
    </DrawerWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ КОРЗИНЫ
// ============================================================

interface CartDrawerProps {
  /** Товары в корзине */
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  /** Открыта ли панель */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка корзины) */
  trigger: React.ReactNode;
  /** Обработчик удаления товара */
  onRemove?: (id: string) => void;
  /** Обработчик оформления заказа */
  onCheckout?: () => void;
  /** Дополнительные классы */
  className?: string;
}

export function CartDrawer({
  items,
  open,
  onOpenChange,
  trigger,
  onRemove,
  onCheckout,
  className,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <DrawerWithSchema
      title="Корзина"
      description={`${items.length} товаров на сумму ${total.toLocaleString("ru")} ₽`}
      schemaType="Product"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      className={className}
    >
      <div className="p-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-center py-8" style={{ color: "var(--gray)" }}>
            Корзина пуста
          </p>
        ) : (
          <>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "var(--light-bg)" }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--dark)" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--gray)" }}>
                      {item.quantity} × {item.price.toLocaleString("ru")} ₽
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove?.(item.id)}
                    className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label={`Удалить ${item.name}`}
                  >
                    <span className="text-sm" style={{ color: "var(--gray)" }}>
                      ✕
                    </span>
                  </button>
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
              onClick={() => {
                onCheckout?.();
                onOpenChange?.(false);
              }}
              className="w-full btn-primary py-3 font-oswald font-semibold"
            >
              Оформить заказ
            </button>
          </>
        )}
      </div>
    </DrawerWithSchema>
  );
}
