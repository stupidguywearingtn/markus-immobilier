import type {StructureResolver} from 'sanity/structure'

/**
 * heroSection est un singleton (un seul document, pas une liste) : on force
 * l'ouverture directe du document unique plutôt que la liste par défaut.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Hero — Accueil')
        .id('heroSection')
        .child(
          S.document().schemaType('heroSection').documentId('heroSection'),
        ),
    ])
