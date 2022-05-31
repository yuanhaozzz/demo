var alertImg = null;
var clerTime = null;
var flag = false;
$(function() {
	$(".img_box").hide();
	var timer = null;
	var hdgg = new HDGG({
		appkey: getUrlParam('appkey'),
		adSpaceKey: getUrlParam('adSpaceKey'),
		times: 8,
		timesEle: '#countZa',
		recordEle: '.price',
		name: '原生扭蛋机',
		type: 651,
		rem: 20 / 375,
		entranceShow: false, //左上角
		gamecenterShow: false, //右下角
		gamelistShow: true //次数用光大弹窗
	});

	if ($('#countZa').text() == '8') {
		hdgg.storage.remove('priceBall');
	}

	// 点击触发动画
	$('.button').on('click', function() {
		if(flag) {
			return
		}

		var startC = hdgg.start();
		if (startC < 0) {
			return
		}
		flag = true;

		$(".button .hand").hide();
		$(".button").addClass("rotate");

		$('.pellet').hide()
		egeAnimate();
        setTimeout(function(){
			clearInterval(timer);
			ballRoute();
		},1000);
		setTimeout(function(){
			window.ballInit();
			$(".button .hand").show();
			$(".button").removeClass("rotate");
		},1200);
		
		setTimeout(function() {
			hdgg.win({
				success: function(res) {
					alertCommon(res.ad.imageUrl, res.ad.advIntro);
					closeBtn(res);
					closeGo(res);
					$(".roll").removeClass("shake");
					setTimeout(function(){
						$(".pop_box").show();
						$(".roll").animate({
							width:"4.15rem",
							height:"4.15rem",
							left: "7.2rem",
							top: "12rem"
						},200,function(){
							$(".roll").addClass("shake");
						});
					},100);
					setTimeout(function(){
						$(".roll").empty();
						$(".popShowPrize .price_box,.popShowPrize .tips").show();
						$(".showPrize-dialog.modal-body").animate({
							top:"28%"
						},500);
						$(".price_box .tips.top").animate({
							top:"1rem",
						},500)
						$(".price_box .tips.bottom").animate({
							top:"26rem",
						},500)
						$(".popShowPrize .ribbons").show()
					},1000);
					setTimeout(function(){
						$(".popShowPrize .tips").hide();
						setTimeout(function(){
							$(".ribbons").hide();
						},500)
					},1500)
				}
			});
			flag = false;
		},3000);
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

	function ballRoute(){
		$(".roll").removeClass("shake");
		$(".roll").css({
			left: "3rem",
			top: "11.7rem",
			width: "1.2rem",
			height: '1.2rem',
			"z-index":"1"
		});
		var arr = ["./img/ball_money.png"];
		var index =  Math.floor(Math.random()*arr.length);
		var currentImg = arr[index];
		price_ball_img = currentImg;
		var div = '<div class="pellet"><img src="' + currentImg + '"/></div>';
		$('.roll').append(div);
		$('.pellet').show();
		$(".roll").animate({
			left:"2.65rem",
		},50,function(){
			$(".roll").animate({
				top: "19rem"
			},400,function(){
				setTimeout(function(){
					$(".roll").css("z-index","45");
				},250)
			});
			setTimeout(function(){
				$(".roll").animate({
					left: "4.9rem",
					top: "22rem",
					width:"2.15rem",
					height:"2.15rem"
				},400,function(){
					setTimeout(function(){
						$(".roll").addClass("shake");
					},410);
					
				})
			})
			
		})
	}

	function initPriceBall(index){
		if(index == "0"){
			$(".roll").animate({
				left: "0.9rem",
				top: "26.35rem"
			},200,function(){
				$(".price_ball ul li").eq(0).find("img").show();
			});
		}else if(index == "1"){
			$(".roll").animate({
				left: "3.4rem",
				top: "26.35rem"
			},200,function(){
				$(".price_ball ul li").eq(1).find("img").show();
			})
		}else if(index == "2"){
			$(".roll").animate({
				left: "5.85rem",
				top: "26.35rem"
			},200,function(){
				$(".price_ball ul li").eq(2).find("img").show();
			})
		}else{
			$(".roll").animate({
				left: "8.3rem",
				top: "26.35rem"
			},200,function(){
				$(".price_ball ul li").eq(3).find("img").show();
			})
		};
	}

	// 扭蛋动画
	function egeAnimate() {

		timer = setInterval(function() {
			$('.bao.one').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 3) + 1)) + 'rem'
			}, 50)
			$('.bao.two').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': -(Math.floor((Math.random() * 1) + 1)) + 'rem'
			}, 50)
			$('.bao.three').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': -(Math.floor((Math.random() * 2) + 1)) + 'rem'
			}, 50)
			$('.bao.four').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': -(Math.floor((Math.random() * 1.6) + 1)) + 'rem'
			}, 50)
			$('.bao.five').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 3.5) + 1)) + 'rem'
			}, 50)
			$('.bao.sex').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 3) + 1)) + 'rem'
			}, 50)
			$('.bao.seven').animate({
				'left': (Math.floor((Math.random() * 3) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 2) + 1)) + 'rem'
			}, 50)
			$('.bao.eight').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 3) + 1)) + 'rem'
			}, 50)
			$('.bao.nine').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 4) + 1)) + 'rem'
			}, 50)
			$('.bao.ten').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': -(Math.floor((Math.random() * 1) + 1)) + 'rem'
			}, 50)
			$('.bao.first').animate({
				'left': (Math.floor((Math.random() * 4) + 1)) + 'rem',
				'top': (Math.floor((Math.random() * 2) + 1)) + 'rem'
			}, 50)

		}, 50)

	};

	function alertCommon(imageUrl, advIntro) {
		var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">'
		 +  '<div class="ribbons"></div>'
		 + 	'<div class="price_box" style="display: none">'
		 +	'<div class="m-box"></div>'
		 +	'<div class="tips top"></div>'
		 +	'<div class="showPrize-dialog modal-body">'
		 +		'<div class="caiguang"></div>'
		 +		'<div class="ball_title">'
		 +			'<img src=' + price_ball_img + '>'
		 +		'</div>'
		 +		'<div class="red-bg">'
		 +			'<div class="card-bg">'
		 +				'<img class="resAd" src=' + imageUrl +'>'
		 +			'</div>'
		 +			'<div class="detail">'
		 +				'<div class="topic">' + advIntro + '</div>'
		 +				'<div class="goto"></div>'
		 +			'</div>'
  		 +		'</div>'
		 +	'</div>'
		 +	'<div class="tips bottom"></div>'
		+'</div>'
	+'</div>'
		$('body').append(strs);
		setTimeout(function() {
			$('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
		}, 1500);
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
		$('.DB_guide').show();
		$('.mengceng').hide()
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
})

$("body").on("click","#hdgg_show-noadUc .m-close",function(){
	$(".roll").empty();
})

//移动端适配
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
//获取URL参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
};

// 初始化
window.ballInit = function() {

	$('.bao.one').css({
		'left': '5.75rem',
		'top': '1.65rem'
	})
	$('.bao.two').css({
		'left': '0.2rem',
		'top': '1.75rem'
	})
	$('.bao.three').css({
		'left': '3.6rem',
		'top': '1rem'
	})
	$('.bao.four').css({
		'left': '0.2rem',
		'top': '-0.1rem'
	})
	$('.bao.five').css({
		'left': '2.2rem',
		'top': '-2.1rem'
	})
	$('.bao.sex').css({
		'left': '0.5rem',
		'top': '-1.1rem'
	})
	$('.bao.seven').css({
		'left': '7.9rem',
		'top': '1.9rem'
	})
	$('.bao.eight').css({
		'left': '3.4rem',
		'top': '2.9rem'
	})
	$('.bao.nine').css({
		'left': '0.9rem',
		'top': '1.9rem'
	})
	$('.bao.ten').css({
		'left': '6.3rem',
		'top': '2.6rem'
	})
	$('.bao.first').css({
		'left': '5.8rem',
		'top': '-1rem'
	})
}
