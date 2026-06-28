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
   PIXEL ART — draw helpers & sprite data
   ================================================================ */
function drawFromMap(ctx,rows,pal){
  for(var y=0;y<rows.length;y++){
    var row=rows[y];
    for(var x=0;x<row.length;x++){
      var ch=row[x];
      if(ch!=='.'&&pal[ch]){ctx.fillStyle=pal[ch];ctx.fillRect(x,y,1,1);}
    }
  }
}

var PAL_GROUND={
  'a':'#0c1508','b':'#101c0c','c':'#142210','d':'#182a14','e':'#1c3018'
};
var PAL_STONE={
  'a':'#14112a','b':'#1a1630','c':'#1e1a38','d':'#242040','e':'#2a2548','f':'#302a50'
};
var PAL_RABBIA={
  'o':'#6b1a10','r':'#d8554f','R':'#ff5544','f':'#ff7733','F':'#ffaa44',
  'Y':'#ffdd66','w':'#ffffff','k':'#220000'
};
var PAL_PAURA={
  'd':'#2a1848','p':'#5a3d80','P':'#7b5ea7','l':'#9b80c8','L':'#b49fe0',
  'w':'#ddccff','k':'#1a0a2e','W':'#ffffff'
};
var PAL_TESTI={
  's':'#2a2240','S':'#343050','b':'#2266aa','B':'#3388cc','C':'#4a9eff',
  'g':'#77ccff','w':'#aaddff','W':'#ffffff'
};
var PAL_FUOCO={
  's':'#2a2240','S':'#343050','m':'#6b5520','M':'#8b7030','g':'#c9973a',
  'G':'#e8c97a','f':'#ff8833','F':'#ffbb44','Y':'#ffee88','r':'#ff5533'
};

var SPRITE_RABBIA=[
  '....fF....',
  '...fFFf...',
  '..rRFFfr..',
  '.rRfFFfRr.',
  '.rw.rr.wRr',
  '.rkr..rkRr',
  '.rRfFFfRr.',
  '..rRFFRr..',
  '..orRRro..',
  '...o..o...'
];
var SPRITE_PAURA=[
  '..dpPPpd..',
  '.pPPlLPPp.',
  'pPlLllLlPp',
  'pPWk..kWPp',
  'pPPllllPPp',
  '.pPPllPPp.',
  '..ppPPpp..',
  '.dp.pp.pd.',
  'd...pp...d',
  '....dd....'
];
var SPRITE_TESTI=[
  '....bB....',
  '...bBCb...',
  '..bCgwCb..',
  '.bCgWwgCb.',
  '..bCgwCb..',
  '...bBCb...',
  '....sS....',
  '...sSss...',
  '..sSSSss..',
  '.ssSSSSss.'
];
var SPRITE_FUOCO=[
  '....rF....',
  '...fFFf...',
  '..fFYFf...',
  '...fYf....',
  '..gGGGg...',
  '.gGMMMGg..',
  '.gMmmmMg..',
  '..sSSSs...',
  '.sSSSSss..',
  'ssSSSSSSss'
];
var SPRITE_GOLD=[
  '..gGg.',
  '.gGGGg',
  'gGYYGg',
  'gGYYGg',
  '.gGGGg',
  '..gGg.'
];
var PAL_GOLD_S={
  'g':'#8b7030','G':'#c9973a','Y':'#e8c97a'
};

/* ================================================================
   BOOT SCENE — generate pixel art textures
   ================================================================ */
class BootScene extends Phaser.Scene{
  constructor(){super('boot');}

  create(){
    this.genTile('tile_grass',11,11,PAL_GROUND,function(ctx){
      ctx.fillStyle='#0c1508';ctx.fillRect(0,0,11,11);
      var spots=[
        [0,0,'b'],[2,0,'c'],[5,0,'b'],[8,0,'c'],[10,0,'b'],
        [1,1,'c'],[4,1,'d'],[7,1,'b'],[9,1,'c'],
        [0,2,'b'],[3,2,'c'],[6,2,'d'],[10,2,'c'],
        [1,3,'c'],[5,3,'e'],[8,3,'c'],
        [0,4,'c'],[2,4,'b'],[4,4,'c'],[7,4,'d'],[10,4,'b'],
        [1,5,'b'],[3,5,'d'],[6,5,'c'],[9,5,'e'],
        [0,6,'c'],[5,6,'b'],[8,6,'c'],[10,6,'d'],
        [2,7,'d'],[4,7,'c'],[7,7,'b'],[9,7,'c'],
        [0,8,'b'],[1,8,'c'],[6,8,'d'],[10,8,'c'],
        [3,9,'c'],[5,9,'b'],[8,9,'d'],
        [0,10,'c'],[2,10,'b'],[7,10,'c'],[10,10,'b']
      ];
      for(var i=0;i<spots.length;i++){
        ctx.fillStyle=PAL_GROUND[spots[i][2]];
        ctx.fillRect(spots[i][0],spots[i][1],1,1);
      }
    });

    this.genTile('tile_path',11,11,PAL_STONE,function(ctx){
      ctx.fillStyle='#14112a';ctx.fillRect(0,0,11,11);
      ctx.fillStyle='#1e1a38';
      ctx.fillRect(0,0,5,4);ctx.fillRect(6,0,5,4);
      ctx.fillRect(0,5,4,6);ctx.fillRect(5,5,6,6);
      ctx.fillStyle='#242040';
      ctx.fillRect(1,1,3,2);ctx.fillRect(7,1,3,2);
      ctx.fillRect(1,6,2,4);ctx.fillRect(6,6,4,4);
      ctx.fillStyle='#12102a';
      ctx.fillRect(5,0,1,4);ctx.fillRect(0,4,11,1);
      ctx.fillRect(4,5,1,6);
      ctx.fillStyle='#2a2548';
      ctx.fillRect(2,1,1,1);ctx.fillRect(8,2,1,1);
      ctx.fillRect(2,7,1,1);ctx.fillRect(7,7,1,1);
    });

    this.genTile('tile_goal',11,11,null,function(ctx){
      ctx.fillStyle='#1a1508';ctx.fillRect(0,0,11,11);
      ctx.fillStyle='#2a2010';
      ctx.fillRect(2,2,7,7);
      ctx.fillStyle='#3a3018';
      ctx.fillRect(3,3,5,5);
      ctx.fillStyle='#4a4020';
      ctx.fillRect(4,4,3,3);
      ctx.fillStyle='#c9973a';
      ctx.fillRect(5,5,1,1);
      ctx.fillStyle='#5a4828';
      ctx.fillRect(5,3,1,1);ctx.fillRect(3,5,1,1);
      ctx.fillRect(7,5,1,1);ctx.fillRect(5,7,1,1);
    });

    this.genSprite('spr_rabbia',10,10,SPRITE_RABBIA,PAL_RABBIA);
    this.genSprite('spr_paura',10,10,SPRITE_PAURA,PAL_PAURA);
    this.genSprite('spr_testimone',10,10,SPRITE_TESTI,PAL_TESTI);
    this.genSprite('spr_fuoco',10,10,SPRITE_FUOCO,PAL_FUOCO);
    this.genSprite('spr_gold',6,6,SPRITE_GOLD,PAL_GOLD_S);

    this.genTile('spr_star',2,2,null,function(ctx){
      ctx.fillStyle='#e8e0f0';ctx.fillRect(0,0,2,2);
      ctx.fillStyle='#ffffff';ctx.fillRect(0,0,1,1);
    });

    this.genTile('spr_particle',3,3,null,function(ctx){
      ctx.fillStyle='#e8c97a';
      ctx.fillRect(1,0,1,1);ctx.fillRect(0,1,3,1);ctx.fillRect(1,2,1,1);
    });

    this.genTile('spr_slow_ring',8,8,null,function(ctx){
      ctx.fillStyle='#4a9eff';
      ctx.fillRect(2,0,4,1);ctx.fillRect(2,7,4,1);
      ctx.fillRect(0,2,1,4);ctx.fillRect(7,2,1,4);
      ctx.fillRect(1,1,1,1);ctx.fillRect(6,1,1,1);
      ctx.fillRect(1,6,1,1);ctx.fillRect(6,6,1,1);
    });

    this.genTile('spr_fire_burst',6,6,null,function(ctx){
      ctx.fillStyle='#ffbb44';
      ctx.fillRect(2,0,2,1);ctx.fillRect(1,1,4,1);
      ctx.fillRect(0,2,6,2);ctx.fillRect(1,4,4,1);ctx.fillRect(2,5,2,1);
      ctx.fillStyle='#ffee88';
      ctx.fillRect(2,2,2,2);
    });

    this.scene.start('menu');
  }

  genTile(key,w,h,pal,drawFn){
    var can=this.textures.createCanvas(key,w,h);
    var ctx=can.context;
    ctx.imageSmoothingEnabled=false;
    drawFn(ctx);
    can.refresh();
  }

  genSprite(key,w,h,rows,pal){
    var can=this.textures.createCanvas(key,w,h);
    var ctx=can.context;
    ctx.imageSmoothingEnabled=false;
    drawFromMap(ctx,rows,pal);
    can.refresh();
  }
}

/* ================================================================
   STARS BACKGROUND — reused across scenes
   ================================================================ */
function addStars(scene,count){
  var stars=[];
  for(var i=0;i<count;i++){
    var s=scene.add.image(
      4+Math.floor((i*137+i*i*53)%(CW-8)),
      4+Math.floor((i*211+i*i*37)%(CH-8)),
      'spr_star'
    );
    var a=0.08+((i*73)%100)/250;
    s.setAlpha(a).setScale(0.4+((i*41)%100)/200);
    scene.tweens.add({targets:s,alpha:a*0.2,
      duration:1800+((i*89)%2000),yoyo:true,repeat:-1,ease:'Sine.easeInOut',
      delay:((i*67)%1000)});
    stars.push(s);
  }
  return stars;
}

/* ================================================================
   MENU SCENE
   ================================================================ */
class MenuScene extends Phaser.Scene{
  constructor(){super('menu');}

  create(){
    var self=this;
    this.cameras.main.setBackgroundColor(COL.BG);
    var cx=CW/2,cy=CH/2-30;

    addStars(this,50);

    var halo=this.add.graphics();
    halo.fillStyle(0xc9973a,0.04);halo.fillCircle(cx,cy-40,160);
    halo.fillStyle(0x7b5ea7,0.025);halo.fillCircle(cx,cy-40,220);

    var athanor=this.add.image(cx,cy-105,'spr_fuoco').setScale(5);
    athanor.setAlpha(0.9);
    this.tweens.add({targets:athanor,y:athanor.y-3,duration:1600,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});

    this.titleT=this.add.text(cx,cy-45,"L'Athanor",{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'40px',fontStyle:'bold',color:'#e8c97a'
    }).setOrigin(0.5);

    this.subT=this.add.text(cx,cy+10,'',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'15px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',wordWrap:{width:300}
    }).setOrigin(0.5);

    var q=D.quotes[0];
    this.epiT=this.add.text(cx,cy+70,'',{
      fontFamily:'EB Garamond,Georgia,serif',fontSize:'13.5px',fontStyle:'italic',
      color:'#c4b8d0',align:'center',wordWrap:{width:280},lineSpacing:6
    }).setOrigin(0.5);
    this.epiA=this.add.text(cx,cy+125,'— '+q.author,{
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
    this.epiT.setText('"'+(l==='en'?q.en:q.it)+'"');
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
    this._phase=0;
  }

  create(){
    this.cameras.main.setBackgroundColor(COL.BG);
    addStars(this,25);
    this.drawGrid();
    this.drawPathDecor();
    this.drawGoal();
    this.drawEntry();
    this.enemyLayer=this.add.container(0,0);
    this.towerLayer=this.add.container(0,0);
    this.fxLayer=this.add.container(0,0);
    this.uiLayer=this.add.container(0,0);
    this.createHUD();
    this.createWaveBtn();
    this.setupInput();
    this.showIntro();
  }

  /* ── Grid with pixel art tiles ── */
  drawGrid(){
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
      var p=cc(c,r),isP=!!this.pathCells[ck(c,r)];
      var tile=this.add.image(p.x,p.y,isP?'tile_path':'tile_grass');
      tile.setDisplaySize(CELL-1,CELL-1);
      if(!isP){
        var g=this.add.graphics();
        g.lineStyle(0.5,COL.GRID,0.08);
        g.strokeRect(GX+c*CELL+1,GY+r*CELL+1,CELL-2,CELL-2);
      }
    }
  }

  drawPathDecor(){
    var g=this.add.graphics();
    g.lineStyle(1.5,COL.GOLD,0.06);
    g.beginPath();g.moveTo(this.pp[0].x,this.pp[0].y);
    for(var i=1;i<this.pp.length;i++) g.lineTo(this.pp[i].x,this.pp[i].y);
    g.strokePath();
    for(var j=0;j<this.pp.length;j++){
      var pt=this.pp[j];
      g.fillStyle(COL.GOLD,0.08);
      g.fillCircle(pt.x,pt.y,3);
    }
  }

  drawGoal(){
    var p=this.pp[this.pp.length-1];
    var goal=this.add.image(p.x,p.y,'tile_goal');
    goal.setDisplaySize(CELL,CELL);
    var glow=this.add.graphics();
    glow.fillStyle(COL.GOLD,0.08);glow.fillCircle(p.x,p.y,CELL*0.8);
    glow.fillStyle(COL.GOLD,0.15);glow.fillCircle(p.x,p.y,CELL*0.45);
    this.tweens.add({targets:glow,alpha:{from:0.5,to:1},duration:1400,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});

    var goldIcon=this.add.image(p.x,p.y,'spr_gold').setScale(2.5).setAlpha(0.7);
    this.tweens.add({targets:goldIcon,y:p.y-2,duration:1200,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});

    this.goalLabel=this.add.text(p.x,p.y-CELL*0.6,'',{
      fontFamily:'Inter,sans-serif',fontSize:'8px',color:'#c9973a',letterSpacing:1
    }).setOrigin(0.5);
    this.goalLabel.setText(C.getLang()==='en'?'CENTER':'CENTRO');
  }

  drawEntry(){
    var p=this.pp[0];
    var g=this.add.graphics();
    g.fillStyle(COL.DANGER,0.3);
    g.fillTriangle(p.x-8,p.y-CELL/2-3,p.x+8,p.y-CELL/2-3,p.x,p.y-CELL/2+8);
    g.fillStyle(COL.DANGER,0.5);
    g.fillTriangle(p.x-4,p.y-CELL/2,p.x+4,p.y-CELL/2,p.x,p.y-CELL/2+5);
  }

  /* ── HUD ── */
  createHUD(){
    var goldSpr=this.add.image(22,19,'spr_gold').setScale(2.8);
    this.goldT=this.add.text(36,13,''+this.gold,{
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
    var pw=170,ih=48,ph=avail.length*ih+8;
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
      var sprKey=td.key==='testimone'?'spr_testimone':'spr_fuoco';
      var ico=this.add.image(px-pw/2+22,iy+ih/2,sprKey);
      ico.setScale(can?2.5:2.5).setAlpha(can?1:0.3);
      con.add(ico);
      var nm=this.add.text(px-pw/2+42,iy+8,C.L(td.name),{
        fontFamily:'Inter,sans-serif',fontSize:'12px',fontStyle:'bold',color:can?'#e8e0f0':'#555'});
      con.add(nm);
      var costIcon=this.add.image(px-pw/2+42,iy+33,'spr_gold').setScale(1.8).setOrigin(0,0.5);
      costIcon.setAlpha(can?1:0.3);
      con.add(costIcon);
      var ct=this.add.text(px-pw/2+55,iy+26,''+td.cost,{
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

    var lbl=(l==='en'?'SELL +':'VENDI +')+sv;
    var st=this.add.text(px-10,py+ph/2,lbl,{
      fontFamily:'Inter,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#e8c97a'}).setOrigin(0.5);
    con.add(st);
    var gi=this.add.image(px+st.width/2,py+ph/2,'spr_gold').setScale(2).setOrigin(0,0.5);
    con.add(gi);

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
      aoe:td.aoe,lastFired:0,spr:null,rng:null,base:null};

    var sprKey=key==='testimone'?'spr_testimone':'spr_fuoco';
    tw.spr=this.add.image(p.x,p.y,sprKey).setScale(3.6);
    this.towerLayer.add(tw.spr);

    tw.rng=this.add.graphics();
    tw.rng.lineStyle(1,td.color,0.1);tw.rng.strokeCircle(p.x,p.y,tw.range);
    tw.rng.fillStyle(td.color,0.02);tw.rng.fillCircle(p.x,p.y,tw.range);

    this.towers.push(tw);
    this.towerMap[ck(col,row)]=tw;
    this.refreshHUD();

    tw.spr.setScale(0);
    this.tweens.add({targets:tw.spr,scaleX:3.6,scaleY:3.6,
      duration:250,ease:'Back.easeOut'});
  }

  sellTower(col,row,val){
    var k=ck(col,row),tw=this.towerMap[k];if(!tw)return;
    this.gold+=val;
    tw.spr.destroy();tw.rng.destroy();
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
    var sprKey=typeKey==='rabbia'?'spr_rabbia':'spr_paura';
    var e={type:typeKey,x:start.x,y:start.y,hp:ed.hp,maxHp:ed.hp,
      speed:ed.speed,baseSpeed:ed.speed,progress:0,alive:true,slowTimer:0,
      spr:null,hpGfx:null,shadow:null,_ph:this._phase++*1.7};

    e.shadow=this.add.graphics();
    e.shadow.fillStyle(0x000000,0.2);
    e.shadow.fillEllipse(0,0,CELL*0.5,CELL*0.2);
    e.shadow.setPosition(start.x,start.y+CELL*0.3);
    this.enemyLayer.add(e.shadow);

    e.spr=this.add.image(start.x,start.y,sprKey).setScale(3.2);
    this.enemyLayer.add(e.spr);

    e.hpGfx=this.add.graphics();
    this.enemyLayer.add(e.hpGfx);

    e.spr.setScale(0);
    this.tweens.add({targets:e.spr,scaleX:3.2,scaleY:3.2,duration:200,ease:'Back.easeOut'});

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
      var floatY=Math.sin(time*0.004+e._ph)*3;
      e.spr.setPosition(e.x,e.y+floatY);
      e.shadow.setPosition(e.x,e.y+CELL*0.3);
      e.shadow.setAlpha(0.15+Math.sin(time*0.004+e._ph)*0.05);
      if(e.slowTimer>0) e.spr.setTint(0x6688ff);
      else e.spr.clearTint();
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
      var bw=CELL*0.6,bh=3;
      var bx=e.x-bw/2,by=e.y-CELL*0.45,r=e.hp/e.maxHp;
      e.hpGfx.fillStyle(0x111111,0.7);e.hpGfx.fillRect(bx-1,by-1,bw+2,bh+2);
      e.hpGfx.fillStyle(0x333333,0.9);e.hpGfx.fillRect(bx,by,bw,bh);
      e.hpGfx.fillStyle(r>0.5?0x44cc44:r>0.25?0xccaa44:0xcc4444,1);
      e.hpGfx.fillRect(bx,by,bw*r,bh);
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
      this.towerFxSlow(tw);
    }else if(tw.aoe){
      for(var k=0;k<inR.length;k++) this.hurtEnemy(inR[k],tw.damage);
      this.towerFxFire(tw,inR[0]);
    }else{
      this.hurtEnemy(inR[0],tw.damage);
      this.towerFxFire(tw,inR[0]);
    }

    this.tweens.add({targets:tw.spr,scaleX:4,scaleY:4,duration:60,yoyo:true,ease:'Quad.easeOut'});
  }

  towerFxSlow(tw){
    var ring=this.add.image(tw.x,tw.y,'spr_slow_ring').setScale(1).setAlpha(0.6);
    this.fxLayer.add(ring);
    this.tweens.add({targets:ring,scaleX:tw.range/4,scaleY:tw.range/4,alpha:0,
      duration:400,onComplete:function(){ring.destroy();}});
  }

  towerFxFire(tw,target){
    var burst=this.add.image(tw.x,tw.y,'spr_fire_burst').setScale(1.5).setAlpha(0.8);
    this.fxLayer.add(burst);
    this.tweens.add({targets:burst,x:target?target.x:tw.x,y:target?target.y:tw.y,
      scaleX:3,scaleY:3,alpha:0,duration:250,
      onComplete:function(){burst.destroy();}});
    if(tw.aoe){
      var ring=this.add.image(tw.x,tw.y,'spr_fire_burst').setScale(1).setAlpha(0.4);
      this.fxLayer.add(ring);
      this.tweens.add({targets:ring,scaleX:tw.range/3,scaleY:tw.range/3,alpha:0,
        duration:350,onComplete:function(){ring.destroy();}});
    }
  }

  hurtEnemy(e,dmg){
    if(!e.alive) return;
    e.hp-=dmg;
    this.tweens.add({targets:e.spr,alpha:0.4,duration:50,yoyo:true});
    if(e.hp<=0) this.transmute(e);
  }

  transmute(e){
    e.alive=false;
    var ed=D.enemies[e.type];
    this.gold+=ed.reward;
    this.refreshHUD();

    var pop=this.add.text(e.x,e.y-16,'+'+ed.reward,{
      fontFamily:'Inter,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#e8c97a'}).setOrigin(0.5);
    var gi=this.add.image(e.x+pop.width/2+6,e.y-16,'spr_gold').setScale(2);
    this.tweens.add({targets:[pop,gi],y:'-=30',alpha:0,duration:700,
      onComplete:function(){pop.destroy();gi.destroy();}});

    for(var i=0;i<6;i++){
      var pt=this.add.image(e.x,e.y,'spr_particle').setScale(1+((i*37)%3)*0.5).setAlpha(0.8);
      this.fxLayer.add(pt);
      var ang=i*(Math.PI*2/6);
      this.tweens.add({targets:pt,
        x:pt.x+Math.cos(ang)*30+((i*13)%20-10),
        y:pt.y+Math.sin(ang)*30-15-((i*17)%15),
        alpha:0,scaleX:0.3,scaleY:0.3,
        duration:350+((i*29)%200),delay:i*30,
        onComplete:function(){pt.destroy();}});
    }

    this.tweens.add({targets:e.spr,alpha:0,scaleX:0.5,scaleY:0.5,duration:250,
      onComplete:function(){e.spr.destroy();e.hpGfx.destroy();e.shadow.destroy();}});
  }

  enemyLeak(e){
    e.alive=false;
    this.consc=Math.max(0,this.consc-1);
    this.updateConBar();
    this.cameras.main.flash(150,216,85,79,false);
    this.cameras.main.shake(120,0.008);
    e.spr.destroy();e.hpGfx.destroy();e.shadow.destroy();
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

    addStars(this,40);

    this.add.image(cx,CH/2-110,'spr_gold').setScale(3).setAlpha(0.6);
    this.add.text(cx,CH/2-30,'"'+(l==='en'?q.en:q.it)+'"',{
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

    addStars(this,20);

    var re=this.add.image(cx,CH/2-100,'spr_rabbia').setScale(5).setAlpha(0.7);
    this.tweens.add({targets:re,y:re.y-4,duration:2000,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});

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
    this.add.text(cx,CH/2+80,'"'+(l==='en'?q.en:q.it)+'"',{
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
    pixelArt:true,
    scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
    scene:[BootScene,MenuScene,GameScene,QuoteScene,IdentifiedScene]
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
