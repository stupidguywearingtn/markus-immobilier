"use client";

import { useCallback, useEffect, useState, useMemo, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextInput } from "@/components/forms/primitives";
import { ListingCard } from "@/components/radar/listing-card";
import { ListingDetail } from "@/components/radar/listing-detail";
import type { ScoredListing, SearchResponse } from "@/lib/radar/types";
import { hoursSince } from "@/lib/radar/time";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 15;
const HOT_WINDOW_HOURS = 48;

const MapView = dynamic(() => import("@/components/radar/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="h-[640px] max-md:h-[480px] rounded-[16px] bg-gris animate-pulse" />
  ),
});

type ViewMode = "list" | "map";
type TabKey = "private" | "pro";
type AgeFilter = "all" | "24h" | "48h" | "7j" | "30j";
type TypeFilter = "all" | "maison" | "appartement" | "terrain" | "autre";
type ScoreFilter = "all" | "hot" | "good";
type SortMode = "score" | "date" | "price_desc" | "price_asc";

function applyFilters(
  listings: ScoredListing[],
  age: AgeFilter,
  type: TypeFilter,
  score: ScoreFilter,
  sort: SortMode,
): ScoredListing[] {
  let out = listings;

  if (age !== "all") {
    const max = age === "24h" ? 1 : age === "48h" ? 2 : age === "7j" ? 7 : 30;
    out = out.filter((l) => l.daysOnline <= max);
  }

  if (type !== "all") {
    out = out.filter((l) => {
      const t = (l.realEstateType ?? "").toLowerCase();
      if (type === "maison") return t.includes("maison");
      if (type === "appartement") return t.includes("appartement");
      if (type === "terrain") return t.includes("terrain");
      return !t.includes("maison") && !t.includes("appartement") && !t.includes("terrain");
    });
  }

  if (score === "hot") out = out.filter((l) => l.score >= 65);
  else if (score === "good") out = out.filter((l) => l.score >= 45);

  const sorted = [...out];
  if (sort === "score") sorted.sort((a, b) => b.score - a.score);
  else if (sort === "date") sorted.sort((a, b) => a.daysOnline - b.daysOnline);
  else if (sort === "price_desc") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
  return sorted;
}

type SearchError = {
  message: string;
  httpStatus?: number | null;
  apifyBody?: string | null;
  hint?: string;
};

type InFlight = { city: string; source: "mock" | "apify" } | null;

export default function RadarPage() {
  const [city, setCity] = useState("");
  const [mode, setMode] = useState<"mock" | "apify">("mock");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SearchError | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [view, setView] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<ScoredListing | null>(null);
  const [inFlight, setInFlight] = useState<InFlight>(null);

  // Filtres client-side (Vendeur géré par tabs, pas dans la barre)
  const [age, setAge] = useState<AgeFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [score, setScore] = useState<ScoreFilter>("all");
  const [sort, setSort] = useState<SortMode>("score");

  // Tab actif (Particuliers par défaut — vue agent) + pagination
  const [tab, setTab] = useState<TabKey>("private");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const resetFilters = () => {
    setAge("all");
    setType("all");
    setScore("all");
    setSort("score");
  };

  const runSearch = useCallback(async (query: string, source: "mock" | "apify") => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setInFlight({ city: query.trim(), source });
    resetFilters();
    try {
      const res = await fetch(
        `/api/radar/search?city=${encodeURIComponent(query)}&source=${source}`,
        { cache: "no-store" },
      );
      if (res.status === 401) {
        setError({ message: "Session expirée. Rechargez la page." });
        return;
      }
      const json = (await res.json()) as
        | SearchResponse
        | { ok: true; pending: true; runId: string; datasetId: string; message?: string }
        | {
            ok: false;
            error: string;
            hint?: string;
            httpStatus?: number | null;
            apifyBody?: string | null;
          };

      if (!json.ok) {
        setError({
          message: ("error" in json ? json.error : null) ?? `HTTP ${res.status}`,
          httpStatus: "httpStatus" in json ? json.httpStatus : res.status,
          apifyBody: "apifyBody" in json ? json.apifyBody : null,
          hint: "hint" in json ? json.hint : undefined,
        });
        return;
      }

      if ("pending" in json && json.pending) {
        const { runId, datasetId } = json as {
          ok: true;
          pending: true;
          runId: string;
          datasetId: string;
        };
        const deadline = Date.now() + 5 * 60_000;
        while (Date.now() < deadline) {
          await new Promise((r) => setTimeout(r, 3000));
          const sRes = await fetch(
            `/api/radar/search/status?runId=${runId}&datasetId=${datasetId}&city=${encodeURIComponent(query)}`,
            { cache: "no-store" },
          );
          const sJson = (await sRes.json()) as
            | SearchResponse
            | { ok: true; pending: true }
            | { ok: false; error: string };
          if (!sJson.ok) {
            const m = "error" in sJson ? sJson.error : "scraper_failed";
            setError({ message: `Scraper Apify a échoué — ${m}` });
            return;
          }
          if ("pending" in sJson && sJson.pending) continue;
          setResult(sJson as SearchResponse);
          return;
        }
        setError({ message: "Délai dépassé (5 min). Réessaie ou réduis la requête." });
        return;
      }

      // DÉFENSE : en Live, on n'accepte JAMAIS un résultat de source mock
      const okJson = json as SearchResponse;
      if (source === "apify" && okJson.source !== "apify") {
        setError({
          message:
            "Réponse incohérente : recherche Live mais résultat de source mock. Annulé.",
        });
        return;
      }

      setResult(okJson);
    } catch (e) {
      setError({
        message: e instanceof Error ? `Erreur réseau — ${e.message}` : "Erreur réseau.",
      });
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    runSearch(city, mode);
  };

  // Changer de source (Démo ↔ Live) doit purger le résultat précédent,
  // sinon le badge "MODE DÉMO" reste affiché alors qu'on a basculé sur Live.
  // La nouvelle source ne sera réellement utilisée qu'au prochain clic Rechercher.
  useEffect(() => {
    setResult(null);
    setError(null);
  }, [mode]);

  const allListings = result?.listings ?? [];

  // Filtres appliqués (sans le filtre Vendeur — c'est le tab qui décide)
  const filtered = useMemo(
    () => applyFilters(allListings, age, type, score, sort),
    [allListings, age, type, score, sort],
  );

  // Découpage par type de vendeur (compteurs globaux post-filtres)
  const privateListings = useMemo(
    () => filtered.filter((l) => l.owner.type === "private"),
    [filtered],
  );
  const proListings = useMemo(
    () => filtered.filter((l) => l.owner.type === "pro"),
    [filtered],
  );

  // "À appeler aujourd'hui" — particuliers postés ≤ 48h
  const hotPrivate = useMemo(
    () => privateListings.filter((l) => hoursSince(l.publishedAt) <= HOT_WINDOW_HOURS),
    [privateListings],
  );
  const restPrivate = useMemo(
    () => privateListings.filter((l) => hoursSince(l.publishedAt) > HOT_WINDOW_HOURS),
    [privateListings],
  );

  // Liste affichée selon le tab actif (la section "Chaud" est séparée pour les particuliers)
  const currentList = tab === "private" ? restPrivate : proListings;
  const visibleList = currentList.slice(0, visibleCount);
  const hiddenCount = Math.max(0, currentList.length - visibleCount);

  // Reset pagination quand on change de tab / filtres / nouvelle recherche
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [tab, age, type, score, sort, result]);

  const hasResults = !!result && allListings.length > 0;
  const filtersActive = age !== "all" || type !== "all" || score !== "all";

  return (
    <>
      {/* HERO */}
      <section
        className="relative bg-anthracite text-blanc overflow-hidden"
        style={{
          paddingTop: "clamp(140px, 14vw, 170px)",
          paddingBottom: "clamp(40px, 6vw, 70px)",
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 30%, rgba(158,165,150,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 85% 70%, rgba(158,165,150,0.08) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5">
          <Eyebrow className="mb-3">Outil interne — équipe Markus</Eyebrow>
          <h1
            className="font-extrabold tracking-[-0.02em] leading-[1.05] mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Radar de <span className="grad-light">prospection</span>.
          </h1>
          <p className="text-blanc/85 max-w-[640px] mb-8 text-[16px] lg:text-lg leading-relaxed">
            Tape une ville, lance la recherche — on remonte les annonces en direct,
            on les croise avec le marché DVF, et on classe par opportunité.
          </p>

          {/* Barre de recherche */}
          <form onSubmit={onSubmit} className="flex gap-3 flex-wrap max-w-[720px]">
            <div className="relative flex-1 min-w-[220px]">
              <TextInput
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville ou code postal…"
                className="h-12 pl-11 bg-blanc text-anthracite border-0"
              />
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="var(--color-sauge)"
                strokeWidth="1.8"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <Button type="submit" variant="cta" disabled={loading || !city.trim()}>
              {loading ? "Recherche…" : "Rechercher"}
              <ArrowRight />
            </Button>
          </form>

          {/* Toggle Mock / Live — source des données */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-blanc/60">
              Source :
            </span>
            <div className="inline-flex bg-blanc/10 border border-blanc/25 rounded-[10px] p-1 gap-1">
              <button
                type="button"
                onClick={() => setMode("mock")}
                className={cn(
                  "px-4 py-2 rounded-[7px] text-[12.5px] font-semibold transition",
                  mode === "mock"
                    ? "bg-blanc text-anthracite shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]"
                    : "text-blanc/80 hover:text-blanc hover:bg-blanc/5",
                )}
              >
                Démo (test.json)
              </button>
              <button
                type="button"
                onClick={() => setMode("apify")}
                className={cn(
                  "px-4 py-2 rounded-[7px] text-[12.5px] font-semibold transition",
                  mode === "apify"
                    ? "bg-sauge text-blanc shadow-[0_2px_8px_-2px_rgba(158,165,150,0.6)]"
                    : "text-blanc/80 hover:text-blanc hover:bg-blanc/5",
                )}
              >
                Live (Leboncoin)
              </button>
            </div>
            {mode === "apify" && (
              <span className="text-[11px] text-sauge font-semibold uppercase tracking-[0.08em]">
                ● API Apify active
              </span>
            )}
          </div>

          {/* Status — état réel du flux Live/Démo */}
          <div className="mt-5 min-h-[24px] text-[13px] text-blanc/85">
            {/* Loading */}
            {loading && inFlight && (
              <div className="flex items-center gap-3 flex-wrap">
                <LoadingBar />
                <span className="font-semibold text-blanc">
                  {inFlight.source === "apify" ? (
                    <>
                      Appel <span className="text-sauge">Apify</span> pour «{" "}
                      {inFlight.city} »…
                    </>
                  ) : (
                    <>Recherche démo pour « {inFlight.city} »…</>
                  )}
                </span>
              </div>
            )}

            {/* État initial */}
            {!loading && !result && !error && (
              <span className="text-blanc/60">
                Lancez une recherche pour voir les annonces.
              </span>
            )}

            {/* Succès */}
            {!loading && result && (
              <span>
                <span className="text-sauge font-bold mr-1.5">✓</span>
                <b className="text-blanc">{result.count}</b> annonce
                {result.count > 1 ? "s" : ""} trouvée{result.count > 1 ? "s" : ""} pour «{" "}
                {result.city} »
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] border font-bold">
                  {result.source === "apify" ? (
                    <span className="text-sauge border-sauge/50 bg-sauge/15 px-2 py-0.5 rounded-full">
                      Source : Apify Live
                    </span>
                  ) : (
                    <span className="text-amber-200 border-amber-400/40 bg-amber-500/25 px-2 py-0.5 rounded-full">
                      Source : Démo locale
                    </span>
                  )}
                </span>
                {result.diagnostics?.dvfHits != null && (
                  <span className="text-blanc/75 ml-2 text-[12px]">
                    · DVF : {result.diagnostics.dvfHits}/{result.count}
                  </span>
                )}
              </span>
            )}

            {/* Erreur — détail HTTP + corps Apify visible */}
            {error && (
              <div className="mt-1 max-w-[820px] bg-red-500/10 border border-red-400/40 rounded-[10px] p-4 text-red-100">
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="text-red-300 font-bold text-[16px] leading-none mt-0.5">
                    ✗
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-red-100 text-[13px]">
                      Recherche échouée
                      {error.httpStatus != null && (
                        <span className="ml-1.5 text-red-200/90">
                          (HTTP {error.httpStatus})
                        </span>
                      )}
                    </div>
                    {error.hint && (
                      <div className="text-red-200/90 text-[12px] mt-0.5">{error.hint}</div>
                    )}
                    <div className="text-red-200/80 text-[12px] mt-0.5 font-mono break-all">
                      {error.message}
                    </div>
                  </div>
                </div>
                {error.apifyBody && (
                  <details className="mt-2 text-[11px]">
                    <summary className="cursor-pointer text-red-200/90 font-semibold uppercase tracking-[0.07em]">
                      Réponse brute d&apos;Apify
                    </summary>
                    <pre className="mt-2 bg-anthracite/60 border border-red-400/20 rounded-md p-2.5 text-red-100/90 whitespace-pre-wrap break-all max-h-[240px] overflow-y-auto font-mono">
                      {error.apifyBody}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BARRE DE FILTRES — sticky, apparaît dès qu'il y a des résultats */}
      {hasResults && (
        <div className="sticky top-0 z-20 bg-blanc border-b border-[var(--bordure)] shadow-[0_2px_16px_rgba(56,62,66,0.07)]">
          <div className="max-w-content mx-auto px-8 max-md:px-5">
            <div className="flex items-center gap-x-3 gap-y-2 py-3 flex-wrap">
              <FilterGroup
                options={[
                  { v: "all", label: "Toutes" },
                  { v: "24h", label: "24h" },
                  { v: "48h", label: "48h" },
                  { v: "7j", label: "7j" },
                  { v: "30j", label: "30j" },
                ]}
                value={age}
                onChange={(v) => setAge(v as AgeFilter)}
                accent
              />
              <Sep />
              <FilterGroup
                options={[
                  { v: "all", label: "Tous types" },
                  { v: "maison", label: "Maison" },
                  { v: "appartement", label: "Appart." },
                  { v: "terrain", label: "Terrain" },
                  { v: "autre", label: "Autre" },
                ]}
                value={type}
                onChange={(v) => setType(v as TypeFilter)}
              />
              <Sep />
              <FilterGroup
                options={[
                  { v: "all", label: "Tous scores" },
                  { v: "hot", label: "Chauds ≥65" },
                  { v: "good", label: "Bons ≥45" },
                ]}
                value={score}
                onChange={(v) => setScore(v as ScoreFilter)}
              />

              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-[#7a817f] font-semibold uppercase tracking-[0.07em]">
                  Tri
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="text-[12px] font-semibold text-anthracite bg-transparent border border-[var(--bordure)] rounded-[7px] px-2.5 py-1.5 cursor-pointer hover:border-anthracite/30 transition appearance-none pr-6"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a817f' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                  }}
                >
                  <option value="score">Score ↓</option>
                  <option value="date">Date ↓</option>
                  <option value="price_desc">Prix ↓</option>
                  <option value="price_asc">Prix ↑</option>
                </select>
              </div>
            </div>

            {/* Compteur dynamique */}
            <div className="pb-2.5 flex items-center gap-2 flex-wrap text-[12px] text-[#5a6166]">
              <span>
                <b className="text-anthracite">{filtered.length}</b> résultat
                {filtered.length > 1 ? "s" : ""}
              </span>
              <span className="text-[var(--bordure)] select-none">·</span>
              {hotPrivate.length > 0 && (
                <>
                  <span className="text-sauge font-bold">
                    {hotPrivate.length} à appeler aujourd&apos;hui
                  </span>
                  <span className="text-[var(--bordure)] select-none">·</span>
                </>
              )}
              <span>
                {privateListings.length} Particulier{privateListings.length > 1 ? "s" : ""}
              </span>
              <span className="text-[var(--bordure)] select-none">·</span>
              <span>
                {proListings.length} Agence{proListings.length > 1 ? "s" : ""}
              </span>
              {filtersActive && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 text-[11px] text-[#7a817f] hover:text-anthracite underline underline-offset-2 transition"
                >
                  Réinitialiser filtres
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTENU */}
      <section className="bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5 py-8 max-md:py-6">
          {/* État vide initial */}
          {!result && !loading && !error && (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gris mb-5">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-sauge)" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <p className="text-[#7a817f] text-[15px] max-w-[400px] mx-auto leading-relaxed">
                Entrez une ville et lancez la recherche — les annonces les plus prometteuses
                apparaîtront ici, classées par score d&apos;opportunité.
              </p>
            </div>
          )}

          {result && allListings.length === 0 && (
            <p className="text-[#7a817f] text-center py-16">
              Aucune annonce sur « {result.city} ». Essayez une autre ville.
            </p>
          )}

          {hasResults && filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#7a817f] text-[14px] mb-3">
                Aucune annonce ne correspond aux filtres actifs.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sauge text-[13px] font-semibold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {hasResults && filtered.length > 0 && (
            <>
              {/* Tabs Particuliers / Concurrents + toggle vue */}
              <div className="flex items-end justify-between gap-4 mb-6 flex-wrap border-b border-[var(--bordure)]">
                <div className="flex gap-1" role="tablist">
                  <TabButton
                    active={tab === "private"}
                    onClick={() => setTab("private")}
                    count={privateListings.length}
                    label="Particuliers"
                  />
                  <TabButton
                    active={tab === "pro"}
                    onClick={() => setTab("pro")}
                    count={proListings.length}
                    label="Concurrents (veille)"
                    secondary
                  />
                </div>
                <div className="pb-2">
                  <ViewToggle value={view} onChange={setView} />
                </div>
              </div>

              {/* VUE LISTE */}
              <div className={cn(view !== "list" && "hidden")}>
                {/* Section "À appeler aujourd'hui" — seulement sur tab Particuliers */}
                {tab === "private" && hotPrivate.length > 0 && (
                  <section className="mb-10">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="inline-flex w-2 h-2 rounded-full bg-sauge animate-pulse" />
                      <Eyebrow className="!text-sauge !m-0">
                        À appeler aujourd&apos;hui
                      </Eyebrow>
                      <span className="text-[12px] text-[#7a817f]">
                        · {hotPrivate.length} particulier{hotPrivate.length > 1 ? "s" : ""} posté
                        {hotPrivate.length > 1 ? "s" : ""} dans les 48 dernières heures
                      </span>
                    </div>
                    <div className="flex flex-col gap-5 max-md:gap-4">
                      {hotPrivate.map((l) => (
                        <ListingCard
                          key={l.id}
                          listing={l}
                          onOpen={setSelected}
                          selected={selected?.id === l.id}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Section principale du tab (rest des particuliers, ou tous les pros)
                    Cachée seulement si la section Chaud est déjà affichée ET qu'il n'y a rien
                    d'autre — sinon on affiche soit les cards, soit un message vide explicite. */}
                {!(tab === "private" && hotPrivate.length > 0 && currentList.length === 0) && (
                  <section>
                    {tab === "private" && hotPrivate.length > 0 && currentList.length > 0 && (
                      <div className="flex items-center gap-2.5 mb-4">
                        <Eyebrow className="!m-0">Plus anciens</Eyebrow>
                        <span className="text-[12px] text-[#7a817f]">
                          · {currentList.length} annonces postées il y a plus de 48h
                        </span>
                      </div>
                    )}
                    {tab === "pro" && currentList.length > 0 && (
                      <div className="flex items-center gap-2.5 mb-4">
                        <Eyebrow className="!m-0">Mandats agences</Eyebrow>
                        <span className="text-[12px] text-[#7a817f]">
                          · veille concurrentielle — opportunités de rachat de mandat
                        </span>
                      </div>
                    )}

                    {currentList.length === 0 ? (
                      <p className="text-[#7a817f] text-[14px] py-8 text-center">
                        {tab === "private"
                          ? "Aucun particulier pour cette recherche."
                          : "Aucune annonce d'agence pour cette recherche."}
                      </p>
                    ) : (
                      <>
                        <div className="flex flex-col gap-5 max-md:gap-4">
                          {visibleList.map((l) => (
                            <ListingCard
                              key={l.id}
                              listing={l}
                              onOpen={setSelected}
                              selected={selected?.id === l.id}
                            />
                          ))}
                        </div>
                        {hiddenCount > 0 && (
                          <div className="mt-8 flex justify-center">
                            <button
                              type="button"
                              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                              className="px-5 py-2.5 rounded-[10px] border border-[var(--bordure)] text-anthracite text-[12.5px] font-bold uppercase tracking-[0.08em] hover:border-anthracite/40 hover:bg-gris transition"
                            >
                              Voir plus ({hiddenCount} restante{hiddenCount > 1 ? "s" : ""})
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </section>
                )}
              </div>

              {/* VUE CARTE — gardée montée pour éviter de démonter Leaflet */}
              <div className={cn(view !== "map" && "hidden")}>
                <MapView
                  listings={tab === "private" ? privateListings : proListings}
                  selectedId={selected?.id ?? null}
                  onOpen={setSelected}
                />
                <div className="mt-4 flex items-center gap-4 flex-wrap text-[12px] text-[#7a817f]">
                  <Legend color="#9EA596" label="Hot (≥ 75)" />
                  <Legend color="#383E42" label="Bon (60–74)" />
                  <Legend color="#F59E0B" label="Moyen (45–59)" />
                  <Legend color="#9aa09d" label="Faible (< 45)" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <ListingDetail listing={selected} onClose={() => setSelected(null)} />
    </>
  );
}

/* ─── Composants utilitaires ─── */

function Sep() {
  return <div className="w-px h-4 bg-[var(--bordure)] shrink-0" />;
}

function TabButton({
  active,
  onClick,
  label,
  count,
  secondary = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  secondary?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative px-5 max-md:px-3.5 py-3 text-[13px] font-bold tracking-[-0.005em] transition",
        "after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:h-[2px] after:transition",
        active
          ? cn(
              "text-anthracite",
              secondary ? "after:bg-anthracite" : "after:bg-sauge",
            )
          : "text-[#7a817f] hover:text-anthracite after:bg-transparent",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "ml-2 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold tabular-nums",
          active
            ? secondary
              ? "bg-anthracite text-blanc"
              : "bg-sauge text-blanc"
            : "bg-gris text-[#7a817f]",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function FilterGroup({
  options,
  value,
  onChange,
  accent = false,
}: {
  options: { v: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((opt) => (
        <button
          key={opt.v}
          type="button"
          onClick={() => onChange(opt.v)}
          className={cn(
            "px-2.5 py-1 rounded-[6px] text-[11.5px] font-semibold transition whitespace-nowrap",
            value === opt.v
              ? accent
                ? "bg-sauge text-blanc"
                : "bg-anthracite text-blanc"
              : "text-[#5a6166] hover:text-anthracite hover:bg-gris",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="inline-flex bg-gris rounded-[10px] p-1 gap-1">
      {[
        { v: "list", label: "Liste", icon: <ListIcon /> },
        { v: "map", label: "Carte", icon: <MapIcon /> },
      ].map((opt) => (
        <button
          key={opt.v}
          type="button"
          onClick={() => onChange(opt.v as ViewMode)}
          className={cn(
            "px-4 py-2 rounded-[8px] text-[13px] font-semibold transition flex items-center gap-1.5",
            value === opt.v
              ? "bg-blanc text-anthracite shadow-[0_2px_8px_rgba(56,62,66,0.12)]"
              : "text-[#7a817f] hover:text-anthracite",
          )}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-3 h-3 rounded-full border-2 border-blanc shadow-[0_0_0_1px_var(--bordure)]"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

function LoadingBar() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-[180px] h-[3px] bg-blanc/15 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-sauge rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "70%", "100%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-[12px] uppercase tracking-[0.1em] font-semibold text-blanc/85">
        Recherche en cours…
      </span>
    </div>
  );
}
