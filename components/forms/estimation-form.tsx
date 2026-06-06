"use client";

/**
 * Formulaire d'estimation intelligent — Étape 1 du build.
 * Réf : /reference/specs-estimation.md §2 (formulaire conditionnel).
 *
 * 5 étapes, champs qui s'adaptent au type de bien.
 * Validation rhf + zod, par étape. BAN autocomplete sur l'étape "adresse".
 * À la soumission : trigger la SignatureSequence existante (mock report tant
 * que le pipeline DVF/LLM des étapes suivantes n'est pas branché).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/button";
import {
  Field,
  TextInput,
  NativeSelect,
  RadioGroup,
  RadioOption,
  CaptchaCheckbox,
} from "@/components/forms/primitives";
import { StepIndicator, StepPanel } from "@/components/forms/multi-step";
import { SignatureSequence } from "@/components/property/signature-sequence";
import { EstimationResultView } from "@/components/property/estimation-result";
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
import { cn } from "@/lib/utils";

// ───────────────────────────────────────────────────────────────────────────
// SCHEMA
// ───────────────────────────────────────────────────────────────────────────

const TYPE_BIEN = ["appartement", "maison", "terrain", "immeuble", "local"] as const;
const ETAT = ["a_renover", "travaux", "bon", "refait", "neuf"] as const;
const ANNEE = ["avant_1948", "1948_1970", "1971_2000", "apres_2000"] as const;
const DPE = ["A", "B", "C", "D", "E", "F", "G", "unknown"] as const;
const EXTERIEUR = ["aucun", "balcon", "terrasse", "loggia"] as const;
const EXPOSITION = ["nord", "sud", "est", "ouest", "traversant"] as const;
const TYPE_MAISON = ["plain_pied", "etage", "mitoyenne", "individuelle"] as const;
const OBJECTIF = ["vendre", "louer", "estimer", "investir"] as const;
const DELAI = ["lt3", "3a6", "6a12", "pas_presse"] as const;
const QUALITE = ["proprietaire", "locataire", "futur_acquereur", "curieux"] as const;

const ATOUTS = [
  "Cuisine équipée",
  "Parquet",
  "Cheminée",
  "Belle hauteur sous plafond",
  "Lumineux",
  "Calme",
  "Vue dégagée",
  "Refait récemment",
];
const ANNEXES = ["parking", "garage", "cave"] as const;

const schema = z.object({
  typeBien: z.enum(TYPE_BIEN),

  surface: z.coerce.number().positive().max(5000).optional(),
  surfaceTerrain: z.coerce.number().positive().max(100000).optional(),
  pieces: z.coerce.number().int().positive().max(30).optional(),
  chambres: z.coerce.number().int().min(0).max(20).optional(),
  etage: z.coerce.number().int().min(-2).max(50).optional(),
  ascenseur: z.boolean().optional(),
  exterieur: z.enum(EXTERIEUR).optional(),
  surfaceExterieur: z.coerce.number().min(0).max(2000).optional(),
  exposition: z.enum(EXPOSITION).optional(),
  annexes: z.array(z.enum(ANNEXES)).default([]),
  chargesCopro: z.coerce.number().min(0).optional(),

  niveaux: z.coerce.number().int().positive().max(10).optional(),
  typeMaison: z.enum(TYPE_MAISON).optional(),
  piscine: z.boolean().optional(),
  jardin: z.coerce.number().min(0).optional(),
  combles: z.boolean().optional(),

  constructible: z.boolean().optional(),
  viabilise: z.boolean().optional(),
  zone: z.string().optional(),

  etat: z.enum(ETAT).optional(),
  anneeConstruction: z.enum(ANNEE).optional(),
  dpe: z.enum(DPE).optional(),
  atouts: z.array(z.string()).default([]),

  adresse: z.string().min(5, "Adresse requise"),
  adresseLat: z.number().optional(),
  adresseLng: z.number().optional(),
  adresseCommune: z.string().optional(),
  adresseCodePostal: z.string().optional(),
  adresseInsee: z.string().optional(),

  objectif: z.enum(OBJECTIF),
  delai: z.enum(DELAI),
  qualite: z.enum(QUALITE),

  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  rgpd: z.literal(true, { message: "Consentement requis" }),
});

type FormData = z.infer<typeof schema>;

const TYPE_BIEN_LABEL: Record<(typeof TYPE_BIEN)[number], { label: string; description: string }> = {
  appartement: { label: "Appartement", description: "Studio, T2, T3+ en copropriété" },
  maison: { label: "Maison", description: "Plain-pied, étage, mitoyenne" },
  terrain: { label: "Terrain", description: "Constructible ou non" },
  immeuble: { label: "Immeuble", description: "Immeuble de rapport" },
  local: { label: "Local commercial", description: "Bureau, boutique, entrepôt" },
};
const ETAT_LABEL: Record<(typeof ETAT)[number], string> = {
  a_renover: "À rénover",
  travaux: "Travaux à prévoir",
  bon: "Bon état",
  refait: "Refait à neuf",
  neuf: "Neuf",
};
const ANNEE_LABEL: Record<(typeof ANNEE)[number], string> = {
  avant_1948: "Avant 1948",
  "1948_1970": "1948 – 1970",
  "1971_2000": "1971 – 2000",
  apres_2000: "Après 2000",
};
const EXPOSITION_LABEL: Record<(typeof EXPOSITION)[number], string> = {
  nord: "Nord", sud: "Sud", est: "Est", ouest: "Ouest", traversant: "Traversant",
};
const TYPE_MAISON_LABEL: Record<(typeof TYPE_MAISON)[number], string> = {
  plain_pied: "Plain-pied", etage: "À étage", mitoyenne: "Mitoyenne", individuelle: "Individuelle",
};
const OBJECTIF_LABEL: Record<(typeof OBJECTIF)[number], string> = {
  vendre: "Vendre", louer: "Mettre en location", estimer: "Estimer la valeur", investir: "Investissement",
};
const DELAI_LABEL: Record<(typeof DELAI)[number], string> = {
  lt3: "Moins de 3 mois", "3a6": "3 à 6 mois", "6a12": "6 à 12 mois", pas_presse: "Pas pressé",
};
const QUALITE_LABEL: Record<(typeof QUALITE)[number], string> = {
  proprietaire: "Propriétaire", locataire: "Locataire", futur_acquereur: "Futur acquéreur", curieux: "Curieux",
};

function fieldsForStep(step: number, typeBien: (typeof TYPE_BIEN)[number] | undefined): (keyof FormData)[] {
  if (step === 1) return ["typeBien"];
  if (step === 2) {
    if (typeBien === "appartement")
      return ["surface", "pieces", "etage", "etat", "anneeConstruction"];
    if (typeBien === "maison")
      return ["surface", "surfaceTerrain", "chambres", "niveaux", "typeMaison", "etat", "anneeConstruction"];
    if (typeBien === "terrain") return ["surfaceTerrain"];
    if (typeBien === "immeuble" || typeBien === "local") return ["surface", "etat", "anneeConstruction"];
    return [];
  }
  if (step === 3) return ["adresse"];
  if (step === 4) return ["objectif", "delai", "qualite"];
  if (step === 5) return ["prenom", "nom", "email", "telephone", "rgpd"];
  return [];
}

// ───────────────────────────────────────────────────────────────────────────
// BAN autocomplete
// ───────────────────────────────────────────────────────────────────────────

type BanFeature = {
  properties: {
    label: string;
    city: string;
    postcode: string;
    citycode: string;
  };
  geometry: { coordinates: [number, number] }; // [lng, lat]
};

function useBanAutocomplete(query: string) {
  const [results, setResults] = useState<BanFeature[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }
    const abort = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`,
          { signal: abort.signal },
        );
        if (!res.ok) throw new Error("BAN error");
        const data = (await res.json()) as { features: BanFeature[] };
        setResults(data.features ?? []);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      abort.abort();
    };
  }, [query]);

  return { results, loading };
}

// ───────────────────────────────────────────────────────────────────────────
// FORM
// ───────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

export function EstimationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<{
    estimation: EstimationResult | null;
    comparables: Comparable[];
    geo: { lat: number; lon: number; commune?: string | null; postcode?: string | null; fallback: boolean };
    diagnostics: { dvfError: boolean; radiusUsed: number; totalComparables: number; llmError?: string | null };
    trend?: TrendResult;
    positioning?: PositioningResult;
    neighborhood?: NeighborhoodResult;
    rent?: RentResult;
    score?: ScoreResult;
    analysis?: LlmAnalysis | null;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    mode: "onTouched",
    defaultValues: {
      typeBien: "appartement",
      atouts: [],
      annexes: [],
      objectif: "vendre",
      delai: "3a6",
      qualite: "proprietaire",
      ascenseur: false,
      piscine: false,
      combles: false,
      constructible: false,
      viabilise: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const typeBien = watch("typeBien");
  const etage = watch("etage");

  const goNext = useCallback(async () => {
    const ok = await trigger(fieldsForStep(step, typeBien));
    if (!ok) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }, [step, typeBien, trigger]);

  const goBack = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "send_failed");
      setApiResult({
        estimation: json.estimation,
        comparables: json.comparables ?? [],
        geo: json.geo,
        diagnostics: json.diagnostics,
        trend: json.trend,
        positioning: json.positioning,
        neighborhood: json.neighborhood,
        rent: json.rent,
        score: json.score,
        analysis: json.analysis,
      });
      setSubmitted(true);
      setRunKey((k) => k + 1);
    } catch {
      setSubmitError("Envoi impossible. Réessayez ou appelez le 04 78 37 13 67.");
    }
  };

  if (submitted) {
    const d = watch();
    const formatEur = (n: number) =>
      new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";
    const report = apiResult?.estimation
      ? {
          vente: `${formatEur(apiResult.estimation.low)} – ${formatEur(apiResult.estimation.high)}`,
          loyer: "—",
          rendement: "—",
        }
      : { vente: "Calcul en cours…", loyer: "—", rendement: "—" };

    return (
      <div className="max-w-[920px] mx-auto space-y-12">
        <SignatureSequence
          triggerKey={runKey}
          inboxEmail={d.email}
          autoTriggerOnIntersection={false}
          size="large"
          report={report}
        />
        {apiResult && (
          <EstimationResultView
            estimation={apiResult.estimation}
            comparables={apiResult.comparables}
            geo={apiResult.geo}
            subject={{ typeBien: d.typeBien, surface: d.surface, adresse: d.adresse }}
            diagnostics={apiResult.diagnostics}
            trend={apiResult.trend}
            positioning={apiResult.positioning}
            neighborhood={apiResult.neighborhood}
            rent={apiResult.rent}
            score={apiResult.score}
            analysis={apiResult.analysis}
          />
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-blanc rounded-[20px] p-10 max-md:p-6 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)] max-w-[820px] mx-auto"
    >
      <StepIndicator current={step} total={TOTAL_STEPS} />

      <StepPanel stepKey={`step-${step}`}>
        {step === 1 && (
          <div>
            <StepTitle
              eyebrow="Étape 1 / 5"
              title="Quel type de bien souhaitez-vous estimer ?"
              hint="On adapte les questions suivantes au type que vous choisissez."
            />
            <Controller
              control={control}
              name="typeBien"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {TYPE_BIEN.map((t) => (
                    <RadioOption
                      key={t}
                      value={t}
                      label={TYPE_BIEN_LABEL[t].label}
                      description={TYPE_BIEN_LABEL[t].description}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.typeBien && (
              <p className="mt-4 text-[12px] text-red-600">{errors.typeBien.message}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <StepTitle
              eyebrow="Étape 2 / 5"
              title="Les caractéristiques du bien"
              hint={`Quelques infos sur votre ${TYPE_BIEN_LABEL[typeBien].label.toLowerCase()}.`}
            />

            {typeBien === "appartement" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Surface (m², loi Carrez)" required error={errors.surface?.message} htmlFor="surface">
                  <TextInput id="surface" type="number" inputMode="numeric" placeholder="65" {...register("surface")} error={!!errors.surface} />
                </Field>
                <Field label="Nombre de pièces" required error={errors.pieces?.message} htmlFor="pieces">
                  <TextInput id="pieces" type="number" inputMode="numeric" placeholder="3" {...register("pieces")} error={!!errors.pieces} />
                </Field>
                <Field label="Chambres" error={errors.chambres?.message} htmlFor="chambres">
                  <TextInput id="chambres" type="number" inputMode="numeric" placeholder="2" {...register("chambres")} />
                </Field>
                <Field label="Étage" required error={errors.etage?.message} htmlFor="etage">
                  <TextInput id="etage" type="number" inputMode="numeric" placeholder="3" {...register("etage")} error={!!errors.etage} />
                </Field>
                {Number(etage) > 0 && (
                  <Field label="Ascenseur ?" htmlFor="ascenseur" className="md:col-span-2">
                    <YesNoToggle
                      value={watch("ascenseur") ?? false}
                      onChange={(v) => setValue("ascenseur", v, { shouldDirty: true })}
                    />
                  </Field>
                )}
                <Field label="Extérieur" htmlFor="exterieur">
                  <NativeSelect id="exterieur" {...register("exterieur")}>
                    <option value="aucun">Aucun</option>
                    <option value="balcon">Balcon</option>
                    <option value="terrasse">Terrasse</option>
                    <option value="loggia">Loggia</option>
                  </NativeSelect>
                </Field>
                <Field label="Surface extérieur (m²)" htmlFor="surfaceExterieur">
                  <TextInput id="surfaceExterieur" type="number" inputMode="numeric" placeholder="8" {...register("surfaceExterieur")} />
                </Field>
                <Field label="Exposition" htmlFor="exposition" className="md:col-span-2">
                  <PillGroup
                    options={EXPOSITION.map((e) => ({ value: e, label: EXPOSITION_LABEL[e] }))}
                    value={watch("exposition")}
                    onChange={(v) => setValue("exposition", v as (typeof EXPOSITION)[number], { shouldDirty: true })}
                  />
                </Field>
                <Field label="Annexes" htmlFor="annexes" className="md:col-span-2">
                  <PillGroup
                    multi
                    options={ANNEXES.map((a) => ({ value: a, label: a[0].toUpperCase() + a.slice(1) }))}
                    value={watch("annexes") ?? []}
                    onChange={(v) => setValue("annexes", v as (typeof ANNEXES)[number][], { shouldDirty: true })}
                  />
                </Field>
                <Field label="Charges de copro (€/mois)" htmlFor="chargesCopro">
                  <TextInput id="chargesCopro" type="number" inputMode="numeric" placeholder="120" {...register("chargesCopro")} />
                </Field>
              </div>
            )}

            {typeBien === "maison" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Surface habitable (m²)" required error={errors.surface?.message} htmlFor="surface">
                  <TextInput id="surface" type="number" inputMode="numeric" placeholder="120" {...register("surface")} error={!!errors.surface} />
                </Field>
                <Field label="Surface du terrain (m²)" required error={errors.surfaceTerrain?.message} htmlFor="surfaceTerrain">
                  <TextInput id="surfaceTerrain" type="number" inputMode="numeric" placeholder="500" {...register("surfaceTerrain")} error={!!errors.surfaceTerrain} />
                </Field>
                <Field label="Pièces" htmlFor="pieces">
                  <TextInput id="pieces" type="number" inputMode="numeric" placeholder="5" {...register("pieces")} />
                </Field>
                <Field label="Chambres" required error={errors.chambres?.message} htmlFor="chambres">
                  <TextInput id="chambres" type="number" inputMode="numeric" placeholder="3" {...register("chambres")} error={!!errors.chambres} />
                </Field>
                <Field label="Nombre de niveaux" required error={errors.niveaux?.message} htmlFor="niveaux">
                  <TextInput id="niveaux" type="number" inputMode="numeric" placeholder="2" {...register("niveaux")} error={!!errors.niveaux} />
                </Field>
                <Field label="Type de maison" required error={errors.typeMaison?.message} htmlFor="typeMaison">
                  <NativeSelect id="typeMaison" {...register("typeMaison")} error={!!errors.typeMaison}>
                    <option value="">Sélectionnez…</option>
                    {TYPE_MAISON.map((t) => (
                      <option key={t} value={t}>{TYPE_MAISON_LABEL[t]}</option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Piscine ?" htmlFor="piscine">
                  <YesNoToggle
                    value={watch("piscine") ?? false}
                    onChange={(v) => setValue("piscine", v, { shouldDirty: true })}
                  />
                </Field>
                <Field label="Combles aménageables ?" htmlFor="combles">
                  <YesNoToggle
                    value={watch("combles") ?? false}
                    onChange={(v) => setValue("combles", v, { shouldDirty: true })}
                  />
                </Field>
                <Field label="Exposition" htmlFor="exposition" className="md:col-span-2">
                  <PillGroup
                    options={EXPOSITION.map((e) => ({ value: e, label: EXPOSITION_LABEL[e] }))}
                    value={watch("exposition")}
                    onChange={(v) => setValue("exposition", v as (typeof EXPOSITION)[number], { shouldDirty: true })}
                  />
                </Field>
              </div>
            )}

            {typeBien === "terrain" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Surface (m²)" required error={errors.surfaceTerrain?.message} htmlFor="surfaceTerrain">
                  <TextInput id="surfaceTerrain" type="number" inputMode="numeric" placeholder="800" {...register("surfaceTerrain")} error={!!errors.surfaceTerrain} />
                </Field>
                <Field label="Zone PLU (si connue)" htmlFor="zone">
                  <TextInput id="zone" placeholder="UB, AU, N…" {...register("zone")} />
                </Field>
                <Field label="Constructible ?" htmlFor="constructible">
                  <YesNoToggle
                    value={watch("constructible") ?? false}
                    onChange={(v) => setValue("constructible", v, { shouldDirty: true })}
                  />
                </Field>
                <Field label="Viabilisé ?" htmlFor="viabilise">
                  <YesNoToggle
                    value={watch("viabilise") ?? false}
                    onChange={(v) => setValue("viabilise", v, { shouldDirty: true })}
                  />
                </Field>
              </div>
            )}

            {(typeBien === "immeuble" || typeBien === "local") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Surface totale (m²)" required error={errors.surface?.message} htmlFor="surface">
                  <TextInput id="surface" type="number" inputMode="numeric" placeholder="180" {...register("surface")} error={!!errors.surface} />
                </Field>
                <Field label="Pièces / lots" htmlFor="pieces">
                  <TextInput id="pieces" type="number" inputMode="numeric" placeholder="6" {...register("pieces")} />
                </Field>
              </div>
            )}

            {typeBien !== "terrain" && (
              <div className="mt-8 pt-7 border-t border-[var(--bordure)]">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.1em] text-anthracite mb-5">
                  État & qualité
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <Field label="État" required error={errors.etat?.message} htmlFor="etat">
                    <NativeSelect id="etat" {...register("etat")} error={!!errors.etat}>
                      <option value="">Sélectionnez…</option>
                      {ETAT.map((e) => (
                        <option key={e} value={e}>{ETAT_LABEL[e]}</option>
                      ))}
                    </NativeSelect>
                  </Field>
                  <Field label="Année de construction" required error={errors.anneeConstruction?.message} htmlFor="annee">
                    <NativeSelect id="annee" {...register("anneeConstruction")} error={!!errors.anneeConstruction}>
                      <option value="">Sélectionnez…</option>
                      {ANNEE.map((a) => (
                        <option key={a} value={a}>{ANNEE_LABEL[a]}</option>
                      ))}
                    </NativeSelect>
                  </Field>
                  {(typeBien === "appartement" || typeBien === "maison") && (
                    <Field label="DPE" htmlFor="dpe" className="md:col-span-2">
                      <PillGroup
                        options={DPE.map((d) => ({ value: d, label: d === "unknown" ? "Je ne sais pas" : d }))}
                        value={watch("dpe")}
                        onChange={(v) => setValue("dpe", v as (typeof DPE)[number], { shouldDirty: true })}
                      />
                    </Field>
                  )}
                </div>

                {(typeBien === "appartement" || typeBien === "maison") && (
                  <Field label="Atouts du bien (facultatif)" htmlFor="atouts">
                    <PillGroup
                      multi
                      options={ATOUTS.map((a) => ({ value: a, label: a }))}
                      value={watch("atouts") ?? []}
                      onChange={(v) => setValue("atouts", v as string[], { shouldDirty: true })}
                    />
                  </Field>
                )}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <StepTitle
              eyebrow="Étape 3 / 5"
              title="Où se situe le bien ?"
              hint="On utilise l'adresse pour récupérer les ventes voisines (DVF) à l'étape suivante."
            />
            <AddressAutocomplete
              value={watch("adresse")}
              onSelect={(f) => {
                setValue("adresse", f.properties.label, { shouldDirty: true });
                setValue("adresseLat", f.geometry.coordinates[1], { shouldDirty: true });
                setValue("adresseLng", f.geometry.coordinates[0], { shouldDirty: true });
                setValue("adresseCommune", f.properties.city, { shouldDirty: true });
                setValue("adresseCodePostal", f.properties.postcode, { shouldDirty: true });
                setValue("adresseInsee", f.properties.citycode, { shouldDirty: true });
              }}
              onTextChange={(v) => setValue("adresse", v, { shouldDirty: true })}
              error={errors.adresse?.message}
            />
            {watch("adresseLat") !== undefined && (
              <p className="mt-3 text-[12px] text-sauge font-semibold flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12l5 5L20 6" /></svg>
                Adresse géolocalisée — {watch("adresseCommune")} ({watch("adresseCodePostal")})
              </p>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <StepTitle
              eyebrow="Étape 4 / 5"
              title="Parlez-nous de votre projet"
              hint="On adapte le rapport à votre situation."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field label="Objectif" htmlFor="objectif">
                <NativeSelect id="objectif" {...register("objectif")}>
                  {OBJECTIF.map((o) => <option key={o} value={o}>{OBJECTIF_LABEL[o]}</option>)}
                </NativeSelect>
              </Field>
              <Field label="Délai" htmlFor="delai">
                <NativeSelect id="delai" {...register("delai")}>
                  {DELAI.map((d) => <option key={d} value={d}>{DELAI_LABEL[d]}</option>)}
                </NativeSelect>
              </Field>
              <Field label="Vous êtes" htmlFor="qualite">
                <NativeSelect id="qualite" {...register("qualite")}>
                  {QUALITE.map((q) => <option key={q} value={q}>{QUALITE_LABEL[q]}</option>)}
                </NativeSelect>
              </Field>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <StepTitle
              eyebrow="Étape 5 / 5"
              title="Où recevoir votre rapport ?"
              hint="Rapport PDF envoyé sous 2 minutes. Aucun spam, aucune revente."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Prénom" required error={errors.prenom?.message} htmlFor="prenom">
                <TextInput id="prenom" placeholder="Marie" {...register("prenom")} error={!!errors.prenom} />
              </Field>
              <Field label="Nom" required error={errors.nom?.message} htmlFor="nom">
                <TextInput id="nom" placeholder="Dupont" {...register("nom")} error={!!errors.nom} />
              </Field>
              <Field label="E-mail" required error={errors.email?.message} htmlFor="email">
                <TextInput id="email" type="email" placeholder="marie@email.fr" {...register("email")} error={!!errors.email} />
              </Field>
              <Field label="Téléphone" required error={errors.telephone?.message} htmlFor="telephone">
                <TextInput id="telephone" type="tel" placeholder="06 12 34 56 78" {...register("telephone")} error={!!errors.telephone} />
              </Field>
              <div className="md:col-span-2 mt-2">
                <Controller
                  control={control}
                  name="rgpd"
                  render={({ field }) => (
                    <CaptchaCheckbox
                      checked={!!field.value}
                      onChange={(v) => field.onChange(v ? true : undefined)}
                      label="J'accepte d'être recontacté par Markus Immobilier au sujet de cette estimation."
                    />
                  )}
                />
                {errors.rgpd && (
                  <p className="mt-2 text-[12px] text-red-600">{errors.rgpd.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </StepPanel>

      {submitError && (
        <p className="mt-6 text-[13px] text-red-600 font-medium" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          // variant="outline" — texte anthracite #383E42, bordure sauge.
          // L'ancien variant="ghost" rendait du texte BLANC, invisible sur la
          // carte bg-blanc du formulaire (bug retour signalé).
          <Button onClick={goBack} variant="outline">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            Retour
          </Button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <Button onClick={goNext} variant="cta">
            Continuer
            <ArrowRight />
          </Button>
        ) : (
          <Button type="submit" variant="cta" disabled={isSubmitting}>
            {isSubmitting ? "Envoi…" : "Lancer l'estimation"}
            <ArrowRight />
          </Button>
        )}
      </div>
    </form>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PETITS COMPOSANTS
// ───────────────────────────────────────────────────────────────────────────

function StepTitle({ eyebrow, title, hint }: { eyebrow: string; title: string; hint?: string }) {
  return (
    <div className="mb-7">
      <div className="text-[11px] uppercase tracking-[0.16em] text-sauge font-bold mb-2">
        {eyebrow}
      </div>
      <h3 className="text-[clamp(20px,2.6vw,28px)] font-bold tracking-[-0.01em] text-anthracite leading-[1.18]">
        {title}
      </h3>
      {hint && <p className="text-sm text-[#7a817f] mt-2 leading-relaxed">{hint}</p>}
    </div>
  );
}

function YesNoToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="inline-flex bg-gris rounded-[10px] p-1 gap-1">
      {[{ v: false, label: "Non" }, { v: true, label: "Oui" }].map((opt) => (
        <button
          key={String(opt.v)}
          type="button"
          onClick={() => onChange(opt.v)}
          className={cn(
            "px-5 py-2 rounded-[8px] text-sm font-semibold transition",
            value === opt.v
              ? "bg-blanc text-anthracite shadow-[0_2px_8px_rgba(56,62,66,0.12)]"
              : "text-[#7a817f] hover:text-anthracite",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

type PillOption = { value: string; label: string };

function PillGroup({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: PillOption[];
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (v: string) => (multi ? Array.isArray(value) && value.includes(v) : value === v);
  const toggle = (v: string) => {
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    } else {
      onChange(v);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => toggle(o.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
            isSelected(o.value)
              ? "bg-sauge text-blanc border-sauge shadow-[0_4px_14px_-6px_rgba(158,165,150,0.5)]"
              : "bg-blanc text-anthracite border-[var(--bordure)] hover:border-sauge hover:text-sauge",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function AddressAutocomplete({
  value,
  onSelect,
  onTextChange,
  error,
}: {
  value: string;
  onSelect: (f: BanFeature) => void;
  onTextChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { results, loading } = useBanAutocomplete(query);

  useEffect(() => setQuery(value || ""), [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <Field label="Adresse complète" required error={error} htmlFor="adresse">
        <div className="relative">
          <TextInput
            id="adresse"
            placeholder="87 rue Édouard Vaillant, Villeurbanne…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onTextChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            autoComplete="off"
            error={!!error}
            className="pl-11"
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
            <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
        </div>
      </Field>

      <AnimatePresence>
        {open && (results.length > 0 || loading) && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-20 left-0 right-0 mt-2 bg-blanc border border-[var(--bordure)] rounded-[12px] shadow-[0_18px_50px_-20px_rgba(56,62,66,0.3)] overflow-hidden"
          >
            {loading && results.length === 0 && (
              <li className="px-4 py-3 text-sm text-[#7a817f]">Recherche…</li>
            )}
            {results.map((f, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(f);
                    setQuery(f.properties.label);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gris transition-colors flex items-start gap-3"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" className="mt-0.5 shrink-0">
                    <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                  <span className="flex flex-col">
                    <span className="text-[14px] text-anthracite font-medium">
                      {f.properties.label}
                    </span>
                    <span className="text-[11px] text-[#7a817f] uppercase tracking-[0.08em]">
                      {f.properties.postcode} {f.properties.city}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
