# Scuola ContattaTi — Sito web

Sito ufficiale della **Scuola di Consapevolezza ed Alchimia** di Bari, condotta da Anna Carla Digregorio e Nicolaos Anifantis.

**Produzione:** [scuolacontattati.com](https://scuolacontattati.com) — servito dal branch `main`.

## Cos'è

Sito statico single-page in HTML/CSS/JS vanilla, senza build step. Due lingue:

- **Italiano** — `index.html` (pagina principale)
- **Inglese** — `en/index.html`

Il sito presenta la Scuola, il percorso settennale di studi con il calendario delle lezioni, i conduttori, il libro *Ricchezza, Abbondanza e Mission*, una galleria, le FAQ e i contatti.

## Struttura del repository

```
index.html          Pagina principale (it) — tutte le sezioni del sito
en/                 Versione inglese (index, privacy)
style.css           Tutti gli stili — design system a variabili CSS
app.js              Interazioni: tema, countdown, scroll-reveal, lightbox, ecc.
lezioni.js          Dati delle lezioni per anno di corso (L1…L7)
data/               citazioni.js, eventi.js
privacy.html        Informativa privacy (it; l'inglese è in en/)
fonts/              EB Garamond + Inter (self-hosted)
images/             Foto, locandine, icone, gallery
giochi/             Engine e asset condivisi dei giochi didattici
<nome-gioco>/       15 cartelle di giochi (index.html + data.js + i18n.js ciascuna)
DESIGN.md           Design system: token, palette, tipografia, componenti, regole
PRODUCT.md          Pubblico, scopo e vincoli del sito
CLAUDE.md           Istruzioni e fatti verificati per le sessioni di Claude
sitemap.xml, robots.txt, 404.html, sw.js, site.webmanifest
```

### Sezioni della pagina principale

`#chi-siamo` · `#insegnamenti` (con il percorso anno per anno) · `#conduttori` · `#galleria` · `#calendario` · `#libro` · `#faq` · `#contatti` · `#ispirazioni` · `#giochi`

Quando c'è un seminario da promuovere si aggiunge una sezione `#seminario` con le sue landing `seminario.html` e `en/seminario.html`; passato il seminario si tolgono. Il procedimento è descritto in `CLAUDE.md`.

## Il percorso di studi

Percorso settennale:

- **Ciclo base** — 3 anni, 7 lezioni l'anno
- **Ciclo avanzato** — 4 anni, 3 lezioni l'anno

I contenuti reali delle lezioni sono in `lezioni.js` (array `L1`…`L7`): è la fonte di verità per titoli, temi e date delle lezioni mostrate sul sito.

## Design system

Documentato in `DESIGN.md`, nel formato DESIGN.md con frontmatter di token. In sintesi:

- **Tema scuro "Officina"** (default): fondo `#0d0b1a`, oro `#e8c97a`/`#c9973a`
- **Tema chiaro "Pergamena"**: fondo avorio `#f5f0e8`, oro scuro per contrasto AA
- **Tipografia**: EB Garamond (titoli, weight 500–600) + Inter (testo)
- Ogni colore esiste come coppia di variabili CSS (scuro + chiaro): mai hardcodare colori

## Giochi didattici

Quindici mini-giochi collegati agli insegnamenti, in JavaScript senza librerie, con motore e stili condivisi in `giochi/`. Ogni gioco vive in una propria cartella con `index.html`, `data.js` e `i18n.js`.

## Sviluppo

Non serve alcun build: aprire `index.html` nel browser o servire la cartella con un server statico qualsiasi.

```bash
npx serve .
```

Le modifiche vanno sviluppate su un branch di lavoro e portate su `main` per andare in produzione. Ogni modifica ai contenuti va applicata **sia** a `index.html` **sia** a `en/index.html`.

Ogni modifica a `style.css`, `app.js`, `lezioni.js` o ai file in `data/` richiede di aggiornare il `?v=` nei due index e in `sw.js`, e la `VERSION` del service worker: altrimenti chi torna sul sito vede ancora il file vecchio. I dettagli sono in `CLAUDE.md`.

Il sito viene servito dal repository senza build, quindi un file tracciato può essere raggiungibile online: materiale di lavoro (foto, grafiche per i social, screenshot) va tenuto fuori, non in una sottocartella.
