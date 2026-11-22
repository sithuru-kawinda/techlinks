"use client";

import { deleteTechnician } from "@/app/admin/actions";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteTechnician.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete ${name}? This removes them from the website.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 md:bg-transparent md:px-2.5 md:py-1.5 md:text-xs">
        Delete
      </button>
    </form>
  );
}
