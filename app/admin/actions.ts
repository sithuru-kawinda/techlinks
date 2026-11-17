"use server";

import { randomUUID } from "crypto";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { categories, hues, type Technician } from "@/lib/data";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import { getAllTechnicians, TECHNICIANS_TAG, writeAll } from "@/lib/store";

export type LoginState = { error?: string };
export type SaveState = { errors?: Partial<Record<string, string>>; values?: Record<string, string> };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ok = checkPassword(text(formData, "password"));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 700)); // slow down guessing
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

// Every action re-checks the session; hiding the UI is not enough.
async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export async function saveTechnician(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();

  const id = text(formData, "id");
  const values = {
    name: text(formData, "name"),
    trade: text(formData, "trade"),
    category: text(formData, "category"),
    city: text(formData, "city"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    rate: text(formData, "rate"),
    jobs: text(formData, "jobs"),
    bio: text(formData, "bio"),
  };
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";

  const errors: NonNullable<SaveState["errors"]> = {};
  if (values.name.length < 2 || values.name.length > 80) errors.name = "Enter the technician's name.";
  if (values.trade.length < 2 || values.trade.length > 80) errors.trade = "Enter the job title, e.g. Master Electrician.";
  if (!categories.some((c) => c.slug === values.category)) errors.category = "Choose a category.";
  if (values.city.length < 2 || values.city.length > 60) errors.city = "Enter the city.";
  if (values.phone && !/^\+?[\d\s()-]{7,20}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.rate.length > 40) errors.rate = "Keep the rate under 40 characters.";
  const jobs = values.jobs ? Number(values.jobs) : 0;
  if (!Number.isInteger(jobs) || jobs < 0 || jobs > 100000) errors.jobs = "Enter a whole number.";
  if (values.bio.length > 500) errors.bio = "Keep the description under 500 characters.";
  if (Object.keys(errors).length) return { errors, values };

  const list = await getAllTechnicians();
  const existing = list.find((t) => t.id === id);
  if (id && !existing) return { errors: { name: "That technician no longer exists." }, values };

  const initials = values.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const record: Technician = {
    id: existing?.id ?? randomUUID().slice(0, 8),
    name: values.name,
    trade: values.trade,
    category: values.category as Technician["category"],
    city: values.city,
    jobs,
    rate: values.rate || "Contact for rate",
    initials,
    hue: existing?.hue ?? hues[list.length % hues.length],
    featured,
    active,
    ...(values.phone && { phone: values.phone }),
    ...(values.email && { email: values.email }),
    ...(values.bio && { bio: values.bio }),
  };

  await writeAll(existing ? list.map((t) => (t.id === record.id ? record : t)) : [...list, record]);
  updateTag(TECHNICIANS_TAG);
  redirect("/admin");
}

export async function deleteTechnician(id: string) {
  await requireAdmin();
  const list = await getAllTechnicians();
  await writeAll(list.filter((t) => t.id !== id));
  updateTag(TECHNICIANS_TAG);
  redirect("/admin");
}

export async function toggleActive(id: string) {
  await requireAdmin();
  const list = await getAllTechnicians();
  await writeAll(list.map((t) => (t.id === id ? { ...t, active: t.active === false } : t)));
  updateTag(TECHNICIANS_TAG);
  redirect("/admin");
}
