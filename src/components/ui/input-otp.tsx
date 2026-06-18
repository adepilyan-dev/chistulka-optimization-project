import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ OTP INPUT
// ============================================================

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface OTPInputWithSchemaProps {
  /** Количество полей для ввода */
  maxLength?: number;
  /** Обработчик изменения */
  onChange?: (value: string) => void;
  /** Обработчик завершения ввода */
  onComplete?: (value: string) => void;
  /** Отключен ли ввод */
  disabled?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Подпись к полю */
  label?: string;
  /** Описание поля */
  description?: string;
  /** Тип верификации для микроразметки */
  verificationType?: "Email" | "Phone" | "SMS" | "TwoFactor";
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент OTP Input с микроразметкой
 * Используйте для верификации по SMS, email, двухфакторной аутентификации.
 */
export function OTPInputWithSchema({
  maxLength = 6,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  errorMessage,
  label = "Введите код",
  description = "Код отправлен на ваш номер телефона",
  verificationType = "SMS",
  className,
  ...props
}: OTPInputWithSchemaProps) {
  const [value, setValue] = React.useState("");

  // Формируем микроразметку для верификации
  const verificationLd = {
    "@context": "https://schema.org",
    "@type": "Verification",
    name: `Верификация по ${verificationType}`,
    description: description,
    verificationMethod: {
      "@type": "VerificationMethod",
      name: `Код подтверждения`,
      url: "https://arenda-chistoty.ru/#contacts",
    },
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
    if (newValue.length === maxLength) {
      onComplete?.(newValue);
    }
  };

  return (
    <>
      {/* Микроразметка верификации */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(verificationLd)}
        </script>
      </Helmet>

      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: "var(--dark)" }}
          >
            {label}
          </label>
        )}

        <InputOTP
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          containerClassName={cn(
            "flex items-center gap-2",
            error && "[&>div]:border-red-500 [&>div]:ring-red-500",
          )}
          {...props}
        />

        {description && !error && (
          <p className="text-sm" style={{ color: "var(--gray)" }}>
            {description}
          </p>
        )}

        {error && errorMessage && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span>❌</span>
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЕРИФИКАЦИИ ПО SMS
// ============================================================

interface SMSVerificationProps {
  /** Номер телефона для отображения */
  phoneNumber?: string;
  /** Обработчик изменения */
  onChange?: (value: string) => void;
  /** Обработчик завершения ввода */
  onComplete?: (value: string) => void;
  /** Отключен ли ввод */
  disabled?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Дополнительные классы */
  className?: string;
  /** Обработчик повторной отправки */
  onResend?: () => void;
  /** Таймер до повторной отправки (в секундах) */
  resendTimer?: number;
}

export function SMSVerification({
  phoneNumber = "+7 918 968-28-82",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
  onResend,
  resendTimer = 60,
}: SMSVerificationProps) {
  const [timer, setTimer] = React.useState(resendTimer);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      onResend?.();
      setTimer(resendTimer);
      setCanResend(false);
    }
  };

  return (
    <OTPInputWithSchema
      maxLength={6}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
      error={error}
      label="Введите код из SMS"
      description={`Код отправлен на ${phoneNumber}`}
      verificationType="SMS"
      className={className}
    >
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={cn(
            "text-sm font-medium transition-colors",
            canResend
              ? "text-[var(--teal)] hover:underline"
              : "text-gray-400 cursor-not-allowed",
          )}
        >
          {canResend
            ? "Отправить код повторно"
            : `Повторно через ${timer} сек.`}
        </button>
      </div>
    </OTPInputWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ДВУХФАКТОРНОЙ АУТЕНТИФИКАЦИИ
// ============================================================

interface TwoFactorVerificationProps {
  /** Обработчик изменения */
  onChange?: (value: string) => void;
  /** Обработчик завершения ввода */
  onComplete?: (value: string) => void;
  /** Отключен ли ввод */
  disabled?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Дополнительные классы */
  className?: string;
}

export function TwoFactorVerification({
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: TwoFactorVerificationProps) {
  return (
    <OTPInputWithSchema
      maxLength={6}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
      error={error}
      label="Код двухфакторной аутентификации"
      description="Введите код из приложения-аутентификатора"
      verificationType="TwoFactor"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЕРИФИКАЦИИ EMAIL
// ============================================================

interface EmailVerificationProps {
  /** Email для отображения */
  email?: string;
  /** Обработчик изменения */
  onChange?: (value: string) => void;
  /** Обработчик завершения ввода */
  onComplete?: (value: string) => void;
  /** Отключен ли ввод */
  disabled?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Дополнительные классы */
  className?: string;
}

export function EmailVerification({
  email = "arenda-chistoty.ru@yandex.ru",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: EmailVerificationProps) {
  return (
    <OTPInputWithSchema
      maxLength={6}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
      error={error}
      label="Введите код из email"
      description={`Код отправлен на ${email}`}
      verificationType="Email"
      className={className}
    />
  );
}
