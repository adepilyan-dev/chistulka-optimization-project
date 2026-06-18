// Быстрый поиск по сайту
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

function CommandSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  const services = [
    { id: "himchistka-divanov", label: "Химчистка диванов", icon: "🛋️" },
    { id: "himchistka-kresel", label: "Химчистка кресел", icon: "🪑" },
    { id: "himchistka-matrasov", label: "Химчистка матрасов", icon: "🛏️" },
    { id: "himchistka-kovrov", label: "Химчистка ковров", icon: "🏡" },
  ];

  const districts = [
    "Центральный округ",
    "Прикубанский округ",
    "Карасунский округ",
    "Западный округ",
  ];

  const filteredServices = services.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredDistricts = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Command className="rounded-xl border shadow-lg w-full max-w-2xl">
      <CommandInput
        placeholder="Поиск услуг, районов, статей..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {filteredServices.length === 0 && filteredDistricts.length === 0 && (
          <CommandEmpty>Ничего не найдено по запросу "{search}"</CommandEmpty>
        )}
        {filteredServices.length > 0 && (
          <CommandGroup heading="Услуги">
            {filteredServices.map((s) => (
              <CommandItem
                key={s.id}
                onSelect={() => navigate(`/uslugi/${s.id}`)}
                className="flex items-center gap-2"
              >
                <span>{s.icon}</span>
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {filteredDistricts.length > 0 && (
          <CommandGroup heading="Районы">
            {filteredDistricts.map((d) => (
              <CommandItem
                key={d}
                onSelect={() =>
                  navigate(`/himchistka-${d.toLowerCase().replace(/ /g, "-")}`)
                }
                className="flex items-center gap-2"
              >
                <span>📍</span>
                {d}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
