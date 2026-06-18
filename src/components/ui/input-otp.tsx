import React from "react";
import {
  useVerification,
  VerificationModal,
} from "@/components/ui/verification-code";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ymGoal } from "@/hooks/useYandexMetrika";

// ============================
// 1. Компонент заявки с верификацией
// ============================

interface OrderFormProps {
  onSuccess?: () => void;
}

export function OrderFormWithVerification({ onSuccess }: OrderFormProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Хук для верификации
  const verification = useVerification({
    onSuccess: () => {
      toast({
        title: "✅ Заявка подтверждена!",
        description: "Мастер выезжает к вам. Ожидайте звонка.",
      });
      ymGoal("order_confirmed");
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "❌ Ошибка",
        description: error,
        variant: "destructive",
      });
    },
    onResend: async () => {
      // Отправка нового кода
      await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      toast({
        title: "📱 Код отправлен",
        description: "Проверьте SMS на вашем телефоне",
      });
    },
    initialTimer: 60,
    autoSubmit: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    ymGoal("order_submit");

    try {
      // Отправка заявки и получение кода
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      if (res.ok) {
        // Открываем модалку верификации
        verification.open(phone);
        toast({
          title: "📱 Код отправлен",
          description: "Введите код из SMS для подтверждения заявки",
        });
      } else {
        throw new Error("Ошибка отправки заявки");
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ваше имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Елена"
            className="w-full px-4 py-3 rounded-xl border focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Номер телефона</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="8 918 968-28-82"
            className="w-full px-4 py-3 rounded-xl border focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none transition-all"
            required
          />
          <p className="text-xs text-muted-foreground">
            На этот номер придёт код подтверждения
          </p>
        </div>

        <Button
          type="submit"
          variant="teal"
          size="lg"
          className="w-full font-oswald text-base"
          disabled={isSubmitting || !name || !phone}
          loading={isSubmitting}
        >
          {isSubmitting ? "Отправляем..." : "Вызвать мастера"}
        </Button>
      </form>

      {/* Модалка верификации */}
      {verification.modal}
    </>
  );
}

// ============================
// 2. Компонент для повторной верификации
// ============================

interface ReVerificationProps {
  phone: string;
  onVerified: () => void;
  onCancel?: () => void;
}

export function ReVerification({
  phone,
  onVerified,
  onCancel,
}: ReVerificationProps) {
  const verification = useVerification({
    onSuccess: () => {
      toast({
        title: "✅ Подтверждено",
        description: "Доступ восстановлен",
      });
      onVerified();
    },
    onError: (error) => {
      toast({
        title: "❌ Ошибка",
        description: error,
        variant: "destructive",
      });
    },
    onResend: async () => {
      await fetch("/api/resend-code", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      toast({
        title: "📱 Код отправлен повторно",
        description: "Проверьте SMS",
      });
    },
    initialTimer: 30,
    autoSubmit: true,
  });

  return (
    <div className="space-y-4">
      <Button
        variant="tealOutline"
        className="w-full"
        onClick={() => verification.open(phone)}
      >
        Подтвердить номер
      </Button>

      {onCancel && (
        <Button variant="ghost" className="w-full" onClick={onCancel}>
          Отмена
        </Button>
      )}

      {verification.modal}
    </div>
  );
}

// ============================
// 3. Компонент для смены номера телефона
// ============================

interface ChangePhoneProps {
  currentPhone: string;
  onChanged: (newPhone: string) => void;
}

export function ChangePhone({ currentPhone, onChanged }: ChangePhoneProps) {
  const [newPhone, setNewPhone] = React.useState("");
  const [step, setStep] = React.useState<"enter" | "verify">("enter");

  const verification = useVerification({
    onSuccess: () => {
      toast({
        title: "✅ Номер обновлён",
        description: "Телефон успешно изменён",
      });
      onChanged(newPhone);
      setStep("enter");
      setNewPhone("");
    },
    onError: (error) => {
      toast({
        title: "❌ Ошибка",
        description: error,
        variant: "destructive",
      });
    },
    onResend: async () => {
      await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ phone: newPhone }),
      });
    },
    initialTimer: 60,
    autoSubmit: true,
  });

  const handleSendCode = () => {
    if (!newPhone || newPhone === currentPhone) return;
    verification.open(newPhone);
    setStep("verify");
  };

  return (
    <div className="space-y-4">
      {step === "enter" ? (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Новый номер</label>
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="8 918 968-28-82"
              className="w-full px-4 py-3 rounded-xl border focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none transition-all"
            />
            <p className="text-xs text-muted-foreground">
              Текущий номер: {currentPhone}
            </p>
          </div>
          <Button
            variant="teal"
            className="w-full"
            disabled={!newPhone || newPhone === currentPhone}
            onClick={handleSendCode}
          >
            Отправить код
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Код отправлен на номер {newPhone}
          </p>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setStep("enter");
              verification.close();
            }}
          >
            ← Вернуться
          </Button>
        </div>
      )}

      {verification.modal}
    </div>
  );
}

// ============================
// 4. Использование в диалоге
// ============================

export function VerificationDialogExample() {
  const [open, setOpen] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="teal"
        onClick={() => setOpen(true)}
        disabled={isVerified}
      >
        {isVerified ? "✅ Подтверждено" : "Подтвердить заявку"}
      </Button>

      <VerificationModal
        open={open}
        onOpenChange={setOpen}
        onSuccess={() => {
          setIsVerified(true);
          toast({
            title: "✅ Подтверждено!",
            description: "Заявка успешно подтверждена",
          });
        }}
        phoneNumber="+7 918 968-28-82"
        title="Подтверждение заявки"
        description="Введите 6-значный код из SMS"
      />
    </div>
  );
}

// ============================
// 5. Полная страница заявки
// ============================

export function OrderPage() {
  const [orderSuccess, setOrderSuccess] = React.useState(false);

  if (orderSuccess) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-teal" />
        </div>
        <h2 className="font-oswald text-2xl font-bold mb-2">
          Заявка подтверждена!
        </h2>
        <p className="text-muted-foreground mb-6">
          Мастер выезжает к вам. Ожидайте звонка в течение 15 минут.
        </p>
        <Button variant="teal" onClick={() => setOrderSuccess(false)}>
          Новая заявка
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="font-oswald text-3xl font-bold text-teal">
          Вызвать мастера
        </h1>
        <p className="text-muted-foreground mt-2">
          Заполните форму и подтвердите номер телефона
        </p>
      </div>

      <OrderFormWithVerification onSuccess={() => setOrderSuccess(true)} />
    </div>
  );
}

// ============================
// 6. Интеграция с формой калькулятора
// ============================

export function CalculatorOrderForm() {
  const [total, setTotal] = React.useState(0);
  const verification = useVerification({
    onSuccess: () => {
      toast({
        title: "✅ Заказ оформлен!",
        description: `Сумма: ${total} ₽. Мастер выезжает к вам.`,
      });
      ymGoal("calculator_order");
    },
    onError: (error) => {
      toast({
        title: "❌ Ошибка",
        description: error,
        variant: "destructive",
      });
    },
    onResend: async () => {
      // Логика повторной отправки
    },
    initialTimer: 60,
    autoSubmit: true,
  });

  const handleOrder = async (phone: string) => {
    // Сохраняем заказ
    await fetch("/api/calculator-order", {
      method: "POST",
      body: JSON.stringify({ phone, total }),
    });
    // Открываем верификацию
    verification.open(phone);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 bg-teal-light rounded-xl">
        <span className="font-medium">Итого:</span>
        <span className="font-oswald text-2xl font-bold text-teal">
          {total.toLocaleString()} ₽
        </span>
      </div>

      <Button
        variant="teal"
        size="lg"
        className="w-full"
        onClick={() => handleOrder("+7 918 968-28-82")}
      >
        <Icon name="Calendar" size={18} className="mr-2" />
        Подтвердить заказ
      </Button>

      {verification.modal}
    </div>
  );
}

// ============================
// 7. Экспорт всех компонентов
// ============================

export {
  OrderFormWithVerification,
  ReVerification,
  ChangePhone,
  VerificationDialogExample,
  OrderPage,
  CalculatorOrderForm,
};
