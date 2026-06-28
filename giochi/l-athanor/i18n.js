window.ATHANOR_I18N={
  STR:{
    school:    {it:'Scuola ContattaTi',en:'School ContattaTi'},
    backToSite:{it:'Torna al sito',en:'Back to site'},
    gameTitle: {it:"L'Athanor",en:'The Athanor'},
    themeDark: {it:'Tema scuro',en:'Dark theme'},
    themeLight:{it:'Tema chiaro',en:'Light theme'}
  },
  makeT:function(getLang){
    var S=window.ATHANOR_I18N.STR;
    return function(k){
      var s=S[k]; if(!s)return k;
      var l=getLang();
      return s[l]!=null?s[l]:(s.it||k);
    };
  }
};
