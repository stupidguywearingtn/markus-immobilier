import {
  COMMUNE,
  DVF_ANNEE,
  DVF_SOURCE,
  QUARTIERS,
  fmtEur,
  fmtM2,
  fmtPct,
} from "@/lib/quartiers";

/**
 * Tableau des médianes €/m² par quartier de Villeurbanne.
 *
 * Même parti pris que les tableaux d'articles (`components/blog/article-body.tsx`) :
 * le tableau scrolle DANS son cadre, jamais de scroll horizontal de page.
 *
 * ⚠️ Les valeurs viennent toutes de `lib/quartiers.ts` — aucun chiffre en dur
 * ici, pour qu'un tableau ne puisse pas diverger d'un autre.
 *
 * `surligne` = clé du quartier de la page courante : sa ligne est mise en avant
 * (l'intérêt pour le lecteur est de se situer parmi les autres, pas de lire
 * sept lignes neutres).
 */
export function QuartierPrixTable({
  surligne,
  caption,
}: {
  surligne?: keyof typeof QUARTIERS;
  caption?: string;
}) {
  const rows = Object.entries(QUARTIERS).sort(
    (a, b) => b[1].median - a[1].median,
  );

  return (
    <figure className="my-6">
      <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)]">
        <table className="w-full border-collapse text-[14.5px] min-w-[520px]">
          <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
            {caption ??
              `Prix médian au m² des appartements vendus en ${DVF_ANNEE}, par quartier de Villeurbanne`}
          </caption>
          <thead>
            <tr className="bg-gris">
              {["Quartier", `Médiane ${DVF_ANNEE}`, "vs 2024", "vs 2022", "Ventes"].map(
                (h, j) => (
                  <th
                    key={h}
                    scope="col"
                    className={`px-4 py-3 font-semibold text-anthracite text-[12.5px] uppercase tracking-[0.06em] ${
                      j === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map(([key, q]) => {
              const on = key === surligne;
              return (
                <tr
                  key={key}
                  className={`border-t border-[var(--bordure)] ${
                    on ? "bg-sauge/12" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className={`px-4 py-3 text-left font-medium text-anthracite ${
                      on ? "font-bold" : ""
                    }`}
                  >
                    {q.contour}
                  </th>
                  <td
                    className={`px-4 py-3 text-right tabular-nums ${
                      on ? "font-bold text-anthracite" : "text-[#3d4347]"
                    }`}
                  >
                    {fmtM2(q.median)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                    {fmtPct(q.vs1an)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                    {fmtPct(q.vs2022)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                    {q.n}
                  </td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-anthracite/25 bg-gris">
              <th scope="row" className="px-4 py-3 text-left font-bold text-anthracite">
                Villeurbanne (toute la commune)
              </th>
              <td className="px-4 py-3 text-right tabular-nums font-bold text-anthracite">
                {fmtM2(COMMUNE.median)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                {fmtPct(COMMUNE.vs1an)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                {fmtPct(COMMUNE.vs2022)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                {COMMUNE.n}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="text-[12.5px] leading-relaxed text-[#6b7276] mt-2.5">
        Source : {DVF_SOURCE} Médianes, jamais des moyennes. Le quartier
        Saint-Jean n&apos;est pas publié : 153 ventes sur quatre ans, échantillon
        trop mince pour une médiane annuelle honnête. Prix médian communal toutes
        surfaces : {fmtEur(COMMUNE.prixMedian)} pour {COMMUNE.surfaceMediane} m².
      </figcaption>
    </figure>
  );
}
