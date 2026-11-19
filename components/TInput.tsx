"use client";

import type { InputHTMLAttributes } from "react";
import { useLang } from "./useLang";

/** A plain input whose placeholder follows the selected language. */
export default function TInput({ si, placeholder, ...rest }: InputHTMLAttributes<HTMLInputElement> & { si: string }) {
  return <input {...rest} placeholder={useLang().p(placeholder ?? "", si)} />;
}
