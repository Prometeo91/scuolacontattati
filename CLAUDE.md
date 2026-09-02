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
| `index.html` | Tutto il sito it (~1750 righe): sezioni `#chi-siamo`, `#insegnamenti`, `#conduttori`, `#galleria`, `#calendario`, `#libro`, `#faq`, `#contatti`, `#ispirazioni`, `#giochi` |
| `en/index.html` | Versione inglese speculare |
| `style.css` | Tutti gli stili, design system a variabili CSS |
| `app.js` | Tema chiaro/scuro, countdown eventi, scroll-reveal, lightbox, service worker |
| `lezioni.js` | **Fonte di verità** dei contenuti delle lezioni: array `L1`…`L7` (un array per anno di corso, con titoli, temi, date, citazioni). Consultarlo prima di scrivere qualsiasi testo sul percorso di studi |
| `data/eventi.js`, `data/citazioni.js` | Dati eventi e citazioni |
| `deisgn.md` | Design system (nota: il nome file ha il typo, lasciarlo così) |

## Seminari in evidenza (pattern ricorrente, oggi non attivo)

Quando c'è un seminario da promuovere si ricrea una sezione `#seminario` in entrambi gli index, più due landing `seminario.html` e `en/seminario.html` con i meta Open Graph per la condivisione su WhatsApp/Facebook, che rimandano a `/#seminario`.

Oggi **non esistono**: sezione e landing sono state rimosse col commit `2722cf3`, passato il seminario del 26 luglio 2026. Il meccanismo però è ancora in `app.js`: i blocchi `.seminar-section` con `data-expires` vengono nascosti a scadenza e, quando sono scaduti tutti, spariscono anche la sezione `#seminario` e la sua voce di menu. Il codice è protetto da `if(sem)`, quindi in assenza della sezione non fa nulla. Per il prossimo seminario basta ricreare il markup.

Resta in repo `images/seminario-luglio-2026.webp`, non più referenziata da nessun file.

## Fatti di dominio (verificati con Fabio)

- Percorso **settennale**: ciclo base 3 anni con **7 lezioni l'anno** (dal 2026/27; il 1° anno 2025/26 ne ha avute 6, ed è corretto così nei dati), ciclo avanzato 4 anni con 3 lezioni l'anno.
- Una lezione di cui si conosce solo la data si inserisce in `lezioni.js` con i soli campi `num`/`day`/`month`/`year`: il calendario ha già lo stato "programma in definizione" (riga attenuata, nessun pannello espandibile). Non inventare titoli o temi.
- Conduttori: Anna Carla Digregorio e Nicolaos Anifantis. Anna Carla comunica novità via WhatsApp che spesso vanno riportate sul sito.
- Libro: *Ricchezza, Abbondanza e Mission* (Gagliano Edizioni).
- Eventi con `data-expires` nel markup e countdown gestiti da `app.js`; schema.org JSON-LD (`Event`) nell'`<head>` da tenere allineato ai dettagli mostrati in pagina (orari inclusi).
- **Ogni modifica a `style.css` richiede il cache-bust**: aggiornare il `?v=` del link a style.css in `index.html` E `en/index.html`, la voce CORE in `sw.js` e incrementare la `VERSION` del service worker. Altrimenti i visitatori di ritorno vedono il CSS vecchio (stale-while-revalidate) e i nuovi elementi appaiono senza stile.

## Design system (regole rigide)

- Tema scuro "Officina" (default): fondo `#0d0b1a`, oro `#e8c97a`/`#c9973a`. Tema chiaro "Pergamena": fondo `#f5f0e8`. Dettagli completi in `deisgn.md`.
- **Mai hardcodare un colore**: ogni colore è una coppia di variabili CSS (scuro+chiaro).
- Tipografia: EB Garamond (display, weight 500–600) + Inter (testo). Mai altre famiglie.
- Componenti card: pattern `.glass-card` con doppio bordo (pseudo-elemento `::before` con `inset`).
- Animazioni d'ingresso: classe `.sr` (scroll-reveal via IntersectionObserver).
- Niente effetti "da videogioco" sul sito istituzionale: l'atmosfera la fanno palette, tipografia, spaziature.

### Prima di modificare una regola CSS

È l'errore che si ripete più spesso su questo progetto: si cambia la regola base e restano indietro quelle che la sovrascrivono. Sono già successi due casi — una regola orfana settanta righe più in basso, e due override `[data-theme="light"]` che continuavano a dipingere una scatola appena rimossa.

1. **Cercare chi la sovrascrive**, prima di toccarla: `grep -n 'nome-classe' style.css` sull'intero file, non solo intorno alla regola. In `style.css` ci sono **77 regole `[data-theme="light"]` sparse dalla riga 124 alla 1972**: circa due terzi stanno nel blocco iniziale (righe 100-300), il resto è disseminato ovunque. Non basta guardare in un punto solo.
2. **Se la regola aveva un `[data-theme="light"]` a supporto di ciò che si sta rimuovendo, quell'override va rimosso insieme.** Un `background` o un `border` di tema chiaro sopravvissuto ridipinge quello che si è appena tolto, e senza il padding che lo reggeva il risultato è peggiore di prima.
3. **Verificare ogni componente toccato in entrambi i temi.** Controllarne uno solo non basta: due componenti con lo stesso trattamento possono divergere, perché uno ha override di tema e l'altro no. Il tema chiaro si attiva con `document.documentElement.setAttribute('data-theme','light')`, non con `colorScheme` di Playwright.
4. **Le regole rimaste senza usi vanno cancellate**, non lasciate lì: `grep -rl 'selettore' --include='*.html' --include='*.css' --include='*.js' .` per confermare che non serva più a nessuno, giochi compresi.

## Screenshot / verifica visiva

Playwright è installato ma la CLI non combacia col browser preinstallato. Usare l'API Node con path esplicito:

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }); // verificare la versione in /opt/pw-browsers
const page = await browser.newPage({ colorScheme: 'dark' }); // il default del container è light
// Le sezioni .sr sono invisibili in headless finché non scrollate: forzarle
await page.evaluate(() => document.querySelectorAll('.sr').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; }));
```

Fabio spesso chiede un **mockup/screenshot prima di implementare**: preparare una preview, mostrarla, aspettare l'ok ("procedi").

## Giochi didattici

15 giochi (Phaser 3), ognuno in una cartella propria (`il-risveglio/`, `apprendista-del-mago/`, …) con `index.html` + `data.js` + `i18n.js`; engine e stili condivisi in `giochi/`. Raramente oggetto di modifiche: toccare solo se richiesto.

## Stile di scrittura (vale per la copy del sito e per le risposte in chat)

**Niente prosa manierata.** La prosa manierata sostituisce l'affermazione diretta con metafora e ornamento. Al posto di «un parametro che conviene variare» il manierato scrive «una manopola da girare»; al posto di «questo punto conta ancora» scrive «questo punto si guadagna il posto». Sono frasi che esistono per mettere in mostra chi scrive, non per trasmettere l'idea, e il lettore se ne accorge. È per questo che la prosa manierata irrita: costringe il lettore a lavorare di più perché chi scrive possa esibirsi. Ed è anche imprecisa, perché la metafora si porta dietro connotazioni che chi scrive non ha scelto e non controlla. Il rimedio è dire quello che si intende dire: **quando esiste l'espressione letterale, usare quella.**

Versione breve, se serve ricordarsela in fretta: *rimuovere ogni prosa manierata.*

In più, tell stilistici già trovati e ripuliti su questo sito (non reintrodurli):

- **Il chiasmo «non X, ma Y»** — «non si accumula sapere, ci si trasforma in ciò che si studia», «non per dare risposte, ma per fornire gli strumenti». È la figura retorica più riconoscibile come scrittura da AI. Girare la frase in positivo.
- **L'em-dash retorico** a metà periodo. Gli em-dash *strutturali* (`Scuola Ermetica — Emiliano Soldani`, `MeetingRoom — Via Argiro 135`, `義 Gi — Onestà e Giustizia`) sono corretti e vanno lasciati.
- **Le triplette** decorative («consapevolezza, crescita interiore e Alchimia trasformativa») quando due termini bastano.

**Non correggere mai i testi altrui.** Le citazioni firmate dai conduttori, le riflessioni nel quaderno della Scuola, i brani di autori terzi (Bushido, fra Anto Rados, ecc.) restano come sono, anche quando contengono gli stessi pattern. Si interviene solo sulla copy scritta per il sito.

## Comunicazione con Fabio

- Parla italiano: rispondere in italiano.
- Preferisce modifiche incrementali e concrete al sito così com'è; proporre, mostrare, poi implementare dopo conferma.
