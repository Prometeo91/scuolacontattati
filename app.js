/* ═══════════════════════════════════════════════════
   Scuola ContattaTi — app.js
   Tutti gli script di pagina in un unico file cacheable.
   Caricato con defer: esegue dopo il parsing HTML completo.
   FILE UNICO per sito italiano (/) e inglese (/en/):
   le stringhe UI sono scelte in base a <html lang="...">.
   ═══════════════════════════════════════════════════ */

/* ── LINGUA (i18n) ──
   Per modificare una stringa dell'interfaccia aggiornala in
   ENTRAMBE le tabelle qui sotto (en e it). */
var SC_EN = (document.documentElement.lang || 'it').indexOf('en') === 0;
var SC_T = SC_EN ? {
  temaChiaro:'Light theme', temaScuro:'Dark theme',
  apriMenu:'Open menu', chiudiMenu:'Close menu',
  mesi:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  mesiL:['January','February','March','April','May','June','July','August','September','October','November','December'],
  videoTitle:'Introductory video of the Scuola ContattaTi',
  inCorso:'&#9679; In progress', conclusa:'Completed', iscriviti:'Enrol',
  inCorsoOra:' — In progress now', prossima:' ✶ Next',
  anno:'Year', lezione:'Lesson', temi:'Topics',
  inArrivo:'Coming soon', locandinaInArrivo:'Details coming soon',
  di:'of',
  presEventi:'events including conferences, festivals and presentations',
  formAttendiTitolo:'Please wait',
  formAttendiTesto:'The form was submitted too quickly. Please try again in a few seconds.',
  formInviatoTitolo:'Message sent',
  formInviatoTesto:'Thank you, we will reply soon.',
  formOkTitolo:'✓ Message sent',
  formOkTesto:'Thank you! We have received your message and will reply as soon as possible.',
  formErroreTitolo:'Sending error',
  formErroreTesto:'Something went wrong. Please try writing to us directly via WhatsApp or email.',
  formConnTitolo:'Connection error',
  formConnTesto:'Unable to send the message. Check your connection and try again, or write to us directly via WhatsApp.',
  mostraMeno:'Show fewer ▴', mostraTutte:'Show all photos ▾',
  mostraRiflessioni:'Show all reflections ▾', menoRiflessioni:'Show fewer ▴',
  foto:'Photo', fotoPrec:'Previous photo', fotoSucc:'Next photo', chiudi:'Close'
} : {
  temaChiaro:'Tema chiaro', temaScuro:'Tema scuro',
  apriMenu:'Apri menu', chiudiMenu:'Chiudi menu',
  mesi:['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
  mesiL:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  videoTitle:'Video di presentazione della Scuola ContattaTi',
  inCorso:'&#9679; In corso', conclusa:'Conclusa', iscriviti:'Iscriviti',
  inCorsoOra:' — In corso ora', prossima:' ✶ Prossima',
  anno:'Anno', lezione:'Lezione', temi:'Temi',
  inArrivo:'In arrivo', locandinaInArrivo:'Locandina in arrivo',
  di:'di',
  presEventi:'eventi tra conferenze, festival e presentazioni',
  formAttendiTitolo:'Attendi un momento',
  formAttendiTesto:'Il modulo è stato inviato troppo velocemente. Riprova tra qualche secondo.',
  formInviatoTitolo:'Messaggio inviato',
  formInviatoTesto:'Grazie, ti risponderemo presto.',
  formOkTitolo:'✓ Messaggio inviato',
  formOkTesto:'Grazie! Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.',
  formErroreTitolo:'Errore nell’invio',
  formErroreTesto:'Qualcosa è andato storto. Prova a scriverci direttamente via WhatsApp o email.',
  formConnTitolo:'Errore di connessione',
  formConnTesto:'Impossibile inviare il messaggio. Verifica la tua connessione e riprova, oppure scrivici direttamente via WhatsApp.',
  mostraMeno:'Mostra meno ▴', mostraTutte:'Mostra tutte le foto ▾',
  mostraRiflessioni:'Mostra tutte le riflessioni ▾', menoRiflessioni:'Mostra meno ▴',
  foto:'Foto', fotoPrec:'Foto precedente', fotoSucc:'Foto successiva', chiudi:'Chiudi'
};

/* ── STORAGE SICURO — localStorage può lanciare SecurityError se l'utente
      blocca tutti i cookie: questi helper non devono mai uccidere lo script ── */
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}

/* ── COOKIE BANNER (GDPR / ePrivacy) ── */
(function(){
  var KEY = 'sc-cookie';
  var banner = document.getElementById('cookie-banner');
  var choice = lsGet(KEY);
  if(!choice){ banner.hidden = false; }

  // Cross-page: se l'utente arriva da privacy.html dopo aver rimosso sc-cookie,
  // il banner potrebbe non apparire subito (race condition con scroll restore).
  // Ricontrolliamo dopo il load completo.
  window.addEventListener('load', function(){
    if(!lsGet(KEY) && banner.hidden){ banner.hidden = false; }
  });

  function loadGA(){
    if(window.__gaLoaded) return;
    window.__gaLoaded = true;
    if(typeof gtag === 'function'){
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-2NTMVVV5GB';
    document.head.appendChild(s);
    if(typeof gtag === 'function'){
      gtag('config', 'G-2NTMVVV5GB', { 'anonymize_ip': true });
    }
  }

  document.getElementById('cookieAccept').addEventListener('click', function(){
    lsSet(KEY, 'accept');
    banner.hidden = true;
    loadGA();
  });
  document.getElementById('cookieReject').addEventListener('click', function(){
    lsSet(KEY, 'reject');
    banner.hidden = true;
    window['ga-disable-G-2NTMVVV5GB'] = true;
  });

  // Link "Gestisci cookie" nel footer — riapre il banner
  var manage = document.getElementById('manageCookies');
  if(manage){
    manage.addEventListener('click', function(e){
      e.preventDefault();
      banner.hidden = false;
    });
  }
})();

/* ── MAIN APP (DOMContentLoaded) ── */
document.addEventListener('DOMContentLoaded', function() {

  /* Converti numero in cifra romana */
  function toRoman(n){var v=[1,4,5,9,10,40,50,90,100,400,500,900,1000],s=['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M'],r='';for(var i=v.length-1;i>=0;i--){while(n>=v[i]){r+=s[i];n-=v[i];}}return r;}

  /* EVENTI A SCADENZA — nasconde gli elementi con data-expires superata.
     data-expires = ULTIMO GIORNO dell'evento, formato AAAA-MM-GG:
     l'elemento resta visibile per tutto quel giorno e sparisce dal successivo.
     Se tutti i .seminar-section sono scaduti, nasconde anche la sezione
     #seminario e la relativa voce di menu. */
  (function(){
    var now=new Date();
    document.querySelectorAll('[data-expires]').forEach(function(el){
      var end=new Date(el.getAttribute('data-expires')+'T23:59:59');
      if(!isNaN(end) && now>end){
        el.style.display='none';
        el.setAttribute('data-expired','1');
      }
    });
    var sem=document.getElementById('seminario');
    if(sem){
      var tot=sem.querySelectorAll('.seminar-section').length;
      var exp=sem.querySelectorAll('.seminar-section[data-expired]').length;
      if(tot>0 && tot===exp){
        sem.style.display='none';
        var nl=document.querySelector('.nav-links a[href="#seminario"]');
        if(nl) nl.style.display='none';
      }
    }
    /* JSON-LD: rimuovi gli Event con endDate superata. Google esegue il JS,
       quindi evita structured data di eventi passati senza interventi a mano.
       Tocca solo gli script ld+json in forma array (il blocco eventi). */
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(sc){
      var data;try{data=JSON.parse(sc.textContent);}catch(e){return;}
      if(!Array.isArray(data))return;
      var kept=data.filter(function(o){
        return !(o && o['@type']==='Event' && o.endDate && new Date(o.endDate)<now);
      });
      if(kept.length===data.length)return;
      if(kept.length===0){sc.parentNode.removeChild(sc);}
      else{sc.textContent=JSON.stringify(kept,null,2);}
    });
  })();

  /* THEME TOGGLE */
  var themeBtn=document.getElementById('themeToggle');
  if(themeBtn){
    var isDark=document.documentElement.getAttribute('data-theme')!=='light';
    function updThemeBtn(){
      var soleSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>';
      var lunaSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>';
      themeBtn.innerHTML=isDark
        ?'<span class="theme-toggle-icon">'+soleSvg+'</span> '+SC_T.temaChiaro
        :'<span class="theme-toggle-icon">'+lunaSvg+'</span> '+SC_T.temaScuro;
    }
    updThemeBtn();
    themeBtn.addEventListener('click',function(){
      isDark=!isDark;
      if(isDark){
        document.documentElement.removeAttribute('data-theme');
        lsSet('sctheme','dark');
        document.getElementById('metaThemeColor').content='#0d0b1a';
      } else {
        document.documentElement.setAttribute('data-theme','light');
        lsSet('sctheme','light');
        document.getElementById('metaThemeColor').content='#f5f0e8';
      }
      updThemeBtn();
      /* Chiudi menu mobile */
      var nl=document.querySelector('.nav-links');
      var nt=document.querySelector('.nav-toggle');
      if(nl && nl.classList.contains('open')){
        nl.classList.remove('open');
        nt.setAttribute('aria-expanded','false');
        nt.innerHTML='☰';
        nt.setAttribute('aria-label',SC_T.apriMenu);
      }
    });
  }

  /* EMAIL */
  var u='scuola-contattati',d='libero.it',em=u+'@'+d;
  var lnk='<a href="mailto:'+em+'" style="color:var(--text-muted)">'+em+'</a>';
  var ed=document.getElementById('email-display');
  var ef=document.getElementById('email-footer');
  if(ed)ed.innerHTML=lnk; if(ef)ef.innerHTML=lnk;

  /* HELPERS */
  var mesi=SC_T.mesi;
  var mesiL=SC_T.mesiL;
  function stato(d,m,y){var n=new Date(),s=new Date(y,m-1,d,9,0),e=new Date(y,m-1,d,13,30);if(n>=s&&n<=e)return 'in-corso';if(n>e)return 'passata';return 'futura';}
  function toggle(row,panel){var o=panel.classList.contains('open');document.querySelectorAll('.lesson-panel.open').forEach(function(p){p.classList.remove('open');var r=p.closest('.lesson-wrap').querySelector('.event-row');r.classList.remove('open');r.setAttribute('aria-expanded','false');});if(!o){panel.classList.add('open');row.classList.add('open');row.setAttribute('aria-expanded','true');}}
  function temiHTML(t){return '<ul class="lesson-topics">'+t.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  function panelHTML(l){return '<div class="lesson-panel"><div class="lesson-panel-inner"><p class="lesson-panel-title">'+l.titolo+(l.sottotitolo?'<br><span style="font-size:15px;font-weight:500;color:var(--gold-light);font-style:normal;">'+l.sottotitolo+'</span>':'')+'</p>'+(l.desc?'<p class="body-text-sm mb-1" style="border-left:2px solid var(--gold);padding-left:0.75rem;">'+l.desc+'</p>':'')+temiHTML(l.temi)+(l.citazione?'<div class="lesson-quote">'+l.citazione+'<cite>&mdash; '+l.autore+'</cite></div>':'')+'</div></div>';}

  /* PRESENTAZIONI & EVENTI — render da data/eventi.js (file unico IT+EN) */
  var presList=document.getElementById('presList');
  if(presList && window.SC_EVENTI){
    var presCount=document.getElementById('presCount');
    if(presCount) presCount.textContent=SC_EVENTI.length+' '+SC_T.presEventi;
    SC_EVENTI.forEach(function(ev){
      var txt=SC_EN?ev.en:ev.it;
      var card=document.createElement('div');
      card.className='evento-card';
      card.innerHTML='<div class="evento-data"><p class="evento-giorno">'+ev.day+'</p><p class="evento-mese">'+mesi[ev.month-1]+' '+ev.year+'</p></div><div class="evento-vline"></div><div class="flex-1"><p class="evento-titolo">'+txt.titolo+'</p><p class="evento-dettaglio">'+txt.dettaglio+'</p></div>';
      presList.appendChild(card);
    });
  }

  /* NAV MOBILE TOGGLE */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-label', isOpen ? SC_T.chiudiMenu : SC_T.apriMenu);
    });
  }

  /* PRESENTAZIONI PANEL TOGGLE */
  var presToggle = document.getElementById('pres-toggle');
  var presPanel = document.getElementById('pres-panel');
  if (presToggle && presPanel) {
    function togglePresPanel() {
      var wasOpen = presPanel.classList.contains('open');
      presPanel.classList.toggle('open');
      presToggle.classList.toggle('open');
      presToggle.setAttribute('aria-expanded', !wasOpen);
    }
    presToggle.addEventListener('click', togglePresPanel);
    presToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePresPanel();
      }
    });
  }

  /* VIDEO FACADE — swap CSS thumbnail with embedded YouTube iframe on user action */
  function activateVideoFacade(facade) {
    var videoId = facade.getAttribute('data-video-id');
    if (!videoId) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = SC_T.videoTitle;
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    facade.innerHTML = '';
    facade.appendChild(iframe);
    facade.style.cursor = 'default';
    facade.removeAttribute('role');
    facade.removeAttribute('tabindex');
    facade.removeAttribute('aria-label');
  }
  document.querySelectorAll('.video-facade').forEach(function(facade) {
    facade.addEventListener('click', function() { activateVideoFacade(facade); });
    facade.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateVideoFacade(facade);
      }
    });
  });

  /* ANNO 1 */
  var list1=document.getElementById('calendar-list');
  if(list1){
    var prossimaTrovata=false;
    L1.forEach(function(l){
      var st=stato(l.day,l.month,l.year);
      var isPr=st==='futura'&&!prossimaTrovata;
      if(st==='futura')prossimaTrovata=true;
      var bc,bt;
      if(st==='in-corso'){bc='badge badge-green';bt=SC_T.inCorso;}
      else if(st==='passata'){bc='badge badge-muted';bt=SC_T.conclusa;}
      else if(isPr){bc='badge badge-gold';bt=SC_T.iscriviti;}
      else{bc='badge badge-purple';bt=mesiL[l.month-1]+' '+l.year;}
      var sfx=st==='in-corso'?SC_T.inCorsoOra:isPr?SC_T.prossima:'';
      var w=document.createElement('div');w.className='lesson-wrap';
      w.innerHTML='<div class="event-row has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">'+SC_T.anno+' 1</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">'+SC_T.lezione+' '+toRoman(l.num)+sfx+'</p><p class="event-sub">'+l.titolo+'</p><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p></div><span class="'+bc+'">'+bt+'</span><span class="detail-pill">'+SC_T.temi+' ▾</span><span class="expand-arrow">▼</span></div>'+panelHTML(l);
      list1.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }

  function renderAnno(lista,listId,label){
    var el=document.getElementById(listId);if(!el)return;
    var prossimaTrovata=false;
    lista.forEach(function(l){
      var w=document.createElement('div');w.className='lesson-wrap';
      var hasDate=l.day&&l.month&&l.year;
      var st=hasDate?stato(l.day,l.month,l.year):null;
      var isPr=st==='futura'&&!prossimaTrovata;
      if(st==='futura')prossimaTrovata=true;
      var bc,bt;
      if(st==='in-corso'){bc='badge badge-green';bt=SC_T.inCorso;}
      else if(st==='passata'){bc='badge badge-muted';bt=SC_T.conclusa;}
      else if(isPr){bc='badge badge-gold';bt=SC_T.iscriviti;}
      else if(st==='futura'){bc='badge badge-purple';bt=mesiL[l.month-1]+' '+l.year;}
      else{bc='';bt='';}
      if(!l.titolo){
        var dataBadge=hasDate?'<span class="'+bc+'">'+bt+'</span>':'<span class="badge badge-muted">'+SC_T.inArrivo+'</span>';
        w.innerHTML='<div class="event-row" style="opacity:0.65;"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">'+label+'</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">'+SC_T.lezione+' '+toRoman(l.num)+'</p>'+(hasDate?'<p class="event-sub">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p>':'<p class="event-sub">'+SC_T.locandinaInArrivo+'</p>')+'</div>'+dataBadge+'</div>';
        el.appendChild(w);
        return;
      }
      var badgeHTML=hasDate?'<span class="'+bc+'">'+bt+'</span>':'';
      var sfx=st==='in-corso'?SC_T.inCorsoOra:isPr?SC_T.prossima:'';
      w.innerHTML='<div class="event-row has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">'+label+'</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">'+SC_T.lezione+' '+toRoman(l.num)+sfx+'</p><p class="event-sub">'+l.titolo+'</p>'+(hasDate?'<p style="font-size:13px;color:var(--text-muted);margin-top:2px;">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p>':'')+'</div>'+badgeHTML+'<span class="detail-pill">'+SC_T.temi+' ▾</span><span class="expand-arrow">▼</span></div>'+panelHTML(l);
      el.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }

  function renderEsp(lista,listId){
    var el=document.getElementById(listId);if(!el)return;
    lista.forEach(function(l){
      var w=document.createElement('div');w.className='lesson-wrap';
      w.innerHTML='<div class="event-row event-row-esp has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date event-date-esp"><p class="ev-num-esp">✦</p></div><div class="event-vline event-vline-esp"></div><div class="event-info"><p class="event-sub">'+l.titolo+'</p></div><span class="detail-pill detail-pill-esp">'+SC_T.temi+' ▾</span><span class="expand-arrow">▼</span></div>'+panelHTML(l);
      el.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }

  renderAnno(L2,'calendar-list-anno2',SC_T.anno+' 2');
  renderAnno(L3,'calendar-list-anno3',SC_T.anno+' 3');
  renderAnno(L4,'calendar-list-anno4',SC_T.anno+' 4');
  renderAnno(L5,'calendar-list-anno5',SC_T.anno+' 5');
  renderAnno(L6,'calendar-list-anno6',SC_T.anno+' 6');
  renderAnno(L7,'calendar-list-anno7',SC_T.anno+' 7');
  renderEsp(LESP,'calendar-list-esp');

  /* BANNER "PORTE APERTE" rimosso: il messaggio del contributo è stato elevato in un elemento .contributo visibile in cima alla sezione (una sola fonte, niente duplicazioni). */

  /* TAB ANNI — gestito inline in index.html (click + navigazione da tastiera WAI-ARIA) */

  /* CLOSE MOBILE MENU ON LINK CLICK */
  document.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click',function(){
      var nl=document.querySelector('.nav-links');
      var btn=document.querySelector('.nav-toggle');
      if(nl&&nl.classList.contains('open')){
        nl.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        btn.innerHTML='☰';
        btn.setAttribute('aria-label',SC_T.apriMenu);
      }
    });
  });

  /* BACK TO TOP */
  var btt=document.getElementById('backToTop');
  if(btt){
    /* Show after ~1 screen of scroll, hide below 0.8 screens — hysteresis to prevent flicker */
    var bttVisible=false;
    window.addEventListener('scroll',function(){
      var vh=window.innerHeight;
      var y=window.scrollY;
      if(!bttVisible && y > vh){
        bttVisible=true;
        btt.classList.add('visible');
      } else if(bttVisible && y < vh * 0.8){
        bttVisible=false;
        btt.classList.remove('visible');
      }
    },{passive:true});
    btt.addEventListener('click',function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  /* SCROLL REVEAL — gestito inline in index.html (observer .sr + .sr-stagger)
     per garantire visibilità del contenuto anche se app.js non carica */

  /* CONTACT FORM — AJAX submission with feedback */
  var cForm=document.getElementById('contact-form');
  if(cForm){
    var cBtn=document.getElementById('contact-submit');
    var cFb=document.getElementById('form-feedback');
    var cStart=Date.now(); /* anti-bot: track page load time */

    function showFeedback(kind,title,body){
      cFb.className='form-feedback visible '+kind;
      cFb.innerHTML='<strong>'+title+'</strong>'+body;
      /* Scroll the feedback into view smoothly if off-screen */
      var r=cFb.getBoundingClientRect();
      if(r.top<0||r.bottom>window.innerHeight){
        cFb.scrollIntoView({behavior:'smooth',block:'center'});
      }
    }

    cForm.addEventListener('submit',function(ev){
      ev.preventDefault();

      /* Client-side validation — browser's built-in checkValidity() */
      if(!cForm.checkValidity()){
        cForm.reportValidity();
        return;
      }

      /* Anti-bot: reject if form submitted in < 3 seconds (too fast for humans) */
      if(Date.now()-cStart<3000){
        showFeedback('error',SC_T.formAttendiTitolo,SC_T.formAttendiTesto);
        return;
      }

      /* Honeypot: if the hidden _gotcha field is filled, silently drop */
      var hp=document.getElementById('cf-website');
      if(hp&&hp.value){
        /* Fake success to not tip off the bot */
        showFeedback('success',SC_T.formInviatoTitolo,SC_T.formInviatoTesto);
        cForm.reset();
        return;
      }

      /* All checks passed — send via AJAX */
      cBtn.classList.add('is-loading');
      cBtn.disabled=true;
      cFb.classList.remove('visible');

      var data=new FormData(cForm);

      fetch(cForm.action,{
        method:'POST',
        body:data,
        headers:{'Accept':'application/json'}
      }).then(function(resp){
        cBtn.classList.remove('is-loading');
        cBtn.disabled=false;
        if(resp.ok){
          showFeedback('success',SC_T.formOkTitolo,SC_T.formOkTesto);
          cForm.reset();
          cStart=Date.now(); /* reset timer in case of second submission */
        } else {
          resp.json().then(function(json){
            var msg=(json&&json.errors&&json.errors.length)
              ? json.errors.map(function(e){return e.message;}).join(' ')
              : SC_T.formErroreTesto;
            showFeedback('error',SC_T.formErroreTitolo,msg);
          }).catch(function(){
            showFeedback('error',SC_T.formErroreTitolo,SC_T.formErroreTesto);
          });
        }
      }).catch(function(){
        cBtn.classList.remove('is-loading');
        cBtn.disabled=false;
        showFeedback('error',SC_T.formConnTitolo,SC_T.formConnTesto);
      });
    });
  }

});

/* ── GALLERY TOGGLE + LIGHTBOX ── */
(function(){
  /* Gallery toggle */
  var tog=document.getElementById('galleryToggle');
  var grid=document.getElementById('galleryGrid');
  if(tog&&grid){
    var expanded=false;
    tog.addEventListener('click',function(){
      expanded=!expanded;
      grid.classList.toggle('expanded',expanded);
      tog.textContent=expanded?SC_T.mostraMeno:SC_T.mostraTutte;
    });
  }

  /* Riflessioni toggle — stesso pattern della galleria */
  var rtog=document.getElementById('riflessioniToggle');
  var rlist=document.getElementById('riflessioniList');
  if(rtog&&rlist){
    var rExp=false;
    rtog.addEventListener('click',function(){
      rExp=!rExp;
      rlist.classList.toggle('expanded',rExp);
      rtog.textContent=rExp?SC_T.menoRiflessioni:SC_T.mostraRiflessioni;
    });
  }

  /* Lightbox — il markup storico è andato perso in un vecchio upload:
     se manca lo ricostruiamo qui, riusando le classi .lightbox-* già nel CSS */
  var lb=document.getElementById('lightbox');
  if(!lb && document.querySelector('.gallery-item')){
    lb=document.createElement('div');
    lb.id='lightbox';
    lb.className='lightbox-overlay';
    lb.innerHTML='<button class="lightbox-close" aria-label="'+SC_T.chiudi+'">\u00d7</button>'+
      '<button class="lightbox-nav lightbox-prev" aria-label="'+SC_T.fotoPrec+'">\u2039</button>'+
      '<img src="" alt=""/>'+
      '<button class="lightbox-nav lightbox-next" aria-label="'+SC_T.fotoSucc+'">\u203a</button>'+
      '<div class="lightbox-counter" aria-hidden="true"></div>';
    document.body.appendChild(lb);
  }
  if(!lb)return;
  var lbImg=lb.querySelector('img');
  var lbCounter=lb.querySelector('.lightbox-counter');
  var items=document.querySelectorAll('.gallery-item');
  var srcs=[];
  items.forEach(function(it){srcs.push(it.getAttribute('data-src'));});
  var cur=0;

  function show(i){
    cur=(i+srcs.length)%srcs.length;
    lbImg.src=srcs[cur];
    lbImg.alt=SC_T.foto+' '+(cur+1)+' '+SC_T.di+' '+srcs.length;
    lbCounter.textContent=(cur+1)+' / '+srcs.length;
  }

  /* Accessibilità: dialog + focus management */
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label',SC_T.foto);
  var lbClose=lb.querySelector('.lightbox-close');
  var lastFocus=null;
  function openAt(i,origin){
    lastFocus=origin||document.activeElement;
    show(i);
    lb.classList.add('active');
    document.body.style.overflow='hidden';
    if(lbClose)lbClose.focus();
  }

  items.forEach(function(it,i){
    /* da tastiera: i div diventano bottoni */
    it.setAttribute('tabindex','0');
    it.setAttribute('role','button');
    var im=it.querySelector('img');
    if(im&&im.alt)it.setAttribute('aria-label',im.alt);
    it.addEventListener('click',function(){openAt(i,it);});
    it.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openAt(i,it);}
    });
  });

  function close(){
    lb.classList.remove('active');
    document.body.style.overflow='';
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  lbClose.addEventListener('click',close);
  lb.querySelector('.lightbox-prev').addEventListener('click',function(e){e.stopPropagation();show(cur-1);});
  lb.querySelector('.lightbox-next').addEventListener('click',function(e){e.stopPropagation();show(cur+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('active'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(cur-1);
    if(e.key==='ArrowRight')show(cur+1);
    if(e.key==='Tab'){
      var f=lb.querySelectorAll('button');
      if(!f.length)return;
      var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      else if(!lb.contains(document.activeElement)){e.preventDefault();first.focus();}
    }
  });

  /* Touch/swipe in lightbox */
  var tx=0,moving=false;
  lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;moving=true;},{passive:true});
  lb.addEventListener('touchend',function(e){if(!moving)return;moving=false;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50){dx<0?show(cur+1):show(cur-1);}});
})();

/* ── SCROLL PROGRESS + SCROLL-SPY ── */
(function(){
  /* Progress bar */
  var bar = document.querySelector('.scroll-progress');
  if (bar) {
    var ticking = false;
    function updateProgress() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      var pct = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.setProperty('--scroll-pct', pct.toFixed(4));
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /* Scroll-spy: evidenzia la voce di menu della sezione corrente */
  if (!('IntersectionObserver' in window)) return;
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!navLinks.length) return;
  var linkById = {};
  navLinks.forEach(function(a){
    var id = a.getAttribute('href').slice(1);
    if (id) linkById[id] = a;
  });
  var watched = [];
  Object.keys(linkById).forEach(function(id){
    var el = document.getElementById(id);
    if (el) watched.push(el);
  });
  if (!watched.length) return;

  function setActive(id){
    navLinks.forEach(function(a){
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    });
    var a = linkById[id];
    if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); }
  }

  /* Banda di attivazione: linea invisibile al 30% dall'alto del viewport.
     La sezione che attraversa quella linea diventa "attiva". */
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-30% 0px -65% 0px', threshold: 0 });
  watched.forEach(function(s){ spy.observe(s); });
})();

/* ── SEMINAR ANNOUNCE DISMISS ── */
  // Seminar announcement dismiss
  (function(){
    var a=document.getElementById('seminarAnnounce');
    var c=document.getElementById('seminarAnnounceClose');
    if(a&&c){
      try{if(sessionStorage.getItem('seminarClosed')==='1'){a.style.display='none';}}catch(e){}
      c.addEventListener('click',function(){a.style.display='none';try{sessionStorage.setItem('seminarClosed','1');}catch(e){}});
    }
  })();

/* ── FLYER LIGHTBOX ── */
  (function(){
    var ov=document.getElementById('flyerLightbox');
    if(!ov && (document.getElementById('seminarFlyer')||document.getElementById('residenzialeFlyer'))){
      /* markup perso in un vecchio upload: lo ricostruiamo riusando .lightbox-overlay */
      ov=document.createElement('div');
      ov.id='flyerLightbox';
      ov.className='lightbox-overlay';
      ov.innerHTML='<button class="lightbox-close" id="flyerClose" aria-label="'+SC_T.chiudi+'">\u00d7</button><img id="flyerLightboxImg" src="" alt=""/>';
      document.body.appendChild(ov);
    }
    if(!ov)return;
    var img=document.getElementById('flyerLightboxImg');
    var cl=document.getElementById('flyerClose');
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-modal','true');
    var lastFocus=null;
    function open(src,origin){
      lastFocus=origin||document.activeElement;
      img.src=src;ov.classList.add('active');document.body.style.overflow='hidden';
      if(cl)cl.focus();
    }
    function close(){
      ov.classList.remove('active');document.body.style.overflow='';
      if(lastFocus&&lastFocus.focus)lastFocus.focus();
    }
    ['seminarFlyer','residenzialeFlyer'].forEach(function(id){
      var fl=document.getElementById(id);
      if(!fl)return;
      /* le locandine diventano attivabili da tastiera */
      fl.setAttribute('tabindex','0');
      fl.setAttribute('role','button');
      if(fl.title)fl.setAttribute('aria-label',fl.title);
      fl.addEventListener('click',function(){open(fl.src,fl);});
      fl.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();open(fl.src,fl);}
      });
    });
    cl.addEventListener('click',close);
    ov.addEventListener('click',function(e){if(e.target===ov)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('active'))close();});
  })();

/* ── SERVICE WORKER — cache offline per pagine e giochi visitati ── */
(function(){
  if(!('serviceWorker' in navigator))return;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  });
})();

/* ── HASH RE-SCROLL ──
   Quando si arriva da link esterno con #ancora (es. #giochi da Facebook),
   il browser scrolla prima che il JS popoli i contenuti dinamici sopra
   (oracolo citazioni, carosello), spostando la sezione dopo lo scroll.
   Ri-scrolliamo all'ancora a caricamento completo. */
(function(){
  if(!location.hash) return;
  var id = location.hash.slice(1);
  function rescroll(){
    var el = document.getElementById(id);
    if(el) el.scrollIntoView();
  }
  window.addEventListener('load', function(){
    setTimeout(rescroll, 150);
  });
})();
