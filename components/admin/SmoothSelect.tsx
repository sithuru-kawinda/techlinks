"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = { value: string; label: string };

// A styled dropdown that animates open/closed. The chosen value is submitted through a hidden input,
// so it still works inside a plain <form>.
export default function SmoothSelect({
  id,
  name,
  options,
  defaultValue = "",
  placeholder,
  invalid,
  className,
}: {
  id: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  placeholder: string;
  invalid?: boolean;
  className: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const toggle = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen((o) => !o);
  };
  const pick = (o: Option) => {
    setValue(o.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return toggle();
      setActive((i) => (e.key === "ArrowDown" ? Math.min(options.length - 1, i + 1) : Math.max(0, i - 1)));
    } else if ((e.key === "Enter" || e.key === " ") && open && active >= 0) {
      e.preventDefault();
      pick(options[active]);
    }
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-invalid={invalid}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between gap-2 text-left`}
      >
        <span className={selected ? "" : "text-slate-400"}>{selected?.label ?? placeholder}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        id={listId}
        role="listbox"
        aria-hidden={!open}
        className={`absolute left-0 right-0 z-30 mt-2 max-h-64 origin-top overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-brand/10 transition duration-200 ease-out ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {options.map((o, i) => (
          <li
            key={o.value}
            role="option"
            aria-selected={o.value === value}
            onClick={() => pick(o)}
            onMouseEnter={() => setActive(i)}
            className={`cursor-pointer px-3.5 py-2.5 text-sm transition-colors ${
              o.value === value ? "font-bold text-brand" : "text-slate-700"
            } ${i === active ? "bg-blue-50" : ""}`}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
