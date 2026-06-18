// ============================
// Список услуг со скроллом
// ============================

export function ServicesScrollList() {
  return (
    <ScrollArea className="h-[400px] w-full rounded-xl border" variant="teal">
      <div className="p-4 space-y-3">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.slug}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border hover:border-teal-200 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center">
              <Icon name={service.icon} size={22} className="text-teal" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{service.title}</h4>
              <p className="text-sm text-muted-foreground">
                {service.shortDesc}
              </p>
            </div>
            <Badge variant="teal">{service.price}</Badge>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// ============================
// Отзывы со скроллом
// ============================

export function ReviewsScroll() {
  return (
    <ScrollArea className="h-[300px] w-full rounded-xl border p-4" size="sm">
      <div className="space-y-4">
        {REVIEWS.map((review) => (
          <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{review.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{review.name}</p>
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(review.rating)}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">"{review.text}"</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// ============================
// Горизонтальный скролл (галерея)
// ============================

export function GalleryScroll() {
  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <div className="flex gap-4 p-4 min-w-max">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.id} className="w-[200px] flex-shrink-0">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// ============================
// Чат с поддержкой
// ============================

export function SupportChat() {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="p-4 bg-teal-500 text-white">
        <h4 className="font-oswald font-bold">Чат поддержки</h4>
        <p className="text-sm text-teal-100">Онлайн 9:00–22:00</p>
      </div>

      <ScrollArea className="h-[300px] p-4" variant="ghost">
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 bg-gray-100 rounded-xl">
              <p className="text-sm">Здравствуйте! Нужна химчистка дивана.</p>
              <span className="text-xs text-muted-foreground mt-1 block">
                10:30
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] p-3 bg-teal-500 text-white rounded-xl">
              <p className="text-sm">
                Добрый день! Примем заявку. Укажите адрес.
              </p>
              <span className="text-xs text-teal-100 mt-1 block">10:32</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 bg-gray-100 rounded-xl">
              <p className="text-sm">ул. Красная, д. 1, кв. 5</p>
              <span className="text-xs text-muted-foreground mt-1 block">
                10:33
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] p-3 bg-teal-500 text-white rounded-xl">
              <p className="text-sm">Отлично! Мастер выедет через 2 часа.</p>
              <span className="text-xs text-teal-100 mt-1 block">10:34</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input placeholder="Сообщение..." className="flex-1" />
        <Button variant="teal" size="icon">
          <Icon name="Send" size={16} />
        </Button>
      </div>
    </div>
  );
}
