"use client";

import { useSyncExternalStore } from "react";
import { dictionaries, type Key, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "techlinks-lang";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Lang {
  return localStorage.getItem(STORAGE_KEY) === "si" ? "si" : "en";
}

export function setLang(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

export function useLang() {
  const lang = useSyncExternalStore<Lang>(subscribe, getSnapshot, () => "en");
  return {
    lang,
    t: (key: Key) => dictionaries[lang][key],
    /** pick the English or Sinhala variant of a string */
    p: (en: string, si?: string) => (lang === "si" && si ? si : en),
  };
}
