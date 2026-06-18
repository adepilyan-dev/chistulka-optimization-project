// ============================
// Таблица цен
// ============================

export function PriceTable() {
  return (
    <Table variant="bordered" hover striped>
      <TableCaption>Актуальные цены на услуги</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Услуга</TableHead>
          <TableHead className="text-center">Длительность</TableHead>
          <TableHead className="text-right">Цена</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            Химчистка дивана 2-местного
          </TableCell>
          <TableCell className="text-center">1.5 часа</TableCell>
          <TableCell className="text-right font-semibold text-teal">
            3 500 ₽
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            Химчистка дивана 3-местного
          </TableCell>
          <TableCell className="text-center">2 часа</TableCell>
          <TableCell className="text-right font-semibold text-teal">
            4 500 ₽
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            Химчистка углового дивана
          </TableCell>
          <TableCell className="text-center">2.5 часа</TableCell>
          <TableCell className="text-right font-semibold text-teal">
            5 500 ₽
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Химчистка кресла</TableCell>
          <TableCell className="text-center">1 час</TableCell>
          <TableCell className="text-right font-semibold text-teal">
            2 500 ₽
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-bold">
            Комплексная чистка (диван + 2 кресла)
          </TableCell>
          <TableCell className="text-right font-bold text-teal">
            7 500 ₽
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

// ============================
// Таблица заказов
// ============================

export function OrdersTable() {
  const orders = [
    {
      id: 1,
      service: "Химчистка дивана",
      date: "15.06.2026",
      status: "Выполнен",
      amount: "3 500 ₽",
    },
    {
      id: 2,
      service: "Химчистка матраса",
      date: "12.06.2026",
      status: "В работе",
      amount: "3 800 ₽",
    },
    {
      id: 3,
      service: "Химчистка ковра",
      date: "10.06.2026",
      status: "Ожидает",
      amount: "2 800 ₽",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Выполнен":
        return "text-green-600";
      case "В работе":
        return "text-yellow-600";
      case "Ожидает":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Table variant="striped" hover>
      <TableCaption>История заказов</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead sortable>Услуга</TableHead>
          <TableHead sortable>Дата</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right" sortable>
            Сумма
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{order.service}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>
              <span className={cn("font-medium", getStatusColor(order.status))}>
                {order.status}
              </span>
            </TableCell>
            <TableCell className="text-right font-semibold">
              {order.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ============================
// Таблица отзывов
// ============================

export function ReviewsTable() {
  const reviews = [
    {
      id: 1,
      name: "Елена",
      rating: 5,
      comment: "Отличная работа!",
      date: "14.06.2026",
    },
    {
      id: 2,
      name: "Дмитрий",
      rating: 4,
      comment: "Хорошо, но долго сохло",
      date: "13.06.2026",
    },
    {
      id: 3,
      name: "Анастасия",
      rating: 5,
      comment: "Спасибо, всё чисто!",
      date: "12.06.2026",
    },
  ];

  return (
    <Table variant="compact" striped hover>
      <TableHeader>
        <TableRow>
          <TableHead>Клиент</TableHead>
          <TableHead className="text-center">Оценка</TableHead>
          <TableHead>Отзыв</TableHead>
          <TableHead className="text-right">Дата</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium">{review.name}</TableCell>
            <TableCell className="text-center">
              <span className="text-yellow-400">
                {"★".repeat(review.rating)}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              "{review.comment}"
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {review.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
