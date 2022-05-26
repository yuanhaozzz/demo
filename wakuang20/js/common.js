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
  name: '现金红包挖到手软（圆形领取，拉卡拉审核）',
  type: 479,
  rem: 20 / 375,
  entranceShow: true,
  txEntranceShow:true
  // gamecenterShow: true,
  // gamelistShow: true
});
$('.banyuan').on('click',function() {
  $('.banyuan').hide()
  $('.lanse').show()
  })
  $('#quxiao').on('click',function() {
  $('.lanse').hide()
  $('.banyuan').show()

  })
// if (hdgg.storage.get('leftTimes') == '8') {
//   window.localStorage.removeItem('sui')
// }
// var suiArr = hdgg.storage.get('sui') == undefined ? [] : hdgg.storage.get('sui').split(',');
// if (suiArr instanceof Array && suiArr != '') {
//   for (var i = 0; i < suiArr.length; i++) {
//     $('#danlist').find('li').eq(suiArr[i]).addClass('eggbreak').removeClass('full');
//   }
// }
$('.start').addClass('startGo')
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
window.styleReset = function () {
  $('#dialog5').addClass('hidem');
  $('#dialog5').remove();
	$('.start').addClass('startGo')
}
// 	// $(document).ready(function () {
	// 	//限制返回
	// 	// history.pushState(null, null, null);
	// 
	window.history.pushState(null, null, location.href);
	setTimeout(function() {
		if (!(history.state && history.state.target == "Final")) {
			window.history.pushState({
				target: "MeanSure",
				random: Math.random()
			}, "", location.href);
			window.history.pushState({
				target: "Final",
				random: Math.random()
			}, "", location.href);
		}

	}, 500)

	window.addEventListener("popstate", function(e) {

		if (e.state && e.state.target == "MeanSure") {

			//此处可调用一些自定义的操作，例如弹窗提示之类的，最后根据实际需要可调用上面三个函数中的任何一个，用于决定当前自定义操作完成之后，需要停留在本页面，还是回退，还是跳转到其他页面

			$('.mengceng').show();
			hdgg.storage.set('chaJian',1)
		 
			setTimeout(function() {
				daojishi()
			}, 1500)

			var num = 0;
			var numz = 4;
			//图片缓存

			var win1 = (parseInt($(".couten").width())) - 60;
            
			var add = function() {

				var Left = parseInt(Math.random() * (win1 - 0) + 4);
				var Width = Math.random() * 2 + 1;
				var Hight = Math.random() * 3 + 1
				var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";

				var rots = (parseInt(Math.random() * (60 - (-20)) - 60)) + "deg";

				var url = '';

				url = './img/hb1_nor.png'
    
				if (ads == true) {
					$('.ziroLight').show()
					$('.xuanLigth').show()
					num++;
					$(".couten").append("<li class='li" + num + "' ><div class='div" + num +
						"'>+1</div><a href='javascript:;'><img  src='" + url + "'></a></li>");
					$(".li" + num).css({
						"left": Left,
						// 'right': right
					});
					$(".div" + num).css({
						'width': '2rem',
						'height': '2rem',
						'position': 'absolute',
						'top': '0rem',
						'left': '3rem',
						'color': 'red',
						'font-size': '1.5rem',
						'display': 'none'
					})
					$(".li" + num + " a img").css({
						"width": Width + 'rem',
						// "height": '3.5rem',
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
					}, 2000, function() {
						//删掉已经显示的红包
						this.remove()
					});
				} else {
					$(".couten").empty();
					return;
				}
				setTimeout(add, 350)
			};

			//增加红包
			var add_bag = "";

			function add_red() {
				 
				setTimeout(function() {
					$('.timeShow').show()
					diaoluo()
				}, 800)
				num = 0;
				ads = true;
				add_bag = setTimeout(add, 1000);
			}

			function daojishi() {
				$('.redTitle').hide()
				setTimeout(function() {
					$('.jishi').show()
				}, 350)
				var timer = setInterval(function() {
					setTimeout(function() {
						$('.jishi').addClass('jishi_animate');
						setTimeout(function() {
							$('.jishi').removeClass('jishi').addClass('jishi2')
							setTimeout(function() {
								$('.jishi2').removeClass('jishi1').addClass('jishi1')
								setTimeout(function() {
									$('.jishi1').removeClass('jishi1').addClass('jishiGo').removeClass('jishi_animate')
								}, 350)
							}, 350)
						}, 350)
					}, 350)

				}, 300)

				setTimeout(function() {

					clearInterval(timer)
					$('.jishiGo').hide()


				}, 3000)
				setTimeout(function() {
					 
					add_red();
				}, 2000)
			}

			// 红包掉落计时
			function diaoluo() {
				var time = 5;
				suiArr = setInterval(function() {
					time--;
					$('.daoNum').text(time)
					if (time == 0) {
						clearInterval(suiArr);
						setTimeout(function() {
							$('.timeShow').hide()
							$('.couten').hide()
							$('.timeEnd').show()
							setTimeout(function() {
								$('.timeEnd').hide()
								$('.fotterLight').show()
								$('.topBaoxiang').hide()
								// $('#demoCanvas').hide()
							}, 1000)
						}, 1000)


						setTimeout(function() {

							$('.bigBao').css({
								'background': 'url(./img/baoBg.png) no-repeat',
								'background-size': '100%'
							})

							var startC = hdgg.start();
							hdgg.win({
								success: function(res) {
									// alertCommon(res.ad.imageUrl,res.ad.advIntro)
									alertCommon1(res.ad.imageUrl,res.ad.advIntro)
									setTimeout(function() {
										closeBtns(res);
									},1600)
									closeGos(res);
								}

							});
						}, 4000)
					}

				}, 1000)

			}
		}
	}, false);

	var clickNum = 0;
	$('.couten').on('touchstart', 'li', function() {

		console.log($('.' + $(this).attr('class') + ' img').attr('src'))
		$('.' + $(this).attr('class') + ' img').attr('src', './img/hb1_pre.png').addClass('bgOpcity')
		if ($('.' + $(this).attr('class') + ' img').attr('src')) {

			if (clickNum < 3) {
				clickNum++;
				$('.topBaoxiang span').text(clickNum)
			}
		}
		$('.' + $(this).attr('class') + ' div').show()
		// $(this).css({'position':'fixd','top':'12rem','left':'50%'}),
		console.log($(this))
		$(this).css('animation', 'all 0s linear');

	});
var dian = true;
$('.start').on('click', function () {
  if (dian == false) {
    return;
  }
	$('.start').removeClass('startGo')
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
		$('.start').addClass('startGo')
    hdgg.win({
      success: function (res) {
        // var num = Math.floor(Math.random()*3+1)
		// console.log(num)
// 		if(num==1) {
// 		   alertCommon(res.ad.imageUrl, res.ad.advIntro);
// 			
// 			closeBtn(res);
// 			closeGo(res);
// 		}
// 		if(num==2) {
// 			alertCommon1(res.ad.imageUrl, res.ad.advIntro,res.ad.receiveText);
// 			
// 			closeBtn1(res);
// 			closeGo(res);
// 		}
		// if(num==3) {
			alertCommon3(res.ad.imageUrl, res.ad.advIntro);
			
			closeBtn2(res);
			closeGo(res);
		// }
        	
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

 function alertCommon(imageUrl, advIntro) {
 var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
 $('body').append(strs);
 setTimeout(function () {
 $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
 }, 1500)
 }
//  function alertCommon1(imageUrl, advIntro, txt) {
//    var strs = '<div class="popShowPrize" id="dialog6" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="card-sunshine"></div><div class="showPrize-dialog modal-body"><div class="card-bg" style="background-image: url(./img/tanchuang.png)"><img src="' + imageUrl + '" alt=""></div><div class="red-bg"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto">' + txt + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
//    $('body').append(strs);
//    $('#dialog6').append('<a href="javascript:;" id="close2" class="close-btn closetc iconfont close6"></a>');
//  }
 function alertCommon3(imageUrl, advIntro) {
   	var strs = '<div class="popShowPrize" id="dialog7" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
   	$('body').append(strs);
   	setTimeout(function () {
   		$('#dialog7').append('<span id="close1" class="close-btn closetc iconfont close7"></span>');
   	}, 1500)
   }
 
  function alertCommon1(imageUrl,advIntro) {
  	
  	var strs ='<div class="propur"><div class="tcAnimation"><div class="imgBox"></div><div class="imgUrl"><img src="'+ imageUrl +'"/></div><div class="txt">'+ advIntro+'</div><div class="redBox"></div><div class="jinBox"> </div><div class="baoBox"></div><div class="linGo"></div></div></div>' 
  	$('body').append(strs);
  	// setTimeout(function() {
  		// $('.baoBox').addClass('baoxiangGo')
  		setTimeout(function() {
  			$('.jinBox,.redBox').show()
  		},500)
  	// },600)
  	
  	setTimeout(function() {
  		$('.propur').append('<span id="closes" class="close-btns closetc iconfont"></span>');
  	
  	}, 1500)
  }	
  	 

function closeBtn(res) {
  $('#dialog5').on('click', '.close-btn', function () {
    res.close();
    window.styleReset();
  })
}
function closeBtn1(res) {
  $('#dialog6').on('click', '.close6', function () {
    res.close();
    window.styleReset();
	$('#dialog6').addClass('hidem');
	$('#dialog6').remove();
  })
}
function closeBtn2(res) {
  $('#dialog7').on('click', '.close7', function () {
    res.close();
    window.styleReset();
	$('#dialog7').addClass('hidem');
	$('#dialog7').remove();
  })
}
function closeBtns(res) {
		$('.propur').on('click', '.close-btns', function() {
			res.close();
			window.styleReset();
			$('.mengceng').hide()
			$('.propur').remove()
		})
	}
	window.styleReset = function() {
		$('.mengceng').hide()
		$('.propur').remove()
	}
function closeGo(res) {
  $('.goto').on('click', function () {
    res.click();
  })
  $('.popShowPrize img').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgs = 1;
    res.click(imgs);
  })
}
function closeGos(res) {
		$('.linGo').on('click', function() {
			res.click();
		})
		$('.propur  img').on('click', function(e) {
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
    // $('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang17/bg.jpg)');
		$('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang17/bg1.jpg)')
    $('#starBox').hide();
  } else {
    // $('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang1/bg2.jpg)');
		$('#contant').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/wakuang17/bg1.jpg)');

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
