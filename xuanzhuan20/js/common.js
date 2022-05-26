var totalTime = 8;
var useTime = 0;
// var tuNum = 0;
var $first = null;
var $second = null;
var $third = null;
$(function () {
  FZ(20, 375);

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 4.5,
    spaceBetween: 10,
    freeMode: true
  });
  $('body').find('.swiper-slide:last-child').css({'width': '1px', 'margin-right': '1px'});
 
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '幸运砸蛋，红包送你（熊猫看书）',
    type: 182,
    rem: 20 / 375,
    txEntranceShow: true
  });
	$('.banyuan').on('click',function() {
		$('.banyuan').hide()
		$('.lanse').show()
		})
		$('#quxiao').on('click',function() {
		$('.lanse').hide()
		$('.banyuan').show()
	
		})
  setTimeout(function () {
    if (hdgg.storage.get('leftTimes') == '8') {
      window.localStorage.removeItem('useTime')
    }
  })
  var dian = true;
  $('.starta,.xiangziBox').on('click', function () {
    if (!dian) {
      return;
    }
    var startC = hdgg.start();
    if (startC < 0) {
      return;
    }
    $('.chuizi').animate({'right': '3.9rem', 'top': '9.25rem'});
    setTimeout(function () {
      $first = $($('.xiangziBox').children()).eq(0);
      $second = $($('.xiangziBox').children()).eq(1);
      $third = $($('.xiangziBox').children()).eq(2);
      $first.addClass('ddong');
      $first.addClass('eggbreak');
    }, 1500)
    $('.DB_guide').hide();
    dian = false;
    $('.starta').addClass('startb');
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          alertCommon(res.ad.imageUrl, res.ad.advIntro);
          closeBtn(res)
          closeGo(res)
        }
      });
      $('.starta').removeClass('startb');
      dian = true;
    }, 1600);
  });
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

  function alertCommon(imageUrl, advIntro) {
    var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
    $('body').append(strs);
    setTimeout(function () {
      $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
    }, 1500)
  }

  function closeBtn(res) {
    $('#dialog5').on('click', '.m-close,.close-btn', function () {
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

  window.styleReset = function () {
    $('.DB_guide').show();
    $first.addClass('ddong');
    $('#dialog5').addClass('hidem');
    $first.removeClass('ddong');
    $('.chuizi').animate({'right': '0.9rem', 'top': '9rem'});
    setTimeout(function () {
      $first.animate({
        "left": "9%",
        "top": "11.5rem",
        "width": "9.1rem",
        "height": "10.5rem",
        "z-index": '0',
        "background-size": '90%'
      }, 100);
    }, 200);
    setTimeout(function () {
      $second.animate({
        "left": "45%",
        "top": "12.5rem",
        "width": "9.1rem",
        "height": "9.8rem",
        "background-size": '90%'
      }, 100);
    }, 300);
    setTimeout(function () {
      $third.animate({
        "left": "25%",
        "top": "11.3rem",
        "width": "9.1rem",
        "height": "10.5rem",
        "z-index": '2',
        "background-size": '100%'
      }, 150);
    }, 100);
    $third.insertBefore($first);
    $($('.xiangziBox').children()).eq(1);
    $($('.xiangziBox').children()).eq(0).removeClass('eggbreak');
    $($('.xiangziBox').children()).eq(2).removeClass('eggbreak');
    $('#dialog5').remove();
    $('.DB_guide').show();
  }
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

//跳转到其他渠道
$(document).on('click', '.reLocal', function () {
  if (useTime < 5) return;
  window.location.href = '../lists2/index.html' + location.search;
});


