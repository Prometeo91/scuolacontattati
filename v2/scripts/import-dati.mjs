/* Migrazione one-shot: converte data/eventi.js e data/citazioni.js
   (file unici bilingui del sito attuale) in JSON per v2.
   Rieseguibile: sovrascrive i file generati. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const dati = resolve(here, '../../data');
const dest = resolve(here, '../src/data');
mkdirSync(dest, { recursive: true });

function carica(file, globale) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(readFileSync(resolve(dati, file), 'utf8'), ctx);
  return ctx.window[globale];
}

const eventi = carica('eventi.js', 'SC_EVENTI');
writeFileSync(resolve(dest, 'eventi.json'), JSON.stringify(eventi, null, 2) + '\n');

const citazioni = carica('citazioni.js', 'SC_QUOTES');
writeFileSync(resolve(dest, 'citazioni.json'), JSON.stringify(citazioni, null, 2) + '\n');

console.log(`eventi: ${eventi.length}, citazioni: ${citazioni.length} → ${dest}`);
