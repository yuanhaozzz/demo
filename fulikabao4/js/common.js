$(function () {
  FZ(20, 375);
  var $first = null;
  var $second = null;
  var $third = null;
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '福利卡包(美篇定制)',
    type: 226,
    rem: 20 / 375,
    noRedpacket: true,       //无初始掉落红包
    entranceShow: false,    //左上角
    pddCustomDialog: false,
		gamelistShow:false,
		gamecenterShow: false,   //右下角
     
  });
  
   
  
  if (hdgg.storage.get('leftTimes') == 0) {
    $('.paibgm').eq(0).find('img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/kong.png');
    // $('.getMore img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/lookMored.png');
    $('.hot-logo').text('');
    // $('.getFree').hide();
    // return
  }
  $('.rule').on('click', function () {
    $('.alerty').show();
    $('.zhenotice').show();
  });
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

  // function rotate_btn() {
  //   $('.getFree').addClass('add_rotate');
  //   setTimeout(function () {
  //     $('.getFree').removeClass('add_rotate');
  //     $('.getMore').addClass('add_rotate')
  //   }, 800);
  //   setTimeout(function () {
  //     $('.getFree').addClass('add_rotate');
  //     $('.getMore').removeClass('add_rotate');
  //   }, 1600);
  //   setTimeout(rotate_btn, 1600)
  // }
  //
  // setTimeout(function () {
  //   rotate_btn();
  // }, 1500);
  var adg = null;
  setTimeout(function () {
    $('.paibgm1').removeClass('out').addClass('in');
    hdgg.start();
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          adg = res;
          $(".paibgm1 img").attr('src', res.ad.imageUrl);
          $('.hot-logo').text(res.ad.advIntro);
          closeGo(res);
        },
        fail: function (e) {
          if (!e) {
            $(".paibgm").eq(0).find('img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/kong.png');
            $('.hot-logo').text('');
          }
        }
      });
    }, 900)
  }, 1000);

  var flag = true;
  $('.getMore img').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (hdgg.storage.get('leftTimes') === 0) {
      hdgg.start();
      return
    }
    $(this).attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/lookMored.png');
    if (!!adg) {
      adg.close();
    }
    // if ($('.getMore img').attr('src') === 'https://hdggcdn.bayimob.com/hdggstatic/shouqianba4/disLook.png') {
    //   return;
    // }
    if (!flag) {
      return
    }
    hdgg.start();
    flag = false;
    $first = $('.paibgm').eq(0);
    $second = $('.paibgm').eq(1);
    $third = $('.paibgm').eq(2);
    $('.hot-logo').fadeOut();
    $first.addClass('rotate_card').removeClass('in').addClass('out').find('img').attr('src', '');
    $first.insertAfter($third);
    $second.css('z-index','3');
    $third.css('z-index','2');
    $first.css('z-index','1');
    setTimeout(function(){
      $second.animate({'top': '6rem', 'width': '100%', 'margin-left': '-50%', 'z-index': '3', 'opacity': '1'});
      $third.animate({'top': '5rem', 'width': '94%', 'margin-left': '-47%', 'z-index': '2', 'opacity': '0.6'});
      $first.animate({'top': '4rem', 'width': '86%', 'margin-left': '-43%', 'z-index': '1', 'opacity': '0.2'});
    },500);
    setTimeout(function () {
      $second.addClass('in').removeClass('out');
      setTimeout(function () {
        flag = true;
        $('.getMore img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/lookMore1.png');
        hdgg.win({
          success: function (res) {
            adg = res;
            $second.find('img').attr('src', res.ad.imageUrl);
            $('.hot-logo').text(res.ad.advIntro);
            $('.hot-logo').fadeIn();
            closeGo(res);
          },
          fail: function (e) {
            if (!e) {
              $(".paibgm").eq(0).find('img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/fulikabao/kong.png');
              $('.hot-logo').text('');
            }
          }
        });
      }, 900);
    }, 1000);
  });

  function closeGo(res) {
    $('.getFree').click(function () {
      res.click();
    });
    $('.paibgm').eq(0).find('img').click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      var imgs = 1;
      res.click(imgs);
    })
  }

  function FZ(a, b) {
    function getFZ() {
      var width = document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 750) {
        width = 750;
      }
      var fontSize = (a / b) * width;
      return fontSize;
    }
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
});
