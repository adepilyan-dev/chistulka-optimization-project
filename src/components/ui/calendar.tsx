import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ CALENDAR
// ============================================================

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CalendarWithSchemaProps extends CalendarProps {
  /** Название услуги/события */
  eventName?: string;
  /** Описание события */
  eventDescription?: string;
  /** Тип события */
  eventType?: "Service" | "Event" | "Appointment";
  /** Начало работы (время) */
  startTime?: string;
  /** Окончание работы (время) */
  endTime?: string;
  /** Доступность (по умолчанию true) */
  isAvailable?: boolean;
}

/**
 * Компонент Calendar с микроразметкой для событий
 * Используйте для записи на услуги или отображения доступных дат.
 */
export function CalendarWithSchema({
  eventName,
  eventDescription,
  eventType = "Appointment",
  startTime = "09:00",
  endTime = "20:00",
  isAvailable = true,
  className,
  ...props
}: CalendarWithSchemaProps) {
  // Формируем микроразметку для события/услуги
  const eventLd = {
    "@context": "https://schema.org",
    "@type": eventType,
    ...(eventName && { name: eventName }),
    ...(eventDescription && { description: eventDescription }),
    ...(isAvailable && { available: true }),
    ...(eventName && {
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        ...(isAvailable && { available: true }),
      },
    }),
  };

  // Микроразметка для графика работы
  const openingHoursLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Аренда Чистоты",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: startTime,
        closes: endTime,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: startTime,
        closes: endTime,
      },
    ],
  };

  return (
    <>
      {/* Микроразметка события */}
      {eventName && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(eventLd)}</script>
        </Helmet>
      )}

      {/* Микроразметка графика работы */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(openingHoursLd)}
        </script>
      </Helmet>

      {/* Календарь */}
      <div className={cn("rounded-2xl border p-4 bg-white", className)}>
        <Calendar {...props} />

        {/* Индикатор доступности */}
        {isAvailable && (
          <div
            className="mt-4 text-center text-xs"
            style={{ color: "var(--gray)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Свободные слоты доступны
            </span>
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ЗАПИСИ
// ============================================================

interface BookingCalendarProps {
  /** Название услуги */
  serviceName: string;
  /** Доступные даты (массив строк) */
  availableDates?: Date[];
  /** Функция при выборе даты */
  onDateSelect?: (date: Date) => void;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент календаря для записи на услугу
 * Автоматически добавляет микроразметку для бронирования
 */
export function BookingCalendar({
  serviceName,
  availableDates,
  onDateSelect,
  className,
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      onDateSelect?.(date);
    }
  };

  // Формируем микроразметку для бронирования
  const bookingLd = {
    "@context": "https://schema.org",
    "@type": "BookAction",
    name: `Запись на ${serviceName}`,
    description: `Выбор даты для записи на ${serviceName}`,
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://arenda-chistoty.ru/#contacts",
      actionPlatform: ["http://schema.org/DesktopWebPlatform"],
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(bookingLd)}</script>
      </Helmet>

      <div className={cn("space-y-4", className)}>
        <div className="text-center">
          <h3
            className="font-oswald font-bold text-lg"
            style={{ color: "var(--dark)" }}
          >
            Выберите дату
          </h3>
          <p className="text-sm" style={{ color: "var(--gray)" }}>
            для {serviceName}
          </p>
        </div>

        <CalendarWithSchema
          eventName={serviceName}
          eventType="Appointment"
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={
            availableDates
              ? (date) =>
                  !availableDates.some(
                    (d) => d.toDateString() === date.toDateString(),
                  )
              : undefined
          }
          className={className}
        />

        {selectedDate && (
          <div
            className="rounded-xl p-4 text-center"
            style={{ background: "var(--teal-light)" }}
          >
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--teal)" }}
            >
              ✅ Вы выбрали{" "}
              {selectedDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
