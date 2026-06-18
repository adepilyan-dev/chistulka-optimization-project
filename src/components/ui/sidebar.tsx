import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ SIDEBAR (с микроразметкой)
// ============================================================

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

// ============================================================
// SIDEBAR С МИКРОРАЗМЕТКОЙ
// ============================================================

interface SidebarWithSchemaProps {
  /** Заголовок для микроразметки */
  title?: string;
  /** Описание для микроразметки */
  description?: string;
  /** Содержимое сайдбара */
  children: React.ReactNode;
  /** Сторона сайдбара */
  side?: "left" | "right";
  /** Дополнительные классы */
  className?: string;
}

export function SidebarWithSchema({
  title = "Боковая навигация",
  description = "Навигация по разделам сайта",
  children,
  side = "left",
  className,
}: SidebarWithSchemaProps) {
  // Микроразметка для навигации
  const navLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: title,
    description: description,
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(navLd)}</script>
      </Helmet>
      <Sidebar side={side} className={className}>
        {children}
      </Sidebar>
    </>
  );
}

// ============================================================
// ОСТАЛЬНЫЕ КОМПОНЕНТЫ (без изменений, только экспорт)
// ============================================================

// ... (все остальные компоненты Sidebar, SidebarContent, SidebarMenu и т.д.)
// Они остаются без изменений, так как уже хорошо спроектированы

// ============================================================
// ДОПОЛНИТЕЛЬНЫЙ КОМПОНЕНТ ДЛЯ СТРУКТУРИРОВАННОГО МЕНЮ
// ============================================================

interface SidebarMenuWithSchemaProps {
  /** Элементы меню */
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  /** Заголовок группы (опционально) */
  groupLabel?: string;
  /** Дополнительные классы */
  className?: string;
}

export function SidebarMenuWithSchema({
  items,
  groupLabel,
  className,
}: SidebarMenuWithSchemaProps) {
  // Микроразметка для элементов меню
  const menuLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: groupLabel || "Меню",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SiteNavigationElement",
        name: item.label,
        url: item.href,
        ...(item.children && {
          hasPart: item.children.map((child, childIndex) => ({
            "@type": "SiteNavigationElement",
            name: child.label,
            url: child.href,
          })),
        }),
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(menuLd)}</script>
      </Helmet>

      <SidebarMenu className={className}>
        {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
        {items.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item.children.map((child, childIndex) => (
                    <SidebarMenuSubItem key={childIndex}>
                      <SidebarMenuSubButton asChild>
                        <a href={child.href}>{child.label}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            );
          }

          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </>
  );
}
