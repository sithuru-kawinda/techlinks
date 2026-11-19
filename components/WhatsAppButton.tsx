"use client";

import { contactPhone } from "@/lib/data";
import { useLang } from "./useLang";

const href = `https://wa.me/${contactPhone.href.replace("tel:+", "")}?text=${encodeURIComponent("Hi TechLinks, I need help finding a technician.")}`;

// Floating chat button, fixed to the bottom-right corner on every page.
export default function WhatsAppButton() {
  const { p } = useLang();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={p("Chat with us on WhatsApp", "WhatsApp හරහා අප හා කතා කරන්න")}
      className="group fixed bottom-5 right-4 z-40 flex items-center sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none mr-3 hidden whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        {p("Chat on WhatsApp", "WhatsApp හරහා කතා කරන්න")}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition group-hover:scale-110 group-hover:bg-[#1ebe5b]">
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 motion-reduce:hidden" />
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-8 w-8" aria-hidden="true">
          <path d="M16.003 3C8.83 3 3 8.827 3 15.994c0 2.29.6 4.527 1.737 6.5L3 29l6.66-1.713a12.97 12.97 0 0 0 6.34 1.62h.005C23.172 28.907 29 23.08 29 15.913 29 12.44 27.647 9.18 25.19 6.73A12.93 12.93 0 0 0 16.003 3Zm0 23.7h-.004a10.77 10.77 0 0 1-5.49-1.503l-.394-.234-3.953 1.017 1.055-3.853-.256-.396a10.74 10.74 0 0 1-1.65-5.74c0-5.95 4.84-10.79 10.797-10.79a10.72 10.72 0 0 1 7.63 3.164 10.73 10.73 0 0 1 3.157 7.634c-.003 5.95-4.843 10.7-10.892 10.7Zm5.917-8.083c-.324-.162-1.918-.946-2.215-1.054-.297-.108-.513-.162-.73.162-.216.324-.837 1.054-1.026 1.27-.19.216-.378.243-.702.081-.324-.162-1.369-.505-2.607-1.61-.964-.86-1.614-1.92-1.803-2.244-.19-.324-.02-.5.142-.66.146-.145.324-.378.486-.567.162-.19.216-.324.324-.54.108-.216.054-.405-.027-.567-.081-.162-.73-1.76-1-2.41-.264-.633-.531-.547-.73-.557l-.62-.011c-.216 0-.567.081-.864.405-.297.324-1.134 1.108-1.134 2.702s1.161 3.134 1.323 3.35c.162.216 2.285 3.49 5.535 4.893.774.334 1.377.533 1.848.683.777.247 1.484.212 2.043.129.623-.093 1.918-.784 2.188-1.54.27-.757.27-1.405.189-1.54-.081-.135-.297-.216-.62-.378Z" />
        </svg>
      </span>
    </a>
  );
}
