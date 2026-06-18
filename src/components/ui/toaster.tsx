// ============================
// Хук для уведомлений
// ============================

import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/ui/icon";

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

  const showPromo = (title: string, description?: string) => {
    toast({
      title,
      description,
      icon: <Icon name="Gift" size={24} className="text-yellow-500" />,
      duration: 10000,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showTeal,
    showPromo,
  };
}

// ============================
// Использование в форме заявки
// ============================

export function OrderFormWithNotifications() {
  const { showSuccess, showError, showTeal } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitOrder();
      showSuccess("Заявка отправлена!", "Мастер выедет в течение 2 часов");
      // Показываем дополнительный тост с промо
      setTimeout(() => {
        showTeal(
          "🎉 Специальное предложение!",
          "Скидка 10% на следующий заказ",
        );
      }, 3000);
    } catch {
      showError("Ошибка отправки", "Попробуйте позже или позвоните нам");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* поля формы */}
      <Button type="submit">Отправить</Button>
    </form>
  );
}

// ============================
// Уведомление о статусе заказа
// ============================

export function OrderStatusToast({ status }: { status: string }) {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications();

  React.useEffect(() => {
    switch (status) {
      case "pending":
        showInfo("⏳ Заявка принята", "Ожидайте звонка от мастера");
        break;
      case "confirmed":
        showSuccess("✅ Заявка подтверждена!", "Мастер выезжает к вам");
        break;
      case "in_progress":
        showInfo("🚗 Мастер в пути", "Прибудет в ближайшее время");
        break;
      case "completed":
        showSuccess(
          "🎉 Работа выполнена!",
          "Спасибо, что выбрали Аренду Чистоты",
        );
        break;
      case "cancelled":
        showError("❌ Заявка отменена", "Если это ошибка, свяжитесь с нами");
        break;
      case "delayed":
        showWarning("⚠️ Задержка", "Мастер задерживается на 20 минут");
        break;
    }
  }, [status]);

  return null;
}
