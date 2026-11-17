"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initial: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-slate-700">Admin password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={Boolean(state.error)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none transition focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-[invalid=true]:border-red-400"
        />
        {state.error && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{state.error}</p>}
      </div>
      <button type="submit" disabled={pending} className="w-full rounded-full bg-gold px-6 py-3 font-bold text-brand-dark shadow-lg shadow-gold/30 transition hover:bg-gold-light disabled:opacity-70">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
