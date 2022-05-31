FZ(20, 375);
startFloat();
// alertCommon('dasdsacaiqi','res.ad.advIntro');
var danindex = 0;
var dansuiSwitch = true;
var times = $('#countZa').text();
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 20,
  freeMode: true
});

var hdgg = new HDGG({
  appkey: getUrlParam('appkey'),
  adSpaceKey: getUrlParam('adSpaceKey'),
  times: times,
  timesEle: '#countZa',
  recordEle: '.jiang',
  name: '捞鱼旅行',
  type: 21,
  rem: 20 / 375,
  txEntranceShow:true
	// entranceShow: false     //左上角
});
if (hdgg.storage.get('leftTimes') == '8') {
  window.localStorage.removeItem('sui')
}
var suiArr = hdgg.storage.get('sui') == undefined ? [] : hdgg.storage.get('sui').split(',');
if (suiArr instanceof Array && suiArr != '') {
  for (var i = 0; i < suiArr.length; i++) {
    $('#danlist').find('li').eq(suiArr[i]).addClass('eggbreak').removeClass('full');
  }
}

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

function randNum(minnum, maxnum) {
  return Math.floor(minnum + Math.random() * (maxnum - minnum));
}


var zaload = true;

$('.start').on('click', function () {
  clickStart()
})
$('body').on('click', '.item', function () {
  clickStart()
})
$('body').on('click', '.fishnet', function () {
  clickStart()
})
$('body').on('click', '.m-close', function () {
  $('.ox-catch').hide();
  $('.rope-catch').hide();
  $('.rope-break ').show();
})

function clickStart() {
  var startC = hdgg.start();
  var hideYu = true;
  if (startC < 0) {
    return;
  }
  $('.start').hide();
  $('.DB_guide').hide();
  $('.fish-container').addClass('ani-pole');
  setTimeout(function () {
    $('#showping').show();
    var leftg = $('.fishnet').offset().left;
    var topg = $('.fishnet').offset().top;
    var solos = $('.floats').find('div');
		 
    var indexda = '';
    for (var i = 0; i < solos.length; i++) {
      var middleX = solos.eq(i).offset().left;

      if (middleX > 100 && middleX < 165) {
        indexda = solos.eq(i).attr('indexdata');
        if (hideYu == true) {
          solos.eq(i).hide();
          hideYu == false;
        }

      }
    }
  }, 500)
  setTimeout(function () {
		 
    hdgg.win({
      success: function (res) {
        
        alertCommon(res.ad.imageUrl, res.ad.advIntro);
        
        closeBtn(res);
        closeGo(res);
      }
    });
    hideYu == true;
    $('.start').show();
    $('.DB_guide').show();
    $('#showping').hide();
    $('.fish-container').removeClass('ani-pole');
  }, 1000)

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

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

function startFloat() {
  var i, h, t, s = 375 * window.remscale || document.documentElement.clientWidth || document.body.clientWidth,
      e = Math.ceil(3 * Math.random());
			 
  i = 'https://hdggcdn.bayimob.com/hdggstatic/laoyu9/bao.png', t = 'https://hdggcdn.bayimob.com/hdggstatic/laoyu9/bi.png',h='https://hdggcdn.bayimob.com/hdggstatic/laoyu9/pao.png', $(".floats").append(2 == e ? '<div class="float item row' + e + '" data-type="bottle"><img src="' + i + '"/></div>' : '<div class="float item row' + e + '" data-type="chest"><img src="' + t + '"/></div>');
  var a = s + "px,0,0";
	if(e==2) {
		$('#showping').attr('src','https://hdggcdn.bayimob.com/hdggstatic/laoyu9/bao.png')
	}else {
		$('#showping').attr('src','https://hdggcdn.bayimob.com/hdggstatic/laoyu9/bi.png')
	}
  $(".float").last().animate({
    left: "18.75rem"
  }, 5e3, "linear", function () {
    $(this).remove()
  }), timer = setTimeout(function () {
    startFloat()
  }.bind(this), 1200)
}

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
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
  })
}

function closeGo(res) {
  $('.goto').on('click', function () {
  	res.click();
  });
  $('.popShowPrize img').on('click', function (e) {
  	e.preventDefault();
  	e.stopPropagation();
  	var imgs = 1;
  	res.click(imgs);
  })
}