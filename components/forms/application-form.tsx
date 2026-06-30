"use client";

import { useState, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { track } from "@/lib/track";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/button";
import { Field, TextInput, Textarea } from "@/components/forms/primitives";

const schema = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitError(null);
    track("form_recrutement");

    // Lecture du CV en base64 pour l'envoyer en pièce jointe (max 4 Mo).
    let cv: { name: string; type: string; dataBase64: string } | undefined;
    if (cvFile) {
      if (cvFile.size > 3 * 1024 * 1024) {
        setSubmitError("Le CV dépasse 3 Mo. Compressez-le ou envoyez-le par email.");
        return;
      }
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.onerror = () => reject(new Error("read_error"));
          r.readAsDataURL(cvFile);
        });
        cv = {
          name: cvFile.name,
          type: cvFile.type,
          dataBase64: dataUrl.split(",")[1] ?? "",
        };
      } catch {
        setSubmitError("Lecture du CV impossible. Réessayez sans le fichier.");
        return;
      }
    }

    try {
      const res = await fetch("/api/recrutement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          cvName: cvFile?.name,
          cvSize: cvFile?.size,
          cv,
        }),
      });
      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Envoi impossible. Réessayez ou appelez le 04 78 37 13 67.",
      );
    }
  };

  if (submitted) {
    const data = watch();
    return (
      <motion.div
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
          Candidature reçue <span className="text-sauge">✓</span>
        </h3>
        <p className="text-[#5a6166] mb-2 max-w-[460px] mx-auto">
          Merci {data.prenom}. On vous rappelle au{" "}
          <b className="text-anthracite">{data.telephone}</b> pour échanger.
        </p>
        {cvFile && (
          <p className="text-[12px] text-[#7a817f]">CV reçu : {cvFile.name}</p>
        )}
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
        <Field label="Prénom" required error={errors.prenom?.message} htmlFor="a-prenom">
          <TextInput id="a-prenom" placeholder="Marie" {...register("prenom")} error={!!errors.prenom} />
        </Field>
        <Field label="Nom" required error={errors.nom?.message} htmlFor="a-nom">
          <TextInput id="a-nom" placeholder="Dupont" {...register("nom")} error={!!errors.nom} />
        </Field>
        <Field label="E-mail" required error={errors.email?.message} htmlFor="a-email">
          <TextInput id="a-email" type="email" placeholder="marie@email.fr" {...register("email")} error={!!errors.email} />
        </Field>
        <Field label="Téléphone" required error={errors.telephone?.message} htmlFor="a-tel">
          <TextInput id="a-tel" type="tel" placeholder="06 12 34 56 78" {...register("telephone")} error={!!errors.telephone} />
        </Field>

        <Field label="CV (PDF, facultatif)" htmlFor="a-cv" className="md:col-span-2">
          <input
            ref={fileInputRef}
            id="a-cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 px-5 bg-blanc border-2 border-dashed border-[var(--bordure)] rounded-[10px] text-[14px] text-anthracite hover:border-sauge hover:bg-sauge/5 transition flex items-center gap-3 text-left"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-sauge)" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="flex-1 truncate">
              {cvFile ? cvFile.name : "Cliquez pour ajouter votre CV"}
            </span>
            {cvFile && (
              <span className="text-sauge text-xs uppercase tracking-[0.12em] font-semibold">
                Changer
              </span>
            )}
          </button>
        </Field>

        <Field label="Message (facultatif)" htmlFor="a-message" className="md:col-span-2">
          <Textarea
            id="a-message"
            placeholder="Parlez-nous de votre parcours, vos motivations…"
            {...register("message")}
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
          On vous rappelle pour échanger — sans engagement.
        </p>
        <Button type="submit" variant="cta" disabled={isSubmitting}>
          {isSubmitting ? "Envoi…" : "Envoyer ma candidature"}
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
