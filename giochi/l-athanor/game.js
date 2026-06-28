(function(){
'use strict';
var D=window.ATHANOR_DATA, I=window.ATHANOR_I18N, C;
var LS_KEY='sc-athanor-state';

var CW=376, CH=667;
var CELL=44, COLS=8, ROWS=12;
var GW=COLS*CELL, GH=ROWS*CELL;
var GX=12, GY=76;

var COL={
  BG:0x0d0b1a, SURFACE:0x16132a, PATH:0x1e1a35,
  GRID:0x2a2545, GOLD:0xc9973a, GOLD_L:0xe8c97a,
  TEXT:0xe8e0f0, MUTED:0xc4b8d0, DANGER:0xd8554f
};

function cc(c,r){return{x:GX+c*CELL+CELL/2,y:GY+r*CELL+CELL/2};}
function p2c(x,y){
  var c=Math.floor((x-GX)/CELL),r=Math.floor((y-GY)/CELL);
  return(c>=0&&c<COLS&&r>=0&&r<ROWS)?{col:c,row:r}:null;
}
function dst(a,b){var dx=a.x-b.x,dy=a.y-b.y;return Math.sqrt(dx*dx+dy*dy);}
function ck(c,r){return c+','+r;}

function buildPathCells(wp){
  var m={};
  for(var i=0;i<wp.length-1;i++){
    var a=wp[i],b=wp[i+1];
    if(a[0]===b[0]){
      var mn=Math.max(0,Math.min(a[1],b[1])),mx=Math.min(ROWS-1,Math.max(a[1],b[1]));
      for(var r=mn;r<=mx;r++) m[ck(a[0],r)]=true;
    }else{
      var cm=Math.min(a[0],b[0]),cx=Math.max(a[0],b[0]);
      var row=Math.max(0,Math.min(ROWS-1,a[1]));
      for(var c=cm;c<=cx;c++) m[ck(c,row)]=true;
    }
  }
  return m;
}

function buildPixelPath(wp){
  var pts=[];
  for(var i=0;i<wp.length;i++) pts.push(cc(wp[i][0],wp[i][1]));
  return pts;
}

function pathLen(pp){
  var t=0;
  for(var i=0;i<pp.length-1;i++) t+=dst(pp[i],pp[i+1]);
  return t;
}

function pathPos(pp,prog){
  var tr=0;
  for(var i=0;i<pp.length-1;i++){
    var s=dst(pp[i],pp[i+1]);
    if(tr+s>=prog){
      var t=(prog-tr)/s;
      return{x:pp[i].x+(pp[i+1].x-pp[i].x)*t,y:pp[i].y+(pp[i+1].y-pp[i].y)*t,done:false};
    }
    tr+=s;
  }
  var last=pp[pp.length-1];
  return{x:last.x,y:last.y,done:true};
}

function saveState(data){try{localStorage.setItem(LS_KEY,JSON.stringify(data));}catch(e){}}
function loadState(){try{var s=localStorage.getItem(LS_KEY);return s?JSON.parse(s):null;}catch(e){return null;}}

/* ================================================================
   MENU SCENE
   ================================================================ */
class MenuScene extends Phaser.Scene{
  constructor(){super('menu');}

  create(){
    var self=this;
    this.cameras.main.setBackgroundColor(COL.BG);
    var cx=CW/2,cy=CH/2-30;

    var halo=this.add.graphics();
    halo.fillStyle(0xc9973a,0.05);halo.fillCircle(cx,cy-40,160);
    halo.fillStyle(0x7b5ea7,0.03);halo.fillCircle(cx,cy-40,220);

    this.add.text(cx,cy-110,'⚗',{fontSize:'52px',color:'#e8c97a'}).setOrigin(0.5);

    this.titleT=this.add.text(cx,cy-50,"L'Athanor",{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'40px',fontStyle:'bold',color:'#e8c97a'
    }).setOrigin(0.5);

    this.subT=this.add.text(cx,cy+5,'',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'15px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',wordWrap:{width:300}
    }).setOrigin(0.5);

    var q=D.quotes[0];
    this.epiT=this.add.text(cx,cy+65,'',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'13.5px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',wordWrap:{width:280},lineSpacing:6
    }).setOrigin(0.5);
    this.epiA=this.add.text(cx,cy+120,'— '+q.author,{
      fontFamily:'Inter,sans-serif',fontSize:'11px',color:'#c9973a'
    }).setOrigin(0.5);

    this.startBtnBg=this.add.graphics();
    this.startBtnBg.fillStyle(COL.GOLD,1);
    this.startBtnBg.fillRoundedRect(cx-90,cy+165,180,44,22);
    this.startBtnT=this.add.text(cx,cy+187,'',{
      fontFamily:'Inter,sans-serif',fontSize:'14px',fontStyle:'bold',color:'#1a1000'
    }).setOrigin(0.5);
    this.add.zone(cx,cy+187,180,44).setInteractive()
      .on('pointerdown',function(){self.scene.start('game',{level:0});});

    this.updateTexts();
    this.cameras.main.fadeIn(400);
  }

  updateTexts(){
    var l=C.getLang(),q=D.quotes[0];
    this.subT.setText(l==='en'?'An alchemic tower defense\nTransmute negative emotions':'Un tower defense alchemico\nTrasmuta le emozioni negative');
    this.epiT.setText('“'+(l==='en'?q.en:q.it)+'”');
    this.startBtnT.setText(l==='en'?'BEGIN':'INIZIA');
  }
}

/* ================================================================
   GAME SCENE
   ================================================================ */
class GameScene extends Phaser.Scene{
  constructor(){super('game');}

  init(data){
    this.lvIdx=data.level||0;
    this.lv=D.levels[this.lvIdx];
    this.gold=this.lv.startGold;
    this.consc=this.lv.consciousness;
    this.maxConsc=this.lv.consciousness;
    this.curWave=0;
    this.waveActive=false;
    this.towers=[];
    this.enemies=[];
    this.towerMap={};
    this.pathCells=buildPathCells(this.lv.path);
    this.pp=buildPixelPath(this.lv.path);
    this.totalLen=pathLen(this.pp);
    this.spawnQ=[];
    this.spawnIdx=0;
    this.waveStart=0;
    this.allDone=false;
    this.over=false;
    this.popup=null;
    this.introUp=true;
  }

  create(){
    this.cameras.main.setBackgroundColor(COL.BG);
    this.drawGrid();
    this.drawPathLine();
    this.drawGoal();
    this.drawEntry();
    this.createHUD();
    this.createWaveBtn();
    this.setupInput();
    this.showIntro();
  }

  /* ── Grid ── */
  drawGrid(){
    var g=this.add.graphics();
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
      var x=GX+c*CELL,y=GY+r*CELL,isP=!!this.pathCells[ck(c,r)];
      g.fillStyle(isP?COL.PATH:COL.SURFACE,isP?0.55:0.25);
      g.fillRect(x+1,y+1,CELL-2,CELL-2);
      if(!isP){g.lineStyle(0.5,COL.GRID,0.12);g.strokeRect(x+1,y+1,CELL-2,CELL-2);}
    }
  }

  drawPathLine(){
    var g=this.add.graphics();
    g.lineStyle(2,COL.GOLD,0.1);
    g.beginPath();g.moveTo(this.pp[0].x,this.pp[0].y);
    for(var i=1;i<this.pp.length;i++) g.lineTo(this.pp[i].x,this.pp[i].y);
    g.strokePath();
  }

  drawGoal(){
    var p=this.pp[this.pp.length-1];
    var g=this.add.graphics();
    g.fillStyle(COL.GOLD,0.12);g.fillCircle(p.x,p.y,CELL*0.8);
    g.fillStyle(COL.GOLD,0.22);g.fillCircle(p.x,p.y,CELL*0.5);
    g.fillStyle(COL.GOLD,0.35);g.fillCircle(p.x,p.y,CELL*0.25);
    this.tweens.add({targets:g,alpha:{from:0.6,to:1},duration:1400,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    this.goalLabel=this.add.text(p.x,p.y-CELL*0.55,'',{
      fontFamily:'Inter,sans-serif',fontSize:'8px',color:'#c9973a',letterSpacing:1
    }).setOrigin(0.5);
    this.goalLabel.setText(C.getLang()==='en'?'CENTER':'CENTRO');
  }

  drawEntry(){
    var p=this.pp[0];
    var g=this.add.graphics();
    g.fillStyle(COL.DANGER,0.35);
    g.fillTriangle(p.x-6,p.y-CELL/2-2,p.x+6,p.y-CELL/2-2,p.x,p.y-CELL/2+6);
  }

  /* ── HUD ── */
  createHUD(){
    this.goldIco=this.add.text(14,12,'⬡',{fontSize:'17px',color:'#e8c97a'});
    this.goldT=this.add.text(34,13,''+this.gold,{
      fontFamily:'Inter,sans-serif',fontSize:'15px',fontStyle:'bold',color:'#e8c97a'});
    this.lvT=this.add.text(CW/2,13,'',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'14px',color:'#c4b8d0'}).setOrigin(0.5,0);
    this.waveT=this.add.text(CW/2,32,'',{
      fontFamily:'Inter,sans-serif',fontSize:'11px',color:'#c4b8d0'}).setOrigin(0.5,0);

    var bx=CW-118,by=16,bw=104,bh=13;
    this.conLbl=this.add.text(bx-4,12,'',{
      fontFamily:'Inter,sans-serif',fontSize:'9px',color:'#c4b8d0'}).setOrigin(1,0);
    var bg=this.add.graphics();
    bg.fillStyle(0x2a2545,0.8);bg.fillRoundedRect(bx,by,bw,bh,6);
    bg.lineStyle(0.5,COL.GOLD,0.25);bg.strokeRoundedRect(bx,by,bw,bh,6);
    this.conFill=this.add.graphics();
    this.conValT=this.add.text(bx+bw/2,by+bh/2+1,this.consc+'/'+this.maxConsc,{
      fontFamily:'Inter,sans-serif',fontSize:'9px',fontStyle:'bold',color:'#1a1000'}).setOrigin(0.5);
    this.conBx=bx;this.conBy=by;this.conBw=bw;this.conBh=bh;
    this.updateConBar();

    var sep=this.add.graphics();
    sep.lineStyle(0.5,COL.GOLD,0.15);sep.lineBetween(12,GY-10,CW-12,GY-10);
    this.refreshHUD();
  }

  updateConBar(){
    var r=this.consc/this.maxConsc;
    this.conFill.clear();
    if(r>0){
      var fw=Math.max(4,(this.conBw-4)*r);
      this.conFill.fillStyle(r>0.3?COL.GOLD:COL.DANGER,0.85);
      this.conFill.fillRoundedRect(this.conBx+2,this.conBy+2,fw,this.conBh-4,4);
    }
    this.conValT.setText(this.consc+'/'+this.maxConsc);
  }

  refreshHUD(){
    var l=C.getLang();
    this.goldT.setText(''+this.gold);
    this.lvT.setText(C.L(this.lv.name));
    this.waveT.setText((l==='en'?'Wave':'Ondata')+' '+(this.curWave+1)+'/'+this.lv.waves.length);
    this.conLbl.setText(l==='en'?'CONSC':'COSC');
    if(this.goalLabel) this.goalLabel.setText(l==='en'?'CENTER':'CENTRO');
  }

  updateTexts(){this.refreshHUD();}

  /* ── Wave button ── */
  createWaveBtn(){
    var self=this,bx=CW/2,by=CH-36;
    this.wBtnBg=this.add.graphics();
    this.wBtnBg.fillStyle(COL.GOLD,1);
    this.wBtnBg.fillRoundedRect(bx-88,by-20,176,40,20);
    this.wBtnT=this.add.text(bx,by,'',{
      fontFamily:'Inter,sans-serif',fontSize:'12px',fontStyle:'bold',color:'#1a1000'
    }).setOrigin(0.5);
    this.wBtnZ=this.add.zone(bx,by,176,40).setInteractive();
    this.wBtnZ.on('pointerdown',function(){
      if(!self.waveActive&&!self.over&&!self.introUp) self.startWave();
    });
    this.syncWaveBtn();
  }

  syncWaveBtn(){
    var l=C.getLang();
    if(this.allDone||this.over){
      this.wBtnBg.setVisible(false);this.wBtnT.setVisible(false);this.wBtnZ.disableInteractive();
    }else if(this.waveActive){
      this.wBtnBg.setAlpha(0.3);
      this.wBtnT.setText(l==='en'?'IN PROGRESS...':'IN CORSO...').setColor('#c4b8d0');
    }else{
      this.wBtnBg.setAlpha(1);
      this.wBtnT.setText(l==='en'?'START WAVE':'INIZIA ONDATA').setColor('#1a1000');
    }
  }

  /* ── Input ── */
  setupInput(){
    var self=this;
    this.input.on('pointerdown',function(ptr){
      if(self.over||self.introUp) return;
      if(self.popup){
        if(self.hitPopup(ptr.x,ptr.y)){
          self.tapPopup(ptr.x,ptr.y);
        }else{
          self.closePopup();
        }
        return;
      }
      var cell=p2c(ptr.x,ptr.y);
      if(!cell) return;
      var k=ck(cell.col,cell.row);
      if(self.pathCells[k]) return;
      if(self.towerMap[k]){self.showSellPopup(cell.col,cell.row);return;}
      self.showBuildPopup(cell.col,cell.row);
    });
  }

  /* ── Build popup ── */
  showBuildPopup(col,row){
    this.closePopup();
    var self=this,l=C.getLang();
    var avail=this.lv.availableTowers;
    var center=cc(col,row);
    var pw=164,ih=48,ph=avail.length*ih+8;
    var px=center.x,py=center.y-CELL/2-ph-6;
    if(py<GY) py=center.y+CELL/2+6;
    if(px-pw/2<4) px=pw/2+4;
    if(px+pw/2>CW-4) px=CW-pw/2-4;

    var con=this.add.container(0,0);
    var bg=this.add.graphics();
    bg.fillStyle(0x16132a,0.96);bg.fillRoundedRect(px-pw/2,py,pw,ph,10);
    bg.lineStyle(1,COL.GOLD,0.3);bg.strokeRoundedRect(px-pw/2,py,pw,ph,10);
    con.add(bg);

    var hl=this.add.graphics();
    hl.lineStyle(2,COL.GOLD,0.5);hl.strokeRect(GX+col*CELL,GY+row*CELL,CELL,CELL);
    con.add(hl);

    var items=[];
    for(var i=0;i<avail.length;i++){
      var td=D.towers[avail[i]];
      var iy=py+4+i*ih,can=self.gold>=td.cost;
      var clr=can?'#'+td.color.toString(16).padStart(6,'0'):'#444';
      var ico=this.add.graphics();
      ico.fillStyle(can?td.color:0x444444,0.85);ico.fillCircle(px-pw/2+22,iy+ih/2,10);
      if(td.key==='testimone'){
        ico.fillStyle(0x0d0b1a,1);ico.fillCircle(px-pw/2+22,iy+ih/2,4);
        ico.fillStyle(can?td.color:0x444444,1);ico.fillCircle(px-pw/2+22,iy+ih/2,2);
      }else{
        ico.fillStyle(0x1a1000,0.9);
        var tx=px-pw/2+22,ty=iy+ih/2;
        ico.fillTriangle(tx,ty-5,tx-4,ty+3,tx+4,ty+3);
      }
      con.add(ico);
      var nm=this.add.text(px-pw/2+40,iy+8,C.L(td.name),{
        fontFamily:'Inter,sans-serif',fontSize:'12px',fontStyle:'bold',color:can?'#e8e0f0':'#555'});
      con.add(nm);
      var ct=this.add.text(px-pw/2+40,iy+26,'⬡ '+td.cost,{
        fontFamily:'Inter,sans-serif',fontSize:'11px',color:can?'#e8c97a':'#553333'});
      con.add(ct);
      items.push({key:avail[i],y:iy,h:ih,can:can});
    }

    this.popup={con:con,x:px,y:py,w:pw,h:ph,items:items,col:col,row:row,type:'build'};
  }

  showSellPopup(col,row){
    this.closePopup();
    var tw=this.towerMap[ck(col,row)];if(!tw) return;
    var td=D.towers[tw.type],l=C.getLang();
    var sv=Math.floor(td.cost*0.6);
    var center=cc(col,row);
    var pw=150,ph=50;
    var px=center.x,py=center.y-CELL/2-ph-6;
    if(py<GY) py=center.y+CELL/2+6;

    var con=this.add.container(0,0);
    var bg=this.add.graphics();
    bg.fillStyle(0x16132a,0.96);bg.fillRoundedRect(px-pw/2,py,pw,ph,10);
    bg.lineStyle(1,COL.GOLD,0.3);bg.strokeRoundedRect(px-pw/2,py,pw,ph,10);
    con.add(bg);

    var lbl=(l==='en'?'SELL +':'VENDI +')+sv+' ⬡';
    var st=this.add.text(px,py+ph/2,lbl,{
      fontFamily:'Inter,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#e8c97a'}).setOrigin(0.5);
    con.add(st);

    this.popup={con:con,x:px,y:py,w:pw,h:ph,items:[{key:'sell',y:py,h:ph,can:true}],
      col:col,row:row,type:'sell',sellValue:sv};
  }

  hitPopup(mx,my){
    if(!this.popup) return false;
    var p=this.popup;
    return mx>=p.x-p.w/2&&mx<=p.x+p.w/2&&my>=p.y&&my<=p.y+p.h;
  }

  tapPopup(mx,my){
    var p=this.popup;if(!p) return;
    for(var i=0;i<p.items.length;i++){
      var it=p.items[i];
      if(my>=it.y&&my<it.y+it.h&&it.can){
        if(p.type==='build'){
          this.buildTower(it.key,p.col,p.row);
        }else if(p.type==='sell'){
          this.sellTower(p.col,p.row,p.sellValue);
        }
        this.closePopup();
        return;
      }
    }
  }

  closePopup(){if(this.popup){this.popup.con.destroy();this.popup=null;}}

  /* ── Towers ── */
  buildTower(key,col,row){
    var td=D.towers[key];
    if(this.gold<td.cost) return;
    this.gold-=td.cost;
    var p=cc(col,row);
    var tw={type:key,col:col,row:row,x:p.x,y:p.y,
      range:td.range*CELL,fireRate:td.fireRate,damage:td.damage,
      slowFactor:td.slowFactor||0,slowDur:td.slowDuration||0,
      aoe:td.aoe,lastFired:0,gfx:null,rng:null};

    tw.gfx=this.add.graphics();
    tw.gfx.fillStyle(td.color,0.85);tw.gfx.fillCircle(p.x,p.y,CELL*0.34);
    tw.gfx.lineStyle(1.5,td.color,0.35);tw.gfx.strokeCircle(p.x,p.y,CELL*0.34);
    if(key==='testimone'){
      tw.gfx.fillStyle(COL.BG,1);tw.gfx.fillCircle(p.x,p.y,CELL*0.14);
      tw.gfx.fillStyle(td.color,1);tw.gfx.fillCircle(p.x,p.y,CELL*0.06);
    }else{
      tw.gfx.fillStyle(0x1a1000,0.85);
      tw.gfx.fillTriangle(p.x,p.y-CELL*0.18,p.x-CELL*0.13,p.y+CELL*0.1,p.x+CELL*0.13,p.y+CELL*0.1);
    }

    tw.rng=this.add.graphics();
    tw.rng.lineStyle(1,td.color,0.12);tw.rng.strokeCircle(p.x,p.y,tw.range);
    tw.rng.fillStyle(td.color,0.03);tw.rng.fillCircle(p.x,p.y,tw.range);

    this.towers.push(tw);
    this.towerMap[ck(col,row)]=tw;
    this.refreshHUD();

    this.tweens.add({targets:tw.gfx,scaleX:{from:0.5,to:1},scaleY:{from:0.5,to:1},
      duration:200,ease:'Back.easeOut'});
  }

  sellTower(col,row,val){
    var k=ck(col,row),tw=this.towerMap[k];if(!tw)return;
    this.gold+=val;
    tw.gfx.destroy();tw.rng.destroy();
    this.towers=this.towers.filter(function(t){return t!==tw;});
    delete this.towerMap[k];
    this.refreshHUD();
  }

  /* ── Waves ── */
  startWave(){
    if(this.waveActive||this.curWave>=this.lv.waves.length) return;
    var wd=this.lv.waves[this.curWave];
    this.spawnQ=[];
    var delay=0;
    for(var g=0;g<wd.length;g++){
      var gr=wd[g];
      for(var i=0;i<gr.count;i++) this.spawnQ.push({type:gr.type,delay:delay+i*gr.spacing*1000});
      delay+=gr.count*gr.spacing*1000+500;
    }
    this.spawnQ.sort(function(a,b){return a.delay-b.delay;});
    this.waveActive=true;
    this.waveStart=this.time.now;
    this.spawnIdx=0;
    this.syncWaveBtn();
    this.closePopup();
  }

  spawnEnemy(typeKey){
    var ed=D.enemies[typeKey],start=this.pp[0];
    var e={type:typeKey,x:start.x,y:start.y,hp:ed.hp,maxHp:ed.hp,
      speed:ed.speed,baseSpeed:ed.speed,progress:0,alive:true,slowTimer:0,
      gfx:this.add.graphics(),hpGfx:this.add.graphics()};
    e.gfx.fillStyle(ed.color,0.85);e.gfx.fillCircle(0,0,ed.radius);
    e.gfx.lineStyle(1.5,ed.glow,0.4);e.gfx.strokeCircle(0,0,ed.radius);
    e.gfx.setPosition(start.x,start.y);
    this.enemies.push(e);
  }

  /* ── Update loop ── */
  update(time,delta){
    if(this.over||this.introUp) return;
    var dt=delta/1000;

    if(this.waveActive&&this.spawnIdx<this.spawnQ.length){
      var el=time-this.waveStart;
      while(this.spawnIdx<this.spawnQ.length&&el>=this.spawnQ[this.spawnIdx].delay){
        this.spawnEnemy(this.spawnQ[this.spawnIdx].type);
        this.spawnIdx++;
      }
    }

    for(var i=this.enemies.length-1;i>=0;i--){
      var e=this.enemies[i];if(!e.alive) continue;
      if(e.slowTimer>0){e.slowTimer-=dt;if(e.slowTimer<=0) e.speed=e.baseSpeed;}
      e.progress+=e.speed*dt;
      var pos=pathPos(this.pp,e.progress);
      e.x=pos.x;e.y=pos.y;
      e.gfx.setPosition(e.x,e.y);
      this.drawEnemyHP(e);
      if(pos.done) this.enemyLeak(e);
    }

    for(var t=0;t<this.towers.length;t++) this.updateTower(this.towers[t],time);

    if(this.waveActive&&this.spawnIdx>=this.spawnQ.length&&
       this.enemies.every(function(e){return !e.alive;})){
      this.waveEnd();
    }
  }

  drawEnemyHP(e){
    e.hpGfx.clear();
    if(e.hp<e.maxHp&&e.hp>0){
      var ed=D.enemies[e.type],bw=ed.radius*2,bh=3;
      var bx=e.x-bw/2,by=e.y-ed.radius-5,r=e.hp/e.maxHp;
      e.hpGfx.fillStyle(0x333333,0.8);e.hpGfx.fillRect(bx,by,bw,bh);
      e.hpGfx.fillStyle(r>0.5?COL.GOLD:COL.DANGER,0.9);e.hpGfx.fillRect(bx,by,bw*r,bh);
    }
  }

  updateTower(tw,time){
    if(time-tw.lastFired<tw.fireRate) return;
    var inR=[];
    for(var i=0;i<this.enemies.length;i++){
      var e=this.enemies[i];if(!e.alive) continue;
      var d=dst(tw,e);
      if(d<=tw.range) inR.push(e);
    }
    if(!inR.length) return;
    tw.lastFired=time;
    inR.sort(function(a,b){return b.progress-a.progress;});

    if(tw.slowFactor>0){
      for(var j=0;j<inR.length;j++){
        inR[j].speed=inR[j].baseSpeed*tw.slowFactor;
        inR[j].slowTimer=tw.slowDur/1000;
      }
      this.towerFx(tw,false);
    }else if(tw.aoe){
      for(var k=0;k<inR.length;k++) this.hurtEnemy(inR[k],tw.damage);
      this.towerFx(tw,true);
    }else{
      this.hurtEnemy(inR[0],tw.damage);
      this.towerFx(tw,false);
    }
  }

  towerFx(tw,aoe){
    var td=D.towers[tw.type],fx=this.add.graphics();
    if(aoe){
      fx.lineStyle(2,td.color,0.45);fx.strokeCircle(tw.x,tw.y,4);
      this.tweens.add({targets:fx,scaleX:tw.range/4,scaleY:tw.range/4,alpha:0,
        duration:350,onComplete:function(){fx.destroy();}});
    }else{
      fx.fillStyle(td.color,0.5);fx.fillCircle(tw.x,tw.y,CELL*0.12);
      this.tweens.add({targets:fx,scaleX:2.5,scaleY:2.5,alpha:0,
        duration:250,onComplete:function(){fx.destroy();}});
    }
  }

  hurtEnemy(e,dmg){
    if(!e.alive) return;
    e.hp-=dmg;
    if(e.hp<=0) this.transmute(e);
  }

  transmute(e){
    e.alive=false;
    var ed=D.enemies[e.type];
    this.gold+=ed.reward;
    this.refreshHUD();

    var pop=this.add.text(e.x,e.y-10,'+'+ed.reward+' ⬡',{
      fontFamily:'Inter,sans-serif',fontSize:'12px',fontStyle:'bold',color:'#e8c97a'}).setOrigin(0.5);
    this.tweens.add({targets:pop,y:pop.y-28,alpha:0,duration:700,
      onComplete:function(){pop.destroy();}});

    for(var i=0;i<4;i++){
      var p=this.add.graphics();
      p.fillStyle(COL.GOLD_L,0.7);p.fillCircle(0,0,1.5+Math.random()*2);
      p.setPosition(e.x,e.y);
      this.tweens.add({targets:p,
        x:p.x+(Math.random()-0.5)*50,y:p.y-15-Math.random()*35,alpha:0,
        duration:400+Math.random()*250,delay:i*40,
        onComplete:function(){p.destroy();}});
    }

    this.tweens.add({targets:[e.gfx],alpha:0,scaleX:0.2,scaleY:0.2,duration:250,
      onComplete:function(){e.gfx.destroy();e.hpGfx.destroy();}});
  }

  enemyLeak(e){
    e.alive=false;
    this.consc=Math.max(0,this.consc-1);
    this.updateConBar();
    this.cameras.main.flash(150,216,85,79,false);
    e.gfx.destroy();e.hpGfx.destroy();
    if(this.consc<=0) this.identified();
  }

  waveEnd(){
    this.waveActive=false;
    this.curWave++;
    this.enemies=[];
    if(this.curWave>=this.lv.waves.length){
      this.allDone=true;
      this.levelWin();
    }else{
      this.refreshHUD();this.syncWaveBtn();
    }
  }

  levelWin(){
    this.syncWaveBtn();
    var self=this,l=C.getLang();
    saveState({highestLevel:this.lvIdx+1});
    var txt=l==='en'?'TRANSMUTATION COMPLETE':'TRASMUTAZIONE COMPLETA';
    var v=this.add.text(CW/2,CH/2-20,txt,{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'20px',fontStyle:'bold',
      color:'#e8c97a',align:'center'}).setOrigin(0.5).setAlpha(0);
    this.tweens.add({targets:v,alpha:1,duration:800,onComplete:function(){
      self.time.delayedCall(1800,function(){
        self.scene.start('quote',{level:self.lvIdx,next:self.lvIdx+1});
      });
    }});
  }

  identified(){
    this.over=true;this.closePopup();this.syncWaveBtn();
    var self=this;
    this.time.delayedCall(400,function(){
      self.scene.start('identified',{level:self.lvIdx});
    });
  }

  /* ── Level intro overlay ── */
  showIntro(){
    var self=this,l=C.getLang();
    var els=[];
    var ov=this.add.graphics();ov.fillStyle(0x0d0b1a,0.92);ov.fillRect(0,0,CW,CH);els.push(ov);
    var nl=(l==='en'?'Level':'Livello')+' '+this.lv.number;
    els.push(this.add.text(CW/2,CH/2-55,nl,{
      fontFamily:'Inter,sans-serif',fontSize:'11px',color:'#c9973a'}).setOrigin(0.5));
    els.push(this.add.text(CW/2,CH/2-25,C.L(this.lv.name),{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'30px',fontStyle:'bold',color:'#e8c97a'
    }).setOrigin(0.5));
    var ln=this.add.graphics();ln.lineStyle(0.5,COL.GOLD,0.4);
    ln.lineBetween(CW/2-50,CH/2+2,CW/2+50,CH/2+2);els.push(ln);
    var desc=l==='en'
      ?'Place towers to transmute\nnegative emotions.\nDo not let them reach your center.'
      :'Piazza le torri per trasmutare\nle emozioni negative.\nNon farle raggiungere il tuo centro.';
    els.push(this.add.text(CW/2,CH/2+35,desc,{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'13px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',lineSpacing:5}).setOrigin(0.5));

    this.time.delayedCall(2200,function(){
      self.tweens.add({targets:els,alpha:0,duration:400,onComplete:function(){
        els.forEach(function(e){e.destroy();});
        self.introUp=false;
      }});
    });
  }
}

/* ================================================================
   QUOTE SCENE
   ================================================================ */
class QuoteScene extends Phaser.Scene{
  constructor(){super('quote');}
  init(data){this.lvIdx=data.level||0;this.next=data.next||0;}

  create(){
    var self=this,l=C.getLang(),cx=CW/2;
    var qi=this.lvIdx%D.quotes.length,q=D.quotes[qi];
    this.cameras.main.setBackgroundColor(COL.BG);
    this.cameras.main.fadeIn(400);

    this.add.text(cx,CH/2-110,'✦',{fontSize:'16px',color:'#c9973a'}).setOrigin(0.5);
    this.add.text(cx,CH/2-30,'“'+(l==='en'?q.en:q.it)+'”',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'17px',fontStyle:'italic',
      color:'#e8e0f0',align:'center',wordWrap:{width:290},lineSpacing:7}).setOrigin(0.5);
    this.add.text(cx,CH/2+55,'— '+q.author,{
      fontFamily:'Inter,sans-serif',fontSize:'11px',color:'#c9973a'}).setOrigin(0.5);

    var bl=l==='en'?'CONTINUE':'CONTINUA';
    var bg=this.add.graphics();bg.fillStyle(COL.GOLD,1);bg.fillRoundedRect(cx-80,CH/2+110,160,40,20);
    this.add.text(cx,CH/2+130,bl,{
      fontFamily:'Inter,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#1a1000'}).setOrigin(0.5);
    this.add.zone(cx,CH/2+130,160,40).setInteractive()
      .on('pointerdown',function(){
        if(self.next<D.levels.length) self.scene.start('game',{level:self.next});
        else self.scene.start('menu');
      });
  }
}

/* ================================================================
   IDENTIFIED SCENE (game-over)
   ================================================================ */
class IdentifiedScene extends Phaser.Scene{
  constructor(){super('identified');}
  init(data){this.lvIdx=data.level||0;}

  create(){
    var self=this,l=C.getLang(),cx=CW/2;
    this.cameras.main.setBackgroundColor(0x0a0816);
    this.cameras.main.fadeIn(600);

    this.add.text(cx,CH/2-100,'◉',{fontSize:'44px',color:'#d8554f'}).setOrigin(0.5);
    this.add.text(cx,CH/2-45,l==='en'?'You Identified':'Ti sei Identificato',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'26px',fontStyle:'bold',color:'#d8554f'
    }).setOrigin(0.5);

    var desc=l==='en'
      ?'The negative emotions reached your center.\nYou lost consciousness and became mechanical.'
      :'Le emozioni negative hanno raggiunto\nil tuo centro. Hai perso la coscienza\ne sei diventato meccanico.';
    this.add.text(cx,CH/2+15,desc,{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'13px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',lineSpacing:5}).setOrigin(0.5);

    var q=D.quotes[5];
    this.add.text(cx,CH/2+80,'“'+(l==='en'?q.en:q.it)+'”',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'13px',fontStyle:'italic',
      color:'#e8c97a',align:'center',wordWrap:{width:280}}).setOrigin(0.5);

    var rl=l==='en'?'AWAKEN AGAIN':'RISVEGLIATI';
    var bg=this.add.graphics();bg.fillStyle(COL.GOLD,1);bg.fillRoundedRect(cx-80,CH/2+140,160,40,20);
    this.add.text(cx,CH/2+160,rl,{
      fontFamily:'Inter,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#1a1000'}).setOrigin(0.5);
    this.add.zone(cx,CH/2+160,160,40).setInteractive()
      .on('pointerdown',function(){self.scene.start('game',{level:self.lvIdx});});
  }
}

/* ================================================================
   BOOT
   ================================================================ */
C=window.GameCore(I);
C.init(function(){
  var config={
    type:Phaser.AUTO,
    parent:'app',
    width:CW, height:CH,
    backgroundColor:'#0d0b1a',
    scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
    scene:[MenuScene,GameScene,QuoteScene,IdentifiedScene]
  };
  var game=new Phaser.Game(config);
  C.onLangChange=function(){
    var active=game.scene.getScenes(true);
    for(var i=0;i<active.length;i++){
      if(active[i].updateTexts) active[i].updateTexts();
    }
  };
});
})();
