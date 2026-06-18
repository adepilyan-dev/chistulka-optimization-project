import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SELECT
// ============================================================

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SelectOption {
  /** Значение опции */
  value: string;
  /** Отображаемый текст */
  label: string;
  /** Описание (опционально) */
  description?: string;
}

interface SelectWithSchemaProps {
  /** Название поля (для микроразметки) */
  name: string;
  /** Описание поля */
  description?: string;
  /** Список опций */
  options: SelectOption[];
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Плейсхолдер */
  placeholder?: string;
  /** Отключен ли select */
  disabled?: boolean;
  /** Тип для микроразметки */
  schemaType?: "Category" | "Service" | "Product" | "Location";
  /** Дополнительные классы */
  className?: string;
  /** ID для связи с лейблом */
  id?: string;
  /** Лейбл (для доступности) */
  label?: string;
}

/**
 * Компонент Select с микроразметкой
 * Используйте для выбора категорий, услуг, районов.
 */
export function SelectWithSchema({
  name,
  description,
  options,
  value,
  onValueChange,
  placeholder = "Выберите...",
  disabled = false,
  schemaType = "Category",
  className,
  id,
  label,
}: SelectWithSchemaProps) {
  const selectId = id || `select-${React.useId()}`;

  // Формируем микроразметку
  const selectLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: name,
    ...(description && { description: description }),
    potentialAction: {
      "@type": "ChooseAction",
      actionOption: options.map((option) => ({
        "@type": "Thing",
        name: option.label,
        ...(option.description && { description: option.description }),
      })),
    },
  };

  return (
    <>
      {/* Микроразметка */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(selectLd)}</script>
      </Helmet>

      <div className={cn("space-y-1.5", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium"
            style={{ color: "var(--dark)" }}
          >
            {label}
          </label>
        )}

        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger id={selectId} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div>
                  <div>{option.label}</div>
                  {option.description && (
                    <div className="text-xs opacity-70">
                      {option.description}
                    </div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {description && (
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            {description}
          </p>
        )}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА УСЛУГИ
// ============================================================

interface ServiceSelectProps {
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
  /** Лейбл */
  label?: string;
}

export function ServiceSelect({
  value,
  onValueChange,
  className,
  label = "Выберите услугу",
}: ServiceSelectProps) {
  const options: SelectOption[] = [
    {
      value: "sofa",
      label: "Химчистка диванов",
      description: "Удаляем пятна и запахи",
    },
    {
      value: "chair",
      label: "Химчистка кресел",
      description: "Глубокая чистка без разборки",
    },
    {
      value: "mattress",
      label: "Химчистка матрасов",
      description: "Устраняем клещей и грибок",
    },
    {
      value: "carpet",
      label: "Химчистка ковров",
      description: "Шерсть и синтетика",
    },
    {
      value: "auto",
      label: "Химчистка автосалона",
      description: "Сиденья и панели",
    },
  ];

  return (
    <SelectWithSchema
      name="Услуга"
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Service"
      className={className}
      label={label}
      placeholder="Выберите услугу"
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ВЫБОРА РАЙОНА
// ============================================================

interface DistrictSelectProps {
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Дополнительные классы */
  className?: string;
  /** Лейбл */
  label?: string;
}

export function DistrictSelect({
  value,
  onValueChange,
  className,
  label = "Выберите район",
}: DistrictSelectProps) {
  const options: SelectOption[] = [
    { value: "central", label: "Центральный округ" },
    { value: "prikubanskiy", label: "Прикубанский округ" },
    { value: "karasunsky", label: "Карасунский округ" },
    { value: "zapadnyy", label: "Западный округ" },
    { value: "other", label: "Другой район" },
  ];

  return (
    <SelectWithSchema
      name="Район"
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Location"
      className={className}
      label={label}
      placeholder="Выберите район"
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ВЫБОРА КОЛИЧЕСТВА
// ============================================================

interface QuantitySelectProps {
  /** Текущее значение */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Максимальное значение */
  max?: number;
  /** Дополнительные классы */
  className?: string;
  /** Лейбл */
  label?: string;
}

export function QuantitySelect({
  value = "1",
  onValueChange,
  max = 10,
  className,
  label = "Количество",
}: QuantitySelectProps) {
  const options: SelectOption[] = Array.from({ length: max }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  return (
    <SelectWithSchema
      name="Количество"
      options={options}
      value={value}
      onValueChange={onValueChange}
      schemaType="Product"
      className={className}
      label={label}
      placeholder="Выберите количество"
    />
  );
}
