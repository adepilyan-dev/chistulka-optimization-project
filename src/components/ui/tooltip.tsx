// ============================
// Подсказки для иконок услуг
// ============================

export function ServiceTooltip({
  icon,
  label,
  price,
  children,
}: {
  icon: string;
  label: string;
  price: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent size="lg" variant="teal" side="bottom">
          <div className="flex items-center gap-3">
            <Icon name={icon} size={20} className="text-white" />
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-xs text-teal-100">{price}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Использование
<ServiceTooltip icon="Sofa" label="Химчистка диванов" price="от 3 500 ₽">
  <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center cursor-pointer hover:bg-teal/20 transition-colors">
    <Icon name="Sofa" size={22} className="text-teal" />
  </div>
</ServiceTooltip>;

// ============================
// Подсказка для цены
// ============================

export function PriceTooltip({
  children,
  price,
  description,
}: {
  children: React.ReactNode;
  price: string;
  description: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dashed border-gray-300">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent size="sm">
          <p className="font-semibold text-teal">{price}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Использование
<PriceTooltip
  price="3 500 ₽"
  description="Стандартная чистка дивана 2-местного"
>
  3 500 ₽
</PriceTooltip>;

// ============================
// Подсказка для кнопки телефона
// ============================

export function PhoneTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="teal"
            className="rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
          >
            <Icon name="Phone" size={24} className="text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent variant="dark" side="left" sideOffset={8}>
          <div className="space-y-1">
            <p className="font-semibold">Звоните прямо сейчас</p>
            <p className="text-xs text-gray-400">8 918 968-28-82</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================
// Подсказка с бейджем
// ============================

export function BadgeTooltip({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent size="sm" variant="teal" side="top" arrowSize="sm">
          <div className="flex items-center gap-1.5">
            <Icon name="Zap" size={12} className="text-yellow-300" />
            <span>{badge}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Использование
<BadgeTooltip badge="Популярно">
  <Badge variant="teal">Хит</Badge>
</BadgeTooltip>;

// ============================
// Подсказка для иконки с описанием
// ============================

export function InfoTooltip({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent size="lg" side="right" arrow>
          <div className="space-y-1">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
