import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { contactPhone } from "@/lib/data";
import Tr from "@/components/Tr";

export const metadata: Metadata = {
  title: "Contact Us | TechLinks",
  description: "Questions, partnerships or want to list your services? Get in touch with the TechLinks team.",
};

const whatsapp = `https://wa.me/${contactPhone.href.replace("tel:+", "")}`;

const channels = [
  { icon: "phone", title: "Call us", titleSi: "අපට අමතන්න", body: "Speak to our team directly.", bodySi: "අපගේ කණ්ඩායම සමඟ කෙලින්ම කතා කරන්න.", label: contactPhone.display, labelSi: contactPhone.display, href: contactPhone.href },
  { icon: "phone", title: "WhatsApp", titleSi: "WhatsApp", body: "Message us any time and we will reply.", bodySi: "ඕනෑම වේලාවක පණිවිඩයක් එවන්න, අපි පිළිතුරු දෙන්නෙමු.", label: "Chat on WhatsApp", labelSi: "WhatsApp හරහා කතා කරන්න", href: whatsapp },
  { icon: "user", title: "Join as a technician", titleSi: "ශිල්පියෙකු ලෙස සම්බන්ධ වන්න", body: "List your services and get hired.", bodySi: "ඔබේ සේවා ලැයිස්තුගත කර රැකියා ලබාගන්න.", label: "Send an enquiry", labelSi: "විමසුමක් යවන්න", href: "#enquiry" },
] as const;

const faqs = [
  { q: "How do I hire a technician?", a: "Browse or search the technician directory, pick someone who fits, then call or WhatsApp them to agree on a time.", qSi: "මම ශිල්පියෙකු කුලියට ගන්නේ කෙසේද?", aSi: "ශිල්පී නාමාවලිය බලා හෝ සොයා, ඔබට ගැලපෙන කෙනෙකු තෝරා, වේලාවක් එකඟ වීමට ඔවුන්ට අමතන්න හෝ WhatsApp කරන්න." },
  { q: "How do I list my services?", a: "Choose “Join as a technician” in the form and tell us your trade and city. We will follow up with the next steps.", qSi: "මගේ සේවා ලැයිස්තුගත කරන්නේ කෙසේද?", aSi: "පෝරමයේ “ශිල්පියෙකු ලෙස සම්බන්ධ වන්න” තෝරා ඔබේ වෘත්තිය සහ නගරය අපට කියන්න. අපි ඉදිරි පියවර සමඟ ඔබව සම්බන්ධ කරගන්නෙමු." },
  { q: "Are technicians verified?", a: "TechLinks focuses on verified professionals so you can hire with confidence.", qSi: "ශිල්පීන් සත්‍යාපිතද?", aSi: "ඔබට විශ්වාසයෙන් කුලියට ගත හැකි වන පරිදි TechLinks සත්‍යාපිත වෘත්තිකයන් කෙරෙහි අවධානය යොමු කරයි." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark to-[#061a4a]">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image src="/contact-banner.png" alt="" fill priority sizes="100vw" className="scale-110 object-cover object-center blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand/80 to-brand-dark/90" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-light/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-light ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-gold" /> <Tr en="Contact" si="සම්බන්ධ වන්න" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            <Tr en="Let’s" si="අපි" /> <span className="text-gold"><Tr en="Talk" si="කතා කරමු" /></span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-medium text-white"><Tr en="Questions, partnerships or want to list your services? Reach out and we will get back to you." si="ප්‍රශ්න, හවුල්කාරිත්ව හෝ ඔබේ සේවා ලැයිස්තුගත කිරීමට අවශ්‍යද? අප හා සම්බන්ධ වන්න, අපි ඔබව සම්බන්ධ කරගන්නෙමු." /></p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div className="space-y-4">
            {channels.map((c) => (
              <a key={c.title} href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:shadow-lg">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand transition group-hover:bg-gold group-hover:text-brand-dark">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-extrabold text-brand-dark"><Tr en={c.title} si={c.titleSi} /></span>
                  <span className="block text-sm text-slate-600"><Tr en={c.body} si={c.bodySi} /></span>
                  <span className="mt-1.5 block text-sm font-bold text-brand-light"><Tr en={c.label} si={c.labelSi} /> <span aria-hidden="true">→</span></span>
                </span>
              </a>
            ))}
          </div>

          <div id="enquiry" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand/5 sm:p-10">
            <h2 className="text-2xl font-extrabold text-brand-dark"><Tr en="Send us a message" si="අපට පණිවිඩයක් එවන්න" /></h2>
            <p className="mb-8 mt-1 text-sm text-slate-600"><Tr en="Fill in the form and we will reply as soon as we can." si="පෝරමය පුරවන්න, අපට හැකි ඉක්මනින් පිළිතුරු දෙන්නෙමු." /></p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="text-center text-4xl font-extrabold text-brand-dark sm:text-5xl"><Tr en="Common Questions" si="නිතර අසන ප්‍රශ්න" /></h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:border-gold open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-brand-dark">
                  <Tr en={f.q} si={f.qSi} />
                  <span aria-hidden="true" className="text-xl text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600"><Tr en={f.a} si={f.aSi} /></p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            <Tr en="Looking for a pro right now?" si="දැන්ම වෘත්තිකයෙකු සොයනවාද?" /> <Link href="/technicians" className="font-bold text-brand-light hover:underline"><Tr en="Find a technician" si="ශිල්පියෙකු සොයන්න" /> →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
