// Форма заявки на выезд мастера
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  service: z.string().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

function OrderForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(data),
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem required>
              <FormLabel className="text-sm font-medium">Ваше имя</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Например, Елена"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem required>
              <FormLabel className="text-sm font-medium">
                Номер телефона
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="tel"
                  placeholder="8 918 968-28-82"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                Перезвоним в течение 15 минут
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Услуга</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                >
                  <option value="">Выберите услугу</option>
                  <option value="sofa">Химчистка дивана</option>
                  <option value="chair">Химчистка кресла</option>
                  <option value="mattress">Химчистка матраса</option>
                  <option value="carpet">Химчистка ковра</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Адрес</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="ул. Примерная, д. 1"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Комментарий</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Дополнительная информация..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none resize-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="teal"
          className="w-full py-3.5 text-base font-oswald"
        >
          <Icon name="Calendar" size={18} className="mr-2" />
          Вызвать мастера
        </Button>
      </form>
    </Form>
  );
}
