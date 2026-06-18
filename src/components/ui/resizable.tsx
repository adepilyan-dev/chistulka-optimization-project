// ============================
// Ресайз для страницы услуг
// ============================

export function ServicesResizableLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      variant="bordered"
      className="h-[600px]"
    >
      {/* Список услуг */}
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="p-4 h-full overflow-y-auto">
          <h3 className="font-oswald font-bold text-lg mb-4">Услуги</h3>
          <div className="space-y-2">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.slug}
                className="p-3 bg-white rounded-xl border hover:border-teal-200 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon name={service.icon} size={18} className="text-teal" />
                  <span className="font-medium">{service.shortTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>

      {/* Разделитель */}
      <ResizableHandle withHandle variant="teal" />

      {/* Детали услуги */}
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="space-y-4">
            <h2 className="font-oswald text-2xl font-bold text-teal">
              Химчистка диванов
            </h2>
            <p className="text-muted-foreground">
              Профессиональная химчистка диванов в Краснодаре с выездом на дом.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-teal-light rounded-xl">
                <p className="text-sm text-muted-foreground">Цена</p>
                <p className="font-oswald text-xl font-bold text-teal">
                  от 3 500 ₽
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-muted-foreground">Сушка</p>
                <p className="font-oswald text-xl font-bold">2-4 часа</p>
              </div>
            </div>
            <Button variant="teal" className="w-full">
              Заказать услугу
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// ============================
// Ресайз для сравнения "до" и "после"
// ============================

export function BeforeAfterResizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      variant="shadow"
      className="h-[400px] rounded-2xl overflow-hidden"
    >
      <ResizablePanel defaultSize={50}>
        <div className="relative h-full">
          <img
            src="/before.jpg"
            alt="До химчистки"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">До</span>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        variant="primary"
        size="lg"
        handleIcon={
          <Icon name="ArrowLeftRight" size={16} className="text-white" />
        }
      />

      <ResizablePanel defaultSize={50}>
        <div className="relative h-full">
          <img
            src="/after.jpg"
            alt="После химчистки"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-teal-500/80 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">После</span>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// ============================
// Ресайз для калькулятора
// ============================

export function CalculatorResizable() {
  return (
    <ResizablePanelGroup direction="horizontal" variant="bordered">
      {/* Левая часть — настройки */}
      <ResizablePanel defaultSize={40} minSize={30}>
        <div className="p-6">
          <h3 className="font-oswald font-bold text-lg mb-4">Настройки</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label required>Тип мебели</Label>
              <select className="w-full p-3 rounded-xl border">
                <option>Диван</option>
                <option>Кресло</option>
                <option>Матрас</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label required>Количество</Label>
              <Input type="number" defaultValue={1} min={1} />
            </div>
            <div className="space-y-2">
              <Label>Дополнительные услуги</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <Checkbox id="express" />
                  <span>Экспресс-сушка (+800 ₽)</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox id="deodorant" />
                  <span>Устранение запахов (+500 ₽)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>

      {/* Разделитель */}
      <ResizableHandle withHandle variant="teal" />

      {/* Правая часть — результат */}
      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="font-oswald font-bold text-lg mb-4">
              Итоговая стоимость
            </h3>
            <div className="text-center py-8">
              <p className="text-4xl font-oswald font-bold text-teal">
                4 800 ₽
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Включая выезд мастера
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>Диван 3-местный</span>
                <span>3 500 ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Экспресс-сушка</span>
                <span>+800 ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Устранение запахов</span>
                <span>+500 ₽</span>
              </div>
            </div>
          </div>
          <Button variant="teal" size="lg" className="w-full mt-4">
            <Icon name="Calendar" size={18} className="mr-2" />
            Вызвать мастера
          </Button>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
