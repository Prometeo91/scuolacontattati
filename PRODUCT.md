# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Due pubblici in misura simile, che il sito deve servire nello stesso spazio.

**Chi già conosce la Scuola.** Arriva per passaparola o dai messaggi WhatsApp
di Anna Carla. Sa di cosa si tratta e cerca informazioni pratiche: quando è
la prossima lezione, dove si tiene, cosa si affronta. Consulta in fretta,
spesso da telefono.

**Chi la scopre cercando online.** Cerca crescita interiore a Bari, o è
arrivato da un evento pubblico. Non sa chi sono i conduttori né cosa
distingue questa scuola da altre offerte. Prima di qualunque informazione
pratica ha bisogno di capire di cosa si tratta e di potersi fidare.

## Product Purpose

Il sito presenta la Scuola di Consapevolezza ed Alchimia di Bari: il percorso
settennale di studi, i conduttori, gli eventi, il libro. Serve a far conoscere
la Scuola a chi non la conosce e a tenere informato chi la frequenta.

Non è stata designata un'azione di conversione prioritaria: contatto dal form,
WhatsApp, presenza a una lezione e comprensione del percorso valgono tutti
allo stesso modo. Questa è una decisione presa, non una lacuna, e vincola il
design: nessuna delle quattro strade può essere sacrificata per dare risalto
a un'altra.

## Positioning

Quattro elementi distinguono la Scuola, tutti verificabili dal sito stesso.

- **Il percorso strutturato di sette anni.** Ciclo base di 3 anni con 7
  lezioni l'anno, ciclo avanzato di 4 anni con 3 lezioni l'anno. Non seminari
  sciolti: un programma lungo, con titoli, temi e date pubblicati in anticipo.
- **L'impianto alchemico ed ermetico.** Un corpo di studi con una tradizione
  alle spalle (Gurdjieff, l'Enneagramma, le Leggi Universali, le fasi
  dell'Opus), non pratiche generiche di benessere.
- **L'esperienza dei conduttori.** Anna Carla Digregorio e Nicolaos
  Anifantis, e il libro *Ricchezza, Abbondanza e Mission* (Gagliano Edizioni).
- **L'accessibilità.** Molti eventi a ingresso libero e presenza a festival
  pubblici: si può conoscere la Scuola prima di impegnarsi in un percorso
  lungo.

## Operating Context

La Scuola opera a Bari. Le lezioni si tengono in sedi cittadine (MeetingRoom,
Via Argiro 135; Via Giuseppe Capruzzi 316) e la Scuola partecipa a eventi
pubblici come il Festival Nuova Umanità al Parco Gargasole.

Le novità arrivano spesso da Anna Carla via WhatsApp e vanno riportate sul
sito: date aggiunte, programmi che si definiscono, seminari da promuovere.
Il sito è quindi un documento che si aggiorna a strappi, non una brochure
ferma.

Quando c'è un seminario da promuovere si ricrea una sezione `#seminario` in
entrambe le lingue, più due landing con i meta Open Graph per la condivisione
su WhatsApp e Facebook. Fuori da quei periodi la sezione non esiste.

Il sito esiste in italiano e inglese, in due file speculari. Ogni contenuto
va scritto due volte.

## Capabilities and Constraints

- Sito statico single-page in HTML/CSS/JS vanilla, **senza build step**.
  Nessun framework, nessun bundler. Una migrazione ad Astro è stata provata
  (PR #21) e revertata (PR #22).
- `index.html` (it) e `en/index.html` (en) sono speculari: ogni modifica ai
  contenuti va applicata a entrambi.
- `lezioni.js` è la fonte di verità dei contenuti delle lezioni (array
  `L1`…`L7`, un array per anno). Nessun testo sul percorso di studi va
  scritto senza averlo consultato.
- Una lezione di cui si conosce solo la data si inserisce con i soli campi
  `num`/`day`/`month`/`year`: il calendario ha già lo stato «programma in
  definizione». Titoli e temi non si inventano.
- Service worker con cache stale-while-revalidate: ogni modifica a
  `style.css`, `app.js`, `lezioni.js`, `data/citazioni.js` o `data/eventi.js`
  richiede il cache-bust (`?v=` nei due index, voce CORE e `VERSION` in
  `sw.js`). Senza, i visitatori di ritorno vedono il file vecchio.
- Gli eventi hanno `data-expires` nel markup e scadono da soli; lo schema.org
  JSON-LD nell'`<head>` va tenuto allineato a quanto mostrato in pagina.
- Quindici giochi didattici in Phaser 3, uno per cartella, con engine e stili
  condivisi in `giochi/`.
- Anno 1 (2025/26) ha avuto 6 lezioni invece di 7. È corretto così nei dati,
  non è un errore da sanare.

## Brand Commitments

- Nome: **Scuola ContattaTi** — Scuola di Consapevolezza ed Alchimia, Bari.
- Conduttori: Anna Carla Digregorio e Nicolaos Anifantis.
- Libro: *Ricchezza, Abbondanza e Mission*, Gagliano Edizioni.
- Il toggle chiaro/scuro è un impegno preso: i due temi sono entrambi di
  prima classe, nessuno è una derivazione dell'altro.
- **Voce.** Niente prosa manierata: quando esiste l'espressione letterale si
  usa quella. Tre tell già ripuliti dal sito e da non reintrodurre: il chiasmo
  «non X, ma Y», l'em-dash retorico a metà periodo (quelli strutturali restano),
  le triplette decorative dove due termini bastano.
- **I testi altrui non si toccano.** Le citazioni firmate dai conduttori, le
  riflessioni del quaderno della Scuola, i brani di autori terzi restano come
  sono, anche quando contengono gli stessi pattern. Si interviene solo sulla
  copy scritta per il sito.

## Evidence on Hand

- Contenuti reali delle lezioni in `lezioni.js`: titoli, sottotitoli,
  descrizioni, elenchi di temi, citazioni con autore, date. Anni 1 e 2
  compilati, gli anni successivi in parte solo con le date.
- Eventi passati in `data/eventi.js`, con luogo e dettaglio, in due lingue.
- Citazioni in `data/citazioni.js`.
- Fotografie, locandine e immagini di galleria in `images/`.
- Il libro pubblicato, con editore reale.
- Partecipazioni documentate a eventi pubblici (Festival Nuova Umanità,
  Parco Gargasole, Bari, settembre 2026).

Assenze da non colmare inventando: non esistono testimonianze di allievi,
prezzi pubblicati, numeri di iscritti, riconoscimenti o dati di risultato.
Se una di queste cose servisse, va chiesta a Fabio.

## Product Principles

1. **Due letture nello stesso spazio.** Chi sa già deve trovare in fretta;
   chi arriva freddo deve poter capire da zero. Nessuna delle due può essere
   servita a spese dell'altra.
2. **Nessuna delle quattro strade ha la precedenza.** Contatto, WhatsApp,
   presenza, comprensione del percorso: il design non ne privilegia una.
3. **Si può conoscere prima di impegnarsi.** L'accessibilità degli eventi
   pubblici è parte del posizionamento e va resa visibile.
4. **Il percorso non si racconta a memoria.** Titoli, temi e date vengono da
   `lezioni.js`. Dove il dato manca, lo stato «in definizione» è una risposta
   legittima.
5. **Tutto esiste due volte.** Italiano e inglese sono lo stesso sito, non
   uno principale e una traduzione.

## Accessibility & Inclusion

- Il tema chiaro usa toni d'oro scuriti apposta per superare il contrasto
  **WCAG AA** su fondo avorio. Un accento più chiaro romperebbe il requisito.
- `prefers-reduced-motion: reduce` è rispettato in tutto il sito.
- Il pubblico consulta spesso da telefono: il sito deve reggere a larghezza
  ridotta senza perdere informazioni.
