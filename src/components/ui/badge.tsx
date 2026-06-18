// В карточке услуги
<div className="relative">
  <Badge variant="teal" size="sm" className="absolute top-3 right-3">
    {service.badge || "Популярно"}
  </Badge>
  <h3 className="text-lg font-bold">{service.title}</h3>
</div>

// В статусе заявки
<Badge variant={status === "completed" ? "success" : status === "pending" ? "warning" : "default"}>
  {statusLabel}
</Badge>

// Как фильтр
<div className="flex flex-wrap gap-2">
  <Badge variant="teal" asChild>
    <button className="cursor-pointer">Все</button>
  </Badge>
  <Badge variant="outline" asChild>
    <button className="cursor-pointer">Диваны</button>
  </Badge>
  <Badge variant="outline" asChild>
    <button className="cursor-pointer">Кресла</button>
  </Badge>
  <Badge variant="outline" asChild>
    <button className="cursor-pointer">Матрасы</button>
  </Badge>
</div>

// В карточке отзыва
<div className="flex items-center gap-2">
  <Badge variant="success" size="sm">Подтверждён</Badge>
  <span className="text-xs text-gray-400">{review.date}</span>
</div>