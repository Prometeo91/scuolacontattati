# Scuola ContattaTi — Sito web

Sito ufficiale della **Scuola di Consapevolezza ed Alchimia** di Bari, condotta da Anna Carla Digregorio e Nicolaos Anifantis.

**Produzione:** [scuolacontattati.com](https://scuolacontattati.com) — servito dal branch `main`.

## Cos'è

Sito statico single-page in HTML/CSS/JS vanilla, senza build step. Due lingue:

- **Italiano** — `index.html` (pagina principale)
- **Inglese** — `en/index.html`

Il sito presenta la Scuola, il percorso settennale di studi, i conduttori, gli eventi (seminari e residenziali), il libro *Ricchezza, Abbondanza e Mission*, una galleria, le FAQ e i contatti.

## Struttura del repository

```
index.html          Pagina principale (it) — tutte le sezioni del sito
en/                 Versione inglese (index, privacy, seminario)
style.css           Tutti gli stili — design system a variabili CSS
app.js              Interazioni: tema, countdown, scroll-reveal, lightbox, ecc.
lezioni.js          Dati delle lezioni per anno di corso (L1…L7)
data/               citazioni.js, eventi.js
seminario.html      Landing page con meta OG per condivisione social del seminario
fonts/              EB Garamond + Inter (self-hosted)
images/             Foto, locandine, icone, gallery
giochi/             Engine e asset condivisi dei giochi didattici
<nome-gioco>/       15 cartelle di giochi (index.html + data.js + i18n.js ciascuna)
deisgn.md           Design system: palette, tipografia, componenti, regole
sitemap.xml, robots.txt, 404.html, sw.js, site.webmanifest
```

### Sezioni della pagina principale

`#chi-siamo` · `#insegnamenti` (con il percorso anno per anno) · `#conduttori` · `#galleria` · `#calendario` · `#seminario` (eventi) · `#libro` · `#faq` · `#contatti` · `#ispirazioni` · `#giochi`

## Il percorso di studi

Percorso settennale:

- **Ciclo base** — 3 anni, 7 lezioni l'anno
- **Ciclo avanzato** — 4 anni, 3 lezioni l'anno

I contenuti reali delle lezioni sono in `lezioni.js` (array `L1`…`L7`): è la fonte di verità per titoli, temi e date delle lezioni mostrate sul sito.

## Design system

Documentato in `deisgn.md`. In sintesi:

- **Tema scuro "Officina"** (default): fondo `#0d0b1a`, oro `#e8c97a`/`#c9973a`
- **Tema chiaro "Pergamena"**: fondo avorio `#f5f0e8`, oro scuro per contrasto AA
- **Tipografia**: EB Garamond (titoli, weight 500–600) + Inter (testo)
- Ogni colore esiste come coppia di variabili CSS (scuro + chiaro): mai hardcodare colori

## Giochi didattici

Quindici mini-giochi collegati agli insegnamenti (Phaser 3 + engine condivisi in `giochi/`). Ogni gioco vive in una propria cartella con `index.html`, `data.js` e `i18n.js`.

## Sviluppo

Non serve alcun build: aprire `index.html` nel browser o servire la cartella con un server statico qualsiasi.

```bash
npx serve .
```

Le modifiche vanno sviluppate su un branch di lavoro e portate su `main` per andare in produzione. Ogni modifica ai contenuti va applicata **sia** a `index.html` **sia** a `en/index.html`.
