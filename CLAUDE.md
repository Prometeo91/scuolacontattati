# CLAUDE.md — Contesto per le sessioni Claude

Sito della **Scuola ContattaTi** (Scuola di Consapevolezza ed Alchimia, Bari), gestito da Fabio (Prometeo91). Produzione: **https://scuolacontattati.com**, servita dal branch `main`.

## Cosa è questo progetto (e cosa NON è)

- Sito statico **single-page vanilla** (HTML/CSS/JS), **nessun build step**. Non introdurre framework o bundler.
- **Storia importante**: è esistita una v2 in Astro (cartella `v2/`, PR #21) portata in produzione e poi **revertata** (PR #22) — il sito attuale è la pagina singola originale. Non riproporre la migrazione ad Astro se non richiesto esplicitamente.
- Due lingue: `index.html` (it) e `en/index.html` (en). **Ogni modifica ai contenuti va applicata a entrambi i file**, è l'errore più facile da commettere.

## Workflow git

- Sviluppo su branch di lavoro (es. `claude/school-website-redesign-qtpjfr`), poi merge su `main` e push: `main` = produzione, la modifica è live appena pushata.
- Fabio spesso chiede "pushalo direttamente" = merge su `main` e push. In assenza di indicazioni, chiedere o pushare solo sul branch di lavoro.
- Messaggi di commit in italiano, descrittivi.

## File chiave

| File | Ruolo |
|---|---|
| `index.html` | La home it: sezioni `#chi-siamo`, `#insegnamenti`, `#conduttori`, `#galleria`, `#calendario`, `#libro`, `#faq`, `#contatti`, `#ispirazioni`, `#giochi`. Le ultime tre (`#libro`, `#ispirazioni`, `#giochi`) sono solo anteprime con un pulsante verso la pagina propria; tengono l'id perché i link già condivisi (`/#libro`) continuino a funzionare |
| `libro/`, `ispirazioni/`, `giochi/index.html` | Pagine proprie (en in `en/libro/` ecc.) con il contenuto completo di Libro (contenuti, definizioni, 8 forme), Ispirazioni (oracolo e quaderno delle riflessioni) e Giochi (tutti e 15). Separate dalla home nell'ottobre 2026 per accorciarla (da 40 a 33 schermate su telefono). **Barra, footer, pulsanti fissi e banner dei cookie sono copie di quelli della home**: chi cambia il menu o il footer lo fa in dieci file (due home e otto pagine, contando `argomenti/`); i `?v=` li aggiorna `scripts/versione.js` anche lì. `controlla.js` segnala menu e versioni che non coincidono. Il menu porta a `libro/`; il footer a tutte e tre; il pulsante «Giochi» dentro ogni gioco porta a `giochi/`. «Giochi» è uscito dal menu nell'ottobre 2026 per fare posto a «Eventi» (`#galleria`), l'unica voce che liberava abbastanza spazio senza toccare le soglie |
| `argomenti/index.html` | Indice degli argomenti delle lezioni (novembre 2026, chiesto da un'allieva e da Anna Carla): tutti i temi di `lezioni.js` dalla A alla Z con una ricerca, e accanto a ogni tema anno e lezione con link a `/#anno-N`. Si costruisce da solo in `argomenti/argomenti.js` (stili in `argomenti.css`, usati anche da `en/argomenti/`): un tema aggiunto a una lezione compare qui senza toccare altro. Nell'ordine alfabetico non contano articoli e numeri iniziali, e le leggi sono ordinate per nome; la ricerca ignora accenti e vale a inizio di parola. Una ricerca si condivide con `?q=`, es. `/argomenti/?q=spirito santo`. Cerca solo nei temi scritti nel programma (più titoli e descrizioni): un argomento detto a voce a lezione non c'è, e la nota in fondo alla pagina lo dice. Link dal calendario, dal blocco «Per gli studenti» e dal footer; non dal menu (a 1024px non c'è spazio) |
| `en/index.html` | Versione inglese speculare |
| `style.css` | Tutti gli stili, design system a variabili CSS |
| `app.js` | Tema chiaro/scuro, countdown eventi, lightbox, service worker |
| `lezioni.js` | **Fonte di verità** dei contenuti delle lezioni: array `L1`…`L7` (un array per anno di corso, con titoli, temi, date, citazioni). Consultarlo prima di scrivere qualsiasi testo sul percorso di studi. **In fondo al file c'è `L_EN` con le traduzioni inglesi**, innestate come campo `.en` su ogni lezione: chi aggiunge o modifica una lezione italiana deve aggiornare anche la voce corrispondente lì, altrimenti la pagina inglese mostra l'italiano. È nello stesso file apposta, perché un secondo file resterebbe indietro in silenzio |
| `data/eventi.js`, `data/citazioni.js` | Dati eventi e citazioni |
| `DESIGN.md` | Design system: frontmatter YAML di token estratti dal CSS + otto sezioni canoniche |
| `test/` | Test interattivi per gli studenti, una pagina per test: `test/quattro-elementi/` e `test/temperamento/` (Ippocrate e Galeno), versioni inglesi in `en/test/`. Il temperamento è stato per un giorno una scheda della pagina dei Quattro Elementi: separato perché il titolo della pagina non lo descriveva e l'anteprima su WhatsApp mostrava quella dell'altro test. In fondo al risultato ogni test rimanda all'altro; il menu «Test» del sito è una tendina con un link per test, e il blocco «Per gli studenti» in fondo a `#insegnamenti` li elenca tutti con una riga di descrizione: chi aggiunge un test lo aggiunge in tutti e due, nelle due lingue. Ogni test è un `.test-panel` con `data-test` (il nome del calcolo in `SCORERS` di `test/test.js`) e `data-ls` (la chiave delle risposte salvate); stili in `test/test.css`, domande e testi nell'HTML. I file `test/test.*` non sono in CORE; il loro `?v=` nelle pagine dei test lo aggiorna `scripts/versione.js` come gli altri. Link da mandare agli studenti: `scuolacontattati.com/test/<nome>/`. Il testo dei test è dei conduttori: non correggerlo. Prossimi previsti: Enneagramma, sette raggi e sette ferite, archetipi divini |

## Controlli automatici

`node scripts/controlla.js` (nessuna dipendenza) verifica gli errori che su questo progetto si ripetono: ogni `?v=` uguale all'impronta del file che carica (vedi sotto, cache-bust), stessi id in italiano e inglese, ogni file citato esistente, ogni lezione con titolo tradotta in `L_EN`, JSON-LD valido, sitemap senza pagine inesistenti, graffe bilanciate nei fogli di stile (una graffa di chiusura in più fa scartare al browser, in silenzio, la regola che segue). Con `BASE=origin/main` segnala anche un file in CORE modificato senza aggiornare il `?v=`. **Lanciarlo prima di ogni push.** La GitHub Action `.github/workflows/controlli.yml` lo esegue comunque a ogni push e pull request.

## Critique di design (`/impeccable critique`, `audit`, `polish`)

Un revisore a cui si chiede «trova i problemi» ne trova sempre: il 13 ottobre 2026 due critique indipendenti nello stesso giorno hanno dato 29/40 e 28/40 con problemi diversi, e la seconda ha segnalato cose identiche alla mattina che la prima non aveva visto. Il punteggio serve a sapere *cosa* correggere, non a misurare *quanto* si è migliorato. Regole che ne seguono: si rilancia un critique dopo un cambiamento vero (una sezione nuova, un seminario, un test), non per vedere se il numero sale; ogni segnalazione si verifica nel sorgente o si misura con Playwright prima di toccare il codice (il detector ha prodotto 450 voci, le reali erano una decina); le scelte già prese elencate in questo file non sono difetti anche se ogni revisione le rialza. Gli snapshot stanno in `.impeccable/critique/` e sono tracciati.

## Seminari in evidenza (pattern ricorrente, oggi non attivo)

Quando c'è un seminario da promuovere si ricrea una sezione `#seminario` in entrambi gli index, più due landing `seminario.html` e `en/seminario.html` con i meta Open Graph per la condivisione su WhatsApp/Facebook, che rimandano a `/#seminario`.

Oggi **non esistono**: sezione e landing sono state rimosse col commit `2722cf3`, passato il seminario del 26 luglio 2026. Il meccanismo però è ancora in `app.js`: i blocchi `.seminar-section` con `data-expires` vengono nascosti a scadenza e, quando sono scaduti tutti, spariscono anche la sezione `#seminario` e la sua voce di menu. Il codice è protetto da `if(sem)`, quindi in assenza della sezione non fa nulla. Per il prossimo seminario basta ricreare il markup.

## Fatti di dominio (verificati con Fabio)

- Percorso **settennale**: ciclo base 3 anni con **7 lezioni l'anno** (dal 2026/27; il 1° anno 2025/26 ne ha avute 6, ed è corretto così nei dati), ciclo avanzato 4 anni con 3 lezioni l'anno.
- **Il numero di lezioni per anno in `lezioni.js` non va «corretto» a tavolino.** Oggi `L1` ne ha 6, `L2` 7, `L3` 6, e gli anni avanzati 3: `L3` ne ha ancora 6 perché quel ciclo non è ancora cominciato con 7. Il dato rispecchia quello che la Scuola sa, non lo schema teorico. Ogni passata di revisione lo segnala come incoerenza: non lo è.
- **Il primo anno non riparte a breve**: la prossima coorte di 1° anno è attesa fra un paio d'anni, forse tre, e la data non si sa. Il sito **non deve dirlo**: la riga «Concluso · 2025/26» dell'Anno 1 nella mappa del percorso basta così com'è. Ogni revisione segnala che manca la risposta alla domanda «quando ricomincia»: è una scelta, non una lacuna.
- **Il calendario è una mappa del percorso** (novembre 2026, prima erano otto tab): un anno per riga, con titolo e stato calcolato da `lezioni.js` («Concluso · 2025/26», «In corso · … · prossima lezione …», «6 lezioni in programma · date da definire»); il pulsante apre il pannello con le lezioni. Le descrizioni degli anni stanno solo lì; i titoli anche nell'indice dei sette anni in `#insegnamenti` (che ha preso il posto delle sette schede del percorso): chi ne cambia uno cambia anche l'altro, in entrambe le lingue. Il riquadro «Prossima lezione» del calendario è stato tolto: la prossima lezione sta nella prima schermata (`#hero-prossima`).
- **Un anno del calendario è linkabile**: `scuolacontattati.com/#anno-3` (e `#anno-esp` per gli esperienziali) apre quell'anno e ci scorre; aprire un anno riscrive l'hash con `replaceState`. Senza hash valido si apre l'anno della prossima lezione.
- Una lezione di cui si conosce solo la data si inserisce in `lezioni.js` con i soli campi `num`/`day`/`month`/`year`: il calendario ha già lo stato "programma in definizione" (riga attenuata, nessun pannello espandibile). Non inventare titoli o temi.
- **Eventi in programma** (novembre 2026): un evento di `data/eventi.js` con data di oggi o futura compare da solo nel riquadro «In programma» in cima a `#galleria`; passata la data scende fra gli «Incontri passati». Senza eventi futuri resta la riga scritta nell'HTML, che invita a scrivere.
- **La prima schermata** (rifatta nel novembre 2026): nome della Scuola in grande a sinistra, motto e frase sotto, prossima lezione accanto senza riquadro. L'unico pulsante pieno è «Puoi iniziare da questa lezione: scrivici»; «Scopri il percorso» e «Contattaci» sono link finché c'è una lezione in programma. Fabio ha scartato due varianti col motto in grande (in greco e in italiano): il nome della Scuola deve restare la cosa più visibile. Misure e soglie in `DESIGN.md`.
- **«Aggiungi al calendario»** sotto il pulsante dell'hero: `app.js` prepara un file `.ics` dalla prossima lezione; orario e sede li legge dagli attributi `data-inizio`, `data-fine`, `data-luogo` del link, da tenere uguali al testo visibile.
- **FAQ**: il riquadro «In breve» ripete orario, sede, costo e modalità delle risposte sotto: chi cambia un prezzo o la sede lo cambia in tutti e due i punti (e nel JSON-LD), nelle due lingue.
- Conduttori: Anna Carla Digregorio e Nicolaos Anifantis. Anna Carla comunica novità via WhatsApp che spesso vanno riportate sul sito.
- Libro: *Ricchezza, Abbondanza e Mission* (Gagliano Edizioni).
- Eventi con `data-expires` nel markup e countdown gestiti da `app.js`; schema.org JSON-LD (`Event`) nell'`<head>` da tenere allineato ai dettagli mostrati in pagina (orari inclusi).
- **Ogni modifica a `style.css`, `app.js`, `lezioni.js`, `data/*.js` o `test/test.*` richiede il cache-bust: `node scripts/versione.js` prima del commit.** Lo script (novembre 2026, prima si faceva a mano su nove file) mette come `?v=` di ogni file l'impronta del suo contenuto (8 caratteri dello SHA-256) in tutte le pagine che lo caricano e nella lista CORE di `sw.js`, e incrementa la `VERSION` del service worker quando la lista cambia; se un file non è cambiato non tocca niente. `--prova` mostra cosa cambierebbe senza scrivere. `controlla.js` dà errore se un `?v=` non corrisponde al file. Senza cache-bust i visitatori di ritorno vedono il file vecchio (stale-while-revalidate): nuovi elementi senza stile, nuovi pulsanti a cui il JS vecchio non risponde (è successo col pulsante Condividi: su desktop funzionava, sul telefono già in cache no), una lezione o un evento aggiunti che non compaiono fino alla seconda visita. Vale per qualunque file venga aggiunto a CORE in futuro.

## Prestazioni (misurate, non da smontare per sbaglio)

Su un telefono medio con 4G lenta la prima schermata è passata da 4,7s a 2,6s (LCP). Quattro meccanismi lo reggono:

- **Immagini in due taglie.** `hero-cielo-800.webp` e `video-copertina-800.webp` sotto gli 800px (media query in `style.css`), `gioco-*-144.webp` per le icone della sezione giochi: le versioni grandi restano per desktop e per i giochi. Chi sostituisce un'immagine rigenera anche la variante.
- **Preload del cielo dell'hero** nello script del tema in `<head>` (entrambi gli index): solo per chi ha scelto il tema scuro, con la stessa soglia degli 800px.
- **`content-visibility: auto`** sulle sezioni dopo `#chi-siamo`: il browser non le disegna finché non si avvicinano. Ha un rovescio: uno scroll animato verso un'ancora calcola la destinazione su altezze stimate. Per questo esiste la classe `.cv-off`, che disegna tutto: la mette lo script in `<head>` se si arriva con un `#hash`, e `app.js` al primo clic su un link interno. Chi aggiunge una sezione non deve fare nulla; chi aggiunge un altro modo di scrollare verso un'ancora (JS, `scrollIntoView` con `smooth`) deve mettere `cv-off` prima. Per lo stesso motivo il tasto Indietro (da `libro/`, dai giochi…) faceva atterrare la home anche 4.000px lontano: il ripristino della posizione è tolto al browser (`history.scrollRestoration='manual'` nello script in `<head>`) e lo fa il blocco RITORNO in fondo ad `app.js`, che salva in `history.state` la sezione in cima allo schermo e lo scarto dentro di essa. Se si torna su una voce di cronologia senza posizione salvata, lo script rimette `'auto'` esplicitamente (il valore resta scritto sulla voce dalla visita precedente) e lascia fare al browser. Chi aggiunge uno scroll automatico al caricamento (come quelli verso `#anno-3` o l'`#ancora`) lo salta quando `SC_RITORNO` è vero, e chi usa `replaceState` passa `history.state`, non `null`.
- **Ogni immagine lazy ha `width`/`height`** (o un `aspect-ratio`). Una sola immagine senza dimensioni cresce mentre la pagina scorre verso un'ancora e fa atterrare il link centinaia di pixel prima.

## Design system (regole rigide)

- **Il tema predefinito è il chiaro "Pergamena"** (fondo `#f5f0e8`), dal novembre 2026: scelto da Fabio perché le foto della Scuola sono tutte di giorno. Il tema scuro "Officina" (fondo `#0d0b1a`, oro `#e8c97a`/`#c9973a`) resta e si sceglie dal pulsante. Nel CSS il chiaro è ancora `[data-theme="light"]` e lo scuro l'assenza dell'attributo: è lo script in `<head>` di ogni pagina (giochi e test compresi) a mettere `light` a chi non ha salvato `sctheme='dark'`. Senza JavaScript la pagina è scura. Per provare lo scuro con Playwright: `localStorage.setItem('sctheme','dark')` in `addInitScript`. Dettagli completi in `DESIGN.md`.
- **Nel tema chiaro le sezioni si alternano fra due toni di pergamena** (fondo pagina e `--band`), una sì e una no dall'hero ai contatti: regole sotto «Fasce di ritmo» in `style.css`. Chi aggiunge o toglie una sezione rimette in fila l'alternanza.
- **Niente nuove illustrazioni generate.** Le incisioni dorate su blu notte sono state tolte da chiavi, pilastri, mappa del percorso e copertina del video (novembre 2026): erano la prima cosa che faceva sembrare il sito fatto da un'AI. Dove serve un'immagine si usa una foto della Scuola. Viola del logo e sfondi animati sono stati provati in mockup e scartati da Fabio: non riproporli.
- **Mai hardcodare un colore**: ogni colore è una coppia di variabili CSS (scuro+chiaro).
- Tipografia: EB Garamond (display, weight 500–600) + Inter (testo). Mai altre famiglie.
- **Leggibilità, anche per chi è dislessico** (novembre 2026, misurata sulla home rispetto alle indicazioni della British Dyslexia Association): i testi da leggere sono in Inter ad almeno 16px, le note ad almeno 14px, mai giustificati, interlinea almeno 1,5. I testi lunghi restano in Inter: per un giorno «Chi siamo» è stato in EB Garamond ed è tornato indietro per questo. Garamond va a titoli, citazioni brevi e prima schermata. Chi aggiunge un blocco di testo non scende sotto queste misure. Da 900px di larghezza i paragrafi lunghi sono a 19px (blocco «Lettura su schermi larghi» in fondo a `style.css`): la colonna resta a 900px come vuole Fabio e le righe scendono da 80 a circa 72-75 caratteri di media; chi aggiunge una classe per un testo lungo la aggiunge anche lì.
- Componenti card: pattern `.glass-card` con doppio bordo (pseudo-elemento `::before` con `inset`).
- **Comandi isolati alti almeno 44px** e **navigazione a hamburger sotto i 1024px**: le due regole si reggono a vicenda (il menu desktop ci sta su una riga con la spaziatura piena solo da 1492px, e da 1024 a 1209 la barra è a due righe per scelta). Dettagli e le tre eccezioni al 44px in `DESIGN.md`. Chi aggiunge una voce di menu deve rimisurare: a 1024px il margine è di 4px. La voce «Test» è una tendina (`<details class="nav-drop">`, un link per test): la sua freccina è stata compensata stringendo la spaziatura fra le voci a 1.45rem e 0.65rem, al decimo di pixel, perché le soglie restassero 1210 e 1492 (con «Eventi» al posto di «Giochi», più stretta di 1,5px, la riga singola parte da 1209).
- **Niente movimento che parte da solo.** La dissolvenza d'ingresso dei blocchi (classe `.sr`) e lo sfondo animato sono stati tolti nel novembre 2026: si muove solo ciò che risponde a un gesto (fisarmoniche, pulsanti, tendina).
- Niente effetti "da videogioco" sul sito istituzionale: l'atmosfera la fanno palette, tipografia, spaziature.

### Tic visivi da non introdurre

L'equivalente visivo dei tell di scrittura: elementi che gli LLM aggiungono per abitudine e che rendono una pagina riconoscibile come generata. Da evitare se non li chiede Fabio:

- **Pallini pulsanti** e puntini animati come indicatori di stato.
- **Bordo colorato su un solo lato** della card (la barretta verticale a sinistra).
- **Numeri monospace 01 · 02 · 03** a scandire una sequenza di passi.
- **Gradienti accesi** su testo o pulsanti, e glow diffusi.
- **Etichette in maiuscolo spaziato** e **frecce in coda al testo di un pulsante**: tolte da tutto il sito nel novembre 2026. Le etichette sono in minuscolo a 14px; la freccia resta solo a fine riga negli elenchi (i sette anni, «Per gli studenti»), dove dice che la riga si può toccare. I punti medi fra dati veri («In corso · 2026/27 · …») sono rimasti per scelta.

Attenzione a non confonderli con scelte già stabilite del sito: il piccolo testo sopra i titoli (`.section-eyebrow`) è parte del design system, ma si usa solo quando dice qualcosa che il titolo non dice (vedi `DESIGN.md`). Il criterio è la coerenza con `DESIGN.md`, non l'elenco in sé.

### Prima di modificare una regola CSS

È l'errore che si ripete più spesso su questo progetto: si cambia la regola base e restano indietro quelle che la sovrascrivono. Sono già successi due casi — una regola orfana settanta righe più in basso, e due override `[data-theme="light"]` che continuavano a dipingere una scatola appena rimossa.

1. **Cercare chi la sovrascrive**, prima di toccarla: `grep -n 'nome-classe' style.css` sull'intero file, non solo intorno alla regola. In `style.css` i selettori `[data-theme="light"]` sono una settantina: circa tre quarti stanno nel blocco subito dopo le variabili, il resto è disseminato in tutto il file. Non basta guardare in un punto solo.
2. **Se la regola aveva un `[data-theme="light"]` a supporto di ciò che si sta rimuovendo, quell'override va rimosso insieme.** Un `background` o un `border` di tema chiaro sopravvissuto ridipinge quello che si è appena tolto, e senza il padding che lo reggeva il risultato è peggiore di prima.
3. **Verificare ogni componente toccato in entrambi i temi.** Controllarne uno solo non basta: due componenti con lo stesso trattamento possono divergere, perché uno ha override di tema e l'altro no. Il tema non dipende da `colorScheme` di Playwright: il chiaro è il predefinito, lo scuro si ottiene con `localStorage.setItem('sctheme','dark')` prima del caricamento oppure con `document.documentElement.removeAttribute('data-theme')`.
4. **`[data-theme="light"]` va scritto sull'elemento giusto.** `data-theme` sta su `html`: per colpire `html` stesso o i suoi pseudo-elementi il selettore è `html[data-theme="light"]::before`, non `[data-theme="light"] html::before`, che non si applica mai.
5. **Le regole rimaste senza usi vanno cancellate**, non lasciate lì: `grep -rl 'selettore' --include='*.html' --include='*.css' --include='*.js' .` per confermare che non serva più a nessuno, giochi compresi.
6. **Dopo aver cancellato un blocco, guardare `git diff --stat`.** Nel novembre 2026 una cancellazione «da questa regola a quella» ha portato via 149 righe di override del tema chiaro: i controlli automatici non se ne accorgono, si è visto solo da un pulsante diventato scuro in uno screenshot.

## Screenshot / verifica visiva

Playwright è installato ma la CLI non combacia col browser preinstallato. Se `require('playwright-core')` fallisce: `npm install --no-save playwright-core`. Usare l'API Node con path esplicito:

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' }); // versione e sottocartella cambiano col container (prima era chromium-1194/chrome-linux): verificare con ls /opt/pw-browsers/chromium-*/
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,        // i telefoni veri sono 2-3x: a 1x i bordi da 1px spariscono
  colorScheme: 'dark'          // il default del container è light
});
// Sopprime il cookie banner, che copre l'angolo in basso a destra (pulsanti sticky).
// 'reject' evita anche di caricare Google Analytics.
await ctx.addInitScript(() => { try { localStorage.setItem('sc-cookie','reject'); } catch(e){} });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:8080/');   // servire con: python3 -m http.server 8080 --bind 127.0.0.1
```

Due trappole che fanno perdere tempo, entrambe già costate diversi tentativi a vuoto:

- **`clip` usa le coordinate del documento, non della viewport.** Dopo uno `scrollTo(0, 3000)` un `clip:{y:600}` fotografa la cima della pagina, e si ottiene un ritaglio vuoto che sembra un elemento mancante.
- **Per un elemento `position:fixed` (pulsanti sticky, banner) usare `page.locator('#id').screenshot()`**, che lo inquadra da solo ed è l'unico modo affidabile: nello screenshot della viewport a pagina scrollata gli elementi fissi possono non comparire.

- **Il fondo della pagina si controlla con uno screenshot della viewport, non a pagina intera.** Il fondo è un `body::before` fisso: in uno scatto `fullPage` copre solo la prima schermata e sotto resta bianco. Nel novembre 2026, per avere scatti lunghi presentabili, il colore di fondo veniva impostato a mano su `html` prima di fotografare: così un fondo rotto (macchie grigie nel tema chiaro, per una graffa orfana nel CSS) è passato in tutti gli scatti e l'ha visto Fabio. Dopo ogni modifica al CSS, almeno uno scatto della viewport a pagina scorsa, senza toccare gli stili.

Quando un elemento non si vede nello screenshot, prima di concludere che manca controllare che sia davvero renderizzato:

```js
await page.evaluate(() => { const e=document.getElementById('id'), r=e.getBoundingClientRect();
  return {x:r.x, y:r.y, w:r.width, op:getComputedStyle(e).opacity}; });
```

Fabio spesso chiede un **mockup/screenshot prima di implementare**: preparare una preview, mostrarla, aspettare l'ok ("procedi").

## Cosa non va nel repository

Il sito viene servito dal repository senza build: un file tracciato può essere raggiungibile online a chi ne conosce l'indirizzo. Materiale di lavoro (foto scaricate, grafiche per i social, screenshot, asset pack) va tenuto fuori; le cartelle di questo tipo già note sono in `.gitignore`. La cronologia git ne contiene ancora una copia e pesa circa 335 MB: ridurla richiede di riscrivere la storia di `main`, e va deciso con Fabio.

## Giochi didattici

15 giochi in JavaScript senza librerie esterne (niente Phaser), ognuno in una cartella propria (`il-risveglio/`, `apprendista-del-mago/`, …) con `index.html` + `data.js` + `i18n.js`; engine e stili condivisi in `giochi/`, che contiene anche la pagina con l'elenco dei giochi (`giochi/index.html`). Raramente oggetto di modifiche: toccare solo se richiesto.

## Stile di scrittura (vale per la copy del sito e per le risposte in chat)

**Niente prosa manierata.** La prosa manierata sostituisce l'affermazione diretta con metafora e ornamento. Al posto di «un parametro che conviene variare» il manierato scrive «una manopola da girare»; al posto di «questo punto conta ancora» scrive «questo punto si guadagna il posto». Sono frasi che esistono per mettere in mostra chi scrive, non per trasmettere l'idea, e il lettore se ne accorge. È per questo che la prosa manierata irrita: costringe il lettore a lavorare di più perché chi scrive possa esibirsi. Ed è anche imprecisa, perché la metafora si porta dietro connotazioni che chi scrive non ha scelto e non controlla. Il rimedio è dire quello che si intende dire: **quando esiste l'espressione letterale, usare quella.**

In più, tell stilistici già trovati e ripuliti su questo sito (non reintrodurli):

- **Il chiasmo «non X, ma Y»** — «non si accumula sapere, ci si trasforma in ciò che si studia», «non per dare risposte, ma per fornire gli strumenti». È la figura retorica più riconoscibile come scrittura da AI. Girare la frase in positivo.
- **L'em-dash retorico** a metà periodo. Gli em-dash *strutturali* (`Scuola Ermetica — Emiliano Soldani`, `MeetingRoom — Via Argiro 135`, `義 Gi — Onestà e Giustizia`) sono corretti e vanno lasciati.
- **Le triplette** decorative («consapevolezza, crescita interiore e Alchimia trasformativa») quando due termini bastano.

**Non correggere mai i testi altrui.** Le citazioni firmate dai conduttori, le riflessioni nel quaderno della Scuola, i brani di autori terzi (Bushido, fra Anto Rados, ecc.) restano come sono, anche quando contengono gli stessi pattern. Si interviene solo sulla copy scritta per il sito.

## Comunicazione con Fabio

- Parla italiano: rispondere in italiano.
- Preferisce modifiche incrementali e concrete al sito così com'è; proporre, mostrare, poi implementare dopo conferma.
