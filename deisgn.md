# Design — Scuola ContattaTi

## Identità
Scuola di crescita interiore a Bari. Tono: caldo, profondo, professionale.
Linguaggio visivo: "alchimia sobria" — lo stesso dei mockup del gioco
L'Officina Sotterranea, declinato in chiave istituzionale.
Niente effetti da videogioco sul sito: l'atmosfera la fanno palette,
tipografia e spaziature, non particelle o glow.

## Palette

### Tema scuro (default) — "Officina"
- Fondo pagina:        #0d0b1a
- Superficie/card:     #1a1530
- Bordo card:          #3a3352
- Accento primario:    #e8c97a  (oro — titoli, link, CTA outline, hover)
- Accento secondario:  #c9973a  (ambra — bordi attivi, icone)
- Testo primario:      #e8e0f0
- Testo secondario:    #c4b8d0
- Testo attenuato:     #8d83a0

### Tema chiaro — "Pergamena"
- Fondo pagina:        #f6f2ea  (avorio caldo, NON bianco puro)
- Superficie/card:     #fffdf8
- Bordo card:          #d8d0c0
- Accento primario:    #8a6420  (oro scuro — serve per contrasto AA)
- Accento secondario:  #b08030
- Testo primario:      #2a2438
- Testo secondario:    #4a4358
- Testo attenuato:     #7d7468

Regola: ogni colore esiste come coppia (variante scura + chiara) definita
in variabili CSS. Mai hardcodare un colore in una regola singola.

## Tipografia
- Titoli (h1–h3, nomi sezione): EB Garamond, weight 500–600.
  Fallback: Georgia, serif.
- Testo e UI: Inter. Fallback: system-ui, sans-serif.
- Max 2 famiglie totali. Niente weight oltre 600.
- Gerarchia: i titoli portano il carattere "iniziatico", il corpo resta
  neutro e leggibilissimo.

## Componenti
- Card: superficie + bordo sottile 1px + radius 10–12px. Niente ombre
  pesante: al massimo un'ombra appena percettibile nel tema chiaro.
- CTA primaria: tema scuro = outline oro (#c9973a bordo, #e8c97a testo);
  tema chiaro = piena oro scuro (#8a6420) con testo avorio.
- Link: oro, underline solo su hover.
- Calendario: giorno-evento evidenziato con oro, non con colori semaforici.

## Da mantenere
- Toggle light/dark (entrambi i temi sono prima classe, non uno derivato)
- Struttura a sezioni con scroll-reveal (.sr)
- Atmosfera dei mockup del gioco come riferimento per la sezione giochi

## Da evitare
- Estetica corporate/startup (blu tech, gradienti vivaci, glassmorphism)
- Viola/oro kitsch da "spiritualità commerciale", simboli esoterici
  decorativi sparsi a caso
- Bianco puro #ffffff come fondo nel tema chiaro
- Animazioni vistose: solo transizioni brevi (150–250ms) e scroll-reveal
  esistente; rispettare prefers-reduced-motion

## Riferimento interno
I mockup SVG del gioco (mappa Officina Sotterranea + screenshot Fucina
dei Ricordi) sono il riferimento cromatico autoritativo per la sezione
giochi e l'ispirazione tonale per il resto del sito.