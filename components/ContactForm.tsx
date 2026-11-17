"use client";

import { useActionState } from "react";
import Icon from "./Icon";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

const topics = ["Find a technician", "Join as a technician", "Partnership or business", "Feedback or support", "Something else"];

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-[invalid=true]:border-red-400";
const label = "mb-1.5 block text-sm font-bold text-slate-700";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold text-brand-dark">Message sent</h2>
        <p className="mt-2 max-w-sm text-slate-600">Thanks for reaching out. We will get back to you as soon as we can.</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const err = (k: keyof typeof e) => (e[k] ? <p id={`${k}-err`} className="mt-1.5 text-xs font-semibold text-red-600">{e[k]}</p> : null);
  const aria = (k: keyof typeof e) => ({ "aria-invalid": Boolean(e[k]), "aria-describedby": e[k] ? `${k}-err` : undefined });

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>Full name</label>
        <input id="name" name="name" autoComplete="name" required defaultValue={v.name} placeholder="Your name" className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} placeholder="you@example.com" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone <span className="font-normal text-slate-400">(optional)</span></label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+94 7X XXX XXXX" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="topic" className={label}>How can we help?</label>
        <select id="topic" name="topic" required defaultValue={v.topic ?? ""} className={field} {...aria("topic")}>
          <option value="" disabled>Select a topic</option>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
        {err("topic")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" rows={6} required defaultValue={v.message} placeholder="Tell us what you need..." className={`${field} resize-y`} {...aria("message")} />
        {err("message")}
      </div>
      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">We only use your details to reply to this enquiry.</p>
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70">
          {pending ? "Sending..." : <>Send message <span aria-hidden="true">→</span></>}
        </button>
      </div>
    </form>
  );
}
