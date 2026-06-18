// ============================
// Мобильное меню
// ============================

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Icon name="Menu" size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" size="sm">
        <SheetHeader>
          <img src="/logo.png" alt="Аренда Чистоты" className="h-8 w-auto" />
          <SheetDescription>Химчистка мебели в Краснодаре</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-base font-medium hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr />
          <a
            href="tel:+79189682882"
            className="block py-2 text-base font-medium text-teal"
          >
            <Icon name="Phone" size={16} className="inline mr-2" />8 918
            968-28-82
          </a>
          <Button variant="teal" className="w-full mt-4">
            Вызвать мастера
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ============================
// Корзина/заказ
// ============================

export function OrderSheet() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Диван 3-местный", price: 4500, quantity: 1 },
    { id: 2, name: "Кресло", price: 2500, quantity: 2 },
  ]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Icon name="ShoppingCart" size={18} />
          <span className="ml-2">Корзина</span>
          {items.length > 0 && (
            <Badge variant="teal" className="absolute -top-2 -right-2 text-xs">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle className="font-oswald">Ваш заказ</SheetTitle>
          <SheetDescription>{items.length} позиций в корзине</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {item.price} ₽
                </p>
              </div>
              <p className="font-semibold">
                {(item.price * item.quantity).toLocaleString()} ₽
              </p>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Итого</span>
            <span className="text-teal">{total.toLocaleString()} ₽</span>
          </div>
        </div>
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Продолжить
            </Button>
          </SheetClose>
          <Button variant="teal" className="w-full sm:w-auto">
            <Icon name="Calendar" size={16} className="mr-2" />
            Оформить заказ
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ============================
// Форма заявки в Sheet
// ============================

export function OrderFormSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="teal"
          size="lg"
          className="w-full font-oswald text-base"
        >
          <Icon name="Calendar" size={18} className="mr-2" />
          Вызвать мастера
        </Button>
      </SheetTrigger>
      <SheetContent size="lg" side="bottom">
        <SheetHeader>
          <SheetTitle className="font-oswald text-2xl text-teal">
            Вызвать мастера
          </SheetTitle>
          <SheetDescription>
            Заполните форму, и мы перезвоним в течение 15 минут
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label required>Ваше имя</Label>
            <Input placeholder="Например, Елена" size="lg" />
          </div>
          <div className="space-y-2">
            <Label required>Телефон</Label>
            <Input placeholder="8 918 968-28-82" size="lg" />
          </div>
          <div className="space-y-2">
            <Label>Адрес (необязательно)</Label>
            <Input placeholder="ул. Примерная, д. 1" size="lg" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Отмена
            </Button>
          </SheetClose>
          <Button variant="teal" className="w-full sm:w-auto">
            Отправить заявку
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
