// В форме записи на выезд мастера
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

function BookingDatePicker() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd MMMM yyyy", { locale: ru }) : "Выберите дату выезда"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[
            { dayOfWeek: [0, 6] }, // Не работаем по выходным
            { before: new Date() },
          ]}
          fromDate={new Date()}
          toDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// В калькуляторе — выбор даты бесплатного осмотра
const [date, setDate] = useState<Date | undefined>(undefined)
const [time, setTime] = useState<string>("10:00")

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-xl border shadow-sm"
  disabled={{ before: new Date() }}
  modifiers={{
    available: { dayOfWeek: [1, 2, 3, 4, 5] }, // Будние
  }}
  modifiersStyles={{
    available: { backgroundColor: "var(--teal-light)", fontWeight: "bold" },
  }}
/>