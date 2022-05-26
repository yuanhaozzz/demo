$(function () {
  FZ(20, 375);
  var hdgg = new HDGG({
    appkey: getUrlParam('appkey'),
    adSpaceKey: getUrlParam('adSpaceKey'),
    times: 20,
    timesEle: '#countZa',
    recordEle: '.jiang',
    name: '集五福',
    type: 196,
    rem: 20 / 375,
    entranceShow: true,     //左上角
    pddCustomDialog: true,
    txEntranceShow: true
  });
	  $('.tongs').addClass('activity');
	 // $('.zhuazi').addClass('activity')
  //超过0点清空记录
  var agoTime = hdgg.storage.get('agoTime') ? hdgg.storage.get('agoTime') : new Date().getTime();
  if (new Date().getTime() > agoTime) {
    hdgg.storage.remove('agoTime');
    hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
  }
  setTimeout(function () {
    $('#init').hide();
  }, 2000);
  $('.rule').on('click', function () {
    $('.alerty').show();
    $('.zhenotice').show();
  });
  $('body .moresay').on('click', function () {
    $(this).toggleClass('activeadv')
    $('.moresayp').toggle();
  });
  $('.alerty').on('click', '.saclose', function () {
    $('.moresay').removeClass('activeadv');
    $('.moresayp').hide();
    $('.alerty').hide();
    $('.zhenotice').hide();
  });
  $('.closeFu').click(function () {
    $(this).parent().hide();
  })
  var index1 = hdgg.storage.get('game1') || 0;
  var index2 = hdgg.storage.get('game2') || 0;
  var index3 = hdgg.storage.get('game3') || 0;
  var index4 = hdgg.storage.get('game4') || 0;
  var index5 = hdgg.storage.get('game5') || 0;
  var fuArr = hdgg.storage.get('fuArr') || [];
  var allFu = hdgg.storage.get('allFu') || {};
  showNum(allFu);

  function showNum(showArr) {
    for (var x in showArr) {
      $('.select').eq(x).addClass('fu' + (Number(x) + 1));
      $('.commonNum').eq(x).text(showArr[x]).addClass('fu');
    }
    for (var w = 0, fl = $('.commonNum'); w < fl.length; w++) {
      if (!!fl.eq(w).hasClass('fu')) {
        fl.eq(w).show();
        $('#botFuZi').find('.fu_txt').eq(w).addClass('fuGold');
      }
    }
  }

  function collect() {
    var twice = hdgg.storage.get('leftTimes');
    if (twice == 19 || twice == 17 || twice == 13) {
      $('#getFu').show(), $('.whichFu').text('富强福');
      $('.select').eq(0).addClass('fu1');
      fuArr.push(0);
    } else if (twice == 18 || twice == 16 || twice == 14) {
      $('#getFu').show(), $('.whichFu').text('友善福');
      $('.select').eq(2).addClass('fu3');
      fuArr.push(2);
    } else if (twice == 15) {
      $('#getFu').show(), $('.whichFu').text('和谐福');
      $('.select').eq(1).addClass('fu2');
      fuArr.push(1);
    } else if (twice == 12) {
      $('#getFu').show(), $('.whichFu').text('爱国福');
      $('.select').eq(3).addClass('fu4');
      fuArr.push(3);
    } else if (twice < 12) {
      $('#getFu').show();
      var numFu = Math.floor(Math.random() * 4 + 1);
      numFu == 1 ? $('.whichFu').text('富强福') :
          numFu == 2 ? $('.whichFu').text('友善福') :
              numFu == 3 ? $('.whichFu').text('和谐福') :
                  numFu == 4 ? $('.whichFu').text('爱国福') :
      $('.select').eq(numFu).addClass('fu' + numFu);
      fuArr.push(numFu);
    }
  }

  function getfuCount(arr) {
    var obj = {};
    for (var i = 0, l = arr.length; i < l; i++) {
      var item = arr[i];
      obj[item] = (obj[item] + 1) || 1;
    }
    return obj;
  }

  var nowI = 0;
  $('.show').eq(nowI).animate({
    'height': '18rem'
  }, 500)
  var wArr = [
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
    {
      'txt': '5秒前',
      'iphone': '用户130****8727已集齐',
      'money': '瓜分20元'
    },
  ];
  //文字轮播
  var sucHtml = '';
  for (var w = 0, hao = wArr; w < hao.length; w++) {
    sucHtml += "<li class='lunboTxt'><span style='padding-right: 0.5rem'>" + wArr[w].txt + "</span><span style='padding-right: 0.5rem'>" + wArr[w].iphone + "</span><span>" + wArr[w].money + "</span</li>"
  }
  $('#successList').append(sucHtml);
  var marginTop = 0;//注意命名
  var scroll = true;
  setInterval(function () {
    if (scroll) {
      $("#list li:first").animate(  //第一个li开始执行动画
          {marginTop: marginTop -= $("#list li:first").height()}, //设置上面的外边距自减
          'linear',
          function () {  //动画之后执行的函数
            if (-marginTop === $("#list li:first").height()) { //判断li移动的距离是否超过自身的高度
              var $f = $(this); //复制一个li
              $(this).remove(); //把第一个移除。第一个移除之后，第二个就自动变为第一个
              marginTop = 0;
              $f.css("margin-top", "0rem");
              ($f).appendTo($("#list ul")); //把第一个追加加到列表的最后，变成一个无缝连接
            }
          })
    }
  }, 1500);

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
      window.styleReset();
    })
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
      $('#dialog5').remove();
    })
  }

  window.styleReset = function () {
    collect();
    allFu = getfuCount(fuArr);
    showNum(allFu);
    hdgg.storage.set('fuArr', fuArr);
    hdgg.storage.set('allFu', allFu);
    $('#dialog5').remove();
    if (nowI == 0) {
      $first.addClass('ddong');
      $('#dialog5').addClass('hidem');
      $first.removeClass('ddong');
      $('.chuizi').animate({'right': '0.5rem', 'top': '2rem'});
      setTimeout(function () {
        $first.animate({
          "left": "9%",
          "top": "5.75rem",
          "width": "9.1rem",
          "height": "10.5rem",
          "z-index": '0',
          "background-size": '90%'
        }, 100);
      }, 200);
      setTimeout(function () {
        $second.animate({
          "left": "45%",
          "top": "5.75rem",
          "width": "9.1rem",
          "height": "9.8rem",
          "background-size": '90%'
        }, 100);
      }, 300);
      setTimeout(function () {
        $third.animate({
          "left": "25%",
          "top": "4.2rem",
          "width": "9.1rem",
          "height": "10.5rem",
          "z-index": '2',
          "background-size": '100%'
        }, 150);
      }, 100);
      $third.insertBefore($first);
      $($('.xiangziBox').children()).eq(1);
      $($('.xiangziBox').children()).eq(0).removeClass('eggbreak');
      $($('.xiangziBox').children()).eq(2).removeClass('eggbreak');
    } else if (nowI == 1) {
      dansuiSwitch = true;
    }

  };

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

  //切换
  var haveTime = true;
  $('#botFu .select').click(function () {
    if (haveTime) {
      hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);
      haveTime = false;
    }
    nowI = $(this).index();
    $('#content').find('.show').eq(nowI).show().siblings().hide().css('height', '1rem');
    $('#botFu').find('.select').eq(nowI).removeClass('dou').siblings().addClass('dou');
    $('.show').eq(nowI).animate({
      'height': '18rem'
    }, 500);
  });
//  旋转砸蛋
   
  var dian = true;
  $('.btn').on('click', function () {
//     if (!dian) {
//       return;
//     }
    var startC = hdgg.start();
    if (startC < 0) {
      return;
    }
    index1++;
    if (index1 <= 4) {
      hdgg.storage.set('game1', index1)
    } else {
      $('#alertNoNum').show();
      setTimeout(function () {
        $('#alertNoNum').hide();
      }, 1000)
      return
    }
     var leftg = parseFloat($('.tongs').offset().left / 20);
     var topg = parseFloat($('.tongs').offset().top / 20);
     var sdeg = leftg / topg;
		 console.log( leftg,topg)
		 debugger
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
   
     
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          alertCommon(res.ad.imageUrl, res.ad.advIntro);
          closeBtn(res);
          closeGo(res)
        }
      });
      $('.starta').removeClass('startb');
      dian = true;
    }, 1600);
  });
  //转盘
  var turnplate = {
    // restaraunts: [],				//大转盘奖品名称
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 198,			//大转盘外圆的半径
    textRadius: 155,				//大转盘奖品位置距离圆心的距离
    insideRadius: 34,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false				//false:停止;ture:旋转
  };
  var rotateFn = function () {
    // var randomDeg = parseInt(Math.random() * 2);
    // console.log(randomDeg);
    // var angles = [620, 440][randomDeg];
    $('.bian').removeClass('active');
    $('.bian').removeAttr("style");
    $('.bian').rotate({
      angle: 0,
      animateTo: (650 + 1600),
      duration: 5000,
      callback: function () {
        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro);
            closeBtn(res);
            closeGo(res)
          }
        });
        turnplate.bRotate = !turnplate.bRotate;
        $('.pointer').removeClass('stop');
        $('.pointer').attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/dazhuanpan18/start.png');
        $('.DB_guide').show();
        setTimeout(function () {
          $('.bian').addClass('active');
        }, 1000)
      }
    });

  };

  $('.pointer').click(function () {
    $(this).attr('src', 'https://hdggcdn.bayimob.com/hdggstatic/dazhuanpan18/started.png');
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
    index2++;
    if (index2 <= 4) {
      hdgg.storage.set('game2', index2)
    } else {
      $('#alertNoNum').show();
      setTimeout(function () {
        $('#alertNoNum').hide();
      }, 1000)
      return
    }
    if (turnplate.bRotate) return;
    turnplate.bRotate = !turnplate.bRotate;
    rotateFn();
  });
  //  翻牌子
  var ia = 0;
  var site = 0;
  var site1 = 0;
  var inter = true;

  function gaibian() {
    if (ia == 0) {
      ia = 1;
      $(".biaode").removeClass("zhuan_left");
      $(".biaode").addClass("zhuan_right");
    } else {
      ia = 0;
      $(".biaode").addClass("zhuan_left");
      $(".biaode").removeClass("zhuan_right");
    }
  }

  var fuSite = 0;
  //底部福字动画
  setInterval(function () {
    if ($('#botFu').find('div').hasClass('dou')) {
      $('#botFu').find('.dou').eq(fuSite).addClass('addFuDou').siblings('div').removeClass('addFuDou');
      fuSite++;
      if (fuSite == 4) {
        fuSite = 0;
      }
    }
  }, 1000);
  //换牌
  setInterval(function () {
    if (!inter) {
      return;
    }
    $('.banner3').find('div').eq(site).removeClass('init');
    site++;
  }, 300)
  //闪牌
  setInterval(function () {
    if (!inter) {
      $('.banner3').find('div').removeClass('active');
      return;
    }
    if (!$('.banner3').find('div').hasClass('init')) {

      $('.banner3').find('div').eq(site1).addClass('active').siblings('div').removeClass('active');
      site1++;
      if (site1 == 6) {
        site1 = 0;
      }
    }

  }, 1000)
  $('.banner3').on('click', 'div', function () {
    if (!$('.banner3').find('div').hasClass('init')) {
      var startC = hdgg.start();
      if (startC < 0) {
        return;
      }
      index3++;
      if (index3 <= 4) {
        hdgg.storage.set('game3', index3)
      } else {
        $('#alertNoNum').show();
        setTimeout(function () {
          $('#alertNoNum').hide();
        }, 1000)
        return
      }
      $(this).hide();
      inter = false;
      $('.zhenotice').show();
      $('body').append('<img class="biaode" src="https://hdggcdn.bayimob.com/hdggstatic/laodongjie/paizi-2.png"/>');
      var interbal = setInterval(gaibian, 100);
      setTimeout(function () {
        clearInterval(interbal);
        $(".biaode").removeClass("zhuan_left").removeClass("zhuan_right");
        $(".biaode").addClass('zhuansi')
      }, 500)
      setTimeout(function () {
        $(".biaode").remove();
        $('.zhenotice').hide();
        hdgg.win({
          success: function (res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro);
            closeBtn(res, act);
            closeGo(res)
          }
        });
      }, 800)
    }
  })
//砸蛋
  var danindex = 0;
  var dansuiSwitch = true;
  var suiArr = null;
  jindanAnimation('beat', '.full', 1000);

  function jindanAnimation(aniClass, son, time) {
    var eggint = setInterval(function () {
      if (dansuiSwitch == true) {
        danindex = danindex == $('#danlist').find('.full').length ? 0 : danindex;
        $('#danlist').find('.full').eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
        danindex++;
      } else {
        $('#danlist').find('.full').removeClass(aniClass);
      }
      if ($('#danlist').find('.full').length == 1) {
        $('#danlist').find('.full').removeClass(aniClass).addClass('beat1');
      }
    }, time);
  }

  var zaload = true;
  $('#danlist .full').on('click', function () {
    if (zaload == false) {
      return;
    }
    var obj = $(this);

    if (obj.hasClass('eggbreak2')) {
      return;
    }

    var eggOffset = $(this).offset();
    var eggWidth = $(this).width();
    var windowWidth = $(window).width();
    var left = windowWidth - eggWidth - eggOffset.left;
    var startC = hdgg.start();
    var index = $(this).index();
    if (startC < 0) {
      return;
    }
    index4++
    if (index4 <= 4) {
      hdgg.storage.set('game4', index4)
    } else {
      $('#alertNoNum').show();
      setTimeout(function () {
        $('#alertNoNum').hide();
      }, 1000)
      return
    }
    if (suiArr instanceof Array) {
      suiArr.push(index);
      hdgg.storage.set('sui', suiArr);
    }
    dansuiSwitch = false;
    obj.removeClass('full').removeClass('beat');
    zaload = false;
    $(".chuizi").animate({top: eggOffset.top - 30, right: left - 30}, 1200, function () {
      obj.addClass('eggbreak2');
      setTimeout(function () {
        $(".chuizi").css({top: '10.0rem', right: 0})
      }, 1100)
      danindex = 0;
    });
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          alertCommon(res.ad.imageUrl, res.ad.advIntro);
          closeBtn(res);
          closeGo(res)
        }
      });
      zaload = true;
    }, 1200);
  });

  //  摇骰子
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }

  var act = 2;
  $('.starta2,.saizi').on('click', function () {
    if (!dian) {
      return;
    }
    var startC = hdgg.start();
    if (startC < 0) {
      return;
    }
    index5++;
    if (index5 <= 4) {
      hdgg.storage.set('game5', index5)
    } else {
      $('#alertNoNum').show();
      setTimeout(function () {
        $('#alertNoNum').hide();
      }, 1000)
      return
    }
    act = randomNum(1, 5);
    $('.starta').addClass('startb').removeClass('ready');
    $('.saizi').removeClass('saizihuang').addClass('moving');
    setTimeout(function () {
      $('.saizi').removeClass('moving').addClass('act' + act);
    }, 1500);
    dian = false;
    setTimeout(function () {
      hdgg.win({
        success: function (res) {
          alertCommon(res.ad.imageUrl, res.ad.advIntro);
          closeBtn(res, act);
          closeGo(res)
        }
      });
      $('.starta').removeClass('startb').addClass('ready');
      dian = true;
    }, 2000)
  })
})