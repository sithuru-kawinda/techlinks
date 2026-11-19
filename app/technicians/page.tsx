import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import AutoSubmit from "@/components/AutoSubmit";
import Autocomplete, { type Option } from "@/components/Autocomplete";
import TechnicianCard from "@/components/TechnicianCard";
import { categories } from "@/lib/data";
import { getTechnicians } from "@/lib/store";
import Tr from "@/components/Tr";

export const metadata: Metadata = {
  title: "Technicians | TechLinks",
  description: "Search and filter verified electricians, plumbers, AC, solar and security technicians.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const toList = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);
const first = (v: string | string[] | undefined) => toList(v)[0] ?? "";

export default function TechniciansPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <Listing searchParams={searchParams} />
    </Suspense>
  );
}

async function Listing({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const technicians = await getTechnicians();
  const q = first(sp.q).trim();
  const city = first(sp.city).trim();
  const selected = toList(sp.category);

  // suggestion lists for the search fields
  const skillOptions: Option[] = [];
  const seen = new Set<string>();
  const addSkill = (label: string, tag: string) => {
    if (!seen.has(label.toLowerCase())) {
      seen.add(label.toLowerCase());
      skillOptions.push({ label, tag });
    }
  };
  categories.forEach((c) => addSkill(c.name, "Category"));
  technicians.forEach((t) => addSkill(t.trade, "Skill"));
  technicians.forEach((t) => addSkill(t.name, "Technician"));
  const cityOptions: Option[] = [...new Set(technicians.map((t) => t.city))].sort().map((label) => ({ label }));

  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? "";
  const results = technicians.filter((t) => {
    const hay = `${t.name} ${t.trade} ${t.city} ${catName(t.category)}`.toLowerCase();
    return (
      (!q || hay.includes(q.toLowerCase())) &&
      (!city || t.city.toLowerCase().includes(city.toLowerCase())) &&
      (!selected.length || selected.includes(t.category))
    );
  });
  const filtered = Boolean(q || city || selected.length);

  return (
    <form action="/technicians">
      {/* Top banner + search bar */}
      <section className="relative isolate z-20 bg-gradient-to-br from-brand-dark to-[#061a4a]">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image src="/technicians-banner.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand/75 to-brand-dark/90" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-light/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-gold" /> <Tr en="Technicians" si="ශිල්පීන්" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            <Tr en="Find a" si="ශිල්පියෙකු" /> <span className="text-gold"><Tr en="Technician" si="සොයන්න" /></span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-medium text-white"><Tr en="Search by Categories or name, then narrow it down by trade and city." si="ප්‍රවර්ග හෝ නම අනුව සොයා, පසුව වෘත්තිය සහ නගරය අනුව පටු කරන්න." /></p>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 text-left shadow-2xl shadow-black/20 sm:flex-row sm:items-center">
            <Autocomplete key={`q-${q}`} name="q" defaultValue={q} placeholder="Search by Categories or name" placeholderSi="ප්‍රවර්ග හෝ නම අනුව සොයන්න" options={skillOptions} icon="search" className="flex-1" />
            <Autocomplete key={`city-${city}`} name="city" defaultValue={city} placeholder="City" placeholderSi="නගරය" options={cityOptions} icon="pin" className="border-slate-200 sm:w-52 sm:border-l" />
            <button className="rounded-xl bg-gold px-7 py-3 font-bold text-brand-dark transition hover:bg-gold-light"><Tr en="Search" si="සොයන්න" /></button>
          </div>
        </div>
      </section>

      <div className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr]">
          {/* Left: category ticks */}
          <aside key={JSON.stringify(sp)} className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <AutoSubmit action="/technicians">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-brand"><Tr en="Categories" si="ප්‍රවර්ග" /></h2>
            <ul className="mt-4 space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-blue-50">
                    <input type="checkbox" name="category" value={c.slug} defaultChecked={selected.includes(c.slug)} className="h-4 w-4 rounded accent-brand" />
                    <span className="text-sm font-medium text-slate-700"><Tr en={c.name} si={c.nameSi} /></span>
                  </label>
                </li>
              ))}
            </ul>
            </AutoSubmit>
            {filtered && (
              <Link href="/technicians" className="mt-5 block text-center text-sm font-semibold text-slate-500 hover:text-brand">
                <Tr en="Clear all filters" si="සියලු පෙරහන් ඉවත් කරන්න" />
              </Link>
            )}
          </aside>

          {/* Middle: technicians */}
          <section aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-2xl font-extrabold text-brand-dark"><Tr en="All Technicians" si="සියලුම ශිල්පීන්" /></h2>
              <p className="text-sm font-medium text-slate-600">
                <Tr en={`Showing ${results.length} of ${technicians.length} technicians`} si={`ශිල්පීන් ${technicians.length}න් ${results.length}ක් පෙන්වමින්`} />
              </p>
            </div>

            {results.length ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((t) => (
                  <TechnicianCard key={t.id} t={t} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-lg font-bold text-brand-dark"><Tr en="No technicians match your search" si="ඔබේ සෙවීමට ගැලපෙන ශිල්පීන් නැත" /></p>
                <p className="mt-2 text-slate-600"><Tr en="Try removing a filter or searching a different category or city." si="පෙරහනක් ඉවත් කිරීමට හෝ වෙනත් ප්‍රවර්ගයක් හෝ නගරයක් සෙවීමට උත්සාහ කරන්න." /></p>
                <Link href="/technicians" className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">
                  <Tr en="Clear all filters" si="සියලු පෙරහන් ඉවත් කරන්න" />
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </form>
  );
}

function Skeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-72 bg-brand-dark" />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr]">
        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
