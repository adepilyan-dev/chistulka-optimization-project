interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  center?: boolean;
  light?: boolean;
}

export default function ConsentCheckbox({ checked, onChange, className, center, light }: Props) {
  return (
    <label className={`flex items-start gap-2 cursor-pointer ${center ? "justify-center" : ""} ${className ?? ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 shrink-0 accent-teal-500"
        style={{ width: 15, height: 15 }}
      />
      <span className={`text-xs leading-snug ${light ? "text-white/70" : ""}`} style={light ? {} : { color: "var(--gray)" }}>
        Я даю согласие на обработку{" "}
        <a href="/privacy" className={`underline ${light ? "text-white/90" : ""}`} style={light ? {} : { color: "var(--teal)" }}>
          персональных данных
        </a>
      </span>
    </label>
  );
}
