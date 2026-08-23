import {defineField, defineType} from 'sanity'

/**
 * Singleton — contenu éditable du Hero de la home (components/home/hero.tsx).
 * Volontairement minimal : seul le micro-texte sous le CTA existe comme texte
 * en dur aujourd'hui. Le Hero n'a pas de titre/sous-titre (logo centerpiece
 * uniquement) — ne pas en ajouter ici sans une décision de design explicite.
 */
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero — Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'ctaMicrocopy',
      title: 'Texte sous le bouton "Estimer mon bien"',
      type: 'string',
      initialValue: 'Résultat en moins de 2 minutes',
      validation: (Rule) => Rule.required().max(60),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero — Accueil'}
    },
  },
})
