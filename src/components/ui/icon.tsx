import React from "react";
import {
  BenefitsList,
  ContactsList,
  SocialGroup,
  ContactSection,
  type Benefit,
  type ContactItem,
} from "@/components/ui/contact-blocks";
import { Button } from "@/components/ui/button";
import { ymGoal } from "@/hooks/useYandexMetrika";

// ============================
// Данные для проекта
// ============================

const BENEFITS: Benefit[] = [
  {
    icon: "ShieldCheck",
    text: "Гарантия результата",
    description: "Перечистим бесплатно, если результат не устроит",
    badge: "100%",
  },
  {
    icon: "Clock",
    text: "Выезд 7 дней в неделю",
    description: "С 8:00 до 22:00, без выходных",
  },
  {
    icon: "Wallet",
    text: "Оплата после приёмки",
    description: "Только когда убедитесь в результате",
  },
  {
    icon: "Leaf",
    text: "Безопасно для детей",
    description: "Гипоаллергенные средства",
    badge: "Для семьи",
  },
];

const CONTACTS: ContactItem[] = [
  {
    icon: "Phone",
    label: "Телефон",
    value: "8 918 968-28-82",
    link: "tel:+79189682882",
    badge: "Онлайн",
    onClick: () => ymGoal("phone_click"),
  },
  {
    icon: "MessageSquare",
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    link: "https://wa.me/79189682882",
    description: "Ответ за 5 минут",
    onClick: () => ymGoal("whatsapp_click"),
  },
  {
    icon: "MessageCircle",
    label: "MAX",
    value: "Написать в MAX",
    link: "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc",
    description: "Онлайн 9:00–22:00",
    onClick: () => ymGoal("max_click"),
  },
  {
    icon: "Users",
    label: "ВКонтакте",
    value: "Группа ВКонтакте",
    link: "https://vk.com/club239497134",
    description: "Отзывы и акции",
    onClick: () => ymGoal("vk_click"),
  },
  {
    icon: "MapPin",
    label: "Адрес",
    value: "Краснодар",
    description: "Работаем по всему городу и краю",
    link: null,
  },
];

const SOCIALS = [
  {
    href: "https://wa.me/79189682882",
    icon: "MessageSquare",
    label: "WhatsApp",
  },
  { href: "https://vk.com/club239497134", icon: "Users", label: "ВКонтакте" },
  {
    href: "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc",
    icon: "MessageCircle",
    label: "MAX",
    color: "bg-teal-500 hover:bg-teal-600",
  },
  {
    href: "tel:+79189682882",
    icon: "Phone",
    label: "Позвонить",
    color: "bg-yellow-400 hover:bg-yellow-500",
  },
];

// ============================
// Компоненты для разных секций
// ============================

// 1. Преимущества на главной
export function HomeBenefits() {
  return (
    <div className="py-8">
      <BenefitsList
        items={BENEFITS}
        variant="large"
        theme="light"
        animated
        className="max-w-2xl mx-auto"
      />
    </div>
  );
}

// 2. Контакты в футере
export function FooterContacts() {
  return (
    <ContactsList
      items={CONTACTS.filter(
        (c) => c.icon === "Phone" || c.icon === "MessageSquare",
      )}
      variant="compact"
      theme="dark"
      animated
      showArrow={false}
    />
  );
}

// 3. Контакты на странице
export function PageContacts() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-oswald text-xl font-bold mb-4">Контакты</h3>
        <ContactsList
          items={CONTACTS}
          variant="default"
          theme="light"
          animated
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-teal-light rounded-3xl p-8">
        <h4 className="font-oswald text-lg font-bold mb-4">Мы в соцсетях</h4>
        <SocialGroup
          items={SOCIALS}
          size="lg"
          animated
          layout="row"
          gap="gap-4"
          wrap
        />
        <Button
          variant="teal"
          size="lg"
          className="mt-6 w-full max-w-xs"
          onClick={() => ymGoal("contact_section_click")}
        >
          Связаться с нами
        </Button>
      </div>
    </div>
  );
}

// 4. Полная контактная секция
export function ContactSectionFull() {
  return (
    <ContactSection
      title="Свяжитесь с нами"
      subtitle="Ответим на все вопросы и приедем в удобное время"
      theme="teal"
      variant="large"
      animated
      benefits={BENEFITS}
      contacts={CONTACTS.slice(0, 2)}
      socials={SOCIALS}
    >
      <Button
        variant="yellow"
        size="lg"
        className="w-full mt-4 font-oswald text-base"
        onClick={() => ymGoal("contact_section_button")}
      >
        <Icon name="Calendar" size={18} className="mr-2" />
        Вызвать мастера
      </Button>
    </ContactSection>
  );
}

// 5. Социальные кнопки в хедере
export function HeaderSocials() {
  return (
    <SocialGroup
      items={[
        { href: "https://wa.me/79189682882", icon: "MessageSquare" },
        { href: "https://vk.com/club239497134", icon: "Users" },
      ]}
      size="sm"
      animated={false}
      layout="row"
      gap="gap-2"
    />
  );
}

// 6. Флоатинг кнопки соцсетей
export function FloatingSocials() {
  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 z-[90] flex flex-col gap-3">
      <SocialGroup
        items={[
          {
            href: "https://wa.me/79189682882",
            icon: "MessageSquare",
            color: "bg-green-500 hover:bg-green-600",
          },
          {
            href: "https://vk.com/club239497134",
            icon: "Users",
            color: "bg-blue-600 hover:bg-blue-700",
          },
          {
            href: "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc",
            icon: "MessageCircle",
            color: "bg-teal-500 hover:bg-teal-600",
          },
          {
            href: "tel:+79189682882",
            icon: "Phone",
            color: "bg-yellow-400 hover:bg-yellow-500",
          },
        ]}
        size="md"
        animated
        layout="column"
        gap="gap-2"
      />
    </div>
  );
}

// 7. Мобильное меню с контактами
export function MobileMenuContacts() {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h4 className="font-oswald font-bold text-lg">Контакты</h4>
        <ContactsList
          items={CONTACTS.filter(
            (c) => c.icon === "Phone" || c.icon === "MessageSquare",
          )}
          variant="compact"
          theme="light"
          showArrow={false}
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-oswald font-bold text-lg">Мы в соцсетях</h4>
        <SocialGroup items={SOCIALS} size="sm" layout="row" gap="gap-2" wrap />
      </div>
    </div>
  );
}

// ============================
// Основной компонент контактов
// ============================

export function Contacts() {
  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-tag">Контакты</span>
            <h2
              className="font-oswald font-bold mt-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--dark)",
              }}
            >
              Вызвать мастера на дом
            </h2>
            <p className="mt-3 mb-8 text-base" style={{ color: "var(--gray)" }}>
              Позвоните или оставьте заявку — ответим в течение 15 минут,
              приедем в удобное время.
            </p>
            <ContactsList
              items={CONTACTS}
              variant="large"
              theme="light"
              animated
            />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ============================
// Форма заявки (из существующего кода)
// ============================

function ContactForm() {
  // ... существующий код формы
}
