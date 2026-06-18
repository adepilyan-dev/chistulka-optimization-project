import React from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// ============================
// Анимации
// ============================

const fadeInUp = "animate-fade-up";
const staggerDelay = (i: number) => `stagger-${Math.min(i + 1, 6)}`;

// ============================
// 1. Список преимуществ
// ============================

interface Benefit {
  icon: string;
  text: string;
  color?: string;
  description?: string;
  badge?: string;
}

interface BenefitsListProps {
  items: Benefit[];
  variant?: "compact" | "default" | "large";
  theme?: "light" | "dark" | "teal";
  animated?: boolean;
  className?: string;
}

const benefitSizeMap = {
  compact: {
    iconSize: 14,
    boxSize: "w-7 h-7",
    textSize: "text-xs",
    gap: "gap-2",
  },
  default: {
    iconSize: 18,
    boxSize: "w-9 h-9",
    textSize: "text-sm",
    gap: "gap-3",
  },
  large: {
    iconSize: 22,
    boxSize: "w-11 h-11",
    textSize: "text-base",
    gap: "gap-4",
  },
};

const benefitThemeMap = {
  light: {
    bg: "bg-teal-light",
    icon: "text-teal",
    text: "text-gray-700",
    description: "text-gray-500",
    badge: "bg-teal-100 text-teal-700",
    hover: "group-hover:bg-teal/10",
  },
  dark: {
    bg: "bg-teal-500/20",
    icon: "text-teal-300",
    text: "text-white",
    description: "text-gray-400",
    badge: "bg-teal-500/30 text-teal-300",
    hover: "group-hover:bg-teal-500/30",
  },
  teal: {
    bg: "bg-white/20",
    icon: "text-white",
    text: "text-white",
    description: "text-teal-100",
    badge: "bg-white/20 text-white",
    hover: "group-hover:bg-white/30",
  },
};

export function BenefitsList({
  items,
  variant = "default",
  theme = "light",
  animated = false,
  className,
}: BenefitsListProps) {
  const sizes = benefitSizeMap[variant];
  const styles = benefitThemeMap[theme];

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <div
          key={item.text}
          className={cn(
            "flex items-center group transition-all duration-300",
            sizes.gap,
            animated && fadeInUp,
            animated && staggerDelay(i),
          )}
        >
          <div
            className={cn(
              "rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
              styles.bg,
              styles.hover,
              sizes.boxSize,
            )}
          >
            <Icon
              name={item.icon}
              size={sizes.iconSize}
              className={cn(
                "transition-colors duration-300",
                styles.icon,
                item.color,
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("font-medium", sizes.textSize, styles.text)}>
                {item.text}
              </span>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-medium",
                    styles.badge,
                  )}
                >
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <p className={cn("text-xs leading-relaxed", styles.description)}>
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================
// 2. Контакты
// ============================

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  link?: string | null;
  target?: "_blank" | "_self";
  description?: string;
  badge?: string;
  onClick?: () => void;
}

interface ContactsListProps {
  items: ContactItem[];
  variant?: "compact" | "default" | "large";
  theme?: "light" | "dark" | "teal";
  animated?: boolean;
  className?: string;
  showArrow?: boolean;
}

const contactSizeMap = {
  compact: {
    iconSize: 16,
    boxSize: "w-9 h-9",
    padding: "p-3",
    textSize: "text-xs",
  },
  default: {
    iconSize: 20,
    boxSize: "w-11 h-11",
    padding: "p-4",
    textSize: "text-sm",
  },
  large: {
    iconSize: 24,
    boxSize: "w-13 h-13",
    padding: "p-5",
    textSize: "text-base",
  },
};

const contactThemeMap = {
  light: {
    bg: "bg-teal-light",
    icon: "text-teal",
    label: "text-gray-500",
    value: "text-gray-800",
    description: "text-gray-400",
    border: "border-gray-200",
    hover: "hover:border-teal-200 hover:shadow-md",
    badge: "bg-teal-100 text-teal-700",
  },
  dark: {
    bg: "bg-teal-500/20",
    icon: "text-teal-300",
    label: "text-gray-400",
    value: "text-white",
    description: "text-gray-500",
    border: "border-gray-700",
    hover: "hover:border-teal-500/50 hover:shadow-lg",
    badge: "bg-teal-500/30 text-teal-300",
  },
  teal: {
    bg: "bg-white/20",
    icon: "text-white",
    label: "text-teal-100",
    value: "text-white",
    description: "text-teal-200/70",
    border: "border-white/20",
    hover: "hover:border-white/50 hover:shadow-lg",
    badge: "bg-white/20 text-white",
  },
};

export function ContactsList({
  items,
  variant = "default",
  theme = "light",
  animated = false,
  showArrow = true,
  className,
}: ContactsListProps) {
  const sizes = contactSizeMap[variant];
  const styles = contactThemeMap[theme];

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const Tag = item.link ? "a" : "div";
        const isExternal =
          item.target === "_blank" || item.link?.startsWith("http");

        return (
          <Tag
            key={item.label}
            {...(item.link
              ? {
                  href: item.link,
                  target: isExternal ? "_blank" : "_self",
                  rel: isExternal ? "noopener noreferrer" : undefined,
                }
              : {})}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-4 rounded-2xl border transition-all duration-300 bg-white/5",
              item.link && "cursor-pointer",
              styles.border,
              styles.hover,
              sizes.padding,
              animated && fadeInUp,
              animated && staggerDelay(i),
            )}
          >
            <div
              className={cn(
                "rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                styles.bg,
                sizes.boxSize,
              )}
            >
              <Icon
                name={item.icon}
                size={sizes.iconSize}
                className={styles.icon}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn("text-xs", styles.label)}>{item.label}</div>
              <div
                className={cn(
                  "font-semibold truncate",
                  sizes.textSize,
                  styles.value,
                )}
              >
                {item.value}
              </div>
              {item.description && (
                <div className={cn("text-xs", styles.description)}>
                  {item.description}
                </div>
              )}
            </div>
            {item.badge && (
              <span
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                  styles.badge,
                )}
              >
                {item.badge}
              </span>
            )}
            {showArrow && item.link && (
              <Icon
                name="ChevronRight"
                size={16}
                className={cn(
                  "flex-shrink-0 transition-transform group-hover:translate-x-1",
                  styles.icon,
                )}
              />
            )}
          </Tag>
        );
      })}
    </div>
  );
}

// ============================
// 3. Кнопка соцсети
// ============================

interface SocialButtonProps {
  href: string;
  icon: string;
  label?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const socialSizeMap = {
  sm: { buttonSize: "w-10 h-10", iconSize: 18 },
  md: { buttonSize: "w-14 h-14", iconSize: 24 },
  lg: { buttonSize: "w-16 h-16", iconSize: 28 },
};

const socialColors: Record<string, string> = {
  whatsapp: "bg-green-500 hover:bg-green-600",
  telegram: "bg-blue-500 hover:bg-blue-600",
  vk: "bg-blue-600 hover:bg-blue-700",
  phone: "bg-yellow-400 hover:bg-yellow-500 text-gray-800",
  email: "bg-gray-600 hover:bg-gray-700",
  instagram: "bg-pink-600 hover:bg-pink-700",
  youtube: "bg-red-600 hover:bg-red-700",
  messagecircle: "bg-teal-500 hover:bg-teal-600",
  default: "bg-teal-500 hover:bg-teal-600",
};

export function SocialButton({
  href,
  icon,
  label,
  color,
  size = "md",
  animated = false,
  className,
  onClick,
}: SocialButtonProps) {
  const sizes = socialSizeMap[size];
  const bgColor =
    color || socialColors[icon.toLowerCase()] || socialColors.default;
  const iconColor =
    icon.toLowerCase() === "phone" ? "text-gray-800" : "text-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={label || icon}
      className={cn(
        "rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-xl",
        bgColor,
        sizes.buttonSize,
        animated && "animate-float",
        animated && "hover:animate-none",
        className,
      )}
    >
      <Icon name={icon} size={sizes.iconSize} className={iconColor} />
    </a>
  );
}

// ============================
// 4. Группа соцсетей
// ============================

interface SocialGroupProps {
  items: Array<{
    href: string;
    icon: string;
    label?: string;
    color?: string;
  }>;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  layout?: "row" | "column" | "grid";
}

export function SocialGroup({
  items,
  size = "md",
  animated = false,
  className,
  layout = "row",
}: SocialGroupProps) {
  const layoutClasses = {
    row: "flex flex-row",
    column: "flex flex-col",
    grid: "grid grid-cols-2 sm:grid-cols-4 gap-3",
  };

  return (
    <div
      className={cn(
        "items-center gap-3",
        layoutClasses[layout],
        layout !== "grid" && "flex",
        className,
      )}
    >
      {items.map((item, i) => (
        <SocialButton
          key={item.icon}
          href={item.href}
          icon={item.icon}
          label={item.label}
          color={item.color}
          size={size}
          animated={animated}
        />
      ))}
    </div>
  );
}

// ============================
// 5. Контактная секция (комбинированная)
// ============================

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
  contacts?: ContactItem[];
  socials?: Array<{
    href: string;
    icon: string;
    label?: string;
    color?: string;
  }>;
  theme?: "light" | "dark" | "teal";
  variant?: "compact" | "default" | "large";
  animated?: boolean;
  className?: string;
}

export function ContactSection({
  title = "Свяжитесь с нами",
  subtitle,
  benefits,
  contacts,
  socials,
  theme = "light",
  variant = "default",
  animated = true,
  className,
}: ContactSectionProps) {
  const isDark = theme === "dark";
  const isTeal = theme === "teal";

  const bgColor = isDark ? "bg-gray-900" : isTeal ? "bg-teal-600" : "bg-white";

  const textColor = isDark
    ? "text-white"
    : isTeal
      ? "text-white"
      : "text-gray-900";

  const subtitleColor = isDark
    ? "text-gray-400"
    : isTeal
      ? "text-teal-100"
      : "text-gray-500";

  return (
    <div
      className={cn(
        "rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-300",
        bgColor,
        className,
      )}
    >
      {(title || subtitle) && (
        <div className={cn("mb-6", animated && "animate-fade-up")}>
          {title && (
            <h2
              className={cn(
                "font-oswald font-bold text-2xl md:text-3xl",
                textColor,
              )}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn("text-sm mt-1", subtitleColor)}>{subtitle}</p>
          )}
        </div>
      )}

      <div className="space-y-6">
        {benefits && benefits.length > 0 && (
          <BenefitsList
            items={benefits}
            variant={variant}
            theme={theme}
            animated={animated}
          />
        )}

        {contacts && contacts.length > 0 && (
          <ContactsList
            items={contacts}
            variant={variant}
            theme={theme}
            animated={animated}
          />
        )}

        {socials && socials.length > 0 && (
          <div className={cn("pt-2", animated && "animate-fade-up")}>
            <SocialGroup
              items={socials}
              size={
                variant === "compact" ? "sm" : variant === "large" ? "lg" : "md"
              }
              animated={animated}
              layout="row"
            />
          </div>
        )}
      </div>
    </div>
  );
}
