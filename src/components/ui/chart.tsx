import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ CHART
// ============================================================

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С ТЕКСТОВЫМ ПРЕДСТАВЛЕНИЕМ
// ============================================================

interface ChartWithDataProps {
  /** Заголовок графика */
  title?: string;
  /** Описание графика */
  description?: string;
  /** Данные для графика (в виде массива объектов) */
  data: Array<Record<string, string | number>>;
  /** Конфигурация графика */
  config: ChartConfig;
  /** Дочерние элементы (сам график) */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Chart с текстовым представлением данных для SEO
 * Добавляет скрытую таблицу с данными для поисковых роботов.
 */
export function ChartWithData({
  title,
  description,
  data,
  config,
  children,
  className,
}: ChartWithDataProps) {
  // Определяем ключи данных (первая строка)
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  // Формируем микроразметку для таблицы данных
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    ...(title && { name: title }),
    ...(description && { description: description }),
    variableMeasured: headers,
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "application/json",
    },
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Микроразметка данных */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(datasetLd)}</script>
      </Helmet>

      {/* Визуальный график */}
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

      <ChartContainer config={config}>{children}</ChartContainer>

      {/* Текстовое представление для поисковых роботов (скрыто) */}
      <div className="sr-only" aria-hidden="true">
        <h4>Таблица данных</h4>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={`${index}-${header}`}>
                    {row[header] !== undefined ? String(row[header]) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ДИНАМИКИ ЦЕН
// ============================================================

interface PriceChartProps {
  /** Данные по месяцам */
  data: Array<{ month: string; price: number }>;
  /** Название услуги */
  serviceName?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * График динамики цен с текстовым представлением
 */
export function PriceChart({
  data,
  serviceName = "Химчистка диванов",
  className,
}: PriceChartProps) {
  const config = {
    price: {
      label: "Цена, ₽",
      color: "var(--teal)",
    },
  };

  return (
    <ChartWithData
      title={`Динамика цен на ${serviceName}`}
      description={`Изменение стоимости химчистки по месяцам`}
      data={data}
      config={config}
      className={className}
    >
      <RechartsPrimitive.LineChart data={data}>
        <RechartsPrimitive.XAxis dataKey="month" />
        <RechartsPrimitive.YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
        />
      </RechartsPrimitive.LineChart>
    </ChartWithData>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ РЕЙТИНГОВ
// ============================================================

interface RatingChartProps {
  /** Данные рейтингов */
  data: Array<{ category: string; rating: number }>;
  /** Дополнительные классы */
  className?: string;
}

/**
 * График рейтингов с текстовым представлением
 */
export function RatingChart({ data, className }: RatingChartProps) {
  const config = {
    rating: {
      label: "Рейтинг",
      color: "#FFD700",
    },
  };

  return (
    <ChartWithData
      title="Оценки по категориям"
      description="Средний рейтинг по разным параметрам"
      data={data}
      config={config}
      className={className}
    >
      <RechartsPrimitive.BarChart data={data} layout="vertical">
        <RechartsPrimitive.XAxis type="number" domain={[0, 5]} />
        <RechartsPrimitive.YAxis dataKey="category" type="category" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <RechartsPrimitive.Bar
          dataKey="rating"
          fill="var(--color-rating)"
          radius={[0, 4, 4, 0]}
        />
      </RechartsPrimitive.BarChart>
    </ChartWithData>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СТАТИСТИКИ
// ============================================================

interface StatsChartProps {
  /** Данные статистики */
  data: Array<{ label: string; value: number }>;
  /** Дополнительные классы */
  className?: string;
}

/**
 * График статистики с текстовым представлением
 */
export function StatsChart({ data, className }: StatsChartProps) {
  const config: ChartConfig = {};
  data.forEach((item) => {
    config[item.label] = {
      label: item.label,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
  });

  return (
    <ChartWithData
      title="Статистика услуг"
      description="Распределение заказов по типам"
      data={data.map((item) => ({ name: item.label, value: item.value }))}
      config={config}
      className={className}
    >
      <RechartsPrimitive.PieChart>
        <RechartsPrimitive.Pie
          data={data.map((item) => ({ name: item.label, value: item.value }))}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RechartsPrimitive.PieChart>
    </ChartWithData>
  );
}

// ============================================================
// ЭКСПОРТ
// ============================================================

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
