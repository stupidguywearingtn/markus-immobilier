"use client";

import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

/**
 * Primitives de formulaire — toutes accordées à la DA Markus
 * (anthracite/sauge, Montserrat, radius 10/30, focus ring sauge).
 */

/* ============ FormField : label + erreur ============ */
export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[12px] font-semibold uppercase tracking-[0.1em] text-anthracite"
        >
          {label}
          {required && <span className="text-sauge ml-0.5">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <span className="text-[12px] text-[#7a817f] italic">{hint}</span>
      )}
      {error && (
        <span className="text-[12px] text-red-600 font-medium" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ============ Input ============ */
const inputClass = cn(
  "h-11 px-4 bg-blanc border border-[var(--bordure)] rounded-[10px] text-[15px] text-anthracite",
  "placeholder:text-[#9aa09d]",
  "focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20",
  "transition-all duration-200",
  "disabled:opacity-50 disabled:cursor-not-allowed",
);

export const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      inputClass,
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      className,
    )}
    {...props}
  />
));
TextInput.displayName = "TextInput";

/* ============ Textarea ============ */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={4}
    className={cn(
      inputClass,
      "h-auto py-3 resize-y min-h-[110px]",
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

/* ============ Select (native, styled) ============ */
export const NativeSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(({ className, error, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        inputClass,
        "w-full appearance-none pr-10 cursor-pointer",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-anthracite"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
));
NativeSelect.displayName = "NativeSelect";

/* ============ RadioGroup (radix) ============ */
export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioOption = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
    description?: string;
  }
>(({ className, label, description, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group relative flex items-start gap-3 p-4 bg-blanc border border-[var(--bordure)] rounded-[12px] text-left cursor-pointer",
      "hover:border-sauge transition-all duration-200",
      "data-[state=checked]:border-sauge data-[state=checked]:bg-sauge/5 data-[state=checked]:shadow-[0_4px_14px_-6px_rgba(158,165,150,0.4)]",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 border-[var(--bordure)] grid place-items-center",
        "group-data-[state=checked]:border-sauge transition-colors",
      )}
    >
      <RadioGroupPrimitive.Indicator className="w-2.5 h-2.5 rounded-full bg-sauge" />
    </span>
    <span className="flex flex-col">
      <span className="text-[14px] font-semibold text-anthracite">{label}</span>
      {description && (
        <span className="text-[12px] text-[#7a817f] mt-0.5">{description}</span>
      )}
    </span>
  </RadioGroupPrimitive.Item>
));
RadioOption.displayName = "RadioOption";

/* ============ Slider (radix) ============ */
export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  return (
    <SliderPrimitive.Root
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex items-center select-none touch-none w-full h-6",
        className,
      )}
    >
      <SliderPrimitive.Track className="bg-[var(--bordure)] relative grow rounded-full h-1.5">
        <SliderPrimitive.Range className="absolute bg-gradient-to-r from-sauge to-sauge-hover rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block w-6 h-6 bg-blanc border-[3px] border-sauge rounded-full shadow-[0_6px_16px_-2px_rgba(158,165,150,0.6)]",
          "hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-sauge/30 transition-transform",
          "cursor-grab active:cursor-grabbing active:scale-95",
        )}
        aria-label="Slider"
      />
    </SliderPrimitive.Root>
  );
}

/* ============ Checkbox (native, styled "anti-robot") ============ */
export function CaptchaCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 px-5 py-4 bg-blanc border border-[var(--bordure)] rounded-[12px] cursor-pointer select-none",
        "hover:border-sauge transition-colors",
        checked && "border-sauge bg-sauge/5",
      )}
    >
      <span
        className={cn(
          "w-6 h-6 shrink-0 border-2 rounded grid place-items-center transition-all",
          checked
            ? "border-sauge bg-sauge"
            : "border-[var(--bordure)] bg-blanc",
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M5 12l5 5L20 6" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-anthracite">{label}</span>
    </label>
  );
}
