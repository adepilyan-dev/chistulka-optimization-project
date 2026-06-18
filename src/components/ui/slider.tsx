// ============================
// Фильтр по цене
// ============================

export function PriceFilter() {
  const [price, setPrice] = React.useState([0, 10000]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl border">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Цена</h4>
        <span className="text-sm text-muted-foreground">
          {price[0].toLocaleString()} ₽ — {price[1].toLocaleString()} ₽
        </span>
      </div>

      <Slider
        value={price}
        onValueChange={setPrice}
        max={15000}
        step={100}
        variant="teal"
        size="lg"
        showValue={false}
      />

      <div className="flex gap-2">
        <Input
          type="number"
          value={price[0]}
          onChange={(e) => setPrice([Number(e.target.value), price[1]])}
          className="w-1/2"
          placeholder="От"
        />
        <Input
          type="number"
          value={price[1]}
          onChange={(e) => setPrice([price[0], Number(e.target.value)])}
          className="w-1/2"
          placeholder="До"
        />
      </div>
    </div>
  );
}

// ============================
// Выбор количества
// ============================

export function QuantitySlider() {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="space-y-2">
      <Slider
        value={[quantity]}
        onValueChange={(v) => setQuantity(v[0])}
        min={1}
        max={10}
        step={1}
        showValue
        label="Количество предметов"
        size="lg"
        variant="primary"
      />
      <p className="text-sm text-muted-foreground">
        Выбрано: {quantity} {quantity === 1 ? "предмет" : "предметов"}
      </p>
    </div>
  );
}

// ============================
// Выбор срока
// ============================

export function DateRangeSlider() {
  const [days, setDays] = React.useState(7);

  return (
    <div className="space-y-4 p-4 bg-teal-light rounded-xl">
      <div className="flex items-center justify-between">
        <h4 className="font-oswald font-bold">Срок выполнения</h4>
        <span className="text-sm font-semibold text-teal">
          {days} {days === 1 ? "день" : days < 5 ? "дня" : "дней"}
        </span>
      </div>

      <Slider
        value={[days]}
        onValueChange={(v) => setDays(v[0])}
        min={1}
        max={14}
        step={1}
        variant="teal"
        size="lg"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Срочно (1 день)</span>
        <span>Стандарт (7 дней)</span>
        <span>Максимум (14 дней)</span>
      </div>
    </div>
  );
}

// ============================
// Оценка качества
// ============================

export function RatingSlider() {
  const [rating, setRating] = React.useState(5);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Оценка</label>
        <div className="flex items-center gap-2">
          <div className="text-yellow-400 text-lg">
            {"★".repeat(Math.floor(rating / 2))}
          </div>
          <span className="text-sm font-semibold text-teal">
            {rating / 2}/5
          </span>
        </div>
      </div>

      <Slider
        value={[rating]}
        onValueChange={(v) => setRating(v[0])}
        min={0}
        max={10}
        step={0.5}
        variant="primary"
        size="lg"
      />
    </div>
  );
}
