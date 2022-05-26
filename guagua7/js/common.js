FZ(20, 375);
var times = $('#count').text();
var hdgg = new HDGG({
	appkey: getUrlParam('appkey'),
	adSpaceKey: getUrlParam('adSpaceKey'),
	times: times,
	timesEle: '#count',
	recordEle: '.jiang',
	name: '刮开专属福利微信',
	type: 271,
	rem: 20 / 375,
	entranceShow: false, //左上角
	gamecenterShow: false, //右下角
	gamelistShow: false //次数用光大弹窗
});
var swiper = new Swiper('.swiper-container', {
	slidesPerView: 4,
	spaceBetween: 20,
	freeMode: true
});
var countAd = hdgg.times;
if (countAd == 0) {
	$('#over').show();

	$('#point').hide();
	$('.zhanshi').hide();
}
var guaShadow = '<div id="imgad"><img src="https://hdggcdn.bayimob.com/hdggstatic/guagua3/guajiangqu.png">' +
	'</div><img id="redux" src="https://hdggcdn.bayimob.com/hdggstatic/guagua3/guajiangqu.png">';
$('#guaqu').append(guaShadow);
$('body').on('click', '.rule', function () {
	$('.alerty').show();
	$('.zhenotice').show();
})
$('body .moresay').on('click', function () {
	$(this).toggleClass('activeadv');
	$('.moresayp').toggle();
})
$(document).on('click', '.close-btn,.m-close,.m-btn', function () {
	var leftTimes = hdgg.storage.get('leftTimes');
	$('#imgad').remove();
	$('#redux').remove();
	$('#guaqu').append(guaShadow);
	$('#point').show();
	$('.zhanshi').show();
	if (leftTimes == 0) {
		$('#over').show();
		$('#point').hide();
		$('.zhanshi').hide();
	}
})
window.styleReset = function () {
    	$('#dialog5').addClass('hidem');
    	$('#dialog5').remove();
    	$('.DB_guide').show();
  		$('.btn,.hand').show()
	 
    }
  function closeBtn(res) {
      $('#dialog5').on('click', '.close-btn', function () {
  			 
        res.close();
        window.styleReset();
				 
				var leftTimes = hdgg.storage.get('leftTimes');
				$('#imgad').remove();
				$('#redux').remove();
				$('#guaqu').append(guaShadow);
				$('#point').show();
				$('.zhanshi').show();
				if (leftTimes == 0) {
					$('#over').show();
					$('#point').hide();
					$('.zhanshi').hide();
				}
      })
    }
	function closeGo(res) {
		$('.goto').on('click', function () {
		flag = false
		res.click();
		})
		$('.showPrize-dialog img').on('click', function (e) {
		flag = false
		e.preventDefault();
		e.stopPropagation();
		var imgs = 1;
		res.click(imgs);
		})
	}
 
// $('#over').on('click',function(){
// 	hdgg.win();
// })
$('body .saclose').on('click', function () {
	$('.moresay').removeClass('activeadv');
	$('.moresayp').hide();
	$('.alerty').hide();
	$('.zhenotice').hide();
})


var pswitch = true;
setInterval(function () {
	if (pswitch) {
		$('#point').addClass('phover');
	} else {
		$('#point').removeClass('phover');
	}
	pswitch = !pswitch;
}, 1000)
$('#start').on('click', function () {
	 
	var leftTimes = hdgg.storage.get('leftTimes');
	if (leftTimes == 0) {
		$('#over').show();
		$('#point').hide();
		$('.zhanshi').hide();
		return;
	}
	var ids = hdgg.idx || 0;
	var imageUrl = 'https://hdggcdn.bayimob.com/hdggstatic/guagua4/text.jpg';
	var names = hdgg.ads.advIntro;
	$('#imgad img').attr('src', imageUrl);
	$('#adname').text(names);
	$('#point').hide();
	$('.zhanshi').hide();
	$('#showimg').show();
	setTimeout(function () {
		$('#showimg').hide();
	}, 1000);
	$('#redux').eraser({
		size: 40, //设置橡皮擦大小
		completeRatio: .18, //设置擦除面积比例
		completeFunction: showResetButton //大于擦除面积比例触发函数
	});

	function showResetButton() {
		hdgg.start();
		hdgg.win({
				success:function(res){
					
					alertCommon(res.ad.imageUrl, res.ad.advIntro);
					closeBtn(res);
					closeGo(res);
				
			}
		});
	}

})


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
       }, 500)
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