# Markus — vidéos

Place ici les vidéos du site. Le composant `HeroVideo` cherche par ordre de préférence :

1. `public/videos/hero.webm` (compression idéale, ~30 % plus léger)
2. `public/videos/hero.mp4`  (compatibilité universelle)

Et un poster de fallback :

3. `public/videos/hero-poster.jpg` (frame statique, affichée pendant le chargement
   ou si le navigateur ne lit pas la vidéo)

Si **aucun** fichier n'est présent, le hero affiche son dégradé ken-burns
(le site reste impeccable en attendant la vidéo).

## Spécifications attendues

- Durée : ~10 s (max 15 s)
- Ratio : 16:9
- Muette : aucune piste audio
- Cadrage qui boucle proprement (image de début ≈ image de fin)
- Compression : H.264 (mp4) ou VP9/AV1 (webm), ~3–6 Mo recommandé
- Pas de texte, pas de personnes, pas de logo incrusté
