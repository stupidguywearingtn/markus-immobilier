# MARKUS IMMOBILIER — design-system.md

> Source de vérité visuelle du site. Référencé par `CLAUDE.md`. En cas de doute, ce fichier tranche.
> Référence visuelle vivante : `/reference/markus-immobilier-maquette-v2.html`.

---

## 1. Essence
Agence immobilière indépendante à Villeurbanne / Lyon. **Premium, sobre, épuré, beaucoup de respiration et de vidéo.** Pas de surcharge, peu d'informations par écran. Aesthetic : luxe refined / minimal.

## 2. Couleurs
```css
--anthracite:#383E42;   /* dominante ~60% : fonds sombres, header, footer, titres, overlays vidéo */
--blanc:#FFFFFF;         /* ~30% : fonds clairs, texte sur foncé */
--sauge:#9EA596;         /* ACCENT ~10% max : boutons 2nd, hover, traits, icônes, labels */
--gris:#F4F5F3;          /* fond de section alterné */
--sauge-hover:#8A9281;
--bordure:rgba(56,62,66,.12);
--anthracite-60:rgba(56,62,66,.60);  /* overlay vidéo léger */
--anthracite-90:rgba(56,62,66,.90);  /* overlay vidéo fort */
```
- `#9EA596` = **vert-sauge grisé, PAS un beige** — visuels en tons neutres/froids.
- Sauge JAMAIS en grand aplat ni en texte de corps (lisibilité).
- Texte sur foncé = blanc ; sur clair = anthracite.

### Dégradés de titres (validés)
```css
/* fond clair */ .grad{background:linear-gradient(100deg,var(--anthracite) 10%,var(--sauge) 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
/* fond foncé */ .grad-light{background:linear-gradient(100deg,#fff 20%,var(--sauge) 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
```
Usage : sur **une partie du titre** (1–3 mots clés), pas tout. Subtil.

## 3. Typographie — Montserrat (uniquement)
| Usage | Poids | Taille desktop | Casse / tracking |
|---|---|---|---|
| Hero H1 | 800 | clamp(40px,7vw,82px) | normale, -0.02em |
| H2 section | 700 | clamp(30px,4vw,46px) | normale |
| H3 carte | 600 | 18–26px | normale |
| Sur-titre (eyebrow) | 600 | 12px | MAJ, +0.28em, **couleur sauge** |
| Bouton | 600 | 14px | MAJ, +0.06em |
| Corps | 400 | 16–18px, interligne 1.6 | normale |

L'eyebrow MAJ espacée sauge est la **signature de marque** (rappel du logo) — sur chaque section.

## 4. Layout & espacements
- Largeur max contenu : 1240px. Marges : 24px mobile / 32–48px desktop.
- Padding vertical de section : 120px desktop / 72px mobile.
- Rayons : cartes 12–18px · boutons 6px · images 12px.
- Alterner les fonds : blanc → gris → anthracite, pour rythmer le scroll. Sections fortes (hero, estimation, biens vendus, footer) en anthracite/vidéo.

## 5. Composants
**Boutons** : primary (anthracite, texte blanc), sauge (accent), ghost (bordure blanche sur vidéo — se remplit au hover), outline (bordure sauge). MAJ, tracking +0.06em. Hover : translateY(-2px) + ombre, 0.25s.

**Carte bien** : carrousel photo (indicateur « 1/3 » + dots, auto-rotation), badge « À vendre/À louer » (sauge pour location), prix, localisation (pin), titre, specs (pièces · m²), lien « Voir le bien ». Hover : lift -6px + ombre + zoom image.

**Header** : sticky, transparent sur le hero → fond anthracite plein au scroll (transition 0.3s). Logo blanc → compact au scroll. Droite : FR/EN · Contactez-nous · On recrute · icône Espace client · 04 78 37 13 67.

**Formulaires** : inputs fond blanc, bordure `--bordure`, radius 8px, icône à gauche, focus = bordure sauge. **Form syndic = multi-étapes** (1/2 → 2/2, barre de progression à puce sauge — voir page Faire gérer).

**Compteurs** : gros chiffre Montserrat 800 + « + », s'incrémente au scroll (IntersectionObserver).

**Eyebrow + titre** : chaque section ouvre par `<eyebrow sauge MAJ>` + H2 (avec dégradé partiel possible).

## 6. Patterns d'animation signature
**A. Reveal au scroll** : fade + translateY(26px)→0, durée 0.7–0.8s, easing `cubic-bezier(.22,1,.36,1)`, stagger 100ms sur les groupes.

**B. Hero** : fond vidéo boucle muette + overlay `--anthracite-60/90` + ken-burns lent ; logo/CTA en fade-up.

**C. Estimation — séquence « génération → mail → notif »** (signature du site) :
1. barre de chargement 0→100% avec % qui défile,
2. le rapport se révèle (sort du flou),
3. une **enveloppe s'envole** de la carte vers une pastille « boîte mail »,
4. le **compteur de la boîte** s'incrémente (pulse) + **toast « Rapport envoyé ✓ »** slide-in.
→ Ce langage « action complétée » est à **réutiliser** ailleurs : contact (« Message envoyé ✓ »), candidature recrutement, etc.

**D. Parallaxe galerie** (biens vendus, inspiré Skiper UI #30) : section haute, colonnes de photos translatées à vitesses différentes au scroll. Sur Claude Code : utiliser **framer-motion + Lenis** (le vrai composant Skiper) pour un rendu beurré.

**E. Trait SVG qui suit le scroll** (inspiré Skiper UI #19) : path dessiné via `stroke-dashoffset` piloté par la progression scroll. Comble le vide des sections statiques.

> Toujours respecter `prefers-reduced-motion` (désactiver parallaxe, ken-burns, flights ; contenu lisible et figé).

## 7. Bibliothèque d'illustrations (SVG « trait qui se dessine »)
Illustrations vectorielles légères, stroke anthracite + accents sauge, animées au scroll via `stroke-dasharray/offset` (astuce `pathLength="1"`). Réf : `/reference/markus-illustrations-demo.html`.
- **Immeuble qui se construit** → hero / Qui sommes-nous
- **Clés** → estimation / remise des clés / biens vendus
- **Maison + porte qui s'ouvre** → accueil / Acheter-Louer
- **Contrat signé** (signature qui se trace + tampon ✓) → biens vendus / Faire gérer / témoignages
- À décliner : poignée de main, plan d'appartement, plante qui pousse (gestion locative), pin de carte.

## 8. Imagerie & vidéo
- Photo : lumineuse, volumes, tons neutres/froids accordés au sauge. Jamais de filtres chauds.
- Vidéo (signature) : hero plein écran (boucle muette + overlay), section estimation (démo), footer (fond vidéo discret). `muted loop playsinline`, fallback image, compressé, reduced-motion respecté.

## 9. Logo
- Sur fond anthracite/vidéo → logo **blanc**. Sur fond clair → logo **anthracite**.
- (Maquette : reconstitution SVG. Remplacer par le vrai fichier logo.)

## 10. Ton éditorial
Phrases courtes, sûres, sans jargon. Mettre en avant : **outil d'estimation gratuit < 2 min (vente + location + rendement, rapport PDF)** et le **Discord communautaire**. Peu d'infos par écran.

## 11. Coordonnées officielles (à câbler partout)
```
Nom        : MARKUS IMMOBILIER
Tél        : 04 78 37 13 67
Email      : villeurbanne@markusimmobilier.fr
Adresse    : 87 rue Édouard Vaillant, 69100 Villeurbanne
Horaires   : Lun–Sam 9h–12h · Lun–Ven 14h–19h sur RDV
Instagram  : instagram.com/markusimmobilier
TikTok     : tiktok.com/@markusimmobilier
X          : x.com/markusimmo_
YouTube    : youtube.com/@markusimmobilier
Facebook   : facebook.com/profile.php?id=61566295948630
LinkedIn   : linkedin.com/company/markusimmobilier
Discord    : discord.gg/fSyn28G5U
```

## 12. À NE JAMAIS faire
- Écrire « GRAND IMMO LYON » (c'est **MARKUS IMMOBILIER**) · tél 04 72 37 69 69 · email markusimmo.fr.
- Couleurs chaudes / beige réel / dégradés violets / esthétique « AI slop ».
- Sauge en grand aplat ou en texte de corps.
- Polices génériques (Inter, Roboto, Arial). **Montserrat only.**
- Réordonner les sections de la home (ordre de la trame client, voir CLAUDE.md).
