// ============================
// Табы услуг
// ============================

export function ServiceTabs() {
  return (
    <Tabs defaultValue="sofa" className="w-full">
      <TabsList variant="pills" fullWidth className="mb-6">
        <TabsTrigger value="sofa" fullWidth>
          <Icon name="Sofa" size={16} className="mr-2" />
          Диваны
        </TabsTrigger>
        <TabsTrigger value="chair" fullWidth>
          <Icon name="Armchair" size={16} className="mr-2" />
          Кресла
        </TabsTrigger>
        <TabsTrigger value="mattress" fullWidth>
          <Icon name="Bed" size={16} className="mr-2" />
          Матрасы
        </TabsTrigger>
        <TabsTrigger value="carpet" fullWidth>
          <Icon name="LayoutGrid" size={16} className="mr-2" />
          Ковры
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sofa">
        <ServiceList type="sofa" />
      </TabsContent>
      <TabsContent value="chair">
        <ServiceList type="chair" />
      </TabsContent>
      <TabsContent value="mattress">
        <ServiceList type="mattress" />
      </TabsContent>
      <TabsContent value="carpet">
        <ServiceList type="carpet" />
      </TabsContent>
    </Tabs>
  );
}

// ============================
// Табы с подчеркиванием
// ============================

export function NavigationTabs() {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList variant="underline" className="w-full justify-start">
        <TabsTrigger value="about">О компании</TabsTrigger>
        <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        <TabsTrigger value="works">Наши работы</TabsTrigger>
        <TabsTrigger value="faq">Вопросы</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <p className="text-muted-foreground">Информация о компании...</p>
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsList />
      </TabsContent>
      <TabsContent value="works">
        <WorksGallery />
      </TabsContent>
      <TabsContent value="faq">
        <FaqList />
      </TabsContent>
    </Tabs>
  );
}

// ============================
// Вертикальные табы в профиле
// ============================

export function ProfileTabs() {
  return (
    <Tabs defaultValue="orders" orientation="vertical" className="flex gap-6">
      <TabsList
        orientation="vertical"
        variant="outline"
        className="w-48 h-auto"
      >
        <TabsTrigger value="orders" className="justify-start gap-2">
          <Icon name="Package" size={16} />
          Заказы
        </TabsTrigger>
        <TabsTrigger value="settings" className="justify-start gap-2">
          <Icon name="Settings" size={16} />
          Настройки
        </TabsTrigger>
        <TabsTrigger value="notifications" className="justify-start gap-2">
          <Icon name="Bell" size={16} />
          Уведомления
        </TabsTrigger>
      </TabsList>

      <div className="flex-1">
        <TabsContent value="orders" className="mt-0">
          <OrdersList />
        </TabsContent>
        <TabsContent value="settings" className="mt-0">
          <SettingsForm />
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
          <NotificationsSettings />
        </TabsContent>
      </div>
    </Tabs>
  );
}
