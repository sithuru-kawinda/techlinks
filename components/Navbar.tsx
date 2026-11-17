"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/technicians", label: "Technicians" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo className="h-12 sm:h-14" />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-brand">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/admin" className="text-sm font-medium text-slate-500 transition hover:text-brand">
            Admin
          </Link>
          <Link href="/technicians" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-gold-light">
            Find a Technician
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg text-brand hover:bg-blue-50 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 pb-5 pt-2 md:hidden">
          {[...links, { href: "/admin", label: "Admin" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-bold text-slate-700 hover:bg-blue-50 hover:text-brand">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
