import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { Helmet } from "react-helmet-async";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TOASTER
// ============================================================

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  // Исправлено: корректный URL в @context
  const notificationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Система уведомлений",
    "description": "Уведомления для пользователей",
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(notificationLd)}
        </script>
      </Helmet>

      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton:
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
        {...props}
      />
    <>
  );
};

export { Toaster };

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ УВЕДОМЛЕНИЙ
// ============================================================

/**
 * Показывает успешное уведомление
 */
export function showSuccess(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 4000,
    position: "top-right",
    className: "border-green-500 border-l-4",
  });
}

/**
 * Показывает уведомление об ошибке
 */
export function showError(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: 5000,
    position: "top-right",
    className: "border-red-500 border-l-4",
  });
}

/**
 * Показывает предупреждение
 */
export function showWarning(message: string, description?: string) {
  toast.warning(message, {
    description,
    duration: 4000,
    position: "top-right",
    className: "border-yellow-500 border-l-4",
  });
}

/**
 * Показывает информационное уведомление
 */
export function showInfo(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 3000,
    position: "top-right",
    className: "border-blue-500 border-l-4",
  });
}

/**
 * Показывает уведомление с действием
 */
export function showAction(
  message: string,
  actionLabel: string,
  onAction: () => void,
  description?: string
) {
  toast(message, {
    description,
    duration: 6000,
    position: "top-right",
    action: {
      label: actionLabel,
      onClick: onAction,
    },
    className: "border-purple-500 border-l-4",
  });
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ УВЕДОМЛЕНИЯ ДЛЯ ВАШЕГО САЙТА
// ============================================================

/**
 * Уведомление об успешной отправке заявки
 */
export function notifyOrderSubmitted(name?: string) {
  showSuccess(
    `Заявка принята!`,
    name ? `${name}, мы перезвоним в течение 15 минут` : "Мы перезвоним в течение 15 минут"
  );
}

/**
 * Уведомление об ошибке при отправке заявки
 */
export function notifyOrderError() {
  showError(
    "Не удалось отправить заявку",
    "Пожалуйста, попробуйте позже или позвоните нам"
  );
}

/**
 * Уведомление об успешной подписке
 */
export function notifySubscribeSuccess(email: string) {
  showSuccess(
    "Подписка оформлена!",
    `На ${email} будут приходить новости и акции`
  );
}

/**
 * Уведомление о действии с корзиной
 */
export function notifyCartAction(itemName: string, action: "add" | "remove") {
  if (action === "add") {
    showSuccess(`✅ ${itemName} добавлен в корзину`);
  } else {
    showInfo(`❌ ${itemName} удалён из корзины`);
  }
}

/**
 * Уведомление о загрузке
 */
export function notifyLoading() {
  return toast.loading("Загрузка...", {
    position: "top-right",
  });
}

export function dismissLoading(toastId: string) {
  toast.dismiss(toastId);
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ УВЕДОМЛЕНИЙ В ФОРМЕ
// ============================================================

interface FormNotificationProps {
  /** Тип уведомления */
  type: "success" | "error" | "warning" | "info";
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для отображения уведомлений в формах
 * Используйте вместо alert для лучшего UX
 */
export function FormNotification({
  type,
  title,
  description,
  className,
}: FormNotificationProps) {
  React.useEffect(() => {
    const show = {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo,
    };

    show[type](title, description);
  }, [type, title, description]); // Зависимости корректны

  return null;
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ УВЕДОМЛЕНИЙ
// ============================================================

interface NotificationGroupProps {
  /** Список уведомлений */
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    description?: string;
  }>;
  /** Дополнительные классы */
  className?: string;
}

export function NotificationGroup({
  notifications,
  className = "",
}: NotificationGroupProps) {
  const displayedIds = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    notifications.forEach(({ id, type, message, description }) => {
      if (!displayedIds.current.has(id)) {
        const show = {
          success: showSuccess,
          error: showError,
          warning: showWarning,
          info: showInfo,
        };

        show[type](message, description);
        displayedIds.current.add(id);
      }
    });
  }, [notifications]);

  return null;
}
