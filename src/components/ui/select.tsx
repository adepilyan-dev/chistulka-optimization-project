// ============================
// Выбор услуги в форме
// ============================

export function ServiceSelect() {
  return (
    <div className="space-y-1.5">
      <Label required>Услуга</Label>
      <Select>
        <SelectTrigger size="lg" placeholder="Выберите услугу">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Основные услуги</SelectLabel>
            <SelectItem value="sofa">
              <div className="flex items-center gap-2">
                <Icon name="Sofa" size={16} className="text-teal" />
                Химчистка диванов
              </div>
            </SelectItem>
            <SelectItem value="chair">
              <div className="flex items-center gap-2">
                <Icon name="Armchair" size={16} className="text-teal" />
                Химчистка кресел
              </div>
            </SelectItem>
            <SelectItem value="mattress">
              <div className="flex items-center gap-2">
                <Icon name="Bed" size={16} className="text-teal" />
                Химчистка матрасов
              </div>
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Дополнительные</SelectLabel>
            <SelectItem value="carpet">
              <div className="flex items-center gap-2">
                <Icon name="LayoutGrid" size={16} className="text-teal" />
                Химчистка ковров
              </div>
            </SelectItem>
            <SelectItem value="auto">
              <div className="flex items-center gap-2">
                <Icon name="Car" size={16} className="text-teal" />
                Химчистка автосалона
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// ============================
// Выбор района
// ============================

export function DistrictSelect() {
  return (
    <div className="space-y-1.5">
      <Label required>Район</Label>
      <Select>
        <SelectTrigger size="lg" placeholder="Выберите район Краснодара">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Округа</SelectLabel>
            <SelectItem value="central">Центральный округ</SelectItem>
            <SelectItem value="prikubanskiy">Прикубанский округ</SelectItem>
            <SelectItem value="karasunsky">Карасунский округ</SelectItem>
            <SelectItem value="zapadnyy">Западный округ</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Микрорайоны</SelectLabel>
            <SelectItem value="yubileynyy">Юбилейный</SelectItem>
            <SelectItem value="gidrostroiteley">Гидростроителей</SelectItem>
            <SelectItem value="cheremushki">Черемушки</SelectItem>
            <SelectItem value="pashkovskiy">Пашковский</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// ============================
// Фильтр в галерее
// ============================

export function GalleryFilter() {
  return (
    <Select>
      <SelectTrigger variant="ghost" className="w-[180px]">
        <Icon name="Filter" size={16} className="mr-2" />
        <SelectValue placeholder="Все категории" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все работы</SelectItem>
        <SelectItem value="sofa">Диваны</SelectItem>
        <SelectItem value="chair">Кресла</SelectItem>
        <SelectItem value="mattress">Матрасы</SelectItem>
        <SelectItem value="carpet">Ковры</SelectItem>
        <SelectItem value="auto">Авто</SelectItem>
      </SelectContent>
    </Select>
  );
}

// ============================
// Сортировка
// ============================

export function SortSelect() {
  return (
    <Select defaultValue="popular">
      <SelectTrigger variant="ghost" className="w-[160px]">
        <Icon name="ArrowUpDown" size={16} className="mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">По популярности</SelectItem>
        <SelectItem value="price-asc">Сначала недорогие</SelectItem>
        <SelectItem value="price-desc">Сначала дорогие</SelectItem>
        <SelectItem value="rating">По рейтингу</SelectItem>
      </SelectContent>
    </Select>
  );
}
