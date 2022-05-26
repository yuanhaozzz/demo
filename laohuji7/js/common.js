FZ(20, 375);
//alertCommon('https://alicdn.bayimob.com/hdggAdv/2176/102/20171212170227_231.gif','全民炸金花-ios七派娱乐')
var dansuiSwitch = true;
var times = $('#countZa').text();
var hdgg = new HDGG({
  appkey: getUrlParam('appkey'),
  adSpaceKey: getUrlParam('adSpaceKey'),
  times: times,
  timesEle: '#countZa',
  recordEle: '.jiang',
  name: '疯狂老虎机（有音乐）',
  type: 276,
  rem: 20 / 375
});
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 20,
  freeMode: true
});

var contain = 1;
var arrser = [1, 2, 3, 2, 1, 1, 3, 3, 2, 1];
var alertStr = ''
$('.real').eq(0).addClass('ahover1');
var sa = setInterval(function () {
  var obj = $('.real');
  var random_1 = Math.random() + "";
  var ran = random_1.charAt(3);
  if (contain == 0) {
    obj.removeClass('ahover1').removeClass('ahover2').removeClass('ahover3');
  }
  obj.eq(contain).addClass('ahover' + arrser[ran]);
  contain++;
  contain = contain == 3 ? 0 : contain;
}, 6000);
$('.music').addClass('musicstop');
$('.music').on('click', function () {

  var audio = document.getElementById('audioObj');
  if ($(this).hasClass('musicstop')) {
    $(this).removeClass('musicstop');
    audio.play();
  } else {
    $(this).addClass('musicstop');
    audio.pause();
  }

})
// document.addEventListener('DOMContentLoaded', function () {
// 	function audioAutoPlay() {
// 		var audio = document.getElementById('audioObj');
// 		audio.play();
// 		document.addEventListener("WeixinJSBridgeReady", function () {
// 			audio.play();
// 		}, false);
// 		document.addEventListener("touchstart", function () {
// 			audio.play();
// 		}, false);
// 	}
// 	audioAutoPlay();
// });
document.addEventListener('touchstart', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('audioObj');
            audio.play();
    }
    audioAutoPlay();
});
 
var hongbao = true;
var dian = true;
var res = {};
$('body').on('click', '.start', function () {
  if (dian == false) {
    return;
  }
   $('.start').removeClass('start1');
   $(this).removeClass('start').addClass('startc');
	  
    $('.lagan').removeClass('lagan').addClass('lanGif')
  var startC = hdgg.start();
  if (startC < 0) {
    return;
  }
  dian = false;
  // hongbaoyu();
  // $('.couten').show();

//   setTimeout(function () {
//     $('.couten').hide();
//     $('.couten').empty();
//     //console.log(hongbao);
//   }, 3000);

  window.clearInterval(sa);
  $('.real').removeClass('ahover1');
  $('.real').removeClass('ahover2');
  $('.real').removeClass('ahover3')

  setTimeout(function () {
    $('.real').eq(0).css({
      top: '-2.6rem',
      transition: 'top 3s linear 0s'
    })
    $('.real').eq(1).css({
      top: '-2.6rem',
      transition: 'top 3s linear 0.5s'
    })
    $('.real').eq(2).css({
      top: '-2.6rem',
      transition: 'top 3s linear 1s'
    })

    setTimeout(function () {
      $(".real").eq(0).removeAttr("style");
      // $('.startc').addClass('start1');
      $('.startc').removeClass('startc').addClass('start');
    }, 2000)
    setTimeout(function () {
      $(".real").eq(1).removeAttr("style");
    }, 2500)
    setTimeout(function () {
			$('.lanGif').removeClass('lanGif').addClass('lagan')
     $('.startc').removeClass('startc').addClass('start');

      $(".real").eq(2).removeAttr("style");
      var sa = setInterval(function () {
        var obj = $('.real');
        var random_1 = Math.random() + "";
        var ran = random_1.charAt(3);
        if (contain == 3) {
          obj.removeClass('ahover1').removeClass('ahover2').removeClass('ahover3');
        }

        obj.eq(contain).addClass('ahover' + arrser[ran]);
        contain++;
        contain = contain == 3 ? 0 : contain;
      }, 6000);

      hdgg.win({
        success: function (res) {
          // console.log(res)
          alertCommon(res.ad.imageUrl, res.ad.advIntro, res.ad.receiveText);
          $('.close-btn').on('click', function () {
            res.close();
            $('#dialog5').addClass('hidem');
            setTimeout(function () {
              $('#dialog5').remove();
            }, 500)
          })
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
      });
      dian = true;
    }, 4000)
  }, 1000)
})
// $('body').on('click','.closetc',function(){
// 	res.close();
// 	$()
// })

// setInterval(function(){
// 	$('.deng1').find('li').addClass('dengc')
// },1000)

$('.rule').on('click', function () {
  $(this).addClass('adctive');
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
  $('.rule1').removeClass('adctive');
})
//$('deng1').find('li').eq(0).addClass('dengc').siblings('li').removeClass('dengc');
jindanAnimation('.deng1', 'li', 'dengc', 'li', 1000);
jindanAnimation('.deng2', 'li', 'dengc', 'li', 1000);
jindanAnimation('.deng3', 'li', 'dengc', 'li', 1000);
jindanAnimation('.deng4', 'li', 'dengc', 'li', 1000);

//$('deng1').find('li').eq(0).addClass('dengc').siblings('li').removeClass('dengc');


function jindanAnimation(ele, child, aniClass, son, time) {
  var danindex = 0;
  var eggint = setInterval(function () {
    danindex = danindex == $(ele).find(child).length ? 0 : danindex;
    $(ele).find(child).eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
    danindex++;

  }, time);
}

function hongbaoyu() {

  var win = (parseInt($(".couten").css("width"))) - 60;
  $(".couten").css("height", $(document).height());

  $(".couten").css({
    'position': 'absolute',
    'z-index': '3',
    'top': '20%',
    'left': '0'
  })
  $("li").css({});
  // 点击确认的时候关闭模态层
  var del = function () {
    nums++;
    $(".li" + nums).remove();
    setTimeout(del, 200)
  }

  var add = function () {

    //console.log(hongbao);
    if (hongbao == false) {
      return;
    }

    var hb = parseInt(Math.random() * (3 - 1) + 1);
    var Wh = parseInt(Math.random() * (70 - 50) + 20);
    var Left = parseInt(Math.random() * (win - 0) + 0);
    var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
    //				console.log(rot)
    num++;
    $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='https://hdggcdn.bayimob.com/hdggstatic/tiggerhb_" + hb + ".png'></a></li>");
    $(".li" + num).css({
      "left": Left,
    });
    $(".li" + num + " a img").css({
      "width": Wh,
      "transform": "rotate(" + rot + ")",
      "-webkit-transform": "rotate(" + rot + ")",
      "-ms-transform": "rotate(" + rot + ")", /* Internet Explorer */
      "-moz-transform": "rotate(" + rot + ")", /* Firefox */
      "-webkit-transform": "rotate(" + rot + ")", /* Safari 和 Chrome */
      "-o-transform": "rotate(" + rot + ")" /* Opera */
    });
    $(".li" + num).animate({'top': $(window).height() + 20}, 2500, function () {
      //删掉已经显示的红包
      this.remove()
    });
    setTimeout(add, 200)
  }

  //增加红包
  var num = 0;
  setTimeout(add, 200);
}


function alertCommon(imageUrl, advIntro, txt) {
  var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="card-sunshine"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="alertheader"></div><div class="card-bg" ><div class="alertname">' + advIntro + '</div><img src="' + imageUrl + '" alt=""></div><div class="red-bg"></div><div class="detail"><div class="goto">' + txt + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><span class="close-btn closetc iconfont"></span></div>';
  $('body').append(strs);
}


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