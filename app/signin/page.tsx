"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button, ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Field, TextInput } from "@/components/forms/primitives";

/**
 * Espace pro — connexion admin (Supabase Auth).
 * Pas de création de compte public : les admins sont créés à la main dans
 * le dashboard Supabase + une ligne dans public.user_roles.
 */
function friendlyError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Email pas encore confirmé.";
  if (m.includes("rate limit"))
    return "Trop de tentatives, réessayez plus tard.";
  return msg;
}

export default function SignInPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [error, setError] = useState<string | null>(null);

  // Déjà connecté -> retour à l'accueil (le mode édition se pilote depuis la nav).
  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        toast.success("Connexion réussie.");
        router.replace("/");
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (err) throw err;
        toast.success("Email de réinitialisation envoyé.");
        setMode("signin");
      }
    } catch (err: unknown) {
      setError(friendlyError(err instanceof Error ? err.message : "Erreur"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative bg-anthracite text-blanc min-h-screen grid place-items-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 20%, rgba(158,165,150,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(158,165,150,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <form
        onSubmit={submit}
        className="relative z-[1] bg-blanc text-anthracite rounded-[20px] p-10 max-md:p-7 w-full max-w-[440px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.4)]"
      >
        <Eyebrow className="mb-4">Espace pro</Eyebrow>
        <h1 className="font-bold text-[clamp(24px,3vw,32px)] tracking-[-0.01em] mb-2">
          {mode === "signin" ? "Connexion" : "Mot de passe oublié"}
        </h1>
        <p className="text-sm text-[#5a6166] mb-7">
          {mode === "signin"
            ? "Connectez-vous pour modifier le site."
            : "On vous envoie un lien de réinitialisation par email."}
        </p>

        <Field
          label="Email"
          required
          htmlFor="email"
          error={error ?? undefined}
        >
          <TextInput
            id="email"
            type="email"
            placeholder="vous@markusimmobilier.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </Field>

        {mode === "signin" && (
          <div className="mt-4">
            <Field label="Mot de passe" required htmlFor="pw">
              <TextInput
                id="pw"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                minLength={6}
                required
              />
            </Field>
          </div>
        )}

        <div className="mt-7 flex items-center justify-end gap-3">
          <Button type="submit" variant="cta" disabled={busy}>
            {busy
              ? "…"
              : mode === "signin"
                ? "Se connecter"
                : "Envoyer le lien"}
            <ArrowRight />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "signin" ? "forgot" : "signin");
          }}
          className="mt-4 w-full text-xs text-[#7a817f] hover:text-anthracite transition"
        >
          {mode === "signin" ? "Mot de passe oublié ?" : "← Retour à la connexion"}
        </button>

        <div className="mt-6 pt-5 border-t border-[var(--bordure)] text-center">
          <Link
            href="/"
            className="text-xs text-[#7a817f] hover:text-anthracite transition"
          >
            ← Retour au site
          </Link>
        </div>
      </form>
    </section>
  );
}
