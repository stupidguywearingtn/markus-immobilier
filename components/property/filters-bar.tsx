"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PropertyFilters } from "@/lib/filter-properties";

/**
 * Barre de filtres sticky pour /annonces.
 * État stocké dans l'URL (searchParams) → partageable, retour navigateur, etc.
 * Mobile : bouton "Filtres" qui ouvre un drawer.
 */

const TYPES: Array<{ value: "all" | "vente" | "location"; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "vente", label: "Acheter" },
  { value: "location", label: "Louer" },
];

const ROOMS = [1, 2, 3, 4, 5];
const SORT_OPTIONS: Array<{ value: PropertyFilters["sort"]; label: string }> = [
  { value: "recent", label: "Plus récents" },
  { value: "price-asc", label: "Prix ↑" },
  { value: "price-desc", label: "Prix ↓" },
  { value: "surface-desc", label: "Surface ↓" },
];

export function FiltersBar({
  initial,
  resultsCount,
  totalCount,
}: {
  initial: PropertyFilters;
  resultsCount: number;
  totalCount: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateParams = useCallback(
    (mut: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(sp?.toString() || "");
      mut(params);
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `/annonces?${qs}` : "/annonces", { scroll: false });
      });
    },
    [router, sp],
  );

  const setType = (t: "all" | "vente" | "location") => {
    updateParams((p) => {
      if (t === "all") p.delete("type");
      else p.set("type", t);
    });
  };

  const toggleRoom = (r: number) => {
    updateParams((p) => {
      const current = new Set(
        (p.get("rooms") || "").split(",").filter(Boolean).map(Number),
      );
      if (current.has(r)) current.delete(r);
      else current.add(r);
      if (current.size) p.set("rooms", [...current].join(","));
      else p.delete("rooms");
    });
  };

  const setText = (key: string, value: string) => {
    updateParams((p) => {
      if (value) p.set(key, value);
      else p.delete(key);
    });
  };

  const setNum = (key: string, value: string) => {
    updateParams((p) => {
      const n = Number(value);
      if (value && !isNaN(n)) p.set(key, String(n));
      else p.delete(key);
    });
  };

  const setSort = (s: PropertyFilters["sort"]) => {
    updateParams((p) => {
      if (s && s !== "recent") p.set("sort", s);
      else p.delete("sort");
    });
  };

  const clearAll = () => {
    startTransition(() => router.replace("/annonces", { scroll: false }));
  };

  const activeType =
    initial.type === "vente" || initial.type === "location"
      ? initial.type
      : "all";
  const activeRooms = new Set(initial.rooms || []);

  // Vue Desktop + Mobile drawer partagent le même contenu (FilterControls)
  const FilterControls = (
    <div className="flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch max-md:gap-4">
      {/* Type — segmented control */}
      <div
        className="relative inline-flex items-center bg-gris rounded-full p-1 border border-[var(--bordure)]"
        role="tablist"
      >
        {TYPES.map((t) => {
          const isActive = activeType === t.value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setType(t.value)}
              className="relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors z-[1] cursor-pointer"
              style={{ color: isActive ? "#fff" : "var(--color-anthracite)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="segpill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-anthracite rounded-full shadow-[0_4px_14px_-4px_rgba(56,62,66,0.4)] z-[-1]"
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Localisation */}
      <label className="relative flex items-center max-md:w-full">
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="var(--color-sauge)"
          strokeWidth="1.8"
          className="absolute left-3 pointer-events-none"
          aria-hidden="true"
        >
          <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        <input
          type="text"
          placeholder="Lyon, Villeurbanne…"
          defaultValue={initial.q || ""}
          onChange={(e) => setText("q", e.target.value)}
          className="pl-9 pr-3 py-2 text-sm bg-blanc border border-[var(--bordure)] rounded-full w-[200px] max-md:w-full focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 transition"
        />
      </label>

      {/* Pièces — chips multi */}
      <div className="flex items-center gap-1.5 max-md:flex-wrap">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mr-2">
          Pièces
        </span>
        {ROOMS.map((r) => {
          const active = activeRooms.has(r);
          return (
            <button
              key={r}
              type="button"
              onClick={() => toggleRoom(r)}
              aria-pressed={active}
              className={[
                "w-8 h-8 rounded-full text-xs font-semibold transition-all cursor-pointer border",
                active
                  ? "bg-sauge text-blanc border-sauge shadow-[0_4px_12px_-4px_rgba(158,165,150,0.5)]"
                  : "bg-blanc text-anthracite border-[var(--bordure)] hover:border-sauge",
              ].join(" ")}
            >
              {r === 5 ? "5+" : r}
            </button>
          );
        })}
      </div>

      {/* Surface */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mr-1">
          m²
        </span>
        <input
          type="number"
          placeholder="Min"
          defaultValue={initial.surfaceMin ?? ""}
          onChange={(e) => setNum("surfaceMin", e.target.value)}
          className="w-16 px-2.5 py-2 text-sm bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 tabular-nums"
        />
        <span className="text-[#7a817f]">–</span>
        <input
          type="number"
          placeholder="Max"
          defaultValue={initial.surfaceMax ?? ""}
          onChange={(e) => setNum("surfaceMax", e.target.value)}
          className="w-16 px-2.5 py-2 text-sm bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 tabular-nums"
        />
      </div>

      {/* Budget */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mr-1">
          €
        </span>
        <input
          type="number"
          placeholder="Min"
          defaultValue={initial.budgetMin ?? ""}
          onChange={(e) => setNum("budgetMin", e.target.value)}
          className="w-24 px-2.5 py-2 text-sm bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 tabular-nums"
        />
        <span className="text-[#7a817f]">–</span>
        <input
          type="number"
          placeholder="Max"
          defaultValue={initial.budgetMax ?? ""}
          onChange={(e) => setNum("budgetMax", e.target.value)}
          className="w-24 px-2.5 py-2 text-sm bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 tabular-nums"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Barre desktop sticky */}
      <div className="sticky top-[80px] z-[40] bg-blanc/85 backdrop-blur-md border-b border-[var(--bordure)] -mx-8 max-md:-mx-5 px-8 max-md:px-5 py-4 mb-10">
        <div className="max-md:hidden">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {FilterControls}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] uppercase tracking-[0.12em] text-[#7a817f] hover:text-anthracite transition"
              >
                Tout effacer
              </button>
              <select
                defaultValue={initial.sort || "recent"}
                onChange={(e) =>
                  setSort(e.target.value as PropertyFilters["sort"])
                }
                className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge cursor-pointer"
                aria-label="Trier par"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value || ""}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-[#7a817f] tabular-nums">
            <b className="text-anthracite font-bold">{resultsCount}</b>{" "}
            {resultsCount > 1 ? "biens trouvés" : "bien trouvé"} sur {totalCount}
          </div>
        </div>

        {/* Mobile : bouton "Filtres" + sort */}
        <div className="md:hidden flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-anthracite text-blanc rounded-full text-xs font-semibold uppercase tracking-[0.08em]"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            Filtres · {resultsCount}/{totalCount}
          </button>
          <select
            defaultValue={initial.sort || "recent"}
            onChange={(e) => setSort(e.target.value as PropertyFilters["sort"])}
            className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] bg-blanc border border-[var(--bordure)] rounded-full focus:outline-none focus:border-sauge"
            aria-label="Trier par"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value || ""}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-anthracite/60 z-[60]"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-[70] bg-blanc rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.25)]"
              role="dialog"
              aria-label="Filtres"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">Filtres</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fermer"
                  className="w-8 h-8 grid place-items-center rounded-full hover:bg-gris"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              {FilterControls}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    clearAll();
                    setMobileOpen(false);
                  }}
                  className="flex-1 py-3 border border-[var(--bordure)] rounded-full text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  Tout effacer
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 bg-anthracite text-blanc rounded-full text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  Voir {resultsCount} bien{resultsCount > 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
