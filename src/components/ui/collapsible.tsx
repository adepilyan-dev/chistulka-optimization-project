// Список услуг с раскрывающимися описаниями
<Collapsible>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center">
        <Icon name="Sofa" size={18} className="text-teal" />
      </div>
      <div className="text-left">
        <p className="font-semibold">Химчистка диванов</p>
        <p className="text-xs text-gray-500">
          Удаляем пятна, запахи и аллергены
        </p>
      </div>
    </div>
    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4 bg-gray-50 rounded-xl mt-2 space-y-3">
      <p className="text-sm text-gray-600">
        Работаем с любыми типами тканей: велюр, замша, кожа, микрофибра.
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="teal">Выезд на дом</Badge>
        <Badge variant="teal">Сушка 2-4 ч</Badge>
        <Badge variant="teal">Гипоаллергенно</Badge>
      </div>
      <Button variant="teal" size="sm" className="mt-2">
        Заказать от 3 500 ₽
      </Button>
    </div>
  </CollapsibleContent>
</Collapsible>;

// FAQ
const [openItems, setOpenItems] = React.useState<string[]>([]);

const faqItems = [
  {
    id: "1",
    question: "Сколько стоит химчистка дивана?",
    answer: "Цена зависит от размера и типа обивки. От 3 500 рублей.",
  },
  {
    id: "2",
    question: "Выезжаете ли вы на дом?",
    answer: "Да, выезжаем по всему Краснодару. Бесплатный выезд.",
  },
  {
    id: "3",
    question: "Безопасны ли средства?",
    answer:
      "Да, используем гипоаллергенные средства, безопасные для детей и животных.",
  },
];

{
  faqItems.map((item) => {
    const isOpen = openItems.includes(item.id);
    return (
      <Collapsible
        key={item.id}
        open={isOpen}
        onOpenChange={() => {
          setOpenItems(
            isOpen
              ? openItems.filter((id) => id !== item.id)
              : [...openItems, item.id],
          );
        }}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left">
          <span className="font-medium">{item.question}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-muted-foreground">
          <p className="pb-4">{item.answer}</p>
        </CollapsibleContent>
      </Collapsible>
    );
  });
}

// В калькуляторе — расшифровка цен
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      <span>Расшифровка стоимости</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Выезд мастера</span>
        <span className="font-medium text-teal">0 ₽</span>
      </div>
      <div className="flex justify-between">
        <span>Чистка 1 м²</span>
        <span className="font-medium">350 ₽</span>
      </div>
      <div className="flex justify-between">
        <span>Выведение пятен</span>
        <span className="font-medium">от 200 ₽</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-bold">
        <span>Итого</span>
        <span className="text-teal">от 3 500 ₽</span>
      </div>
    </div>
  </CollapsibleContent>
</Collapsible>;
