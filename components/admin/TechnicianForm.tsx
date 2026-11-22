"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveTechnician, type SaveState } from "@/app/admin/actions";
import { categories, type Technician } from "@/lib/data";
import SmoothSelect from "./SmoothSelect";

const initial: SaveState = {};

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-[invalid=true]:border-red-400";
const label = "mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600";

export default function TechnicianForm({ technician }: { technician?: Technician }) {
  const [state, action, pending] = useActionState(saveTechnician, initial);
  const e = state.errors ?? {};
  // after a failed submit show what was typed, otherwise the technician being edited
  const v = (k: keyof Technician & string, fallback = ""): string =>
    state.values?.[k] ?? (technician?.[k] !== undefined ? String(technician[k]) : fallback);
  const err = (k: string) => (e[k] ? <p className="mt-1 text-xs font-semibold text-red-600">{e[k]}</p> : null);
  const bad = (k: string) => ({ "aria-invalid": Boolean(e[k]) });

  return (
    // key resets the inputs when switching between "add" and a different technician
    <form key={technician?.id ?? "new"} action={action} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="id" value={technician?.id ?? ""} />

      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" defaultValue={v("name")} placeholder="Nuwan Perera" className={field} {...bad("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="trade" className={label}>Job title</label>
        <input id="trade" name="trade" defaultValue={v("trade")} placeholder="Master Electrician" className={field} {...bad("trade")} />
        {err("trade")}
      </div>
      <div>
        <label htmlFor="category" className={label}>Category</label>
        <SmoothSelect
          id="category"
          name="category"
          defaultValue={v("category")}
          placeholder="Select a category"
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          invalid={Boolean(e.category)}
          className={field}
        />
        {err("category")}
      </div>
      <div>
        <label htmlFor="city" className={label}>City</label>
        <input id="city" name="city" defaultValue={v("city")} placeholder="Colombo" className={field} {...bad("city")} />
        {err("city")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" defaultValue={v("phone")} placeholder="+94 7X XXX XXXX" className={field} {...bad("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" defaultValue={v("email")} placeholder="name@example.com" className={field} {...bad("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="rate" className={label}>Rate</label>
        <input id="rate" name="rate" defaultValue={v("rate")} placeholder="Rs. 2,500/hr" className={field} {...bad("rate")} />
        {err("rate")}
      </div>
      <div>
        <label htmlFor="jobs" className={label}>Jobs completed</label>
        <input id="jobs" name="jobs" type="number" min={0} defaultValue={v("jobs", "0")} className={field} {...bad("jobs")} />
        {err("jobs")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bio" className={label}>Description <span className="font-normal normal-case text-slate-400">(optional)</span></label>
        <textarea id="bio" name="bio" rows={3} defaultValue={v("bio")} placeholder="Skills, experience, working hours..." className={`${field} resize-y`} {...bad("bio")} />
        {err("bio")}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" name="active" defaultChecked={technician ? technician.active !== false : true} className="h-4 w-4 accent-[#123a8f]" />
          Visible on website
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" name="featured" defaultChecked={technician?.featured ?? false} className="h-4 w-4 accent-[#123a8f]" />
          Featured on home page
        </label>
      </div>

      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={pending} className="rounded-full bg-gold px-7 py-2.5 text-sm font-bold text-brand-dark shadow-md shadow-gold/30 transition hover:bg-gold-light disabled:opacity-70">
          {pending ? "Saving..." : technician ? "Save changes" : "Add technician"}
        </button>
        {technician && (
          <Link href="/admin" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
