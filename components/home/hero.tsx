import { LogoFull } from "@/components/ui/logo";
import { Button, ArrowRight } from "@/components/ui/button";
import { HeroVideo } from "@/components/home/hero-video";

/**
 * Hero plein écran : vidéo de fond (si présente) sur dégradé ken-burns en
 * fallback. L'overlay anthracite + grain est toujours appliqué par-dessus.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative grid place-items-center text-center text-blanc overflow-hidden m-0 p-0"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* Fallback : dégradé ken-burns toujours rendu en z-0
          → si la vidéo charge, elle se pose au-dessus en z-[1]
          → sinon le dégradé reste visible. */}
      <div
        className="absolute inset-0 z-0 animate-kenburns"
        style={{
          background: `
            radial-gradient(120% 90% at 20% 10%, #4a5258 0%, transparent 55%),
            radial-gradient(120% 90% at 85% 90%, #2c3135 0%, transparent 55%),
            linear-gradient(135deg, #3d444a, #2b3034)
          `,
        }}
        aria-hidden="true"
      />

      {/* Vidéo de fond (drop-in /public/videos/hero.mp4 ou .webm) */}
      <HeroVideo />

      {/* Overlay anthracite + grain — par-dessus la vidéo, sous le contenu */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(56,62,66,.55), rgba(56,62,66,.82)),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.012) 3px)
          `,
        }}
        aria-hidden="true"
      />

      {/* Contenu — logo centerpiece + boutons + CTA */}
      <div className="relative z-[3] px-6 max-w-[900px] flex flex-col items-center">
        {/* Logo complet (M + MARKUS + IMMOBILIER), centré, blanc — responsive */}
        <div
          className="mb-10 max-md:mb-8"
          style={{ width: "clamp(260px, 38vw, 520px)" }}
        >
          <LogoFull gradient />
        </div>

        {/* Acheter / Louer / Faire gérer */}
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="/annonces?kind=vente" variant="ghost">
            Acheter
          </Button>
          <Button href="/annonces?kind=location" variant="ghost">
            Louer
          </Button>
          <Button href="/faire-gerer" variant="ghost">
            Faire gérer
          </Button>
        </div>

        {/* CTA principal */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Button href="/estimation" variant="sauge">
            Estimer mon bien
            <ArrowRight />
          </Button>
          <small className="text-xs uppercase tracking-[0.12em] text-white/65">
            Résultat en moins de 2 minutes
          </small>
        </div>
      </div>
    </section>
  );
}
