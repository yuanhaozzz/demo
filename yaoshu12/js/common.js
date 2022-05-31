
var flag = false
$(function() {
	FZ(20, 375);
	var hdgg = new HDGG({
		appkey: getUrlParam('appkey'),
		adSpaceKey: getUrlParam('adSpaceKey'),
		times: 8,
		timesEle: '#countZa',
		recordEle: '.jiang',
		name: '摇树之七夕定制',
		type: 633,
		rem: 20 / 375,
		entranceShow: true,     //左上角
		gamecenterShow: true,   //右下角
		gamelistShow:true ,   //次数用光大弹窗
		txEntranceShow: true

	});
	var haveTime = true;
	if ($('#countZa').text() == '8') {

		hdgg.storage.remove('width')

		$('.bgColor').css('width', '0rem')
		$('.money,.money2,.liping,.tishiText').show()
		hdgg.storage.remove('index')
		hdgg.storage.remove('index1')
		hdgg.storage.remove('index2')
		hdgg.storage.remove('width')
		hdgg.storage.remove('hide')

	} else {
		$('.bgColor').css('width', hdgg.storage.get('width') + 'rem')
	}

	//超过0点清空记录
	var agoTime = hdgg.storage.get('agoTime') ? hdgg.storage.get('agoTime') : new Date().getTime();
	console.log(agoTime)
	console.log(new Date().getTime())
	if (new Date().getTime() > agoTime) {
		hdgg.storage.remove('agoTime');
		hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
		hdgg.storage.remove('width')
		hdgg.storage.remove('index')
		hdgg.storage.remove('index1')
		hdgg.storage.remove('index2')
		hdgg.storage.remove('hide')

		$('.bgColor').css('width', '0rem')
	}
	if (hdgg.storage.get('index')) {
		$('.money').hide()
	}
	if (hdgg.storage.get('index1')) {
		$('.money').hide()
		$('.money2').hide()
	}
	if (hdgg.storage.get('index2')) {
		$('.liping').hide()
		$('.money').hide()
		$('.money2').hide()
	}

	//动态图片初始化
	var img_bao = '';
	move = function() {
		img_bao = 'https://hdggcdn.bayimob.com/hdggstatic/yaoshu1/yao1.gif?a=' + Date.now();
		var changeImg = new Image();
		changeImg.src = img_bao
	}
	move()

	// 2次提现动效
	// var timer = window.setInterval(function() {
	// 	$('.tishiText').hide()
	// 	setTimeout(function() {
	// 		$('.tishiText').show()
	// 	}, 1000)
	// }, 3000)

	if (hdgg.storage.get('hide')) {

		$('.tishiText').hide()
	}
	// clearInterval(timer)
	$('.rule').on('click', function() {
		$('.alerty').show();
		$('.zhenotice').show();
	})
	$('body .moresay').on('click', function() {
		$(this).toggleClass('activeadv');
		$('.moresayp').toggle();
	})
	$('body .saclose').on('click', function() {
		$('.moresay').removeClass('activeadv');
		$('.moresayp').hide();
		$('.alerty').hide();
		$('.zhenotice').hide();
	})
	//自动互动一次
	//  myMove()
	function myMove() {
		flag = true
		// $('.btn,.yaoqianshu,.hand').unbind('click')
		// $('.yaoqianshu').css('background-image', 'url(' + img_bao + ')').css('top','14rem')
		$('.yaoshuGo').addClass('yaoMy')
		$('.liuzhi1,.liuzhi2,.liuzhi3,.liuzhi4,.liuzhi5').addClass('liuzhiDong')
		setTimeout(function() {
			// debugger
			$('.yaoshuGo').removeClass('yaoMy')
			// $('.yaoshuBox').css({'background':'url(./img/shu.png) no-repeat','background-size':'100%'})
			var startC = hdgg.start()
			if (startC < 0) {
				return
			}
			setp(startC)
			hdgg.win({
				success: function(res) {
					flag = false
					// setTimeout(function() {
					alertCommon(res.ad.imageUrl, res.ad.advIntro);
					closeBtn(res);
					closeGo(res);
					// }, 2000)
				}
			})
		}, 850)
	}


	function setp(n) {
		console.log(n)
		var width = hdgg.storage.get('width') ? hdgg.storage.get('width') : 0

		if (n == 7) {


			$('.bgColor').animate({
				'width': Number(width) + 1.5 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 1.5)
		}
		if (n == 6) {
			$('.bgColor').animate({
				'width': Number(width) + 2 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 2)
			setTimeout(function() {
				pabulic(n)
			}, 410)
		}
		if (n == 5) {
			$('.bgColor').animate({
				'width': Number(width) + 1.5 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 2.3)
			setTimeout(function() {
				pabulic(n)
			}, 410)
		}
		if (n == 4) {
			$('.bgColor').animate({
				'width': Number(width) + 1.5 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 2.7)
			setTimeout(function() {
				pabulic(n)
			}, 410)
		}
		if (n == 3) {
			$('.bgColor').animate({
				'width': Number(width) + 1 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 1)
		}

		if (n == 2) {
			$('.bgColor').animate({
				'width': Number(width) + 1 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 1)
		}
		if (n == 1) {
			$('.bgColor').animate({
				'width': Number(width) + 1 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 1)
		}
		if (n == 0) {
			$('.bgColor').animate({
				'width': Number(width) + 1 + 'rem'
			}, 400)
			hdgg.storage.set('width', Number(width) + 1)
		}

	}

	//自动互动一次和点击互动的公共逻辑

	function pabulic(s) {

		if (s == 6) {
			$('.money').addClass('moneyGo');
			setTimeout(function() {
				hdgg.storage.set('index', 1)
				$('.money').hide()
			}, 750)
		}
		if (s == 5) {
			$('.money2').addClass('moneyGo');
			setTimeout(function() {
				$('.money2').hide()
			}, 750)
			hdgg.storage.set('index1', 2)
		}
		if (s == 4) {
			$('.liping').addClass('moneyGo');
			setTimeout(function() {
				$('.liping').hide()
			}, 750)
			hdgg.storage.set('index2', 3)
		}
	}
	
	//点击互动逻辑
	$('.btn,.yaoqianshu,.hand').on('click', function() {
		$('.yaoshuBox').css({'background':'transparent'})
		if (flag) {
			return
		}
		flag = true
		var startC = hdgg.start();
		if (startC < 0) {
			flag = false
			return
		}
		$(".btn").css({"background-image":"url(./img/disabled_btn.png)"});
		console.log(startC)
		if (haveTime) {
			hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
			haveTime = false;
		}
		img_bao = 'https://hdggcdn.bayimob.com/hdggstatic/yaoshu1/yao1.gif?a=' + Date.now();
		if (startC == 7) {
			$('.liuzhi1,.liuzhi2,.liuzhi3,.liuzhi4,.liuzhi5').addClass('liuzhiDong')
		}
		$('.yaoshuGo').addClass('yaoMy')
		setp(startC)
		setTimeout(function() {
			flag = false
        	 $('.yaoshuGo').removeClass('yaoMy') 
			// $('.yaoshuBox').css({'background':'url(./img/shu.png) no-repeat','background-size':'100%'})
			hdgg.win({
				success: function(res) {
					alertCommon(res.ad.imageUrl, res.ad.advIntro);
					closeBtn(res);
					closeGo(res);
				},
			});
			$(".btn").css({"background-image":"url(./img/btn.png)"})
		}, 850)
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
	window.onresize = function() {
		setTimeout(function() {
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
	$('#dialog5').on('click', '.close-btn', function() {
		res.close();
		window.styleReset();
	})
}

window.styleReset = function() {
	$('#dialog5').addClass('hidem');
	$('#dialog5').remove();
	flag = false
}

function closeGo(res) {
	$('.goto').on('click', function() {
		res.click();
	})
	$('.popShowPrize img').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var imgs = 1;
		res.click(imgs);
	})
}
