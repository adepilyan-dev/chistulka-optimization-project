// ============================
// Фильтры в галерее
// ============================

export function GalleryFilters() {
  const [filters, setFilters] = React.useState({
    sofa: false,
    chair: false,
    mattress: false,
    carpet: false,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Toggle
        pressed={filters.sofa}
        onPressedChange={(pressed) => setFilters({ ...filters, sofa: pressed })}
        icon={<Icon name="Sofa" size={16} />}
        label="Диваны"
        variant="outlineTeal"
      />
      <Toggle
        pressed={filters.chair}
        onPressedChange={(pressed) =>
          setFilters({ ...filters, chair: pressed })
        }
        icon={<Icon name="Armchair" size={16} />}
        label="Кресла"
        variant="outlineTeal"
      />
      <Toggle
        pressed={filters.mattress}
        onPressedChange={(pressed) =>
          setFilters({ ...filters, mattress: pressed })
        }
        icon={<Icon name="Bed" size={16} />}
        label="Матрасы"
        variant="outlineTeal"
      />
      <Toggle
        pressed={filters.carpet}
        onPressedChange={(pressed) =>
          setFilters({ ...filters, carpet: pressed })
        }
        icon={<Icon name="LayoutGrid" size={16} />}
        label="Ковры"
        variant="outlineTeal"
      />
    </div>
  );
}

// ============================
// Переключатель вида
// ============================

export function ViewToggle() {
  const [view, setView] = React.useState<"grid" | "list">("grid");

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      <Toggle
        pressed={view === "grid"}
        onPressedChange={() => setView("grid")}
        size="iconSm"
        icon={<Icon name="LayoutGrid" size={16} />}
        className="data-[state=on]:bg-teal-500 data-[state=on]:text-white"
        aria-label="Сетка"
      />
      <Toggle
        pressed={view === "list"}
        onPressedChange={() => setView("list")}
        size="iconSm"
        icon={<Icon name="List" size={16} />}
        className="data-[state=on]:bg-teal-500 data-[state=on]:text-white"
        aria-label="Список"
      />
    </div>
  );
}

// ============================
// Выбор дополнительной услуги
// ============================

export function ExtraServiceToggle({
  service,
  onToggle,
  selected,
}: {
  service: { id: string; label: string; price: string; icon: string };
  onToggle: (id: string) => void;
  selected: boolean;
}) {
  return (
    <Toggle
      pressed={selected}
      onPressedChange={() => onToggle(service.id)}
      variant={selected ? "teal" : "outline"}
      size="lg"
      fullWidth
      className="justify-between px-4"
    >
      <span className="flex items-center gap-2">
        <Icon name={service.icon} size={16} />
        {service.label}
      </span>
      <span className="text-sm font-medium">{service.price}</span>
    </Toggle>
  );
}

// Использование
export function ExtraServices() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const services = [
    { id: "express", label: "Экспресс-сушка", price: "+800 ₽", icon: "Zap" },
    {
      id: "deodorant",
      label: "Устранение запахов",
      price: "+500 ₽",
      icon: "Wind",
    },
    { id: "disinfect", label: "Дезинфекция", price: "+400 ₽", icon: "Shield" },
  ];

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Дополнительные услуги</p>
      {services.map((service) => (
        <ExtraServiceToggle
          key={service.id}
          service={service}
          selected={selected.includes(service.id)}
          onToggle={handleToggle}
        />
      ))}
      {selected.length > 0 && (
        <p className="text-sm text-teal font-medium">
          Выбрано: {selected.length} услуги
        </p>
      )}
    </div>
  );
}
