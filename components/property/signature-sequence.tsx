"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { StampCheck } from "@/components/illustrations/stamp-check";

/**
 * Séquence signature « action complétée » réutilisable :
 * chargement 2.2s → rapport sort du flou + tampon ✓ → enveloppe vole vers la pastille mail
 * → compteur boîte mail +1 pulse à 1.15s → toast 3.6s.
 *
 * Position absolue de l'enveloppe calculée en temps réel via getBoundingClientRect.
 *
 * @param triggerKey - increment cette valeur pour rejouer la séquence
 * @param report - data du rapport (valeur, loyer, rendement)
 * @param autoTriggerOnIntersection - démarre automatiquement quand visible (défaut: true)
 * @param size - "default" (home) | "large" (/estimation page)
 */

type ReportData = {
  vente: string;
  loyer: string;
  rendement: string;
};

export function SignatureSequence({
  triggerKey = 0,
  report = {
    vente: "418 000 – 432 000 €",
    loyer: "1 180 € / mois",
    rendement: "3,4 %",
  },
  inboxEmail = "villeurbanne@markusimmobilier.fr",
  autoTriggerOnIntersection = true,
  size = "default",
}: {
  triggerKey?: number;
  report?: ReportData;
  inboxEmail?: string;
  autoTriggerOnIntersection?: boolean;
  size?: "default" | "large";
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [toast, setToast] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const envelopeAnchorRef = useRef<HTMLDivElement>(null);
  const envelopeControls = useAnimationControls();

  const runningRef = useRef(false);
  const rafRef = useRef<number>(0);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const bumpInbox = useCallback(() => {
    setInboxCount((c) => c + 1);
    setPulse(true);
    timeoutsRef.current.push(window.setTimeout(() => setPulse(false), 340));
    setToast(true);
    timeoutsRef.current.push(window.setTimeout(() => setToast(false), 3600));
  }, []);

  const flyEnvelope = useCallback(() => {
    const anchor = envelopeAnchorRef.current;
    const inbox = inboxRef.current;
    if (!anchor || !inbox) return;
    const a = anchor.getBoundingClientRect();
    const i = inbox.getBoundingClientRect();
    const dx = i.left + i.width / 2 - (a.left + a.width / 2);
    const dy = i.top + i.height / 2 - (a.top + a.height / 2);

    envelopeControls.set({ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 0 });
    envelopeControls.start({
      opacity: [0, 1, 1, 1, 0],
      x: [0, 0, dx * 0.5, dx * 0.92, dx],
      y: [0, -10, dy * 0.5, dy * 0.92, dy],
      scale: [0.6, 1, 0.92, 0.45, 0.2],
      rotate: [0, 0, 6, 10, 12],
      transition: {
        duration: 1.5,
        times: [0, 0.12, 0.55, 0.9, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    });
  }, [envelopeControls]);

  const run = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearTimers();
    setProgress(0);
    setDone(false);
    setToast(false);
    envelopeControls.set({ opacity: 0, x: 0, y: 0, scale: 0.6, rotate: 0 });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(100);
      setDone(true);
      bumpInbox();
      runningRef.current = false;
      return;
    }

    const duration = 2200;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      setDone(true);
      timeoutsRef.current.push(
        window.setTimeout(() => {
          flyEnvelope();
          timeoutsRef.current.push(window.setTimeout(bumpInbox, 1150));
          runningRef.current = false;
        }, 80),
      );
    };
    rafRef.current = requestAnimationFrame(step);
  }, [bumpInbox, clearTimers, envelopeControls, flyEnvelope]);

  // Trigger via triggerKey change (external control)
  const lastTriggerRef = useRef(triggerKey);
  useEffect(() => {
    if (triggerKey !== lastTriggerRef.current) {
      lastTriggerRef.current = triggerKey;
      run();
    }
  }, [triggerKey, run]);

  // Auto-trigger on intersection
  useEffect(() => {
    if (!autoTriggerOnIntersection) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current && progress === 0) {
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTriggerOnIntersection]);

  useEffect(() => clearTimers, [clearTimers]);

  const isLarge = size === "large";

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ minHeight: isLarge ? "500px" : "auto" }}
    >
      {/* Inbox pill — toujours AU-DESSUS de la carte, jamais en collision */}
      <div className={isLarge ? "flex justify-center mb-10 max-md:mb-6" : "flex justify-end mb-5 max-md:mb-4"}>
        <div
          ref={inboxRef}
          className={
            isLarge
              ? "flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.22] rounded-full px-5 py-3 text-sm font-medium backdrop-blur-md"
              : "flex items-center gap-2.5 bg-anthracite/95 border border-white/20 rounded-full px-4 py-2.5 text-[13px] font-medium text-blanc shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          }
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="var(--color-sauge)"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span className="opacity-85">{inboxEmail}</span>
          <span
            className={[
              "min-w-[20px] h-5 rounded-full bg-sauge text-blanc text-[11px] font-bold grid place-items-center [transition:transform_0.3s_var(--ease)]",
              pulse ? "scale-150" : "",
            ].join(" ")}
          >
            {inboxCount}
          </span>
        </div>
      </div>

      {/* Rapport */}
      <div
        className={
          isLarge
            ? "relative bg-blanc rounded-[18px] p-10 max-md:p-7 text-anthracite max-w-[640px] mx-auto shadow-[0_40px_90px_rgba(0,0,0,0.45)] -rotate-[1deg]"
            : "relative bg-blanc rounded-[14px] p-[26px] text-anthracite shadow-[0_30px_70px_rgba(0,0,0,0.4)] -rotate-[1.5deg]"
        }
      >
        {/* gen header */}
        <div className="flex items-center justify-between mb-3.5">
          <span className={isLarge ? "text-[13px] uppercase tracking-[0.18em] text-sauge font-semibold" : "text-xs uppercase tracking-[0.14em] text-sauge font-semibold"}>
            {done ? "Rapport prêt ✓" : "Génération du rapport…"}
          </span>
          <span className={isLarge ? "text-base font-bold text-anthracite tabular-nums" : "text-[13px] font-bold text-anthracite tabular-nums"}>
            {progress}%
          </span>
        </div>
        {/* bar */}
        <div className={isLarge ? "h-2.5 rounded-md bg-gris overflow-hidden" : "h-2 rounded-md bg-gris overflow-hidden"}>
          <div
            className="h-full bg-gradient-to-r from-sauge to-sauge-hover rounded-md [transition:width_0.12s_linear]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* rows */}
        <div
          className={[
            "[transition:opacity_0.5s_var(--ease),filter_0.5s_var(--ease)]",
            isLarge ? "mt-7" : "mt-[18px]",
            done ? "opacity-100 blur-none" : "opacity-[0.28] blur-[2px]",
          ].join(" ")}
        >
          <Row big={isLarge} label="Valeur de vente estimée" value={report.vente} />
          <Row big={isLarge} label="Loyer mensuel estimé" value={report.loyer} />
          <Row
            big={isLarge}
            label="Taux de rendement brut"
            value={<span className="text-sauge">{report.rendement}</span>}
          />
        </div>

        {/* dl */}
        <div
          className={[
            "flex items-center gap-2 font-semibold text-sauge",
            isLarge ? "mt-7 text-sm" : "mt-[18px] text-xs",
            "[transition:all_0.45s_var(--ease)_0.1s]",
            done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5",
          ].join(" ")}
        >
          <svg viewBox="0 0 24 24" width={isLarge ? 18 : 15} height={isLarge ? 18 : 15} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
          Rapport PDF prêt — envoyé sur votre mail
        </div>

        {/* Tampon ✓ */}
        <div className={isLarge ? "absolute -top-5 -right-5 z-[8]" : "absolute -top-3 -right-3 z-[8]"}>
          <StampCheck size={isLarge ? 84 : 64} show={done} />
        </div>

        {/* Anchor invisible pour position de départ */}
        <div
          ref={envelopeAnchorRef}
          className={isLarge
            ? "absolute left-[48px] bottom-[80px] w-[46px] h-[34px] pointer-events-none opacity-0 max-md:hidden"
            : "absolute left-[34px] bottom-[60px] w-[46px] h-[34px] pointer-events-none opacity-0 max-md:hidden"}
          aria-hidden="true"
        />

        {/* Enveloppe animée */}
        <motion.div
          animate={envelopeControls}
          initial={{ opacity: 0, scale: 0.6 }}
          className={isLarge
            ? "absolute left-[48px] bottom-[80px] w-[46px] h-[34px] rounded-[5px] bg-blanc border border-anthracite/15 shadow-[0_10px_26px_rgba(0,0,0,0.28)] grid place-items-center z-[7] pointer-events-none max-md:hidden"
            : "absolute left-[34px] bottom-[60px] w-[46px] h-[34px] rounded-[5px] bg-blanc border border-anthracite/15 shadow-[0_10px_26px_rgba(0,0,0,0.28)] grid place-items-center z-[7] pointer-events-none max-md:hidden"}
          aria-hidden="true"
        >
          <span className="block w-[30px] h-[11px] border-2 border-sauge border-b-0 rounded-t-[3px] -translate-y-[3px]" />
        </motion.div>
      </div>

      {/* Toast */}
      <div
        className={[
          "fixed flex items-center gap-3 bg-blanc text-anthracite rounded-xl px-[18px] py-3.5",
          "shadow-[0_18px_50px_rgba(0,0,0,0.35)] z-[80] max-w-[300px]",
          "[transition:all_0.5s_var(--ease)]",
          "bottom-6 right-6 max-md:right-4 max-md:bottom-4",
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none",
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        <span className="w-[34px] h-[34px] rounded-full bg-sauge/20 grid place-items-center shrink-0">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-sauge)" strokeWidth="2.2">
            <path d="M5 12l5 5L20 6" />
          </svg>
        </span>
        <div>
          <div className="text-[13px] font-bold leading-tight">Rapport envoyé ✓</div>
          <div className="text-xs text-[#7a817f]">Vérifiez votre boîte mail</div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className={[
      "flex justify-between items-center border-b border-dashed border-[var(--bordure)]",
      big ? "py-3.5" : "py-[11px]",
    ].join(" ")}>
      <span className={big ? "text-[15px] text-[#5a6166]" : "text-[13px] text-[#5a6166]"}>
        {label}
      </span>
      <b className={big ? "text-[20px] font-bold" : "text-[17px] font-bold"}>{value}</b>
    </div>
  );
}
