// ============================
// Форма заявки
// ============================

export function OrderForm() {
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    if (value.length > 500) {
      setError("Максимум 500 символов");
    } else {
      setError(null);
    }
  };

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>Ваше имя</Label>
        <Input placeholder="Например, Елена" size="lg" />
      </div>

      <div className="space-y-2">
        <Label required>Телефон</Label>
        <Input placeholder="8 918 968-28-82" size="lg" />
      </div>

      <div className="space-y-2">
        <Textarea
          label="Комментарий"
          placeholder="Напишите дополнительные пожелания..."
          helperText={`${comment.length}/500 символов`}
          value={comment}
          onChange={handleChange}
          errorMessage={error || undefined}
          variant={error ? "error" : "default"}
          size="lg"
          autoResize
          maxHeight={200}
          className="bg-white"
        />
      </div>

      <Button variant="teal" size="lg" className="w-full">
        Отправить заявку
      </Button>
    </form>
  );
}

// ============================
// Отзыв
// ============================

export function ReviewForm() {
  const [review, setReview] = React.useState("");
  const maxLength = 1000;

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl border">
      <div className="flex items-center justify-between">
        <h4 className="font-oswald font-bold">Ваш отзыв</h4>
        <Badge
          variant={review.length > maxLength * 0.9 ? "destructive" : "muted"}
        >
          {review.length}/{maxLength}
        </Badge>
      </div>

      <Textarea
        placeholder="Поделитесь впечатлениями о работе..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        size="lg"
        autoResize
        maxHeight={250}
        variant={review.length > maxLength ? "error" : "default"}
        errorMessage={
          review.length > maxLength ? "Превышен лимит символов" : undefined
        }
        className="bg-gray-50"
      />

      <Button
        variant="teal"
        className="w-full"
        disabled={!review || review.length > maxLength}
      >
        Отправить отзыв
      </Button>
    </div>
  );
}

// ============================
// Описание услуги в админке
// ============================

export function ServiceDescription() {
  return (
    <div className="space-y-4">
      <Textarea
        label="Краткое описание"
        placeholder="Краткое описание услуги для карточки..."
        helperText="Максимум 160 символов"
        size="sm"
        maxLength={160}
        className="resize-y"
      />

      <Textarea
        label="Полное описание"
        placeholder="Подробное описание услуги..."
        helperText="SEO-текст для страницы услуги"
        size="lg"
        autoResize
        maxHeight={400}
        className="min-h-[150px]"
      />
    </div>
  );
}

// ============================
// Чат с поддержкой
// ============================

export function SupportChatInput() {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // Отправка сообщения
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        placeholder="Напишите сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        size="sm"
        autoResize
        maxHeight={120}
        className="flex-1 resize-none"
      />
      <Button
        variant="teal"
        size="icon"
        className="h-10 w-10 flex-shrink-0"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <Icon name="Send" size={16} />
      </Button>
    </div>
  );
}
