// Компонент VerificationCode
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface VerificationCodeProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onResend?: () => Promise<void>;
  initialTimer?: number;
  autoSubmit?: boolean;
}

export function VerificationCode({
  onSuccess,
  onError,
  onResend,
  initialTimer = 60,
  autoSubmit = true,
}: VerificationCodeProps) {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [timer, setTimer] = React.useState(initialTimer);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Автофокус при монтировании
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Таймер обратного отсчёта
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Автоотправка при заполнении всех полей
  React.useEffect(() => {
    if (autoSubmit && code.length === 6 && !isLoading) {
      handleSubmit();
    }
  }, [code]);

  const handleSubmit = async () => {
    if (code.length !== 6) return;
    setIsLoading(true);
    setError(null);

    try {
      // Имитация проверки кода
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (code === "123456") {
        onSuccess?.();
      } else {
        const errorMsg = "Неверный код. Попробуйте снова.";
        setError(errorMsg);
        onError?.(errorMsg);
        setCode("");
      }
    } catch (err) {
      const errorMsg = "Ошибка проверки кода. Попробуйте позже.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;
    setIsResending(true);
    setError(null);
    setCode("");

    try {
      await onResend?.();
      setTimer(initialTimer);
    } catch {
      setError("Не удалось отправить код повторно.");
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && code.length === 6) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isComplete = code.length === 6;
  const isDisabled = isLoading || isResending;

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Введите код из SMS, отправленный на ваш номер
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Код действителен{" "}
          <span className="font-semibold text-teal">{timer}</span> секунд
        </p>
      </div>

      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        error={!!error}
        size="lg"
        className="justify-center"
        ref={inputRef}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {error && (
        <p className="text-sm text-destructive text-center font-medium">
          {error}
        </p>
      )}

      <Button
        variant="teal"
        className="w-full"
        onClick={handleSubmit}
        disabled={!isComplete || isDisabled || !!error}
        loading={isLoading}
      >
        {isLoading ? "Проверяем..." : "Подтвердить"}
      </Button>

      <button
        className="w-full text-sm text-teal hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={handleResend}
        disabled={timer > 0 || isResending}
      >
        {isResending
          ? "Отправляем..."
          : timer > 0
            ? `Отправить повторно через ${timer}с`
            : "Отправить код повторно"}
      </button>
    </div>
  );
}

// Использование в модалке
export function VerificationModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-teal">
            Подтверждение заявки
          </DialogTitle>
          <DialogDescription>Введите 6-значный код из SMS</DialogDescription>
        </DialogHeader>
        <VerificationCode
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
          onError={(error) => {
            console.error("Verification error:", error);
          }}
          onResend={async () => {
            // API вызов для повторной отправки кода
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }}
          initialTimer={60}
          autoSubmit
        />
      </DialogContent>
    </Dialog>
  );
}
