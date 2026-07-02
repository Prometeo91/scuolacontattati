/* Migrazione one-shot: legge ../lezioni.js (L1..L7) e genera i file
   Markdown della content collection in src/content/lezioni/anno-N/.
   Rieseguibile: sovrascrive i file generati. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const sorgente = resolve(here, '../../lezioni.js');
const destinazione = resolve(here, '../src/content/lezioni');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync(sorgente, 'utf8'), ctx);

function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[''’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(.{0,60})(-.*)?$/, '$1')
    .replace(/-+$/, '');
}

// YAML: i valori sono serializzati come JSON (sottoinsieme valido di YAML),
// così apostrofi e virgolette nei titoli non rompono il frontmatter.
function frontmatter(obj) {
  const lines = Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

let totale = 0;
for (let anno = 1; anno <= 7; anno++) {
  const lezioni = ctx['L' + anno] || [];
  for (const l of lezioni) {
    const data =
      l.year && l.month && l.day
        ? `${l.year}-${String(l.month).padStart(2, '0')}-${String(l.day).padStart(2, '0')}`
        : undefined;
    const fm = frontmatter({
      anno,
      num: l.num,
      data,
      titolo: l.titolo,
      sottotitolo: l.sottotitolo,
      temi: l.temi,
      citazione: l.citazione,
      autore: l.autore,
    });
    const file = join(destinazione, `anno-${anno}`, `${String(l.num).padStart(2, '0')}-${slugify(l.titolo)}.md`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, fm + '\n' + (l.desc || '') + '\n');
    totale++;
  }
}
console.log(`Generati ${totale} file in ${destinazione}`);
