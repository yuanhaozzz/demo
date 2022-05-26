$(function () {
  FZ(20, 375);
  $('.butterflies').animate({'left': '0', 'top': '5.75rem'}, 2000);
  $('.hua').animate({'right': '0', 'top': '5.5rem'}, 2500);
  var turnplate = {
    // restaraunts: [],				//大转盘奖品名称
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 198,			//大转盘外圆的半径
    textRadius: 155,				//大转盘奖品位置距离圆心的距离
    insideRadius: 34,			//大转盘内圆的半径
    startAngle: 0,				//开始角度

    bRotate: false				//false:停止;ture:旋转
  };
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '夏日来袭B',
    type: 303,
    rem: 20 / 375,
    txEntranceShow:false
    // entranceShow: false,     //左上角
    // gamecenterShow: true,   //右下角
    // gamelistShow: true    //次数用光大弹窗
  });
 
  $(document).ready(function () {
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

    //旋转转盘
    var rotateFn = function () {
      // var randomDeg = parseInt(Math.random() * 2);
      // console.log(randomDeg);
      // var angles = [620, 440][randomDeg];
      $('.bian').removeClass('active');
      $('.bian').removeAttr("style");
      $('.bian').rotate({
        angle: 0,
        animateTo: (433 + 820),
        duration: 5000,
        callback: function () {
          hdgg.win({
            success: function (res) {
              alertCommon(res.ad.imageUrl, res.ad.advIntro, res.ad.receiveText);
              closeBtn(res);
              closeGo(res);
            }
          });
          turnplate.bRotate = !turnplate.bRotate;
          $('.pointer').removeClass('stop');
          $('.pointer').attr('src', './images/start.png');
          $('.DB_guide').show();
          setTimeout(function () {
            $('.bian').addClass('active');
          }, 1000)
        }
      });

    };

    $('.pointer').click(function () {
      $(this).attr('src', './images/started.png');
      $('.DB_guide').hide();
      if ($(this).hasClass('stop')) {
        return;
      }
      if ($('#countZa').text() != 0) {
        $(this).addClass('stop');
      }


      var startC = hdgg.start();
      if (startC < 0) {
        return;
      }

      if (turnplate.bRotate) return;
      turnplate.bRotate = !turnplate.bRotate;
      rotateFn();
    });
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
  	var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg""><img src="' + imageUrl + '"></div><div class="red-bg"></div><div class="red-bg1"></div><div class="red-bg2"></div><div class="red-txt"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
  	$('body').append(strs);
  	setTimeout(function () {
  		$('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
  	}, 1500)
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
    $('.DB_guide').show();
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
    })
  }
})

