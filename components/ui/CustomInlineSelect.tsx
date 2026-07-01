import { ChevronDown } from "lucide-react";
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

export function FormSelect({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label?: string;
  value: string;
  options: (string | { value: string; label: string })[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayValue = options.find((opt) => {
    const val = typeof opt === "string" ? opt : opt.value;
    return val === value;
  });
  const displayLabel =
    typeof displayValue === "string"
      ? displayValue.charAt(0).toUpperCase() + displayValue.slice(1)
      : displayValue?.label || value;

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
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-[10px] font-medium uppercase tracking-wider text-ink/50">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className="relative mt-1.5 w-full rounded-md border border-ink/15 bg-paper px-2 py-1.5 text-left text-sm text-ink transition-colors hover:border-ink/15 disabled:opacity-60"
      >
        {displayLabel}
        <ChevronDown   className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/50" />
      </button>
      <div
        className={`absolute left-0 top-full z-50 mt-1 w-full origin-top-left transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg bg-paper shadow-lg ring-1 ring-ink/10">
          {options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel =
              typeof opt === "string"
                ? opt.charAt(0).toUpperCase() + opt.slice(1)
                : opt.label;
            return (
              <button
                key={optValue}
                type="button"
                onClick={() => {
                  onChange(optValue);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition ${
                  value === optValue
                    ? "bg-pink/50 font-medium text-brand"
                    : "text-ink/75 hover:bg-ink/5 hover:text-brand"
                }`}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}