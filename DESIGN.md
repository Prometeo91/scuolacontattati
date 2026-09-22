---
name: Scuola ContattaTi
description: Scuola di Consapevolezza ed Alchimia a Bari — sito istituzionale
colors:
  bg: "#0d0b1a"
  gold: "#c9973a"
  gold-light: "#e8c97a"
  text: "#e8e0f0"
  text-muted: "#c4b8d0"
  text-reading: "#dcd5e6"
  surface: "rgba(255,255,255,0.04)"
  surface-hover: "rgba(255,255,255,0.07)"
  border: "rgba(201,151,58,0.18)"
  border-hover: "rgba(201,151,58,0.4)"
  band: "rgba(201,151,58,0.035)"
  on-gold: "#1a1000"
  tag-olistica: "#b49fe0"
  tag-coaching: "#7de0a0"
  ok-text: "#7de0a0"
  ko-text: "#e8a0a0"
typography:
  display:
    fontFamily: "'EB Garamond', 'EBGaramond-fallback', Georgia, serif"
    fontSize: "clamp(34px, 6.4vw, 54px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'EB Garamond', 'EBGaramond-fallback', Georgia, serif"
    fontSize: "clamp(28px, 5vw, 42px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0"
  title:
    fontFamily: "'EB Garamond', 'EBGaramond-fallback', Georgia, serif"
    fontSize: "20px"
    fontWeight: 500
    letterSpacing: "0.01em"
  body:
    fontFamily: "'Inter', 'Inter-fallback', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "\"kern\" 1, \"liga\" 1, \"calt\" 1, \"ss01\" 1"
  label:
    fontFamily: "'Inter', 'Inter-fallback', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  lg-inner: "8px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.bg}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold-light}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 2rem"
  card:
    backgroundColor: "rgba(255,255,255,0.018)"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "1.85rem"
  badge:
    backgroundColor: "rgba(201,151,58,0.12)"
    textColor: "{colors.gold-light}"
    rounded: "{rounded.pill}"
    padding: "3px 11px"
---

# Design System: Scuola ContattaTi

## Overview

**Creative North Star: "L'Alchimia Sobria"**

La Scuola ContattaTi insegna crescita interiore e Alchimia a Bari. Il sito
deve suonare caldo, profondo e professionale allo stesso tempo: parla a
persone che cercano qualcosa di serio, e che dalla grafica capiscono subito
se stanno guardando una scuola o un corso di spiritualità da vendere.

L'atmosfera la costruiscono palette, tipografia e spaziature. Il linguaggio
visivo nasce dai mockup del gioco L'Officina Sotterranea, declinati in chiave
istituzionale: fondo notturno, oro come unico accento, un serif rinascimentale
per i titoli. Dove il gioco può permettersi effetti, il sito resta fermo.

Anti-reference confermata: l'estetica corporate/startup, il viola-e-oro della
spiritualità commerciale, i simboli esoterici sparsi come decorazione.

**Key Characteristics:**
- Fondo scuro di default, tema chiaro di pari dignità (non derivato)
- Un solo accento cromatico: l'oro, in due livelli
- Titoli serif, corpo sans: due famiglie in tutto
- Profondità per stratificazione e filetti, non per ombre
- Movimento breve e limitato all'ingresso delle sezioni

## Colors

Un accento unico su fondo notturno. L'oro porta gerarchia, stato e brand;
tutto il resto è neutro. Ogni colore esiste come coppia scuro/chiaro in
variabili CSS: nessun colore va scritto a mano in una regola singola.

### Primary — Oro

- **Oro Fucina** (`#c9973a`, `--gold`): bordi attivi, icone, numeri di
  sequenza, occhielli di sezione, fondo della CTA piena.
- **Oro Chiaro** (`#e8c97a`, `--gold-light`): testo degli accenti, link,
  italici, titoli di richiamo, stato hover della CTA piena.

Nel tema chiaro la coppia si scurisce per superare il contrasto AA su fondo
avorio: `--gold: #816018`, `--gold-light: #7d5b1c`, più `--gold-deep: #6b4f18`
per i casi ad alto contrasto. Il tema chiaro ha quindi **tre** livelli d'oro,
lo scuro due.

### Neutral — Testi

- **Inchiostro Chiaro** (`#e8e0f0`, `--text`): testo primario, titoli.
- **Inchiostro Attenuato** (`#c4b8d0`, `--text-muted`): didascalie, metadati.
- **Inchiostro da Lettura** (`#dcd5e6`, `--text-reading`): paragrafi lunghi,
  un soffio sotto `--text` per non abbagliare sul fondo scuro.

Tema chiaro: `--text: #2a1f08`, `--text-muted: #5a4a3a`,
`--text-reading: #3a2c14`, più `--text-soft: #7a6852`. Sono inchiostri caldi,
non grigi freddi.

### Neutral — Superfici

- **Notte** (`#0d0b1a`, `--bg`): fondo pagina del tema scuro.
- **Pergamena** (`--bg-1: #f8f2e6`, `--bg-2: #ede4d0`, `--bg: #f5f0e8`):
  fondo del tema chiaro, costruito come gradiente avorio caldo.
- **Velo** (`rgba(255,255,255,0.04)`, `--surface`): superficie delle card,
  che è una trasparenza sul fondo, non un colore pieno.
- **Filetto** (`rgba(201,151,58,0.18)`, `--border`): bordo di default, oro a
  bassissima opacità. Hover: `rgba(201,151,58,0.4)`.
- **Fascia** (`rgba(201,151,58,0.035)`, `--band`): velatura a piena larghezza
  che scandisce il ritmo verticale.

### Gli emblemi restano scuri anche in Pergamena

Gli emblemi (`chiave-*`, `percorso-*`, `pilastro-*`, `libro-*`) sono incisioni
in oro su carta blu notte, non ritagli su fondo trasparente. Nel tema chiaro
restano quindi tavole scure sulla pergamena, ed **è una scelta**: rifarli in
versione chiara vorrebbe dire venti asset nuovi da tenere coerenti fra loro,
e perderebbe il carattere inciso che è l'identità della Scuola. Una tavola
scura montata su carta chiara è un idioma da libro illustrato, non un errore.

Perché si legga come montata e non come capitata lì, nel tema chiaro hanno
una cornice più definita e un'ombra che le stacca dal fondo. Ogni revisione
segnala questi emblemi come incoerenza del tema chiaro: non lo sono.

### Le eccezioni all'oro

Fuori dalla famiglia oro vivono poche tinte, e solo per distinguere
categorie dove l'oro non può portare la distinzione perché è già il colore
di tutto il resto: i tag di competenza dei conduttori e i tre archetipi
planetari del libro.

- **Viola** (`--tag-olistica`: `#b49fe0` scuro, `#4a3a66` chiaro): formazione
  olistica e counseling. È anche il colore di `.badge-purple`.
- **Verde** (`--tag-coaching`: `#7de0a0` scuro, `#1f6b3a` chiaro): coaching e
  PNL. È anche il colore di `.badge-green`.

I valori del tema chiaro sono scuriti apposta: le versioni del tema scuro su
fondo pergamena scendevano a 1.28:1 e 1.78:1.

**I tre archetipi planetari del libro** (sezione Libro, «3 Archetipi
Planetari») hanno un colore ciascuno, per lo stesso motivo dei tag: sono tre
categorie affiancate che l'oro da solo non distingue. Il colore sta sul
simbolo (♅ ♆ ♇) e sulla citazione in fondo al pannello, e non esce da quel
blocco.

- **Urano** (`--arch-urano`): l'oro chiaro, `#e8c97a` / `#8a6a10`.
- **Nettuno** (`--arch-nettuno`): il viola dei tag, `#b49fe0` / `#6b5a9e`.
- **Plutone** (`--arch-plutone`): rosso, `#e07d7d` / `#a84040`. È l'unico
  rosso della palette oltre agli errori del form (`--ko-*`), e ha un tono
  diverso apposta: un rosso che significa «errore» non va usato come colore
  di un archetipo, e viceversa.

Contrasto misurato fra 5:1 e 11,7:1 in entrambi i temi.

Il verde di WhatsApp (`#25d366`) sul pulsante sticky non rientra qui: è un
colore di marca di terze parti, non una scelta di palette.

### Testo sopra un fondo oro

`--on-gold` (`#1a1000` scuro, `#f8f2e6` chiaro) è il colore del testo e dei
glifi quando il fondo è oro pieno: skip-link, `.btn-portale:hover`, la pill
della lingua attiva, il triangolo del play. **La coppia si inverte rispetto a
tutte le altre**, perché nel tema chiaro l'oro è scuro. Attenzione alla
specificità quando si usa dentro la nav: `.nav-links a:hover` è più specifico
di una regola di componente e vince sul colore senza vincere sul fondo.

### Named Rules

**La regola della coppia.** Ogni colore esiste in due varianti, scura e
chiara, entrambe definite come variabile CSS. Un colore scritto a mano dentro
una regola è un bug: al cambio tema resta indietro.

**Le trasparenze dell'oro passano dai canali.** Una tinta o un bordo d'oro
semitrasparente si scrive `rgba(var(--gold-rgb), 0.12)`, mai
`rgba(201,151,58,0.12)`. `--gold-rgb` vale `201,151,58` nel tema scuro e
`184,138,46` in Pergamena: un oro medio e non `--gold`, perché l'oro scuro a
bassa opacità su pergamena diventa color fango. Lo stesso per
`--gold-light-rgb`. Gli override `[data-theme="light"]` che usano toni scuri
scritti a mano (`rgba(120,90,30,x)`) sono scelte puntuali e restano.

**La regola dell'oro unico.** L'oro è l'unica famiglia d'accento. Un secondo
colore va introdotto solo se porta un'informazione che l'oro non può portare.
Le eccezioni in essere sono il viola e il verde dei tag di competenza e i
tre colori degli archetipi planetari, descritti sopra: non se ne aggiungono
altre senza deciderlo qui prima.

**Niente bianco puro.** `#ffffff` non è un fondo ammesso nel tema chiaro.

## Typography

**Display Font:** EB Garamond (fallback `EBGaramond-fallback`, Georgia, serif)
**Body Font:** Inter (fallback `Inter-fallback`, system-ui, sans-serif)

**Character:** il Garamond porta il carattere iniziatico e storico, l'Inter
tiene il corpo neutro e leggibile. Due famiglie in tutto, nessun peso oltre
il 600 sui testi (il 700 compare solo sui numeri decorativi di sequenza).

Entrambe sono self-hosted in `fonts/` come woff2 con `unicode-range` per
sottoinsieme, e hanno un fallback con metriche corrette (`size-adjust`,
`ascent-override`) per limitare il layout shift durante il caricamento.

### Hierarchy

- **Display** (Garamond 500, `clamp(34px, 6.4vw, 54px)`, lh 1.1, ls 0.02em):
  `h1` dell'hero. Uno per pagina.
- **Headline** (Garamond 500, `clamp(28px, 5vw, 42px)`, lh 1.15):
  `.section-title`, il titolo di ogni sezione.
- **Title** (Garamond 500, 20px, ls 0.01em): `.card-title`, titolo di card.
- **Body** (Inter 400, 16px, lh 1.65): testo corrente. I sottotitoli di
  sezione (`.section-sub`) vanno a 17px con lh 1.75 e `max-width: 68ch`.
- **Label** (Inter 500, 11px, ls 0.22em, uppercase): `.section-eyebrow` e
  `.badge`.

### La scala in pixel

I cinque ruoli sopra sono i gradini principali, ma il foglio ne usa altri per
i componenti. Questi sono **tutti** i valori ammessi, con quanti usi ha
ciascuno: un valore fuori da questo elenco è quasi sempre una svista.

| px | usi | dove |
|---|---|---|
| 32 | 4 | numero del giorno, countdown, controlli del lightbox |
| 28 | 2 | glifi dei pilastri e dell'oracolo |
| 26 | 4 | titoli Garamond intermedi: carrozza, contributo, banner lezione, definizioni |
| 24 | 4 | titoli di pilastro, intestazioni contatti, logo del footer |
| 22 | 6 | citazioni di sezione, giorno degli eventi, titoli delle card galleria |
| 20 | 12 | ruolo **Title**: logo, titoli di card, nomi dei conduttori |
| 17 | 12 | sottotitoli di sezione, testo corrente lungo, domande FAQ |
| 16 | 24 | ruolo **Body**, pulsanti |
| 15 | 20 | voci di menu, testi secondari |
| 14 | 12 | didascalie |
| 13 | 23 | etichette di interfaccia, summary |
| 12 | 22 | citazioni firmate, note |
| 11 | 19 | ruolo **Label**: occhielli, badge |
| 10 | 2 | badge minuti |

Fuori dalla scala restano **8, 6 e 5px**, che non sono testo ma ornamenti:
il separatore fra le lingue, il filetto del footer, il glifo dell'epigrafe.

La scala è stata consolidata da 28 valori distinti a 17: dieci erano orfani
a un pixel o mezzo pixel da un gradino con dieci o venti usi (27, 25, 21, 19,
18, 15.5, 14.5, 13.5, 12.5, 11.5), cioè accidenti, non scelte.

### Misura di lettura

`--measure: var(--col)`: **il testo riempie la colonna**, non si stringe.

È una scelta presa contro la regola tipografica corrente, che vorrebbe 65-75
caratteri per riga. Su questa pagina una misura più stretta lascia la metà
destra vuota e il testo appoggiato a sinistra, e non è l'effetto voluto: la
colonna a 900px è già la misura del sito. È stato provato a 49ch e scartato.

Se un giorno si volesse stringere, si cambia solo `--measure`. Ma attenzione
al numero: `1ch` è la larghezza dello **zero**, che in Inter vale 10,7px,
mentre il glifo medio dell'italiano corrente è 7,8. Un `ch` vale circa 1,37
caratteri reali, quindi `58ch` non fa 58 caratteri ma 79. Misurare i
caratteri sul testo renderizzato, non fidarsi dell'unità.

### Font features

I testi display usano cifre oldstyle e legature discrezionali
(`"dlig" 1, "onum" 1`); badge, etichette e date usano cifre tabellari
(`"tnum" 1`) per restare allineate in colonna.

### Named Rules

**La regola dell'occhiello.** `.section-eyebrow` è il piccolo testo in
maiuscoletto sopra ogni titolo di sezione, con due filetti sfumati ai lati.
Fa parte del sistema e va mantenuto: somiglia a un vezzo generico, ma qui è
una scelta presa e applicata ovunque.

## Layout

Colonna singola centrata. `section` ha `max-width: 900px`, `margin: 0 auto` e
padding `clamp(3rem, 7vw, 5rem) 2rem`: la misura di lettura resta stretta e
il respiro verticale cresce con la viewport.

Il ritmo verticale è dato dall'alternanza tra sezioni normali e sezioni con
la velatura `--band` a piena larghezza, più il filetto epigrafico
(`.epigraphic-rule`) che separa i blocchi con un glifo al centro.

I breakpoint in uso sono **1024px** (navigazione), **768px** e **700px**
e **640px** (griglie a due colonne che collassano a una) e **480px** (card che
passano da riga a colonna). Non c'è un sistema di griglia astratto: ogni
sezione dichiara la propria `grid-template-columns` e il proprio collasso.

### La barra di navigazione ha tre assetti

Le undici voci del menu (otto sezioni, Portale Allievi, selettore di lingua,
toggle del tema) misurano 1159px con la spaziatura piena: stanno accanto al
logo su una riga sola **solo da 1444px in su**.

- **≥ 1444px**: una riga, spaziatura `1.5rem`, toggle con la scritta.
- **1024–1443px**: spaziatura `0.7rem`, voci a 14px, toggle alla sola icona.
  Da 1200 in su ci stanno accanto al logo; sotto, la barra va a due righe —
  logo sopra, menu sotto — che è un assetto ordinato e voluto.
- **≤ 1023px**: hamburger. Sotto i 1024 le voci si spezzerebbero su due righe
  anche strette, e la barra diventava tre tronconi disallineati.

La soglia era a 768px e lasciava scoperta tutta la fascia dei portatili.
Chi tocca il menu deve rimisurare: aggiungere una voce può far saltare la
riga a 1024, dove il margine è di una trentina di pixel.

Non esiste una scala di spaziature in variabili: i valori sono espressi in
`rem` sul posto. È un debito noto, non una scelta.

## Elevation & Depth

Il sistema è sostanzialmente piatto. La profondità arriva da tre cose, in
quest'ordine: la trasparenza delle superfici sul fondo, il doppio filetto
delle card e un'ombra appena percettibile.

### Shadow Vocabulary

- **Ombra di card** (`--card-shadow`): `0 1px 2px rgba(0,0,0,0.25)` sul tema
  scuro. Nel tema chiaro diventa a due livelli —
  `0 1px 3px rgba(80,60,30,0.10), 0 4px 18px rgba(80,60,30,0.07)` — perché su
  fondo avorio serve più lavoro per staccare la superficie.
- **Alone hover della card**: `0 6px 24px rgba(201,151,58,0.1), 0 2px 8px rgba(0,0,0,0.3)`.
  È l'unica ombra colorata, e compare solo in risposta al puntatore.

### Named Rules

**Piatto a riposo.** Le superfici non hanno rilievo finché non le si tocca.
Nessun glow diffuso, nessuna ombra ambientale decorativa.

## Shapes

Scala dei raggi in variabili, con un ruolo dichiarato per ogni passo:

- `--radius-xs: 4px` — marcature e badge quadrati
- `--radius-sm: 6px` — pulsanti e controlli
- `--radius-md: 10px` — campi ed emblemi
- `--radius-lg: 14px` — card e riquadri media
- `--radius-lg-inner: 8px` — il filetto interno delle card (`lg` meno l'inset di 6px)
- `--radius-pill: 999px` — solo i tag di stato

I bordi sono sottili per scelta: `0.5px` sulle card e sui badge, `1px` sui
pulsanti ghost. Su schermi a 2x e 3x il mezzo pixel si vede, su 1x si perde;
è un compromesso accettato a favore della leggerezza.

## Components

### Card (`.glass-card`)

Il componente portante. Superficie `rgba(255,255,255,0.018)`, bordo `0.5px`
in `--border`, raggio `lg`, padding `1.85rem`. Il tratto distintivo è il
**doppio filetto**: uno pseudo-elemento `::before` con `inset: 6px`, raggio
`lg-inner` e bordo `0.5px rgba(201,151,58,0.12)`. In hover si schiariscono
entrambi i bordi e compare l'alone dorato.

### Pulsanti

- **`.btn-primary`**: fondo `--gold` pieno, testo `--bg`, Garamond 600 16px,
  `letter-spacing: 0.04em`, raggio `sm`, padding `0.8rem 2rem`. Hover: il
  fondo passa a `--gold-light`.
- **`.btn-ghost`**: trasparente, bordo `1px --border-hover`, testo
  `--gold-light`, Garamond 500. Hover: velo `rgba(201,151,58,0.08)` e bordo
  `--gold`.

### Badge (`.badge`)

11px, peso 500, `letter-spacing: 0.05em`, raggio `pill`, padding `3px 11px`.
Due varianti: `.badge-gold` (fondo oro al 12%) e `.badge-purple` (fondo viola
al 15%, testo `#b49fe0`), che è l'unica presenza cromatica fuori dall'oro.

### Link

Oro, sottolineatura solo in hover.

### Aree di tocco

**Ogni comando isolato è alto almeno 44px** — tab del calendario, `summary`
di «Leggi tutto», pulsanti di galleria e oracolo, hamburger, logo, icone
social, voci del menu del footer, bottoni del banner cookie, chiusura della
lightbox. Dove l'altezza cresce si toglie la spaziatura che la circondava
(la nav ha ridotto il padding verticale, il menu del footer ha azzerato il
gap tra le righe), così la pagina non si allunga.

Tre eccezioni, deliberate:

- **I link dentro una frase** (email e telefono nel footer, «Leggi
  l'informativa completa» nel banner cookie) restano alti quanto la riga:
  allargarli spezzerebbe il testo. È l'eccezione prevista da WCAG 2.5.8.
- **Le etichette corte del menu** (FAQ, Libro) sono larghe 31 e 39px. Un
  `min-width` le centrerebbe in una scatola più larga del testo e romperebbe
  la spaziatura regolare fra le voci.
- **Il selettore di lingua** è 40×32 per metà: a 44 il tondo dorato dell'IT
  attivo diventa un cerchio e non più una losanga.

### Pulsanti fissi

Sul telefono (fino a 768px), dal basso: WhatsApp, Condividi e «torna su»,
che compare solo dopo uno schermo di scroll. Dal tablet in su WhatsApp è
nascosto e restano gli altri due. La colonna sul telefono è alta 180px e
all'apertura copre il margine destro dello slogan: è una scelta di Fabio.
Chi vuole aggiungere un pulsante fisso sul telefono deve toglierne un altro.
Il Condividi c'è anche nel footer, come quarta icona della fila social: i
due pulsanti hanno la classe `.js-share` e ognuno mostra il proprio toast.

### Schermi bassi

L'hero si adatta all'altezza, non solo alla larghezza. **I due pulsanti
devono stare nella prima schermata** da 375×667 in su, in orizzontale sul
telefono, a 1024×768 e 1280×800.

- **Telefono in verticale fino a 740px d'altezza**: stessi elementi, logo a
  116px e spazi più stretti.
- **Telefono in orizzontale** (altezza fino a 500px): due colonne, logo a
  sinistra e testi allineati a sinistra accanto. La barra perde 16px di
  padding.
- **Tablet in orizzontale e portatili bassi** (larghezza da 641px, altezza
  501-860px): logo a 160px e spazi più stretti.

A 320×568 i pulsanti restano sotto la piega: rimpicciolire ancora
sacrificherebbe il logo.

**Il menu a hamburger aperto è alto circa 670px** e la barra è fissa: se è
più alto dello schermo scorre al suo interno, altrimenti su un 375×667 le
ultime voci (Portale, lingua, tema) non si raggiungono.

**Tacca dell'iPhone**: il viewport è `viewport-fit=cover`, quindi il `body`
ha `padding-left/right: env(safe-area-inset-*)`. Chromium non simula la
tacca: va verificato su un iPhone vero, girato in orizzontale.

### Esito dell'invio del form

`.form-feedback` ha una coppia di variabili per tema: `--ok-bg/--ok-border/
--ok-text` e `--ko-bg/--ko-border/--ko-text`. I toni chiari del tema scuro
(`#7de0a0`, `#e8a0a0`) sull'avorio stavano sotto 2:1; nel tema chiaro si
invertono in `#14542c` e `#8f2020`, misurati a 7:1 e 6,9:1 sul tint.

Quando l'invio fallisce, il messaggio offre WhatsApp e email come **link
veri** (`.form-feedback-links`), non come numero scritto nel testo: da
telefono un numero scritto non si tocca.

### Calendario

Il giorno con evento si evidenzia in oro. Nessun colore semaforico
(verde/rosso/giallo) per gli stati.

### Motion

Tre timing in variabili, che sono la voce cinetica del sito:

- `--t-fast: 0.18s ease` — colore, opacità
- `--t-base: 0.25s ease` — fondo, bordo, transform, box-shadow
- `--t-slow: 0.4s ease` — max-height, accordion

L'unica animazione d'ingresso è lo scroll-reveal: `.sr` parte da
`opacity: 0` e `translateY(24px)`, `.sr.visible` la riporta a zero in `0.7s`.
Si applica ai blocchi di sezione, non ai singoli elementi. Tutto rispetta
`prefers-reduced-motion: reduce`.

### Le etichette per aprire e chiudere

Sono due famiglie, e non se ne aggiungono altre.

| Cosa fa | Italiano | Inglese |
|---|---|---|
| Continua un testo (tutti i `<details>` di prosa) | Leggi tutto | Read more |
| Allunga un elenco | Mostra tutte le foto / le riflessioni / le 8 forme | Show all photos / reflections / the 8 forms |
| Chiude, in entrambi i casi | Mostra meno | Show less |

Restava fuori «Leggi l'informativa» nel consenso privacy, che apre un testo
legale a sé e si chiama col suo nome. Prima le diciture d'apertura erano
sei: Approfondisci, Continua a leggere, Leggi tutto, Vedi le 8 forme, più
le due della galleria.

## Do's and Don'ts

### Da mantenere

- Il toggle chiaro/scuro: i due temi sono entrambi di prima classe, nessuno
  dei due è una derivazione dell'altro.
- La struttura a sezioni con scroll-reveal.
- I mockup SVG del gioco (mappa dell'Officina Sotterranea, Fucina dei Ricordi)
  come riferimento cromatico per la sezione giochi e tonale per il resto.
- L'occhiello `.section-eyebrow` sopra i titoli.

### Da evitare

- Estetica corporate/startup: blu tech, gradienti vivaci, glassmorphism.
- Viola e oro kitsch da spiritualità commerciale; simboli esoterici messi a
  decorazione.
- `#ffffff` come fondo nel tema chiaro.
- Animazioni vistose. Oltre allo scroll-reveal esistente, solo transizioni
  brevi secondo la scala `--t-*`.
- Effetti da videogioco sul sito istituzionale: particelle, glow, pulsazioni.
- Colori scritti a mano dentro una regola, senza la coppia di variabili.

### Prima di modificare una regola CSS

`style.css` contiene **77 regole `[data-theme="light"]`** sparse dalla riga 124
alla 1972. Circa due terzi stanno nel blocco iniziale, il resto è disseminato.
Prima di cambiare una regola base, cercare chi la sovrascrive su tutto il file.
Se si rimuove qualcosa che aveva un override di tema chiaro a supporto, va
rimosso anche quello. Verificare sempre in entrambi i temi.

### Cache-bust

`style.css` è servito con un `?v=` in `index.html` e `en/index.html`, ed è
elencato fra le risorse CORE del service worker. Ogni modifica al file
richiede di aggiornare entrambi i `?v=`, la voce in `sw.js` e la `VERSION`
del service worker. Senza, i visitatori di ritorno vedono il CSS vecchio.
