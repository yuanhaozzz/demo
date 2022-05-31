$(function() {
	FZ(20,375)
	var flag = false;
	var hdgg = new HDGG({
	appkey: getUrlParam('appkey'),
	adSpaceKey: getUrlParam('adSpaceKey'),
	times: 8,
	timesEle: '#countZa',
	recordEle: '.jiang',
	name: '买冰棍1',
	type: 491,
	rem: 20 / 375,
	entranceShow: true,     //左上角
	gamecenterShow: true,   //右下角
	gamelistShow: true    //次数用光大弹窗
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
  
var url = 'https://hdggcdn.bayimob.com/hdggstatic/zadan21/noClick.svga';
  function svga () {
	  var displayObjects = new SVGA.CreatejsPlayer(url);
	  						displayObjects.onError(function(err) {
	  						console.error(err)
	  						
	  						})
	  						displayObjects.setFrame(0, 0, 750,1334)
	  						var stages = new createjs.Stage('newdemoCanvas');
	  						stages.addChild(displayObjects);
  }
  svga()
$('.start,.clickQiu').on('click',function() {
	var startC = hdgg.start();
	if(startC<0) {
		return
	}
	if(flag) {
		return
	}
	flag = true;
	$('.start').animate({'top':'20.5rem'},100,function() {
		$('.counts').hide()
		$('.hand').hide()
	})
	$('#newdemoCanvas').remove()
	$('.qiqiuBox').append('<canvas id="newdemoCanvas" class="tip" width="750" height="1334"  style="position: absolute;top: -3.3rem;left: 0rem;width: 18.75rem;height: 33.35rem;"></canvas>')
	url = 'https://hdggcdn.bayimob.com/hdggstatic/zadan21/click.svga';
	svga()
	setTimeout(function() {
		// alert(22)
		hdgg.win({
		success: function (res) {
			// alert(11)
			alertCommon(res.ad.imageUrl, res.ad.advIntro);
			closeBtn(res);
			closeGo(res);
		}
		});
		 $('#newdemoCanvas').hide()
		 flag = false;
	},2000)
	
})

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
      window.styleReset()
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
	  debugger
    })
  }
window.styleReset = function () {
  $('#dialog5').addClass('hidem');
  $('#dialog5').remove();
  $('.counts,.hand').show()
  $('.start').css('top','19.5rem')
   $('#newdemoCanvas').remove()
   $('.qiqiuBox').append('<canvas id="newdemoCanvas" class="tip" width="750" height="1334"  style="position: absolute;top: -3.3rem;left: 0rem;width: 18.75rem;height: 33.35rem;"></canvas>')
   url = 'https://hdggcdn.bayimob.com/hdggstatic/zadan21/noClick.svga';
   svga()
}					
})