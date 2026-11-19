"use client";

import { useLang } from "./useLang";

/** Inline English / Sinhala text for use inside server components. `siClass` applies only to the Sinhala text. */
export default function Tr({ en, si, siClass }: { en: string; si?: string; siClass?: string }) {
  const { lang, p } = useLang();
  if (lang === "si" && si && siClass) return <span className={siClass}>{si}</span>;
  return <>{p(en, si)}</>;
}
