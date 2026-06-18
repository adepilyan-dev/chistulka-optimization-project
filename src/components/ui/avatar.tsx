// В отзывах клиентов
<Avatar size="lg">
  <AvatarImage src={review.avatar} alt={review.name} />
  <AvatarFallback>{review.avatar}</AvatarFallback>
</Avatar>

// С инициалами
<Avatar size="md">
  <AvatarImage src="https://example.com/avatar.jpg" />
  <AvatarFallback>ЕМ</AvatarFallback>
</Avatar>

// В списке мастеров
<div className="flex items-center gap-3">
  <Avatar size="sm">
    <AvatarImage src={master.photo} />
    <AvatarFallback>{master.initials}</AvatarFallback>
  </Avatar>
  <div>
    <p className="font-medium text-sm">{master.name}</p>
    <p className="text-xs text-gray-500">{master.role}</p>
  </div>
</div>

// С кастомными цветами
<Avatar className="border-2 border-teal">
  <AvatarImage src="/master.jpg" />
  <AvatarFallback className="bg-teal-light text-teal">М</AvatarFallback>
</Avatar>