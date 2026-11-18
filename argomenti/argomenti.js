/* ARGOMENTI DELLE LEZIONI — indice alfabetico e ricerca, costruiti da
   lezioni.js: niente scritto a mano, un tema aggiunto a una lezione compare
   qui da solo. Un tema presente in più lezioni è una voce sola con più
   rimandi. La ricerca ignora maiuscole e accenti e vuole tutte le parole
   scritte («spirito santo» trova «7 Doni dello Spirito Santo»). */
(function(){
  if(typeof L1==='undefined')return;
  var EN=document.documentElement.lang==='en';
  var T=EN?{
    anno:function(n){return 'Year '+n;}, lez:'lesson', esp:'Experiential seminars',
    voci:function(n){return n+' topics';},
    trovati:function(n,q){return n===1?'1 topic for «'+q+'»':n+' topics for «'+q+'»';},
    nessuno:function(q){return 'No topic contains «'+q+'».';},
    inProgramma:'upcoming', anche:'Also mentioned in the description of these lessons',
    mesi:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    home:'../../index.html'
  }:{
    anno:function(n){return n+'° Anno';}, lez:'lezione', esp:'Seminari esperienziali',
    voci:function(n){return n+' argomenti';},
    trovati:function(n,q){return n===1?'1 argomento per «'+q+'»':n+' argomenti per «'+q+'»';},
    nessuno:function(q){return 'Nessun tema contiene «'+q+'».';},
    inProgramma:'in programma', anche:'Se ne parla anche nella descrizione di queste lezioni',
    mesi:['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'],
    home:'../index.html'
  };
  function loc(l){ return EN&&l.en?l.en:l; }
  function piano(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’‘]/g,"'").toLowerCase(); }
  /* una parola cercata vale solo a inizio di parola: «ego» non deve trovare «legge» */
  function inizioParola(p,i){ return i===0||!/[a-z0-9]/.test(p.charAt(i-1)); }
  function posizioni(p,w){
    var out=[],i=0;
    while((i=p.indexOf(w,i))>=0){ if(inizioParola(p,i))out.push(i); i++; }
    return out;
  }
  function contiene(p,w){ return posizioni(p,w).length>0; }
  function esc(s){ return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  /* Chiave d'ordine: senza articolo iniziale e senza il numero che lo segue
     («I 3 Veleni» sta alla V). Le leggi restano tutte alla L, ordinate per
     il loro nome: «Legge del Ritmo» dopo «Legge di Precedenza». */
  var ART=EN?/^(the|a|an)\s+/:/^(il|lo|la|i|gli|le|un|una|uno)\s+|^(l|un)'\s*/;
  var LEGGE=EN?/^laws?\s+(of\s+(the\s+)?)?/:/^legg[ei]\s+((del|della|dello|delle|dei|degli|di|d)\b'?\s*|dell'\s*)?/;
  function chiave(t){
    var k=piano(t).replace(/^[«"'(\s]+/,'').replace(ART,'').replace(/^\d+\s+/,'');
    var m=k.match(LEGGE);
    if(m)k=(EN?'law ':'legge ')+k.slice(m[0].length);
    return k;
  }

  var oggi=new Date();oggi.setHours(0,0,0,0);
  var lezioni=[];
  [L1,L2,L3,L4,L5,L6,L7].forEach(function(a,i){
    a.forEach(function(l){ if(l.titolo) lezioni.push({l:l,anno:i+1}); });
  });
  if(typeof LESP!=='undefined') LESP.forEach(function(l){ lezioni.push({l:l,anno:'esp'}); });

  var voci={}, elenco=[];
  lezioni.forEach(function(x){
    (loc(x.l).temi||[]).forEach(function(t){
      t=t.trim(); var id=piano(t);
      if(!voci[id]){ voci[id]={t:t,k:chiave(t),p:id,rif:[]}; elenco.push(voci[id]); }
      if(voci[id].rif.indexOf(x)<0) voci[id].rif.push(x);
    });
  });
  elenco.sort(function(a,b){ return a.k.localeCompare(b.k,EN?'en':'it',{numeric:true,sensitivity:'base'}); });
  elenco.forEach(function(v){ var c=v.k.charAt(0).toUpperCase(); v.lettera=/[A-Z]/.test(c)?c:'#'; });

  function rimando(x){
    var l=x.l, a=document.createElement('a');
    a.className='arg-rif';
    a.href=T.home+'#anno-'+x.anno;
    var dove=x.anno==='esp'?T.esp:T.anno(x.anno)+', '+T.lez+' '+l.num;
    var futura=l.day&&new Date(l.year,l.month-1,l.day)>oggi;
    a.innerHTML='<span class="arg-dove">'+esc(dove)+(futura?' · '+l.day+' '+T.mesi[l.month-1]+' '+l.year:'')+'</span>'
      +'<span class="arg-titolo">'+esc(loc(l).titolo)+'</span>';
    return a;
  }

  function evidenzia(t,parole){
    if(!parole.length)return esc(t);
    /* le posizioni si cercano nel testo senza accenti, che ha la stessa
       lunghezza dell'originale per le lettere latine */
    var p=piano(t), segni=new Array(t.length).fill(false);
    parole.forEach(function(w){
      posizioni(p,w).forEach(function(i){ for(var j=i;j<i+w.length;j++)segni[j]=true; });
    });
    var out='',dentro=false;
    for(var i=0;i<t.length;i++){
      if(segni[i]&&!dentro){out+='<mark>';dentro=true;}
      if(!segni[i]&&dentro){out+='</mark>';dentro=false;}
      out+=esc(t[i]);
    }
    return out+(dentro?'</mark>':'');
  }

  var lista=document.getElementById('arg-lista'), lettere=document.getElementById('arg-lettere');
  var conto=document.getElementById('arg-conto'), descBox=document.getElementById('arg-desc');
  var q=document.getElementById('arg-q');

  function mostra(testo){
    var parole=piano(testo).split(/\s+/).filter(Boolean);
    var trovate=parole.length?elenco.filter(function(v){ return parole.every(function(w){return contiene(v.p,w);}); }):elenco;
    var frag=document.createDocumentFragment(), corrente=null, ul=null, presenti={};
    trovate.forEach(function(v){
      if(v.lettera!==corrente){
        corrente=v.lettera; presenti[corrente]=true;
        var h=document.createElement('h2'); h.className='arg-gruppo'; h.id='lettera-'+(corrente==='#'?'num':corrente);
        h.textContent=corrente; frag.appendChild(h);
        ul=document.createElement('ul'); ul.className='arg-voci'; frag.appendChild(ul);
      }
      var li=document.createElement('li');
      li.innerHTML='<span class="arg-tema">'+evidenzia(v.t,parole)+'</span>';
      var r=document.createElement('span'); r.className='arg-rifs';
      v.rif.forEach(function(x){ r.appendChild(rimando(x)); });
      li.appendChild(r); ul.appendChild(li);
    });
    lista.innerHTML=''; lista.appendChild(frag);

    /* Barra delle lettere: solo senza ricerca, perché con pochi risultati
       non serve e le lettere vuote confondono */
    lettere.hidden=!!parole.length;
    if(!parole.length&&!lettere.childNodes.length){
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c){
        var el;
        if(presenti[c]){ el=document.createElement('a'); el.href='#lettera-'+c; }
        else { el=document.createElement('span'); el.setAttribute('aria-hidden','true'); }
        el.textContent=c; lettere.appendChild(el);
      });
    }

    conto.textContent=parole.length?(trovate.length?T.trovati(trovate.length,testo.trim()):T.nessuno(testo.trim())):T.voci(elenco.length);

    /* Lezioni che ne parlano nella descrizione o nel titolo, senza averlo
       fra i temi: un secondo elenco, più breve */
    descBox.innerHTML=''; descBox.hidden=true;
    if(parole.length){
      var gia=[]; trovate.forEach(function(v){ gia=gia.concat(v.rif); });
      var altre=lezioni.filter(function(x){
        if(gia.indexOf(x)>=0)return false;
        var L=loc(x.l), s=piano((L.titolo||'')+' '+(L.sottotitolo||'')+' '+(L.desc||'').replace(/<[^>]+>/g,''));
        return parole.every(function(w){return contiene(s,w);});
      });
      if(altre.length){
        var h=document.createElement('h2'); h.className='arg-gruppo arg-gruppo-desc'; h.textContent=T.anche;
        var u=document.createElement('ul'); u.className='arg-voci';
        altre.forEach(function(x){ var li=document.createElement('li'); li.appendChild(rimando(x)); u.appendChild(li); });
        descBox.appendChild(h); descBox.appendChild(u); descBox.hidden=false;
      }
    }
  }

  /* ?q=spirito+santo nell'URL: la ricerca si può mandare a qualcuno */
  var iniziale='';
  try{ iniziale=new URLSearchParams(location.search).get('q')||''; }catch(e){}
  q.value=iniziale;
  mostra(iniziale);
  var timer;
  q.addEventListener('input',function(){
    clearTimeout(timer);
    timer=setTimeout(function(){
      mostra(q.value);
      try{
        var u=new URL(location.href);
        if(q.value.trim())u.searchParams.set('q',q.value.trim()); else u.searchParams.delete('q');
        history.replaceState(history.state,'',u.pathname+u.search);
      }catch(e){}
    },120);
  });
})();
