/**
 * Décodeur mojibake — Leboncoin renvoie certains champs en latin1-as-utf8.
 * Exemple : "Maison 7 piÃ¨ces 180 mÂ²" → "Maison 7 pièces 180 m²".
 *
 * Stratégie :
 * 1. Si la chaîne ne contient pas de marqueurs typiques (Ã, Â, â), passe.
 * 2. Sinon : re-décode comme bytes latin1 → UTF-8.
 * 3. Si le résultat contient U+FFFD (mojibake dégradé, octet perdu), on
 *    renvoie l'ORIGINAL plutôt qu'un texte cassé.
 */
export function decodeMojibake(s: string | undefined | null): string {
  if (!s) return "";
  if (!/[ÃÂâ]/.test(s)) return s;
  try {
    const bytes = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      bytes[i] = c > 255 ? 0x3f : c;
    }
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    // Si on a inséré des caractères de remplacement, le décodage est dégradé
    // → on garde la chaîne d'origine (au pire ça affiche "Ãchange", mais c'est
    // toujours lisible, jamais "�").
    if (decoded.includes("�")) return s;
    return decoded;
  } catch {
    return s;
  }
}
