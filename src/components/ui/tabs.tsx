import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TABS
// ============================================================

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface TabItem {
  /** Ключ вкладки */
  value: string;
  /** Заголовок вкладки (видимый) */
  label: string;
  /** Содержимое вкладки */
  content: React.ReactNode;
  /** Описание вкладки (для микроразметки) */
  description?: string;
}

interface TabsWithSchemaProps {
  /** Массив вкладок */
  tabs: TabItem[];
  /** Значение активной вкладки */
  value?: string;
  /** Обработчик изменения */
  onValueChange?: (value: string) => void;
  /** Тип вкладок для микроразметки */
  schemaType?: "Service" | "Product" | "Category";
  /** Дополнительные классы */
  className?: string;
  /** Класс для списка вкладок */
  listClassName?: string;
  /** Класс для содержимого */
  contentClassName?: string;
  /** Ориентация вкладок */
  orientation?: "horizontal" | "vertical";
}

/**
 * Компонент Tabs с микроразметкой
 * Используйте для разделения контента на вкладки (услуги, цены, информация).
 */
export function TabsWithSchema({
  tabs,
  value,
  onValueChange,
  schemaType = "Category",
  className,
  listClassName,
  contentClassName,
  orientation = "horizontal",
}: TabsWithSchemaProps) {
  // Формируем микроразметку для вкладок
  const tabsLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: "Разделы",
    hasPart: tabs.map((tab) => ({
      "@type": schemaType,
      name: tab.label,
      ...(tab.description && { description: tab.description }),
    })),
  };

  return (
    <>
      {/* Микроразметка вкладок */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(tabsLd)}</script>
      </Helmet>

      <Tabs
        value={value}
        onValueChange={onValueChange}
        className={cn("w-full", className)}
      >
        <TabsList
          className={cn(
            orientation === "vertical" ? "flex-col h-auto w-48" : "flex-wrap",
            listClassName,
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "font-oswald",
                orientation === "vertical" && "w-full justify-start",
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={cn("mt-4", contentClassName)}
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ УСЛУГ
// ============================================================

interface ServiceTabsProps {
  /** Дополнительные классы */
  className?: string;
  /** Значение активной вкладки (опционально) */
  defaultValue?: string;
}

export function ServiceTabs({
  className,
  defaultValue = "sofa",
}: ServiceTabsProps) {
  const tabs: TabItem[] = [
    {
      value: "sofa",
      label: "🛋️ Диваны",
      description: "Химчистка диванов любых типов: ткань, велюр, замша, кожа",
      content: (
        <div className="space-y-3">
          <h3 className="font-oswald font-bold text-lg">Химчистка диванов</h3>
          <p>
            Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа —
            работаем с любым материалом.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--teal-light)] px-3 py-1 text-xs">
              Удаление пятен
            </span>
            <span className="rounded-full bg-[var(--teal-light)] px-3 py-1 text-xs">
              Устранение запахов
            </span>
            <span className="rounded-full bg-[var(--teal-light)] px-3 py-1 text-xs">
              Антиаллергенная обработка
            </span>
          </div>
          <p className="font-oswald font-bold text-[var(--teal)]">от 3 500 ₽</p>
        </div>
      ),
    },
    {
      value: "chair",
      label: "🪑 Кресла",
      description: "Химчистка офисных, обеденных и игровых кресел",
      content: (
        <div className="space-y-3">
          <h3 className="font-oswald font-bold text-lg">Химчистка кресел</h3>
          <p>
            Офисные, обеденные, игровые кресла. Глубокая чистка без разборки,
            сушка за 2–4 часа.
          </p>
          <p className="font-oswald font-bold text-[var(--teal)]">от 2 500 ₽</p>
        </div>
      ),
    },
    {
      value: "mattress",
      label: "🛏️ Матрасы",
      description: "Химчистка матрасов с удалением клещей и грибка",
      content: (
        <div className="space-y-3">
          <h3 className="font-oswald font-bold text-lg">Химчистка матрасов</h3>
          <p>
            Устраняем клещей, грибок, пятна и неприятные запахи. Безопасно для
            детей и аллергиков.
          </p>
          <p className="font-oswald font-bold text-[var(--teal)]">от 3 000 ₽</p>
        </div>
      ),
    },
  ];

  return (
    <TabsWithSchema
      tabs={tabs}
      defaultValue={defaultValue}
      schemaType="Service"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ЦЕН
// ============================================================

interface PriceTabsProps {
  /** Дополнительные классы */
  className?: string;
  /** Значение активной вкладки (опционально) */
  defaultValue?: string;
}

export function PriceTabs({
  className,
  defaultValue = "standard",
}: PriceTabsProps) {
  const tabs: TabItem[] = [
    {
      value: "standard",
      label: "💰 Стандарт",
      description: "Базовые услуги по стандартным ценам",
      content: (
        <div className="space-y-3">
          <h3 className="font-oswald font-bold text-lg">Стандартные цены</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b py-2">
              <span>Диван 2-местный</span>
              <span className="font-oswald font-bold text-[var(--teal)]">
                3 500 ₽
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Диван 3-местный</span>
              <span className="font-oswald font-bold text-[var(--teal)]">
                4 500 ₽
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Кресло</span>
              <span className="font-oswald font-bold text-[var(--teal)]">
                2 500 ₽
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "premium",
      label: "⭐ Премиум",
      description: "Расширенные услуги с гарантией качества",
      content: (
        <div className="space-y-3">
          <h3 className="font-oswald font-bold text-lg">Премиум цены</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b py-2">
              <span>Диван 2-местный + Защита</span>
              <span className="font-oswald font-bold text-[var(--teal)]">
                4 500 ₽
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Диван 3-местный + Защита</span>
              <span className="font-oswald font-bold text-[var(--teal)]">
                5 500 ₽
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-[var(--teal-light)] p-3 text-sm">
            ✅ Включена нано-защита ткани
          </div>
        </div>
      ),
    },
  ];

  return (
    <TabsWithSchema
      tabs={tabs}
      defaultValue={defaultValue}
      schemaType="Product"
      className={className}
    />
  );
}
