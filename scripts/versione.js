#!/usr/bin/env node
/* Cache-bust automatico: aggiorna da solo ogni ?v= del sito.
   Nessuna dipendenza: basta Node. Uso:

     node scripts/versione.js           aggiorna i file
     node scripts/versione.js --prova   dice cosa cambierebbe, senza scrivere

   Per ogni file locale caricato con ?v= (style.css, app.js, lezioni.js,
   data/*.js, test/test.*) la versione diventa l'impronta del suo contenuto:
   i primi 8 caratteri dello SHA-256. Se il file non è cambiato l'impronta
   resta la stessa e non si tocca niente; se è cambiato, cambia in tutte le
   pagine che lo caricano e nella lista CORE di sw.js. Quando cambia la
   lista CORE, VERSION del service worker sale di uno.

   Sostituisce il lavoro a mano descritto in CLAUDE.md («Ogni modifica a
   style.css, app.js… richiede il cache-bust»): nove file da toccare ogni
   volta, e un ?v= dimenticato vuol dire visitatori col file vecchio.
   Va lanciato prima del commit; controlla.js resta il controllo finale. */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const PROVA = process.argv.includes('--prova');
const ESCLUSE = new Set(['.git', 'node_modules', '.impeccable', 'v2']);

const impronte = {};
function impronta(rel) {
  if (!(rel in impronte)) {
    const abs = path.join(ROOT, rel);
    impronte[rel] = fs.existsSync(abs)
      ? crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex').slice(0, 8)
      : null;
  }
  return impronte[rel];
}

function paginaHtml(dir, out) {
  for (const voce of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    if (ESCLUSE.has(voce.name)) continue;
    const rel = dir ? dir + '/' + voce.name : voce.name;
    if (voce.isDirectory()) paginaHtml(rel, out);
    else if (voce.name.endsWith('.html')) out.push(rel);
  }
  return out;
}

const cambi = {};          // file caricato → { da: Set, a }
const pagineToccate = [];
const nota = (f, da, a) => { (cambi[f] = cambi[f] || { da: new Set(), a }).da.add(da); };

/* ── pagine HTML ── */
for (const pagina of paginaHtml('', [])) {
  const testo = fs.readFileSync(path.join(ROOT, pagina), 'utf8');
  const dir = path.posix.dirname(pagina);
  const nuovo = testo.replace(/((?:src|href)=")([^"?#]+)\?v=([^"&#]+)"/g, (tutto, pre, url, v) => {
    if (/^(https?:)?\/\//.test(url)) return tutto;
    const f = path.posix.normalize(path.posix.join(dir, url));
    const h = impronta(f);
    if (!h || h === v) return tutto;
    nota(f, v, h);
    return `${pre}${url}?v=${h}"`;
  });
  if (nuovo !== testo) {
    pagineToccate.push(pagina);
    if (!PROVA) fs.writeFileSync(path.join(ROOT, pagina), nuovo);
  }
}

/* ── sw.js: voci CORE e VERSION ── */
const swFile = path.join(ROOT, 'sw.js');
let sw = fs.readFileSync(swFile, 'utf8');
let swCambiato = false;
sw = sw.replace(/var CORE\s*=\s*\[[\s\S]*?\]/, blocco => blocco.replace(/'\/([^'?]+)\?v=([^']+)'/g, (tutto, f, v) => {
  const h = impronta(f);
  if (!h || h === v) return tutto;
  nota(f, v, h);
  swCambiato = true;
  return `'/${f}?v=${h}'`;
}));
let versione = null;
if (swCambiato) {
  sw = sw.replace(/var VERSION\s*=\s*'([^']*?)(\d+)'/, (tutto, pre, n) => {
    versione = [`${pre}${n}`, `${pre}${+n + 1}`];
    return `var VERSION = '${pre}${+n + 1}'`;
  });
  if (!PROVA) fs.writeFileSync(swFile, sw);
}

/* ── resoconto ── */
const file = Object.keys(cambi).sort();
if (!file.length) {
  console.log('Nessun ?v= da aggiornare: ogni file caricato ha già la versione del suo contenuto.');
  process.exit(0);
}
console.log(PROVA ? 'Cambierebbe (prova, nessun file scritto):' : 'Aggiornato:');
for (const f of file) console.log(`  ${f}: ?v=${[...cambi[f].da].join(', ')} → ${cambi[f].a}`);
console.log(`  in ${pagineToccate.length} pagine${swCambiato ? ' e in sw.js' : ''}`);
if (versione) console.log(`  VERSION del service worker: ${versione[0]} → ${versione[1]}`);
