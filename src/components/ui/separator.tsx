// ============================
// Разделитель в форме
// ============================

export function OrderForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-oswald font-bold text-lg">Контактные данные</h3>
        <Input label="Имя" placeholder="Введите имя" />
        <Input label="Телефон" placeholder="Введите телефон" />
      </div>

      <Separator variant="dashed" label="Услуги" />

      <div className="space-y-4">
        <h3 className="font-oswald font-bold text-lg">Выберите услугу</h3>
        <Select>
          <SelectTrigger placeholder="Выберите услугу" />
          <SelectContent>
            <SelectItem value="sofa">Химчистка диванов</SelectItem>
            <SelectItem value="chair">Химчистка кресел</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator variant="gradient" />
    </form>
  );
}

// ============================
// Разделитель в контактах
// ============================

export function ContactsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center">
          <Icon name="Phone" size={20} className="text-teal" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Телефон</p>
          <p className="font-semibold">8 918 968-28-82</p>
        </div>
      </div>

      <Separator variant="dashed" size="sm" />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-teal" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">WhatsApp</p>
          <p className="font-semibold">Написать в WhatsApp</p>
        </div>
      </div>

      <Separator variant="gradient" label="Или" labelPosition="center" />

      <Button variant="teal" className="w-full">
        Оставить заявку
      </Button>
    </div>
  );
}

// ============================
// Разделитель в хедере
// ============================

export function HeaderSeparator() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="ShieldCheck" size={18} className="text-teal" />
      <span className="text-sm">Гарантия результата</span>

      <Separator
        orientation="vertical"
        variant="teal"
        size="sm"
        className="h-6"
      />

      <Icon name="Clock" size={18} className="text-teal" />
      <span className="text-sm">Выезд 7 дней в неделю</span>

      <Separator
        orientation="vertical"
        variant="teal"
        size="sm"
        className="h-6"
      />

      <Icon name="Wallet" size={18} className="text-teal" />
      <span className="text-sm">Оплата после приёмки</span>
    </div>
  );
}

// ============================
// Разделитель в футере
// ============================

export function FooterSeparator() {
  return (
    <div className="space-y-6">
      <Separator variant="primary" size="sm" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <span>© 2026 Аренда Чистоты</span>

        <Separator orientation="vertical" className="h-4 hidden md:block" />

        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-teal transition-colors">
            Конфиденциальность
          </a>
          <a
            href="/cookie-policy"
            className="hover:text-teal transition-colors"
          >
            Cookie
          </a>
        </div>

        <Separator orientation="vertical" className="h-4 hidden md:block" />

        <a
          href="tel:+79189682882"
          className="text-teal font-medium hover:underline"
        >
          8 918 968-28-82
        </a>
      </div>

      <Separator variant="gradient" />
    </div>
  );
}
