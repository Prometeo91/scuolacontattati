# Scuola ContattaTi — v2 (Astro)

Migrazione completa del sito: stessa resa nel browser (HTML statico, zero
JavaScript di framework), ma **un solo posto dove vive ogni contenuto**.

**Reversibilità**: il sito attuale nella root del repo non è toccato e `main`
non è modificato. Tornare indietro = non fare il merge di questo branch
(o revertirlo). Nessun deploy cambia finché non si decide di puntare
l'hosting a `v2/dist`.

## Architettura

- **Contenuti separati dal markup**
  - 30 lezioni → `src/content/lezioni/anno-N/*.md` (collection con schema)
  - Eventi, citazioni, seminari esperienziali → `src/data/*.json`
  - Tutte le sezioni della vecchia one-page (chi siamo, insegnamenti,
    conduttori, galleria, seminario, libro, FAQ, contatti, giochi) →
    `src/data/*.json` bilingui (it/en fianco a fianco, come i file unici
    `eventi.js`/`citazioni.js` del sito attuale)
- **i18n senza duplicazione**: le pagine inglesi sono wrapper di 5 righe che
  riusano gli stessi componenti con `locale="en"`; stringhe UI in
  `src/i18n/strings.js`. Sparita la copia integrale `en/index.html`.
- **Una pagina per intento di ricerca** (invece della one-page):
  `/` home breve · `/chi-siamo/` (visione + conduttori + galleria) ·
  `/lezioni/` (percorso, 4 chiavi, contributo, tutte le lezioni) ·
  `/lezioni/anno-N/slug/` (una pagina per lezione, prima inesistenti) ·
  `/calendario/` (lezioni future + eventi, con JSON-LD Schema.org Event) ·
  `/seminario/` · `/libro/` · `/faq/` (con JSON-LD FAQPage) ·
  `/ispirazioni/` (oracolo citazioni) · `/contatti/` (form Formspree) ·
  `/giochi/` + 15 pagine gioco. Totale: **95 pagine statiche**.
- **Giochi**: le 15 shell HTML quasi identiche sono generate da un template
  (`src/pages/giochi/[slug].astro` + catalogo `src/data/giochi.json`).
  Engine, dati e salvataggi localStorage identici al sito attuale
  (`public/giochi/`, copiati da `scripts/copy-giochi.mjs`).
- **Design token**: `src/styles/tokens.css` traduce `../deisgn.md` in
  variabili CSS (temi Officina/Pergamena, EB Garamond + Inter, oro come
  unico accento). Nessun colore hardcodato nei componenti.
- **SEO/GDPR**: sitemap automatica, robots.txt, hreflang+canonical su ogni
  pagina, JSON-LD (eventi, FAQ), banner cookie con Consent Mode v2 (GA solo
  dopo consenso), 404, favicon/manifest.
- **PWA rimossa**: `public/sw.js` è un kill-switch che disinstalla il vecchio
  service worker e svuota le cache dei visitatori esistenti.

## Comandi

```sh
npm install
npm run build            # genera dist/ (95 pagine)
npm run preview          # serve dist/ in locale
npm run import:lezioni   # rigenera lezioni + esperienziali da ../lezioni.js
npm run import:dati      # rigenera eventi/citazioni da ../data/*.js
npm run copy:giochi      # ricopia engine e dati giochi da ../
```

Gli script `import:*`/`copy:*` sono la fotografia della migrazione: quando i
contenuti del sito attuale cambiano, si possono rieseguire; a regime i file
in `src/content/` e `src/data/` diventano la fonte di verità e gli script si
possono eliminare insieme ai sorgenti in root.

## Per andare in produzione (quando deciso)

1. Puntare l'hosting alla build di `v2/` (`cd v2 && npm run build` → `dist/`).
2. Aggiungere redirect 301 dai vecchi percorsi (`/il-guerriero/` →
   `/giochi/il-guerriero/`, `/#faq` → `/faq/`, ecc.).
3. Verificare Search Console dopo lo switch (sitemap nuova, hreflang).

## Cose note / da decidere

- I contenuti delle lezioni restano in italiano anche su /en/ (come oggi).
- La "prossima lezione" in home e il calendario sono calcolati in build:
  serve una rebuild periodica o a ogni push.
- La cartella "Ninja Adventure - Asset Pack" in root non è usata dal sito:
  valutare se spostarla in un repo a parte.
