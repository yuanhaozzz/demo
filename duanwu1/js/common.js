$(function () {
  var modify = false;
  //为避免移动端 图片隐藏时 不加载当前图片 故先加载 在隐藏  避免图片切换时产生 空白间隙
  $(".content .zongzi_shy").hide();

  FZ(20, 375);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '吃粽子拿红包(2)',
    type: 607,
    rem: 20 / 375,
    entranceShow: true,     //左上角
    gamecenterShow: true,   //右下角
    gamelistShow: true    //次数用光大弹窗
  });
  var num = 1;
  var Interval =  setInterval(function(){
    num++;
		if (num==10) {
			num=1;
    }
    if(num == 1 ){
      $(".static.zongzi_ing").removeClass('ststus9');
    }

    $(".static.zongzi_ing").removeClass('ststus'+(num-1)).addClass('ststus'+num);
		
  },333);



  $(document).ready(function () {
    // localStorage.clear();
    if(modify){
      $(".content").css('margin-top','-1.3rem');
      $(".counts").css('top','6.2rem')
    }
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

    $("body").on("click",".m-close,.close-btn",function(){
      $(".item_button img").attr("src","./images/item_button.png");
    });


    var falg = true;
    $('.content').on("click",".item_button img,.content .can_click",function () {
      $(this).attr("src","./images/item_button_no.png");
      if( !falg) return;
      var startC = hdgg.start();

      falg = false
      if (startC < 0) {
        falg = true;
        return;
      }

      $(".content .zongzi_shy").show();
      $(".content .zongzi_ing").hide();
      
      setTimeout(function(){
        $(".content .result_pop").show();
      },800);
      // setTimeout(function(){
      //   $(".light_box img").attr("src","./images/caiguang.png");
      //   $(".light_box").css("z-index","1")
      // },2700);
      
      setTimeout(function(){
        $(".content .zongzi_ing").show();
        $(".content .result_pop").hide();
        $(".content .zongzi_shy").hide();
        falg = true;

        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro, res.ad.receiveText);
            closeBtn(res);
            closeGo(res);
          }
        });
      },1700);
    });
  });

  function FZ(a, b) {
    function getFZ() {
      var width = document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 750) {
        width = 750;
      }
      var fontSize = Math.round((a / b) * width);
      if(fontSize%2 > 0){
        fontSize = fontSize - 1;
        modify = true;
      }

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

  function alertCommon(imageUrl, advIntro, txt) {
    var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg""><img src="' + imageUrl + '" alt=""></div><div class="red-bg"></div><div class="red-bg1"></div><div class="red-bg2"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto">' + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
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

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}