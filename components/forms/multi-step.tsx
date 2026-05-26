"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Multi-step wrapper — pattern inspiré 21st.dev (AnimatePresence mode="wait" + spring).
 * Adapté à la DA Markus : puce sauge active, transition horizontale spring.
 */

export function StepIndicator({
  current,
  total,
  labels,
}: {
  current: number; // 1-indexed
  total: number;
  labels?: string[];
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-2 flex-1">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isDone = step < current;
          return (
            <div key={i} className="flex items-center gap-2 flex-1">
              {/* Puce */}
              <div
                className={cn(
                  "relative w-7 h-7 shrink-0 rounded-full grid place-items-center text-[11px] font-bold transition-all",
                  isActive
                    ? "bg-sauge text-blanc shadow-[0_4px_14px_-4px_rgba(158,165,150,0.6)]"
                    : isDone
                      ? "bg-anthracite text-blanc"
                      : "bg-blanc border border-[var(--bordure)] text-[#7a817f]",
                )}
              >
                {isDone ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                ) : (
                  step
                )}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-sauge"
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </div>
              {/* Trait */}
              {i < total - 1 && (
                <div className="flex-1 h-[2px] relative overflow-hidden rounded-full bg-[var(--bordure)]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-sauge rounded-full"
                    initial={false}
                    animate={{ width: step < current ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-[#7a817f] font-semibold tabular-nums whitespace-nowrap">
        Étape {current} / {total}
      </div>
    </div>
  );
}

/** Wrapper d'étape — gère la transition horizontale + spring. */
export function StepPanel({
  stepKey,
  children,
}: {
  stepKey: number | string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
