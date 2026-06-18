import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, ToastOptions } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TOASTER
// ============================================================

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  // Безопасное приведение темы
  const safeTheme =
    theme === "system" || theme === "light" || theme === "dark"
      ? theme
      : "system";

  return (
    <Sonner
      theme={safeTheme}
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
  );
};

export { Toaster };

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ УВЕДОМЛЕНИЙ
// ============================================================

interface ShowToastOptions {
  message: string;
  description?: string;
  duration?: number;
  position?: ToastOptions["position"];
  className?: string;
}

function showToast(
  type: "success" | "error" | "warning" | "info",
  options: ShowToastOptions,
) {
  const baseOptions: ToastOptions = {
    description: options.description,
    duration: options.duration,
    position: options.position || "top-right",
    className: options.className,
  };

  switch (type) {
    case "success":
      toast.success(options.message, baseOptions);
      break;
    case "error":
      toast.error(options.message, baseOptions);
      break;
    case "warning":
      toast.warning(options.message, baseOptions);
      break;
    case "info":
      toast.info(options.message, baseOptions);
      break;
  }
}

/**
 * Показывает успешное уведомление
 */
export function showSuccess(message: string, description?: string) {
  showToast("success", {
    message,
    description,
    duration: 4000,
    className: "border-green-500 border-l-4",
  });
}

/**
 * Показывает уведомление об ошибке
 */
export function showError(message: string, description?: string) {
  showToast("error", {
    message,
    description,
    duration: 5000,
    className: "border-red-500 border-l-4",
  });
}

/**
 * Показывает предупреждение
 */
export function showWarning(message: string, description?: string) {
  showToast("warning", {
    message,
    description,
    duration: 4000,
    className: "border-yellow-500 border-l-4",
  });
}

/**
 * Показывает информационное уведомление
 */
export function showInfo(message: string, description?: string) {
  showToast("info", {
    message,
    description,
    duration: 3000,
    className: "border-blue-500 border-l-4",
  });
}

// Остальные функции (showAction, notifyOrderSubmitted и т. д.) остаются без изменений

// ============================================================
// КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ УВЕДОМЛЕНИЙ В ФОРМЕ
// ============================================================

interface FormNotificationProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  className?: string;
}

/**
 * Компонент для отображения уведомлений в формах
 * Возвращает null, но запускает показ уведомления при монтировании
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
  }, [type, title, description, className]);

  return null;
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ГРУППЫ УВЕДОМЛЕНИЙ
// ============================================================

interface NotificationGroupProps {
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    description?: string;
  }>;
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
