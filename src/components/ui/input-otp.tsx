// Код подтверждения заявки
function VerificationCode() {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(false);
  const [timer, setTimer] = React.useState(60);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleComplete = (value: string) => {
    setCode(value);
    // Проверка кода
    if (value === "123456") {
      setError(false);
      // Успешно
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Введите код из SMS, отправленный на ваш номер
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Код действителен {timer} секунд
        </p>
      </div>

      <InputOTP
        maxLength={6}
        onChange={handleComplete}
        error={error}
        size="lg"
        className="justify-center"
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
        <p className="text-sm text-destructive text-center">
          Неверный код. Попробуйте снова.
        </p>
      )}

      <Button
        variant="teal"
        className="w-full"
        disabled={code.length !== 6 || error}
      >
        Подтвердить
      </Button>

      <button
        className="w-full text-sm text-teal hover:underline"
        onClick={() => setTimer(60)}
        disabled={timer > 0}
      >
        {timer > 0
          ? `Отправить повторно через ${timer}с`
          : "Отправить код повторно"}
      </button>
    </div>
  );
}

// В модалке подтверждения
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Подтверждение заявки</DialogTitle>
      <DialogDescription>Введите 6-значный код из SMS</DialogDescription>
    </DialogHeader>
    <VerificationCode />
  </DialogContent>
</Dialog>;
