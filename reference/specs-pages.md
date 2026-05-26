# Markus Immobilier — Specs des VRAIES pages (remplacer les stubs)

> À lire et exécuter. Ces pages existent en « Bientôt disponible » → les construire pour de vrai, selon les specs ci-dessous (retracées des éléments fournis par le client : WhatsApp, sites de réf, screens Foncia, PDF honoraires, trame).
> Tout respecte `design-system.md` et `CLAUDE.md`. Médias réels en attente du client → placeholders marqués, MAIS utilise les contenus fournis ici.

---

## 0. Décisions actées (appliquer partout)
- **shadcn** : installé, **thème branché sur NOS tokens** (anthracite `#383E42` / sauge `#9EA596` / gris `#F4F5F3` / Montserrat / radius / ombres). Tout composant 21st.dev importé = **recoloré à la charte** (jamais en gris shadcn). Pour chaque page : cherche d'abord sur 21st.dev, importe, adapte, dis ce que tu as pris.
- **Illustrations** : set validé + **créer `floor-plan`, `plant`, `handshake`**. Règle absolue : **toujours visibles** (jamais de filigrane 10 %), trait net qui se dessine au scroll. **Aucune section ne doit être « juste texte + image » et paraître vide** → chaque section statique reçoit une illustration/interaction.
- **`/espace-client`** : reste légitimement **« Bientôt disponible »** (espace client = feature phase 2 voulue par le client). OK tel quel, ne pas développer le back.
- **`/annonces` + `/annonces/[id]`** : validés, ne pas y retoucher sauf bug.
- **Pages légales** (`/mentions-legales`, `/confidentialite`, `/cookies`) : vraies pages sobres avec contenu standard provisoire (à compléter plus tard), pas des « bientôt ».

---

## 1. `/faire-gerer` — Gestion locative + Syndic de copropriété
**Réf** : formulaire syndic façon Foncia (2 screens d'origine). Markus fait **gestion locative ET syndic de copropriété**.

**Structure :**
- Hero/intro : eyebrow « GESTION & SYNDIC » + titre (dégradé partiel) + pitch : confiez la gestion de votre bien ou de votre copropriété à une agence locale aux outils modernes. 2 cartes courtes : « Gestion locative » (recherche locataires, états des lieux, loyers, entretien) · « Syndic de copropriété » (comptabilité, AG, suivi des travaux).
- **Formulaire multi-étapes** (façon Foncia), barre de progression à puce sauge (1 → 2) :
  - **Étape 1/2 — Vous** : Civilité (Madame / Monsieur) · Nom* · Prénom* · E-mail* · Téléphone* · « Quel est votre rôle ? » (menu : Président·e / Membre du conseil syndical / Copropriétaire) · case « Je ne suis pas un robot ».
  - **Étape 2/2 — Votre bien / copropriété** : Adresse de l'immeuble/copropriété* · Code postal* · Ville* · Nombre d'appartements (slider 0 → 200 et +, **facultatif**, libellé « Vous ne connaissez pas le nombre exact ? Ce champ est facultatif »).
  - CTA final : **« Je demande une étude personnalisée »** → écran de confirmation avec le pattern « action complétée » (✓ + toast).
- Validation : react-hook-form + zod.
- **Illustrations** : **plante qui pousse** (gestion locative = patrimoine qui grandit) ⭐ + **poignée de main** (syndic = partenariat), visibles, dessinées au scroll.

## 2. `/estimation` — L'outil d'estimation complet (LE différenciateur)
**Réf trame** : « OUTIL D'ESTIMATION COMPLET », badge « Outil n°1 », rapport PDF **en moins de 2 min sur le mail**. Estime : **vente + location + taux de rendement**. **Gratuit / sans engagement.**

**Structure :**
- Hero : eyebrow « OUTIL N°1 » + titre (dégradé) + les 5 bénéfices (estimation de vente, de location, taux de rendement, rapport PDF < 2 min, gratuit & sans engagement) avec icônes sauge.
- **Formulaire d'estimation multi-étapes** : type de bien (appartement/maison/…) · adresse · surface · nb de pièces · état · (étage, extérieur, etc.). Progression à puce sauge.
- À la soumission : **rejouer LA séquence signature en grand** (celle de la home, qui marche maintenant) : barre de chargement → le rapport se compose (valeur de vente, loyer estimé, taux de rendement) → **l'enveloppe s'envole vers la boîte mail** → toast « Rapport envoyé ✓ ». (Calcul réel plus tard ; ici = UX + animation premium.)
- **Illustration** : **clés** généreuses au-dessus du formulaire ⭐, dessinées au scroll.

## 3. `/contact` — Formulaire de contact général
**Structure :**
- Titre + lead. Formulaire : Nom · E-mail · Téléphone · Objet · Message. Validation rhf + zod.
- À l'envoi : pattern « action complétée » → **« Message envoyé ✓ »** + toast.
- Coordonnées : **04 78 37 13 67** · **villeurbanne@markusimmobilier.fr** · 87 rue Édouard Vaillant, 69100 Villeurbanne · horaires (Lun–Sam 9h–12h · Lun–Ven 14h–19h sur RDV).
- Carte Google Maps (placeholder + grille « plan » pour l'instant).
- **Illustration** : **MapPin qui tombe** au load ⭐ ; bonus si simple : la **maison dont la porte s'ouvre** quand on remplit le formulaire (interaction « fait maison »).

## 4. `/recrutement` — façon Lionrose
**Pitch client (texte exact à utiliser) :** « On recherche des **agents commerciaux indépendants** pour bosser dans une super agence avec des **outils innovants** dans un **cadre top**. »
**Réf de structure** : lionrose.fr/recrutement.

**Structure :**
- Hero accroche : « Rejoignez Markus Immobilier » + le pitch ci-dessus + CTA « Postuler / Échangeons ».
- Bloc **« Markus, c'est »** : chiffres-clés + atouts différenciants → **notre outil d'estimation n°1**, accompagnement terrain, **communauté Discord**, agence locale indépendante, cadre de travail moderne.
- **Vos missions** : recherche de biens & prise de mandats · commercialisation · gestion du portefeuille acheteur/vendeur · négociation · accompagnement et fidélisation des clients.
- **Votre profil** : commercial(e) en reconversion ou pro de l'immo · sens de la négociation · relationnel · goût du challenge.
- **Emplacements témoignages vidéo** (placeholders, à tourner plus tard — comme les parcours d'agents Lionrose).
- **Formulaire de candidature** simple : Nom · Prénom · E-mail · Téléphone · CV (facultatif) · message → « On vous rappelle pour échanger » + confirmation « action complétée ».
- **Illustration** : **poignée de main** ⭐, visible, dessinée au scroll.

## 5. `/equipe` — Trombinoscope (membres de l'agence)
**Réf trame (dernière page)** : page des membres avec, par personne : **poste, photo, nom, prénom, mail, téléphone**.
**Structure :**
- Titre + lead. Grille responsive de cartes membres : photo (placeholder rond/carré), poste, nom + prénom, mail cliquable, téléphone cliquable. Hover soigné (lift + révélation contact).
- **Données mock** pour l'instant (4–6 membres fictifs) → à remplacer quand le client envoie l'équipe réelle. Marque les slots photo.
- Pas d'illustration au premier plan (le trombinoscope est déjà visuel) ; garde un **Building discret en fond** si besoin de remplir.

## 6. `/honoraires` — Barème (contenu RÉEL ci-dessous)
Construis 3 tableaux propres dans la charte (anthracite/sauge, lisibles) + bouton **« Télécharger le PDF »** (placeholder tant que le client n'a pas envoyé le PDF officiel). **Illustration : contrat signé** à côté ⭐.

### Honoraires de transaction *(à la charge du vendeur)*
| Prestation | Honoraires TTC |
|---|---|
| Inférieur à 25 000 € | 2 000 € |
| De 25 000 € à 50 000 € | 5 000 € |
| De 50 001 € à 170 000 € | 9 000 € |
| De 170 001 € à 300 000 € | 6 % |
| De 300 001 € à 500 000 € | 5 % |
| De 500 001 € à 700 000 € | 4 % |
| De 700 001 € à 1 000 000 € | 3,5 % |
| Supérieur à 1 000 000 € | 3 % |

### Honoraires de location
*Baux d'habitation soumis à la loi du 6 juillet 1989 (conforme loi ALUR) + meublés.*
**Part locataire** *(montant max ne pouvant être supérieur aux honoraires facturés au propriétaire)* :
| Prestation | Honoraires TTC |
|---|---|
| Hors zones tendues et très tendues | 8 €/m² |
| Zones tendues | 10 €/m² |
| Zone très tendue | 12 €/m² |
| État des lieux d'entrée | 3 €/m² |
| État des lieux de sortie | 3 €/m² |
| Garage – Parking – Box – Cave | 120 € |

**Part propriétaire** *(calculés sur le loyer annuel hors charges)* : les honoraires facturés au propriétaire sont a minima équivalents à ceux du locataire → **9 %**.

### Honoraires de gestion locative
**Gestion courante :**
| Prestation | Tarif TTC |
|---|---|
| Honoraires de base — sur le total des encaissements mensuels par lot (min. 25 €) | 6 % |
| Frais et débours / extranet | 20 €/an |
| Frais annuel de correspondance (si envoi par courrier) | 45 €/lot |

**Assurances :** GLI (garantie des loyers impayés) → **2,5 %**.

**Honoraires occasionnels :**
| Prestation | Tarif TTC |
|---|---|
| Vacation horaire | 100 € |
| Déclaration et gestion de sinistre, présence expertise | Vacation |
| Réception des travaux ou livraison VEFA | Vacation |
| Ouverture dossier GLI, conciliation, relation huissier | Vacation |
| Document d'aide à la déclaration des revenus fonciers | 70 € + 10 €/lot suppl. |
| Envoi congé vente/reprise par LRAR | 100 €/lot |
| Clôture fin de gestion (dossier complet + état comptable) | 90 € + 10 €/lot suppl. |
| Gestion des travaux | 5 % du montant des travaux |

---

## Ordre de construction + checkpoints
1. `/faire-gerer` puis `/estimation` → **montre-moi ces 2 pages** (formulaires + séquence signature en grand) pour validation.
2. Puis `/contact` → `/recrutement` → `/equipe` → `/honoraires`.
3. Laisse `/espace-client` en « Bientôt disponible ». Finalise les pages légales en sobre.

Pour chaque page : 21st.dev d'abord (dis ce que tu importes), DA respectée, illustration/interaction visible, **aucune section vide**.
