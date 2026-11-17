import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DeleteButton from "@/components/admin/DeleteButton";
import LoginForm from "@/components/admin/LoginForm";
import TechnicianForm from "@/components/admin/TechnicianForm";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { categories } from "@/lib/data";
import { getAllTechnicians } from "@/lib/store";
import { logout, toggleActive } from "./actions";

export const metadata: Metadata = {
  title: "Admin | TechLinks",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-24 text-center text-slate-500 sm:px-8">Loading...</div>}>
      <Admin searchParams={searchParams} />
    </Suspense>
  );
}

async function Admin({ searchParams }: { searchParams: SearchParams }) {
  if (!adminConfigured()) {
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h1 className="text-xl font-extrabold text-brand-dark">Admin is not set up</h1>
          <p className="mt-2 text-sm text-slate-700">
            Add <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">ADMIN_PASSWORD=your-password</code> to <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">.env.local</code> and restart the server.
          </p>
        </div>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-brand/5 sm:p-10">
          <h1 className="text-2xl font-extrabold text-brand-dark">Admin sign in</h1>
          <p className="mb-6 mt-1 text-sm text-slate-600">Enter the admin password to manage technicians.</p>
          <LoginForm />
        </div>
      </Shell>
    );
  }

  const sp = await searchParams;
  const editId = typeof sp.edit === "string" ? sp.edit : undefined;
  const list = await getAllTechnicians();
  const editing = list.find((t) => t.id === editId);
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  const tiles = [
    { label: "Total technicians", value: list.length },
    { label: "Visible on site", value: list.filter((t) => t.active !== false).length },
    { label: "Featured", value: list.filter((t) => t.featured).length },
    { label: "Hidden", value: list.filter((t) => t.active === false).length },
  ];

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Add, edit and remove the technicians shown on the website.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/technicians" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white">View site</Link>
          <form action={logout}>
            <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-dark">Log out</button>
          </form>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <dd className="text-3xl font-extrabold text-brand">{t.value}</dd>
            <dt className="mt-1 text-sm font-semibold text-slate-600">{t.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid items-start gap-8 xl:grid-cols-[26rem_1fr]">
        <section id="form" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-28">
          <h2 className="mb-5 text-lg font-extrabold text-brand-dark">{editing ? `Edit ${editing.name}` : "Add a technician"}</h2>
          <TechnicianForm technician={editing} />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <h2 className="border-b border-slate-200 px-6 py-4 text-lg font-extrabold text-brand-dark">All technicians ({list.length})</h2>
          {list.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-bold">Technician</th>
                    <th className="px-3 py-3 font-bold">Category</th>
                    <th className="px-3 py-3 font-bold">City</th>
                    <th className="px-3 py-3 font-bold">Status</th>
                    <th className="px-6 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {list.map((t) => (
                    <tr key={t.id} className={t.id === editId ? "bg-amber-50/60" : undefined}>
                      <td className="px-6 py-3">
                        <p className="font-bold text-brand-dark">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.trade}{t.phone ? ` · ${t.phone}` : ""}</p>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{catName(t.category)}</td>
                      <td className="px-3 py-3 text-slate-600">{t.city}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.active === false ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
                          {t.active === false ? "Hidden" : "Visible"}
                        </span>
                        {t.featured && <span className="ml-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-gold-dark">Featured</span>}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin?edit=${t.id}#form`} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-brand transition hover:bg-blue-50">Edit</Link>
                          <form action={toggleActive.bind(null, t.id)}>
                            <button type="submit" className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100">
                              {t.active === false ? "Show" : "Hide"}
                            </button>
                          </form>
                          <DeleteButton id={t.id} name={t.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-10 text-center text-slate-600">No technicians yet. Add the first one using the form.</p>
          )}
        </section>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">{children}</div></div>;
}
