"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Icon from "./Icon";

export type Option = { label: string; tag?: string };

type Props = {
  name: string;
  placeholder: string;
  options: Option[];
  defaultValue?: string;
  icon: "search" | "pin";
  className?: string;
};

// Text input with a styled suggestion list. Still a plain named input, so it submits with the surrounding GET form.
export default function Autocomplete({ name, placeholder, options, defaultValue = "", icon, className = "" }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();

  const matches = useMemo(() => {
    const v = value.trim().toLowerCase();
    const found = options.filter((o) => o.label.toLowerCase().includes(v) && o.label.toLowerCase() !== v);
    // suggestions that start with what was typed come first
    found.sort((a, b) => Number(b.label.toLowerCase().startsWith(v)) - Number(a.label.toLowerCase().startsWith(v)));
    return found;
  }, [value, options]);

  const show = open && matches.length > 0;

  // keep the arrow-key highlight visible inside the scrolling list
  useEffect(() => {
    if (show && active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [show, active, listId]);

  const pick = (o: Option) => {
    setValue(o.label);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="flex items-center gap-2 px-3">
        <Icon name={icon} className="h-5 w-5 shrink-0 text-brand" />
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={show}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={show && active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && matches.length) {
              e.preventDefault();
              setOpen(true);
              setActive((i) => (i + 1) % matches.length);
            } else if (e.key === "ArrowUp" && matches.length) {
              e.preventDefault();
              setActive((i) => (i <= 0 ? matches.length - 1 : i - 1));
            } else if (e.key === "Enter" && show && active >= 0) {
              e.preventDefault();
              pick(matches[active]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className="w-full bg-transparent py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none"
        />
      </label>

      {show && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-30 mt-3 max-h-44 min-w-56 overflow-auto rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-2xl shadow-blue-900/15">
          {matches.map((o, i) => (
            <li
              key={o.label}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown (not click) so the input keeps focus and onBlur doesn't close the list first
              onMouseDown={(e) => {
                e.preventDefault();
                pick(o);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${i === active ? "bg-blue-50 text-brand" : "text-slate-700"}`}
            >
              <span className="flex items-center gap-2 font-medium">
                <Icon name={icon} className="h-4 w-4 text-slate-400" />
                {o.label}
              </span>
              {o.tag && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{o.tag}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
