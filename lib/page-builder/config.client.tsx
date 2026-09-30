"use client";

import type { Listing } from "@/lib/listings";
import type { Review } from "@/lib/reviews";
import type { SoldItem } from "@/lib/sold-gallery";
import type { TeamMember } from "@/lib/mock-team";
import { Hero } from "@/components/home/hero";
import { Properties } from "@/components/home/properties";
import { About } from "@/components/home/about";
import { TeamView } from "@/components/home/team-view";
import { SoldParallax } from "@/components/home/sold-parallax";
import { Estimation } from "@/components/home/estimation";
import { Reviews } from "@/components/home/reviews";
import { Faq as HomeFaq } from "@/components/home/faq";
import { Social } from "@/components/home/social";
import { Agency } from "@/components/home/agency";
import * as B from "@/components/page-builder/blocks";
import { ContactBlock } from "@/components/page-builder/contact-block";
import { makeConfig } from "./definitions";

/**
 * Configuration de l'ÉDITEUR (navigateur).
 * Les sections maison qui ont besoin de données (annonces, avis, équipe,
 * vendus) les reçoivent via `meta`, chargé une fois par la page serveur de
 * l'éditeur (app/admin/pages/[id]/page.tsx).
 */
export type EditorMeta = {
  listings?: Listing[];
  reviews?: Review[];
  sold?: SoldItem[];
  team?: TeamMember[];
};

type M = { meta?: EditorMeta };

export const editorConfig = makeConfig({
  MaisonHero: () => <Hero />,
  MaisonBiens: ({ meta }: M) => <Properties listings={meta?.listings} />,
  MaisonAPropos: () => <About />,
  MaisonEquipe: ({ meta }: M) => <TeamView team={meta?.team ?? []} />,
  MaisonVendus: ({ meta }: M) => <SoldParallax items={meta?.sold ?? []} />,
  MaisonEstimation: () => <Estimation />,
  MaisonAvis: ({ meta }: M) => <Reviews reviews={meta?.reviews ?? []} />,
  MaisonFaq: () => <HomeFaq />,
  MaisonReseaux: () => <Social />,
  MaisonAgence: () => <Agency />,

  Bandeau: B.Bandeau,
  TitreSection: B.TitreSection,
  TexteImage: B.TexteImage,
  TexteLibre: B.TexteLibre,
  Chiffres: B.Chiffres,
  Cartes: B.Cartes,
  Etapes: B.Etapes,
  Faq: B.Faq,
  Citation: B.Citation,
  ImagePleine: B.ImagePleine,
  Galerie: B.Galerie,
  Video: B.Video,
  AppelAction: B.AppelAction,
  ContactFormulaire: ContactBlock,
  Espace: B.Espace,
});
