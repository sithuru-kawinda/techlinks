import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, stats, steps } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | TechLinks",
  description: "TechLinks connects homes and businesses with verified electricians, plumbers, AC and solar specialists. Learn who we are and how we work.",
};

const values = [
  { icon: "check", title: "Verified Professionals", body: "We focus on skilled, vetted technicians so you can hire with confidence." },
  { icon: "star", title: "Honest Reviews", body: "Ratings and feedback from real customers help you choose the right person." },
  { icon: "phone", title: "Direct Contact", body: "Call or WhatsApp your pick directly. No middlemen, no waiting around." },
  { icon: "user", title: "Fair To Technicians", body: "We give skilled tradespeople a place to be found and build their reputation." },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark to-[#061a4a]">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image src="/about-banner.png" alt="" fill priority sizes="100vw" className="scale-110 object-cover object-center blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand/80 to-brand-dark/90" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-light/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-gold" /> About Us
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Connecting You With <span className="text-gold">Trusted Technicians</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-medium text-white">
            TechLinks makes it simple for homes and businesses to find skilled, verified professionals and get the job done right.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light">
              Find a Technician <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-10 px-5 sm:px-8">
        <dl className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-brand/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <dd className="text-4xl font-extrabold text-brand">{s.value}</dd>
              <dt className="mt-1 text-sm font-semibold text-slate-600">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">Who we are</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">Good Technicians Should Be Easy To Find</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              <p>
                Finding a reliable electrician, plumber or AC specialist usually means asking around and hoping for the best. TechLinks brings skilled
                technicians together in one place, so you can compare, contact and hire in minutes.
              </p>
              <p>
                We connect homes and businesses with verified professionals across electrical, plumbing, cooling, solar, security and appliance repair.
                Connect, hire, get it done.
              </p>
              <p>TechLinks is a Digital Grow Global platform.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold-light">
                <Icon name="bolt" className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-blue-100/90 sm:text-lg">To make hiring a trusted technician fast, transparent and stress-free for everyone.</p>
            </div>

            <div className="rounded-3xl border-2 border-gold/40 bg-amber-50/60 p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-brand-dark">
                <Icon name="star" className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl font-extrabold text-brand-dark sm:text-4xl">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">A place where every skilled technician is found, trusted and fairly rewarded for their work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50/60">
        <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">What we stand for</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">Built On Trust</h2>
            <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
              <span className="h-1 w-12 rounded-full bg-gold" />
              <span className="h-1 w-3 rounded-full bg-gold/50" />
              <span className="h-1 w-1.5 rounded-full bg-gold/30" />
            </div>
            <p className="mt-5 text-lg text-slate-600">Four promises that guide how we connect customers and technicians.</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                {/* top accent bar */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold" />
                {/* big faded number */}
                <span aria-hidden="true" className="absolute right-5 top-4 select-none text-7xl font-black leading-none text-slate-100">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-light text-white shadow-lg shadow-brand/30 ring-4 ring-blue-50">
                  <Icon name={v.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-brand-dark">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">How it works</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">From Search To Solved In Four Steps</h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-lg font-extrabold text-brand-dark">{i + 1}</span>
              <h3 className="mt-4 text-lg font-extrabold text-brand-dark">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-brand-dark to-[#041238]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-light">What we cover</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Trades You Can Rely On</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/technicians?category=${c.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-gold/60">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-light transition group-hover:bg-gold group-hover:text-brand-dark">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-white">{c.name}</span>
                  <span className="block text-sm text-blue-100/70">{c.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-center shadow-2xl shadow-brand/20 sm:px-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready To Get Started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100/90">Find a technician for your next job, or talk to us about listing your services.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light">
              Find a Technician <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
              Join as a Technician
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
