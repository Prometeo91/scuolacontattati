# Scuola ContattaTi — prototipo v2 (Astro)

Prototipo di ristrutturazione del sito: stessa resa nel browser (HTML statico,
zero JavaScript di framework), ma **un solo posto dove vive ogni contenuto**.
Il sito attuale nella root del repo non è toccato.

## Cosa dimostra

- **Content collection per le lezioni**: le 30 lezioni di `../lezioni.js` sono
  diventate 30 file Markdown in `src/content/lezioni/anno-N/` con frontmatter
  validato da uno schema (`src/content.config.ts`). Aggiungere una lezione =
  aggiungere un file; titolo, data, temi e citazione sono dati, non markup.
- **Un template, 64 pagine**: `src/components/LessonPage.astro` genera le
  pagine di dettaglio di tutte le lezioni, in italiano e inglese. Oggi sul
  sito le lezioni vivono solo come card nella homepage; qui ogni lezione ha
  una URL propria (`/lezioni/anno-1/siamo-veramente-liberi/`) indicizzabile.
- **i18n senza duplicazione**: niente copia integrale `en/index.html`. Le
  stringhe di interfaccia stanno in `src/i18n/strings.js`; le pagine inglesi
  sono wrapper di 5 righe che riusano gli stessi componenti con `locale="en"`.
  I contenuti delle lezioni restano in italiano, come nel sito attuale.
- **Token di design come fonte di verità**: `src/styles/tokens.css` traduce
  `../deisgn.md` in variabili CSS (coppia tema Officina/Pergamena, EB Garamond
  + Inter, oro come unico accento). Nessun colore hardcodato nei componenti.

## Comandi

```sh
npm install
npm run build            # genera dist/ (64 pagine statiche)
npm run preview          # serve dist/ in locale
npm run import:lezioni   # rigenera i .md da ../lezioni.js (migrazione one-shot)
```

## Struttura

```
src/
  content.config.ts        schema della collection lezioni
  content/lezioni/anno-N/  30 file Markdown (generati da scripts/import-lezioni.mjs)
  styles/tokens.css        variabili di design da deisgn.md
  styles/base.css          font self-hosted + componenti base (card, btn, blockquote)
  i18n/strings.js          tutte le stringhe UI it/en + helper date e percorsi
  layouts/Base.astro       head comune, anti-flash tema, hreflang, footer
  components/              Header, Home, LessonsIndex, LessonPage (condivisi it/en)
  pages/                   wrapper sottili: /, /lezioni/, /lezioni/[slug]/ + /en/...
```

## Prossimi passi possibili

- Eventi/calendario come seconda collection (da `data/eventi.js`), con JSON-LD
  Schema.org per la SEO locale.
- Shell dei 15 giochi generate da un template (oggi 15 `index.html` quasi
  identici a mano); gli engine JS dei giochi restano com'è, caricati solo
  nelle loro pagine.
- Migrazione delle altre sezioni della homepage (chi siamo, conduttori, FAQ…)
  e poi switch del deploy da root a `v2/dist`.

Nota: la "prossima lezione" in homepage è calcolata al momento della build;
con un deploy statico va bene se si ricostruisce a ogni push (o con una
rebuild programmata).
