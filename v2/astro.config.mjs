import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://scuolacontattati.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
