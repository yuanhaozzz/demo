var ia = 0;
var site = 0;
var site1 = 0;
$(function () {
  FZ(20, 375);

  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,//可选选项，自动滑动
    speed:300,
    loop : true,
  })


  //var times = $('#countZa').text();
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '摇骰子中流量（无跳转）',
    type: 111,
    rem: 20 / 375,
    noRedpacket: true,
    entranceShow: false,     //左上角
    gamecenterShow: false,   //右下角
    gamelistShow: false    //次数用光大弹窗
  });
  var win = (parseInt($(".couten").css("width"))) - 60;
  var ads = true;
  var num = 0;
  var inter = true;

  var dian = true;
  $(document).ready(function () {
    var act = 2;
    $('.yezipiao1').animate({
          right: '2rem',
          top: '2rem'
        },
        4000);
    $('.yezipiao2').animate({
          left: '1.4rem',
          top: '5.5rem'
        },
        4000);
    $('.yezipiao3').animate({
          left: '2.4rem',
          top: '6.5rem'
        },
        4000);
    $('.yezipiao4').animate({
          left: '4rem',
          top: '7.6rem'
        },
        4000);
    $('.yezipiao5').animate({
          right: '3.75rem',
          top: '15.8rem'
        },
        4000);
    $('.yezipiao6').animate({
          right: '1.5rem',
          top: '19.5rem'
        },
        4000);
    $('.yezipiao7').animate({
          right: '3.5rem',
          top: '23.5rem'
        },
        4000);
    $('.yezipiao8').animate({
          left: '1.5rem',
          top: '21.5rem'
        },
        4000);
    $('.yanzileft').animate({
          left: '1.7rem',
          top: '17.25rem'
        },
        2000);
    $('.yanziright').animate({
          right: '1.2rem',
          top: '6.15rem'
        },
        1500);

    $('.starta,.saizi').on('click', function () {

      if (dian == false) {
        return;
      }
      var startC = hdgg.start();
      if (startC < 0) {
        return;
      }

      act = randomNum(1, 5);
      console.log(act);
      $('.DB_guide').hide();
      $('.starta').addClass('startb');
      $('.saizi').removeClass('saizihuang').addClass('moving');
      setTimeout(function () {
        $('.saizi').removeClass('moving').addClass('act' + act);
      }, 1500)
      dian = false;
      setTimeout(function () {
        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro, act, res.ad.receiveText);
            closeBtn(res, act)
            closeGo(res)
          }
        });
        $('.starta').removeClass('startb');
        dian = true;
      }, 2000)

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

    function alertCommon(imageUrl, advIntro, act, txt) {
      var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg""><img src="' + imageUrl + '" alt=""></div><div class="red-bg"></div><div class="yanzi"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto">' + txt + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
      $('body').append(strs);
      setTimeout(function () {
        $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
      }, 1500)
      setTimeout(function () {
        $('#dialog5').append('<div class="saizialert act' + act + '"></div>');
      }, 500)

    }

    function closeBtn(res, act) {
      $('#dialog5').on('click', '.m-close,.close-btn', function () {
        res.close();
        window.styleReset();
      })
    }

    window.styleReset = function () {
      $('#dialog5').addClass('hidem');
      $('#dialog5').remove();
      $('.saizi').addClass('saizihuang').removeClass('act' + act);
      $('.DB_guide').show();
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

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

