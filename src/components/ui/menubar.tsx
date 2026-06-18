import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ MENUBAR
// ============================================================

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface MenubarItemWithSchema {
  /** Название пункта */
  label: string;
  /** URL для перехода */
  href?: string;
  /** Действие при клике */
  action?: () => void;
  /** Вложенные пункты */
  children?: MenubarItemWithSchema[];
  /** Отключен ли пункт */
  disabled?: boolean;
  /** Ярлык (например, ⌘C) */
  shortcut?: string;
}

interface MenubarWithSchemaProps {
  /** Элементы меню */
  items: MenubarItemWithSchema[];
  /** Дополнительные классы */
  className?: string;
  /** Заголовок для микроразметки */
  title?: string;
}

/**
 * Компонент Menubar с микроразметкой SiteNavigationElement
 * Используйте для основной навигации сайта.
 */
export function MenubarWithSchema({
  items,
  className,
  title = "Основная навигация",
}: MenubarWithSchemaProps) {
  // Формируем микроразметку для навигации
  const navLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: title,
    description: "Основная навигация по сайту",
    hasPart: items.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.label,
      ...(item.href && { url: item.href }),
      ...(item.children && {
        hasPart: item.children.map((child) => ({
          "@type": "SiteNavigationElement",
          name: child.label,
          ...(child.href && { url: child.href }),
        })),
      }),
    })),
  };

  // Рекурсивная функция для рендеринга пунктов меню
  const renderMenuItems = (menuItems: MenubarItemWithSchema[]) => {
    return menuItems.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return (
          <MenubarMenu key={index}>
            <MenubarTrigger className="flex items-center gap-1">
              {item.label}
              <ChevronRight className="h-3 w-3 rotate-90" />
            </MenubarTrigger>
            <MenubarContent>
              {item.children.map((child, childIndex) => (
                <MenubarItem
                  key={childIndex}
                  disabled={child.disabled}
                  onSelect={() => {
                    if (child.action) {
                      child.action();
                    } else if (child.href) {
                      window.location.href = child.href;
                    }
                  }}
                >
                  {child.label}
                  {child.shortcut && (
                    <MenubarShortcut>{child.shortcut}</MenubarShortcut>
                  )}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        );
      }

      return (
        <MenubarMenu key={index}>
          <MenubarTrigger
            onSelect={() => {
              if (item.action) {
                item.action();
              } else if (item.href) {
                window.location.href = item.href;
              }
            }}
          >
            {item.label}
          </MenubarTrigger>
        </MenubarMenu>
      );
    });
  };

  return (
    <>
      {/* Микроразметка навигации */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(navLd)}</script>
      </Helmet>

      <nav aria-label={title}>
        <Menubar className={cn("flex-wrap gap-1", className)}>
          {renderMenuItems(items)}
        </Menubar>
      </nav>
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
  const navItems: MenubarItemWithSchema[] = [
    {
      label: "Услуги",
      href: "/uslugi",
      children: [
        { label: "Химчистка диванов", href: "/uslugi/himchistka-divanov" },
        { label: "Химчистка кресел", href: "/uslugi/himchistka-kresel" },
        { label: "Химчистка матрасов", href: "/uslugi/himchistka-matrasov" },
        { label: "Химчистка ковров", href: "/uslugi/himchistka-kovrov" },
        {
          label: "Химчистка автосалона",
          href: "/uslugi/himchistka-avtosalona",
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

  return <MenubarWithSchema items={navItems} className={className} />;
}
