/* Test interattivi della Scuola — test/<nome>/ e en/test/<nome>/.
   Una pagina può contenere più test, ognuno in un .test-panel con
   data-test (quale calcolo usare) e data-ls (chiave delle risposte salvate).
   Le domande stanno nell'HTML (una <fieldset class="q"> per domanda, con
   data-key = gruppo e data-max = scala); i testi dei risultati nel JSON
   .test-txt del pannello, uno per lingua. Qui c'è la parte comune
   (salvataggio, avanzamento, risposte mancanti, copia, Ricomincia, schede,
   tema) e, in SCORERS, il calcolo di ogni test: un test nuovo aggiunge lì
   la sua funzione.

   Quattro Elementi (soglie dal testo del test):
   - Qualità degli Elementi F/A/Ac/T (sezioni 1–4), 7 domande da 1 a 5:
     <18 mancante (squilibrio in difetto), ≥18 presente, ≥24 dominante.
     Sono tutte qualità positive, quindi da sole non possono dire «eccesso».
   - Eccesso degli Elementi eF/eA/eAc/eT (sezione 5), 7 domande da 1 a 5:
     ≥18 tendenza, ≥24 in eccesso, ≥30 in squilibrio. Soglie più basse
     delle qualità: sono tratti negativi, anche un punteggio medio conta.
   - Stato di ogni Elemento: i due punteggi letti insieme, l'eccesso per
     primo (le qualità alte non lo compensano). Vedi elementState().
   - Triarticolazione, 3 domande da 1 a 10 per centro: conta il centro più
     basso; ≥20 matura, ≥24 integrata, ≥27 Io operativo, ≥30 Io magico.
     Se un centro è sotto 20 compaiono gli appunti di Anna Carla per
     riequilibrarlo (nell'HTML, data-role="tri-guide").
   - Attenzione e Volontà, 7 domande da 1 a 5: ≥24, ≥27, ≥30.

   Temperamento (Ippocrate e Galeno): quattro aree S/C/M/Fl di 15 domande
   da 1 a 5 (15–75); percentuale = punteggio / somma dei quattro × 100.

   Mappa antropologica dell'Enneagramma (questionario de La Via dell'Enneagramma,
   regole da Anna Carla): nove energie t1…t9 con 30 affermazioni sì/no ciascuna;
   totale = numero di sì. Media = (minimo + massimo) / 2. Un'energia con
   totale sopra la media è carica (verde); fino alla media compresa è scarica
   (rossa), il pareggio incluso perché rischia di abbassarsi. Zero sì = paura
   profonda. Se fra il totale più alto e il più basso ci sono al massimo 2
   punti la mappa è equilibrata e le energie cariche si esprimono in luce;
   altrimenti le più alte portano anche la loro ombra. Il pannello ha
   data-pages="30": le 270 affermazioni, nell'HTML in ordine per energia, sono
   disposte in ordine sparso su nove pagine (vedi setupPager).

   Frasi tipiche dell'Enneagramma (PDF di Anna Carla): 30 frasi per enneatipo
   da spuntare liberamente (data-optional), in nove sezioni già divise per
   tipo nell'HTML (nessun pool), ognuna aperta dal nome e dalla frase di
   focus del profilo (secondo PDF). Conta le spunte: il più alto è
   l'enneatipo primario; a 1–3 punti un'ala (tipo adiacente) o un secondo
   tipo forte.

   Risultato da mandare alla Scuola: ogni calcolo restituisce in `text` il
   risultato scritto per esteso (le stesse parole della pagina, una voce per
   riga), che finisce nel pulsante Copia e nei messaggi WhatsApp precompilati:
   le sole sigle non si leggevano. I due test dell'Enneagramma restituiscono
   anche `img`, da cui ennImage() disegna un PNG con la figura a colori per
   il pulsante «Condividi l'immagine». */
(function () {
  'use strict';
  var PT = JSON.parse(document.getElementById('pageTxt').textContent);

  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* nel riquadro del codice ogni gruppo va a capo, e dentro un gruppo si va a
     capo solo fra una voce e l'altra (mai fra lettera e numero); un gruppo di
     quattro voci si spezza al massimo in due coppie, non con l'ultima voce sola */
  function codeHtml(groups) {
    return groups.map(function (g) {
      var items = g.split(' – ').map(function (x) { return '<span class="code-item">' + esc(x) + '</span>'; });
      if (items.length === 4) items = [ '<span class="code-pair">' + items[0] + ' – ' + items[1] + '</span>', '<span class="code-pair">' + items[2] + ' – ' + items[3] + '</span>' ];
      return '<span class="code-group">' + items.join(' – ') + '</span>';
    }).join(' ');
  }

  /* Figura dell'Enneagramma: cerchio, triangolo 3-6-9, esagramma 1-4-2-8-5-7,
     il 9 in alto e un riquadro con il totale per ogni tipo; cls(k) dà la
     classe del riquadro (su/giu nella Mappa, top/vicino nel test del tipo). */
  function ennSvg(vals, cls, label) {
    function pt(k, r) { var a = (-90 + k * 40) * Math.PI / 180; return [+(200 + r * Math.cos(a)).toFixed(1), +(200 + r * Math.sin(a)).toFixed(1)]; }
    function line(a, b) { var p = pt(a, 118), q = pt(b, 118); return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '"/>'; }
    var svg = '<svg class="enn" viewBox="0 0 400 400" role="img" aria-label="' + esc(label) + '">' +
      '<circle cx="200" cy="200" r="118" class="enn-circle"/><g class="enn-lines">' +
      line(3, 6) + line(6, 9) + line(9, 3) + line(1, 4) + line(4, 2) + line(2, 8) + line(8, 5) + line(5, 7) + line(7, 1) + '</g>';
    for (var k = 1; k <= 9; k++) {
      var b = pt(k, 164), n = pt(k, 126);
      svg += '<g class="enn-box ' + cls(k) + '"><rect x="' + (b[0] - 22) + '" y="' + (b[1] - 18) + '" width="44" height="36" rx="6"/>' +
        '<text x="' + b[0] + '" y="' + (b[1] + 1) + '">' + vals[k - 1] + '</text></g>' +
        '<text class="enn-n" x="' + n[0] + '" y="' + (n[1] + 1) + '">' + k + '</text>';
    }
    return svg + '</svg>';
  }

  /* Immagine del risultato per i due test dell'Enneagramma: la stessa figura
     della pagina disegnata su un canvas (un SVG passato per <img> perderebbe
     i caratteri), con i colori del tema attivo letti dalle variabili CSS.
     d = { title, vals, cls(k), lines: [{ t, c: text|muted|gold|ok|ko, s, sans }] } */
  function ennImage(d) {
    var cs = getComputedStyle(document.documentElement);
    var v = function (n) { return cs.getPropertyValue(n).trim(); };
    var C = { bg: v('--bg'), text: v('--text'), muted: v('--text-muted'), gold: v('--gold-light'), oro: v('--gold'), onGold: v('--on-gold'),
              ok: v('--ok-text'), ko: v('--ko-text'), okBg: 'rgba(' + v('--ok-rgb') + ',0.1)', koBg: 'rgba(' + v('--ko-rgb') + ',0.08)',
              surface: v('--surface'), line: v('--border-hover') };
    var W = 1080, PAD = 80, K = 2.1, FX = (W - 400 * K) / 2, FY = 250;
    var serif = "'EB Garamond', Georgia, serif", sans = "'Inter', system-ui, sans-serif";
    var cv = document.createElement('canvas'), g = cv.getContext('2d');
    function font(l) { return (l.sans ? '400 ' : '600 ') + l.s + 'px ' + (l.sans ? sans : serif); }
    /* prima le righe a capo, per conoscere l'altezza */
    var rows = [];
    d.lines.forEach(function (l) {
      g.font = font(l);
      var cur = '';
      l.t.split(' ').forEach(function (w) {
        var t = cur ? cur + ' ' + w : w;
        if (cur && g.measureText(t).width > W - 2 * PAD) { rows.push({ t: cur, l: l }); cur = w; } else cur = t;
      });
      rows.push({ t: cur, l: l, last: true });
    });
    var H = FY + 400 * K + 30;
    rows.forEach(function (r) { H += r.l.s * 1.4 + (r.last ? 18 : 0); });
    H += 110;
    cv.width = W; cv.height = Math.round(H);
    g.fillStyle = C.bg; g.fillRect(0, 0, W, cv.height);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = C.gold; g.font = '600 38px ' + serif; g.fillText('Scuola ContattaTi', W / 2, 90);
    g.fillStyle = C.text; g.font = '500 56px ' + serif; g.fillText(d.title, W / 2, 165);
    g.fillStyle = C.muted; g.font = '400 26px ' + sans;
    g.fillText(new Date().toLocaleDateString(document.documentElement.lang || 'it'), W / 2, 225);

    function pt(k, r) { var a = (-90 + k * 40) * Math.PI / 180; return [FX + (200 + r * Math.cos(a)) * K, FY + (200 + r * Math.sin(a)) * K]; }
    g.lineWidth = 1 * K; g.strokeStyle = C.line;
    g.beginPath(); g.arc(FX + 200 * K, FY + 200 * K, 118 * K, 0, 2 * Math.PI); g.stroke();
    g.lineWidth = 1.4 * K; g.strokeStyle = C.oro; g.lineCap = 'round'; g.globalAlpha = 0.85;
    [[3, 6], [6, 9], [9, 3], [1, 4], [4, 2], [2, 8], [8, 5], [5, 7], [7, 1]].forEach(function (s) {
      var p = pt(s[0], 118), q = pt(s[1], 118);
      g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke();
    });
    g.globalAlpha = 1;
    /* gli stessi riquadri di .enn-box in test.css */
    var BOX = { su: [C.okBg, C.ok, C.ok], giu: [C.koBg, C.ko, C.ko, true], top: [C.oro, C.oro, C.onGold], vicino: [C.surface, C.oro, C.gold], '': [C.surface, C.line, C.muted] };
    for (var k = 1; k <= 9; k++) {
      var b = pt(k, 164), n = pt(k, 126), st = BOX[d.cls(k)] || BOX[''];
      var x = b[0] - 22 * K, y = b[1] - 18 * K, w = 44 * K, h = 36 * K, r = 6 * K;
      g.beginPath(); g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
      g.fillStyle = C.bg; g.fill(); g.fillStyle = st[0]; g.fill();
      g.setLineDash(st[3] ? [4 * K, 3 * K] : []); g.lineWidth = (d.cls(k) === 'vicino' ? 1.5 : 1) * K; g.strokeStyle = st[1]; g.stroke(); g.setLineDash([]);
      g.fillStyle = st[2]; g.font = '600 ' + 19 * K + 'px ' + serif; g.fillText(d.vals[k - 1], b[0], b[1] + K);
      g.fillStyle = C.muted; g.font = '400 ' + 13 * K + 'px ' + serif; g.fillText(k, n[0], n[1] + K);
    }
    var yy = FY + 400 * K + 30;
    rows.forEach(function (r) {
      g.font = font(r.l); g.fillStyle = C[r.l.c || 'text'];
      g.fillText(r.t, W / 2, yy + r.l.s * 0.7);
      yy += r.l.s * 1.4 + (r.last ? 18 : 0);
    });
    g.fillStyle = C.muted; g.font = '400 26px ' + sans; g.fillText('scuolacontattati.com', W / 2, cv.height - 60);
    return cv;
  }

  /* messaggio WhatsApp precompilato con il risultato per esteso */
  function waLinks(ui, T, text) {
    var msg = encodeURIComponent(fmt(T.wa_msg, { code: text }));
    [['wa-ac', '393929116441'], ['wa-nic', '393349991888']].forEach(function (w) {
      var a = ui.role(w[0]); if (a) a.href = 'https://wa.me/' + w[1] + '?text=' + msg;
    });
  }

  /* glifo alchemico dell'Elemento: gli stessi tracciati dei titoli di sezione */
  var GLYPH = { F: 'M10 2 L18.5 17.5 L1.5 17.5 Z', A: 'M10 2 L18.5 17.5 L1.5 17.5 Z M4.5 12 H15.5', Ac: 'M10 18 L1.5 2.5 L18.5 2.5 Z', T: 'M10 18 L1.5 2.5 L18.5 2.5 Z M4.5 8 H15.5' };
  function glyph(k) { return '<svg class="el-glyph" viewBox="0 0 20 20" aria-hidden="true"><path d="' + GLYPH[k] + '"/></svg>'; }

  var SCORERS = {
    elementi: function (s, T, ui) {
      var Lb = T.labels, N = Lb.names, els = ['F', 'A', 'Ac', 'T'];
      function level(v, steps, labels) {
        var out = Lb.none;
        steps.forEach(function (th, i) { if (v >= th) out = labels[i]; });
        return out;
      }
      function qualityStatus(v) {
        if (v >= 24) return Lb.el.dominante;
        if (v >= 18) return Lb.el.presente;
        return Lb.el.mancante;
      }
      function excessStatus(v) {
        if (v >= 30) return Lb.el.squilibrio;
        if (v >= 24) return Lb.el.eccesso;
        if (v >= 18) return Lb.el.tendenza;
        return '';
      }
      /* q = qualità (sezioni 1–4), e = eccesso (sezione 5) */
      function elementState(q, e) {
        if (e >= 30) return Lb.stato.squilibrio;
        if (e >= 24) return q < 18 ? Lb.stato.ombra : Lb.stato.eccesso;
        if (q < 18) return Lb.stato.difetto;
        if (e >= 18) return Lb.stato.osserva;
        return Lb.stato.equilibrio;
      }
      function unbalanced(q, e) { return q < 18 || e >= 24; }
      function row(name, val, max, label) {
        return '<tr><th scope="row">' + esc(name) + '</th><td class="num">' + val + ' / ' + max + '</td><td>' + esc(label) + '</td></tr>';
      }

      var triMin = Math.min(s.P, s.S, s.V);
      /* tre gruppi, come nell'esempio del test: elementi (qualità / eccesso),
         centri, attenzione e volontà */
      var groups = [els.map(function (k) { return k + ' ' + s[k] + '/' + s['e' + k]; }).join(' – '),
                    'P ' + s.P + ' – S ' + s.S + ' – V ' + s.V,
                    'A ' + s.ATT + ' · W ' + s.VOL];
      var code = groups.join(' · ');

      var top = Math.max.apply(null, els.map(function (k) { return s[k]; }));
      var dom = els.filter(function (k) { return s[k] >= 24 && s[k] === top; }).map(function (k) { return N[k]; });
      var mis = els.filter(function (k) { return s[k] < 18; }).map(function (k) { return N[k]; });
      var exc = els.filter(function (k) { return s['e' + k] >= 24; });

      /* una scheda per Elemento: barra delle qualità con le tacche a 18 e 24,
         barra dell'eccesso con le tacche a 18, 24 e 30, su 35 */
      function bar(cls, v, ticks) {
        return '<span class="el-track ' + cls + '" aria-hidden="true"><i style="width:' + (v * 100 / 35).toFixed(1) + '%"></i>' +
          ticks.map(function (t) { return '<b style="left:' + (t * 100 / 35).toFixed(1) + '%"></b>'; }).join('') + '</span>';
      }
      var h = '<h3 class="sr-only">' + esc(Lb.elements) + '</h3><div class="el-cards">';
      els.forEach(function (k) {
        h += '<div class="el-card' + (unbalanced(s[k], s['e' + k]) ? ' off' : '') + '"><div class="el-head">' +
          '<span class="el-name">' + glyph(k) + esc(N[k]) + '</span>' +
          '<span class="el-status">' + esc(qualityStatus(s[k])) + ' · ' + esc(excessStatus(s['e' + k]) || Lb.el.nessuno) + '</span></div>' +
          '<div class="el-bars"><span>' + esc(Lb.quality) + '</span>' + bar('quality', s[k], [18, 24]) + '<span class="num">' + s[k] + ' / 35</span>' +
          '<span>' + esc(Lb.excess) + '</span>' + bar('excess', s['e' + k], [18, 24, 30]) + '<span class="num">' + s['e' + k] + ' / 35</span></div>' +
          '<p class="el-state"><strong>' + esc(Lb.statoLabel) + ':</strong> ' + esc(elementState(s[k], s['e' + k])) + '</p></div>';
      });
      h += '</div>' + (Lb.soglie ? '<p class="test-scale-note">' + esc(Lb.soglie) + '</p>' : '');
      h += '<p><strong>' + esc(Lb.dominant) + ':</strong> ' + esc(dom.length ? dom.join(', ') : Lb.noneDominant) + '<br>' +
           '<strong>' + esc(Lb.missingEl) + ':</strong> ' + esc(mis.length ? mis.join(', ') : Lb.noneMissing) + '<br>' +
           '<strong>' + esc(Lb.excessEl) + ':</strong> ' + esc(exc.length ? exc.map(function (k) { return N[k]; }).join(', ') : Lb.noneExcess) + '</p>';
      /* per ogni Elemento in eccesso, la descrizione della Scuola */
      exc.forEach(function (k) {
        var d = T.excess_desc[k];
        h += '<div class="excess-desc"><h3>' + esc(N[k]) + ' — ' + esc(excessStatus(s['e' + k])) + '</h3><p>' + esc(d[0]) + '</p><ul>' +
          d[1].map(function (b) { return '<li><strong>' + esc(b[0]) + ':</strong> ' + esc(b[1]) + '</li>'; }).join('') + '</ul></div>';
      });
      h += '<table class="result-table"><tbody>';
      ['P', 'S', 'V'].forEach(function (k) { h += row(N[k], s[k], 30, ''); });
      var triLevel = triMin < 20 && Lb.triNone ? Lb.triNone : level(triMin, [20, 24, 27, 30], Lb.tri);
      h += row(Lb.centers, triMin, 30, triLevel);
      h += row(N.ATT, s.ATT, 35, level(s.ATT, [24, 27, 30], Lb.att));
      h += row(N.VOL, s.VOL, 35, level(s.VOL, [24, 27, 30], Lb.vol));
      h += '</tbody></table>';

      /* invito alla consulenza: segnala gli Elementi mancanti (qualità <18) o
         in eccesso (eccesso ≥24, squilibrio compreso) e precompila il messaggio WhatsApp */
      var off = els.filter(function (k) { return unbalanced(s[k], s['e' + k]); })
                   .map(function (k) { return N[k] + ' ' + elementState(s[k], s['e' + k]); });
      /* centri sotto 20: si apre la possibilità di leggere gli appunti della
         Scuola sulla Triarticolazione (nell'HTML, chiusi), con il punteggio
         accanto ai centri da riequilibrare; i centri entrano anche nell'invito */
      var low = ['P', 'S', 'V'].filter(function (k) { return s[k] < 20; });
      var guide = ui.role('tri-guide');
      if (guide) {
        guide.hidden = !low.length;
        var nomi = low.map(function (k) { return N[k]; });
        var lista = nomi.length > 1 ? nomi.slice(0, -1).join(', ') + T.tri_and + nomi[nomi.length - 1] : nomi[0];
        ui.role('tri-lead').textContent = low.length ? fmt(T.tri_lead, { list: lista, verb: low.length > 1 ? T.tri_many : T.tri_one }) : '';
        guide.querySelectorAll('.tri-center').forEach(function (c) {
          var k = c.getAttribute('data-center'), you = c.querySelector('.tri-you');
          c.classList.toggle('low', s[k] < 20);
          you.hidden = s[k] >= 20;
          you.textContent = fmt(T.tri_you, { v: s[k] });
        });
        low.forEach(function (k) { off.push(N[k] + ' ' + T.tri_low); });
      }
      var flag = ui.role('flag');
      flag.hidden = !off.length;
      if (off.length) flag.textContent = fmt(T.consult_flag, { list: off.join(', ') });

      /* il risultato per esteso: prima dominante, mancante ed eccesso, poi lo
         stato di ogni Elemento, i tre centri, attenzione e volontà; il Codice in fondo */
      var text = [
        Lb.dominant + ': ' + (dom.length ? dom.join(', ') : Lb.noneDominant),
        Lb.missingEl + ': ' + (mis.length ? mis.join(', ') : Lb.noneMissing),
        Lb.excessEl + ': ' + (exc.length ? exc.map(function (k) { return N[k]; }).join(', ') : Lb.noneExcess),
        ''
      ].concat(els.map(function (k) {
        return N[k] + ' — ' + elementState(s[k], s['e' + k]) + ' · ' + Lb.quality + ' ' + s[k] + '/35, ' + Lb.excess + ' ' + s['e' + k] + '/35';
      }), [
        '',
        Lb.centers + ': ' + triMin + '/30, ' + triLevel,
        ['P', 'S', 'V'].map(function (k) { return N[k] + ' ' + s[k] + '/30' + (s[k] < 20 ? ' (' + T.tri_low + ')' : ''); }).join(' · '),
        N.ATT + ': ' + s.ATT + '/35, ' + level(s.ATT, [24, 27, 30], Lb.att),
        N.VOL + ': ' + s.VOL + '/35, ' + level(s.VOL, [24, 27, 30], Lb.vol),
        '',
        Lb.codeLabel + ': ' + code
      ]).join('\n');
      waLinks(ui, T, text);

      /* legenda sotto il codice: le sigle con i nomi, nello stesso ordine */
      var legend = els.map(function (k) { return k + ' ' + N[k]; }).join(' · ') + ' (' + Lb.quality + ' / ' + Lb.excess + ') · ' +
                   'P ' + N.P + ' · S ' + N.S + ' · V ' + N.V + ' · A ' + N.ATT + ' · W ' + N.VOL;
      return { groups: groups, text: text, html: h, legend: legend };
    },

    temperamento: function (s, T, ui) {
      var Lb = T.labels, keys = ['S', 'C', 'M', 'Fl'];
      var tot = keys.reduce(function (a, k) { return a + s[k]; }, 0);
      /* percentuali intere che sommano a 100 (metodo dei resti più grandi);
         punteggi uguali hanno sempre la stessa percentuale, anche a costo di un 99 */
      var raw = keys.map(function (k) { return s[k] * 100 / tot; });
      var pct = raw.map(Math.floor), rest = 100 - pct.reduce(function (a, b) { return a + b; }, 0);
      var byRest = keys.map(function (k, i) { return i; }).sort(function (a, b) { return (raw[b] - pct[b]) - (raw[a] - pct[a]); });
      while (rest > 0 && byRest.length) {
        var r0 = raw[byRest[0]] - pct[byRest[0]];
        var same = byRest.filter(function (i) { return raw[i] - pct[i] === r0; });
        if (same.length > rest) break;
        same.forEach(function (i) { pct[i]++; });
        rest -= same.length; byRest = byRest.slice(same.length);
      }
      var P = {}; keys.forEach(function (k, i) { P[k] = pct[i]; });
      var order = keys.slice().sort(function (a, b) { return s[b] - s[a]; });
      var top = s[order[0]];
      var pred = order.filter(function (k) { return s[k] === top; }).map(function (k) { return Lb.names[k]; });

      var groups = [order.map(function (k) { return Lb.names[k] + ' ' + P[k] + '%'; }).join(' – ')];
      /* per esteso: il predominante e la gerarchia, un temperamento per riga */
      var text = Lb.predominant + ': ' + pred.join(', ') + '\n' + Lb.hierarchy + ':\n' +
        order.map(function (k, i) { return (i + 1) + '. ' + Lb.names[k] + ' (' + Lb.el[k] + ') ' + P[k] + '% · ' + s[k] + '/75'; }).join('\n');
      waLinks(ui, T, text);
      /* nel riquadro la gerarchia va a capo un temperamento per riga */
      var box = order.map(function (k) { return '<span class="code-line">' + esc(Lb.names[k]) + ' ' + P[k] + '%</span>'; }).join('');
      var h = '<h3>' + esc(Lb.predominant) + '</h3><p class="temp-predominant">' + esc(pred.join(', ')) + '</p>';
      h += '<table class="result-table temp-table"><caption class="sr-only">' + esc(Lb.hierarchy) + '</caption><tbody>';
      order.forEach(function (k, i) {
        h += '<tr><th scope="row">' + (i + 1) + '. ' + esc(Lb.names[k]) + '<span class="temp-el">' + esc(Lb.el[k]) + '</span></th>' +
          '<td class="num">' + s[k] + ' / 75<br><strong>' + P[k] + '%</strong></td>' +
          '<td class="temp-bar-cell" aria-hidden="true"><span class="temp-bar-track"><span class="temp-bar" style="width:' + Math.round(s[k] * 100 / 75) + '%"></span></span></td></tr>';
      });
      h += '</tbody></table>';
      h += '<p class="test-scale-note">' + esc(Lb.total) + ': ' + tot + '</p>';

      /* profili: per intero il predominante (o i predominanti a pari punteggio),
         gli altri chiusi, nell'ordine della gerarchia */
      var PR = T.profiles;
      var profile = function (k) {
        var p = PR.p[k];
        return '<p class="temp-profile-sub">' + esc(p.sub) + '</p><p>' + esc(p.body) + '</p>' +
          '<div class="temp-work"><p class="temp-work-label">' + esc(PR.work) + '</p><p>' + esc(p.work) + '</p></div>';
      };
      var tops = order.filter(function (k) { return s[k] === top; });
      h += '<section class="temp-profiles"><h3>' + esc(PR.intro_title) + '</h3><p>' + esc(PR.intro) + '</p>';
      h += '<h4 class="temp-group">' + esc(PR.profiles_title) + '</h4>';
      tops.forEach(function (k) { h += '<article class="temp-profile"><h5 class="temp-profile-title">' + esc(PR.p[k].title) + '</h5>' + profile(k) + '</article>'; });
      var rest = order.filter(function (k) { return s[k] !== top; });
      if (rest.length) {
        h += '<h4 class="temp-group">' + esc(PR.others_title) + '</h4>';
        rest.forEach(function (k) {
          h += '<details class="temp-profile temp-more"><summary>' + esc(PR.p[k].title) + ' <span class="temp-more-pct">' + P[k] + '%</span></summary>' + profile(k) + '</details>';
        });
      }
      h += '</section>';
      return { groups: groups, box: box, text: text, html: h };
    },

    enneagramma: function (s, T, ui) {
      var Lb = T.labels, keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var vals = keys.map(function (k) { return s['t' + k] || 0; });
      var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
      var media = (min + max) / 2, disp = max - min;
      var tot = vals.reduce(function (a, b) { return a + b; }, 0);
      var num = function (v) { return String(v).replace('.', ','); };
      var carica = function (v) { return v > media; };
      var cls = function (v) { return carica(v) ? 'su' : 'giu'; };

      var nScariche = vals.filter(function (v) { return !carica(v); }).length;
      var stato = function (i) { return (carica(vals[i]) ? Lb.carica : Lb.scarica) + (vals[i] === 0 ? ' · ' + Lb.zero : ''); };
      var riepilogo = Lb.min + ' ' + min + ' · ' + Lb.max + ' ' + max + ' · ' + Lb.media + ' ' + num(media) + ' · ' + Lb.scariche + ' ' + nScariche + ' / 9';
      var equilibrio = fmt(disp <= 2 ? Lb.equilibrata : Lb.squilibrata, { d: disp });
      /* per esteso: una riga per energia con lo stato scritto, perché nel testo i colori non ci sono */
      var text = riepilogo + '\n' + equilibrio + '\n\n' +
        keys.map(function (k, i) { return fmt(Lb.tipo, { k: k }) + ': ' + vals[i] + '/30, ' + stato(i); }).join('\n');
      /* nel riquadro tre energie per riga */
      var box = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(function (r) {
        return '<span class="code-line">' + r.map(function (i) { return '<span class="code-item">' + keys[i] + ' · ' + vals[i] + '</span>'; }).join(' – ') + '</span>';
      }).join('');
      var svg = ennSvg(vals, function (k) { return cls(vals[k - 1]); }, Lb.svg);

      var h = '<div class="enn-media"><span>' + esc(Lb.min) + ' <b>' + min + '</b></span><span>' + esc(Lb.max) + ' <b>' + max + '</b></span>' +
        '<span>' + esc(Lb.media) + ' <b>' + num(media) + '</b></span><span>' + esc(Lb.si) + ' <b>' + tot + '</b></span>' +
        '<span>' + esc(Lb.scariche) + ' <b>' + nScariche + ' / 9</b></span></div>' + svg +
        '<p class="enn-legenda">' + esc(Lb.legenda) + '</p>' +
        '<p class="enn-equilibrio ' + (disp <= 2 ? 'su' : 'giu') + '">' + esc(equilibrio) + '</p>';
      h += '<table class="result-table enn-table"><caption class="sr-only">' + esc(Lb.tabella) + '</caption><tbody>';
      keys.forEach(function (k, i) {
        h += '<tr><th scope="row">' + esc(fmt(Lb.tipo, { k: k })) + '</th><td class="num">' + vals[i] + ' / 30</td><td><span class="stato ' + cls(vals[i]) + '">' + esc(stato(i)) + '</span></td></tr>';
      });
      h += '</tbody></table>';

      waLinks(ui, T, text);
      /* email con tutte le risposte: una riga per energia, S/N nell'ordine
         originale delle 30 affermazioni (data-n), così chi legge le ritrova */
      var mail = ui.role('mail');
      if (mail) {
        var per = {};
        ui.risposte().forEach(function (r) { (per[r.key] = per[r.key] || [])[r.n - 1] = r.v ? 'S' : 'N'; });
        var righe = keys.map(function (k, i) { return k + ' (' + vals[i] + '/30): ' + (per['t' + k] || []).join(''); }).join('\n');
        mail.href = 'mailto:scuola-contattati@libero.it?subject=' + encodeURIComponent(T.mail_subject) +
          '&body=' + encodeURIComponent(fmt(T.mail_body, { code: text, risposte: righe }));
      }
      var img = { title: T.share_title, vals: vals, cls: function (k) { return cls(vals[k - 1]); }, lines: [
        { t: riepilogo, c: 'muted', s: 30, sans: true },
        { t: equilibrio, c: disp <= 2 ? 'ok' : 'ko', s: 38 },
        { t: Lb.legenda, c: 'muted', s: 28, sans: true }] };
      return { box: box, text: text, html: h, img: img };
    },

    /* Frasi tipiche: conta le frasi spuntate per enneatipo; il più alto è il
       primario (a pari punteggio, tutti), e chi gli sta a 1–3 punti è un'ala
       (tipo adiacente sul cerchio) o un secondo tipo forte. */
    enneatipo: function (s, T, ui) {
      var Lb = T.labels, keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var vals = keys.map(function (k) { return s['t' + k] || 0; });
      var tot = vals.reduce(function (a, b) { return a + b; }, 0);
      var max = Math.max.apply(null, vals);
      var nomi = Lb.nomi || {}, titoli = Lb.titoli || {}, focus = Lb.focus || {};
      var nome = function (k) { return fmt(Lb.tipo, { k: k, nome: nomi[k] || '' }); };
      /* scheda di un enneatipo: titolo completo del PDF e frase di focus */
      var scheda = function (k) { return titoli[k] ? '<p class="enn-focus"><strong>' + esc(titoli[k]) + '</strong><br>' + esc(focus[k] || '') + '</p>' : ''; };
      var order = keys.slice().sort(function (a, b) { return vals[b - 1] - vals[a - 1] || a - b; });
      var top = max ? order.filter(function (k) { return vals[k - 1] === max; }) : [];
      var lista = function (ks) { return ks.map(nome).join(' e '); };
      var adiacente = function (a, b) { var d = Math.abs(a - b); return d === 1 || d === 8; };
      var vicini = top.length === 1 ? order.filter(function (k) { var d = max - vals[k - 1]; return d >= 1 && d <= 3; }) : [];
      var ali = vicini.filter(function (k) { return adiacente(k, top[0]); }), secondi = vicini.filter(function (k) { return !adiacente(k, top[0]); });
      var pct = function (v) { return Math.round(v * 100 / 30); };

      var box = '<span class="code-line">' + esc(max ? lista(top) : '—') + '</span>' +
        (max ? '<span class="code-line code-sub">' + max + ' / 30 · ' + pct(max) + '%</span>' : '');
      var h = '';
      if (!max) h += '<p>' + esc(Lb.nessuna) + '</p>';
      else {
        /* figura: il primario in oro pieno, ala e secondo tipo forte con il bordo in oro */
        if (Lb.svg) h += ennSvg(vals, function (k) { return top.indexOf(k) >= 0 ? 'top' : vicini.indexOf(k) >= 0 ? 'vicino' : ''; }, fmt(Lb.svg, { tipi: lista(top) }));
        h += '<h3>' + esc(fmt(top.length > 1 ? Lb.primario_pari : Lb.primario, { tipi: lista(top) })) + '</h3>' +
          '<p>' + esc(fmt(top.length > 1 ? Lb.frasi_pari : Lb.frasi, { n: max, tipo: nome(top[0]) })) + '</p>';
        var diff = function (ks) { var ds = ks.map(function (k) { return max - vals[k - 1]; }); return ds.length > 1 && ds[0] !== ds[ds.length - 1] ? ds[0] + '–' + ds[ds.length - 1] : ds[0]; };
        top.forEach(function (k) { h += scheda(k); });
        if (ali.length) h += '<p>' + esc(fmt(Lb.ala, { tipi: lista(ali), d: diff(ali) })) + '</p>' + ali.map(scheda).join('');
        if (secondi.length) h += '<p>' + esc(fmt(Lb.secondo, { tipi: lista(secondi), d: diff(secondi) })) + '</p>' + secondi.map(scheda).join('');
      }
      h += '<table class="result-table temp-table"><caption class="sr-only">' + esc(Lb.tabella) + '</caption><tbody>';
      order.forEach(function (k, i) {
        var v = vals[k - 1];
        var breve = Lb.tipoBreve ? fmt(Lb.tipoBreve, { k: k }) : nome(k);
        h += '<tr' + (top.indexOf(k) >= 0 ? ' class="enn-top"' : '') + '><th scope="row">' + (i + 1) + '. ' + esc(breve) + (Lb.tipoBreve && nomi[k] ? '<span class="temp-el">' + esc(nomi[k]) + '</span>' : '') + '</th>' +
          '<td class="num">' + v + ' / 30<br><strong>' + pct(v) + '%</strong></td>' +
          '<td class="temp-bar-cell" aria-hidden="true"><span class="temp-bar-track"><span class="temp-bar" style="width:' + pct(v) + '%"></span></span></td></tr>';
      });
      h += '</tbody></table><p class="test-scale-note">' + esc(Lb.totale) + ': ' + tot + '</p>';
      /* gli enneatipi non citati sopra, chiusi, nell'ordine della classifica */
      var citati = top.concat(vicini), altri = order.filter(function (k) { return citati.indexOf(k) < 0; });
      if (Lb.altri && altri.length && titoli[altri[0]]) {
        h += '<section class="temp-profiles"><h4 class="temp-group">' + esc(Lb.altri) + '</h4>';
        altri.forEach(function (k) {
          h += '<details class="temp-profile temp-more"><summary>' + esc(titoli[k]) + ' <span class="temp-more-pct">' + vals[k - 1] + ' / 30</span></summary><p>' + esc(focus[k] || '') + '</p></details>';
        });
        h += '</section>';
      }

      /* per esteso: primario, ala e secondo tipo con le frasi della pagina, poi le frasi segnate per tipo */
      var righe = [], img = null;
      if (max) {
        righe.push(fmt(top.length > 1 ? Lb.primario_pari : Lb.primario, { tipi: lista(top) }) + ': ' + max + '/30');
        if (ali.length) righe.push(fmt(Lb.ala, { tipi: lista(ali), d: diff(ali) }));
        if (secondi.length) righe.push(fmt(Lb.secondo, { tipi: lista(secondi), d: diff(secondi) }));
        img = { title: T.share_title, vals: vals, cls: function (k) { return top.indexOf(k) >= 0 ? 'top' : vicini.indexOf(k) >= 0 ? 'vicino' : ''; },
          lines: righe.map(function (t, i) { return i ? { t: t, c: 'text', s: 30, sans: true } : { t: t, c: 'gold', s: 40 }; })
            .concat([{ t: Lb.legendaImg, c: 'muted', s: 28, sans: true }]) };
      } else righe.push(Lb.nessuna);
      var text = righe.join('\n') + '\n\n' + Lb.tabella + ':\n' +
        order.map(function (k) { return nome(k) + ': ' + vals[k - 1] + '/30'; }).join('\n');
      waLinks(ui, T, text);
      return { box: box, text: text, html: h, img: img };
    }
  };

  /* Pagine: un pannello con data-pages="N" tiene le domande in [data-role="pool"]
     e le distribuisce N per sezione in ordine sparso. L'ordine si salva accanto
     alle risposte, così riprendendo il test ogni affermazione resta nella stessa
     pagina; Ricomincia lo cancella e la visita successiva ne estrae uno nuovo. */
  function setupPager(panel, form, LS) {
    var n = +panel.getAttribute('data-pages');
    if (!n) return null;
    var secs = [].slice.call(form.querySelectorAll('.test-section'));
    var key = LS + '-ordine';
    /* senza pool le sezioni sono già piene (una per enneatipo) e restano in ordine */
    var pool = form.querySelector('[data-role="pool"]');
    if (pool) {
      var qs = [].slice.call(pool.querySelectorAll('.q')), order = null;
      try { order = JSON.parse(localStorage.getItem(key)); } catch (e) {}
      if (!order || order.length !== qs.length) {
        order = qs.map(function (_, i) { return i; });
        for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
        try { localStorage.setItem(key, JSON.stringify(order)); } catch (e) {}
      }
      order.forEach(function (idx, pos) {
        var sec = secs[Math.min(secs.length - 1, Math.floor(pos / n))];
        sec.querySelector('[data-role="slot"]').appendChild(qs[idx]);
      });
      pool.parentNode.removeChild(pool);
    }
    var cur = 0, saved = 0, viste = [];
    try { saved = Math.max(0, Math.min(secs.length - 1, +localStorage.getItem(key + '-pagina') || 0)); } catch (e) {}
    /* sezioni già aperte almeno una volta: dove le frasi si possono lasciare
       in bianco è l'unico modo di sapere che il test è stato letto tutto */
    try { viste = JSON.parse(localStorage.getItem(key + '-viste')) || []; } catch (e) {}
    function show(i, focus) {
      cur = Math.max(0, Math.min(secs.length - 1, i));
      secs.forEach(function (s, k) { s.hidden = k !== cur; });
      try { localStorage.setItem(key + '-pagina', cur); } catch (e) {}
      if (viste.indexOf(cur) < 0) {
        viste.push(cur);
        try { localStorage.setItem(key + '-viste', JSON.stringify(viste)); } catch (e) {}
      }
      if (focus) {
        var h = secs[cur].querySelector('h2');
        secs[cur].scrollIntoView({ block: 'start' });
        if (h) h.focus({ preventScroll: true });
      }
    }
    function pageOf(q) { return secs.indexOf(q.closest('.test-section')); }
    form.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-go]'); if (!b) return;
      show(cur + (b.getAttribute('data-go') === 'next' ? 1 : -1), true);
    });
    return {
      show: show, saved: saved,
      reveal: function (q) { show(pageOf(q)); },
      viste: function () { return viste.length; },
      vista: function (i) { return viste.indexOf(i) >= 0; },
      totale: secs.length,
      /* la prima sezione mai aperta, -1 se le hanno viste tutte */
      daVedere: function () { for (var k = 0; k < secs.length; k++) if (viste.indexOf(k) < 0) return k; return -1; },
      reset: function () {
        viste = [];
        try { localStorage.removeItem(key); localStorage.removeItem(key + '-viste'); } catch (e) {}
        show(0);
      }
    };
  }

  function setupTest(panel) {
    var T = JSON.parse(panel.querySelector('.test-txt').textContent);
    var LS = panel.getAttribute('data-ls');
    var scorer = SCORERS[panel.getAttribute('data-test')];
    var ui = { role: function (r) { return panel.querySelector('[data-role="' + r + '"]'); } };
    var form = ui.role('form'), progress = ui.role('progress'), result = ui.role('result');
    var pager = setupPager(panel, form, LS);
    var qs = [].slice.call(form.querySelectorAll('.q'));
    /* risposte una per una, per chi le manda alla Scuola */
    ui.risposte = function () {
      return qs.map(function (q) { var c = q.querySelector('input:checked'); return { key: q.getAttribute('data-key'), n: +q.getAttribute('data-n'), v: c ? +c.value : null }; });
    };
    /* «per niente vero / totalmente vero» sono aria-hidden sotto la scala:
       lo screen reader li sente come nome del primo e dell'ultimo valore. */
    qs.forEach(function (q) {
      var ends = q.querySelectorAll('.scale-ends span'), r = q.querySelectorAll('input[type="radio"]');
      if (ends.length === 2 && r.length) {
        r[0].setAttribute('aria-label', r[0].value + ' \u2013 ' + ends[0].textContent);
        r[r.length - 1].setAttribute('aria-label', r[r.length - 1].value + ' \u2013 ' + ends[1].textContent);
      }
    });

    function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
    function save(a) { try { localStorage.setItem(LS, JSON.stringify(a)); } catch (e) {} }

    var answers = load();
    /* chi riprende un test non ha bisogno di rileggere le istruzioni */
    var intro = panel.querySelector('details.test-intro');
    if (intro && Object.keys(answers).length) intro.open = false;
    Object.keys(answers).forEach(function (name) {
      var el = form.querySelector('input[name="' + name + '"][value="' + answers[name] + '"]');
      if (el) el.checked = true;
    });

    function answered() { return qs.filter(function (q) { return q.querySelector('input:checked'); }); }
    var optional = panel.hasAttribute('data-optional');
    /* nella barra fissa, un segmento per sezione (o per pagina) riempito in
       proporzione alle risposte; dove le frasi sono facoltative, pieno quando
       la sezione è stata aperta. Il pulsante resta ghost finché manca qualcosa */
    var secs = [].slice.call(form.querySelectorAll('.test-section')).filter(function (sec) { return sec.querySelector('.q'); });
    var submit = form.querySelector('.test-actions button[type="submit"]');
    var segs = null;
    if (progress && secs.length > 1) {
      segs = document.createElement('span');
      segs.className = 'test-segments'; segs.setAttribute('aria-hidden', 'true');
      segs.innerHTML = secs.map(function () { return '<span><i></i></span>'; }).join('');
      progress.parentNode.insertBefore(segs, progress);
    }
    function updateSegments() {
      if (!segs) return;
      [].slice.call(segs.children).forEach(function (seg, i) {
        var all = [].slice.call(secs[i].querySelectorAll('.q')), done;
        if (optional) done = pager && pager.vista(i) ? all.length : 0;
        else done = all.filter(function (q) { return q.querySelector('input:checked'); }).length;
        seg.firstChild.style.transform = 'scaleX(' + (done / all.length) + ')';
        seg.classList.toggle('cur', !!pager && !secs[i].hidden);
      });
    }
    function updateProgress() {
      progress.textContent = fmt(T.progress, { n: answered().length, tot: qs.length });
      updateSegments();
      var complete = optional ? !pager || pager.daVedere() < 0 : answered().length === qs.length;
      if (submit) submit.classList.toggle('btn-test-ghost', !complete);
    }
    /* a pagine: si riparte dalla prima domanda senza risposta; se le frasi
       si possono lasciare in bianco, dall'ultima pagina vista */
    if (pager) {
      var prima = optional ? null : qs.filter(function (q) { return !q.querySelector('input:checked'); })[0];
      if (prima) pager.reveal(prima); else pager.show(optional ? pager.saved : 0);
      /* cambiando sezione l'avviso sulle sezioni mancanti torna il conteggio */
      form.addEventListener('click', function (ev) { if (ev.target.closest('[data-go]')) updateProgress(); });
    }
    updateProgress();

    form.addEventListener('change', function (ev) {
      var t = ev.target; if (t.type !== 'radio' && t.type !== 'checkbox') return;
      if (t.checked) answers[t.name] = +t.value; else delete answers[t.name];
      save(answers);
      t.closest('.q').classList.remove('missing');
      updateProgress();
    });

    function sums() {
      var s = {};
      qs.forEach(function (q) {
        var k = q.getAttribute('data-key'), c = q.querySelector('input:checked');
        s[k] = (s[k] || 0) + (c ? +c.value : 0);
      });
      return s;
    }

    var codeText = '';
    /* Immagine del risultato. Il file si prepara appena c'è il risultato e non
       al clic: navigator.share vuole partire dentro il gesto dell'utente, e su
       Safari un'attesa (caratteri, toBlob) fra il clic e la chiamata lo fa
       rifiutare. Se nel frattempo il tema è cambiato si ridisegna. */
    var imgData = null, imgFile = null, imgTema = '';
    var shareBtns = [].slice.call(panel.querySelectorAll('[data-role="share-img"]'));
    function tema() { return document.documentElement.getAttribute('data-theme') || 'dark'; }
    function prepara(poi) {
      var d = imgData, t = tema();
      var disegna = function () {
        if (d !== imgData) return;
        ennImage(d).toBlob(function (blob) {
          if (d !== imgData || !blob) return;
          imgTema = t;
          try { imgFile = new File([blob], T.share_file, { type: 'image/png' }); } catch (e) { imgFile = blob; }
          if (poi) poi();
        }, 'image/png');
      };
      if (document.fonts && document.fonts.load) {
        Promise.all([document.fonts.load("600 40px 'EB Garamond'"), document.fonts.load("500 40px 'EB Garamond'"), document.fonts.load("400 26px 'Inter'")]).then(disegna, disegna);
      } else disegna();
    }
    function scarica(b) {
      var a = document.createElement('a'), url = URL.createObjectURL(imgFile);
      a.href = url; a.download = T.share_file; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      var o = b.textContent; b.textContent = T.share_saved; setTimeout(function () { b.textContent = o; }, 2200);
    }
    function condividi(b) {
      if (!imgFile) return;
      var dati = { files: [imgFile], title: T.share_title };
      if (imgFile.name && navigator.canShare && navigator.canShare(dati)) {
        navigator.share(dati).catch(function (e) { if (!e || e.name !== 'AbortError') scarica(b); });
      } else scarica(b);
    }
    shareBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (!imgData) return;
        if (imgFile && imgTema === tema()) condividi(b);
        else { imgFile = null; prepara(function () { condividi(b); }); }
      });
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      /* data-optional: ogni frase si può lasciare in bianco, quindi nessuna
         risposta manca mai; si ricorda che il risultato è stato calcolato */
      var missing = optional ? [] : qs.filter(function (q) { return !q.querySelector('input:checked'); });
      missing.forEach(function (q) { q.classList.add('missing'); });
      /* con le frasi facoltative non manca mai una risposta, ma può mancare
         una sezione mai aperta: si va lì invece di calcolare a metà */
      if (optional && pager && pager.daVedere() >= 0) {
        pager.show(pager.daVedere(), true);
        updateSegments();
        progress.textContent = fmt(T.unvisited, { n: pager.viste(), tot: pager.totale });
        return;
      }
      if (optional) { answers._done = 1; save(answers); }
      if (missing.length) {
        progress.textContent = fmt(T.missing, { n: missing.length });
        if (pager) pager.reveal(missing[0]);
        missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        missing[0].querySelector('input').focus({ preventScroll: true });
        return;
      }
      mostraRisultato(true);
    });

    function mostraRisultato(vaiAlRisultato) {
      var r = scorer(sums(), T, ui);
      codeText = T.share_title + ' – Scuola ContattaTi\n\n' + r.text;
      imgData = r.img || null; imgFile = null;
      shareBtns.forEach(function (b) { b.hidden = !imgData; });
      if (imgData) prepara();
      ui.role('code').innerHTML = (r.box || codeHtml(r.groups)) + (r.legend ? '<p class="code-legend">' + esc(r.legend) + '</p>' : '');
      ui.role('detail').innerHTML = r.html;
      result.hidden = false;
      if (vaiAlRisultato) {
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        result.focus({ preventScroll: true });
      }
    }
    /* chi torna con tutte le risposte salvate ritrova il risultato, senza
       dover premere di nuovo il pulsante */
    if (qs.length && (optional ? answers._done : answered().length === qs.length)) mostraRisultato(false);

    ui.role('copy').addEventListener('click', function () {
      var b = this, done = function () { var o = b.textContent; b.textContent = T.copied; setTimeout(function () { b.textContent = o; }, 1800); };
      /* riserva per i browser interni (WhatsApp, Instagram) dove clipboard non c'è o fallisce */
      var fallback = function () {
        var ta = document.createElement('textarea'); ta.value = codeText; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
        try { if (document.execCommand('copy')) done(); } catch (e) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(codeText).then(done, fallback);
      else fallback();
    });
    ui.role('redo').addEventListener('click', function () {
      if (!confirm(T.redo_confirm)) return;
      answers = {}; save(answers); form.reset();
      qs.forEach(function (q) { q.classList.remove('missing'); });
      result.hidden = true;
      if (pager) pager.reset();
      updateProgress();
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var panels = [].slice.call(document.querySelectorAll('.test-panel'));
  panels.forEach(setupTest);

  /* Tema chiaro/scuro: stessa chiave (sctheme) e stessa logica del sito */
  var btn = document.getElementById('themeToggle');
  if (btn) {
    var upd = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      btn.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true">' + (light ? '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>' : '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>') + '</span><span class="lbl"> ' + esc(light ? PT.theme_dark : PT.theme_light) + '</span>';
    };
    upd();
    btn.addEventListener('click', function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      var m = document.getElementById('metaThemeColor');
      if (light) { document.documentElement.removeAttribute('data-theme'); if (m) m.content = '#0d0b1a'; }
      else { document.documentElement.setAttribute('data-theme', 'light'); if (m) m.content = '#f5f0e8'; }
      try { localStorage.setItem('sctheme', light ? 'dark' : 'light'); } catch (e) {}
      upd();
    });
  }
})();
