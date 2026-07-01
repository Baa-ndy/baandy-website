import { useState, useRef, useEffect } from "react";

export function CustomInlineSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`cursor-pointer border-b-[3px] border-dashed pb-1 font-display italic text-brand transition-colors duration-200 focus:outline-none ${
          open
            ? "border-brand"
            : "border-pink-deep hover:border-brand"
        }`}
      >
        {value}
      </button>
      <div
        className={`absolute left-0 top-full z-50 mt-3 origin-top-left transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="min-w-[220px] rounded-2xl bg-paper p-1.5 shadow-2xl shadow-ink/25 ring-1 ring-ink/8">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full rounded-xl px-4 py-2.5 text-left font-display text-base italic transition ${
                value === opt
                  ? "bg-pink/50 text-brand"
                  : "text-ink/75 hover:bg-pink/20 hover:text-brand"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </span>
  );
}