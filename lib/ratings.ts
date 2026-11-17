"use client";

import { useCallback, useSyncExternalStore } from "react";

// Ratings start at 0 for every technician. With no backend yet they are kept in this browser's localStorage,
// so a rating is only visible on the device that gave it. Swap `read`/`write` for an API when one exists.
type Entry = { total: number; count: number; mine?: number };
type Store = Record<string, Entry>;

const KEY = "techlinks-ratings";
const EMPTY: Store = {};
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedStore: Store = EMPTY;

function read(): Store {
  const raw = localStorage.getItem(KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedStore = raw ? (JSON.parse(raw) as Store) : EMPTY;
    } catch {
      cachedStore = EMPTY;
    }
  }
  return cachedStore;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export type Rating = { average: number; count: number; mine: number };

const NONE: Rating = { average: 0, count: 0, mine: 0 };
const toRating = (e?: Entry): Rating => (e && e.count ? { average: e.total / e.count, count: e.count, mine: e.mine ?? 0 } : NONE);

export function useRating(id: string) {
  const store = useSyncExternalStore(subscribe, read, () => EMPTY);
  const entry = store[id];

  const rate = useCallback(
    (stars: number) => {
      const current = read();
      const prev = current[id] ?? { total: 0, count: 0 };
      // a browser has one vote per technician; rating again replaces the earlier vote
      const next: Entry = prev.mine
        ? { total: prev.total - prev.mine + stars, count: prev.count, mine: stars }
        : { total: prev.total + stars, count: prev.count + 1, mine: stars };
      localStorage.setItem(KEY, JSON.stringify({ ...current, [id]: next }));
      listeners.forEach((l) => l());
    },
    [id],
  );

  return { rating: toRating(entry), rate };
}
