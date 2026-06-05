/* ═══════════════════════════════════════════════════
   Scuola ContattaTi — app.js (English version)
   All page scripts in a single cacheable file.
   Loaded with defer: executes after HTML parsing.
   ═══════════════════════════════════════════════════ */

/* ── COOKIE BANNER (GDPR / ePrivacy) ── */
(function(){
  var KEY = 'sc-cookie';
  var banner = document.getElementById('cookie-banner');
  var choice = localStorage.getItem(KEY);
  if(!choice){ banner.hidden = false; }

  // Cross-page: if the user comes from privacy.html after removing sc-cookie,
  // the banner may not appear immediately (race condition with scroll restore).
  // Recheck after complete load.
  window.addEventListener('load', function(){
    if(!localStorage.getItem(KEY) && banner.hidden){ banner.hidden = false; }
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
    localStorage.setItem(KEY, 'accept');
    banner.hidden = true;
    loadGA();
  });
  document.getElementById('cookieReject').addEventListener('click', function(){
    localStorage.setItem(KEY, 'reject');
    banner.hidden = true;
    window['ga-disable-G-2NTMVVV5GB'] = true;
  });

  // "Manage cookies" link in footer — reopens the banner
  var manage = document.getElementById('manageCookies');
  if(manage){
    manage.addEventListener('click', function(e){
      e.preventDefault();
      banner.hidden = false;
    });
  }
  // Global API to reopen the banner from other pages (e.g. privacy.html)
  window.scOpenCookieBanner = function(){ banner.hidden = false; };
})();

/* ── MAIN APP (DOMContentLoaded) ── */
document.addEventListener('DOMContentLoaded', function() {

  /* Convert number to Roman numeral */
  function toRoman(n){var v=[1,4,5,9,10,40,50,90,100,400,500,900,1000],s=['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M'],r='';for(var i=v.length-1;i>=0;i--){while(n>=v[i]){r+=s[i];n-=v[i];}}return r;}

  /* THEME TOGGLE */
  var themeBtn=document.getElementById('themeToggle');
  if(themeBtn){
    var isDark=document.documentElement.getAttribute('data-theme')!=='light';
    function updThemeBtn(){
      var soleSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>';
      var lunaSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>';
      themeBtn.innerHTML=isDark
        ?'<span class="theme-toggle-icon">'+soleSvg+'</span> Light theme'
        :'<span class="theme-toggle-icon">'+lunaSvg+'</span> Dark theme';
    }
    updThemeBtn();
    themeBtn.addEventListener('click',function(){
      isDark=!isDark;
      if(isDark){
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('sctheme','dark');
        document.getElementById('metaThemeColor').content='#0d0b1a';
      } else {
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('sctheme','light');
        document.getElementById('metaThemeColor').content='#f5f0e8';
      }
      updThemeBtn();
      /* Close mobile menu */
      var nl=document.querySelector('.nav-links');
      var nt=document.querySelector('.nav-toggle');
      if(nl && nl.classList.contains('open')){
        nl.classList.remove('open');
        nt.setAttribute('aria-expanded','false');
        nt.innerHTML='\u2630';
        nt.setAttribute('aria-label','Open menu');
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
  var mesi=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var mesiL=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function stato(d,m,y){var n=new Date(),s=new Date(y,m-1,d,9,0),e=new Date(y,m-1,d,13,30);if(n>=s&&n<=e)return 'in-corso';if(n>e)return 'passata';return 'futura';}
  function toggle(row,panel){var o=panel.classList.contains('open');document.querySelectorAll('.lesson-panel.open').forEach(function(p){p.classList.remove('open');var r=p.closest('.lesson-wrap').querySelector('.event-row');r.classList.remove('open');r.setAttribute('aria-expanded','false');});if(!o){panel.classList.add('open');row.classList.add('open');row.setAttribute('aria-expanded','true');}}
  function temiHTML(t){return '<ul class="lesson-topics">'+t.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  function panelHTML(l){return '<div class="lesson-panel"><div class="lesson-panel-inner"><p class="lesson-panel-title">'+l.titolo+(l.sottotitolo?'<br><span style="font-size:15px;font-weight:500;color:var(--gold-light);font-style:normal;">'+l.sottotitolo+'</span>':'')+'</p>'+(l.desc?'<p class="body-text-sm mb-1" style="border-left:2px solid var(--gold);padding-left:0.75rem;">'+l.desc+'</p>':'')+temiHTML(l.temi)+(l.citazione?'<div class="lesson-quote">'+l.citazione+'<cite>&mdash; '+l.autore+'</cite></div>':'')+'</div></div>';}

  /* NAV MOBILE TOGGLE */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? '\u2715' : '\u2630';
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
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
    iframe.title = 'Introductory video of the Scuola ContattaTi';
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
      if(st==='in-corso'){bc='badge badge-green';bt='&#9679; In progress';}
      else if(st==='passata'){bc='badge badge-muted';bt='Completed';}
      else if(isPr){bc='badge badge-gold';bt='Enrol';}
      else{bc='badge badge-purple';bt=mesiL[l.month-1]+' '+l.year;}
      var sfx=st==='in-corso'?' — In progress now':isPr?' \u2736 Next':'';
      var w=document.createElement('div');w.className='lesson-wrap';
      w.innerHTML='<div class="event-row has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">Year 1</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">Lesson '+toRoman(l.num)+sfx+'</p><p class="event-sub">'+l.titolo+'</p><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p></div><span class="'+bc+'">'+bt+'</span><span class="detail-pill">Topics \u25be</span><span class="expand-arrow">\u25bc</span></div>'+panelHTML(l);
      list1.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }

  /* ANNO 2 */

  /* ANNO 3 */

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
      if(st==='in-corso'){bc='badge badge-green';bt='&#9679; In progress';}
      else if(st==='passata'){bc='badge badge-muted';bt='Completed';}
      else if(isPr){bc='badge badge-gold';bt='Enrol';}
      else if(st==='futura'){bc='badge badge-purple';bt=mesiL[l.month-1]+' '+l.year;}
      else{bc='';bt='';}
      if(!l.titolo){
        var dataBadge=hasDate?'<span class="'+bc+'">'+bt+'</span>':'<span class="badge badge-muted">Coming soon</span>';
        w.innerHTML='<div class="event-row" style="opacity:0.65;"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">'+label+'</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">Lesson '+toRoman(l.num)+'</p>'+(hasDate?'<p class="event-sub">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p>':'<p class="event-sub">Details coming soon</p>')+'</div>'+dataBadge+'</div>';
        el.appendChild(w);
        return;
      }
      var badgeHTML=hasDate?'<span class="'+bc+'">'+bt+'</span>':'';
      var sfx=st==='in-corso'?' — In progress now':isPr?' \u2736 Next':'';
      w.innerHTML='<div class="event-row has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date"><p class="event-day ev-num">'+toRoman(l.num)+'</p><p class="event-month">'+label+'</p></div><div class="event-vline"></div><div class="event-info"><p class="event-title">Lesson '+toRoman(l.num)+sfx+'</p><p class="event-sub">'+l.titolo+'</p>'+(hasDate?'<p style="font-size:13px;color:var(--text-muted);margin-top:2px;">'+l.day+' '+mesiL[l.month-1]+' '+l.year+'</p>':'')+'</div>'+badgeHTML+'<span class="detail-pill">Topics \u25be</span><span class="expand-arrow">\u25bc</span></div>'+panelHTML(l);
      el.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }
  /* ANNO 4 */

  /* ANNO 5 */
  renderAnno(L5,'calendar-list-anno5','Year 5');

  /* ANNO 6 */

  function renderEsp(lista,listId){
    var el=document.getElementById(listId);if(!el)return;
    lista.forEach(function(l){

      var w=document.createElement('div');w.className='lesson-wrap';
      w.innerHTML='<div class="event-row event-row-esp has-detail" role="button" tabindex="0" aria-expanded="false"><div class="event-date event-date-esp"><p class="ev-num-esp">✦</p></div><div class="event-vline event-vline-esp"></div><div class="event-info"><p class="event-sub">'+l.titolo+'</p></div><span class="detail-pill detail-pill-esp">Topics \u25be</span><span class="expand-arrow">\u25bc</span></div>'+panelHTML(l);
      el.appendChild(w);
      var row=w.querySelector('.event-row'),panel=w.querySelector('.lesson-panel');
      row.addEventListener('click',function(){toggle(row,panel);});
      row.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(row,panel);}});
    });
  }
  renderEsp(LESP,'calendar-list-esp');

  /* ANNO 7 */
  renderAnno(L7,'calendar-list-anno7','Year 7');

  renderAnno(L6,'calendar-list-anno6','Year 6');

  renderAnno(L4,'calendar-list-anno4','Year 4');
  renderAnno(L2,'calendar-list-anno2','Year 2');
  renderAnno(L3,'calendar-list-anno3','Year 3');

  /* "OPEN DOORS" BANNER removed: the contribution message has been elevated into a visible .contributo element at the top of the section (single source, no duplication). */

  /* TAB ANNI */
  document.querySelectorAll('.anno-tab').forEach(function(tab){
    if(tab.classList.contains('disabled'))return;
    tab.addEventListener('click',function(){
      document.querySelectorAll('.anno-tab').forEach(function(t){t.classList.remove('active');t.setAttribute('aria-selected','false');});
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      document.querySelectorAll('.anno-panel').forEach(function(p){p.style.display='none';});
      var p=document.getElementById('panel-anno-'+tab.dataset.anno);
      if(p)p.style.display='block';
    });
  });

  /* CAROSELLO */
  var track=document.getElementById('quotesTrack');
  if(track){
    var slides=track.querySelectorAll('.quote-slide'),cur=0,timer;
    /* Accessibility: label each slide */
    slides.forEach(function(s,i){
      s.setAttribute('role','group');
      s.setAttribute('aria-roledescription','Slide');
      s.setAttribute('aria-label','Quote '+(i+1)+' of '+slides.length);
    });
    var counter=document.getElementById('carouselCounter');
    function updCounter(){if(counter)counter.textContent=(cur+1)+' / '+slides.length;}
    function readTime(n){var el=slides[n].querySelector('.quote-slide-text');var words=(el?el.textContent:'').trim().split(/\s+/).length;return Math.max(6000,words*400);}
    function goTo(n){cur=(n+slides.length)%slides.length;track.style.transform='translateX(-'+(cur*100)+'%)';updCounter();clearInterval(timer);timer=setTimeout(function(){goTo(cur+1);},readTime(cur));}
    document.getElementById('prevBtn').addEventListener('click',function(){goTo(cur-1);});
    document.getElementById('nextBtn').addEventListener('click',function(){goTo(cur+1);});
    /* Touch/swipe support */
    var tx=0,moving=false;
    track.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;moving=true;},{passive:true});
    track.addEventListener('touchmove',function(e){e.preventDefault();},{passive:false});
    track.addEventListener('touchend',function(e){if(!moving)return;moving=false;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40){dx<0?goTo(cur+1):goTo(cur-1);}});
    timer=setTimeout(function(){goTo(cur+1);},readTime(cur));
    updCounter();
  }

  /* CLOSE MOBILE MENU ON LINK CLICK */
  document.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click',function(){
      var nl=document.querySelector('.nav-links');
      var btn=document.querySelector('.nav-toggle');
      if(nl&&nl.classList.contains('open')){
        nl.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        btn.innerHTML='☰';
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

  /* SCROLL REVEAL */
  var srEls=document.querySelectorAll('.sr');
  if(srEls.length&&'IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    srEls.forEach(function(el){obs.observe(el);});
  } else {
    srEls.forEach(function(el){el.classList.add('visible');});
  }

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
        showFeedback('error','Please wait','The form was submitted too quickly. Please try again in a few seconds.');
        return;
      }

      /* Honeypot: if the hidden _gotcha field is filled, silently drop */
      var hp=document.getElementById('cf-website');
      if(hp&&hp.value){
        /* Fake success to not tip off the bot */
        showFeedback('success','Message sent','Thank you, we will reply soon.');
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
          showFeedback('success','✓ Message sent','Thank you! We have received your message and will reply as soon as possible.');
          cForm.reset();
          cStart=Date.now(); /* reset timer in case of second submission */
        } else {
          resp.json().then(function(json){
            var msg=(json&&json.errors&&json.errors.length)
              ? json.errors.map(function(e){return e.message;}).join(' ')
              : 'Something went wrong. Please try writing to us directly via WhatsApp or email.';
            showFeedback('error','Sending error',msg);
          }).catch(function(){
            showFeedback('error','Sending error','Something went wrong. Please try writing to us directly via WhatsApp or email.');
          });
        }
      }).catch(function(){
        cBtn.classList.remove('is-loading');
        cBtn.disabled=false;
        showFeedback('error','Connection error','Unable to send the message. Check your connection and try again, or write to us directly via WhatsApp.');
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
      tog.textContent=expanded?'Show fewer \u25b4':'Show all photos \u25be';
    });
  }

  /* Lightbox */
  var lb=document.getElementById('lightbox');
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
    lbImg.alt='Photo '+(cur+1)+' of '+srcs.length;
    lbCounter.textContent=(cur+1)+' / '+srcs.length;
  }

  items.forEach(function(it,i){
    it.addEventListener('click',function(){
      show(i);
      lb.classList.add('active');
      document.body.style.overflow='hidden';
    });
  });

  function close(){lb.classList.remove('active');document.body.style.overflow='';}
  lb.querySelector('.lightbox-close').addEventListener('click',close);
  lb.querySelector('.lightbox-prev').addEventListener('click',function(e){e.stopPropagation();show(cur-1);});
  lb.querySelector('.lightbox-next').addEventListener('click',function(e){e.stopPropagation();show(cur+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('active'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(cur-1);
    if(e.key==='ArrowRight')show(cur+1);
  });

  /* Touch/swipe in lightbox */
  var tx=0,moving=false;
  lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;moving=true;},{passive:true});
  lb.addEventListener('touchend',function(e){if(!moving)return;moving=false;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50){dx<0?show(cur+1):show(cur-1);}});
})();

/* ── SCROLL PROGRESS + SCROLL-SPY ── */
/* SCROLL PROGRESS + SCROLL-SPY */
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

  /* Scroll-spy: highlights the menu item of the current section */
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

  /* Activation band: invisible line at 30% from the top of the viewport.
     The section crossing that line becomes "active". */
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
      if(sessionStorage.getItem('seminarClosed')==='1'){a.style.display='none';}
      c.addEventListener('click',function(){a.style.display='none';try{sessionStorage.setItem('seminarClosed','1');}catch(e){}});
    }
  })();
</script>

/* ── FLYER LIGHTBOX ── */
  (function(){
    var ov=document.getElementById('flyerLightbox');
    if(!ov)return;
    var img=document.getElementById('flyerLightboxImg');
    var cl=document.getElementById('flyerClose');
    function open(src){img.src=src;ov.classList.add('active');document.body.style.overflow='hidden';}
    function close(){ov.classList.remove('active');document.body.style.overflow='';}
    ['seminarFlyer','residenzialeFlyer'].forEach(function(id){
      var fl=document.getElementById(id);
      if(fl)fl.addEventListener('click',function(){open(fl.src);});
    });
    cl.addEventListener('click',close);
    ov.addEventListener('click',function(e){if(e.target===ov)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('active'))close();});
  })();
