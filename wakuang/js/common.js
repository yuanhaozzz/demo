FZ(20, 375);
dayNight();
$('.personRightGo').animate({
  'right': '7.5rem'
}, 1000);
setTimeout(function () {
  $('.personRightGo').stop();
  $('.personRightGo').hide(100);
  $('.machine').addClass('persons');
  $('.prizeZz').show();
  setTimeout(function () {
    $('.prizeZz').hide();
  }, 2000);
  $('.tongs').addClass('activity');
}, 1400);
var times = $('#countZa').text();

var hdgg = new HDGG({
  appkey: getUrlParam('appkey'),
  adSpaceKey: getUrlParam('adSpaceKey'),
  times: times,
  timesEle: '#countZa',
  recordEle: '.jiang',
  name: '现金红包挖到手软',
  type: 42,
  rem: 20 / 375,
  entranceShow: false
  // gamecenterShow: true,
  // gamelistShow: true
});
// if (hdgg.storage.get('leftTimes') == '8') {
//   window.localStorage.removeItem('sui')
// }
// var suiArr = hdgg.storage.get('sui') == undefined ? [] : hdgg.storage.get('sui').split(',');
// if (suiArr instanceof Array && suiArr != '') {
//   for (var i = 0; i < suiArr.length; i++) {
//     $('#danlist').find('li').eq(suiArr[i]).addClass('eggbreak').removeClass('full');
//   }
// }
 
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
var dian = true;
$('.start').on('click', function () {
  if (dian == false) {
    return;
  }
  var startC = hdgg.start();
  if (startC < 0) {
    return;
  }
  $('.start').addClass('started');
  setTimeout(function () {
    $('.start').removeClass('started');
  }, 300);
  $('.DB_guide').hide();
  dian = false;
  $('.persons').addClass('startWa');
  pause();
  var leftg = parseFloat($('.tongs').offset().left / 20);
  var topg = parseFloat($('.tongs').offset().top / 20);
  var sdeg = leftg / topg;
  if (sdeg < 0.730) {
    $('.line').animate({
      'height': '8.02rem'
    }, 1000);
    setTimeout(function () {
      $('.prize1').hide();
      $('.award').addClass('prize11');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize11');
      $('.prize1').show();
    }, 2030)
  } else if (sdeg > 0.730 && sdeg < 0.790) {
    $('.line').animate({
      'height': '13.82rem'
    }, 1000);
    setTimeout(function () {
      $('.prize4').hide();
      $('.award').addClass('prize44');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize44');
      $('.prize4').show();
    }, 2030)
  } else if (sdeg > 0.790 && sdeg < 0.8880) {
    $('.line').animate({
      'height': '8rem'
    }, 1000);
    setTimeout(function () {
      $('.prize2').hide();
      $('.award').addClass('prize22');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize22');
      $('.prize2').show();
    }, 2030)
  } else if (sdeg > 0.8880 && sdeg < 0.8893) {
    $('.line').animate({
      'height': '12.02rem'
    }, 1000);
    setTimeout(function () {
      $('.prize5').hide();
      $('.award').addClass('prize55');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize55');
      $('.prize5').show();
    }, 2030)
  }
  else if (sdeg > 0.8893 && sdeg < 0.8902) {
    $('.line').animate({
      'height': '15.02rem'
    }, 1000);
    setTimeout(function () {
      $('.prize6').hide();
      $('.award').addClass('prize66');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize66');
      $('.prize6').show();
    }, 2030)
  } else if (sdeg > 0.8902) {
    $('.line').animate({
      'height': '8.82rem'
    }, 1000);
    setTimeout(function () {
      $('.prize3').hide();
      $('.award').addClass('prize33');
    }, 1010);
    setTimeout(function () {
      $('.line').animate({
        'height': '3.02rem'
      }, 1000);
    }, 1020);
    setTimeout(function () {
      $('.award').removeClass('prize33');
      $('.prize3').show();
    }, 2030)
  }
  // 广告
  setTimeout(function () {
    hdgg.win({
      success: function (res) {
        if(Math.floor(Math.random()*100+1)>50) {
        	alertCommon(res.ad.imageUrl);
        }else {
        	alertCommon1(res.ad.imageUrl, res.ad.advIntro)
        }
        
        closeBtn(res);
        closeGo(res);
      }
    });
    $('.start').show();
    $('.DB_guide').show();
    dian = true;
    play();
    $('.persons').removeClass('startWa');
  }, 2030)
})
$('body').on('click', '.m-close', function () {
  $('.ox-catch').hide();
  $('.rope-catch').hide();
  $('.rope-break ').show();
})
//左上角宝箱
$('.leftPrize').click(function () {
  $('.prizeZz').show()
});
$('.closePrizeList').click(function () {
  $('.prizeZz').hide()
});

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

function alertCommon(imageUrl) {
		var strs =
			'<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="showPrize-dialog modal-body"><div class="tgBg"><div class="yanhua"></div><div class="zhongjiang"></div></div><div class="leftDeng"></div><div class="rightDeng"></div><div class="pig"></div><div class="adv"><div class="boxImg"><img src="'+imageUrl+'"/></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><div class="bottomLeft"></div><div class="bottomRight"></div><div class="topYun"></div><div class="lingqu"></div></div>'
		$('body').append(strs);
		setTimeout(function() {
			$('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
		}, 1500)
		setTimeout(function() {
			$('.pig').show()
			$('.leftDeng').show()
			$('.rightDeng').show()
			$('.adv').animate({'height':'10.725rem'},500),
			$('.adv img').animate({'height':'100%'},500)
		},400)
		 $('.bottomLeft').animate({'left':'0rem'},500)
		 $('.bottomRight').animate({'right':'0rem'},500)
		 $('.topYun').animate({'right':'0rem'},500)
		  
	}
	function alertCommon1(imageUrl, advIntro) {
	  var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
	  $('body').append(strs);
	  setTimeout(function () {
	    $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
	  }, 1500)
	}

function closeBtn(res) {
  $('#dialog5').on('click', '.close-btn', function () {
    res.close();
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
  })
}

function closeGo(res) {
		$('.lingqu,.btnJiang').on('click', function() {
			res.click();
		})
		$('.popShowPrize img').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var imgs = 1;
			res.click(imgs);
		})
	}

function dayNight() {
  var now = new Date();
  var hour = now.getHours();
  if (hour < 18 || hour > 6) {
    $('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang1/bg.jpg)');
    $('#starBox').hide();
  } else {
    $('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang1/bg2.jpg)');
    $('#starBox').show();
  }
}

//解决动画暂停问题
var container = document.querySelector('.tongs');

function pause() {
  var cTransform = getComputedStyle(container).transform;
  container.style.transform = cTransform;
  //动画叠加
  // container.style.transform = cTransform === 'none'
  //     ? cTransform
  //     : cTransform.concat(' ', cTransform);
  container.classList.remove('activity');
}

function play() {
  container.classList.add('activity');
}
