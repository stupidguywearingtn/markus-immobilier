"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/button";
import {
  Field,
  TextInput,
  NativeSelect,
  Textarea,
} from "@/components/forms/primitives";

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide").optional().or(z.literal("")),
  objet: z.enum(["achat", "vente", "location", "gestion", "syndic", "estimation", "autre"], {
    message: "Sélectionnez un objet",
  }),
  message: z.string().min(10, "Message trop court (10 caractères min)"),
});
type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
      setTimeout(() => {
        document
          .getElementById("contact-confirm")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch {
      setSubmitError(
        "Une erreur est survenue. Réessayez ou appelez le 04 78 37 13 67.",
      );
    }
  };

  if (submitted) {
    const data = watch();
    return (
      <motion.div
        id="contact-confirm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-blanc rounded-[20px] p-10 max-md:p-7 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)] text-center"
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
        <h3 className="text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.01em] mb-3">
          Message envoyé <span className="text-sauge">✓</span>
        </h3>
        <p className="text-[#5a6166] mb-6 max-w-[420px] mx-auto">
          Merci {data.nom}. Nous revenons vers vous très vite à{" "}
          <b className="text-anthracite">{data.email}</b>.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-blanc rounded-[20px] p-10 max-md:p-7 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" required error={errors.nom?.message} htmlFor="c-nom">
          <TextInput
            id="c-nom"
            placeholder="Marie Dupont"
            {...register("nom")}
            error={!!errors.nom}
          />
        </Field>

        <Field label="E-mail" required error={errors.email?.message} htmlFor="c-email">
          <TextInput
            id="c-email"
            type="email"
            placeholder="marie@email.fr"
            {...register("email")}
            error={!!errors.email}
          />
        </Field>

        <Field label="Téléphone" hint="Facultatif" htmlFor="c-tel">
          <TextInput
            id="c-tel"
            type="tel"
            placeholder="06 12 34 56 78"
            {...register("telephone")}
          />
        </Field>

        <Field label="Objet" required error={errors.objet?.message} htmlFor="c-objet">
          <NativeSelect id="c-objet" {...register("objet")} error={!!errors.objet} defaultValue="">
            <option value="" disabled>Sélectionnez…</option>
            <option value="achat">Acheter</option>
            <option value="vente">Vendre</option>
            <option value="location">Louer</option>
            <option value="gestion">Gestion locative</option>
            <option value="syndic">Syndic de copropriété</option>
            <option value="estimation">Estimation</option>
            <option value="autre">Autre</option>
          </NativeSelect>
        </Field>

        <Field label="Message" required error={errors.message?.message} htmlFor="c-message" className="md:col-span-2">
          <Textarea
            id="c-message"
            placeholder="Dites-nous tout — projet, calendrier, questions…"
            {...register("message")}
            error={!!errors.message}
          />
        </Field>
      </div>

      {submitError && (
        <p className="mt-6 text-[13px] text-red-600 font-medium" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] text-[#9aa09d] max-w-[380px]">
          En soumettant ce formulaire, vous acceptez d&apos;être contacté par
          Markus Immobilier. Vos données restent confidentielles.
        </p>
        <Button type="submit" variant="cta" disabled={isSubmitting}>
          {isSubmitting ? "Envoi…" : "Envoyer le message"}
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
