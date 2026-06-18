import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// ============================================================
# БАЗОВЫЙ КОМПОНЕНТ TOASTER
// ============================================================

export function Toaster() {
  const { toasts } = useToast();

  // Микроразметка для системы уведомлений
  const notificationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Система уведомлений",
    "description": "Уведомления для пользователей сайта",
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(notificationLd)}
        </script>
      </Helmet>

      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, variant, ...props }) {
          // Определяем классы для разных типов уведомлений
          const variantClasses = {
            default: "",
            destructive: "border-red-500 bg-red-50 text-red-800",
            success: "border-green-500 bg-green-50 text-green-800",
            warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
            info: "border-blue-500 bg-blue-50 text-blue-800",
          };

          // Определяем иконку для каждого типа
          const variantIcons = {
            default: "📋",
            destructive: "❌",
            success: "✅",
            warning: "⚠️",
            info: "ℹ️",
          };

          const icon = variantIcons[variant as keyof typeof variantIcons] || "📋";
          const variantClass = variantClasses[variant as keyof typeof variantClasses] || "";

          return (
            <Toast
              key={id}
              className={cn(
                "border-l-4",
                variantClass,
                !variant && "border-l-transparent"
              )}
              {...props}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                <div className="grid gap-1 flex-1">
                  {title && (
                    <ToastTitle className="flex items-center gap-2">
                      {title}
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className="text-sm opacity-90">
                      {description}
                    </ToastDescription>
                  )}
                </div>
              </div>
              {action && (
                <div className="flex-shrink-0">{action}</div>
              )}
              <ToastClose className="flex-shrink-0" />
            </Toast>
          );
        })}
        <ToastViewport />
      </ToastProvider>
    </>
  );
}

// ============================================================
# ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ОБЪЕДИНЕНИЯ CLASSNAMES
// ============================================================

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
# РАСШИРЕННЫЙ КОМПОНЕНТ С КАСТОМНЫМИ УВЕДОМЛЕНИЯМИ
// ============================================================

interface ToasterWithCustomizationProps {
  /** Позиция уведомлений */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  /** Длительность отображения */
  duration?: number;
  /** Максимальное количество уведомлений */
  maxToasts?: number;
}

export function ToasterWithCustomization({
  position = "top-right",
  duration = 4000,
  maxToasts = 5,
}: ToasterWithCustomizationProps) {
  const { toasts, dismiss } = useToast();

  // Ограничиваем количество уведомлений
  const visibleToasts = toasts.slice(0, maxToasts);

  // Позиция для ToastViewport
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  };

  return (
    <ToastProvider>
      {visibleToasts.map(({ id, title, description, action, variant, ...props }) => {
        // Автоматическое закрытие через duration
        React.useEffect(() => {
          if (duration > 0) {
            const timer = setTimeout(() => {
              dismiss(id);
            }, duration);
            return () => clearTimeout(timer);
          }
        }, [id, duration]);

        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className={cn("fixed z-[100] flex max-h-screen w-full flex-col p-4", positionClasses[position])} />
    </ToastProvider>
  );
}

// ============================================================
# ПРЕДНАСТРОЕННЫЕ УВЕДОМЛЕНИЯ ДЛЯ ВАШЕГО САЙТА
// ============================================================

/**
 * Хук для отправки уведомлений с типизацией
 */
export function useToastNotifications() {
  const { toast } = useToast();

  const notifyOrderSubmitted = (name?: string) => {
    toast({
      title: "✅ Заявка принята!",
      description: name 
        ? `${name}, мы перезвоним в течение 15 минут` 
        : "Мы перезвоним в течение 15 минут",
      variant: "success",
      duration: 4000,
    });
  };

  const notifyOrderError = () => {
    toast({
      title: "❌ Не удалось отправить заявку",
      description: "Пожалуйста, попробуйте позже или позвоните нам",
      variant: "destructive",
      duration: 5000,
    });
  };

  const notifySubscribeSuccess = (email: string) => {
    toast({
      title: "📧 Подписка оформлена!",
      description: `На ${email} будут приходить новости и акции`,
      variant: "success",
      duration: 4000,
    });
  };

  const notifyCartAction = (itemName: string, action: "add" | "remove") => {
    if (action === "add") {
      toast({
        title: "🛒 Добавлено в корзину",
        description: `${itemName} добавлен в корзину`,
        variant: "success",
        duration: 3000,
      });
    } else {
      toast({
        title: "🗑️ Удалено из корзины",
        description: `${itemName} удалён из корзины`,
        variant: "warning",
        duration: 3000,
      });
    }
  };

  return {
    notifyOrderSubmitted,
    notifyOrderError,
    notifySubscribeSuccess,
    notifyCartAction,
  };
}