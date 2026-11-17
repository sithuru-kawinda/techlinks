"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

// Re-runs the surrounding GET form as a client navigation whenever a field inside changes.
export default function AutoSubmit({ children, action }: { children: ReactNode; action: string }) {
  const router = useRouter();

  return (
    <div
      onChange={(e) => {
        const form = (e.target as HTMLInputElement).form;
        if (!form) return;
        const params = new URLSearchParams();
        new FormData(form).forEach((v, k) => {
          if (typeof v === "string" && v) params.append(k, v);
        });
        const qs = params.toString();
        router.push(qs ? `${action}?${qs}` : action, { scroll: false });
      }}
    >
      {children}
    </div>
  );
}
