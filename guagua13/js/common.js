FZ(20, 375);
var times = $('#count').text();
var hdgg = new HDGG({
	appkey: getUrlParam('appkey'),
	adSpaceKey: getUrlParam('adSpaceKey'),
	times: times,
	timesEle: '#count',
	recordEle: '.jiang',
	name: '刮刮卡定制',
	type: 506,
	rem: 20 / 375,
	entranceShow: true, //左上角
	gamecenterShow: true, //右下角
	gamelistShow: true, //次数用光大弹窗
	txEntranceShow: true,
	pddCustomDialog:false
	// quAnDouYao:false
});

var imgUrl = '';
var txt = '';
var flager = false;
var obj = null;
var startC = 0;
var countAd = hdgg.times;
var boxIndex = 0;
if (countAd == 0) {
	$('#over').show();

	$('#point').hide();
	$('.zhanshi').hide();
}

if(hdgg.storage.get('leftTimes')=='8') {
	hdgg.storage.remove('start')
	$('#start').css('background-image','url(./images/btn.png)')
}else {
	if(hdgg.storage.get('start')) {
		$('#start').css('background-image','url(./images/btn1.png)')
	}else {
		$('#start').css('background-image','url(./images/btn.png)')
	}
}
// var index = 0;
 $('.dropBox .winBax').addClass('dropGo')
 $('.dropBox .winBax1').addClass('dropGo1')
 $('.dropBox .winBax2').addClass('dropGo2')
 $('.dropBox .dropCard').addClass('dropGo3')
 setTimeout(function() {
	$('.dropBox .winBax').removeClass('dropGo').remove()
	$('#guaqu .winBax').show()
 },900)
 setTimeout(function() {
	$('.dropBox .winBax1').removeClass('dropGo1').remove()
	$('#guaqu .winBax1').show()
 },1100)
 setTimeout(function() {
	$('.dropBox .winBax2').removeClass('dropGo2').remove()
	$('#guaqu .winBax2').show()
 },1300)
 setTimeout(function() {
	$('.dropBox .dropCard').removeClass('dropGo3').remove()
	$('#guaqu .lastBox').show()
	$('#start').show()
	$('.zhanshi').show()
 },1500)
function textDrop() {
	var setTime = setInterval(function () {

		boxIndex = boxIndex == $('.txt').length ? 0 : boxIndex;
		$('.txt').eq(boxIndex).addClass('textGo').siblings('.txt').removeClass('textGo')
		boxIndex++;
		if (boxIndex == 5) {
			clearInterval(setTime)
			setTimeout(function () {
				$('.textBox').hide()
			}, 500)

		}
	}, 500)

}

var guaShadow = '<div class="lastBox"><div class="lastHezi"></div><div class="lastBg"></div><div id="imgad"><img src="https://hdggcdn.bayimob.com/hdggstatic/guagua3/huiCard.png">' +
	'</div><img id="reduxss" src="./images/card1.png"></div>';
$('#guaqu').append(guaShadow);
$('body').on('click', '.rule', function () {
	$('.alerty').show();
	$('.zhenotice').show();
})
$('body .moresay').on('click', function () {
	$(this).toggleClass('activeadv');
	$('.moresayp').toggle();
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
		switch (startC) {
			case 2:
				$('.winBax').hide()
				break
			case 1:
				$('.winBax1').hide()
				break
			case 0:
				$('.winBax2').hide()
				break
		}
 
				$('.rightCard').show().addClass('rightCardGo');
				setTimeout(function () {
					// debugger
					$('.rightCard').hide()
				}, 800)
			 
		// var leftTimes = hdgg.storage.get('leftTimes');
		$('.lastBox').remove()
		$('#imgad').remove();
		$('#redux').remove();
		$('#guaqu').append(guaShadow);
		$('#point').show();
		$('.lastBox').show()
		$('.zhanshi').show()
		// if (leftTimes == 0) {
		// 	$('#over').show();
		// 	$('#point').hide();
		// 	$('.zhanshi').hide();
		// }
	})
}
function closeGo(res) {
	$('.goto').on('click', function () {
		flag = false

		// hdgg.handleWinClick(res)
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
	
	
	startC = hdgg.start();
    if(startC<0) {
		return
	}
	$('.loding').show()
	if(startC<8) {
		$('#start').css('background-image','url(./images/btn1.png)')
		hdgg.storage.set('start',1111)
	}
	$('#imgad').css({ '-webkit-border-radius': '32px' })
	var strs = '<img id="redux" src="./images/card2.png"/>';
	
	hdgg.win({
		success: function (res) {
			imgUrl = res.ad.imageUrl;
			txt = res.ad.advIntro;
			obj = res;
			// index++;
		}
	});

	$('#point').hide();
	$('.zhanshi').hide();

	setTimeout(function () {
		console.log(imgUrl)
		
		$('#imgad img').attr('src', imgUrl);
		
		$('.lastBox').append(strs)
		$('.loding').hide()
		setTimeout(function() {
			$('#reduxss').remove()
			
			$('#redux').eraser({
				size: 40, //设置橡皮擦大小
				completeRatio: .5, //设置擦除面积比例
				completeFunction: showResetButton //大于擦除面积比例触发函数
			});
			$('#redux').css({ '-webkit-border-radius': '32px', 'z-index': '3',})
			
		},500)
		
		// $('.textBox').show();
		// textDrop()
	}, 1300)



	function showResetButton() {
		alertCommon(imgUrl, txt);
		closeBtn(obj);
		closeGo(obj);
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
	}, 100)
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