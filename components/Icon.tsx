import type { IconName } from "@/lib/data";

const paths: Record<IconName | "search" | "star" | "pin" | "check" | "user" | "phone", string> = {
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z",
  snow: "M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18M2 12h20",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1",
  cam: "M3 8h12v8H3zM15 11l6-3v8l-6-3",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-6 1.5 2.6 3-.6.6 3 2.6 1.5-1.7 2.5 1.7 2.5-2.6 1.5-.6 3-3-.6L12 21l-1.5-2.6-3 .6-.6-3-2.6-1.5L6 12 4.3 9.5l2.6-1.5.6-3 3 .6L12 3Z",
  search: "m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0",
};

export default function Icon({ name, className = "h-6 w-6" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
