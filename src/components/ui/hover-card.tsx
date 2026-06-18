// Карточка услуги с подсказкой при наведении
function ServiceHoverCard({ service }: { service: Service }) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-teal-light flex items-center justify-center">
              <Icon name={service.icon} size={24} className="text-teal" />
            </div>
            <div>
              <p className="font-medium">{service.title}</p>
              <p className="text-sm text-gray-500">от {service.price} ₽</p>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent size="lg" className="w-72">
        <div className="space-y-3">
          <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-oswald text-lg font-bold">{service.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="teal">Выезд на дом</Badge>
            <Badge variant="tealOutline">Сушка 2-4 ч</Badge>
          </div>
          <Button variant="teal" size="sm" className="w-full">
            <Icon name="Calendar" size={14} className="mr-2" />
            Заказать
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Мастер с профилем при наведении
function MasterHoverCard({ master }: { master: Master }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarImage src={master.avatar} />
            <AvatarFallback>{master.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{master.name}</p>
            <p className="text-sm text-gray-500">⭐ {master.rating}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarImage src={master.avatar} />
            <AvatarFallback className="text-xl">
              {master.initials}
            </AvatarFallback>
          </Avatar>
          <h4 className="font-semibold">{master.name}</h4>
          <p className="text-sm text-gray-500">{master.specialization}</p>
          <div className="flex items-center gap-1 mt-2 text-yellow-400">
            {"★".repeat(Math.floor(master.rating))}
            <span className="text-sm text-gray-500 ml-1">{master.rating}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {master.experience} лет опыта
          </p>
          <div className="flex gap-2 mt-3">
            <Badge variant="teal" size="sm">
              {master.orders}+ заказов
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Подсказка с ценой
function PriceHoverCard({
  children,
  price,
  description,
}: {
  children: React.ReactNode;
  price: string;
  description: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dashed border-gray-300">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent size="sm">
        <p className="font-semibold text-teal text-lg">{price}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

// Использование
<PriceHoverCard
  price="3 500 ₽"
  description="Стандартная чистка дивана 2-местного"
>
  от 3 500 ₽
</PriceHoverCard>;
