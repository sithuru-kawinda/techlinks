"use client";

import { useLang } from "./useLang";

/** Inline English / Sinhala text for use inside server components. */
export default function Tr({ en, si }: { en: string; si?: string }) {
  return <>{useLang().p(en, si)}</>;
}
