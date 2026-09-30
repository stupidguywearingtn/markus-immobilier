import { getAllAvailableListings } from "@/lib/listings-all";
import { getReviews, getSoldItems, getTeam } from "@/lib/content-db";
import { PageEditor } from "@/components/page-builder/page-editor";

// Toujours frais : l'éditeur doit montrer les annonces / avis du moment.
export const dynamic = "force-dynamic";

/**
 * Éditeur de page plein écran. Le serveur charge une fois les données des
 * sections maison (annonces, avis, équipe, vendus) pour que l'aperçu soit
 * identique au site ; tout le reste (brouillon, publication) se fait côté
 * navigateur avec la session admin.
 */
export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [listings, reviews, sold, team] = await Promise.all([
    getAllAvailableListings(),
    getReviews(),
    getSoldItems(),
    getTeam(),
  ]);
  return <PageEditor pageId={id} meta={{ listings, reviews, sold, team }} />;
}
