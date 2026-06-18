// Главный CTA на герое
<Button variant="teal" size="lg" className="px-8 py-3.5 text-base font-oswald">
  <Icon name="Calendar" size={18} />
  Вызвать мастера
</Button>

// Кнопка калькулятора
<Button variant="yellow" size="lg" onClick={calculatePrice}>
  <Icon name="Calculator" size={18} />
  Рассчитать цену
</Button>

// В форме заявки
<Button 
  variant="teal" 
  size="mobile" 
  loading={isSubmitting}
  className="w-full"
>
  {isSubmitting ? "Отправляем..." : "Оставить заявку"}
</Button>

// Как ссылка
<Button variant="tealOutline" asChild>
  <Link to="/nashi-raboty">
    <Icon name="Images" size={16} />
    Наши работы
  </Link>
</Button>

// Мобильная плавающая кнопка
<Button 
  variant="yellow" 
  size="mobile" 
  className="fixed bottom-6 right-6 z-50 shadow-xl rounded-full"
>
  <Icon name="Phone" size={18} />
  8 918 968-28-82
</Button>