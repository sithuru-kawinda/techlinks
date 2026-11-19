import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, stats, steps } from "@/lib/data";
import Tr from "@/components/Tr";

export const metadata: Metadata = {
  title: "About Us | TechLinks",
  description: "TechLinks connects homes and businesses with verified electricians, plumbers, AC and solar specialists. Learn who we are and how we work.",
};

const values = [
  { icon: "check", title: "Verified Professionals", body: "We focus on skilled, vetted technicians so you can hire with confidence.", titleSi: "සත්‍යාපිත වෘත්තිකයන්", bodySi: "ඔබට විශ්වාසයෙන් කුලියට ගත හැකි වන පරිදි අපි දක්ෂ, පරීක්ෂාගත ශිල්පීන් කෙරෙහි අවධානය යොමු කරමු." },
  { icon: "star", title: "Honest Reviews", body: "Ratings and feedback from real customers help you choose the right person.", titleSi: "අවංක සමාලෝචන", bodySi: "සැබෑ පාරිභෝගිකයන්ගේ ශ්‍රේණිගත කිරීම් සහ ප්‍රතිපෝෂණ නිවැරදි පුද්ගලයා තෝරාගැනීමට ඔබට උපකාරී වේ." },
  { icon: "phone", title: "Direct Contact", body: "Call or WhatsApp your pick directly. No middlemen, no waiting around.", titleSi: "සෘජු සම්බන්ධතාව", bodySi: "ඔබ තෝරාගත් අයට කෙලින්ම අමතන්න හෝ WhatsApp කරන්න. අතරමැදියන් නැත, බලා සිටීමක් නැත." },
  { icon: "user", title: "Fair To Technicians", body: "We give skilled tradespeople a place to be found and build their reputation.", titleSi: "ශිල්පීන්ට සාධාරණයි", bodySi: "දක්ෂ ශිල්පීන්ට සොයාගැනීමට සහ තම කීර්තිය ගොඩනගා ගැනීමට අපි ස්ථානයක් ලබා දෙමු." },
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
            <span className="h-2 w-2 rounded-full bg-gold" /> <Tr en="About Us" si="අප ගැන" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            <Tr en="Connecting You With" si="ඔබව සම්බන්ධ කරමු" /> <span className="text-gold"><Tr en="Trusted Technicians" si="විශ්වාසවන්ත ශිල්පීන් සමඟ" /></span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-medium text-white">
            <Tr en="TechLinks makes it simple for homes and businesses to find skilled, verified professionals and get the job done right." si="TechLinks මඟින් නිවාස සහ ව්‍යාපාරවලට දක්ෂ, සත්‍යාපිත වෘත්තිකයන් සොයාගෙන වැඩය නිවැරදිව කරගැනීම පහසු කරයි." />
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light">
              <Tr en="Find a Technician" si="ශිල්පියෙකු සොයන්න" /> <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
              <Tr en="Contact Us" si="අපව සම්බන්ධ කරගන්න" />
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
              <dt className="mt-1 text-sm font-semibold text-slate-600"><Tr en={s.label} si={s.labelSi} /></dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark"><Tr en="Who we are" si="අපි කවුද" /></p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl"><Tr en="Good Technicians Should Be Easy To Find" si="හොඳ ශිල්පීන් සොයාගැනීම පහසු විය යුතුයි" /></h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              <p>
                <Tr en="Finding a reliable electrician, plumber or AC specialist usually means asking around and hoping for the best. TechLinks brings skilled technicians together in one place, so you can compare, contact and hire in minutes." si="විශ්වාසදායක විදුලි කාර්මිකයෙකු, ජල නළ කාර්මිකයෙකු හෝ AC විශේෂඥයෙකු සොයාගැනීම යනු සාමාන්‍යයෙන් අවට විමසා හොඳම දේ බලාපොරොත්තු වීමයි. TechLinks මඟින් දක්ෂ ශිල්පීන් එක් තැනකට රැස් කරන බැවින්, ඔබට විනාඩි කිහිපයකින් සසඳා, සම්බන්ධ වී, කුලියට ගත හැක." />
              </p>
              <p>
                <Tr en="We connect homes and businesses with verified professionals across electrical, plumbing, cooling, solar, security and appliance repair. Connect, hire, get it done." si="විදුලි, ජල නළ, සිසිලන, සූර්ය බලශක්ති, ආරක්ෂණ සහ ගෘහ උපකරණ අලුත්වැඩියා යන ක්ෂේත්‍රවල සත්‍යාපිත වෘත්තිකයන් සමඟ අපි නිවාස සහ ව්‍යාපාර සම්බන්ධ කරමු. සම්බන්ධ වන්න, කුලියට ගන්න, වැඩේ ඉවර කරගන්න." />
              </p>
              <p><Tr en="TechLinks is a Digital Grow Global platform." si="TechLinks යනු Digital Grow Global වේදිකාවකි." /></p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold-light">
                <Icon name="bolt" className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl"><Tr en="Our Mission" si="අපේ මෙහෙවර" /></h3>
              <p className="mt-3 text-base leading-relaxed text-blue-100/90 sm:text-lg"><Tr en="To make hiring a trusted technician fast, transparent and stress-free for everyone." si="විශ්වාසවන්ත ශිල්පියෙකු කුලියට ගැනීම සැමට වේගවත්, විනිවිදභාවයෙන් යුත් සහ ආතතිය රහිත කිරීම." /></p>
            </div>

            <div className="rounded-3xl border-2 border-gold/40 bg-amber-50/60 p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-brand-dark">
                <Icon name="star" className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl font-extrabold text-brand-dark sm:text-4xl"><Tr en="Our Vision" si="අපේ දැක්ම" /></h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg"><Tr en="A place where every skilled technician is found, trusted and fairly rewarded for their work." si="සෑම දක්ෂ ශිල්පියෙකුම සොයාගන්නා, විශ්වාස කරන සහ ඔවුන්ගේ වැඩට සාධාරණ ප්‍රතිලාභ ලබන ස්ථානයක්." /></p>
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark"><Tr en="What we stand for" si="අප නියෝජනය කරන දේ" /></p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl"><Tr en="Built On Trust" si="විශ්වාසය මත ගොඩනැගුණු" /></h2>
            <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
              <span className="h-1 w-12 rounded-full bg-gold" />
              <span className="h-1 w-3 rounded-full bg-gold/50" />
              <span className="h-1 w-1.5 rounded-full bg-gold/30" />
            </div>
            <p className="mt-5 text-lg text-slate-600"><Tr en="Four promises that guide how we connect customers and technicians." si="පාරිභෝගිකයන් සහ ශිල්පීන් සම්බන්ධ කරන ආකාරය මෙහෙයවන පොරොන්දු හතරක්." /></p>
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
                <h3 className="mt-6 text-xl font-extrabold text-brand-dark"><Tr en={v.title} si={v.titleSi} /></h3>
                <p className="mt-3 leading-relaxed text-slate-600"><Tr en={v.body} si={v.bodySi} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark"><Tr en="How it works" si="ක්‍රියා කරන ආකාරය" /></p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl"><Tr en="From Search To Solved In Four Steps" si="සෙවීමේ සිට විසඳුම දක්වා පියවර හතරකින්" /></h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-lg font-extrabold text-brand-dark">{i + 1}</span>
              <h3 className="mt-4 text-lg font-extrabold text-brand-dark"><Tr en={s.title} si={s.titleSi} /></h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600"><Tr en={s.body} si={s.bodySi} /></p>
            </li>
          ))}
        </ol>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-brand-dark to-[#041238]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-light"><Tr en="What we cover" si="අප ආවරණය කරන දේ" /></p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"><Tr en="Trades You Can Rely On" si="ඔබට විශ්වාස කළ හැකි වෘත්තීන්" /></h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/technicians?category=${c.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-gold/60">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-light transition group-hover:bg-gold group-hover:text-brand-dark">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-white"><Tr en={c.name} si={c.nameSi} /></span>
                  <span className="block text-sm text-blue-100/70"><Tr en={c.blurb} si={c.blurbSi} /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-center shadow-2xl shadow-brand/20 sm:px-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl"><Tr en="Ready To Get Started?" si="ආරම්භ කිරීමට සූදානම්ද?" /></h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100/90"><Tr en="Find a technician for your next job, or talk to us about listing your services." si="ඔබේ ඊළඟ වැඩය සඳහා ශිල්පියෙකු සොයන්න, නැතහොත් ඔබේ සේවා ලැයිස්තුගත කිරීම ගැන අප සමඟ කතා කරන්න." /></p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/technicians" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light">
              <Tr en="Find a Technician" si="ශිල්පියෙකු සොයන්න" /> <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
              <Tr en="Join as a Technician" si="ශිල්පියෙකු ලෙස සම්බන්ධ වන්න" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
