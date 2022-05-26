var $first = null;
var $second = null;
var $third = null;
$(function () {
  FZ(20, 375);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 8,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '今日福利（适配自定义素材,熊猫看书）',
    type: 180,
    rem: 20 / 375,
    // pddCustomDialog: false
    quAnDouYao: false,
    txEntranceShow: true
  });
  $('.banyuan').on('click',function() {
  	$('.banyuan').hide()
  	$('.lanse').show()
  })
  $('#quxiao').on('click',function() {
  	$('.lanse').hide()
  	$('.banyuan').show()
  })
  //超过0点清空记录
  var agoTime = hdgg.storage.get('agoTime') ? hdgg.storage.get('agoTime') : new Date().getTime();
  if (new Date().getTime() > agoTime) {
    hdgg.storage.remove('agoTime');
    hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
  }
  var dian = true;
  var haveTime = true;
  $('.starta').on('click', function () {
    if ($('#countZa').text() === '0') {
      $('.no_num').show();
    }
    if (haveTime) {
      hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
      haveTime = false;
    }
    if (!dian) {
      return;
    }
    var startC = hdgg.start();
    if (startC < 0) {
      $('.no_num').show();
      return;
    }
    $first = $($('.xiangziBox').children()).eq(0);
    $second = $($('.xiangziBox').children()).eq(1);
    $third = $($('.xiangziBox').children()).eq(2);
    dian = false;
    $('.starta').hide();
    $('.startb').show();
    $('.DB_guide').addClass('handb');
    $('.xiangzi').css('z-index', '2');
    $('.fan').addClass('addChai');
    setTimeout(function () {
      $('.card').css('z-index', '1').animate({
        'top': '-5rem'
      });
    }, 400);
    setTimeout(function () {
      $('.prize_img img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/WechatIMG170.jpeg');

      hdgg.win({
        success: function (res) {
          if (startC > 0) {
            res.close();
          }
          if (res.ad.advLayout == 1) {
            $('.prize_img img').attr('src', '');

            $('startb').show();
            $('.prize_img img').attr('src', res.ad.imageUrl);
            $('.prize_txt').text(res.ad.advIntro);
            $('.left_hua').show();
            closeGo(res);
          } else {
            if (startC < 0) {
              return
            } else {
              alertCommon(res.ad.imageUrl);
              closeBtn(res);
              closeGo(res);
            }
          }
        },
        fail: function (e) {
          if (!e) {
            $('.prize_img img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/xuanzhuan9/ban.png');
            $('.starta,.startb').hide(), $('.prize_txt').hide();
            $('.left_hua').show();
            $('.DB_guide').hide();
          }
        }
      });
      dian = true;
    });
  });

  function play(card) {
    var direction = GetSlideDirection(startX, startY, endX, endY);
    if (direction === 3 || direction === 0) {
      $('.left_hua').hide();
      dian = false;
      $('.prize_img img').attr('src', '');
      $('.prize_txt').text('');
      $(card).css('z-index', '-1').css('top', '2rem');
      $('.fan').removeClass('addChai');
      var startC = hdgg.start();
      if (startC < 0) {
        $('.no_num').show();
        return;
      }
      setTimeout(function () {
        $first.animate({
          "left": "3%",
          "top": "13rem",
          "width": "12.25rem",
          "height": "14.225rem",
          "margin-left": "0",
          "background-size": "100%",
          "z-index": "1"
        }, 100).css("background-image", "url(https://hdggcdn.bayimob.com/hdggstatic/xuanzhuan9/redbag2.png)");
      }, 200);
      setTimeout(function () {
        $second.animate({
          "left": "32%",
          "top": "13rem",
          "width": "12.25rem",
          "height": "14.225rem",
          "background-size": "100%",
          "z-index": "1"
        }, 100);
      }, 300);
      setTimeout(function () {
        $third.animate({
          "position": "absolute",
          "left": "50%",
          "top": "10.75rem",
          "margin-left": "-7.2rem",
          "width": "14.4rem",
          "height": "16.725rem",
          "background-size": "100%",
          "z-index": "2"
        }, 150).css("background-image", "url(https://hdggcdn.bayimob.com/hdggstatic/xuanzhuan9/redbag1.png)");
      }, 100);
      $third.insertBefore($first);
      setTimeout(function () {
        $first = $($('.xiangziBox').children()).eq(0);
        $second = $($('.xiangziBox').children()).eq(1);
        $third = $($('.xiangziBox').children()).eq(2);
        $('.fan').addClass('addChai');
        $(card).css('z-index', '1').animate({
          'top': '-5rem'
        });
        dian = true;
      }, 700);
      $('.prize_img img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/WechatIMG170.jpeg');

      hdgg.win({
        success: function (res) {
          if (startC > 0) {
            res.close();
          }
          if (res.ad.advLayout == 1) {
            $('.prize_img img').attr('src', '');

            $('startb').show();
            $('.prize_img img').attr('src', res.ad.imageUrl);
            $('.prize_txt').text(res.ad.advIntro);
            $('.left_hua').show();
            closeGo(res);
          } else {
            if (startC < 0) {
              return
            } else {
              alertCommon(res.ad.imageUrl);
              closeBtn(res);
              closeGo(res);
            }

          }
        },
        fail: function (e) {
          if (!e) {
            $('.prize_img img').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/xuanzhuan9/ban.png');
            $('.starta,.startb').hide(), $('.prize_txt').hide();
            $('.left_hua').show();
            $('.DB_guide').hide();
          }
        }
      });
    }
  }

  //向左滑动返回角度
  function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
  function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
      result = 4;
    } else if (angle >= 45 && angle < 135) {
      result = 1;
    } else if (angle >= -135 && angle < -45) {
      result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }

    return result;
  }

  //滑动处理
  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function () {
  //   history.pushState(null, null, document.URL);
  // });
  var startX, startY, endX, endY;
  document.getElementsByClassName('red_top')[0].addEventListener('touchstart', function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
  }, false);
  document.getElementsByClassName('red_top')[0].addEventListener('touchend', function (ev) {
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    if (!dian) {
      return;
    }
    play('.card');
  }, false);

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
  $('.close_zero').click(function () {
    $(this).parent().hide();
    $('.starta').show();
    $('.startb').hide();
    // $('.chai_red_bag').hide();
    // $('.starta,.startb').hide(),
    $('.DB_guide').hide();
    hdgg.start()
  });

  function closeGo(res) {
    $('.prize_img img').click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      var imgs = 1;
      res.click(imgs);
    });
    $('.startb').click(function () {
      res.click();
    })
    $('#hdgg_show-win-custom-pdd2 #hdgg-image-custom-pdd2').on('click', function (e) {
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

  function alertCommon(imageUrl) {
    var strs = '<div id="hdgg_show-win-custom-pdd2"><img id="hdgg-image-custom-pdd2" class="m-image2" src="' + imageUrl + '"><div class="card-sunshine"></div><span class="close-btn2 closetc iconfont"></span></div>';
    $('body').append(strs)
  }

  function closeBtn(res) {
    $('#hdgg_show-win-custom-pdd2').on('click', '.close-btn2', function () {
      $('#hdgg_show-win-custom-pdd2').remove();
      play('.card');
    })
  }
});
