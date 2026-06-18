import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЕ КОМПОНЕНТЫ BREADCRUMB
// ============================================================

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="Breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Ещё</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ BREADCRUMBLIST
// ============================================================

export interface BreadcrumbItem {
  /** Отображаемое имя */
  name: string;
  /** Ссылка (опционально, для последнего элемента не указывать) */
  href?: string;
  /** Текущая страница (последний элемент) */
  isCurrent?: boolean;
}

interface BreadcrumbWithSchemaProps {
  /** Массив элементов хлебных крошек */
  items: BreadcrumbItem[];
  /** Разделитель (по умолчанию ChevronRight) */
  separator?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** ID для секции (опционально) */
  id?: string;
}

/**
 * Компонент Breadcrumb с микроразметкой BreadcrumbList
 * Используйте на всех страницах для улучшения навигации и SEO.
 */
export function BreadcrumbWithSchema({
  items,
  separator = <ChevronRight className="h-3.5 w-3.5" />,
  className,
  id,
}: BreadcrumbWithSchemaProps) {
  // Формируем микроразметку BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href && { item: item.href }),
    })),
  };

  return (
    <>
      {/* Микроразметка BreadcrumbList */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>

      {/* Визуальные хлебные крошки */}
      <Breadcrumb id={id} className={className}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Хлебные крошки для страницы услуги
 */
export function ServiceBreadcrumb({
  serviceName,
  districtName,
  className,
}: {
  serviceName: string;
  districtName?: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/uslugi" },
    { name: serviceName, href: `/uslugi/${serviceName.toLowerCase()}` },
  ];

  if (districtName) {
    items.push({
      name: districtName,
      isCurrent: true,
    });
  } else {
    items[items.length - 1].isCurrent = true;
  }

  return <BreadcrumbWithSchema items={items} className={className} />;
}

/**
 * Хлебные крошки для страницы блога
 */
export function BlogBreadcrumb({
  category,
  postTitle,
  className,
}: {
  category?: string;
  postTitle?: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Блог", href: "/blog" },
  ];

  if (category) {
    items.push({
      name: category,
      href: `/blog/category/${category.toLowerCase()}`,
    });
  }

  if (postTitle) {
    items.push({ name: postTitle, isCurrent: true });
  } else if (!category) {
    items[items.length - 1].isCurrent = true;
  } else {
    items.push({ name: "Все статьи", isCurrent: true });
  }

  return <BreadcrumbWithSchema items={items} className={className} />;
}

// ============================================================
// ЭКСПОРТ СТАНДАРТНЫХ КОМПОНЕНТОВ
// ============================================================

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
