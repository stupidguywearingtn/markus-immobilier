"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Field, TextInput } from "@/components/forms/primitives";

/**
 * Page de connexion admin — gate pour /radar (et futures pages internes).
 * Pas dans la nav publique. Saisie d'un mot de passe → cookie HTTP-only.
 *
 * NB : on lit `?from=` via window.location (et non useSearchParams) parce
 * que Next 16 deopte la route en 404 dans certains cas quand le hook
 * est appelé sans Suspense boundary parent.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [from, setFrom] = useState("/radar");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search).get("from");
    if (p) setFrom(p);
  }, []);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(
          json.error === "invalid_credentials"
            ? "Mot de passe incorrect."
            : json.error === "server_misconfigured"
              ? "Serveur non configuré (variables d'env manquantes côté admin)."
              : "Connexion impossible.",
        );
        setLoading(false);
        return;
      }
      router.replace(from);
    } catch {
      setError("Erreur réseau.");
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-anthracite text-blanc min-h-screen grid place-items-center px-6 overflow-hidden">
      {/* Halo radial sauge discret en fond */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 20%, rgba(158,165,150,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(158,165,150,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <form
        onSubmit={onSubmit}
        className="relative z-[1] bg-blanc text-anthracite rounded-[20px] p-10 max-md:p-7 w-full max-w-[440px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.4)]"
      >
        <Eyebrow className="mb-4">Espace interne</Eyebrow>
        <h1 className="font-bold text-[clamp(24px,3vw,32px)] tracking-[-0.01em] mb-2">
          Radar de prospection
        </h1>
        <p className="text-sm text-[#5a6166] mb-7">
          Outil réservé à l&apos;équipe Markus. Renseignez votre mot de passe.
        </p>

        <Field label="Mot de passe" required htmlFor="pw" error={error ?? undefined}>
          <TextInput
            id="pw"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            error={!!error}
          />
        </Field>

        <div className="mt-7 flex items-center justify-end gap-3">
          <Button type="submit" variant="cta" disabled={loading || !password}>
            {loading ? "Connexion…" : "Se connecter"}
            <ArrowRight />
          </Button>
        </div>
      </form>
    </section>
  );
}
