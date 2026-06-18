import React, { memo, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  /** Название иконки из библиотеки lucide-react */
  name: string;
  /** Запасная иконка, если указанная не найдена */
  fallback?: string;
  /** Является ли иконка декоративной (скрывается от скринридеров) */
  decorative?: boolean;
  /** Текст для доступности (если иконка не декоративная) */
  ariaLabel?: string;
}

/**
 * Универсальный компонент для иконок из библиотеки lucide-react
 *
 * Пример использования:
 * <Icon name="Home" size={24} className="text-blue-500" />
 * <Icon name="Star" decorative ariaLabel="Рейтинг 5 звёзд" />
 */
const Icon: React.FC<IconProps> = memo(
  ({
    name,
    fallback = "CircleAlert",
    decorative = true,
    ariaLabel,
    className,
    ...props
  }) => {
    // Мемоизация выбора иконки для предотвращения лишних пересчётов
    const IconComponent = useMemo(() => {
      const icons = LucideIcons as Record<string, React.FC<LucideProps>>;
      const component = icons[name];

      if (component) {
        return component;
      }

      // Если иконка не найдена, используем fallback
      const fallbackComponent = icons[fallback];
      if (fallbackComponent) {
        return fallbackComponent;
      }

      // Если даже fallback не найден, возвращаем null
      return null;
    }, [name, fallback]);

    // Если иконка не найдена, показываем заглушку
    if (!IconComponent) {
      return (
        <span
          className={cn(
            "inline-flex items-center justify-center text-xs text-gray-400",
            className,
          )}
          aria-hidden={decorative}
        >
          [{name}]
        </span>
      );
    }

    // Формируем ARIA-атрибуты
    const ariaProps = decorative
      ? { "aria-hidden": true }
      : {
          "aria-hidden": false,
          role: "img",
          "aria-label": ariaLabel || name,
        };

    return (
      <IconComponent
        className={cn("flex-shrink-0", className)}
        {...ariaProps}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export default Icon;

// ============================================================
// ПОЛЕЗНЫЕ УТИЛИТЫ ДЛЯ РАБОТЫ С ИКОНКАМИ
// ============================================================

/**
 * Маппинг для частых иконок на вашем сайте
 */
export const IconMap = {
  // Навигация
  home: "Home",
  menu: "Menu",
  close: "X",
  arrowRight: "ArrowRight",
  arrowLeft: "ArrowLeft",
  chevronDown: "ChevronDown",
  chevronUp: "ChevronUp",
  chevronRight: "ChevronRight",
  chevronLeft: "ChevronLeft",

  // Контакты
  phone: "Phone",
  mail: "Mail",
  mapPin: "MapPin",
  messageSquare: "MessageSquare",
  messageCircle: "MessageCircle",

  // Услуги
  sofa: "Sofa",
  armchair: "Armchair",
  bed: "Bed",
  bedDouble: "BedDouble",
  carpet: "Carpet",
  car: "Car",
  layoutGrid: "LayoutGrid",

  // Действия
  search: "Search",
  calendar: "Calendar",
  clock: "Clock",
  user: "User",
  users: "Users",
  shield: "Shield",
  shieldCheck: "ShieldCheck",
  check: "Check",
  checkCircle: "CheckCircle",
  alertCircle: "AlertCircle",

  // Соцсети и связь
  vk: "Vk",
  whatsapp: "MessageSquare",
  telegram: "Send",

  // Функциональные
  settings: "Settings",
  helpCircle: "HelpCircle",
  info: "Info",
  star: "Star",
  award: "Award",
  zap: "Zap",
  sparkles: "Sparkles",
  leaf: "Leaf",
  wind: "Wind",
  droplets: "Droplets",
  calculator: "Calculator",
  images: "Images",
  wallet: "Wallet",
};

/**
 * Типизированный компонент с автодополнением для иконок
 * Используйте его вместо прямого импорта для большей гибкости
 */
export const IconWithMap: React.FC<
  Omit<IconProps, "name"> & { name: keyof typeof IconMap }
> = ({ name, ...props }) => {
  return <Icon name={IconMap[name]} {...props} />;
};

// ============================================================
// ПРЕДНАСТРОЕННЫЕ КОМПОНЕНТЫ ДЛЯ ЧАСТЫХ СЛУЧАЕВ
// ============================================================

/**
 * Иконка телефона
 */
export const PhoneIcon: React.FC<Omit<IconProps, "name">> = (props) => (
  <Icon name="Phone" decorative={false} ariaLabel="Телефон" {...props} />
);

/**
 * Иконка для кнопки "Вернуться наверх"
 */
export const BackToTopIcon: React.FC<Omit<IconProps, "name">> = (props) => (
  <Icon name="ChevronUp" decorative ariaLabel="Наверх" {...props} />
);

/**
 * Иконка загрузки (спиннер)
 */
export const SpinnerIcon: React.FC<Omit<IconProps, "name">> = (props) => (
  <Icon
    name="LoaderCircle"
    decorative
    className={cn("animate-spin", props.className)}
    {...props}
  />
);

/**
 * Иконка звезды для рейтинга
 */
export const StarIcon: React.FC<
  { filled?: boolean } & Omit<IconProps, "name">
> = ({ filled = false, ...props }) => (
  <Icon
    name={filled ? "Star" : "Star"}
    decorative
    className={cn("text-yellow-400", !filled && "opacity-30", props.className)}
    {...props}
  />
);

// ============================================================
// КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ РЕЙТИНГА ЗВЁЗДАМИ
// ============================================================

interface RatingStarsProps {
  /** Количество звёзд (1-5) */
  rating: number;
  /** Максимальное количество звёзд */
  max?: number;
  /** Размер звёзд */
  size?: number;
  /** Дополнительные классы */
  className?: string;
  /** Показывать ли текстовое значение */
  showValue?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 16,
  className,
  showValue = false,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {/* Полные звёзды */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Icon
          key={`full-${i}`}
          name="Star"
          size={size}
          decorative
          className="text-yellow-400 fill-yellow-400"
        />
      ))}

      {/* Половина звезды */}
      {hasHalfStar && (
        <Icon
          name="StarHalf"
          size={size}
          decorative
          className="text-yellow-400 fill-yellow-400"
        />
      )}

      {/* Пустые звёзды */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={size}
          decorative
          className="text-gray-300"
        />
      ))}

      {showValue && (
        <span
          className="ml-1 text-sm font-semibold"
          style={{ color: "var(--dark)" }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
