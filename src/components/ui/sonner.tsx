// ============================
// Хук для уведомлений
// ============================

import { toast } from "@/components/ui/toaster";

export function useNotifications() {
  const showSuccess = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const showError = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const showWarning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  const showInfo = (message: string, description?: string) => {
    toast.info(message, { description });
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (id: string | number) => {
    toast.dismiss(id);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  };
}

// ============================
// Использование в форме
// ============================

export function OrderForm() {
  const { showSuccess, showError, showLoading } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = showLoading("Отправка заявки...");

    try {
      await submitOrder(formData);
      toast.dismiss(id);
      showSuccess("Заявка отправлена!", "Мастер выедет в течение 2 часов");
    } catch {
      toast.dismiss(id);
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
// Уведомления о статусе заказа
// ============================

export function OrderStatusNotifications() {
  const { showSuccess, showWarning, showInfo } = useNotifications();

  const handleStatusChange = (status: string) => {
    switch (status) {
      case "pending":
        showInfo("Заявка принята", "Ожидайте звонка от мастера");
        break;
      case "confirmed":
        showSuccess("Заявка подтверждена", "Мастер выезжает к вам");
        break;
      case "in_progress":
        showInfo("Мастер в пути", "Прибудет в ближайшее время");
        break;
      case "completed":
        showSuccess("Работа выполнена!", "Спасибо, что выбрали Аренду Чистоты");
        break;
      case "cancelled":
        showWarning("Заявка отменена", "Если это ошибка, свяжитесь с нами");
        break;
    }
  };

  return null;
}

// ============================
// Уведомление с промо-акцией
// ============================

export function PromoNotification() {
  const { showInfo } = useNotifications();

  React.useEffect(() => {
    const hasSeen = localStorage.getItem("promo_seen");
    if (!hasSeen) {
      setTimeout(() => {
        toast(
          <div className="flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-yellow-500" />
            <div>
              <p className="font-bold">🎉 Акция!</p>
              <p className="text-sm text-muted-foreground">
                Скидка 10% на первый заказ по промокоду <strong>CLEAN10</strong>
              </p>
            </div>
          </div>,
          {
            duration: 10000,
            onAutoClose: () => localStorage.setItem("promo_seen", "true"),
          },
        );
      }, 5000);
    }
  }, []);

  return null;
}
