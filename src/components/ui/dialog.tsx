import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ DIALOG
// ============================================================

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        aria-label="Закрыть"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Закрыть</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface DialogWithSchemaProps {
  /** Заголовок диалога */
  title: string;
  /** Описание диалога */
  description?: string;
  /** Тип действия для микроразметки */
  actionType?: "OrderAction" | "ContactAction" | "BookAction" | "ConfirmAction";
  /** URL действия (для микроразметки) */
  actionUrl?: string;
  /** Открыт ли диалог */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Триггер (кнопка, которая открывает диалог) */
  trigger: React.ReactNode;
  /** Содержимое диалога */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Dialog с микроразметкой действия
 * Используйте для форм заказа, связи, записи.
 */
export function DialogWithSchema({
  title,
  description,
  actionType = "ConfirmAction",
  actionUrl,
  open,
  onOpenChange,
  trigger,
  children,
  className,
}: DialogWithSchemaProps) {
  // Формируем микроразметку действия
  const actionLd = {
    "@context": "https://schema.org",
    "@type": actionType,
    name: title,
    ...(description && { description: description }),
    ...(actionUrl && { target: actionUrl }),
    potentialAction: {
      "@type": actionType,
      ...(actionUrl && { target: actionUrl }),
    },
  };

  return (
    <>
      {/* Микроразметка действия */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(actionLd)}</script>
      </Helmet>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={cn("max-w-md", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ЗАКАЗА
// ============================================================

interface OrderDialogProps {
  /** Название услуги */
  serviceName: string;
  /** Цена */
  price?: number;
  /** Открыт ли диалог */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Обработчик отправки формы */
  onSubmit?: (data: { name: string; phone: string }) => void;
  /** Дополнительные классы */
  className?: string;
}

export function OrderDialog({
  serviceName,
  price,
  open,
  onOpenChange,
  onSubmit,
  className,
}: OrderDialogProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, phone });
    }
    onOpenChange?.(false);
  };

  return (
    <DialogWithSchema
      title={`Заказ: ${serviceName}`}
      description={
        price
          ? `Стоимость: ${price.toLocaleString("ru")} ₽`
          : "Оставьте заявку на услугу"
      }
      actionType="OrderAction"
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <button className="btn-primary px-6 py-2.5 text-sm font-oswald">
          Заказать
        </button>
      }
      className={className}
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--dark)" }}
          >
            Ваше имя
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
            style={{ borderColor: "var(--border)" }}
            placeholder="Иван Иванов"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--dark)" }}
          >
            Номер телефона
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
            style={{ borderColor: "var(--border)" }}
            placeholder="+7 918 968-28-82"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full btn-primary py-3 font-oswald font-semibold"
        >
          Отправить заявку
        </button>
      </form>
    </DialogWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СВЯЗИ
// ============================================================

interface ContactDialogProps {
  /** Открыт ли диалог */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Дополнительные классы */
  className?: string;
}

export function ContactDialog({
  open,
  onOpenChange,
  className,
}: ContactDialogProps) {
  return (
    <DialogWithSchema
      title="Свяжитесь с нами"
      description="Оставьте сообщение, и мы ответим в ближайшее время"
      actionType="ContactAction"
      actionUrl="tel:+79189682882"
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <button className="btn-primary px-6 py-2.5 text-sm font-oswald">
          Связаться
        </button>
      }
      className={className}
    >
      <div className="space-y-4 mt-2">
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "var(--teal-light)" }}
        >
          <span className="text-lg">📞</span>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--dark)" }}
            >
              <a
                href="tel:+79189682882"
                className="hover:underline"
                style={{ color: "var(--teal)" }}
              >
                8 918 968-28-82
              </a>
            </p>
            <p className="text-xs" style={{ color: "var(--gray)" }}>
              Звоните с 8:00 до 22:00
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "#f0fdf4" }}
        >
          <span className="text-lg">💬</span>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--dark)" }}
            >
              <a
                href="https://wa.me/79189682882"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#25d366" }}
              >
                WhatsApp
              </a>
            </p>
            <p className="text-xs" style={{ color: "var(--gray)" }}>
              Быстрый ответ
            </p>
          </div>
        </div>
      </div>
    </DialogWithSchema>
  );
}
