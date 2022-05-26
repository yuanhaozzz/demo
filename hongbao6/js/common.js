FZ(20, 375);
//倒数计时
// var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// var isAndroida = window.sessionStorage.getItem('isAndroid') || '';
// var appname = /appname/;
// if (!(appname.test(u)&&isAndroida=='')) {
//     $('div').
//     css('-webkit-tap-highlight-color','rgba(0, 0, 0, 0)');
// }
var num = 0;
var numz = 4;
$(function () {
  var backward = function () {
    numz--;
    if (numz > 0) {
      $(".backward span").html(numz);
    } else {
      $(".backward").hide();
      return;
    }
    setTimeout(backward, 500)
  }
  var ads = true;
  var times = $('#countZa').text();
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: times,
    timesEle: '#countZa',
    recordEle: '#prize',
    name: '红包雨（熊猫看书）',
    type: 181,
    rem: 20 / 375,
    txEntranceShow: true,
    flyTop:false,
    redEnvelopeShow:false
  });
	
	$('.banyuan').on('click',function() {
	$('.banyuan').hide()
	$('.lanse').show()
	})
	$('#quxiao').on('click',function() {
	$('.lanse').hide()
	$('.banyuan').show()
	})
	
  // var swiper = new Swiper('.swiper-container', {
  //   slidesPerView: 4,
  //   spaceBetween: 20,
  //   freeMode: true
  // });
  $('#rule').on('click', function () {
    $('.alerty').show();
    $('.zhenotice').show();
  })
  $('.moresay').on('click', function () {
    $(this).toggleClass('activeadv')
    $('.moresayp').toggle();
  })
  $('body').on('click', '.m-close', function () {
    $('.guang').hide();
    numz = 4;
    num = 0;
    clearTimeout(backward);
  })
  $('.saclose').on('click', function () {
    $('.moresay').removeClass('activeadv');
    $('.moresayp').hide();
    $('.alerty').hide();
    $('.zhenotice').hide();
  })
  $('.guang').on('click', function (e) {
    e.stopPropagation();
  })
  window.styleReset = function () {
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
    // $('.guang').hide();
    // $('#start').show();
    // $('.count').show();
    // $('.startlv').show();
    // $('#start').removeClass('active2');
    // ads = false;
    flag = true;
    // $('.couten').empty();
  };
  var flag = true;
  $('.couten').on('click', function () {
    if (!flag) {
      return
    }
    var startc = hdgg.start();
    if (startc < 0) {
      return;
    }
    flag = false;
    hdgg.win({
      success: function (res) {
        alertCommon(res.ad.imageUrl, res.ad.advIntro);
        closeBtn(res);
        closeGo(res);
      }
    });
  });


  var win1 = (parseInt($(".couten").width())) - 60;
  // $("li").css({});
  // 点击确认的时候关闭模态层
  // $(".sen a").click(function () {
  //   $(".mo").css("display", "none")
  //   ads = false;
  // });

  // var del = function () {
  //   nums++;
  //   //					console.info(nums);
  //   //					console.log($(".li" + nums).css("left"));
  //   $(".li" + nums).remove();
  //   setTimeout(del, 200)
  // }

  var add = function () {
    var hb = parseInt(Math.random() * (3 - 1) + 1);
    var Wh = parseInt(Math.random() * (70 - 30) + 20);
    var Left = parseInt(Math.random() * (win1 - 0) + 0);
    var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
    //				console.log(rot)
    if (ads == true) {
      num++;
      $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='https://hdggcdn.bayimob.com/hdggstatic/moneyhb_" + hb + ".png'></a></li>");
      $(".li" + num).css({
        "left": Left,
      });
      $(".li" + num + " a img").css({
        "width": Wh,
        "transform": "rotate(" + rot + ")",
        "-webkit-transform": "rotate(" + rot + ")",
        "-ms-transform": "rotate(" + rot + ")",
        /* Internet Explorer */
        "-moz-transform": "rotate(" + rot + ")",
        /* Firefox */
        "-webkit-transform": "rotate(" + rot + ")",
        /* Safari 和 Chrome */
        "-o-transform": "rotate(" + rot + ")" /* Opera */
      });
      $(".li" + num).animate({
        'top': $(window).height() + 20
      }, 4800, function () {
        //删掉已经显示的红包
        this.remove()
      });
    } else {
      $(".couten").empty();
      return;
    }


    //点击红包的时候弹出模态层
    // $(".li" + num).click(function () {
    //   $(".mo").css("display", "block")
    // });
    setTimeout(add, 350)
  }

  //增加红包

  // $('#start').on('click', function () {
  // if ($('#countZa').text() == 0) {
  //   hdgg.start();
  //   return;
  // }
  // $('#start').hide();
  // $('.count').hide();
  // $('.startlv').hide();
  // num = 0;
  // numz = 4;
  // ads = true;
  $(".backward").show();
  setTimeout(backward, 100);
  setTimeout(function () {
    $('.guang').show();
  }, 1500)
  setTimeout(add, 1500);
});

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
  });
  $('.showPrize-dialog .card-bg img').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgs = 1;
    res.click(imgs);
  })
}