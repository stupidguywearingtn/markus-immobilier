import type { ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/blog";

/**
 * Marqueurs inline reconnus dans le texte des articles :
 *   **gras**              → <strong>
 *   [texte](/chemin)      → <Link> interne
 *   [texte](https://…)    → <a> externe (nouvel onglet, rel sûr)
 *   **[texte](/chemin)**  → le même lien, en gras
 *
 * Le href doit commencer par « / » ou « http(s):// » et ne contient ni espace
 * ni parenthèse fermante : une phrase qui écrit « … (voir plus bas) » après des
 * crochets ne peut donc pas être capturée par erreur.
 *
 * ⚠️ L'ordre des alternatives compte, et il a déjà coûté un bug (22/09/2026) :
 * `**[DPE](/blog/…)**` ne contient aucune `*` entre ses deux paires, donc
 * l'alternative « gras » le capturait en entier et l'affichait tel quel —
 * crochets et URL visibles par le lecteur. La forme « lien en gras » doit donc
 * rester **en premier**, sinon le markdown ressort brut à l'écran. Vérifier
 * toute modification de cette regex sur le HTML rendu, jamais sur le source.
 */
const INLINE_RE =
  /(\*\*\[[^\]\n]+\]\((?:\/|https?:\/\/)[^)\s]+\)\*\*|\*\*[^*]+\*\*|\[[^\]\n]+\]\((?:\/|https?:\/\/)[^)\s]+\))/g;
const LINK_RE = /^\[([^\]\n]+)\]\(((?:\/|https?:\/\/)[^)\s]+)\)$/;
const BOLD_LINK_RE =
  /^\*\*\[([^\]\n]+)\]\(((?:\/|https?:\/\/)[^)\s]+)\)\*\*$/;

/** Lien de corps d'article : texte anthracite, soulignement sauge (accent). */
const LINK_CLASS =
  "text-anthracite font-medium underline decoration-sauge decoration-2 underline-offset-[3px] hover:decoration-anthracite transition-colors";
/** Même lien, au poids du <strong> voisin (listes « terme : définition »). */
const LINK_CLASS_BOLD = LINK_CLASS.replace("font-medium", "font-semibold");

function link(
  key: number,
  label: string,
  href: string,
  className: string,
): ReactNode {
  return href.startsWith("/") ? (
    <Link key={key} href={href} className={className}>
      {label}
    </Link>
  ) : (
    <a
      key={key}
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

function inline(text: string): ReactNode[] {
  return text.split(INLINE_RE).map((part, i) => {
    const bold = BOLD_LINK_RE.exec(part);
    if (bold) return link(i, bold[1], bold[2], LINK_CLASS_BOLD);
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-anthracite">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const plain = LINK_RE.exec(part);
    if (plain) return link(i, plain[1], plain[2], LINK_CLASS);
    return <span key={i}>{part}</span>;
  });
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-bold tracking-[-0.01em] text-anthracite pt-4 leading-[1.2]"
                style={{ fontSize: "clamp(21px, 2.4vw, 28px)" }}
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-semibold tracking-[-0.01em] text-anthracite pt-2 leading-[1.3]"
                style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[16px] leading-[1.75] text-[#3d4347]">
                {inline(b.text)}
              </p>
            );
          case "table":
            return (
              <figure key={i} className="my-2">
                {/* le tableau scrolle dans son cadre : jamais de scroll horizontal de page */}
                <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)]">
                  <table className="w-full border-collapse text-[14.5px] min-w-[480px]">
                    {b.caption && (
                      <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
                        {b.caption}
                      </caption>
                    )}
                    <thead>
                      <tr className="bg-gris">
                        {b.headers.map((h, j) => (
                          <th
                            key={j}
                            scope="col"
                            className={`px-4 py-3 font-semibold text-anthracite text-[12.5px] uppercase tracking-[0.06em] ${
                              j === 0 ? "text-left" : "text-right"
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, j) => (
                        <tr key={j} className="border-t border-[var(--bordure)]">
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className={`px-4 py-3 text-[#3d4347] ${
                                k === 0
                                  ? "text-left font-medium text-anthracite"
                                  : "text-right tabular-nums"
                              }`}
                            >
                              {inline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.source && (
                  <figcaption className="mt-2 text-[12.5px] text-[#6b7276] leading-relaxed">
                    {b.source}
                  </figcaption>
                )}
              </figure>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 mt-1 rounded-full bg-sauge/20 grid place-items-center">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--color-sauge)" strokeWidth="2.8">
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </span>
                    <span className="text-[16px] leading-[1.7] text-[#3d4347]">
                      {inline(it)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5 counter-reset">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-anthracite text-blanc grid place-items-center text-[12px] font-bold tabular-nums">
                      {j + 1}
                    </span>
                    <span className="text-[16px] leading-[1.7] text-[#3d4347] pt-0.5">
                      {inline(it)}
                    </span>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
