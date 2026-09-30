import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";

/**
 * Briques visuelles communes à toutes les sections de l'éditeur de pages.
 *
 * Tout passe par ici pour que le client ne PUISSE PAS sortir de la charte :
 * il choisit un fond parmi trois (blanc / gris / anthracite), un style de
 * bouton parmi ceux du site, et le reste (typo, espacements, rayons, reveal)
 * est imposé par design-system.md.
 *
 * NB : les textes arrivent en `ReactNode`, pas en `string` — dans l'éditeur,
 * Puck remplace un champ « modifiable en direct » par un élément éditable.
 * Ne jamais faire `.trim()` ou `.length` sur un texte : tester avec `has()`.
 */

export type Fond = "blanc" | "gris" | "anthracite";
export type Espacement = "normal" | "compact" | "aucun";
export type Alignement = "gauche" | "centre";
export type StyleBouton = "primary" | "sauge" | "outline" | "ghost" | "cta";
export type Bouton = { label?: string; lien?: string; style?: StyleBouton };

const FOND: Record<Fond, string> = {
  blanc: "bg-blanc text-anthracite",
  gris: "bg-gris text-anthracite",
  anthracite: "bg-anthracite text-blanc",
};

const PAD: Record<Espacement, string> = {
  normal: "py-[120px] max-md:py-[72px]",
  compact: "py-[64px] max-md:py-[44px]",
  aucun: "py-0",
};

/** Vrai si un texte (string ou élément éditable) mérite d'être affiché. */
export function has(v: unknown): boolean {
  if (v === null || v === undefined || v === false) return false;
  if (typeof v === "string") return v.trim() !== "";
  return true;
}

export function Section({
  fond = "blanc",
  espacement = "normal",
  id,
  className = "",
  children,
}: {
  fond?: Fond;
  espacement?: Espacement;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id || undefined}
      data-fond={fond}
      className={`relative ${FOND[fond] ?? FOND.blanc} ${PAD[espacement] ?? PAD.normal} ${className}`}
    >
      <div className="max-w-content mx-auto px-8 max-md:px-5">{children}</div>
    </section>
  );
}

/** Sur-titre sauge + H2 (+ fin de titre en dégradé) + chapô. */
export function SectionHead({
  eyebrow,
  titre,
  titreAccent,
  intro,
  alignement = "gauche",
  fond = "blanc",
  as = "h2",
  className = "",
}: {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  alignement?: Alignement;
  fond?: Fond;
  as?: "h1" | "h2";
  className?: string;
}) {
  if (!has(eyebrow) && !has(titre) && !has(titreAccent) && !has(intro)) return null;
  const Tag = as;
  const centre = alignement === "centre";
  const sombre = fond === "anthracite";
  return (
    <div className={`${centre ? "text-center mx-auto" : ""} max-w-[720px] ${className}`}>
      {has(eyebrow) && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      {(has(titre) || has(titreAccent)) && (
        <Tag
          className={
            as === "h1"
              ? "font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(38px,6vw,68px)] mb-5"
              : "font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4"
          }
        >
          {titre}
          {has(titre) && has(titreAccent) ? " " : null}
          {has(titreAccent) && <span className={sombre ? "grad-light" : "grad"}>{titreAccent}</span>}
        </Tag>
      )}
      {has(intro) && (
        <p className={`${sombre ? "text-blanc/80" : "text-[#5a6166]"} leading-relaxed text-[17px] max-md:text-base`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Texte riche (paragraphes, listes, gras, liens) aux styles de la charte. */
export function Prose({
  children,
  fond = "blanc",
  className = "",
}: {
  children: ReactNode;
  fond?: Fond;
  className?: string;
}) {
  if (!has(children)) return null;
  return (
    <div className={`pb-prose ${fond === "anthracite" ? "pb-prose-dark" : ""} ${className}`}>
      {children}
    </div>
  );
}

/** Bouton de la charte. Rien n'est rendu tant que libellé ET lien ne sont pas remplis. */
export function BlockButton({ bouton, fond = "blanc" }: { bouton?: Bouton; fond?: Fond }) {
  if (!bouton || !has(bouton.label) || !has(bouton.lien)) return null;
  // Un bouton « ghost » (contour blanc) est invisible sur fond clair : on le
  // remplace d'office par « outline » pour que le client ne puisse pas se piéger.
  let style: StyleBouton = bouton.style ?? "primary";
  if (style === "ghost" && fond !== "anthracite") style = "outline";
  return (
    <Button href={bouton.lien!.trim()} variant={style}>
      {bouton.label}
      <ArrowRight size={15} />
    </Button>
  );
}

export function Buttons({ boutons, fond, centre }: { boutons: (Bouton | undefined)[]; fond?: Fond; centre?: boolean }) {
  const list = boutons.filter((b) => b && has(b.label) && has(b.lien));
  if (list.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-3 mt-8 ${centre ? "justify-center" : ""}`}>
      {list.map((b, i) => (
        <BlockButton key={i} bouton={b} fond={fond} />
      ))}
    </div>
  );
}

/**
 * Image de section. `<img>` natif et non `next/image` : les URLs viennent du
 * back-office (Supabase ou /public) et leurs dimensions sont inconnues ; le
 * cadre impose le ratio, `object-cover` fait le reste. `loading="lazy"` sauf
 * demande contraire (image en haut de page).
 */
export function Img({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-[#e6e8e4] via-[#d6dad3] to-[#c3c8bf] text-[#7a817f] text-xs tracking-[0.2em] uppercase ${className}`}
      >
        Image
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}
