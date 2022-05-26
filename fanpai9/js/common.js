var ia = 0;
var site = 0;
var site1 = 0;
var _this = null;
var imgIndex = 5;
$(function () {
  FZ(20, 375);

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 4.5,
    spaceBetween: 10,
    freeMode: true
  });
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '皇上该翻牌了',
    type: 70,
    rem: 20 / 375,
    entranceShow: true,     //左上角
    gamecenterShow: true,   //右下角
    gamelistShow: true    //次数用光大弹窗
  });
  var inter = true;

  setInterval(function () {
    if (!inter) {
      return;
    }
    $('.banner').find('div').eq(site).removeClass('init');
    site++;
  }, 300)
  setTimeout(function () {
    $('.banner,.counts').addClass('addRock');
  }, 2000)
  setTimeout(function () {
    $('.banner,.counts').removeClass('addRock');
  }, 4000)
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
    $(document).on('click', '.m-close,.close-btn', function () {
      window.styleReset();
    });
    window.styleReset = function () {
      $('.paibgm').show();
      // if ($('#countZa').text() === '0') {
      //   return
      // }
      $('.banner').find('div').addClass('init');
      setTimeout(function () {
        $('.banner,.counts').addClass('addRock');
      }, 2000)
      setTimeout(function () {
        $('.banner,.counts').removeClass('addRock');
      }, 4000)
      site = 0;
      site1 = 0;
      inter = true;
    }
    var imgArr = [
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi1.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi2.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi3.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi4.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi5.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi6.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi7.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi8.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi9.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi10.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi11.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi12.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi13.png',
      'https://hdggcdn.bayimob.com/hdggstatic/fanpai9/paizi14.png',
    ];
    $('body').find('.swiper-slide:last-child').css({'width': '1px', 'margin-right': '1px'});
    $('.banner').on('click', 'div', function () {
      if (!$('.banner').find('div').hasClass('init')) {
        var startC = hdgg.start();
        if (startC < 0) {
          return;
        }
        $('.banner,.counts').removeClass('addRock');
        $(this).hide();
        imgIndex++;
        imgIndex = imgIndex > 13 ? 0 : imgIndex;
        _this = $(this);
        inter = false;
        $('.zhenotice').show();
        var theBg = $(this).css("backgroundImage").replace('url(', '').replace(')', '').split('"')[1] ||
            $(this).css("backgroundImage").replace('url(', '').replace(')', '').split('"')[0];
        $('body').append('<img class="biaode" src="' + theBg + '"/>');
        var interbal = setInterval('gaibian()', 100);
        setTimeout(function () {
          clearInterval(interbal);
          $(".biaode").removeClass("zhuan_left").removeClass("zhuan_right");
          $(".biaode").addClass('zhuansi')
        }, 500)
        setTimeout(function () {
          $(".biaode").remove();
          _this.css("background-image", "url(" + imgArr[imgIndex] + ")");
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