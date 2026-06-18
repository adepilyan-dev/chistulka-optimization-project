// Модалка заявки на выезд мастера
function OrderDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-teal">
            Вызвать мастера
          </DialogTitle>
          <DialogDescription>
            Заполните поля, и мы перезвоним вам в течение 15 минут
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ваше имя</label>
            <input
              type="text"
              placeholder="Например, Елена"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Телефон</label>
            <input
              type="tel"
              placeholder="8 918 968-28-82"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Отмена
            </Button>
          </DialogClose>
          <Button variant="teal" className="w-full sm:w-auto">
            <Icon name="Phone" size={16} className="mr-2" />
            Отправить заявку
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Использование
<OrderDialog>
  <Button variant="teal" size="lg" className="w-full">
    <Icon name="Calendar" size={18} />
    Вызвать мастера
  </Button>
</OrderDialog>

// Модалка с результатом химчистки
<Dialog>
  <DialogTrigger asChild>
    <button className="cursor-pointer group">
      <img
        src={work.afterImg}
        alt={work.title}
        className="w-full rounded-lg transition-transform group-hover:scale-105"
      />
    </button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle className="font-oswald">{work.title}</DialogTitle>
      <DialogDescription>
        <Badge variant="teal" className="mr-2">{work.categoryLabel}</Badge>
        Результат химчистки
      </DialogDescription>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg overflow-hidden">
        <img src={work.beforeImg} alt="До" className="w-full" />
        <p className="text-xs text-center mt-1 text-gray-500">До</p>
      </div>
      <div className="rounded-lg overflow-hidden">
        <img src={work.afterImg} alt="После" className="w-full" />
        <p className="text-xs text-center mt-1 text-teal font-medium">После</p>
      </div>
    </div>
    <DialogFooter>
      <Button variant="teal" className="w-full">
        <Icon name="Phone" size={16} className="mr-2" />
        Заказать такую же чистку
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>