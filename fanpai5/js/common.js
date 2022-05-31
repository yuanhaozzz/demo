var ia = 0;
var site = 0;
var site1 = 0;
$(function () {
  FZ(20, 375);

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 0,
    freeMode: true
  });

  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '童年回忆杀翻牌领大奖',
    type: 56,
    rem: 20 / 375
  });
  var inter = true;
  //换牌
  setInterval(function () {
    if (!inter) {
      return;
    }
    $('.banner').find('div').eq(site).removeClass('init');
    site++;
  }, 300)
  //闪牌
  setInterval(function () {
    if (!inter) {
      $('.banner').find('div').removeClass('active');
      return;
    }
    if (!$('.banner').find('div').hasClass('init')) {

      $('.banner').find('div').eq(site1).addClass('active').siblings('div').removeClass('active');
      site1++;
      if (site1 == 6) {
        site1 = 0;
      }
    }

  }, 1000)

  $(document).ready(function () {
    $(document).on('click', '.m-close', function () {
      window.styleReset();
    });
    $(document).on('click', '.close-btn', function () {
      window.styleReset();
    });
    window.styleReset = function () {
      $('.paibgm').show();
      $('.banner').find('div').addClass('init');
      site = 0;
      site1 = 0;
      inter = true;
    }
    $('.banner').on('click', 'div', function () {
      if (!$('.banner').find('div').hasClass('init')) {
        var startC = hdgg.start();
        if (startC < 0) {
          return;
        }
        var $this = $(this);
				console.log($this)
        $this.hide();
        inter = false;
        $('.zhenotice').show();
        $this.hasClass('paibgm1') ? $('body').append('<img class="biaode" src="https://hdggcdn.bayimob.com/hdggstatic/liuyi/paizi-2.png"/>') :
            $('body').append('<img class="biaode" src="https://hdggcdn.bayimob.com/hdggstatic/liuyi/paizi2-2.png"/>');
        var interbal = setInterval('gaibian()', 100);
        setTimeout(function () {
          clearInterval(interbal);
          $(".biaode").removeClass("zhuan_left").removeClass("zhuan_right");
          $(".biaode").addClass('zhuansi')
        }, 500)
        setTimeout(function () {
          $(".biaode").remove();
          $('.zhenotice').hide();
          hdgg.win();
        }, 800)
      }
    })
    $('.rule').on('click', function () {
      $('.alerty').show();
      $('.zhenotice').show();
    })
    $('body .moresay').on('click', function () {
      $(this).toggleClass('activeadv')
      $('.moresayp').toggle();
    })
    $('.alerty').on('click', '.saclose', function () {
      $('.moresay').removeClass('activeadv');
      $('.moresayp').hide();
      $('.alerty').hide();
      $('.zhenotice').hide();
    })
  })

})

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

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

function gaibian() {
  if (ia == 0) {
    ia = 1;
    $(".biaode").removeClass("zhuan_left");
    $(".biaode").addClass("zhuan_right");
  } else {
    ia = 0;
    $(".biaode").addClass("zhuan_left");
    $(".biaode").removeClass("zhuan_right");
  }
}