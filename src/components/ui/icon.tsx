// Список преимуществ
<div className="space-y-3">
  {[
    { icon: "ShieldCheck", text: "Гарантия результата", color: "text-teal" },
    { icon: "Clock", text: "Выезд 7 дней в неделю", color: "text-teal" },
    { icon: "Wallet", text: "Оплата после приёмки", color: "text-teal" },
  ].map((item) => (
    <div key={item.text} className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-teal-light flex items-center justify-center">
        <Icon name={item.icon} size={18} className={item.color} />
      </div>
      <span className="text-sm">{item.text}</span>
    </div>
  ))}
</div>

// В контактах
<div className="space-y-4">
  {[
    { icon: "Phone", label: "Телефон", value: "8 918 968-28-82", link: "tel:+79189682882" },
    { icon: "MessageSquare", label: "WhatsApp", value: "Написать", link: "https://wa.me/79189682882" },
    { icon: "MapPin", label: "Адрес", value: "Краснодар", link: null },
  ].map((item) => (
    <a
      key={item.label}
      href={item.link || "#"}
      className="flex items-center gap-4 p-4 rounded-2xl border hover:shadow-md transition-all"
    >
      <div className="w-11 h-11 rounded-xl bg-teal-light flex items-center justify-center">
        <Icon name={item.icon} size={20} className="text-teal" />
      </div>
      <div>
        <div className="text-xs text-gray-500">{item.label}</div>
        <div className="font-semibold">{item.value}</div>
      </div>
    </a>
  ))}
</div>

// В кнопке соцсети
<a
  href="https://wa.me/79189682882"
  className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
>
  <Icon name="MessageSquare" size={24} className="text-white" />
</a>