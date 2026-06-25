import { useState, useEffect, useRef } from "react";

// ============ УТИЛИТЫ ============

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ============ ХУКИ ============

export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ============ ДАННЫЕ ============

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export const SERVICES = [
  {
    icon: "Sofa",
    title: "Химчистка диванов",
    desc: "Удаляем пятна, запахи и аллергены. Ткань, велюр, замша, кожа — работаем с любым материалом.",
    color: "#0cb8a0",
    badge: "Хит",
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/bcb4a8aa-0dfd-4cad-bef1-70049379a194.jpg",
  },
  {
    icon: "ArmchairIcon",
    title: "Химчистка кресел",
    desc: "Офисные, обеденные, игровые кресла. Глубокая чистка без разборки, сушка за 2–4 часа.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/32dbcd93-9d05-4cd0-97be-b92950779a37.jpg",
  },
  {
    icon: "BedDouble",
    title: "Химчистка матрасов",
    desc: "Устраняем клещей, грибок, пятна и неприятные запахи. Безопасно для детей и аллергиков.",
    color: "#0cb8a0",
    badge: "Популярно",
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/157e0325-e980-40bb-ad12-0ac0666b29c4.jpg",
  },
  {
    icon: "LayoutGrid",
    title: "Химчистка ковров",
    desc: "Шерсть, синтетика, ковры ручной работы. Выездная чистка на дому или в нашем цеху.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/6892c9d8-2c73-4645-9fd6-399caee62037.jpg",
  },
  {
    icon: "Armchair",
    title: "Химчистка стульев",
    desc: "Обеденные группы, барные стулья, пуфики. Быстро — один стул от 15 минут.",
    color: "#0cb8a0",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/e34f7bce-a582-4425-a8e4-da241d6b65e3.jpg",
  },
  {
    icon: "Car",
    title: "Химчистка автосалона",
    desc: "Сиденья, потолок, дверные панели. Профессиональное оборудование и безопасные средства.",
    color: "#c9a800",
    badge: null,
    img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/files/bcb5b240-69f5-4098-908b-011a606d4c63.jpg",
  },
];

export const STATS = [
  { num: "3 000+", label: "предметов мебели" },
  { num: "10 лет", label: "на рынке" },
  { num: "сложные", label: "пятна выводим" },
  { num: "2–4 ч", label: "время высыхания" },
];

export const REVIEWS = [
  {
    name: "Елена Морозова",
    role: "Владелица квартиры",
    text: "Диван-то думала уже не спасти — кот поработал знатно. После химчистки как новый! Запах ушёл полностью.",
    rating: 5,
    avatar: "ЕМ",
  },
  {
    name: "Дмитрий Козлов",
    role: "Руководитель офиса",
    text: "Заказывали химчистку всех кресел в переговорной. Приехали быстро, сделали аккуратно, к утру всё высохло.",
    rating: 5,
    avatar: "ДК",
  },
  {
    name: "Анастасия Петрова",
    role: "Молодая мама",
    text: "Матрас для ребёнка — важно, чтобы без химии. Ребята объяснили всё про состав, сделали безопасно. Рекомендую!",
    rating: 5,
    avatar: "АП",
  },
  {
    name: "Михаил Волков",
    role: "Владелец автомобиля",
    text: "Чистили сиденья в BMW — результат на уровне автодилера. Цена в два раза ниже, а качество такое же.",
    rating: 5,
    avatar: "МВ",
  },
];

export const GALLERY_ITEMS = [
  { label: "Угловой диван после чистки", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/51340069-99b0-4850-915a-6563a587e2b6.jpg", ratio: "4/3" },
  { label: "Диван до чистки", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/38109181-291f-43d2-acbc-d8059547943b.jpg", ratio: "4/3" },
  { label: "Матрас после чистки", tag: "Матрас", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/041e747b-9a0e-4bea-9335-238eabfa4473.jpg", ratio: "4/3" },
  { label: "Матрас до чистки", tag: "Матрас", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/4bc0afcd-6c3b-4c6e-89d0-51569d1ef36e.jpg", ratio: "4/3" },
  { label: "Диван после чистки", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/19a85ebd-07f4-41ee-b669-283901cc5d56.jpg", ratio: "4/3" },
  { label: "Диван на подлокотниках", tag: "Диван", img: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/de8a7092-f0d1-4176-91fc-8f045dbc7bb0.jpg", ratio: "4/3" },
];

export const FURNITURE_ITEMS = [
  { id: "sofa_2", label: "Диван 2-местный", emoji: "🛋️", price: 3500 },
  { id: "sofa_3", label: "Диван 3-местный", emoji: "🛋️", price: 4500 },
  { id: "sofa_corner", label: "Угловой диван", emoji: "🛋️", price: 5500 },
  { id: "chair", label: "Кресло", emoji: "🪑", price: 2500 },
  { id: "mattress_s", label: "Матрас 1-спальный", emoji: "🛏️", price: 3000 },
  { id: "mattress_d", label: "Матрас 2-спальный", emoji: "🛏️", price: 3800 },
  { id: "carpet_s", label: "Ковёр до 6 м²", emoji: "🏡", price: 2800 },
  { id: "carpet_l", label: "Ковёр от 6 м²", emoji: "🏡", price: 3800 },
  { id: "car_seat", label: "Авто (салон)", emoji: "🚗", price: 4500 },
  { id: "dining_chair", label: "Стул обеденный", emoji: "🪑", price: 600 },
];

export const EXTRA_OPTIONS = [
  { key: "express", label: "Экспресс-сушка (1–2 ч)", price: 800 },
  { key: "deodorant", label: "Устранение запахов", price: 500 },
  { key: "nano", label: "Нано-защита ткани", price: 700 },
  { key: "disinfect", label: "Дезинфекция", price: 400 },
];

export const HOW_STEPS = [
  {
    num: "01",
    icon: "Search",
    title: "Осмотр и диагностика",
    text: "Бесплатно оцениваем степень загрязнения и тип ткани. Называем точную цену до начала работ — без скрытых доплат.",
  },
  {
    num: "02",
    icon: "Wind",
    title: "Сухая чистка",
    text: "Удаляем пыль, шерсть и мусор из всех складок мощным профессиональным пылесосом.",
  },
  {
    num: "03",
    icon: "Droplets",
    title: "Выведение пятен",
    text: "Точечно обрабатываем сложные загрязнения специализированными пятновыводителями под каждый тип пятна.",
  },
  {
    num: "04",
    icon: "Sparkles",
    title: "Основная мойка",
    text: "Наносим средство, вспениваем, вымываем грязь экстрактором горячей воды — машина вытягивает загрязнения из глубины.",
  },
  {
    num: "05",
    icon: "CheckCircle",
    title: "Сушка и финиш",
    text: "Ускоряем сушку воздуходувкой, поднимаем ворс, проводим финальный осмотр вместе с клиентом. Принимаете — платите.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Сколько времени занимает химчистка?",
    a: "В среднем чистка одного дивана занимает 1–1,5 часа. Мебель высыхает за 2–4 часа в зависимости от типа обивки и влажности в помещении.",
  },
  {
    q: "Вы приезжаете на дом?",
    a: "Да, мы работаем с выездом на дом по Краснодару и пригороду. Всё оборудование привозим с собой — вам не нужно ничего готовить заранее.",
  },
  {
    q: "Безопасны ли средства для детей и животных?",
    a: "Мы используем профессиональную гипоаллергенную химию, безопасную для детей, аллергиков и домашних животных. После чистки не остаётся вредных запахов.",
  },
  {
    q: "Сколько стоит химчистка дивана?",
    a: "Стоимость зависит от размера и типа обивки. Точную цену можно рассчитать в калькуляторе на сайте или уточнить по телефону — мастер назовёт её до начала работ.",
  },
  {
    q: "Удалите ли вы старые и стойкие пятна?",
    a: "В большинстве случаев да — мы выводим пятна от кофе, вина, жира, мочи и других загрязнений. Результат зависит от давности и природы пятна; мастер оценит это на месте.",
  },
  {
    q: "Как оплатить услугу?",
    a: "Оплата принимается наличными или переводом после выполнения работ, когда вы убедитесь в результате.",
  },
  {
    q: "У вас дешевле, чем у других? В чём подвох?",
    a: "Подвоха нет. Мы работаем без посредников и имеем собственную базу в Краснодаре — это снижает наши расходы. Именно поэтому можем предложить цены ниже среднерыночных при высоком качестве и с гарантией результата. Оплата только после приёмки.",
  },
  {
    q: "У меня очень сложное пятно от вина или крови. Вы его гарантированно выведете?",
    a: "В большинстве случаев — да. Мастер бесплатно оценит пятно на месте и сразу скажет о прогнозе. Если вывести не удастся — вы ничего не платите. Мы не берём деньги за попытку.",
  },
];

export const FURNITURE_TYPES = [
  { key: "sofa", label: "Диван", emoji: "🛋️" },
  { key: "chair", label: "Кресло", emoji: "🪑" },
  { key: "mattress", label: "Матрас", emoji: "🛏️" },
  { key: "carpet", label: "Ковёр", emoji: "🏡" },
  { key: "auto", label: "Авто", emoji: "🚗" },
  { key: "other", label: "Другое", emoji: "✨" },
];