import * as React from "react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ TABLE
// ============================================================

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface TableWithSchemaProps {
  /** Заголовок таблицы (для микроразметки) */
  title?: string;
  /** Описание таблицы (для микроразметки) */
  description?: string;
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент Table с микроразметкой
 * Используйте для прайс-листов, сравнения услуг.
 */
export function TableWithSchema({
  title,
  description,
  children,
  className,
}: TableWithSchemaProps) {
  // Формируем микроразметку
  const tableLd = {
    "@context": "https://schema.org",
    "@type": "Table",
    ...(title && { name: title }),
    ...(description && { description: description }),
  };

  return (
    <>
      {/* Микроразметка таблицы */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(tableLd)}</script>
      </Helmet>

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
      <Table className={className}>{children}</Table>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПРАЙС-ЛИСТА
// ============================================================

interface PriceRow {
  /** Название услуги */
  service: string;
  /** Цена */
  price: number;
  /** Описание */
  description?: string;
  /** Единица измерения */
  unit?: string;
}

interface PriceListProps {
  /** Заголовок */
  title?: string;
  /** Описание */
  description?: string;
  /** Список услуг */
  items: PriceRow[];
  /** Валюта */
  currency?: string;
  /** Дополнительные классы */
  className?: string;
}

export function PriceList({
  title = "Прайс-лист",
  description = "Актуальные цены на наши услуги",
  items,
  currency = "₽",
  className,
}: PriceListProps) {
  return (
    <TableWithSchema
      title={title}
      description={description}
      className={className}
    >
      <TableCaption>Цены указаны в {currency}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Услуга</TableHead>
          <TableHead className="text-right">Цена</TableHead>
          <TableHead>Описание</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.service}</TableCell>
            <TableCell
              className="text-right font-oswald font-bold"
              style={{ color: "var(--teal)" }}
            >
              {item.price.toLocaleString("ru")} {currency}
            </TableCell>
            <TableCell className="text-sm" style={{ color: "var(--gray)" }}>
              {item.description || (item.unit ? `за ${item.unit}` : "")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ СРАВНЕНИЯ УСЛУГ
// ============================================================

interface ComparisonRow {
  /** Название параметра */
  parameter: string;
  /** Значения для каждой услуги */
  values: Record<string, string | number | boolean>;
}

interface ComparisonTableProps {
  /** Заголовок */
  title?: string;
  /** Описание */
  description?: string;
  /** Названия услуг (колонки) */
  services: string[];
  /** Данные для сравнения */
  rows: ComparisonRow[];
  /** Дополнительные классы */
  className?: string;
}

export function ComparisonTable({
  title = "Сравнение услуг",
  description = "Сравните наши услуги по ключевым параметрам",
  services,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <TableWithSchema
      title={title}
      description={description}
      className={className}
    >
      <TableHeader>
        <TableRow>
          <TableHead>Параметр</TableHead>
          {services.map((service, index) => (
            <TableHead key={index} className="text-center">
              {service}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{row.parameter}</TableCell>
            {services.map((service, colIndex) => {
              const value = row.values[service];
              return (
                <TableCell key={colIndex} className="text-center">
                  {typeof value === "boolean"
                    ? value
                      ? "✅"
                      : "❌"
                    : value || "—"}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </TableWithSchema>
  );
}
