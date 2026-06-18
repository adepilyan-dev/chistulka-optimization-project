// ============================
// Выбор категории услуг
// ============================

export function ServiceCategoryToggle() {
  const [category, setCategory] = React.useState("sofa");

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Выберите категорию</p>
      <ToggleGroup
        type="single"
        value={category}
        onValueChange={(value) => value && setCategory(value)}
        variant="teal"
        fullWidth
        className="p-1 bg-gray-50 rounded-xl"
      >
        <ToggleGroupItem value="sofa" fullWidth>
          <Icon name="Sofa" size={16} className="mr-2" />
          Диваны
        </ToggleGroupItem>
        <ToggleGroupItem value="chair" fullWidth>
          <Icon name="Armchair" size={16} className="mr-2" />
          Кресла
        </ToggleGroupItem>
        <ToggleGroupItem value="mattress" fullWidth>
          <Icon name="Bed" size={16} className="mr-2" />
          Матрасы
        </ToggleGroupItem>
        <ToggleGroupItem value="carpet" fullWidth>
          <Icon name="LayoutGrid" size={16} className="mr-2" />
          Ковры
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

// ============================
// Фильтры по цене
// ============================

export function PriceFilterToggle() {
  const [priceRange, setPriceRange] = React.useState("all");

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Цена</p>
      <ToggleGroup
        type="single"
        value={priceRange}
        onValueChange={(value) => value && setPriceRange(value)}
        variant="outline"
        size="sm"
        className="flex-wrap"
      >
        <ToggleGroupItem value="all">Все</ToggleGroupItem>
        <ToggleGroupItem value="low">до 3000 ₽</ToggleGroupItem>
        <ToggleGroupItem value="mid">3000-6000 ₽</ToggleGroupItem>
        <ToggleGroupItem value="high">от 6000 ₽</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

// ============================
// Выбор дополнительных услуг
// ============================

export function ExtraServicesToggle() {
  const [extras, setExtras] = React.useState<string[]>([]);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Дополнительные услуги</p>
      <ToggleGroup
        type="multiple"
        value={extras}
        onValueChange={(value) => setExtras(value)}
        variant="outlineTeal"
        className="flex-wrap"
      >
        <ToggleGroupItem value="express" className="gap-2">
          <Icon name="Zap" size={14} />
          Экспресс-сушка (+800 ₽)
        </ToggleGroupItem>
        <ToggleGroupItem value="deodorant" className="gap-2">
          <Icon name="Wind" size={14} />
          Устранение запахов (+500 ₽)
        </ToggleGroupItem>
        <ToggleGroupItem value="disinfect" className="gap-2">
          <Icon name="Shield" size={14} />
          Дезинфекция (+400 ₽)
        </ToggleGroupItem>
        <ToggleGroupItem value="nano" className="gap-2">
          <Icon name="Sparkles" size={14} />
          Нано-защита (+700 ₽)
        </ToggleGroupItem>
      </ToggleGroup>
      {extras.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Выбрано: {extras.join(", ")}
        </p>
      )}
    </div>
  );
}

// ============================
// Сортировка в каталоге
// ============================

export function SortToggle() {
  const [sort, setSort] = React.useState("popular");

  return (
    <ToggleGroup
      type="single"
      value={sort}
      onValueChange={(value) => value && setSort(value)}
      variant="ghost"
      size="sm"
    >
      <ToggleGroupItem value="popular">Популярные</ToggleGroupItem>
      <ToggleGroupItem value="price-asc">Недорогие</ToggleGroupItem>
      <ToggleGroupItem value="price-desc">Дорогие</ToggleGroupItem>
      <ToggleGroupItem value="rating">Рейтинг</ToggleGroupItem>
    </ToggleGroup>
  );
}
