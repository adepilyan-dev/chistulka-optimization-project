// ============================
// Хук с конфигурацией для проекта
// ============================

import { useToast, toast } from "@/hooks/use-toast"
import { Icon } from "@/components/ui/icon"

export function useProjectNotifications() {
  const { toast } = useToast()

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "success",
      duration: 5000,
    })
  }

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 6000,
    })
  }

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "warning",
      duration: 5000,
    })
  }

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "info",
      duration: 4000,
    })
  }

  const showTeal = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "teal",
      duration: 5000,
    })
  }

  const showPromo = (title: string, description?: string) => {
    toast({
      title,
      description,
      icon: <Icon name="Gift" size={24} className="text-yellow-500" />,
      duration: 10000,
    })
  }

  const showOrderStatus = (status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled") => {
    const messages = {
      pending: { title: "⏳ Заявка принята", description: "Ожидайте звонка от мастера", variant: "info" as const },
      confirmed: { title: "✅ Заявка подтверждена!", description: "Мастер выезжает к вам", variant: "success" as const },
      in_progress: { title: "🚗 Мастер в пути", description: "Прибудет в ближайшее время", variant: "info" as const },
      completed: { title: "🎉 Работа выполнена!", description: "Спасибо, что выбрали Аренду Чистоты", variant: "teal" as const },
      cancelled: { title: "❌ Заявка отменена", description: "Если это ошибка, свяжитесь с нами", variant: "destructive" as const },
    }

    const message = messages[status]
    toast({
      title: message.title,
      description: message.description,
      variant: message.variant,
      duration: 5000,
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showTeal,
    showPromo,
    showOrderStatus,
  }
}

// ============================
// Использование в компоненте
// ============================

export function OrderStatus() {
  const [status, setStatus] = useState<"pending" | "confirmed" | "in_progress" | "completed" | "cancelled">("pending")
  const { showOrderStatus } = useProjectNotifications()

  useEffect(() => {
    showOrderStatus(status)
  }, [status])

  return (
    <div>
      {/* содержимое */}
    </div>
  )
}