import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-slate/60 transition focus:border-champagne focus:ring-2 focus:ring-champagne/30 outline-none";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-navy mb-1.5">
      {children}
      {required ? <span className="text-champagne ml-0.5">*</span> : null}
    </label>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClass, className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-28 resize-y", className)} {...props} />;
}

export function Field({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-slate">{hint}</p> : null}
    </div>
  );
}
