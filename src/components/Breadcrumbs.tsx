import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="flex items-center flex-wrap gap-1 text-sm mb-6">
      <Link to="/" className="transition-colors hover:opacity-80" style={{ color: "var(--teal)" }}>
        Главная
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <Icon name="ChevronRight" size={14} style={{ color: "var(--gray)" }} />
          {item.href ? (
            <Link to={item.href} className="transition-colors hover:opacity-80" style={{ color: "var(--teal)" }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--gray)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
