// ============================
// Дополнительные услуги
// ============================

export function ExtraServices() {
  const [services, setServices] = React.useState({
    express: false,
    deodorant: false,
    disinfect: false,
  });

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl border">
      <h4 className="font-oswald font-bold">Дополнительные услуги</h4>

      <Switch
        checked={services.express}
        onCheckedChange={(checked) =>
          setServices({ ...services, express: checked })
        }
        label="Экспресс-сушка (1-2 ч)"
        description="+800 ₽"
        variant="teal"
        size="lg"
      />

      <Switch
        checked={services.deodorant}
        onCheckedChange={(checked) =>
          setServices({ ...services, deodorant: checked })
        }
        label="Устранение запахов"
        description="+500 ₽"
        variant="teal"
        size="lg"
      />

      <Switch
        checked={services.disinfect}
        onCheckedChange={(checked) =>
          setServices({ ...services, disinfect: checked })
        }
        label="Дезинфекция"
        description="+400 ₽"
        variant="teal"
        size="lg"
      />

      <div className="border-t pt-4">
        <p className="text-sm font-semibold">
          Итого: +
          {Object.entries(services).reduce((sum, [key, val]) => {
            if (!val) return sum;
            const prices = { express: 800, deodorant: 500, disinfect: 400 };
            return sum + prices[key as keyof typeof prices];
          }, 0)}
          ₽
        </p>
      </div>
    </div>
  );
}

// ============================
// Настройки уведомлений
// ============================

export function NotificationSettings() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-xl border">
      <h4 className="font-oswald font-bold">Настройки уведомлений</h4>

      <Switch
        defaultChecked
        label="SMS-уведомления"
        description="О статусе заявки"
        variant="teal"
      />

      <Switch
        defaultChecked
        label="Push-уведомления"
        description="О новых акциях"
        variant="teal"
      />

      <Switch
        label="Email-рассылка"
        description="Еженедельные советы по уходу"
        variant="teal"
      />
    </div>
  );
}

// ============================
// Фильтры в каталоге
// ============================

export function CatalogFilters() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-xl border">
      <h4 className="font-oswald font-bold">Фильтры</h4>

      <Switch label="Только в наличии" variant="primary" size="sm" />

      <Switch label="С выездом мастера" variant="primary" size="sm" />

      <Switch label="Акции и скидки" variant="primary" size="sm" />
    </div>
  );
}

// ============================
// Карточка услуги с переключателем
// ============================

export function ServiceCardWithSwitch({
  service,
  onSelect,
}: {
  service: {
    id: string;
    title: string;
    price: string;
    description: string;
  };
  onSelect: (selected: boolean) => void;
}) {
  const [selected, setSelected] = React.useState(false);

  const handleChange = (checked: boolean) => {
    setSelected(checked);
    onSelect(checked);
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all",
        selected && "border-teal-400 bg-teal-light",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{service.title}</h4>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
        <div className="text-right">
          <p className="font-oswald font-bold text-teal">{service.price}</p>
          <Switch
            checked={selected}
            onCheckedChange={handleChange}
            variant="teal"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
