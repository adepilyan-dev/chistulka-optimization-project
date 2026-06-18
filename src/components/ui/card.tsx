// Карточка услуги на главной
<Card variant="elevated" interactive className="overflow-hidden">
  <div className="relative h-48">
    <img
      src={service.img}
      alt={service.title}
      className="w-full h-full object-cover"
    />
    {service.badge && (
      <Badge variant="teal" className="absolute top-3 right-3">
        {service.badge}
      </Badge>
    )}
  </div>
  <CardHeader>
    <CardTitle className="font-oswald text-xl">{service.title}</CardTitle>
    <CardDescription>{service.shortDesc}</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="teal" className="w-full">
      Подробнее
    </Button>
  </CardFooter>
</Card>

// Карточка отзыва
<Card className="bg-teal-light border-teal-200">
  <CardHeader>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>{review.initials}</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-base">{review.name}</CardTitle>
        <CardDescription>{review.role}</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm">"{review.text}"</p>
  </CardContent>
  <CardFooter>
    <div className="flex text-yellow-400">
      {"★".repeat(review.rating)}
      {"☆".repeat(5 - review.rating)}
    </div>
  </CardFooter>
</Card>

// Карточка цены
<Card variant="elevated" className="text-center">
  <CardHeader>
    <CardTitle className="font-oswald text-3xl text-teal">
      {price} ₽
    </CardTitle>
    <CardDescription>{serviceName}</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2 text-sm text-left">
      <li>✓ Выезд на дом</li>
      <li>✓ Безопасные средства</li>
      <li>✓ Сушка 2-4 часа</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button variant="yellow" className="w-full">
      Выбрать
    </Button>
  </CardFooter>
</Card>