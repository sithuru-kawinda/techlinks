import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { contactPhone } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | TechLinks",
  description: "Questions, partnerships or want to list your services? Get in touch with the TechLinks team.",
};

const whatsapp = `https://wa.me/${contactPhone.href.replace("tel:+", "")}`;

const channels = [
  { icon: "phone", title: "Call us", body: "Speak to our team directly.", label: contactPhone.display, href: contactPhone.href },
  { icon: "phone", title: "WhatsApp", body: "Message us any time and we will reply.", label: "Chat on WhatsApp", href: whatsapp },
  { icon: "user", title: "Join as a technician", body: "List your services and get hired.", label: "Send an enquiry", href: "#enquiry" },
] as const;

const faqs = [
  { q: "How do I hire a technician?", a: "Browse or search the technician directory, pick someone who fits, then call or WhatsApp them to agree on a time." },
  { q: "How do I list my services?", a: "Choose “Join as a technician” in the form and tell us your trade and city. We will follow up with the next steps." },
  { q: "Are technicians verified?", a: "TechLinks focuses on verified professionals so you can hire with confidence." },
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
            <span className="h-2 w-2 rounded-full bg-gold" /> Contact
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s <span className="text-gold">Talk</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-medium text-white">Questions, partnerships or want to list your services? Reach out and we will get back to you.</p>
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
                  <span className="block font-extrabold text-brand-dark">{c.title}</span>
                  <span className="block text-sm text-slate-600">{c.body}</span>
                  <span className="mt-1.5 block text-sm font-bold text-brand-light">{c.label} <span aria-hidden="true">→</span></span>
                </span>
              </a>
            ))}
          </div>

          <div id="enquiry" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand/5 sm:p-10">
            <h2 className="text-2xl font-extrabold text-brand-dark">Send us a message</h2>
            <p className="mb-8 mt-1 text-sm text-slate-600">Fill in the form and we will reply as soon as we can.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="text-center text-4xl font-extrabold text-brand-dark sm:text-5xl">Common Questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:border-gold open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-brand-dark">
                  {f.q}
                  <span aria-hidden="true" className="text-xl text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            Looking for a pro right now? <Link href="/technicians" className="font-bold text-brand-light hover:underline">Find a technician →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
