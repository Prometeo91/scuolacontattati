window.ATHANOR_DATA={
  enemies:{
    rabbia:{
      key:'rabbia',
      name:{it:'Rabbia',en:'Anger'},
      color:0xd8554f, glow:0xff7070,
      speed:80, hp:40, reward:8, radius:11
    },
    paura:{
      key:'paura',
      name:{it:'Paura',en:'Fear'},
      color:0x7b5ea7, glow:0xb49fe0,
      speed:40, hp:100, reward:15, radius:13
    }
  },

  towers:{
    testimone:{
      key:'testimone',
      name:{it:'Testimone',en:'Witness'},
      desc:{it:'Osserva e rallenta i nemici nel raggio',en:'Observes and slows enemies in range'},
      color:0x4a9eff, cost:40,
      range:2.5, fireRate:1500,
      damage:0, slowFactor:0.5, slowDuration:2500, aoe:true
    },
    fuoco:{
      key:'fuoco',
      name:{it:'Fuoco Alchemico',en:'Alchemic Fire'},
      desc:{it:'Trasmuta: danno ad area medio',en:'Transmutes: medium area damage'},
      color:0xe8c97a, cost:70,
      range:2, fireRate:800,
      damage:8, slowFactor:0, slowDuration:0, aoe:true
    }
  },

  levels:[{
    key:'dormiente', number:1,
    name:{it:'Il Dormiente',en:'The Sleeper'},
    path:[[3,0],[3,1],[6,1],[6,4],[1,4],[1,7],[6,7],[6,10],[3,10],[3,11]],
    waves:[
      [{type:'rabbia',count:5,spacing:1.2}],
      [{type:'rabbia',count:4,spacing:1.0},{type:'paura',count:2,spacing:2.0}],
      [{type:'rabbia',count:6,spacing:0.8},{type:'paura',count:3,spacing:1.5}]
    ],
    availableTowers:['testimone','fuoco'],
    startGold:120, consciousness:10
  }],

  quotes:[
    {it:"La differenza tra un uomo meccanico e uno cosciente è che il primo reagisce, il secondo agisce.",
     en:"The difference between a mechanical man and a conscious one is that the first reacts, the second acts.",
     author:"Salvatore Brizzi"},
    {it:"Non è ciò che ti accade che conta, ma come reagisci a ciò che ti accade.",
     en:"It is not what happens to you that matters, but how you react to what happens to you.",
     author:"Salvatore Brizzi"},
    {it:"Le emozioni negative non hanno alcuna giustificazione, sono solo reazioni meccaniche involontarie.",
     en:"Negative emotions have no justification whatsoever — they are merely involuntary mechanical reactions.",
     author:"Salvatore Brizzi"},
    {it:"Quando entriamo nel Regno, la Bellezza della creazione ci inonda.",
     en:"When we enter the Kingdom, the Beauty of creation floods us.",
     author:"Salvatore Brizzi"},
    {it:"L'osservazione è già di per se stessa portatrice di trasformazione.",
     en:"Observation is in itself a carrier of transformation.",
     author:"Salvatore Brizzi"},
    {it:"Ogni irritazione è un'occasione per svegliarsi.",
     en:"Every irritation is an opportunity to awaken.",
     author:"Salvatore Brizzi"},
    {it:"Se non siamo nella gioia è perché stiamo guardando il mondo con gli occhi della personalità.",
     en:"If we are not in joy, it is because we are looking at the world through the eyes of personality.",
     author:"Salvatore Brizzi"}
  ]
};
