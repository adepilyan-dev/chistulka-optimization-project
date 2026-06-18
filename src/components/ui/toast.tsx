// ============================
// Хук для уведомлений
// ============================

import { useToast } from "@/hooks/use-toast";

export function useNotifications() {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "success",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "warning",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "info",
    });
  };

  const showTeal = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "teal",
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showTeal,
  };
}

// ============================
// Использование в форме
// ============================

export function OrderFormWithNotifications() {
  const { showSuccess, showError, showTeal } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitOrder();
      showSuccess("Заявка отправлена!", "Мастер выедет в течение 2 часов");
    } catch {
      showError("Ошибка отправки", "Попробуйте позже или позвоните нам");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Отправить</Button>
    </form>
  );
}

// ============================
// Уведомление о статусе заказа
// ============================

export function OrderStatusToast({ status }: { status: string }) {
  const { toast } = useToast();

  React.useEffect(() => {
    switch (status) {
      case "pending":
        toast({
          title: "⏳ Заявка принята",
          description: "Ожидайте звонка от мастера",
          variant: "info",
          duration: 5000,
        });
        break;
      case "confirmed":
        toast({
          title: "✅ Заявка подтверждена!",
          description: "Мастер выезжает к вам",
          variant: "success",
          duration: 5000,
        });
        break;
      case "completed":
        toast({
          title: "🎉 Работа выполнена!",
          description: "Спасибо, что выбрали Аренду Чистоты",
          variant: "teal",
          duration: 8000,
        });
        break;
      case "cancelled":
        toast({
          title: "❌ Заявка отменена",
          description: "Если это ошибка, свяжитесь с нами",
          variant: "destructive",
          duration: 5000,
        });
        break;
    }
  }, [status]);

  return null;
}
