$(function () {
  FZ(20, 375);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '元宵福利',
    type: 244,
    rem: 20 / 375,
		entranceShow: true, 
		txEntranceShow:true,
		
		
  });
  //超过0点清空记录
  var agoTime = hdgg.storage.get('agoTime') ? hdgg.storage.get('agoTime') : new Date().getTime();
  if (new Date().getTime() > agoTime) {
    hdgg.storage.remove('agoTime');
    hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
  }
  var dian = true;
  var haveTime = true;
  var img_bao = "";
  var bbb = function () {
    img_bao = "https://hdggcdn.bayimob.com/hdggstatic/chehongbao5/sikai.gif?v=" + Date.now();
    var changeImg = new Image();
    changeImg.src = img_bao
  }
 bbb()
  $('.starta').on('click', function () {
		
    if (haveTime) {
      hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
      haveTime = false;
    }
    if (!dian) {
      return;
    }
    var startC = hdgg.start();
    if (startC < 0) {
      return;
    }
    dian = false;
    $('.starta').hide();
    $('.DB_guide').hide();
    $('.xiangzi').addClass('add_chai_gif').css({'background-image': 'url(' + img_bao + ')'});
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          if(Math.floor(Math.random()*100+1)>50) {
          	alertCommon(res.ad.imageUrl);
          }else {
          	alertCommon1(res.ad.imageUrl, res.ad.advIntro)
          }
// 					$('.xiangzi').removeClass('add_chai_gif').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/chehongbao5/redbag.png)');
// 					$('.DB_guide').show();
// 					$('.starta').show();
          closeBtn(res);
          closeGo(res);
        }
      });
    }, 800);
  });

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
  });
// alertCommon1()
//   function alertCommon(imageUrl, advIntro) {
//     var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg""><img src="' + imageUrl + '"></div><div class="red-bg"></div><div class="red-bg1"></div><div class="red-bg2"></div><div class="red-txt"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
//     $('body').append(strs);
//     setTimeout(function () {
//       $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
//     }, 1500)
//   }
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
	function alertCommon1(imageUrl,advIntro) {
		$('.moneyJing').show()
		var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="yanhua1"></div><div class="yanhua2"></div><div class="yanhua3"></div><div class="denglong1"></div><div class="denglong2"></div><div class="denglong3"></div><div class="denglong4"></div><div class="moneyJing"></div><div class="advBox"><div class="imgBox"><img src="'+imageUrl+'"</div><div class="advText">'+advIntro+'</div></div><div class="btnJiang"></div></div>'
		$('body').append(strs);
	setTimeout(function () {
		$('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
	}, 1500)
	
	$('.moneyJing').animate({'top':'0rem'},500,function() {
		$('.moneyJing').hide()
	})
	}

  function closeBtn(res) {
    $('#dialog5').on('click', '.close-btn', function () {
      res.close();
      window.styleReset();
    })
  }

  window.styleReset = function () {
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
    dian = true;
    $('.xiangzi').removeClass('add_chai_gif').css('background-image', 'url(https://hdggcdn.bayimob.com/hdggstatic/chehongbao5/redbag.png)');
    $('.DB_guide').show();
    $('.starta').show();
    bbb()
  }

  function closeGo(res) {
  	$('.lingqu,.btnJiang').on('click', function () {
  		res.click();
  	})
  	$('.popShowPrize img').on('click', function (e) {
  		e.preventDefault();
  		e.stopPropagation();
  		var imgs = 1;
  		res.click(imgs);
  	})
  }
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
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}


