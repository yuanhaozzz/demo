var ia = 0;
var site = 0;
var site1 = 0;
$(function () {
  FZ(20, 375);

  // var swiper = new Swiper('.swiper-container', {
  //   slidesPerView: 5,
  //   spaceBetween: 0,
  //   freeMode: true
  // });

  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '冬季翻牌',
    type: 161,
    rem: 20 / 375,
    entranceShow: true,     //左上角
    gamecenterShow: true,   //右下角
    gamelistShow: true    //次数用光大弹窗
  });

  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  if (isWeiXin()) {
    $('#hdgg-left-float-image').hide()
  }
  var inter = true;
  //换牌
  setInterval(function () {
    if (!inter) {
      return;
    }
    $('.banner').find('.paibgm').eq(site).removeClass('init');
    site++;
  }, 300)
  //闪牌
  setInterval(function () {
    if (!inter) {
      $('.banner').find('.paibgm').removeClass('active');
      return;
    }
    if (!$('.banner').find('.paibgm').hasClass('init')) {

      $('.banner').find('.paibgm').eq(site1).addClass('active').siblings('.paibgm').removeClass('active');
      site1++;
      if (site1 == 6) {
        site1 = 0;
      }
    }

  }, 1000)

  // $(document).ready(function () {
  // $(document).on('click', '.m-close', function () {
  //   window.styleReset();
  // });
  // $(document).on('click', '.close-btn', function () {
  //   window.styleReset();
  // });
  window.styleReset = function () {
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
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
      $this.hide();
      inter = false;
      $('.zhenotice').show();
      $('body').append('<img class="biaode" src="https://hdggcdn.bayimob.com/hdggstatic/fanpai18/1.gif"/>');
      setTimeout(function () {
        $(".biaode").remove();
        $('.zhenotice').hide();
        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro);
            closeBtn(res);
            closeGo(res);
          }
        });
      }, 500)
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

// })

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

function alertCommon(imageUrl, advIntro) {
  var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
  $('body').append(strs);
  setTimeout(function () {
    $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
  }, 1500)
}

function closeBtn(res) {
  $('#dialog5').on('click', '.close-btn', function () {
    res.close();
    window.styleReset();
  })
}

function closeGo(res) {
  $('.goto').on('click', function () {
    res.click();
  })
  $('.showPrize-dialog img').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgs = 1;
    res.click(imgs);
  })
}

// function gaibian() {
//   if (ia == 0) {
//     ia = 1;
//     $(".biaode").removeClass("zhuan_left");
//     $(".biaode").addClass("zhuan_right");
//   } else {
//     ia = 0;
//     $(".biaode").addClass("zhuan_left");
//     $(".biaode").removeClass("zhuan_right");
//   }
// }