// ============================
// Попап с информацией об услуге
// ============================

export function ServicePopover({ service }: { service: Service }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 p-3 bg-white rounded-xl border hover:border-teal-200 transition-all">
          <Icon name={service.icon} size={20} className="text-teal" />
          <span className="font-medium">{service.title}</span>
          <Icon name="Info" size={14} className="text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent size="lg" side="bottom" align="start">
        <div className="space-y-3">
          <h4 className="font-oswald text-lg font-bold text-teal">
            {service.title}
          </h4>
          <p className="text-sm text-muted-foreground">{service.desc}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="teal">Выезд на дом</Badge>
            <Badge variant="tealOutline">Сушка 2-4 ч</Badge>
          </div>
          <p className="text-sm font-semibold text-teal">{service.price}</p>
          <Button variant="teal" size="sm" className="w-full">
            Заказать
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ============================
// Попап с фильтрами
// ============================

export function FilterPopover() {
  const [filters, setFilters] = React.useState<string[]>([]);

  const options = [
    { id: "sofa", label: "Диваны" },
    { id: "chair", label: "Кресла" },
    { id: "mattress", label: "Матрасы" },
    { id: "carpet", label: "Ковры" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon name="Filter" size={16} />
          Фильтры
          {filters.length > 0 && (
            <Badge variant="teal" className="ml-1">
              {filters.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent size="sm" align="end">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Категории</h4>
          <div className="space-y-2">
            {options.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.includes(opt.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters([...filters, opt.id]);
                    } else {
                      setFilters(filters.filter((f) => f !== opt.id));
                    }
                  }}
                  className="rounded border-gray-300 text-teal focus:ring-teal"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          <Button
            variant="teal"
            size="sm"
            className="w-full"
            onClick={() => console.log("Применить фильтры:", filters)}
          >
            Применить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ============================
// Попап с контактами
// ============================

export function ContactPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="teal" size="icon" className="rounded-full">
          <Icon name="Phone" size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent size="sm" side="left" arrow>
        <div className="space-y-3">
          <h4 className="font-oswald font-bold text-sm">Свяжитесь с нами</h4>
          <div className="space-y-2">
            <a
              href="tel:+79189682882"
              className="flex items-center gap-2 text-sm hover:text-teal transition-colors"
            >
              <Icon name="Phone" size={14} className="text-teal" />8 918
              968-28-82
            </a>
            <a
              href="https://wa.me/79189682882"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-teal transition-colors"
            >
              <Icon name="MessageSquare" size={14} className="text-green-500" />
              WhatsApp
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
