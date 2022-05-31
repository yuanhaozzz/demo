$(function () {
  FZ(20, 375);
  


  function FZ(a, b) {
    function getFZ() {
      var width = document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 750) {
        width = 750;
      }
      var fontSize = (a / b) * width;
      return fontSize;
    };
    document.documentElement.style.fontSize = getFZ() + "px";
    window.onresize = function () {
      setTimeout(function () {
        document.documentElement.style.fontSize = getFZ() + "px";
      }, 100);
    };
  };

   
   

   
   
})