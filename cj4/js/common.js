"use strict";
$(function () {
  pages.init();
  $('body').on('click', '.rules', function () {
    $('.alerty').show();
    $('.zhenotice').show();
  })
  $('body .moresay').on('click', function () {
    $(this).toggleClass('activeadv');
    $('.moresayp').toggle();
  })
  $('body .saclose').on('click', function () {
    $('.moresay').removeClass('activeadv');
    $('.moresayp').hide();
    $('.alerty').hide();
    $('.zhenotice').hide();
  })
});
var util = {
  fz: function (t, e) {
    function n() {
      var n = document.documentElement.clientWidth || document.body.clientWidth;
      return t / e * n
    }

    return document.documentElement.style.fontSize = n() + "px", window.onresize = function () {
      setTimeout(function () {
        document.documentElement.style.fontSize = n() + "px"
      }, 100)
    }, n
  }, getUrlParam: function (t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = window.location.search.substr(1).match(e);
    return null != n ? decodeURIComponent(n[2]) : null
  }
}, getFZ = util.fz(20, 375), pages = function (t) {
  var e = {results: [0, 8]}, n = void 0, o = function () {
        t("#j-start").on("click", function () {
          m()
        })
      }, i = [0, 1, 2, 5, 8, 7, 6, 3], s = t(".m-flex .m-flex-item-prize-box"), r = "stop", a = 0, c = 0, u = 50, l = 10,
      m = function () {
				debugger
        "stop" == r && (r = "playing", f(), n.start() > -1 ? (t("#j-start").css("background-image", "url(./images/btn1.png)"), d()) : r = "stop")
      }, f = function () {
        c = 0, u = 50, l = 1
      }, d = function n() {
        c += 1;
        var o = i[a];
        if (g(o), a = (a + 1) % i.length, "stop" != r) {
          var s = c < 20 ? 40 : p();
          s > 200 && t.inArray(o, e.results) > -1 ? b(o) : setTimeout(function () {
            n()
          }, s)
        }
      }, p = function () {
        return l += u > 50 ? 3 : 2, u += l
      }, g = function (t) {
        s.removeClass("active"), s.eq(t).addClass("active")
      }, b = function (e) {
        setTimeout(function () {
          t("#j-start").css("background-image", "url(./images/btn.png)");
        }, 1500), t('<div id="j-win-wrapper" style="position: fixed;top:0;left:0;right:0;bottom:0;"></div>').appendTo(t("body")), r = "stop";
        var o = t(".m-playarea .m-flex .m-flex-item-prize-box").eq(e), i = o.offset(), s = o.clone().appendTo(t("body"));
        s.css({
          position: "absolute",
          top: i.top + "px",
          left: i.left + "px",
          width: i.width + "px",
          height: i.height + "px",
          "transition-timing-function": "cubic-bezier(.8,.11,.76,.86)"
        }), setTimeout(function () {
          s.css("transition-duration", ".5s"), s.addClass("m-prize-transition-scale")
        }, 250), setTimeout(function () {
          s.css("transition-duration", ".3s"), s.removeClass("m-prize-transition-scale")
        }, 500), setTimeout(function () {
          s.css("transition-duration", ".4s"), s.addClass("m-prize-transition-move")
        }, 700), setTimeout(function () {
          s.remove(), n.win(), t("#j-win-wrapper").remove()
        }, 1200), setTimeout(function () {
          v()
        }, 2200)
      }, v = function t() {
        g(i[a]), a = (a + 1) % i.length, "stop" == r && setTimeout(function () {
          t()
        }, 800)
      };
  return {
    init: function () {
      n = new HDGG({
        appkey: util.getUrlParam("appkey"),
        adSpaceKey: util.getUrlParam("adSpaceKey"),
        name: "极简九宫格",
        type: 432,
        times: 8,
        timesEle: "#a-times",
		    recordEle: '.jiang2',
        rem: 20 / 375,
        entranceShow: true,     //左上角
        // gamecenterShow: true,   //右下角
        gamelistShow: true    //次数用光大弹窗
      }), o(), v()
    }
  }
}(window.jQuery || window.Zepto || "");