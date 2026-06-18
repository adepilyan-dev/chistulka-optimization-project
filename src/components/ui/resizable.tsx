import * as React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ RESIZABLE PANELS
// ============================================================

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface PanelWithSchemaProps {
  /** Заголовок панели */
  title?: string;
  /** Описание панели */
  description?: string;
  /** Содержимое панели */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Тип панели для микроразметки */
  schemaType?: "WebPage" | "Article" | "Service" | "Product";
  /** ID панели для якорных ссылок */
  id?: string;
}

/**
 * Компонент панели с микроразметкой
 * Используйте для структурирования контента на странице.
 */
export function PanelWithSchema({
  title,
  description,
  children,
  className,
  schemaType = "WebPage",
  id,
}: PanelWithSchemaProps) {
  // Формируем микроразметку
  const panelLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    ...(title && { name: title }),
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка панели */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(panelLd)}</script>
      </Helmet>

      <div id={id} className={cn("space-y-2", className)}>
        {title && (
          <h3
            className="font-oswald font-bold text-lg"
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
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ДВУХПАНЕЛЬНОГО МАКЕТА
// ============================================================

interface TwoPanelLayoutProps {
  /** Левая панель */
  leftPanel: React.ReactNode;
  /** Правая панель */
  rightPanel: React.ReactNode;
  /** Начальный размер левой панели (в процентах) */
  defaultLeftSize?: number;
  /** Минимальный размер левой панели (в процентах) */
  minLeftSize?: number;
  /** Максимальный размер левой панели (в процентах) */
  maxLeftSize?: number;
  /** Название левой панели (для микроразметки) */
  leftTitle?: string;
  /** Название правой панели (для микроразметки) */
  rightTitle?: string;
  /** Описание левой панели */
  leftDescription?: string;
  /** Описание правой панели */
  rightDescription?: string;
  /** Дополнительные классы */
  className?: string;
}

export function TwoPanelLayout({
  leftPanel,
  rightPanel,
  defaultLeftSize = 35,
  minLeftSize = 20,
  maxLeftSize = 80,
  leftTitle = "Левая панель",
  rightTitle = "Правая панель",
  leftDescription,
  rightDescription,
  className,
}: TwoPanelLayoutProps) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("min-h-[400px] rounded-lg border", className)}
    >
      <ResizablePanel
        defaultSize={defaultLeftSize}
        minSize={minLeftSize}
        maxSize={maxLeftSize}
        className="p-4"
      >
        <PanelWithSchema
          title={leftTitle}
          description={leftDescription}
          schemaType="WebPage"
        >
          {leftPanel}
        </PanelWithSchema>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-gray-200" />

      <ResizablePanel defaultSize={100 - defaultLeftSize} className="p-4">
        <PanelWithSchema
          title={rightTitle}
          description={rightDescription}
          schemaType="WebPage"
        >
          {rightPanel}
        </PanelWithSchema>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СТРАНИЦЫ УСЛУГИ
// ============================================================

interface ServiceDetailLayoutProps {
  /** Содержимое услуги (основное) */
  serviceContent: React.ReactNode;
  /** Боковая панель (цены, контакты) */
  sidebar: React.ReactNode;
  /** Название услуги */
  serviceName: string;
  /** Дополнительные классы */
  className?: string;
}

export function ServiceDetailLayout({
  serviceContent,
  sidebar,
  serviceName,
  className,
}: ServiceDetailLayoutProps) {
  return (
    <TwoPanelLayout
      leftPanel={serviceContent}
      rightPanel={sidebar}
      defaultLeftSize={65}
      minLeftSize={50}
      maxLeftSize={80}
      leftTitle={serviceName}
      rightTitle="Информация"
      rightDescription="Цены и контакты"
      className={className}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ВЕРТИКАЛЬНОЙ ПАГИНАЦИИ КОНТЕНТА
// ============================================================

interface VerticalPanelsProps {
  /** Массив панелей */
  panels: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    description?: string;
    defaultSize?: number;
    minSize?: number;
  }>;
  /** Дополнительные классы */
  className?: string;
}

export function VerticalPanels({ panels, className }: VerticalPanelsProps) {
  // Считаем общее количество панелей для распределения размера
  const defaultSize = 100 / panels.length;

  return (
    <ResizablePanelGroup
      direction="vertical"
      className={cn("min-h-[400px] rounded-lg border", className)}
    >
      {panels.map((panel, index) => (
        <React.Fragment key={panel.id}>
          <ResizablePanel
            defaultSize={panel.defaultSize || defaultSize}
            minSize={panel.minSize || 10}
            className="p-4"
          >
            <PanelWithSchema
              title={panel.title}
              description={panel.description}
              schemaType="WebPage"
              id={panel.id}
            >
              {panel.content}
            </PanelWithSchema>
          </ResizablePanel>
          {index < panels.length - 1 && (
            <ResizableHandle withHandle className="bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );
}
