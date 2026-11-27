import Link from "next/link";
import { categories, contactEmail, contactPhone } from "@/lib/data";
import Icon from "./Icon";
import Logo from "./Logo";
import T from "./T";
import type { Key } from "@/lib/i18n";

const company: { href: string; label: Key }[] = [
  { href: "/about", label: "nav.about" },
  { href: "/technicians", label: "nav.find" },
  { href: "/contact", label: "footer.join" },
  { href: "/contact", label: "nav.contact" },
];

const colHeading = "text-sm font-bold uppercase tracking-[0.15em] text-gold-light";
const colLink = "text-sm text-blue-100/80 transition hover:text-white";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-brand-dark to-[#041238] text-blue-100">
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />
      <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 py-16 sm:px-8 md:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          {/* the logo's dark lettering needs a light backdrop on the navy footer */}
          <div className="inline-block rounded-2xl bg-white px-4 py-2 shadow-lg">
            <Logo className="h-12" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100/80">
            <T k="footer.blurb" />
          </p>
          <Link href="/technicians" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-gold-light">
            <T k="nav.find" /> <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav aria-label="Company">
          <h3 className={colHeading}><T k="footer.company" /></h3>
          <ul className="mt-5 space-y-3">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={colLink}><T k={l.label} /></Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories">
          <h3 className={colHeading}><T k="footer.categories" /></h3>
          <ul className="mt-5 space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/technicians?category=${c.slug}`} className={colLink}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-1">
          <h3 className={colHeading}><T k="footer.touch" /></h3>
          <p className="mt-5 text-sm leading-relaxed text-blue-100/80">
            <T k="footer.touchText" />
          </p>
          <a href={contactPhone.href} className="mt-5 flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gold-light">
            <Icon name="phone" className="h-4 w-4" /> {contactPhone.display}
          </a>
          <a href={contactEmail.href} className="mt-2 flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gold-light">
            <Icon name="mail" className="h-4 w-4" /> {contactEmail.display}
          </a>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
            <T k="footer.contactUs" /> <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-blue-100/70 sm:flex-row sm:px-8">
          <p><T k="footer.rights" /></p>
        </div>
      </div>
    </footer>
  );
}
