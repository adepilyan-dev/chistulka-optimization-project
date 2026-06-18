import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ CONTEXT MENU
// ============================================================

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
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
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
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
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface ContextMenuItemWithSchema {
  /** Название пункта */
  label: string;
  /** Описание пункта */
  description?: string;
  /** URL для перехода (если это навигация) */
  href?: string;
  /** Действие при клике */
  action?: () => void;
  /** Иконка */
  icon?: React.ReactNode;
  /** Ярлык (например, ⌘C) */
  shortcut?: string;
  /** Вложенные пункты */
  children?: ContextMenuItemWithSchema[];
  /** Отключен ли пункт */
  disabled?: boolean;
  /** Тип действия для микроразметки */
  actionType?:
    | "NavigateAction"
    | "ContactAction"
    | "OrderAction"
    | "ConfirmAction";
}

interface ContextMenuWithSchemaProps {
  /** Элементы меню */
  items: ContextMenuItemWithSchema[];
  /** Дочерний элемент (контент, на котором вызывается меню) */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Заголовок для микроразметки */
  title?: string;
}

/**
 * Компонент ContextMenu с микроразметкой
 * Используйте для навигации, быстрых действий.
 */
export function ContextMenuWithSchema({
  items,
  children,
  className,
  title = "Контекстное меню",
}: ContextMenuWithSchemaProps) {
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
        ...(item.description && { description: item.description }),
        ...(item.href && { target: item.href }),
      })),
  };

  // Рекурсивная функция для рендеринга пунктов меню
  const renderMenuItems = (menuItems: ContextMenuItemWithSchema[]) => {
    return menuItems.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return (
          <ContextMenuSub key={index}>
            <ContextMenuSubTrigger className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="min-w-[12rem]">
              {renderMenuItems(item.children)}
            </ContextMenuSubContent>
          </ContextMenuSub>
        );
      }

      return (
        <ContextMenuItem
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
            <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
          )}
        </ContextMenuItem>
      );
    });
  };

  return (
    <>
      {/* Микроразметка меню */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(menuLd)}</script>
      </Helmet>

      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className={cn("cursor-context-menu", className)}>{children}</div>
        </ContextMenuTrigger>
        <ContextMenuContent className="min-w-[12rem]">
          {renderMenuItems(items)}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ НАВИГАЦИИ
// ============================================================

interface NavigationMenuProps {
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
  /** Дочерний элемент */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для навигационного контекстного меню
 */
export function NavigationContextMenu({
  items,
  children,
  className,
}: NavigationMenuProps) {
  const menuItems: ContextMenuItemWithSchema[] = items.map((item) => ({
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
    <ContextMenuWithSchema
      items={menuItems}
      title="Навигация"
      className={className}
    >
      {children}
    </ContextMenuWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ РАБОТЫ С ТЕКСТОМ
// ============================================================

interface TextActionMenuProps {
  /** Дочерний элемент (текст, на котором вызывается меню) */
  children: React.ReactNode;
  /** Обработчики действий */
  onCopy?: () => void;
  onCut?: () => void;
  onPaste?: () => void;
  onSelectAll?: () => void;
  /** Дополнительные классы */
  className?: string;
}

/**
 * Компонент для контекстного меню над текстом (копировать, вставить и т.д.)
 */
export function TextActionMenu({
  children,
  onCopy,
  onCut,
  onPaste,
  onSelectAll,
  className,
}: TextActionMenuProps) {
  const items: ContextMenuItemWithSchema[] = [
    {
      label: "Копировать",
      shortcut: "⌘C",
      action: onCopy,
      actionType: "ConfirmAction",
    },
    {
      label: "Вырезать",
      shortcut: "⌘X",
      action: onCut,
      actionType: "ConfirmAction",
    },
    {
      label: "Вставить",
      shortcut: "⌘V",
      action: onPaste,
      actionType: "ConfirmAction",
    },
    {
      label: "Выделить всё",
      shortcut: "⌘A",
      action: onSelectAll,
      actionType: "ConfirmAction",
    },
  ];

  return (
    <ContextMenuWithSchema
      items={items}
      title="Действия с текстом"
      className={className}
    >
      {children}
    </ContextMenuWithSchema>
  );
}

// ============================================================
// ЭКСПОРТ
// ============================================================

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
