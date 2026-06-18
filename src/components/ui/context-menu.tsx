// Контекстное меню для карточки услуги
function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="cursor-context-menu hover:shadow-lg transition-all">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardHeader>
            <CardTitle className="font-oswald">{service.title}</CardTitle>
            <CardDescription>{service.shortDesc}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant="teal">от {service.price} ₽</Badge>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={() => navigate(`/uslugi/${service.slug}`)}>
          <Icon name="Eye" size={16} className="mr-2" />
          Подробнее
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => navigate(`/uslugi/${service.slug}/#calc`)}
        >
          <Icon name="Calculator" size={16} className="mr-2" />
          Рассчитать цену
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => scrollToId("contacts")}>
          <Icon name="Phone" size={16} className="mr-2" />
          Вызвать мастера
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => window.open(service.img, "_blank")}>
          <Icon name="Image" size={16} className="mr-2" />
          Открыть фото
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-destructive"
          onClick={() => {
            /* скрыть карточку */
          }}
        >
          <Icon name="X" size={16} className="mr-2" />
          Скрыть
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// В галерее работ
<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="relative rounded-xl overflow-hidden cursor-context-menu">
      <img
        src={work.afterImg}
        alt={work.title}
        className="w-full h-full object-cover"
      />
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onClick={() => setSelectedWork(work)}>
      <Icon name="Maximize2" size={16} className="mr-2" />
      Увеличить
    </ContextMenuItem>
    <ContextMenuItem
      onClick={() => navigator.clipboard.writeText(window.location.href)}
    >
      <Icon name="Copy" size={16} className="mr-2" />
      Скопировать ссылку
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>;
