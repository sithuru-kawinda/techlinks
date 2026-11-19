"use client";

import { useEffect, useRef, useState } from "react";
import { categories, contactPhone, type Technician } from "@/lib/data";
import { useRating } from "@/lib/ratings";
import Icon from "./Icon";
import { useLang } from "./useLang";
import { citySi, rateSi, tradeSi } from "@/lib/i18n";

export default function TechnicianCard({ t }: { t: Technician }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { rating, rate } = useRating(t.id);
  const { lang, p } = useLang();
  const trade = p(t.trade, tradeSi[t.trade]);
  const city = p(t.city, citySi[t.city]);
  const price = lang === "si" ? rateSi(t.rate) : t.rate;
  const category = categories.find((c) => c.slug === t.category);
  const message = encodeURIComponent(`Hi TechLinks, I would like to book ${t.name} (${t.trade}, ${t.city}).`);
  const digits = t.phone?.replace(/\D/g, "");
  const whatsapp = `https://wa.me/${digits || contactPhone.href.replace("tel:+", "")}?text=${message}`;
  const callHref = t.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : contactPhone.href;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-md"
      >
        <div className={`grid h-32 place-items-center bg-gradient-to-br ${t.hue}`}>
          <span className="grid h-16 w-16 place-items-center rounded-full bg-black/30 text-gold-light ring-2 ring-gold" role="img" aria-label={t.name}>
            <Icon name="user" className="h-8 w-8" />
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-brand-dark">{t.name}</h3>
          <p className="text-sm font-medium text-brand-light">{trade}</p>
          <p className="mt-3 flex items-center gap-1 text-sm text-slate-500">
            <Icon name="pin" className="h-4 w-4" />
            {city}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
            <span className="flex items-center gap-1 font-semibold text-brand-dark">
              <Icon name="star" className="h-4 w-4 text-gold" />
              {rating.average.toFixed(1)} <span className="font-normal text-slate-500">({rating.count})</span>
            </span>
            <span className="text-slate-600">{price}</span>
          </div>
        </div>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`tech-${t.id}-name`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-brand-dark/60 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="relative grid sm:grid-cols-[15rem_1fr]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={p("Close", "වසන්න")}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-xl leading-none text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className={`flex flex-col items-center justify-center bg-gradient-to-br px-5 py-6 text-center text-white sm:py-10 ${t.hue}`}>
              <span className="grid h-20 w-20 place-items-center rounded-full bg-black/30 text-gold-light ring-4 ring-gold sm:h-24 sm:w-24" role="img" aria-label={t.name}>
                <Icon name="user" className="h-10 w-10 sm:h-12 sm:w-12" />
              </span>
              <h2 id={`tech-${t.id}-name`} className="mt-3 text-xl font-extrabold">{t.name}</h2>
              <p className="text-sm font-semibold text-gold-light">{trade}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-blue-100">
                <Icon name="pin" className="h-4 w-4" /> {city}
              </p>
            </div>

            <div className="p-5 sm:p-7">
              {category && (
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">
                  <Icon name={category.icon} className="h-4 w-4" /> {p(category.name, category.nameSi)}
                </span>
              )}
              {(t.bio || category) && <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.bio ?? `${category ? p(category.blurb, category.blurbSi) : ""}.`}</p>}

              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{p("Rating", "ශ්‍රේණිගත කිරීම")}</dt>
                  <dd className="mt-0.5 flex items-center justify-center gap-1 font-extrabold text-brand-dark">
                    <Icon name="star" className="h-4 w-4 text-gold" /> {rating.average.toFixed(1)}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{p("Jobs", "රැකියා")}</dt>
                  <dd className="mt-0.5 font-extrabold text-brand-dark">{t.jobs}</dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{p("Rate", "ගාස්තුව")}</dt>
                  <dd className="mt-0.5 text-sm font-extrabold text-brand-dark">{price}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 min-[400px]:flex-row min-[400px]:gap-3" role="group" aria-label={p("Rate this technician", "මෙම ශිල්පියා ශ්‍රේණිගත කරන්න")}>
                <div className="flex shrink-0">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => rate(n)}
                      aria-label={p(`Rate ${n} star${n > 1 ? "s" : ""}`, `තරු ${n}ක් දෙන්න`)}
                      className={`p-0.5 transition hover:scale-110 ${n <= rating.mine ? "text-gold" : "text-slate-300 hover:text-gold-light"}`}
                    >
                      <Icon name="star" className={`h-7 w-7 ${n <= rating.mine ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs leading-snug text-slate-600 min-[400px]:text-left">
                  {rating.mine ? p(`You rated ${rating.mine}/5.`, `ඔබ ${rating.mine}/5 ලබා දුන්නා.`) : p("Click a star to rate.", "ශ්‍රේණිගත කිරීමට තරුවක් ක්ලික් කරන්න.")} {p(`${rating.average.toFixed(1)} average (${rating.count})`, `සාමාන්‍යය ${rating.average.toFixed(1)} (${rating.count})`)}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2 min-[400px]:flex-row">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5b]">
                  WhatsApp
                </a>
                <a href={callHref} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-gold-light">
                  <Icon name="phone" className="h-4 w-4" /> {p("Call to book", "වෙන්කිරීමට අමතන්න")}
                </a>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="mt-2 w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                {p("Close", "වසන්න")}
              </button>
              {t.email && (
                <a href={`mailto:${t.email}`} className="mt-2 block truncate text-center text-xs font-semibold text-brand-light hover:underline">{t.email}</a>
              )}
              {!t.phone && <p className="mt-2 text-center text-[11px] text-slate-500">{p("Bookings go through the TechLinks team at", "වෙන්කිරීම් TechLinks කණ්ඩායම හරහා සිදු වේ:")} {contactPhone.display}</p>}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
