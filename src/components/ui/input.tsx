// ============================
// Форма заявки
// ============================

import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { useForm } from "react-hook-form";

export function OrderForm() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className="space-y-4">
      <Input
        label="Ваше имя"
        placeholder="Например, Елена"
        icon={<Icon name="User" size={16} />}
        {...register("name", { required: "Введите ваше имя" })}
        errorMessage={errors.name?.message as string}
        variant={errors.name ? "error" : "default"}
      />

      <Input
        label="Номер телефона"
        placeholder="8 918 968-28-82"
        icon={<Icon name="Phone" size={16} />}
        helperText="Перезвоним в течение 15 минут"
        {...register("phone", {
          required: "Введите номер телефона",
          minLength: { value: 10, message: "Минимум 10 символов" },
        })}
        errorMessage={errors.phone?.message as string}
        variant={errors.phone ? "error" : "default"}
        size="lg"
      />

      <Input
        label="Адрес (необязательно)"
        placeholder="ул. Примерная, д. 1"
        icon={<Icon name="MapPin" size={16} />}
        size="lg"
      />

      <Input
        label="Комментарий"
        placeholder="Дополнительная информация..."
        icon={<Icon name="MessageSquare" size={16} />}
        size="lg"
      />
    </form>
  );
}

// ============================
// Поиск
// ============================

export function SearchInput() {
  return (
    <Input
      placeholder="Поиск услуг, районов, статей..."
      icon={<Icon name="Search" size={18} className="text-muted-foreground" />}
      variant="ghost"
      size="lg"
      className="rounded-full bg-gray-50 px-6"
    />
  );
}

// ============================
// Фильтры
// ============================

export function FilterInput() {
  return (
    <div className="space-y-4">
      <Input
        label="Цена от"
        placeholder="0"
        icon={<Icon name="Ruble" size={14} />}
        size="sm"
      />
      <Input
        label="Цена до"
        placeholder="10000"
        icon={<Icon name="Ruble" size={14} />}
        size="sm"
      />
    </div>
  );
}
