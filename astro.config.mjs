import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hébergé sur GitHub Pages dans le dépôt « portfolio » :
// URL finale https://boubacarkonate.github.io/portfolio/
// `base` est obligatoire car le site vit dans un sous-dossier.
export default defineConfig({
  site: 'https://boubacarkonate.github.io',
  base: '/portfolio',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
});
