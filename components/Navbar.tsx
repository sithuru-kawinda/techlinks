"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "./useLang";
import type { Key } from "@/lib/i18n";

const links: { href: string; label: Key }[] = [
  { href: "/", label: "nav.home" },
  { href: "/technicians", label: "nav.technicians" },
  { href: "/about", label: "nav.about" },
  { href: "/contact", label: "nav.contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-8">
        <Logo className="h-9 min-[400px]:h-11 sm:h-14" />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition hover:bg-blue-50 hover:text-brand ${isActive(l.href) ? "bg-blue-50 text-brand" : "text-slate-700"}`}
              >
                {t(l.label)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/technicians" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-gold-light">
            {t("nav.find")}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t("nav.menu")}
            className="grid h-11 w-11 place-items-center rounded-lg text-brand hover:bg-blue-50"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-5 pt-2 sm:px-8 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`block rounded-lg px-3 py-3 font-bold hover:bg-blue-50 hover:text-brand ${isActive(l.href) ? "bg-blue-50 text-brand" : "text-slate-700"}`}
            >
              {t(l.label)}
            </Link>
          ))}
          <Link href="/technicians" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-gold px-5 py-3 text-center font-bold text-brand-dark shadow-sm transition hover:bg-gold-light">
            {t("nav.find")}
          </Link>
        </div>
      )}
    </header>
  );
}
