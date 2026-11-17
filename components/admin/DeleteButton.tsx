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
      <button type="submit" className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50">
        Delete
      </button>
    </form>
  );
}
