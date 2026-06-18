// ============================
// Форма заявки
// ============================

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";

export function OrderForm() {
  return (
    <form className="space-y-4">
      {/* Имя */}
      <div className="space-y-1.5">
        <Label htmlFor="name" required size="lg">
          <Icon name="User" size={14} className="text-teal" />
          Ваше имя
        </Label>
        <Input
          id="name"
          placeholder="Например, Елена"
          icon={<Icon name="User" size={16} />}
          size="lg"
        />
      </div>

      {/* Телефон */}
      <div className="space-y-1.5">
        <Label htmlFor="phone" required variant="teal" size="lg">
          <Icon name="Phone" size={14} className="text-teal" />
          Номер телефона
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="8 918 968-28-82"
          icon={<Icon name="Phone" size={16} />}
          helperText="Перезвоним в течение 15 минут"
          size="lg"
        />
      </div>

      {/* Адрес (необязательно) */}
      <div className="space-y-1.5">
        <Label htmlFor="address" optional size="lg">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          Адрес
        </Label>
        <Input
          id="address"
          placeholder="ул. Примерная, д. 1"
          icon={<Icon name="MapPin" size={16} />}
          size="lg"
        />
      </div>

      {/* Комментарий (необязательно) */}
      <div className="space-y-1.5">
        <Label htmlFor="comment" optional size="lg">
          <Icon
            name="MessageSquare"
            size={14}
            className="text-muted-foreground"
          />
          Комментарий
        </Label>
        <Input
          id="comment"
          placeholder="Дополнительная информация..."
          icon={<Icon name="MessageSquare" size={16} />}
          size="lg"
        />
      </div>
    </form>
  );
}

// ============================
// Поле с ошибкой
// ============================

export function FormFieldWithError() {
  const [hasError, setHasError] = React.useState(true);

  return (
    <div className="space-y-1.5">
      <Label htmlFor="phone" required error={hasError} size="lg">
        <Icon name="Phone" size={14} className="text-destructive" />
        Номер телефона
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="8 918 968-28-82"
        variant="error"
        errorMessage="Введите корректный номер телефона"
        size="lg"
      />
    </div>
  );
}

// ============================
// Список опций
// ============================

export function OptionsList() {
  return (
    <div className="space-y-2">
      <Label size="lg" className="font-oswald">
        Выберите услугу
      </Label>
      <div className="space-y-2">
        {[
          { id: "sofa", label: "Химчистка диванов", price: "от 3 500 ₽" },
          { id: "chair", label: "Химчистка кресел", price: "от 2 500 ₽" },
          { id: "mattress", label: "Химчистка матрасов", price: "от 3 000 ₽" },
        ].map((item) => (
          <Label
            key={item.id}
            className="flex items-center justify-between p-3 bg-white rounded-xl border hover:border-teal-200 cursor-pointer transition-all"
          >
            <span>{item.label}</span>
            <span className="text-sm font-medium text-teal">{item.price}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
