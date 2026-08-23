import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool, defineLocations} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

// URL du site prévisualisé. En local (`sanity dev`), surcharger avec :
//   SANITY_STUDIO_PREVIEW_URL=http://localhost:3000 npx sanity dev
const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://www.markusimmobilier.fr'

export default defineConfig({
  name: 'default',
  title: 'Markus Immobilier',

  projectId: 'uq5g9w2i',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: PREVIEW_URL,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        locations: {
          // heroSection est un singleton affiché uniquement sur la home.
          heroSection: defineLocations({
            locations: [{title: 'Accueil', href: '/'}],
          }),
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
