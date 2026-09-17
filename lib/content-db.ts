import { serverSupabase } from "@/lib/supabase/server";
import { TEAM, type TeamMember } from "@/lib/mock-team";
import { REVIEWS_FALLBACK, frDate, type Review } from "@/lib/reviews";
import { SOLD_ITEMS, type SoldItem } from "@/lib/sold-gallery";

/**
 * Lecture SERVEUR des contenus gérés dans le back-office :
 * équipe (/admin/equipe), avis (/admin/avis), biens vendus (/admin/vendus).
 * Ne JAMAIS importer depuis un composant client.
 *
 * Règle de repli, identique pour les trois :
 *   - la base répond              → on affiche la base, même vide
 *                                    (le client a pu tout retirer volontairement) ;
 *   - la base est absente / en erreur (migration 0003 pas appliquée, panne)
 *                                  → on affiche la liste statique d'origine.
 * Un visiteur ne voit donc jamais une section cassée à cause de Supabase.
 *
 * ISR 10 s, comme les annonces : une modif apparaît sous ~10 s sans rendre
 * les pages dynamiques.
 */

const REVALIDATE = 10;

/** Laisse remonter le signal interne « route dynamique » de Next. */
function rethrowNextControl(e: unknown) {
  if (
    e &&
    typeof e === "object" &&
    "digest" in e &&
    String((e as { digest?: unknown }).digest).startsWith("DYNAMIC_SERVER_USAGE")
  ) {
    throw e;
  }
}

async function readTable<T>(
  table: string,
  cols: string,
): Promise<T[] | null> {
  const supabase = serverSupabase(REVALIDATE);
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from(table)
      .select(cols)
      .eq("visible", true)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      console.error(`[content-db] lecture ${table} :`, error.message);
      return null;
    }
    return (data as T[]) ?? [];
  } catch (e) {
    rethrowNextControl(e);
    console.error(`[content-db] exception ${table} :`, e instanceof Error ? e.message : e);
    return null;
  }
}

const TONES: TeamMember["avatarTone"][] = ["anthracite", "sauge", "warm", "cool"];

type TeamRow = {
  id: string;
  prenom: string;
  nom: string;
  badge: string | null;
  poste: string;
  bio: string | null;
  email: string | null;
  telephone: string | null;
  photo_url: string | null;
};

export async function getTeam(): Promise<TeamMember[]> {
  const rows = await readTable<TeamRow>(
    "team_members",
    "id, prenom, nom, badge, poste, bio, email, telephone, photo_url",
  );
  if (rows === null) return TEAM;
  return rows.map((r, i) => ({
    id: r.id,
    prenom: r.prenom,
    nom: r.nom,
    label: r.badge ?? undefined,
    poste: r.poste,
    bio: r.bio ?? undefined,
    email: r.email ?? "",
    telephone: r.telephone ?? "",
    photo: r.photo_url,
    avatarTone: TONES[i % TONES.length],
  }));
}

type ReviewRow = {
  id: string;
  auteur: string;
  date_avis: string;
  note: number;
  texte: string;
};

export async function getReviews(): Promise<Review[]> {
  const rows = await readTable<ReviewRow>("reviews", "id, auteur, date_avis, note, texte");
  if (rows === null) return REVIEWS_FALLBACK;
  return rows.map((r) => ({
    id: r.id,
    name: r.auteur,
    date: frDate(r.date_avis),
    stars: Math.max(1, Math.min(5, r.note)),
    text: r.texte,
  }));
}

type SoldRow = { id: string; titre: string; photo_url: string; feminin: boolean };

export async function getSoldItems(): Promise<SoldItem[]> {
  const rows = await readTable<SoldRow>("sold_items", "id, titre, photo_url, feminin");
  if (rows === null) return SOLD_ITEMS;
  return rows
    .filter((r) => r.photo_url)
    .map((r) => ({ id: r.id, src: r.photo_url, titre: r.titre, feminin: r.feminin }));
}
