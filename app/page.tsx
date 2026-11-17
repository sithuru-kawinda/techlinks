import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import TechnicianCard from "@/components/TechnicianCard";
import { categories, stats, steps } from "@/lib/data";
import { getTechnicians } from "@/lib/store";

const stepIcons = ["search", "star", "phone", "check"] as const;

export default async function Home() {
  const featuredTechnicians = (await getTechnicians()).filter((t) => t.featured);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        <Image
          src="/hero.jpg"
          alt="A team of smiling technicians in blue uniforms and white hard hats"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        {/* strong white wash behind the text at the top, easing off so the team shows lower down */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_75%_at_50%_25%,rgba(255,255,255,0.95),rgba(239,246,255,0.8)_55%,rgba(239,246,255,0.35))]" />

        <div className="mx-auto flex max-w-4xl flex-col items-center justify-start px-5 pb-10 pt-8 text-center sm:px-8 sm:pt-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md min-[400px]:text-xs min-[400px]:tracking-[0.2em]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-gold-light" /> <span className="hidden min-[400px]:inline">TechLinks · </span>Verified Technicians
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            <span className="lg:whitespace-nowrap">Find The Right Technician In</span>
            <span className="block bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Minutes.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold text-slate-800">
            TechLinks connects you with verified electricians, plumbers, AC and solar specialists. Compare rated pros and book with confidence.
          </p>

          <form action="/technicians" className="mt-8 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/70 bg-white p-2 text-left shadow-2xl shadow-blue-900/20 sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center gap-2 px-3">
              <Icon name="search" className="h-5 w-5 text-brand" />
              <input name="q" placeholder="What do you need fixed?" className="w-full bg-transparent py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none" />
            </label>
            <label className="flex items-center gap-2 border-slate-200 px-3 sm:border-l">
              <Icon name="pin" className="h-5 w-5 text-brand" />
              <input name="city" placeholder="City" className="w-full bg-transparent py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none sm:w-28" />
            </label>
            <button className="rounded-xl bg-gold px-7 py-3 font-bold text-brand-dark transition hover:bg-gold-light">Search</button>
          </form>

          <dl className="mt-10 grid w-full max-w-xl grid-cols-3 divide-x divide-slate-300/70 rounded-2xl border border-white bg-white/90 py-4 shadow-xl backdrop-blur">
            {stats.map((s) => (
              <div key={s.label} className="px-2">
                <dt className="text-xl font-extrabold text-brand sm:text-3xl">{s.value}</dt>
                <dd className="text-xs font-semibold text-slate-700 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      
{/* Categories */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50/60 py-20">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="h-2 w-2 rounded-full bg-gold" /> Categories
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
              Browse By <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">Trade</span>
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-1 w-12 rounded-full bg-gold" />
              <span className="h-1 w-3 rounded-full bg-gold/50" />
              <span className="h-1 w-1.5 rounded-full bg-gold/30" />
            </div>
            <p className="mt-5 text-lg text-slate-600">
              Pick a service and see verified, rated professionals ready to help.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/technicians?category=${c.slug}`}
                className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-blue-900/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 group-hover:scale-x-100" />
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-light to-brand text-white shadow-md shadow-brand/30 transition duration-300 group-hover:from-gold-light group-hover:to-gold group-hover:text-brand-dark group-hover:shadow-gold/40">
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-brand-dark">{c.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.blurb}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">{c.count} pros</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-brand transition duration-300 group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white" aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-7 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white">
              View all technicians <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="relative isolate overflow-hidden bg-white py-20">
        {/* team photo on the right, fading out toward the left and the top */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-40 [mask-composite:intersect] [mask-image:linear-gradient(to_left,black,transparent_85%),linear-gradient(to_bottom,transparent,black_45%)] lg:w-3/5 lg:opacity-60">
          <Image
            src="/featured-bg.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="h-2 w-2 rounded-full bg-gold" /> Featured
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
              Top-Rated <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">Technicians</span>
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-1 w-12 rounded-full bg-gold" />
              <span className="h-1 w-3 rounded-full bg-gold/50" />
              <span className="h-1 w-1.5 rounded-full bg-gold/30" />
            </div>
            <p className="mt-5 text-lg text-slate-600">
              Hand-picked professionals with outstanding reviews and a proven track record.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTechnicians.map((t) => (
              <TechnicianCard key={t.id} t={t} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-7 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white">
              View all technicians <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-dark to-slate-950 py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-light/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-gold" /> How it works
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Hire a Pro in <span className="text-gold">Four Easy Steps</span>
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-1 w-12 rounded-full bg-gold" />
              <span className="h-1 w-3 rounded-full bg-gold/50" />
              <span className="h-1 w-1.5 rounded-full bg-gold/30" />
            </div>
            <p className="mt-5 text-lg text-blue-100/80">From first search to finished job, it takes minutes to get started.</p>
          </div>

          <ol className="relative mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {/* connector line between the step badges (desktop) */}
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-gold/40 lg:block" aria-hidden="true" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-white/10 bg-white/5 px-6 pb-8 pt-12 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white/10">
                <span className="absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-xl font-extrabold text-brand-dark shadow-lg shadow-gold/30 ring-4 ring-brand-dark">
                  {i + 1}
                </span>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold-light ring-1 ring-white/15">
                  <Icon name={stepIcons[i]} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-white to-blue-50/60 px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-dark to-[#061a4a] px-6 py-12 shadow-2xl shadow-blue-900/30 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-brand-light/40 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-10 -z-10 h-40 w-40 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-24 top-24 -z-10 h-64 w-64 rounded-full border border-white/10" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
                <span className="h-2 w-2 rounded-full bg-gold" /> For technicians
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Are You a <span className="text-gold">Skilled Technician?</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-blue-100/90">
                Join TechLinks and get discovered by customers looking for your skills.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light">
                  Join as a Technician <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
                  Talk to Us
                </Link>
              </div>
            </div>

            <ul className="space-y-4">
              {["Create your professional profile", "Get found by customers in your area", "Build your reputation with real reviews"].map((t) => (
                <li key={t} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-brand-dark">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-white">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
