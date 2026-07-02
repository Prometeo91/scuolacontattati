# REPORT estrazione contenuti — v2/src/data/

## (a) Comportamenti interattivi (app.js + script inline in index.html)

- **Cookie banner (app.js)**: chiave localStorage `sc-cookie`; Accept carica GA4 (`G-2NTMVVV5GB`, Consent Mode v2, anonymize_ip), Reject imposta `ga-disable`. Link footer `#manageCookies` riapre il banner. Anti-flash tema (`sctheme`) e redirect lingua (`sc-lang`) sono script inline nel `<head>`.
- **Switch lingua**: pill IT/EN nella nav scrive `sc-lang` in localStorage; script inline nel head reindirizza `/` <-> `/en/` in base alla preferenza. app.js è UNICO per le due lingue: sceglie le stringhe UI (tabella `SC_T`) da `<html lang>`.
- **Calendario**: app.js renderizza SOLO LEZIONI (non gli eventi) nei pannelli `#calendar-list…-anno7` dai dati globali `L1…L7` + `LESP` (esperienziali) definiti in `lezioni.js` (file unico, testi in italiano anche su /en/). Ogni riga è un accordion (titolo, sottotitolo, desc, temi, citazione) con badge di stato calcolato da data/ora (Conclusa / In corso 9:00–13:30 / Iscriviti=prossima / mese futuro). Tab Anno 1–7 + Esperienziali: tablist WAI-ARIA con frecce da tastiera (script inline, non app.js).
- **Eventi/presentazioni**: `data/eventi.js` (`SC_EVENTI`, bilingue it/en) è renderizzato da app.js nel blocco collassabile "Presentazioni & eventi" della sezione **#libro** (non nel calendario). Il conteggio `#presCount` è aggiornato dinamicamente.
- **Galleria**: toggle "Mostra tutte le foto" (classe `.expanded` su `#galleryGrid`); lightbox costruito da app.js se assente nel DOM (markup perso in un vecchio upload): frecce, contatore, swipe touch, Esc/frecce tastiera, focus-trap, role=dialog.
- **FAQ**: nessun JS — accordion nativi `<details>/<summary>` (come read-more, chiave-details, tags conduttori, card libro).
- **Oracolo ispirazioni**: script inline (non app.js) pesca random senza ripetizioni da `window.SC_QUOTES` (data/citazioni.js, coppie it/en; la pagina IT usa `q.it`, la EN `q.en`), con contatore visti/totale e fade.
- **Seminario**: countdown gg/ore/min (inline, refresh 60s, classe `countdown-urgent` <7gg); elementi `[data-expires]` nascosti da app.js dopo la data (se tutti scaduti sparisce l'intera sezione #seminario e la voce di menu; rimuove anche i JSON-LD Event scaduti). Banner annuncio in alto chiudibile (sessionStorage `seminarClosed`). Lightbox locandina (`#seminarFlyer`, ricostruito da app.js; supporta anche id `residenzialeFlyer`).
- **Altro**: nav mobile hamburger; scroll progress bar + scroll-spy (evidenzia voce di menu, rootMargin -30%/-65%); theme toggle dark/light; back-to-top con isteresi; video facade YouTube (iframe nocookie on click); form contatti AJAX Formspree con honeypot `_gotcha`, anti-bot <3s, feedback i18n; email offuscata iniettata via JS; scroll-reveal `.sr`/`.sr-stagger` (inline); service worker `sw.js`; hash re-scroll dopo load; sigilli giochi su card completate (localStorage `sc-*-sigillo`, script inline).

## (b) Contenuti non mappati nei JSON

- Dati lezioni (`lezioni.js` L1–L7/LESP), citazioni oracolo (`data/citazioni.js`) ed eventi passati (`data/eventi.js`): esclusi come richiesto (già in file dati JS); nei JSON restano solo i testi statici delle sezioni.
- `privacy.html` / `en/privacy.html`, `404.html`, `og-image.html` non estratti (fuori scope one-page).
- SVG inline decorativi (icone pillar/contatti/social, luna/sole tema) non estratti: solo i path dei file `images/icon-*.svg` e `giochi/icon-*.svg`.
- `meta_desc.en` dei giochi = null: le pagine gioco hanno una sola meta description (italiana); i testi EN dei giochi vivono in `i18n.js` di ogni cartella (non estratti).
- `images/residenziale-giugno-2026.webp` esiste ma non è più referenziata dalle homepage (evento scaduto rimosso dall'HTML; app.js supporta ancora l'id `residenzialeFlyer`).
- Card giochi: non esiste una "desc" separata (solo titolo + tagline); usato il campo `tagline`.

## (c) Differenze strutturali index.html vs en/index.html

- Struttura sezioni/ID identica (1560 vs 1559 righe, solo whitespace). Differenze sistematiche: percorsi relativi con prefisso `../` (css, js, immagini, link giochi), `lang="en"`, canonical/og:url/`@id` FAQ con `/en/`, `og:locale` en_GB, `inLanguage: en` nei JSON-LD.
- Script redirect lingua speculare: IT reindirizza a /en/ se `sc-lang=en`; EN reindirizza a / se `sc-lang=it` o assente.
- Oracolo: IT usa `q.it`, EN usa `q.en`; lang-pill invertita (link attivo EN); onclick card giochi salva `sc-lang` rispettivamente 'it'/'en'.
- Nessuna differenza di contenuto strutturale: stessi 11 blocchi (chi-siamo, insegnamenti, conduttori, galleria, calendario, seminario, libro, faq, contatti, ispirazioni, giochi) + footer/cookie banner tradotti.
- Nota: le lezioni del calendario restano in italiano anche su /en/ perché `lezioni.js` è un file unico solo-IT (il commento in testa lo dichiara "versione italiana").
