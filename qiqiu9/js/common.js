var ia = 0;
var site = 0;
var site1 = 0;
$(function () {
  FZ(20, 375);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '齐彩网络审核',
    type: 407,
    rem: 20 / 375,
    entranceShow: true,     //左上角
    gamecenterShow: true,   //右下角
    gamelistShow: true    //次数用光大弹窗
  });
  var activeshou = 0;

  function active() {
    $('.DB_guide').removeClass('active')
    $('.DB_guide').eq(activeshou).addClass('active');
    activeshou++;
    if (activeshou == 4) {
      activeshou = 0;
    }
    setTimeout(active, 1000);
  }

  setTimeout(active, 1000);
  $('.qiu').on('click', function () {
    var startC = hdgg.start();
    if (startC < 0) {
      return;
    }
    if ($('.qiu').is(':hidden')) {
      return;
    }
    var index = $(this).index();
    $(this).hide();
    $('.bao').eq(index).show();
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          alertCommon(res.ad.imageUrl, res.ad.advIntro, res.ad.receiveText);
          closeBtn(res);
          closeGo(res);
        }
      });
    }, 1000)
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
  $('body').on('click', '.m-close', function () {
    $('.qiu').show();
    $('.bao').hide();
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

window.styleReset = function () {
  $('#dialog5').addClass('hidem');
  $('#dialog5').remove();
  $('.qiu').show();
  $('.bao').hide();
}

function alertCommon(imageUrl, advIntro, txt) {
  var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg""><img src="' + imageUrl + '" alt=""></div><div class="red-bg"></div><div class="red-bg1"></div></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto">' + txt + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
  $('body').append(strs);
  setTimeout(function () {
    $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
  }, 1500)
}

function closeBtn(res) {
  $('#dialog5').on('click', '.close-btn,.m-close', function () {
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