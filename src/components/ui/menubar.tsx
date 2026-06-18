// ============================
// Навигационное меню
// ============================

export function NavMenu() {
  return (
    <Menubar size="lg" className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="text-base font-oswald hover:text-teal">
          Услуги
        </MenubarTrigger>
        <MenubarContent className="min-w-[200px]">
          <MenubarItem className="flex items-center gap-2">
            <Icon name="Sofa" size={16} className="text-teal" />
            Химчистка диванов
            <MenubarShortcut>⌘1</MenubarShortcut>
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <Icon name="Armchair" size={16} className="text-teal" />
            Химчистка кресел
            <MenubarShortcut>⌘2</MenubarShortcut>
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <Icon name="Bed" size={16} className="text-teal" />
            Химчистка матрасов
            <MenubarShortcut>⌘3</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex items-center gap-2">
            <Icon name="LayoutGrid" size={16} className="text-teal" />
            Химчистка ковров
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <Icon name="Car" size={16} className="text-teal" />
            Химчистка автосалона
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-base font-oswald hover:text-teal">
          О нас
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>О компании</MenubarItem>
          <MenubarItem>Наши работы</MenubarItem>
          <MenubarItem>Отзывы</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-base font-oswald hover:text-teal">
          Блог
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Советы по чистоте</MenubarItem>
          <MenubarItem>Ответы на вопросы</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-base font-oswald text-teal font-bold">
          ☎ 8 918 968-28-82
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-teal font-semibold">
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить сейчас
          </MenubarItem>
          <MenubarItem>
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Написать в WhatsApp
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
