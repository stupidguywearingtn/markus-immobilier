"use client";

import { motion } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/button";
import type { Comparable } from "@/lib/dvf";
import type {
  EstimationResult,
  TrendResult,
  PositioningResult,
  NeighborhoodResult,
  RentResult,
  ScoreResult,
} from "@/lib/estimation";
import type { LlmAnalysis } from "@/lib/llm";

/** Affichage du rapport complet — étapes 1-3 du build. */

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";
const eurPerSqm = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €/m²";
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
};

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ───────────────────────────────────────────────────────────────────────────

export function EstimationResultView({
  estimation,
  comparables,
  geo,
  subject,
  diagnostics,
  trend,
  positioning,
  neighborhood,
  rent,
  score,
  analysis,
}: {
  estimation: EstimationResult | null;
  comparables: Comparable[];
  geo: { lat: number; lon: number; commune?: string | null; postcode?: string | null; fallback: boolean };
  subject: { typeBien: string; surface?: number; adresse: string };
  diagnostics: { dvfError: boolean; radiusUsed: number; totalComparables: number; llmError?: string | null };
  trend?: TrendResult;
  positioning?: PositioningResult;
  neighborhood?: NeighborhoodResult;
  rent?: RentResult;
  score?: ScoreResult;
  analysis?: LlmAnalysis | null;
}) {
  if (!estimation) return <InsufficientData {...{ subject, geo, diagnostics }} />;

  const honoraires = computeHonoraires(estimation.basePrice, subject.typeBien);
  const netVendeur = estimation.basePrice - honoraires;

  return (
    <div className="space-y-6 max-w-[960px] mx-auto">
      {/* HEADER : fourchette */}
      <motion.section
        {...fadeIn(0)}
        className="bg-blanc rounded-[20px] p-10 max-md:p-7 text-anthracite shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)]"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
              Votre estimation
            </div>
            <div className="text-[#7a817f] text-sm">
              {subject.adresse}
              {geo.commune && ` — ${geo.commune}${geo.postcode ? ` (${geo.postcode})` : ""}`}
            </div>
          </div>
          <ConfidenceBadge score={estimation.confidence.score} label={estimation.confidence.label} />
        </div>

        <div className="mb-6">
          <div className="text-[clamp(32px,4.8vw,52px)] font-extrabold leading-none tracking-[-0.02em] mb-3">
            {eur(estimation.low)} <span className="text-sauge mx-2">—</span> {eur(estimation.high)}
          </div>
          <div className="text-sm text-[#7a817f]">
            Prix médian : <b className="text-anthracite">{eur(estimation.basePrice)}</b> ·{" "}
            <b className="text-anthracite">{eurPerSqm(estimation.pricePerSqmAdjusted)}</b>
            {subject.surface && <> · {subject.surface} m²</>}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[var(--bordure)]">
          <Stat label="€/m² secteur" value={eurPerSqm(estimation.pricePerSqmMedian)} />
          <Stat
            label="Ventes voisines"
            value={String(estimation.comparablesUsed)}
            hint={`Rayon ${estimation.radiusUsedMeters} m`}
          />
          <Stat label="Marge appliquée" value={`± ${eur(estimation.margin)}`} />
          <Stat
            label="Net vendeur estimé"
            value={eur(netVendeur)}
            hint="Hors honoraires Markus"
            accent
          />
        </div>

        <p className="text-xs text-[#7a817f] mt-5 italic">{estimation.confidence.reason}</p>
      </motion.section>

      {/* SCORE /100 + sous-scores */}
      {score && (
        <motion.section
          {...fadeIn(0.05)}
          className="bg-anthracite text-blanc rounded-[20px] p-8 max-md:p-6 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.35)]"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap mb-7">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
                Score du bien
              </div>
              <h4 className="font-bold text-xl">Note globale sur 100</h4>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[clamp(54px,7vw,84px)] font-extrabold leading-none tracking-[-0.02em]">
                {score.overall}
              </span>
              <span className="text-2xl font-light text-white/55">/100</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SubScore label="Emplacement" value={score.emplacement} />
            <SubScore label="État" value={score.etat} />
            <SubScore label="Rareté" value={score.rarete} />
            <SubScore label="Potentiel" value={score.potentiel} />
          </div>
        </motion.section>
      )}

      {/* POSITIONNEMENT */}
      {positioning && positioning.max > 0 && (
        <motion.section {...fadeIn(0.1)} className="bg-blanc rounded-[20px] p-8 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
            Positionnement
          </div>
          <h4 className="font-bold text-lg mb-6">
            Où se place votre bien sur le secteur
          </h4>
          <PositionBar
            min={positioning.min}
            p25={positioning.p25}
            median={positioning.median}
            p75={positioning.p75}
            max={positioning.max}
            subject={estimation.pricePerSqmAdjusted}
            percentile={positioning.subjectPercentile}
          />
        </motion.section>
      )}

      {/* AJUSTEMENTS — coefficients du bien */}
      {estimation.adjustmentsApplied.length > 0 && (
        <motion.section
          {...fadeIn(0.15)}
          className="bg-blanc rounded-[20px] p-7 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]"
        >
          <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-3">
            Ce qui pèse dans le prix
          </div>
          <h4 className="font-bold text-lg mb-5">Coefficients appliqués au bien</h4>
          <div className="flex flex-wrap gap-2">
            {estimation.adjustmentsApplied.map((a, i) => {
              const positive = a.pct >= 0;
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-medium border ${
                    positive ? "bg-sauge/10 text-sauge border-sauge/30" : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {a.name}
                  <b className="tabular-nums">
                    {positive ? "+" : ""}
                    {a.pct}%
                  </b>
                </span>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* CONTEXTE MARCHÉ : tendance + quartier vs commune */}
      {trend && neighborhood && trend.byYear.length > 0 && (
        <motion.section
          {...fadeIn(0.2)}
          className="bg-blanc rounded-[20px] p-8 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]"
        >
          <div className="flex items-end justify-between gap-3 mb-5 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
                Contexte de marché
              </div>
              <h4 className="font-bold text-lg">
                Évolution sur 5 ans · {trend.pct12m > 0 ? "+" : ""}{trend.pct12m}% sur 12 mois
              </h4>
            </div>
            <span className="text-[12px] text-[#7a817f]">Source : ventes réelles open data</span>
          </div>

          <TrendChart points={trend.byYear} />

          <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-[var(--bordure)]">
            <NeighborhoodCell label="Quartier" sublabel="< 500 m" value={neighborhood.quartier} />
            <NeighborhoodCell label="Proche" sublabel="500 – 1500 m" value={neighborhood.proche} />
            <NeighborhoodCell label="Commune" sublabel="entière" value={neighborhood.commune} />
          </div>
        </motion.section>
      )}

      {/* POTENTIEL LOCATIF */}
      {rent && (
        <motion.section
          {...fadeIn(0.25)}
          className="bg-blanc rounded-[20px] p-8 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]"
        >
          <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
            Potentiel locatif
          </div>
          <h4 className="font-bold text-lg mb-6">Si vous mettiez ce bien en location</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gris rounded-[14px] p-5">
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mb-1.5">
                Loyer mensuel estimé
              </div>
              <div className="text-2xl font-bold tabular-nums">{eur(rent.monthlyRent)}</div>
              <div className="text-[11px] text-[#9aa09d] mt-1">{rent.rentPerSqm} €/m² HC</div>
            </div>
            <div className="bg-sauge/10 border border-sauge/30 rounded-[14px] p-5">
              <div className="text-[10px] uppercase tracking-[0.12em] text-sauge font-semibold mb-1.5">
                Rendement brut
              </div>
              <div className="text-2xl font-bold tabular-nums text-sauge">{rent.yieldGross}%</div>
              <div className="text-[11px] text-[#7a817f] mt-1">
                Sur prix médian {eur(estimation.basePrice)}
              </div>
            </div>
            <div className="bg-gris rounded-[14px] p-5">
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mb-1.5">
                Rendement net estimé
              </div>
              <div className="text-2xl font-bold tabular-nums">{rent.yieldNet}%</div>
              <div className="text-[11px] text-[#9aa09d] mt-1">
                Après charges & taxes (~25%)
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#9aa09d] italic mt-4">{rent.source}</p>
        </motion.section>
      )}

      {/* ANALYSE EXPERT — LLM */}
      {analysis ? (
        <motion.section
          {...fadeIn(0.3)}
          className="bg-blanc rounded-[20px] p-8 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]"
        >
          <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
            Analyse Markus
          </div>
          <h4 className="font-bold text-xl mb-7">L'œil de l'expert</h4>

          <div className="space-y-7">
            {/* Synthèse en tête */}
            <div className="bg-gris rounded-[14px] p-6 max-md:p-5 border-l-[3px] border-sauge">
              <p className="text-[15px] leading-relaxed">{analysis.synthese}</p>
            </div>

            {/* Points forts / attention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BulletList
                title="Points forts"
                tone="positive"
                items={analysis.pointsForts}
              />
              <BulletList
                title="Points d'attention"
                tone="warning"
                items={analysis.pointsAttention}
              />
            </div>

            {/* Stratégie prix */}
            <div>
              <SectionLabel>Stratégie de prix</SectionLabel>
              <p className="text-[14px] leading-relaxed text-[#3d4347]">{analysis.strategiePrix}</p>
            </div>

            {/* Valorisations ROI */}
            <div>
              <SectionLabel>Valorisations à fort ROI</SectionLabel>
              <BulletList items={analysis.valorisations} tone="positive" />
            </div>

            {/* Profil acheteur + canaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <SectionLabel>Profil d'acheteur cible</SectionLabel>
                <p className="text-[14px] leading-relaxed text-[#3d4347]">{analysis.profilAcheteur}</p>
              </div>
              <div>
                <SectionLabel>Canaux de diffusion recommandés</SectionLabel>
                <BulletList items={analysis.canauxDiffusion} tone="neutral" />
              </div>
            </div>
          </div>
        </motion.section>
      ) : diagnostics.llmError ? (
        <motion.section {...fadeIn(0.3)} className="bg-blanc/5 rounded-[20px] p-6 text-white/70 text-sm border border-white/10">
          Analyse rédigée non disponible ({diagnostics.llmError}). Un conseiller Markus complétera l'analyse manuellement.
        </motion.section>
      ) : null}

      {/* COMPARABLES */}
      {comparables.length > 0 && (
        <motion.section
          {...fadeIn(0.35)}
          className="bg-blanc rounded-[20px] p-7 max-md:p-6 text-anthracite shadow-[0_18px_50px_-25px_rgba(56,62,66,0.12)]"
        >
          <div className="flex items-end justify-between gap-3 mb-5 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-sauge font-bold mb-2">
                Ventes réelles voisines
              </div>
              <h4 className="font-bold text-lg">{comparables.length} comparables récents</h4>
            </div>
            <span className="text-[12px] text-[#7a817f]">Open data — 36 derniers mois</span>
          </div>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold">
                  <th className="text-left py-2.5">Date</th>
                  <th className="text-left py-2.5">Adresse</th>
                  <th className="text-right py-2.5">Surface</th>
                  <th className="text-right py-2.5">Prix</th>
                  <th className="text-right py-2.5">€/m²</th>
                  <th className="text-right py-2.5">Distance</th>
                </tr>
              </thead>
              <tbody>
                {comparables.map((c, i) => (
                  <tr key={i} className="border-t border-[var(--bordure)] hover:bg-gris/60 transition-colors">
                    <td className="py-3 text-[#5a6166]">{formatDate(c.date)}</td>
                    <td className="py-3">
                      <span className="block max-w-[260px] truncate">
                        {c.numero ? `${c.numero} ` : ""}{c.voie ?? "—"}
                      </span>
                      <span className="text-[11px] text-[#9aa09d]">{c.commune}</span>
                    </td>
                    <td className="py-3 text-right tabular-nums">{c.surface} m²</td>
                    <td className="py-3 text-right tabular-nums font-semibold">{eur(c.prix)}</td>
                    <td className="py-3 text-right tabular-nums font-bold text-sauge">{eurPerSqm(c.pricePerSqm)}</td>
                    <td className="py-3 text-right tabular-nums text-[#7a817f]">{c.distanceMeters} m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <motion.section
        {...fadeIn(0.4)}
        className="bg-anthracite text-blanc rounded-[20px] p-8 max-md:p-7 text-center"
      >
        <h4 className="font-bold text-[clamp(20px,2.8vw,28px)] mb-2 leading-tight">
          Échangeons sur ce rapport avec un conseiller Markus.
        </h4>
        <p className="text-white/70 mb-6 text-sm max-w-[520px] mx-auto">
          Visite, stratégie de prix, plan de commercialisation — sans engagement.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/contact" variant="cta">
            Prendre rendez-vous
            <ArrowRight />
          </Button>
          <Button href="tel:0478371367" variant="ghost">
            Être rappelé · 04 78 37 13 67
          </Button>
        </div>
      </motion.section>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS
// ───────────────────────────────────────────────────────────────────────────

function InsufficientData({
  subject,
  geo,
  diagnostics,
}: {
  subject: { adresse: string };
  geo: { commune?: string | null };
  diagnostics: { dvfError: boolean; totalComparables: number };
}) {
  return (
    <div className="bg-blanc rounded-[20px] p-8 text-anthracite max-w-[820px] mx-auto">
      <h3 className="font-bold text-xl mb-3">Données insuffisantes</h3>
      <p className="text-[#5a6166] mb-4">
        {diagnostics.dvfError
          ? "Les données de ventes open data n'ont pas pu être récupérées. Un conseiller Markus vous rappellera."
          : `Trop peu de ventes voisines (${diagnostics.totalComparables}) — secteur peu liquide ou adresse imprécise.`}
      </p>
      <p className="text-sm text-[#7a817f]">
        Adresse : {subject.adresse}{geo.commune ? ` — ${geo.commune}` : ""}
      </p>
    </div>
  );
}

function ConfidenceBadge({ score, label }: { score: number; label: string }) {
  const tone =
    score >= 80
      ? "bg-sauge text-blanc"
      : score >= 60
        ? "bg-sauge/20 text-sauge border border-sauge/40"
        : score >= 40
          ? "bg-amber-500/15 text-amber-800 border border-amber-500/40"
          : "bg-red-500/15 text-red-700 border border-red-500/40";
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] ${tone}`}>
      <span className="w-2 h-2 rounded-full bg-current opacity-80" />
      Fiabilité {label}
    </span>
  );
}

function Stat({
  label, value, hint, accent,
}: { label: string; value: string; hint?: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold mb-1.5">{label}</div>
      <div className={`text-[16px] font-bold tabular-nums ${accent ? "text-sauge" : "text-anthracite"}`}>{value}</div>
      {hint && <div className="text-[11px] text-[#9aa09d] mt-0.5">{hint}</div>}
    </div>
  );
}

function SubScore({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/55 font-semibold mb-2">{label}</div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        <span className="text-xs text-white/40">/100</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sauge to-sauge-hover rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function PositionBar({
  min, p25, median, p75, max, subject, percentile,
}: { min: number; p25: number; median: number; p75: number; max: number; subject: number; percentile: number }) {
  const range = Math.max(1, max - min);
  const subjectPct = Math.max(0, Math.min(100, ((subject - min) / range) * 100));
  return (
    <div>
      <div className="flex justify-between text-[11px] text-[#7a817f] mb-2 uppercase tracking-[0.08em] font-semibold">
        <span>{eurPerSqm(min)}</span>
        <span>Médian : {eurPerSqm(median)}</span>
        <span>{eurPerSqm(max)}</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-amber-200 via-sauge/40 to-emerald-300" />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-7 -ml-2 bg-anthracite border-2 border-blanc rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
          style={{ left: `${subjectPct}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#9aa09d] mt-2 px-1">
        <span>p25 · {eurPerSqm(p25)}</span>
        <span>p75 · {eurPerSqm(p75)}</span>
      </div>
      <p className="text-sm text-[#5a6166] mt-5 leading-relaxed">
        Votre bien se positionne au{" "}
        <b className="text-anthracite">{percentile}ᵉ percentile</b> des ventes proches — ce qui le place{" "}
        {percentile < 40 && <span className="text-sauge font-semibold">en dessous de la médiane (marge de hausse possible)</span>}
        {percentile >= 40 && percentile < 60 && <span className="text-anthracite font-semibold">dans la médiane du secteur</span>}
        {percentile >= 60 && <span className="text-sauge font-semibold">au-dessus de la médiane (positionnement premium)</span>}
        .
      </p>
    </div>
  );
}

function TrendChart({ points }: { points: { year: number; medianEurM2: number; count: number }[] }) {
  if (points.length === 0) return null;
  const padding = { top: 16, right: 8, bottom: 28, left: 8 };
  const w = 720;
  const h = 180;
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;
  const ys = points.map((p) => p.medianEurM2);
  const yMin = Math.min(...ys) * 0.92;
  const yMax = Math.max(...ys) * 1.06;
  const yRange = Math.max(1, yMax - yMin);
  const x = (i: number) => padding.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => padding.top + innerH - ((v - yMin) / yRange) * innerH;

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.medianEurM2).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(points.length - 1).toFixed(1)} ${(padding.top + innerH).toFixed(1)} L${x(0).toFixed(1)} ${(padding.top + innerH).toFixed(1)} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[180px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-sauge)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-sauge)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#trend-fill)" />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--color-sauge)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((p, i) => (
          <g key={p.year}>
            <circle cx={x(i)} cy={y(p.medianEurM2)} r="4" fill="var(--color-sauge)" />
            <text
              x={x(i)}
              y={y(p.medianEurM2) - 10}
              textAnchor="middle"
              className="fill-anthracite text-[11px] font-bold tabular-nums"
            >
              {eurPerSqm(p.medianEurM2)}
            </text>
            <text
              x={x(i)}
              y={h - 8}
              textAnchor="middle"
              className="fill-[#7a817f] text-[10px] uppercase tracking-[0.08em] font-semibold"
            >
              {p.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function NeighborhoodCell({ label, sublabel, value }: { label: string; sublabel: string; value: number }) {
  return (
    <div className="bg-gris rounded-[12px] p-4 text-center">
      <div className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold">{label}</div>
      <div className="text-[10px] text-[#9aa09d] mb-1.5">{sublabel}</div>
      <div className="text-base font-bold tabular-nums">{value > 0 ? eurPerSqm(value) : "—"}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.16em] text-sauge font-bold mb-3">
      {children}
    </div>
  );
}

function BulletList({
  items, tone = "positive", title,
}: { items: string[]; tone?: "positive" | "warning" | "neutral"; title?: string }) {
  const dotColor =
    tone === "positive" ? "bg-sauge" : tone === "warning" ? "bg-amber-500" : "bg-anthracite/60";
  return (
    <div>
      {title && <SectionLabel>{title}</SectionLabel>}
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#3d4347]">
            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${dotColor}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function computeHonoraires(prix: number, typeBien: string): number {
  if (typeBien === "terrain" || typeBien === "local") return Math.round(prix * 0.05);
  if (prix < 25_000) return 2_000;
  if (prix < 50_000) return 5_000;
  if (prix < 170_001) return 9_000;
  if (prix < 300_001) return Math.round(prix * 0.06);
  if (prix < 500_001) return Math.round(prix * 0.05);
  if (prix < 700_001) return Math.round(prix * 0.04);
  if (prix < 1_000_001) return Math.round(prix * 0.035);
  return Math.round(prix * 0.03);
}
