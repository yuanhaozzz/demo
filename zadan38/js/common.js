var eggint = null;
var falg = true;
var itemCurrent = null;
var suiArr = null;
var dansuiSwitch = true;
var danindex = 0;
$(function() {
	$(".imgbox").hide();
	FZ(20, 375);
	var hdgg = new HDGG({
		appkey: getUrlParam('appkey'),
		adSpaceKey: getUrlParam('adSpaceKey'),
		times: 8,
		timesEle: '#countZa',
		recordEle: '.price',
		name: '夏季砸冰块',
		type: 634,
		rem: 20 / 375,
		entranceShow: false, //左上角
		gamecenterShow: true, //右下角
		gamelistShow: true, //次数用光大弹窗
		txEntranceShow: true
	});
	setTimeout(function() {
		if (hdgg.storage.get('leftTimes') == '8') {
			window.localStorage.removeItem('sui')
		}
		suiArr = !hdgg.storage.get('sui') ? [] : hdgg.storage.get('sui');
		if (suiArr instanceof Array) {
			for (var i = 0; i < suiArr.length; i++) {
				$('#danlist').find('li').eq(suiArr[i]).addClass('hide').removeClass("full").find("img").attr("src","./img/ice_broken.png");
			}
		}
	},0);

	jindanAnimation('beat', '.full', 1000);

	$('.rule').on('click', function() {
		$('.alerty').show();
		$('.zhenotice').show();
	});
	$('body .moresay').on('click', function() {
		$(this).toggleClass('activeadv')
		$('.moresayp').toggle();
	});
	$('body .saclose').on('click', function() {
		$('.moresay').removeClass('activeadv');
		$('.moresayp').hide();
		$('.alerty').hide();
		$('.zhenotice').hide();
	});

	//因为光的存在不能直接点击跳跃的冰块 故点击外层伪造冰块模拟点击跳跃冰块
	//先判断是否点击过  标示为类名是否包含 full 
	// $(".cover").on("click","li",function(){
	// 	var index = $(this).index();
	// 	if($("#danlist").find("li").eq(index).hasClass("full")){
	// 		$("#danlist").find("li").eq(index).click();
	// 	}
	// })

	// 点击互动
	$('#danlist .full').on('click', function(e) {
		if(!falg){
			return;
		}
		status = true;
		var startC = hdgg.start()
		if (startC < 0) {
			return;
		}
		
		if (count == 0) {
			return;
		}
		
		falg = false;
		var _this = $(this);
		var name = _this.attr("status");
		var oldname = _this.attr("oldname");
		var count = $('#countZa').text();
		var index = $(this).index();
		if (suiArr instanceof Array) {
			suiArr.push(index);
			hdgg.storage.set('sui', suiArr);
		}
		clearInterval(eggint);
		$(".chuizi").removeClass("item_start");
		_this.removeClass('full');
		$("#danlist").find(".beat").removeClass("beat");
		$("#danlist").find(".beat1").removeClass("beat1");
		//获取元素的相对位置;
		var top = _this.offset().top;
		var right = $(window).width() - e.currentTarget.offsetLeft;
		$(".chuizi").animate({
			top: top - 40,
			right: right - 145,
		},500,function(){
			$(".chuizi").css("z-index","3");
			setTimeout(function(){
				$(".chuizi").addClass("item_start");
			},300);
		});

		var type = $(this).attr("type");
		
		setTimeout(function(){
			$(".chuizi").css({
				"top":"6rem",
				"right":"-4rem",
				"z-index":"3"
			});
			_this.addClass(type).removeClass("full").empty();
			setTimeout(function(){
				falg = true;
				hdgg.win({
					success: function(res) {
						alertCommon(res.ad.imageUrl, res.ad.advIntro);
						closeBtn(res);
						closeGo(res);
					}
				});
			},1300)
		},1500)
	});
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
	}, 500)
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
	jindanAnimation('beat', '.full', 1000);
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
};
function jindanAnimation(aniClass, son, time) {
    eggint = setInterval(function () {
		if (dansuiSwitch == true) {
			$('#danlist').find('.full').eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
			danindex++;
			if(danindex >= $('#danlist').find('.full').length){
				danindex = 0;
			}
		} else {
			$('#danlist').find('.full').removeClass(aniClass);
		}

		if ($('#danlist').find('.full').length == 1) {
			$('#danlist').find('.full').removeClass(aniClass).addClass('beat1');
		}
    }, time);
}