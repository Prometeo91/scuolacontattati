/* Copia gli asset dei giochi dal sito attuale in public/:
   - engine condivisi, stili e icone da ../giochi/ → public/giochi/
   - i file JS di ogni gioco da ../<slug>/ → public/giochi/<slug>/
   Le shell HTML NON vengono copiate: le genera Astro da un template
   (src/pages/giochi/[slug].astro). Rieseguibile. */

import { readdirSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const dest = resolve(here, '../public/giochi');

export const GIOCHI_SLUGS = [
  'apprendista-del-mago',
  'i-cinque-veicoli',
  'i-mondi-invisibili',
  'i-sette-piani',
  'il-cammino-alchimista',
  'il-corpo-e-lanima',
  'il-grande-viaggio',
  'il-guerriero',
  'il-risveglio',
  'il-sentiero-iniziazione',
  'la-magia-bianca',
  'la-responsabilita',
  'la-sacra-sessualita',
  'le-emozioni',
  'le-leggi-cosmiche',
];

let n = 0;
mkdirSync(dest, { recursive: true });
for (const f of readdirSync(join(root, 'giochi'))) {
  if (/\.(js|css|svg)$/.test(f)) {
    copyFileSync(join(root, 'giochi', f), join(dest, f));
    n++;
  }
}
for (const slug of GIOCHI_SLUGS) {
  mkdirSync(join(dest, slug), { recursive: true });
  for (const f of readdirSync(join(root, slug))) {
    if (f.endsWith('.js')) {
      copyFileSync(join(root, slug, f), join(dest, slug, f));
      n++;
    }
  }
}
console.log(`Copiati ${n} file in ${dest}`);
