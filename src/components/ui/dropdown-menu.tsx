// Мобильное меню пользователя
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback>П</AvatarFallback>
          </Avatar>
          <Icon name="ChevronDown" size={16} className="text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Пользователь</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Icon name="User" size={16} />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Icon name="Clock" size={16} />
          История заказов
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Icon name="Heart" size={16} />
          Избранное
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive">
          <Icon name="LogOut" size={16} />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Выбор города/района
function LocationDropdown() {
  const [district, setDistrict] = React.useState("Центральный");

  const districts = [
    "Центральный",
    "Прикубанский",
    "Карасунский",
    "Западный",
    "Юбилейный",
    "Гидростроителей",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon name="MapPin" size={16} className="text-teal" />
          {district}
          <Icon name="ChevronDown" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Выберите район</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {districts.map((d) => (
          <DropdownMenuItem
            key={d}
            className="gap-2"
            onClick={() => setDistrict(d)}
          >
            {d}
            {district === d && (
              <Icon name="Check" size={16} className="ml-auto text-teal" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Сортировка в каталоге
function SortDropdown() {
  const [sort, setSort] = React.useState("popular");

  const options = [
    { value: "popular", label: "По популярности" },
    { value: "price-asc", label: "Сначала недорогие" },
    { value: "price-desc", label: "Сначала дорогие" },
    { value: "rating", label: "По рейтингу" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Icon name="ArrowUpDown" size={16} />
          Сортировка
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            className="gap-2"
            onClick={() => setSort(opt.value)}
          >
            {opt.label}
            {sort === opt.value && (
              <Icon name="Check" size={16} className="ml-auto text-teal" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
