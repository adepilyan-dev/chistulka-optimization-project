import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ NAVIGATION MENU
// ============================================================

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface NavItem {
  /** Название пункта */
  label: string;
  /** URL для перехода */
  href: string;
  /** Вложенные пункты */
  children?: NavItem[];
  /** Описание (для микроразметки) */
  description?: string;
}

interface NavigationMenuWithSchemaProps {
  /** Элементы меню */
  items: NavItem[];
  /** Дополнительные классы */
  className?: string;
  /** Заголовок для микроразметки */
  title?: string;
}

/**
 * Компонент NavigationMenu с микроразметкой SiteNavigationElement
 * Используйте для основной навигации сайта.
 */
export function NavigationMenuWithSchema({
  items,
  className,
  title = "Основная навигация",
}: NavigationMenuWithSchemaProps) {
  // Формируем микроразметку для навигации
  const navLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: title,
    description: "Основная навигация по сайту",
    hasPart: items.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.label,
      url: item.href,
      ...(item.children && {
        hasPart: item.children.map((child) => ({
          "@type": "SiteNavigationElement",
          name: child.label,
          url: child.href,
          ...(child.description && { description: child.description }),
        })),
      }),
      ...(item.description && { description: item.description }),
    })),
  };

  return (
    <>
      {/* Микроразметка навигации */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(navLd)}</script>
      </Helmet>

      <NavigationMenu className={className}>
        <NavigationMenuList>
          {items.map((item, index) => {
            if (item.children && item.children.length > 0) {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <NavigationMenuLink asChild>
                            <a
                              href={child.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {child.label}
                              </div>
                              {child.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <a
                    href={item.href}
                    className={cn(navigationMenuTriggerStyle(), "no-underline")}
                  >
                    {item.label}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАВИГАЦИИ САЙТА
// ============================================================

interface MainNavigationProps {
  /** Дополнительные классы */
  className?: string;
}

export function MainNavigation({ className }: MainNavigationProps) {
  const navItems: NavItem[] = [
    {
      label: "Услуги",
      href: "/uslugi",
      children: [
        {
          label: "Химчистка диванов",
          href: "/uslugi/himchistka-divanov",
          description:
            "Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа.",
        },
        {
          label: "Химчистка кресел",
          href: "/uslugi/himchistka-kresel",
          description:
            "Офисные, обеденные, игровые кресла. Глубокая чистка без разборки.",
        },
        {
          label: "Химчистка матрасов",
          href: "/uslugi/himchistka-matrasov",
          description: "Устраняем клещей, грибок, пятна и неприятные запахи.",
        },
        {
          label: "Химчистка ковров",
          href: "/uslugi/himchistka-kovrov",
          description: "Шерсть, синтетика, ковры ручной работы.",
        },
        {
          label: "Химчистка стульев",
          href: "/uslugi/himchistka-stulev",
          description:
            "Обеденные группы, барные стулья, пуфики. Быстро — один стул от 15 минут.",
        },
        {
          label: "Химчистка автосалона",
          href: "/uslugi/himchistka-avtosalona",
          description:
            "Сиденья, потолок, дверные панели. Профессиональное оборудование.",
        },
      ],
    },
    {
      label: "Цены",
      href: "/prices",
    },
    {
      label: "Наши работы",
      href: "/nashi-raboty",
    },
    {
      label: "Отзывы",
      href: "/reviews",
    },
    {
      label: "Блог",
      href: "/blog",
    },
    {
      label: "Контакты",
      href: "/contacts",
    },
  ];

  return <NavigationMenuWithSchema items={navItems} className={className} />;
}

// ============================================================
// КОМПОНЕНТ ДЛЯ МОБИЛЬНОЙ НАВИГАЦИИ (Burger Menu)
// ============================================================

interface MobileNavProps {
  /** Элементы меню */
  items: NavItem[];
  /** Открыто ли меню */
  open?: boolean;
  /** Обработчик изменения состояния */
  onOpenChange?: (open: boolean) => void;
  /** Дополнительные классы */
  className?: string;
}

export function MobileNavigation({
  items,
  open,
  onOpenChange,
  className,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(open || false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <>
      {/* Кнопка бургера */}
      <button
        onClick={handleToggle}
        className="flex flex-col gap-1.5 p-2 lg:hidden"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "block h-0.5 w-6 bg-current transition-transform duration-300",
            isOpen && "translate-y-2 rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-current transition-opacity duration-300",
            isOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-current transition-transform duration-300",
            isOpen && "-translate-y-2 -rotate-45",
          )}
        />
      </button>

      {/* Мобильное меню */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white p-4 shadow-lg transition-all duration-300 lg:hidden",
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none",
        )}
        role="navigation"
        aria-label="Мобильная навигация"
      >
        <ul className="space-y-2">
          {items.map((item, index) => {
            if (item.children && item.children.length > 0) {
              return (
                <li key={index}>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium hover:text-[var(--teal)]">
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul
                      className="mt-2 space-y-1 border-l-2 pl-4"
                      style={{ borderColor: "var(--teal)" }}
                    >
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <a
                            href={child.href}
                            className="block py-2 text-sm hover:text-[var(--teal)]"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                            {child.description && (
                              <span className="block text-xs text-gray-400">
                                {child.description}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }

            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 text-sm font-medium hover:text-[var(--teal)]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Оверлей */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
