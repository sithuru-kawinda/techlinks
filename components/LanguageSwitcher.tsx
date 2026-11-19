"use client";

import { setLang, useLang } from "./useLang";

const options = [
  { lang: "si", label: "සිං" },
  { lang: "en", label: "EN" },
] as const;

export default function LanguageSwitcher() {
  const { lang } = useLang();

  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
      {options.map((o) => (
        <button
          key={o.lang}
          type="button"
          onClick={() => setLang(o.lang)}
          aria-pressed={lang === o.lang}
          className={`rounded-full px-3 py-2 font-bold leading-none transition ${o.lang === "si" ? "text-base" : "text-sm"} sm:px-3.5 sm:py-1.5 ${
            lang === o.lang ? "bg-brand text-white shadow-sm" : "text-slate-600 hover:text-brand"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
