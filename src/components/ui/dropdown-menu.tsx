import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ DROPDOWN MENU
// ============================================================

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface DropdownMenuItemWithSchema {
  /** Название пункта */
  label: string;
  /** URL для перехода (если это навигация) */
  href?: string;
  /** Действие при клике */
  action?: () => void;
  /** Иконка */
  icon?: React.ReactNode;
  /** Ярлык (например, ⌘C) */
  shortcut?: string;
  /** Вложенные пункты */
  children?: DropdownMenuItemWithSchema[];
  /** Отключен ли пункт */
  disabled?: boolean;
  /** Тип действия для микроразметки */
  actionType?:
    | "NavigateAction"
    | "ContactAction"
    | "OrderAction"
    | "ConfirmAction";
}

interface DropdownMenuWithSchemaProps {
  /** Элементы меню */
  items: DropdownMenuItemWithSchema[];
  /** Триггер (кнопка, которая открывает меню) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Заголовок для микроразметки */
  title?: string;
  /** Ориентация меню */
  align?: "start" | "center" | "end";
}

/**
 * Компонент DropdownMenu с микроразметкой
 * Используйте для навигации, быстрых действий, фильтров.
 */
export function DropdownMenuWithSchema({
  items,
  trigger,
  className,
  title = "Меню",
  align = "start",
}: DropdownMenuWithSchemaProps) {
  // Формируем микроразметку для меню
  const menuLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    potentialActions: items
      .filter((item) => !item.children)
      .map((item) => ({
        "@type": item.actionType || "NavigateAction",
        name: item.label,
        ...(item.href && { target: item.href }),
      })),
  };

  // Рекурсивная функция для рендеринга пунктов меню
  const renderMenuItems = (menuItems: DropdownMenuItemWithSchema[]) => {
    return menuItems.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-[12rem]">
              {renderMenuItems(item.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={index}
          disabled={item.disabled}
          className="flex items-center gap-2"
          onSelect={() => {
            if (item.action) {
              item.action();
            } else if (item.href) {
              window.location.href = item.href;
            }
          }}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.shortcut && (
            <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      );
    });
  };

  return (
    <>
      {/* Микроразметка меню */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(menuLd)}</script>
      </Helmet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          className={cn("min-w-[12rem]", className)}
        >
          {renderMenuItems(items)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАВИГАЦИИ
// ============================================================

interface NavigationDropdownProps {
  /** Элементы навигации */
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    shortcut?: string;
    children?: Array<{
      label: string;
      href: string;
      icon?: React.ReactNode;
    }>;
  }>;
  /** Триггер (кнопка, которая открывает меню) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для навигационного выпадающего меню
 */
export function NavigationDropdown({
  items,
  trigger,
  className,
}: NavigationDropdownProps) {
  const menuItems: DropdownMenuItemWithSchema[] = items.map((item) => ({
    label: item.label,
    href: item.href,
    icon: item.icon,
    shortcut: item.shortcut,
    actionType: "NavigateAction",
    children: item.children?.map((child) => ({
      label: child.label,
      href: child.href,
      icon: child.icon,
      actionType: "NavigateAction",
    })),
  }));

  return (
    <DropdownMenuWithSchema
      items={menuItems}
      trigger={trigger}
      title="Навигация"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ФИЛЬТРОВ
// ============================================================

interface FilterDropdownProps {
  /** Текущий выбранный фильтр */
  value: string;
  /** Список опций */
  options: Array<{ label: string; value: string }>;
  /** Обработчик изменения */
  onChange: (value: string) => void;
  /** Триггер (кнопка, которая открывает меню) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для выпадающего фильтра
 */
export function FilterDropdown({
  value,
  options,
  onChange,
  trigger,
  className,
}: FilterDropdownProps) {
  const menuItems: DropdownMenuItemWithSchema[] = options.map((option) => ({
    label: option.label,
    action: () => onChange(option.value),
    actionType: "ConfirmAction",
  }));

  return (
    <DropdownMenuWithSchema
      items={menuItems}
      trigger={trigger}
      title="Фильтры"
      className={className}
    />
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ АККАУНТА
// ============================================================

interface AccountDropdownProps {
  /** Имя пользователя */
  userName: string;
  /** Email пользователя */
  email?: string;
  /** Ссылка на профиль */
  profileUrl?: string;
  /** Обработчик выхода */
  onLogout?: () => void;
  /** Триггер (аватар или кнопка) */
  trigger: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для выпадающего меню аккаунта
 */
export function AccountDropdown({
  userName,
  email,
  profileUrl = "/profile",
  onLogout,
  trigger,
  className,
}: AccountDropdownProps) {
  const items: DropdownMenuItemWithSchema[] = [
    {
      label: "Профиль",
      href: profileUrl,
      actionType: "NavigateAction",
    },
    {
      label: "Настройки",
      href: "/settings",
      actionType: "NavigateAction",
    },
    {
      label: email || "",
      disabled: true,
      actionType: "ConfirmAction",
    },
    {
      label: "Выйти",
      action: onLogout,
      actionType: "ConfirmAction",
    },
  ];

  return (
    <DropdownMenuWithSchema
      items={items}
      trigger={trigger}
      title={`Аккаунт: ${userName}`}
      className={className}
    />
  );
}
