/* Pubblica la build della v2 nella root del repository.
   L'hosting serve la root di main così com'è (file statici), quindi
   "andare in produzione" = far coincidere la root con v2/dist.

   Rieseguibile: per aggiornare il sito live basta
     cd v2 && npm run build && npm run publish:root
   e committare il risultato.

   NON tocca: v2/ (sorgenti), "Ninja Adventure - Asset Pack" (asset di
   sviluppo giochi), .claude/, .git*, deisgn.md, screenshot/, package.json. */

import { readdirSync, rmSync, cpSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const dist = resolve(here, '../dist');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/ mancante o incompleta: esegui prima `npm run build`.');
  process.exit(1);
}

/* File del vecchio sito che non esistono nella nuova build e vanno rimossi. */
const LEGACY = [
  'app.js',
  'style.css',
  'lezioni.js',
  'data',
  'og-image.html',
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

/* 1. Rimuove i file legacy e tutto ciò che la build sta per ri-pubblicare. */
const daRimuovere = new Set([...LEGACY, ...readdirSync(dist)]);
for (const nome of daRimuovere) {
  const percorso = join(root, nome);
  if (existsSync(percorso)) rmSync(percorso, { recursive: true });
}

/* 2. Copia la build nella root. */
cpSync(dist, root, { recursive: true });

/* 3. Continuità Search Console: /sitemap.xml resta valido (è l'indice). */
copyFileSync(join(dist, 'sitemap-index.xml'), join(root, 'sitemap.xml'));

console.log('Root aggiornata dalla build v2. Ora committa le modifiche.');
