

$(function() {
    FZ(20,375)
    new ReportHM()
    var flag = false
    var hdgg = new HDGG({
		appkey: getUrlParam('appkey'),
		adSpaceKey: getUrlParam('adSpaceKey'),
		times: 8,
		timesEle: '#countZa',
		recordEle: '.jiang',
		name: '打病毒，赢红包',
		type: 927,
		rem: 20 / 375,
        txEntranceShow: true,
        haveVideoAd:false,
        gamecenterShow:false

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
    //   $('.jiu').addClass('jiuDong')
    setInterval(function() {
        $('.bing1').animate({'top':'29.15rem'},4000,function() {
            $('.bing1').css('top','2rem')
        })
    $('.bing2').animate({'top':'29.15rem'},2000,function() {
        $('.bing2').css('top','2rem')
    })
    $('.bing3').animate({'top':'29.15rem'},3000,function() {
        $('.bing3').css('top','2rem')
    })
    $('.bing4').animate({'top':'29.15rem'},17000,function() {
        $('.bing4').css('top','2rem')
    })
    $('.bing5').animate({'top':'29.15rem'},3200,function() {
        $('.bing5').css('top','2rem')
    })
    $('.bing6').animate({'top':'29.15rem'},2500,function() {
        $('.bing6').css('top','2rem')
    })
    $('.bing7').animate({'top':'29.15rem'},3000,function() {
        $('.bing7').css('top','2rem')
    })
    $('.bing8').animate({'top':'29.15rem'},2600,function() {
        $('.bing8').css('top','2rem')
    })
    }, 1200);
//    $('.jiu').on('click',function() {
//        $('.jiuZhu').animate({'height':'15.825rem'},300)
//        hdgg.win({
//         success: function(res) {
//             var startC = hdgg.start()
//             alertCommon(res.ad.imageUrl, res.ad.advIntro);
//             closeBtn(res)
//              closeGo(res)
//         }

//     });
//    })
   var startX,startY,endX,endY,trans = 0;
   var width = document.getElementsByClassName("jiu").clientWidth;
   document.getElementsByClassName('jiu')[0].addEventListener('touchstart',function(e) {
    e.preventDefault()
    // $('.jiu').removeClass('jiuDong')
    $('.tishi,.hand').hide()
    startX = e.touches[0].pageX;
    // starty = e.touches[0].pageY;
   })
   document.getElementsByClassName('jiu')[0].addEventListener('touchmove',function(e) {
    e.preventDefault()
    endX = e.touches[0].pageX;
    trans = trans+endX-startX;
   
    // if(0-trans>= width){  
    //     trans = 0 - width    
    //  }   
    //  if(trans>=0){
    //     trans = 0;
    //  }
    if(trans<-84) {
        trans = 0;
    }
    if(trans>85) {
        trans = 0;
    }
     console.log(trans)
     document.getElementsByClassName("jiu")[0].style.transform = 'translateX('+trans+'px)';//这里设置元素的滚动距离。
      startX = endX 
     
})
document.getElementsByClassName('jiu')[0].addEventListener('touchend',function(e) {
    e.preventDefault()
    if(flag) {
        return
    }
    flag = true
    var startC = hdgg.start()
    if(startC<0) {
        flag = false
        return
    }
     $('.jiuZhu').animate({'height':'15.825rem'},300)

     
    if(trans<-50) {
        // debugger
         $('.bing1').css('background-image','url(./img/ziHui.png)')
         $('.bing2').css('background-image','url(./img/bd1Hui.png)')
    }else if(trans>50) {
        $('.bing3').css('background-image','url(./img/bd2Hui.png)')
         $('.bing4').css('background-image','url(./img/bd3Hui.png)')
    }else {
        $('.bing5').css('background-image','url(./img/bd4Hui.png)')
         $('.bing6').css('background-image','url(./img/bd5Hui.png)')
         $('.bing7').css('background-image','url(./img/bd6Hui.png)')
         $('.bing8').css('background-image','url(./img/bd8Hui.png)')
    }
    
    hdgg.win({
        success: function(res) {
            alertCommon(res.ad.imageUrl, res.ad.advIntro);
            closeBtn(res)
             closeGo(res)
        }

    });
})
function alertCommon(imageUrl, advIntro) {
    var strs =
        '<div no-heatmap class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' +
        imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro +
        '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
    $('body').append(strs);
    setTimeout(function() {
        $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
        
    }, 1500)
}
function closeBtn(res) {
    $('#dialog5').on('click', '.close-btn', function() {
        res.close();
        window.styleReset();
    })
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
window.styleReset = function() {
    $('#dialog5').addClass('hidem');
    $('#dialog5').remove();
    flag = false
    $('.bing1').css('background-image','url(./img/ziBin.png)')
    $('.bing2').css('background-image','url(./img/bd1.png)')
    $('.bing3').css('background-image','url(./img/bd2.png)')
    $('.bing4').css('background-image','url(./img/bd3.png)')
    $('.bing5').css('background-image','url(./img/bd4.png)')
    $('.bing6').css('background-image','url(./img/bd5.png)')
    $('.bing7').css('background-image','url(./img/bd6.png)')
    $('.bing8').css('background-image','url(./img/bd8.png)')
    $('.jiuZhu').css('height','0rem')
    document.getElementsByClassName("jiu")[0].style.transform = 'translateX('+0+'px)';//这里设置元素的滚动距离。
}
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

})