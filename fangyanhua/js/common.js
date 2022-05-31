// window.document.oncontextmenu = function(e) {
// 	e.preventDefault();
// };
var timeGo = null;
$(function() {
	FZ(20, 375);
	var index = 0;
	var timer = null;
	// var i = 175;
	var ads = true;
	var num = 0;
	var g = 56;
	var current = 0;
	var step = 0;
	var money = 0;
	var startC = 0;
	var timeMove = null;
	// var timeOutEvent = 0;
	var flag = false;
	var hdgg = new HDGG({
		appkey: getUrlParam('appkey'),
		adSpaceKey: getUrlParam('adSpaceKey'),
		times: 8,
		timesEle: '#countZa',
		recordEle: '.jiang',
		name: '放烟花赢好礼',
		type: 229,
		rem: 20 / 375,
		txEntranceShow: true

	});

	if (hdgg.storage.get('leftTimes') == '8' || $('#countZa').text() == '8') {
		hdgg.storage.remove('step')
		hdgg.storage.remove('money')
		$('.stepCotent').css('height', 0 + '%')
		$('.stepJingbi').css('top', 92 + '%').hide()
	} else {
		$('.stepCotent').css('height', hdgg.storage.get('step') + '%')
		$('.stepJingbi').css('top', 96 - Number(hdgg.storage.get('step')) + '%')
		$('.stepJingbi').text(hdgg.storage.get('money') + '元').show()
	}

	var haveTime = true;
	// 超过0点清空记录
	var agoTime = hdgg.storage.get('agoTime') ? hdgg.storage.get('agoTime') : new Date().getTime();
	console.log(agoTime)
	console.log(new Date().getTime())
	if (new Date().getTime() > agoTime) {

		hdgg.storage.remove('agoTime');
		hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
		hdgg.storage.remove('step')
		hdgg.storage.remove('money')
		$('.stepCotent').css('height', 0 + '%')
		$('.stepJingbi').css('top', 92 + '%').hide()
	}
	//长按触发
	$(".btn").on({
		touchstart: function(e) {
			e.preventDefault();
			timeOutEvent = setTimeout(function() {
				e.preventDefault();
				$('.box').css('left', '50%')
				$('.theme').hide();
				index = 0

				startC = hdgg.start();
				if (startC < 0) {
					return false;
				}

				$('.ziro').show();
				plus();
				//此处为长按事件 
			});

		},

		touchend: function(e) {
			e.preventDefault();


			if (startC < 0) {
				return false;
			}
			$('.box').css('left', '49.7%')
			clearTimeout(timeOutEvent);
			clearTimeout(timer);
			clearTimeout(timeMove);
			if (haveTime) {
				hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
				haveTime = false;
			}
			current = index
			$('.ziro').hide()
			console.log(index)
			g = 56;
			fireworks()
			$('.huojian').show()

			if (index > 175 || index == 175) {
				$('.fireworksBg').animate({
					'bottom': 0 + 'rem'
				}, 2500, function() {
					current = $('.fireworksBg')[0].style.bottom

				})
			} else {
				if (index > 0 && index < 80) {
					index = Math.floor(Math.random() * 40 + 120)

					$('.fireworksBg').animate({
						'bottom': (index / 175) * 57 + 'rem'
					}, 1500, function() {
						current = $('.fireworksBg')[0].style.bottom

					})

					timeGo = setTimeout(function() {
						$('.huojian').hide()
						$('.fireworksBg').css('bottom', '57rem');
						$('.item1,.item3,.item2,.item4,.item5').show()
						hdgg.win({
							success: function(res) {
								// console.log(res)

								alertCommon(res.ad.imageUrl, res.ad.advIntro);
								closeBtn(res)
								closeGo(res)
							}

						});
					}, 2000)
					return false;
				}
				if (index > 80 && index < 140) {
					index = Math.floor(Math.random() * 40 + 50)
					console.log(index)
					$('.fireworksBg').animate({
						'bottom': (index / 175) * 57 + 'rem'
					}, 1500, function() {
						current = $('.fireworksBg')[0].style.bottom

					})
				}
				if (index > 140 && index < 175) {
					index = Math.floor(Math.random() * 10 + 10)
					$('.fireworksBg').animate({
						'bottom': (index / 175) * 57 + 'rem'
					}, 2000, function() {
						current = $('.fireworksBg')[0].style.bottom

					})
				}

			}

			console.log($('.fireworksBg')[0].style.bottom)

			timeGo = setTimeout(function() {
				$('.huojian').hide()
				$('.fireworksBg').css('bottom', '57rem');
				$('.item1,.item3,.item2,.item4,.item5').show()
				hdgg.win({
					success: function(res) {
						// console.log(res)

						alertCommon(res.ad.imageUrl, res.ad.advIntro);
						closeBtn(res)
						closeGo(res)
					}

				});
			}, 2000)
			return false;
		}
	});

	$('.rule').on('click', function() {
		$('.alerty').show();
		$('.zhenotice').show();
	})
	$('body .moresay').on('click', function() {
		$(this).toggleClass('activeadv')
		$('.moresayp').toggle();
	})
	$('.alerty').on('click', '.saclose', function() {
		$('.moresay').removeClass('activeadv');
		$('.moresayp').hide();
		$('.alerty').hide();
		$('.zhenotice').hide();
	})
	var win1 = (parseInt($(".xuehua").width())) - 60;

	var add = function() {
		var hb = parseInt(Math.random() * (3 - 1) + 1);
		var Wh = parseInt(Math.random() * (40 - 30) + 20);
		var Left = parseInt(Math.random() * (win1 - 0) + 0);
		var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
		//				console.log(rot)
		if (ads == true) {
			num++;
			$(".xuehua").append("<li class='li" + num +
				"' ><img src='https://hdggcdn.bayimob.com/hdggstatic/fangyanhua/xuehua.png'></li>");
			$(".li" + num).css({
				"left": Left,
			});
			$(".li" + num).css({
				"width": Wh,
				'heeight': hb
			});
			$(".li" + num).animate({
				'top': $(window).height() + Math.floor(Math.random() * 15 + 2)
			}, 8000, function() {
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
		setTimeout(add, 1000)
	}
	add()

	function fireworks() {
		g--;
		timeMove = setTimeout(function() {
			fireworks()

			if (g == 50) {
				$('.item1').hide()
				$('.posui').show()
				$('.posui div').animate({
					'top': '23rem'
				}, 2000)
				console.log(current)

				if (current == 175 || current > 175) {
					$('.stepJingbi').show()
					step = hdgg.storage.get('step') ? hdgg.storage.get('step') : 0
					money = hdgg.storage.get('money') ? hdgg.storage.get('money') : 0
					$('.stepCotent').animate({
						'height': Number(step) + 12.5 + '%'
					}, 1000)
					hdgg.storage.set('step', Number(step) + 12.5)
					$('.stepJingbi').animate({
						'top': 96 - (Number(step) + 12.5) + '%'
					}, 1000)
					$('.stepJingbi').text(Number(money) + 10 + '元')
					hdgg.storage.set('money', Number(money) + 10)
				}
				if (current > 0 && current < 50) {
					$('.stepJingbi').show()
					step = hdgg.storage.get('step') ? hdgg.storage.get('step') : 0
					money = hdgg.storage.get('money') ? hdgg.storage.get('money') : 0
					$('.stepCotent').animate({
						'height': Number(step) + 6 + '%'
					}, 1000)
					hdgg.storage.set('step', Number(step) + 6)
					$('.stepJingbi').animate({
						'top': 96 - (Number(step) + 6) + '%'
					}, 1000)
					$('.stepJingbi').text(Number(money) + 1 + '元')
					hdgg.storage.set('money', Number(money) + 1)
				}
				if (current > 50 && current < 100) {
					$('.stepJingbi').show()
					step = hdgg.storage.get('step') ? hdgg.storage.get('step') : 0
					money = hdgg.storage.get('money') ? hdgg.storage.get('money') : 0
					$('.stepCotent').animate({
						'height': Number(step) + 8 + '%'
					}, 1000)
					hdgg.storage.set('step', Number(step) + 8)
					$('.stepJingbi').animate({
						'top': 96 - (Number(step) + 8) + '%'
					}, 1000)
					$('.stepJingbi').text(Number(money) + 3 + '元')
					hdgg.storage.set('money', Number(money) + 3)
				}
				if (current > 100 && current < 175) {
					$('.stepJingbi').show()
					step = hdgg.storage.get('step') ? hdgg.storage.get('step') : 0
					money = hdgg.storage.get('money') ? hdgg.storage.get('money') : 0
					$('.stepCotent').animate({
						'height': Number(step) + 10 + '%'
					}, 1000)
					hdgg.storage.set('step', Number(step) + 10)
					$('.stepJingbi').animate({
						'top': 96 - (Number(step) + 10) + '%'
					}, 1000)
					$('.stepJingbi').text(Number(money) + 6 + '元')
					hdgg.storage.set('money', Number(money) + 6)
				}
			}
			if (g == 45) {
				$('.item2').hide()
				$('.posui').show()
				// 				$('.posui div').animate({
				// 					'top': '23rem'
				// 				}, 1000)
			}
			if (g == 40) {
				$('.item3').hide()
				$('.posui').show()
				// 				$('.posui div').animate({
				// 					'top': '23rem'
				// 				}, 1000)
			}
			if (g == 35) {
				$('.item4').hide()
				$('.posui').show()
				// 				$('.posui div').animate({
				// 					'top': '23rem'
				// 				}, 1000)
			}
			if (g == 30) {
				$('.item5').hide()
				$('.posui').show()
				// 				$('.posui div').animate({
				// 					'top': '23rem'
				// 				}, 2000)
			}
		}, 80)


	}

	function plus() {
		index++;
		if (index == 175) {
			index = 175
			$('.ziro').css({
				'transform': 'rotate(0deg)'
			})
		}

		if (index < 175 || index == 175) {
			$('.ziro').css({
				'transform': 'rotate(' + (-175 + index) + 'deg)'
			})

		}

		timer = setTimeout(function() {
			plus();
		}, 1);
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
	window.onresize = function() {
		setTimeout(function() {
			document.documentElement.style.fontSize = getFZ() + "px";
		}, 100);
	};
};
// 从地址栏获取参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
};

function alertCommon(imageUrl, advIntro) {
	var strs =
		'<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' +
		imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro +
		'</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
	$('body').append(strs);

	$('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');

}

function closeBtn(res) {
	$('.close-btn').on('click', function() {
		res.close();
		$('#dialog5').addClass('hidem');
		$('#dialog5').remove();
		window.styleReset()

	})
}

function closeBos() {
	$('#dialog5').addClass('hidem');
	$('#dialog5').remove();
	$('.centers').show();
}

window.styleReset = function() {
	index = 0;
	$('.ziro').show();
	$('.ziro').css({
		'transform': 'rotate(' + (-175) + 'deg)'
	})
	clearTimeout(timeGo);
	$('.ziro').hide()
	$('.fireworksBg').css('bottom', '57rem');
	$('.posui .one').css('top', '0rem')
	$('.posui .two').css('top', '-3rem')
	$('.posui .three').css('top', '3rem')
	$('.posui .four').css('top', '-2rem')
	$('.posui .five').css('top', '0rem')
	$('.posui .six').css('top', '0rem')
	$('.posui .seven').css('top', '3rem')
	$('.posui .eight').css('top', '-3rem')
	$('.posui .nine').css('top', '0rem')
	$('.posui .ten').css('top', '1rem')
	$('.posui .first').css('top', '-3rem')
	$('.theme').show();
	$('.posui').hide();
}

function closeGo(res) {
	$('.goto').on('click', function() {
		res.click();
	})
	$('.showPrize-dialog img').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var imgs = 1;
		res.click(imgs);
	})
}
