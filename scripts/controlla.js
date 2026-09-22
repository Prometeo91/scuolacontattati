#!/usr/bin/env node
/* Controlli automatici sugli errori che su questo sito si ripetono.
   Nessuna dipendenza: basta Node. Uso:

     node scripts/controlla.js              controlli sul lavoro attuale
     BASE=origin/main node scripts/controlla.js
                                            in più, confronta con BASE per
                                            scoprire un cache-bust dimenticato

   Esce con codice 1 se trova un errore. Lo lancia anche la GitHub Action
   .github/workflows/controlli.yml a ogni push e pull request. */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const esiste = f => fs.existsSync(path.join(ROOT, f));

const errori = [];
const avvisi = [];
const errore = (area, msg) => errori.push(`[${area}] ${msg}`);
const avviso = (area, msg) => avvisi.push(`[${area}] ${msg}`);

const PAGINE = ['index.html', 'en/index.html'];

/* ── 1. Versioni (?v=) coerenti fra i due index e sw.js ─────────────────── */
function versioniInPagina(file) {
  const dir = path.posix.dirname(file);
  const out = {};
  const re = /(?:src|href)="([^"?#]+)\?v=([^"&#]+)"/g;
  let m;
  while ((m = re.exec(leggi(file)))) {
    if (/^(https?:)?\/\//.test(m[1])) continue;
    out[path.posix.normalize(path.posix.join(dir, m[1]))] = m[2];
  }
  return out;
}
function leggiSw(testo) {
  const version = (testo.match(/var VERSION\s*=\s*'([^']+)'/) || [])[1];
  const coreBlocco = (testo.match(/var CORE\s*=\s*\[([\s\S]*?)\]/) || [])[1] || '';
  const core = [...coreBlocco.matchAll(/'([^']+)'/g)].map(x => x[1]);
  return { version, core };
}
function coreConVersione(core) {
  const out = {};
  for (const voce of core) {
    const m = voce.match(/^\/([^?]+)\?v=(.+)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const vIt = versioniInPagina('index.html');
const vEn = versioniInPagina('en/index.html');
const sw = leggiSw(leggi('sw.js'));
const vSw = coreConVersione(sw.core);

if (!sw.version) errore('cache', 'sw.js: non trovo var VERSION');
for (const f of new Set([...Object.keys(vIt), ...Object.keys(vEn)])) {
  if (vIt[f] !== vEn[f]) errore('cache', `${f}: ?v=${vIt[f] || '(assente)'} in index.html ma ?v=${vEn[f] || '(assente)'} in en/index.html`);
}
for (const [f, v] of Object.entries(vSw)) {
  if (!esiste(f)) errore('cache', `sw.js mette in CORE /${f}, che non esiste`);
  if (vIt[f] && vIt[f] !== v) errore('cache', `${f}: ?v=${v} in sw.js ma ?v=${vIt[f]} negli index`);
  if (!vIt[f]) avviso('cache', `${f} è in CORE di sw.js con ?v=${v} ma gli index non lo caricano con ?v=`);
}
for (const f of Object.keys(vIt)) {
  if (!(f in vSw) && /\.(css|js)$/.test(f)) avviso('cache', `${f} ha ?v= negli index ma non è nella lista CORE di sw.js`);
}

/* ── 2. Cache-bust dimenticato, rispetto a BASE ────────────────────────── */
const BASE = process.env.BASE;
if (BASE) {
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  let swBase = null;
  try { swBase = leggiSw(git('show', `${BASE}:sw.js`)); } catch (e) { avviso('cache', `non riesco a leggere sw.js in ${BASE}: salto il confronto`); }
  if (swBase) {
    const vBase = coreConVersione(swBase.core);
    for (const [f, v] of Object.entries(vSw)) {
      let cambiato = false;
      try { git('diff', '--quiet', BASE, '--', f); } catch (e) { cambiato = true; }
      if (cambiato && vBase[f] === v) errore('cache', `${f} è cambiato rispetto a ${BASE} ma ha ancora ?v=${v}: chi torna sul sito vedrebbe il file vecchio. Aggiornare ?v= nei due index e in sw.js, e VERSION`);
    }
    if (JSON.stringify(swBase.core) !== JSON.stringify(sw.core) && swBase.version === sw.version) {
      errore('cache', `la lista CORE di sw.js è cambiata rispetto a ${BASE} ma VERSION è ancora '${sw.version}'`);
    }
  }
}

/* ── 3. Stessi id in italiano e in inglese ─────────────────────────────── */
const ids = f => new Set([...leggi(f).matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const idIt = ids('index.html'), idEn = ids('en/index.html');
for (const id of idIt) if (!idEn.has(id)) errore('lingue', `id="${id}" c'è in index.html ma non in en/index.html`);
for (const id of idEn) if (!idIt.has(id)) errore('lingue', `id="${id}" c'è in en/index.html ma non in index.html`);

/* ── 4. Ogni file citato esiste ────────────────────────────────────────── */
const pagineDaControllare = [
  ...PAGINE, 'privacy.html', 'en/privacy.html', '404.html',
  ...fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && esiste(path.join(d.name, 'index.html')) && d.name !== 'en' && !d.name.startsWith('.') && d.name !== 'node_modules')
    .map(d => d.name + '/index.html'),
].filter(esiste);

function riferimentiLocali(file) {
  const testo = leggi(file);
  const dir = path.posix.dirname(file);
  const out = new Set();
  for (const m of testo.matchAll(/\s(?:src|href|srcset|poster)="([^"]+)"/g)) {
    for (let url of m[1].split(',').map(s => s.trim().split(/\s+/)[0])) {
      if (!url || /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/.test(url)) continue;
      url = url.split('#')[0].split('?')[0];
      if (!url) continue;
      const risolto = url.startsWith('/') ? url.slice(1) : path.posix.normalize(path.posix.join(dir, url));
      out.add(risolto);
    }
  }
  return out;
}
for (const f of pagineDaControllare) {
  for (const r of riferimentiLocali(f)) {
    const bersaglio = r === '' || r.endsWith('/') ? r + 'index.html' : r;
    if (!esiste(bersaglio)) errore('file', `${f} cita ${r}, che non esiste`);
  }
}
for (const css of ['style.css', 'giochi/styles.css', 'giochi/fonts.css'].filter(esiste)) {
  const dir = path.posix.dirname(css);
  for (const m of leggi(css).matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const u = m[1];
    if (/^(data:|https?:|#|%23)/.test(u)) continue; // %23 = # dentro un SVG incorporato
    const r = path.posix.normalize(path.posix.join(dir, u.split('?')[0]));
    if (!esiste(r)) errore('file', `${css} cita ${u}, che non esiste`);
  }
}

/* ── 5. Ogni lezione con un titolo ha la traduzione inglese ─────────────── */
try {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(leggi('lezioni.js') + '\n;this.__d={L1,L2,L3,L4,L5,L6,L7,LESP:typeof LESP!=="undefined"?LESP:[],L_EN};', ctx);
  const d = ctx.__d;
  for (const k of Object.keys(d)) {
    if (k === 'L_EN' || !Array.isArray(d[k])) continue;
    d[k].forEach((l, i) => {
      const nome = `${k}[${i}] (lezione ${l.num || i + 1}${l.titolo ? ', «' + l.titolo.slice(0, 40) + '»' : ''})`;
      if (!l.titolo) return; // lezione con la sola data: niente da tradurre
      if (!l.en || !l.en.titolo) errore('lezioni', `${nome} non ha la traduzione in L_EN.${k}[${i}]: la pagina inglese la mostrerebbe in italiano`);
    });
    const en = d.L_EN[k] || [];
    if (en.length > d[k].length) errore('lezioni', `L_EN.${k} ha ${en.length} voci ma ${k} ne ha ${d[k].length}: una traduzione in più sposta tutte le altre`);
  }
} catch (e) {
  errore('lezioni', `lezioni.js non si esegue: ${e.message}`);
}

/* ── 6. Dati strutturati (JSON-LD) validi ──────────────────────────────── */
for (const f of PAGINE) {
  let n = 0;
  for (const m of leggi(f).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    n++;
    try { JSON.parse(m[1]); } catch (e) { errore('json-ld', `${f}, blocco ${n}: JSON non valido (${e.message})`); }
  }
}

/* ── 7. La sitemap elenca solo pagine che esistono ─────────────────────── */
for (const m of leggi('sitemap.xml').matchAll(/<loc>https:\/\/scuolacontattati\.com\/([^<]*)<\/loc>/g)) {
  const f = m[1] === '' || m[1].endsWith('/') ? m[1] + 'index.html' : m[1];
  if (!esiste(f)) errore('sitemap', `sitemap.xml elenca /${m[1]}, che non esiste`);
}

/* ── Esito ─────────────────────────────────────────────────────────────── */
for (const a of avvisi) console.log('avviso  ' + a);
for (const e of errori) console.log('ERRORE  ' + e);
if (errori.length) {
  console.log(`\n${errori.length} errori${avvisi.length ? `, ${avvisi.length} avvisi` : ''}.`);
  process.exit(1);
}
console.log(`Tutto in ordine${avvisi.length ? ` (${avvisi.length} avvisi)` : ''}: ${pagineDaControllare.length} pagine controllate${BASE ? `, confronto con ${BASE}` : ''}.`);
