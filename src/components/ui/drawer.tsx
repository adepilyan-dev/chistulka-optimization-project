// Мобильная форма заявки
function MobileOrderDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent size="lg">
        <DrawerHeader>
          <DrawerTitle className="font-oswald text-2xl text-teal">
            Вызвать мастера
          </DrawerTitle>
          <DrawerDescription>Перезвоним в течение 15 минут</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ваше имя</label>
            <input
              type="text"
              placeholder="Например, Елена"
              className="w-full px-4 py-3 rounded-xl border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Телефон</label>
            <input
              type="tel"
              placeholder="8 918 968-28-82"
              className="w-full px-4 py-3 rounded-xl border"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="teal" size="mobile" className="w-full">
            <Icon name="Phone" size={16} className="mr-2" />
            Отправить заявку
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Мобильное меню
function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Icon name="Menu" size={24} />
        </button>
      </DrawerTrigger>
      <DrawerContent size="sm" hideHandle>
        <div className="p-4 space-y-2">
          <h2 className="font-oswald text-2xl mb-4">Меню</h2>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-base font-medium hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr />
          <a
            href="tel:+79189682882"
            className="block py-3 text-base font-medium text-teal"
          >
            <Icon name="Phone" size={16} className="mr-2" />8 918 968-28-82
          </a>
          <Button variant="teal" className="w-full mt-4">
            Вызвать мастера
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Фильтры в мобильной версии
function MobileFilters() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const filters = [
    { id: "sofa", label: "Диваны" },
    { id: "chair", label: "Кресла" },
    { id: "mattress", label: "Матрасы" },
    { id: "carpet", label: "Ковры" },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <Icon name="Filter" size={16} className="mr-2" />
          Фильтры
          {selected.length > 0 && (
            <Badge variant="teal" className="ml-2">
              {selected.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent size="sm">
        <DrawerHeader>
          <DrawerTitle>Фильтры</DrawerTitle>
          <DrawerDescription>Выберите категории услуг</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all",
                selected.includes(filter.id)
                  ? "bg-teal-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100",
              )}
              onClick={() => {
                setSelected((prev) =>
                  prev.includes(filter.id)
                    ? prev.filter((f) => f !== filter.id)
                    : [...prev, filter.id],
                );
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <DrawerFooter>
          <Button variant="teal" className="w-full">
            Применить ({selected.length})
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setSelected([])}
          >
            Сбросить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
