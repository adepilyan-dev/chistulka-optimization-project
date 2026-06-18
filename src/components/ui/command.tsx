import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ COMMAND
// ============================================================

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
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
CommandShortcut.displayName = "CommandShortcut";

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CommandWithSchemaProps {
  /** Плейсхолдер поиска */
  placeholder?: string;
  /** Элементы для поиска */
  items: Array<{
    label: string;
    value: string;
    description?: string;
    icon?: React.ReactNode;
    action?: () => void;
  }>;
  /** Группы элементов */
  groups?: Array<{
    heading: string;
    items: Array<{
      label: string;
      value: string;
      description?: string;
      icon?: React.ReactNode;
      action?: () => void;
    }>;
  }>;
  /** Заголовок для микроразметки */
  title?: string;
  /** Дополнительные классы */
  className?: string;
  /** Открыт ли диалог */
  open?: boolean;
  /** Обработчик открытия */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Компонент Command с микроразметкой Search
 * Используйте для поиска по сайту, быстрых действий.
 */
export function CommandWithSchema({
  placeholder = "Поиск...",
  items,
  groups,
  title = "Поиск по сайту",
  className,
  open,
  onOpenChange,
}: CommandWithSchemaProps) {
  // Формируем микроразметку для поиска
  const searchLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://arenda-chistoty.ru/search?q={search_term_string}",
        actionPlatform: ["http://schema.org/DesktopWebPlatform"],
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
    },
  };

  // Обработчик выбора элемента
  const handleSelect = (item: { action?: () => void }) => {
    if (item.action) {
      item.action();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <>
      {/* Микроразметка SearchAction */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(searchLd)}</script>
      </Helmet>

      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <Command className={className}>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {groups ? (
              groups.map((group, index) => (
                <CommandGroup key={index} heading={group.heading}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect(item)}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.description && (
                        <span className="ml-auto text-xs opacity-60">
                          {item.description}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandGroup heading="Результаты">
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="ml-auto text-xs opacity-60">
                        {item.description}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandEmpty>Ничего не найдено</CommandEmpty>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ ПОИСКА ПО УСЛУГАМ
// ============================================================

interface ServiceSearchProps {
  /** Массив услуг */
  services: Array<{
    title: string;
    slug: string;
    price?: number;
    icon?: React.ReactNode;
  }>;
  /** Открыт ли диалог */
  open?: boolean;
  /** Обработчик открытия */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Компонент поиска по услугам
 * Автоматически добавляет микроразметку Service
 */
export function ServiceSearch({
  services,
  open,
  onOpenChange,
}: ServiceSearchProps) {
  const items = services.map((service) => ({
    label: service.title,
    value: service.slug,
    description: service.price
      ? `${service.price.toLocaleString("ru")} ₽`
      : undefined,
    icon: service.icon,
    action: () => {
      window.location.href = `/uslugi/${service.slug}`;
    },
  }));

  return (
    <CommandWithSchema
      items={items}
      title="Поиск услуг"
      placeholder="Найти услугу..."
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}

// ============================================================
// КОМПОНЕНТ КНОПКИ ПОИСКА
// ============================================================

interface SearchTriggerProps {
  /** Обработчик открытия */
  onOpen: () => void;
  /** Дополнительные классы */
  className?: string;
  children?: React.ReactNode;
}

export function SearchTrigger({
  onOpen,
  className,
  children,
}: SearchTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:bg-gray-50",
        className,
      )}
      style={{ border: "1px solid var(--border)", color: "var(--gray)" }}
      aria-label="Открыть поиск"
    >
      <Search className="h-4 w-4" />
      {children || <span>Поиск...</span>}
      <kbd
        className="ml-auto text-xs px-2 py-0.5 rounded bg-gray-100"
        style={{ color: "var(--gray)" }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
