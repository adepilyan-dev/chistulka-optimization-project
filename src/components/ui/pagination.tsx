import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ PAGINATION
// ============================================================

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="Навигация по страницам"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Предыдущая страница"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Назад</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Следующая страница"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Вперед</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Ещё страницы</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface PaginationWithSchemaProps {
  /** Текущая страница */
  currentPage: number;
  /** Общее количество страниц */
  totalPages: number;
  /** Базовый URL (с плейсхолдером для номера страницы) */
  baseUrl: string;
  /** Количество отображаемых страниц рядом с текущей */
  siblingsCount?: number;
  /** Дополнительные классы */
  className?: string;
  /** Функция для генерации URL страницы (если нужна кастомная логика) */
  getPageUrl?: (page: number) => string;
}

/**
 * Компонент Pagination с микроразметкой
 * Используйте для навигации по спискам (блог, услуги, отзывы).
 */
export function PaginationWithSchema({
  currentPage,
  totalPages,
  baseUrl,
  siblingsCount = 1,
  className,
  getPageUrl,
}: PaginationWithSchemaProps) {
  // Генерация URL страницы
  const getUrl = (page: number): string => {
    if (getPageUrl) return getPageUrl(page);
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  // Формируем массив страниц для отображения
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const leftSibling = Math.max(1, currentPage - siblingsCount);
    const rightSibling = Math.min(totalPages, currentPage + siblingsCount);

    // Всегда показываем первую страницу
    if (leftSibling > 1) {
      pages.push(1);
      if (leftSibling > 2) pages.push("ellipsis");
    }

    // Показываем страницы вокруг текущей
    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    // Всегда показываем последнюю страницу
    if (rightSibling < totalPages) {
      if (rightSibling < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  // Формируем микроразметку для пагинации
  const paginationLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Страницы",
    url: getUrl(currentPage),
    numberOfItems: totalPages,
    itemListElement: Array.from({ length: totalPages }, (_, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "WebPage",
        url: getUrl(i + 1),
        name: `Страница ${i + 1}`,
      },
    })),
  };

  // Если страница одна, не показываем пагинацию
  if (totalPages <= 1) {
    return null;
  }

  return (
    <>
      {/* Микроразметка пагинации */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(paginationLd)}
        </script>
      </Helmet>

      <Pagination className={className}>
        <PaginationContent>
          {/* Кнопка "Назад" */}
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? getUrl(currentPage - 1) : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Номера страниц */}
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={getUrl(page)}
                  isActive={page === currentPage}
                  className={cn(
                    page === currentPage &&
                      "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)]",
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Кнопка "Вперед" */}
          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages ? getUrl(currentPage + 1) : undefined
              }
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ БЛОГА
// ============================================================

interface BlogPaginationProps {
  /** Текущая страница */
  currentPage: number;
  /** Общее количество страниц */
  totalPages: number;
  /** Категория блога (опционально) */
  category?: string;
  /** Дополнительные классы */
  className?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  category,
  className,
}: BlogPaginationProps) {
  const baseUrl = category ? `/blog/category/${category}` : "/blog";

  return (
    <PaginationWithSchema
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl={baseUrl}
      siblingsCount={2}
      className={className}
      getPageUrl={(page) => {
        if (page === 1) return baseUrl;
        return `${baseUrl}?page=${page}`;
      }}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ УСЛУГ
// ============================================================

interface ServicePaginationProps {
  /** Текущая страница */
  currentPage: number;
  /** Общее количество страниц */
  totalPages: number;
  /** Тип услуги (опционально) */
  serviceType?: string;
  /** Дополнительные классы */
  className?: string;
}

export function ServicePagination({
  currentPage,
  totalPages,
  serviceType,
  className,
}: ServicePaginationProps) {
  const baseUrl = serviceType ? `/uslugi/${serviceType}` : "/uslugi";

  return (
    <PaginationWithSchema
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl={baseUrl}
      siblingsCount={1}
      className={className}
    />
  );
}

// ============================================================
// КОМПОНЕНТ ДЛЯ ПАГИНАЦИИ С ВЫБОРОМ СТРАНИЦЫ
// ============================================================

interface PaginationWithJumpProps extends PaginationWithSchemaProps {
  /** Обработчик изменения страницы (для клиентской пагинации) */
  onPageChange?: (page: number) => void;
}

export function PaginationWithJump({
  currentPage,
  totalPages,
  baseUrl,
  siblingsCount = 1,
  className,
  getPageUrl,
  onPageChange,
}: PaginationWithJumpProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const page = Number(inputValue);
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) {
        onPageChange(page);
      } else {
        window.location.href = getPageUrl
          ? getPageUrl(page)
          : `${baseUrl}?page=${page}`;
      }
      setInputValue("");
    }
  };

  return (
    <div className="space-y-4">
      <PaginationWithSchema
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        siblingsCount={siblingsCount}
        className={className}
        getPageUrl={getPageUrl}
      />

      <div
        className="flex items-center justify-center gap-2 text-sm"
        style={{ color: "var(--gray)" }}
      >
        <span>Перейти к странице</span>
        <form onSubmit={handleJump} className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-16 rounded-md border px-2 py-1 text-center text-sm"
            style={{ borderColor: "var(--border)" }}
            placeholder="№"
          />
          <button
            type="submit"
            className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ border: "1px solid var(--border)", color: "var(--dark)" }}
          >
            Перейти
          </button>
        </form>
      </div>
    </div>
  );
}
