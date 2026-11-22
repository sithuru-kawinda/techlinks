"use client";

import { useActionState } from "react";
import Icon from "./Icon";
import { useLang } from "./useLang";
import { errorSi, topicSi } from "@/lib/i18n";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

const topics = ["Find a technician", "Join as a technician", "Partnership or business", "Feedback or support", "Something else"];

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-[invalid=true]:border-red-400";
const label = "mb-1.5 block text-sm font-bold text-slate-700";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const { p } = useLang();

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold text-brand-dark">{p("Message sent", "පණිවිඩය යවන ලදී")}</h2>
        <p className="mt-2 max-w-sm text-slate-600">{p("Thanks for reaching out. We will get back to you as soon as we can.", "අප හා සම්බන්ධ වීම ගැන ස්තූතියි. අපට හැකි ඉක්මනින් ඔබට පිළිතුරු දෙන්නෙමු.")}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const err = (k: keyof typeof e) => (e[k] ? <p id={`${k}-err`} className="mt-1.5 text-xs font-semibold text-red-600">{p(e[k]!, errorSi[e[k]!])}</p> : null);
  const aria = (k: keyof typeof e) => ({ "aria-invalid": Boolean(e[k]), "aria-describedby": e[k] ? `${k}-err` : undefined });

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>{p("Full name", "සම්පූර්ණ නම")}</label>
        <input id="name" name="name" autoComplete="name" required defaultValue={v.name} placeholder={p("Your name", "ඔබේ නම")} className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className={label}>{p("Email", "ඊමේල්")}</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} placeholder="you@example.com" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>{p("Phone", "දුරකථන")} <span className="font-normal text-slate-400">({p("optional", "අත්‍යවශ්‍ය නොවේ")})</span></label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+94 7X XXX XXXX" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="topic" className={label}>{p("How can we help?", "අපට උදව් කළ හැක්කේ කෙසේද?")}</label>
        <select id="topic" name="topic" required defaultValue={v.topic ?? ""} className={field} {...aria("topic")}>
          <option value="" disabled>{p("Select a topic", "මාතෘකාවක් තෝරන්න")}</option>
          {topics.map((t) => <option key={t} value={t}>{p(t, topicSi[t])}</option>)}
        </select>
        {err("topic")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>{p("Message", "පණිවිඩය")}</label>
        <textarea id="message" name="message" rows={6} required defaultValue={v.message} placeholder={p("Tell us what you need...", "ඔබට අවශ්‍ය දේ අපට කියන්න...")} className={`${field} resize-y`} {...aria("message")} />
        {err("message")}
      </div>
      {e.form && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2">{p(e.form, errorSi[e.form])}</p>}
      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">{p("We only use your details to reply to this enquiry.", "ඔබේ විස්තර භාවිතා කරන්නේ මෙම විමසුමට පිළිතුරු දීමට පමණි.")}</p>
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70">
          {pending ? p("Sending...", "යවමින්...") : <>{p("Send message", "පණිවිඩය යවන්න")} <span aria-hidden="true">→</span></>}
        </button>
      </div>
    </form>
  );
}
