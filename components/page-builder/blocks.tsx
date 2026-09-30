import type { ReactNode } from "react";
import {
  Building2,
  Calculator,
  CalendarCheck,
  Clock,
  Euro,
  FileSignature,
  Handshake,
  Home,
  Key,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/ui/counter";
import {
  BlockButton,
  Buttons,
  Img,
  Prose,
  Section,
  SectionHead,
  has,
  type Alignement,
  type Bouton,
  type Espacement,
  type Fond,
} from "./ui";

/**
 * LES SECTIONS AJOUTABLES par le client depuis l'éditeur de pages.
 *
 * Chaque composant est « pur » : des props en entrée, du HTML en sortie, aucun
 * accès aux données. Ils sont rendus côté serveur sur le site public (SEO) et
 * côté client dans l'éditeur — c'est pourquoi ce fichier n'a PAS "use client"
 * et n'importe rien de serveur.
 *
 * Les sections « maison » (Hero vidéo, Qui sommes-nous, Équipe…) ne sont pas
 * ici : elles sont branchées telles quelles dans lib/page-builder/config.*.
 */

type Base = { fond?: Fond; espacement?: Espacement; ancre?: string };

// ── Icônes proposées dans les cartes ────────────────────────────────────────
export const ICONES: Record<string, { label: string; Icon: LucideIcon }> = {
  maison: { label: "Maison", Icon: Home },
  immeuble: { label: "Immeuble", Icon: Building2 },
  cle: { label: "Clé", Icon: Key },
  contrat: { label: "Contrat signé", Icon: FileSignature },
  poignee: { label: "Poignée de main", Icon: Handshake },
  hausse: { label: "Courbe en hausse", Icon: TrendingUp },
  calcul: { label: "Calculatrice", Icon: Calculator },
  euro: { label: "Euro", Icon: Euro },
  bouclier: { label: "Bouclier (garantie)", Icon: ShieldCheck },
  equipe: { label: "Équipe", Icon: Users },
  horloge: { label: "Horloge", Icon: Clock },
  agenda: { label: "Rendez-vous", Icon: CalendarCheck },
  pin: { label: "Localisation", Icon: MapPin },
  telephone: { label: "Téléphone", Icon: Phone },
  message: { label: "Message", Icon: MessageCircle },
  plante: { label: "Plante (gestion)", Icon: Leaf },
  etoile: { label: "Étincelle", Icon: Sparkles },
};

// ── 1. Bandeau d'ouverture (H1) ─────────────────────────────────────────────
export type BandeauProps = {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  hauteur?: "moyenne" | "grande";
  alignement?: Alignement;
  bouton1?: Bouton;
  bouton2?: Bouton;
};

export function Bandeau({
  eyebrow,
  titre,
  titreAccent,
  intro,
  image,
  imageAlt,
  hauteur = "moyenne",
  alignement = "gauche",
  bouton1,
  bouton2,
}: BandeauProps) {
  const centre = alignement === "centre";
  return (
    <section
      className={`relative overflow-hidden bg-anthracite text-blanc flex items-end ${
        hauteur === "grande" ? "min-h-[88svh]" : "min-h-[62svh] max-md:min-h-[70svh]"
      }`}
    >
      {image && <Img src={image} alt={imageAlt} eager className="absolute inset-0 w-full h-full" />}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(31,35,38,0.92) 0%, rgba(56,62,66,0.62) 45%, rgba(56,62,66,0.35) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className={`relative z-[1] w-full max-w-content mx-auto px-8 max-md:px-5 pt-[160px] pb-[88px] max-md:pb-[56px] ${
          centre ? "text-center" : ""
        }`}
      >
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow={eyebrow}
            titre={titre}
            titreAccent={titreAccent}
            intro={intro}
            alignement={alignement}
            fond="anthracite"
          />
          <Buttons boutons={[bouton1, bouton2]} fond="anthracite" centre={centre} />
        </Reveal>
      </div>
    </section>
  );
}

// ── 2. Titre de section ─────────────────────────────────────────────────────
export type TitreProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  alignement?: Alignement;
};

export function TitreSection({ fond = "blanc", espacement = "compact", ancre, alignement = "gauche", ...p }: TitreProps) {
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal>
        <SectionHead {...p} alignement={alignement} fond={fond} />
      </Reveal>
    </Section>
  );
}

// ── 3. Texte + image ────────────────────────────────────────────────────────
export type TexteImageProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  texte?: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: "gauche" | "droite";
  format?: "portrait" | "paysage" | "carre";
  bouton?: Bouton;
};

const RATIO = { portrait: "aspect-[4/5]", paysage: "aspect-[3/2]", carre: "aspect-square" };

export function TexteImage({
  fond = "blanc",
  espacement = "normal",
  ancre,
  eyebrow,
  titre,
  titreAccent,
  texte,
  image,
  imageAlt,
  imagePosition = "gauche",
  format = "portrait",
  bouton,
}: TexteImageProps) {
  const imgFirst = imagePosition === "gauche";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <div className="grid gap-[64px] max-md:gap-10 items-center grid-cols-1 lg:grid-cols-2">
        <Reveal className={imgFirst ? "" : "lg:order-2"}>
          <div
            className={`relative ${RATIO[format] ?? RATIO.portrait} rounded-[14px] overflow-hidden shadow-[0_28px_60px_-24px_rgba(56,62,66,0.45)]`}
          >
            <Img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full" />
          </div>
        </Reveal>
        <Reveal delay={120} className={imgFirst ? "" : "lg:order-1"}>
          <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} fond={fond} />
          <Prose fond={fond} className="mt-2">
            {texte}
          </Prose>
          {bouton && has(bouton.label) && (
            <div className="mt-8">
              <BlockButton bouton={bouton} fond={fond} />
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

// ── 4. Texte libre ──────────────────────────────────────────────────────────
export type TexteProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  texte?: ReactNode;
  largeur?: "etroite" | "large";
  alignement?: Alignement;
};

export function TexteLibre({ fond = "blanc", espacement = "normal", ancre, eyebrow, titre, texte, largeur = "etroite", alignement = "gauche" }: TexteProps) {
  const centre = alignement === "centre";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className={`${largeur === "large" ? "max-w-[980px]" : "max-w-[760px]"} ${centre ? "mx-auto text-center" : ""}`}>
        <SectionHead eyebrow={eyebrow} titre={titre} fond={fond} alignement={alignement} />
        <Prose fond={fond}>{texte}</Prose>
      </Reveal>
    </Section>
  );
}

// ── 5. Chiffres clés ────────────────────────────────────────────────────────
export type ChiffresProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  items?: { valeur?: number; suffixe?: string; label?: ReactNode }[];
};

export function Chiffres({ fond = "anthracite", espacement = "normal", ancre, eyebrow, titre, titreAccent, items = [] }: ChiffresProps) {
  const sombre = fond === "anthracite";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="mb-12 max-md:mb-8">
        <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} fond={fond} />
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-md:gap-6">
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className={`border-t pt-6 ${sombre ? "border-blanc/15" : "border-[var(--bordure)]"}`}>
              <div className="font-extrabold leading-none text-[clamp(34px,4.4vw,54px)]">
                <Counter target={Number(s.valeur) || 0} suffix={s.suffixe ?? ""} />
              </div>
              <div className={`text-sm mt-2 tracking-[0.04em] ${sombre ? "text-blanc/70" : "text-[#5a6166]"}`}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 6. Cartes (services, atouts) ────────────────────────────────────────────
export type CartesProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  colonnes?: "2" | "3" | "4";
  items?: { icone?: string; titre?: ReactNode; texte?: ReactNode; lien?: string; lienLabel?: string }[];
};

const COLS = { "2": "md:grid-cols-2", "3": "md:grid-cols-2 lg:grid-cols-3", "4": "md:grid-cols-2 lg:grid-cols-4" };

export function Cartes({ fond = "gris", espacement = "normal", ancre, eyebrow, titre, titreAccent, intro, colonnes = "3", items = [] }: CartesProps) {
  const sombre = fond === "anthracite";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="mb-12 max-md:mb-8">
        <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} intro={intro} fond={fond} />
      </Reveal>
      <div className={`grid grid-cols-1 ${COLS[colonnes] ?? COLS["3"]} gap-6 max-md:gap-4`}>
        {items.map((c, i) => {
          const Icon = ICONES[c.icone ?? ""]?.Icon;
          return (
            <Reveal key={i} delay={Math.min(i, 5) * 100}>
              <div
                className={`h-full rounded-[16px] p-8 max-md:p-6 transition duration-300 hover:-translate-y-1 ${
                  sombre
                    ? "bg-blanc/[0.06] ring-1 ring-blanc/10"
                    : fond === "gris"
                      ? "bg-blanc shadow-[0_18px_40px_-28px_rgba(56,62,66,0.35)]"
                      : "bg-gris"
                }`}
              >
                {Icon && (
                  <div className={`w-12 h-12 rounded-full grid place-items-center mb-6 ${sombre ? "bg-blanc/10" : "bg-anthracite"}`}>
                    <Icon className="w-5 h-5 text-sauge" strokeWidth={1.8} />
                  </div>
                )}
                {has(c.titre) && <h3 className="font-semibold text-[20px] leading-snug mb-3">{c.titre}</h3>}
                {has(c.texte) && (
                  <p className={`leading-relaxed text-[15px] ${sombre ? "text-blanc/75" : "text-[#5a6166]"}`}>{c.texte}</p>
                )}
                {has(c.lien) && (
                  <a
                    href={c.lien}
                    className="inline-flex items-center gap-2 mt-5 text-[13px] font-semibold uppercase tracking-[0.06em] text-sauge hover:text-sauge-hover"
                  >
                    {has(c.lienLabel) ? c.lienLabel : "En savoir plus"} →
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

// ── 7. Étapes (processus) ───────────────────────────────────────────────────
export type EtapesProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  items?: { titre?: ReactNode; texte?: ReactNode }[];
};

export function Etapes({ fond = "blanc", espacement = "normal", ancre, eyebrow, titre, titreAccent, intro, items = [] }: EtapesProps) {
  const sombre = fond === "anthracite";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="mb-12 max-md:mb-8">
        <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} intro={intro} fond={fond} />
      </Reveal>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-md:gap-6">
        {items.map((e, i) => (
          <Reveal key={i} delay={i * 100}>
            <li className="list-none">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-11 h-11 shrink-0 rounded-full grid place-items-center font-bold text-sm bg-sauge text-blanc">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`h-px flex-1 ${sombre ? "bg-blanc/15" : "bg-[var(--bordure)]"}`} aria-hidden="true" />
              </div>
              {has(e.titre) && <h3 className="font-semibold text-[19px] leading-snug mb-2">{e.titre}</h3>}
              {has(e.texte) && (
                <p className={`leading-relaxed text-[15px] ${sombre ? "text-blanc/75" : "text-[#5a6166]"}`}>{e.texte}</p>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

// ── 8. Appel à l'action ─────────────────────────────────────────────────────
export type AppelProps = {
  ancre?: string;
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  texte?: ReactNode;
  image?: string;
  bouton1?: Bouton;
  bouton2?: Bouton;
};

export function AppelAction({ ancre, eyebrow, titre, titreAccent, texte, image, bouton1, bouton2 }: AppelProps) {
  return (
    <section id={ancre || undefined} className="bg-blanc py-[96px] max-md:py-[56px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[18px] bg-anthracite text-blanc px-16 py-20 max-md:px-6 max-md:py-12 text-center">
            {image && <Img src={image} alt="" className="absolute inset-0 w-full h-full opacity-30" />}
            <div className="absolute inset-0 bg-gradient-to-br from-anthracite/60 via-anthracite/80 to-[#1f2326]/95" aria-hidden="true" />
            <div className="relative z-[1]">
              <SectionHead
                eyebrow={eyebrow}
                titre={titre}
                titreAccent={titreAccent}
                intro={texte}
                alignement="centre"
                fond="anthracite"
              />
              <Buttons boutons={[bouton1, bouton2]} fond="anthracite" centre />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 9. Image pleine largeur ─────────────────────────────────────────────────
export type ImagePleineProps = {
  image?: string;
  imageAlt?: string;
  hauteur?: "moyenne" | "grande";
  legende?: ReactNode;
  cadre?: "pleine" | "contenu";
};

export function ImagePleine({ image, imageAlt, hauteur = "moyenne", legende, cadre = "pleine" }: ImagePleineProps) {
  const h = hauteur === "grande" ? "h-[80vh] max-md:h-[60vh]" : "h-[56vh] max-md:h-[40vh]";
  const figure = (
    <figure className="relative">
      <div className={`relative ${h} overflow-hidden ${cadre === "contenu" ? "rounded-[14px]" : ""}`}>
        <Img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full" />
      </div>
      {has(legende) && (
        <figcaption className="text-[13px] text-[#7a817f] mt-3 px-1">{legende}</figcaption>
      )}
    </figure>
  );
  if (cadre === "contenu") {
    return (
      <div className="bg-blanc py-[64px] max-md:py-[40px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal>{figure}</Reveal>
        </div>
      </div>
    );
  }
  return <div className="bg-blanc">{figure}</div>;
}

// ── 10. Galerie ─────────────────────────────────────────────────────────────
export type GalerieProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  colonnes?: "2" | "3" | "4";
  format?: "paysage" | "portrait" | "carre";
  images?: { image?: string; alt?: string; legende?: ReactNode }[];
};

const GAL_COLS = { "2": "grid-cols-1 sm:grid-cols-2", "3": "grid-cols-2 lg:grid-cols-3", "4": "grid-cols-2 lg:grid-cols-4" };
const GAL_RATIO = { paysage: "aspect-[3/2]", portrait: "aspect-[4/5]", carre: "aspect-square" };

export function Galerie({ fond = "blanc", espacement = "normal", ancre, eyebrow, titre, titreAccent, colonnes = "3", format = "paysage", images = [] }: GalerieProps) {
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="mb-10 max-md:mb-7">
        <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} fond={fond} />
      </Reveal>
      <div className={`grid ${GAL_COLS[colonnes] ?? GAL_COLS["3"]} gap-4 max-md:gap-3`}>
        {images.map((im, i) => (
          <Reveal key={i} delay={Math.min(i, 6) * 80}>
            <figure>
              <div className={`relative ${GAL_RATIO[format] ?? GAL_RATIO.paysage} rounded-[12px] overflow-hidden group`}>
                <Img
                  src={im.image}
                  alt={im.alt}
                  className="absolute inset-0 w-full h-full transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {has(im.legende) && <figcaption className="text-[13px] mt-2 opacity-70">{im.legende}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 11. Vidéo ───────────────────────────────────────────────────────────────
export type VideoProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  url?: string;
  /** Vrai dans l'éditeur : on y montre l'aide « collez un lien » ; en ligne, rien. */
  editing?: boolean;
};

/** Transforme un lien YouTube / Vimeo « normal » en lien d'intégration. */
export function embedUrl(url?: string): { kind: "iframe" | "file"; src: string } | null {
  if (!url) return null;
  const u = url.trim();
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm)(\?|$)/i.test(u)) return { kind: "file", src: u };
  return null;
}

export function Video({ fond = "blanc", espacement = "normal", ancre, eyebrow, titre, url, editing }: VideoProps) {
  const e = embedUrl(url);
  if (!e && !editing) return null;
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="mb-10 max-md:mb-7">
        <SectionHead eyebrow={eyebrow} titre={titre} fond={fond} />
      </Reveal>
      <Reveal>
        <div className="relative aspect-video rounded-[14px] overflow-hidden bg-anthracite">
          {e?.kind === "iframe" && (
            <iframe
              src={e.src}
              title={typeof titre === "string" ? titre : "Vidéo"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
          {e?.kind === "file" && (
            <video src={e.src} controls playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
          )}
          {!e && (
            <div className="absolute inset-0 grid place-items-center text-blanc/60 text-sm px-6 text-center">
              Collez un lien YouTube, Vimeo ou un fichier .mp4
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

// ── 12. Questions fréquentes (avec données structurées FAQPage) ─────────────
export type FaqProps = Base & {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  items?: { question?: ReactNode; reponse?: ReactNode }[];
  /** Texte brut des Q/R pour le JSON-LD — injecté par la config serveur. */
  jsonLd?: string;
};

export function Faq({ fond = "gris", espacement = "normal", ancre, eyebrow, titre, titreAccent, items = [], jsonLd }: FaqProps) {
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} fond={fond} />
        </Reveal>
        <div className={`divide-y ${fond === "anthracite" ? "divide-blanc/15" : "divide-[var(--bordure)]"}`}>
          {items.map((q, i) => (
            <Reveal key={i} delay={Math.min(i, 5) * 60}>
              <details className="group py-5">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none font-semibold text-[17px] leading-snug">
                  <span>{q.question}</span>
                  <span className="text-sauge text-2xl leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p
                  className={`mt-3 pr-10 leading-relaxed whitespace-pre-line ${
                    fond === "anthracite" ? "text-blanc/80" : "text-[#5a6166]"
                  }`}
                >
                  {q.reponse}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
    </Section>
  );
}

// ── 13. Témoignage (citation) ───────────────────────────────────────────────
export type CitationProps = Base & {
  citation?: ReactNode;
  auteur?: ReactNode;
  detail?: ReactNode;
};

export function Citation({ fond = "blanc", espacement = "normal", ancre, citation, auteur, detail }: CitationProps) {
  const sombre = fond === "anthracite";
  return (
    <Section fond={fond} espacement={espacement} id={ancre}>
      <Reveal className="max-w-[860px] mx-auto text-center">
        <div className="text-sauge text-[64px] leading-none font-serif mb-2" aria-hidden="true">
          “
        </div>
        <blockquote className="font-semibold leading-[1.35] text-[clamp(22px,2.6vw,32px)] tracking-[-0.01em]">
          {citation}
        </blockquote>
        {(has(auteur) || has(detail)) && (
          <p className="mt-8 text-sm">
            <span className="font-bold uppercase tracking-[0.12em]">{auteur}</span>
            {has(detail) && <span className={sombre ? "text-blanc/60" : "text-[#7a817f]"}> · {detail}</span>}
          </p>
        )}
      </Reveal>
    </Section>
  );
}

// ── 14. Espace / séparateur ─────────────────────────────────────────────────
export type EspaceProps = { fond?: Fond; hauteur?: "petit" | "moyen" | "grand"; trait?: "oui" | "non" };

export function Espace({ fond = "blanc", hauteur = "moyen", trait = "non" }: EspaceProps) {
  const h = hauteur === "petit" ? "h-10" : hauteur === "grand" ? "h-32 max-md:h-20" : "h-20 max-md:h-12";
  return (
    <div className={`${fond === "anthracite" ? "bg-anthracite" : fond === "gris" ? "bg-gris" : "bg-blanc"} ${h} flex items-center`}>
      {trait === "oui" && (
        <div className="w-full max-w-content mx-auto px-8 max-md:px-5">
          <div className={`h-px ${fond === "anthracite" ? "bg-blanc/15" : "bg-[var(--bordure)]"}`} />
        </div>
      )}
    </div>
  );
}
