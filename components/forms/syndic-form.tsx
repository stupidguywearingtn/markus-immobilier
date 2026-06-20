"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { track } from "@/lib/track";
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
  RangeSlider,
  CaptchaCheckbox,
} from "@/components/forms/primitives";
import { StepIndicator, StepPanel } from "@/components/forms/multi-step";

const step1Schema = z.object({
  civilite: z.enum(["madame", "monsieur"], {
    message: "Sélectionnez une civilité",
  }),
  nom: z.string().min(2, "Nom trop court"),
  prenom: z.string().min(2, "Prénom trop court"),
  email: z.email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  role: z.enum(["president", "membre-cs", "coproprietaire"], {
    message: "Sélectionnez votre rôle",
  }),
  notRobot: z.literal(true, { message: "Confirmation requise" }),
});
const step2Schema = z.object({
  adresseImmeuble: z.string().min(5, "Adresse requise"),
  codePostal: z
    .string()
    .regex(/^\d{5}$/, "Code postal à 5 chiffres requis"),
  ville: z.string().min(2, "Ville requise"),
  nbAppartements: z.number().min(0).max(200).optional(),
});

const fullSchema = step1Schema.and(step2Schema);
type FormData = z.infer<typeof fullSchema>;

const ROLE_LABELS: Record<FormData["role"], string> = {
  president: "Président·e du conseil syndical",
  "membre-cs": "Membre du conseil syndical",
  coproprietaire: "Copropriétaire",
};

export function SyndicForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [nbAppts, setNbAppts] = useState(20);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: { nbAppartements: undefined },
  });

  const goNext = async () => {
    const ok = await trigger([
      "civilite",
      "nom",
      "prenom",
      "email",
      "telephone",
      "role",
      "notRobot",
    ]);
    if (ok) setStep(2);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitError(null);
    track("form_faire_gerer");
    try {
      const res = await fetch("/api/faire-gerer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
      setTimeout(() => {
        document
          .getElementById("syndic-confirm")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch {
      setSubmitError(
        "Envoi impossible. Réessayez ou appelez le 04 78 37 13 67.",
      );
    }
  };

  /* ============ Vue confirmation après submit ============ */
  if (submitted) {
    const data = watch();
    return (
      <motion.div
        id="syndic-confirm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-blanc rounded-[18px] p-10 max-md:p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.18)] text-center max-w-[640px] mx-auto"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 22 }}
          className="w-20 h-20 rounded-full bg-sauge/15 grid place-items-center mx-auto mb-6"
        >
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--color-sauge)" strokeWidth="2.4">
            <path d="M5 12l5 5L20 6" />
          </svg>
        </motion.div>
        <h3 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] mb-3">
          Demande envoyée <span className="text-sauge">✓</span>
        </h3>
        <p className="text-[#5a6166] mb-6 max-w-[460px] mx-auto">
          Merci {data.prenom}. Un membre de l&apos;équipe Markus vous contactera
          sous <b className="text-anthracite">48h ouvrées</b> au{" "}
          <b className="text-anthracite">{data.telephone}</b> pour préparer votre
          étude personnalisée.
        </p>
        <div className="text-xs text-[#7a817f] uppercase tracking-[0.14em] mb-6">
          Récapitulatif transmis
        </div>
        <div className="text-sm text-anthracite bg-gris rounded-[12px] p-5 text-left space-y-1.5">
          <div><b>{data.civilite === "madame" ? "Mme" : "M."}</b> {data.prenom} {data.nom}</div>
          <div>{data.email}</div>
          <div>{ROLE_LABELS[data.role]}</div>
          <div className="text-[#5a6166] pt-2 border-t border-[var(--bordure)] mt-2">
            {data.adresseImmeuble}, {data.codePostal} {data.ville}
          </div>
          {data.nbAppartements && (
            <div className="text-[#7a817f] text-xs">
              {data.nbAppartements} lot{data.nbAppartements > 1 ? "s" : ""}
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="outline">
            Retour à l&apos;accueil
          </Button>
          <Button href="/annonces" variant="primary">
            Voir nos biens
            <ArrowRight size={15} />
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ============ Formulaire ============ */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-blanc rounded-[20px] p-10 max-md:p-7 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)] max-w-[760px] mx-auto"
    >
      <StepIndicator current={step} total={2} />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <StepPanel key="step1" stepKey={1}>
            <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-2">
              Vos coordonnées
            </h3>
            <p className="text-[14px] text-[#7a817f] mb-8">
              On vous rappelle pour préparer votre étude personnalisée.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Civilité"
                required
                error={errors.civilite?.message}
                className="md:col-span-2"
              >
                <RadioGroup
                  value={watch("civilite")}
                  onValueChange={(v) =>
                    setValue("civilite", v as FormData["civilite"], {
                      shouldValidate: true,
                    })
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  <RadioOption value="madame" label="Madame" />
                  <RadioOption value="monsieur" label="Monsieur" />
                </RadioGroup>
              </Field>

              <Field label="Nom" required error={errors.nom?.message} htmlFor="nom">
                <TextInput
                  id="nom"
                  placeholder="Dupont"
                  {...register("nom")}
                  error={!!errors.nom}
                />
              </Field>

              <Field label="Prénom" required error={errors.prenom?.message} htmlFor="prenom">
                <TextInput
                  id="prenom"
                  placeholder="Marie"
                  {...register("prenom")}
                  error={!!errors.prenom}
                />
              </Field>

              <Field label="E-mail" required error={errors.email?.message} htmlFor="email">
                <TextInput
                  id="email"
                  type="email"
                  placeholder="marie.dupont@email.fr"
                  {...register("email")}
                  error={!!errors.email}
                />
              </Field>

              <Field label="Téléphone" required error={errors.telephone?.message} htmlFor="tel">
                <TextInput
                  id="tel"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  {...register("telephone")}
                  error={!!errors.telephone}
                />
              </Field>

              <Field
                label="Quel est votre rôle ?"
                required
                error={errors.role?.message}
                htmlFor="role"
                className="md:col-span-2"
              >
                <NativeSelect
                  id="role"
                  {...register("role")}
                  error={!!errors.role}
                  defaultValue=""
                >
                  <option value="" disabled>Sélectionnez votre rôle</option>
                  <option value="president">Président·e du conseil syndical</option>
                  <option value="membre-cs">Membre du conseil syndical</option>
                  <option value="coproprietaire">Copropriétaire</option>
                </NativeSelect>
              </Field>

              <div className="md:col-span-2">
                <CaptchaCheckbox
                  checked={watch("notRobot") || false}
                  onChange={(v) =>
                    setValue("notRobot", v as true, { shouldValidate: true })
                  }
                  label="Je ne suis pas un robot"
                />
                {errors.notRobot && (
                  <p className="text-[12px] text-red-600 font-medium mt-1.5">
                    {errors.notRobot.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={goNext} variant="cta">
                Continuer
                <ArrowRight />
              </Button>
            </div>
          </StepPanel>
        ) : (
          <StepPanel key="step2" stepKey={2}>
            <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-2">
              Votre copropriété
            </h3>
            <p className="text-[14px] text-[#7a817f] mb-8">
              Quelques infos pour qu&apos;on puisse vous proposer une étude
              ciblée.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field
                label="Adresse de l'immeuble"
                required
                error={errors.adresseImmeuble?.message}
                htmlFor="addr"
                className="md:col-span-3"
              >
                <TextInput
                  id="addr"
                  placeholder="12 rue de la République"
                  {...register("adresseImmeuble")}
                  error={!!errors.adresseImmeuble}
                />
              </Field>

              <Field label="Code postal" required error={errors.codePostal?.message} htmlFor="cp">
                <TextInput
                  id="cp"
                  inputMode="numeric"
                  placeholder="69100"
                  {...register("codePostal")}
                  error={!!errors.codePostal}
                />
              </Field>

              <Field
                label="Ville"
                required
                error={errors.ville?.message}
                htmlFor="ville"
                className="md:col-span-2"
              >
                <TextInput
                  id="ville"
                  placeholder="Villeurbanne"
                  {...register("ville")}
                  error={!!errors.ville}
                />
              </Field>

              <Field
                label="Nombre d'appartements"
                hint="Vous ne connaissez pas le nombre exact ? Ce champ est facultatif."
                className="md:col-span-3"
              >
                <div className="flex items-center gap-5 pt-2">
                  <RangeSlider
                    value={nbAppts}
                    onChange={(v) => {
                      setNbAppts(v);
                      setValue(
                        "nbAppartements",
                        v >= 200 ? 200 : v,
                        { shouldValidate: false },
                      );
                    }}
                    min={0}
                    max={200}
                    step={1}
                    className="flex-1"
                  />
                  <div className="min-w-[80px] text-right">
                    <span className="text-[24px] font-bold text-anthracite tabular-nums">
                      {nbAppts}
                    </span>
                    {nbAppts >= 200 && <span className="text-sauge text-lg">+</span>}
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[#7a817f]">
                      lots
                    </div>
                  </div>
                </div>
              </Field>
            </div>

            {submitError && (
              <p className="mt-5 text-[13px] text-red-600 font-medium" role="alert">
                {submitError}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-[#7a817f] hover:text-anthracite transition text-sm font-semibold uppercase tracking-[0.08em]"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
                Retour
              </button>
              <Button
                type="submit"
                variant="cta"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours…" : "Je demande une étude personnalisée"}
                <ArrowRight />
              </Button>
            </div>
          </StepPanel>
        )}
      </AnimatePresence>
    </form>
  );
}
