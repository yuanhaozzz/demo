$(function () {
  var danindex = 0;
  var dansuiSwitch = true;
  var suiArr = null;
  FZ(20, 375);
  jindanAnimation('beat', '.full', 1000);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '金日大吉红包送你（熊猫看书）',
    type: 184,
    rem: 20 / 375,
    txEntranceShow: true
    // entranceShow: false,     //左上角
    // gamecenterShow: true,   //右下角
    // gamelistShow: true    //次数用光大弹窗
  });
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1.5,
    spaceBetween: 0,
    freeMode: true
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
      window.localStorage.removeItem('sui')
    }
    suiArr = !hdgg.storage.get('sui') ? [] : hdgg.storage.get('sui');
    if (suiArr instanceof Array) {
      for (var i = 0; i < suiArr.length; i++) {
        $('#danlist').find('li').eq(suiArr[i]).addClass('eggbreak').removeClass('full');
      }
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
  $('body .saclose').on('click', function () {
    $('.moresay').removeClass('activeadv');
    $('.moresayp').hide();
    $('.alerty').hide();
    $('.zhenotice').hide();
  })
  var zaload = true;
  $('#danlist .full').on('click', function () {
    if (zaload == false) {
      return;
    }
    var obj = $(this);

    if (obj.hasClass('eggbreak')) {
      return;
    }

    var eggOffset = $(this).offset();
    var eggWidth = $(this).width();
    var windowWidth = $(window).width();
    var left = windowWidth - eggWidth - eggOffset.left;
    var count = $('#countZa').text();
    var startC = hdgg.start();
    var index = $(this).index();
    if (startC < 0) {
      return;
    }
    if (count == 0) {
      return;
    }
    if (suiArr instanceof Array) {
      suiArr.push(index);
      hdgg.storage.set('sui', suiArr);
    }
    dansuiSwitch = false;
    obj.removeClass('full').removeClass('beat');
    zaload = false;
    $(".chuizi").animate({top: eggOffset.top - 30, right: left - 30}, 1200, function () {
      obj.addClass('eggbreak');
      setTimeout(function () {
        $(".chuizi").css({top: '10.0rem', right: 0})
      }, 1100)
      setTimeout(function () {
        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro);
            closeBtn(res)
            closeGo(res)
          }
        });
        zaload = true;
      }, 1200);
      danindex = 0;
    });
  })
  $('body').on('click', '.m-close,.close-btn', function () {
    dansuiSwitch = true;
  })

  function jindanAnimation(aniClass, son, time) {
    var eggint = setInterval(function () {
      if (dansuiSwitch == true) {
        danindex = danindex == $('#danlist').find('.full').length ? 0 : danindex;
        $('#danlist').find('.full').eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
        danindex++;
      } else {
        $('#danlist').find('.full').removeClass(aniClass);
      }
      if ($('#danlist').find('.full').length == 1) {
        $('#danlist').find('.full').removeClass(aniClass).addClass('beat1');
      }


    }, time);
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

window.styleReset = function () {
  $('#dialog5').addClass('hidem');
  $('#dialog5').remove();
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