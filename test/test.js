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
   tipo, ognuna aperta dal nome e dalla frase di focus del profilo. Conta le
   spunte: il più alto è l'enneatipo primario; a 1–3 punti un'ala (tipo
   adiacente) o un secondo tipo forte. */
(function () {
  'use strict';
  var PT = JSON.parse(document.getElementById('pageTxt').textContent);

  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* nel riquadro del codice ogni gruppo va a capo, e dentro un gruppo si va a
     capo solo fra una voce e l'altra (mai fra lettera e numero) */
  function codeHtml(groups) {
    return groups.map(function (g) {
      return '<span class="code-group">' + g.split(' – ').map(function (x) { return '<span class="code-item">' + esc(x) + '</span>'; }).join(' – ') + '</span>';
    }).join(' ');
  }

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

      var h = '<table class="result-table"><caption class="sr-only">' + esc(Lb.elements) + '</caption><tbody>';
      els.forEach(function (k) {
        h += '<tr><th scope="row">' + esc(N[k]) + '</th>' +
          '<td class="num">' + esc(Lb.quality) + ' ' + s[k] + ' / 35<br>' + esc(Lb.excess) + ' ' + s['e' + k] + ' / 35</td>' +
          '<td>' + esc(qualityStatus(s[k])) + '<br>' + esc(excessStatus(s['e' + k]) || Lb.el.nessuno) + '</td></tr>' +
          '<tr class="state-row' + (unbalanced(s[k], s['e' + k]) ? ' off' : '') + '"><td colspan="3"><strong>' + esc(Lb.statoLabel) + ':</strong> ' +
          esc(elementState(s[k], s['e' + k])) + '</td></tr>';
      });
      h += '</tbody></table>';
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
      h += row(Lb.centers, triMin, 30, level(triMin, [20, 24, 27, 30], Lb.tri));
      h += row(N.ATT, s.ATT, 35, level(s.ATT, [24, 27, 30], Lb.att));
      h += row(N.VOL, s.VOL, 35, level(s.VOL, [24, 27, 30], Lb.vol));
      h += '</tbody></table>';

      /* invito alla consulenza: segnala gli Elementi mancanti (qualità <18) o
         in eccesso (eccesso ≥24, squilibrio compreso) e precompila il messaggio WhatsApp */
      var off = els.filter(function (k) { return unbalanced(s[k], s['e' + k]); })
                   .map(function (k) { return N[k] + ' ' + elementState(s[k], s['e' + k]); });
      var flag = ui.role('flag');
      flag.hidden = !off.length;
      if (off.length) flag.textContent = fmt(T.consult_flag, { list: off.join(', ') });
      var msg = encodeURIComponent(fmt(T.wa_msg, { code: code }));
      ui.role('wa-ac').href = 'https://wa.me/393929116441?text=' + msg;
      ui.role('wa-nic').href = 'https://wa.me/393349991888?text=' + msg;

      /* legenda sotto il codice: le sigle con i nomi, nello stesso ordine */
      var legend = els.map(function (k) { return k + ' ' + N[k]; }).join(' · ') + ' (' + Lb.quality + ' / ' + Lb.excess + ') · ' +
                   'P ' + N.P + ' · S ' + N.S + ' · V ' + N.V + ' · A ' + N.ATT + ' · W ' + N.VOL;
      return { groups: groups, code: code, html: h, legend: legend };
    },

    temperamento: function (s, T) {
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
      var code = Lb.codePrefix + ': ' + groups[0];
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
      return { groups: groups, box: box, code: code, html: h };
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

      var code = keys.map(function (k, i) { return k + '=' + vals[i]; }).join(', ') + ' (' + Lb.media.toLowerCase() + ' ' + num(media) + ')';
      /* nel riquadro tre energie per riga */
      var box = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(function (r) {
        return '<span class="code-line">' + r.map(function (i) { return '<span class="code-item">' + keys[i] + ' · ' + vals[i] + '</span>'; }).join(' – ') + '</span>';
      }).join('');
      /* figura: cerchio, triangolo 3-6-9, esagramma 1-4-2-8-5-7, un riquadro per energia */
      function pt(k, r) { var a = (-90 + k * 40) * Math.PI / 180; return [+(200 + r * Math.cos(a)).toFixed(1), +(200 + r * Math.sin(a)).toFixed(1)]; }
      function line(a, b) { var p = pt(a, 118), q = pt(b, 118); return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '"/>'; }
      var svg = '<svg class="enn" viewBox="0 0 400 400" role="img" aria-label="' + esc(Lb.svg) + '">' +
        '<circle cx="200" cy="200" r="118" class="enn-circle"/><g class="enn-lines">' +
        line(3, 6) + line(6, 9) + line(9, 3) + line(1, 4) + line(4, 2) + line(2, 8) + line(8, 5) + line(5, 7) + line(7, 1) + '</g>';
      keys.forEach(function (k, i) {
        var b = pt(k, 164), n = pt(k, 126);
        svg += '<g class="enn-box ' + cls(vals[i]) + '"><rect x="' + (b[0] - 22) + '" y="' + (b[1] - 18) + '" width="44" height="36" rx="6"/>' +
          '<text x="' + b[0] + '" y="' + (b[1] + 1) + '">' + vals[i] + '</text></g>' +
          '<text class="enn-n" x="' + n[0] + '" y="' + (n[1] + 1) + '">' + k + '</text>';
      });
      svg += '</svg>';

      var h = '<div class="enn-media"><span>' + esc(Lb.min) + ' <b>' + min + '</b></span><span>' + esc(Lb.max) + ' <b>' + max + '</b></span>' +
        '<span>' + esc(Lb.media) + ' <b>' + num(media) + '</b></span><span>' + esc(Lb.si) + ' <b>' + tot + '</b></span></div>' + svg +
        '<p class="enn-legenda">' + esc(Lb.legenda) + '</p>' +
        '<p class="enn-equilibrio ' + (disp <= 2 ? 'su' : 'giu') + '">' + esc(fmt(disp <= 2 ? Lb.equilibrata : Lb.squilibrata, { d: disp })) + '</p>';
      h += '<table class="result-table enn-table"><caption class="sr-only">' + esc(Lb.tabella) + '</caption><tbody>';
      keys.forEach(function (k, i) {
        var st = carica(vals[i]) ? Lb.carica : Lb.scarica;
        if (vals[i] === 0) st += ' · ' + Lb.zero;
        h += '<tr><th scope="row">' + esc(fmt(Lb.tipo, { k: k })) + '</th><td class="num">' + vals[i] + ' / 30</td><td><span class="stato ' + cls(vals[i]) + '">' + esc(st) + '</span></td></tr>';
      });
      h += '</tbody></table>';

      var msg = encodeURIComponent(fmt(T.wa_msg, { code: code }));
      ui.role('wa-ac').href = 'https://wa.me/393929116441?text=' + msg;
      ui.role('wa-nic').href = 'https://wa.me/393349991888?text=' + msg;
      /* email con tutte le risposte: una riga per energia, S/N nell'ordine
         originale delle 30 affermazioni (data-n), così chi legge le ritrova */
      var mail = ui.role('mail');
      if (mail) {
        var per = {};
        ui.risposte().forEach(function (r) { (per[r.key] = per[r.key] || [])[r.n - 1] = r.v ? 'S' : 'N'; });
        var righe = keys.map(function (k, i) { return k + ' (' + vals[i] + '/30): ' + (per['t' + k] || []).join(''); }).join('\n');
        mail.href = 'mailto:scuola-contattati@libero.it?subject=' + encodeURIComponent(T.mail_subject) +
          '&body=' + encodeURIComponent(fmt(T.mail_body, { code: code, risposte: righe }));
      }
      return { groups: [code], box: box, code: Lb.codePrefix + ': ' + code, html: h };
    },

    /* Frasi tipiche: conta le frasi spuntate per enneatipo; il più alto è il
       primario (a pari punteggio, tutti), e chi gli sta a 1–3 punti è un'ala
       (tipo adiacente sul cerchio) o un secondo tipo forte. */
    enneatipo: function (s, T, ui) {
      var Lb = T.labels, keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var vals = keys.map(function (k) { return s['t' + k] || 0; });
      var tot = vals.reduce(function (a, b) { return a + b; }, 0);
      var max = Math.max.apply(null, vals);
      var nome = function (k) { return fmt(Lb.tipo, { k: k, nome: (Lb.nomi || {})[k] || '' }); };
      var order = keys.slice().sort(function (a, b) { return vals[b - 1] - vals[a - 1] || a - b; });
      var top = max ? order.filter(function (k) { return vals[k - 1] === max; }) : [];
      var lista = function (ks) { return ks.map(nome).join(' e '); };
      var adiacente = function (a, b) { var d = Math.abs(a - b); return d === 1 || d === 8; };
      var vicini = top.length === 1 ? order.filter(function (k) { var d = max - vals[k - 1]; return d >= 1 && d <= 3; }) : [];
      var ali = vicini.filter(function (k) { return adiacente(k, top[0]); }), secondi = vicini.filter(function (k) { return !adiacente(k, top[0]); });
      var pct = function (v) { return Math.round(v * 100 / 30); };

      var code = max ? lista(top) + ' (' + max + '/30)' + (vicini.length ? ' · ' + lista(vicini) : '') : '—';
      var box = '<span class="code-line">' + esc(max ? lista(top) : '—') + '</span>' +
        (max ? '<span class="code-line code-sub">' + max + ' / 30 · ' + pct(max) + '%</span>' : '');
      var h = '';
      if (!max) h += '<p>' + esc(Lb.nessuna) + '</p>';
      else {
        h += '<h3>' + esc(fmt(top.length > 1 ? Lb.primario_pari : Lb.primario, { tipi: lista(top) })) + '</h3>' +
          '<p>' + esc(fmt(top.length > 1 ? Lb.frasi_pari : Lb.frasi, { n: max, tipo: nome(top[0]) })) + '</p>';
        var diff = function (ks) { var ds = ks.map(function (k) { return max - vals[k - 1]; }); return ds.length > 1 && ds[0] !== ds[ds.length - 1] ? ds[0] + '–' + ds[ds.length - 1] : ds[0]; };
        if (ali.length) h += '<p>' + esc(fmt(Lb.ala, { tipi: lista(ali), d: diff(ali) })) + '</p>';
        if (secondi.length) h += '<p>' + esc(fmt(Lb.secondo, { tipi: lista(secondi), d: diff(secondi) })) + '</p>';
      }
      h += '<table class="result-table temp-table"><caption class="sr-only">' + esc(Lb.tabella) + '</caption><tbody>';
      order.forEach(function (k, i) {
        var v = vals[k - 1];
        var breve = Lb.tipoBreve ? fmt(Lb.tipoBreve, { k: k }) : nome(k), nm = (Lb.nomi || {})[k];
        h += '<tr' + (top.indexOf(k) >= 0 ? ' class="enn-top"' : '') + '><th scope="row">' + (i + 1) + '. ' + esc(breve) + (Lb.tipoBreve && nm ? '<span class="temp-el">' + esc(nm) + '</span>' : '') + '</th>' +
          '<td class="num">' + v + ' / 30<br><strong>' + pct(v) + '%</strong></td>' +
          '<td class="temp-bar-cell" aria-hidden="true"><span class="temp-bar-track"><span class="temp-bar" style="width:' + pct(v) + '%"></span></span></td></tr>';
      });
      h += '</tbody></table><p class="test-scale-note">' + esc(Lb.totale) + ': ' + tot + '</p>';

      var tutti = keys.map(function (k) { return k + '=' + vals[k - 1]; }).join(', ');
      var msg = encodeURIComponent(fmt(T.wa_msg, { code: code + ' · ' + tutti }));
      ui.role('wa-ac').href = 'https://wa.me/393929116441?text=' + msg;
      ui.role('wa-nic').href = 'https://wa.me/393349991888?text=' + msg;
      return { groups: [code], box: box, code: Lb.codePrefix + ': ' + code + ' · ' + tutti, html: h };
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
    var cur = 0, saved = 0;
    try { saved = Math.max(0, Math.min(secs.length - 1, +localStorage.getItem(key + '-pagina') || 0)); } catch (e) {}
    function show(i, focus) {
      cur = Math.max(0, Math.min(secs.length - 1, i));
      secs.forEach(function (s, k) { s.hidden = k !== cur; });
      try { localStorage.setItem(key + '-pagina', cur); } catch (e) {}
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
      reset: function () { try { localStorage.removeItem(key); } catch (e) {} show(0); }
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
    function updateProgress() { progress.textContent = fmt(T.progress, { n: answered().length, tot: qs.length }); }
    updateProgress();
    /* a pagine: si riparte dalla prima domanda senza risposta; se le frasi
       si possono lasciare in bianco, dall'ultima pagina vista */
    var optional = panel.hasAttribute('data-optional');
    if (pager) {
      var prima = optional ? null : qs.filter(function (q) { return !q.querySelector('input:checked'); })[0];
      if (prima) pager.reveal(prima); else pager.show(optional ? pager.saved : 0);
    }

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
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      /* data-optional: ogni frase si può lasciare in bianco, quindi nessuna
         risposta manca mai; si ricorda che il risultato è stato calcolato */
      var missing = optional ? [] : qs.filter(function (q) { return !q.querySelector('input:checked'); });
      missing.forEach(function (q) { q.classList.add('missing'); });
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
      codeText = r.code;
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
      result.hidden = true; updateProgress();
      if (pager) pager.reset();
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
