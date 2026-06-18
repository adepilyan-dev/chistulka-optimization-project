import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ FORM
// ============================================================

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ ФОРМЫ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface FormWithSchemaProps {
  /** Заголовок формы */
  title?: string;
  /** Описание формы */
  description?: string;
  /** Тип действия для микроразметки */
  actionType?: "ContactAction" | "OrderAction" | "BookAction" | "ConfirmAction";
  /** URL действия (для микроразметки) */
  actionUrl?: string;
  /** Обработчик отправки */
  onSubmit: (data: any) => void;
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** ID формы */
  id?: string;
}

/**
 * Компонент Form с микроразметкой действия
 * Используйте для форм заказа, связи, записи.
 */
export function FormWithSchema({
  title,
  description,
  actionType = "ConfirmAction",
  actionUrl,
  onSubmit,
  children,
  className,
  id,
}: FormWithSchemaProps) {
  // Формируем микроразметку действия
  const actionLd = {
    "@context": "https://schema.org",
    "@type": actionType,
    ...(title && { name: title }),
    ...(description && { description: description }),
    ...(actionUrl && { target: actionUrl }),
    potentialAction: {
      "@type": actionType,
      ...(actionUrl && { target: actionUrl }),
    },
  };

  return (
    <>
      {/* Микроразметка действия */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(actionLd)}</script>
      </Helmet>

      <Form {...({ onSubmit } as any)}>
        <form
          id={id}
          onSubmit={onSubmit}
          className={cn("space-y-6", className)}
          aria-label={title || "Форма"}
        >
          {title && (
            <h3
              className="font-oswald font-bold text-xl"
              style={{ color: "var(--dark)" }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              {description}
            </p>
          )}
          {children}
        </form>
      </Form>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ЗАКАЗА
// ============================================================

interface OrderFormData {
  name: string;
  phone: string;
  service?: string;
  comment?: string;
}

interface OrderFormProps {
  /** Название услуги (по умолчанию) */
  defaultService?: string;
  /** Обработчик отправки */
  onSubmit: (data: OrderFormData) => void;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Дополнительные классы */
  className?: string;
}

export function OrderForm({
  defaultService,
  onSubmit,
  isLoading = false,
  className,
}: OrderFormProps) {
  const methods = useFormContext<OrderFormData>();

  return (
    <FormWithSchema
      title="Оставить заявку"
      description="Перезвоним в течение 15 минут"
      actionType="OrderAction"
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
    >
      <FormField
        control={methods.control}
        name="name"
        rules={{ required: "Имя обязательно" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ваше имя</FormLabel>
            <FormControl>
              <input
                {...field}
                type="text"
                placeholder="Иван Иванов"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
                style={{ borderColor: "var(--border)" }}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={methods.control}
        name="phone"
        rules={{ required: "Телефон обязателен" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <input
                {...field}
                type="tel"
                placeholder="+7 918 968-28-82"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
                style={{ borderColor: "var(--border)" }}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {defaultService && (
        <input type="hidden" name="service" value={defaultService} />
      )}

      <FormField
        control={methods.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Комментарий (необязательно)</FormLabel>
            <FormControl>
              <textarea
                {...field}
                placeholder="Дополнительные пожелания"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)] resize-none"
                style={{ borderColor: "var(--border)", minHeight: 80 }}
                disabled={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <button
        type="submit"
        className="w-full btn-primary py-3.5 font-oswald font-semibold text-base"
        disabled={isLoading}
      >
        {isLoading ? "Отправляем..." : "Вызвать мастера"}
      </button>
    </FormWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СВЯЗИ
// ============================================================

interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  /** Обработчик отправки */
  onSubmit: (data: ContactFormData) => void;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Дополнительные классы */
  className?: string;
}

export function ContactForm({
  onSubmit,
  isLoading = false,
  className,
}: ContactFormProps) {
  const methods = useFormContext<ContactFormData>();

  return (
    <FormWithSchema
      title="Свяжитесь с нами"
      description="Оставьте сообщение, и мы ответим в ближайшее время"
      actionType="ContactAction"
      actionUrl="tel:+79189682882"
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
    >
      <FormField
        control={methods.control}
        name="name"
        rules={{ required: "Имя обязательно" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ваше имя</FormLabel>
            <FormControl>
              <input
                {...field}
                type="text"
                placeholder="Иван Иванов"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
                style={{ borderColor: "var(--border)" }}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={methods.control}
        name="phone"
        rules={{ required: "Телефон обязателен" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <input
                {...field}
                type="tel"
                placeholder="+7 918 968-28-82"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
                style={{ borderColor: "var(--border)" }}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={methods.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Сообщение</FormLabel>
            <FormControl>
              <textarea
                {...field}
                placeholder="Опишите вашу задачу..."
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--teal)] resize-none"
                style={{ borderColor: "var(--border)", minHeight: 120 }}
                disabled={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <button
        type="submit"
        className="w-full btn-primary py-3.5 font-oswald font-semibold text-base"
        disabled={isLoading}
      >
        {isLoading ? "Отправляем..." : "Отправить сообщение"}
      </button>
    </FormWithSchema>
  );
}
