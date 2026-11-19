"use client";

import type { Key } from "@/lib/i18n";
import { useLang } from "./useLang";

/** Translated text for use inside server components. */
export default function T({ k }: { k: Key }) {
  return <>{useLang().t(k)}</>;
}
