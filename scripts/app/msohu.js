 /** m.tv.sohu.com, v1.0.0 ,time  20150414 14:51:24, sohu inc */
function getAdsCallback(a) {
    function b(a) {
        var b, c, e, f, g, h, i;
        for (h = a.length, g = 0, i = ""; h > g; ) {
            do
                b = d[255 & a.charCodeAt(g++)];
            while (h > g && -1 == b);
            if (-1 == b)
                break;
            do
                c = d[255 & a.charCodeAt(g++)];
            while (h > g && -1 == c);
            if (-1 == c)
                break;
            i += String.fromCharCode(b << 2 | (48 & c) >> 4);
            do {
                if (e = 255 & a.charCodeAt(g++), 61 == e)
                    return i;
                e = d[e]
            } while (h > g && -1 == e);
            if (-1 == e)
                break;
            i += String.fromCharCode((15 & c) << 4 | (60 & e) >> 2);
            do {
                if (f = 255 & a.charCodeAt(g++), 61 == f)
                    return i;
                f = d[f]
            } while (h > g && -1 == f);
            if (-1 == f)
                break;
            i += String.fromCharCode((3 & e) << 6 | f)
        }
        return i
    }
    function c(a) {
        var b, c, d, e, f, g;
        for (b = "", d = a.length, c = 0; d > c; )
            switch (e = a.charCodeAt(c++), e >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    b += a.charAt(c - 1);
                    break;
                case 12:
                case 13:
                    f = a.charCodeAt(c++), b += String.fromCharCode((31 & e) << 6 | 63 & f);
                    break;
                case 14:
                    f = a.charCodeAt(c++), g = a.charCodeAt(c++), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
            }
        return b
    }
    var d = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    xmlData = c(b(a)), vast.parseData(xmlData)
}
!function() {
    window.sohutv = {isJump: !1,ua: navigator.userAgent,isDebug: !1,isOnLine: !1,plat: {},getQueryString: function(a) {
            var b = new RegExp("(^|&?)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
            return null !== c ? unescape(c[2]) : null
        },getQueryJsonData: function() {
            var a = window.location.search.substr(1);
            a = a.replace(/^\?+/, "").replace(/&amp;/, "&");
            for (var b, c = a.split("&"), d = c.length, e = {}; d--; )
                if (b = c[d].split("="), b[0]) {
                    var f = b[1] || "";
                    try {
                        f = decodeURIComponent(f)
                    } catch (g) {
                        f = unescape(f)
                    }
                    e[decodeURIComponent(b[0])] = f
                }
            return e
        },blankFun: function() {
        },getAsyncScript: function(a, b) {
            var c = document.getElementsByTagName("head")[0] || document.body, d = document.createElement("script");
            d.async = "true", d.src = a, b && (d.onload = b), c.appendChild(d)
        }, getScript: function(a, b, c) {                
            var d = document.getElementsByTagName("head")[0] || document.body,
                e = document.createElement("script"),
                f = !1;
            e.type = "text/javascript", 
            e.src = a,
            e.onload = e.onreadystatechange = function() {
                f || this.readyState && "loading" === this.readyState || (
                    f = !0,
                    b && b.apply(null, c || []), 
                    e.onload = e.onreadystatechange = null
                    d.removeChild(e)
                )
            },
            d.appendChild(e)
        },
        getCSS: function(a) {
            var b = document.getElementsByTagName("head")[0] || document.body, c = document.createElement("link");
            c.href = a, c.rel = "stylesheet", c.type = "text/css", b.appendChild(c)
        },
        addPlat: function() {
            var a = navigator.userAgent, b = document.getElementsByTagName("html")[0], c = [];
            this.plat.IsAdr = !(!/Android|HTC|Adr/i.test(a) && !(navigator.platform + "").match(/Linux/i)), this.plat.IsIPad = !this.plat.isAdr && /iPad/i.test(a), this.plat.IsIPhone = !this.plat.isAdr && /iPod|iPhone/i.test(a), this.plat.IsWindowsPhone = /Windows Phone/i.test(a), this.plat.IsIOS = this.plat.IsIPad || this.plat.IsIPhone, this.plat.IsWindowsPad = /Windows Pad/i.test(a), this.plat.IsWeixin = !(!window.WeixinJSBridge && !/MicroMessenger/i.test(a)), this.plat.IsQQ = !!/MQQBrowser/i.test(a), this.plat.IsUC = !!/UCBrowser/i.test(a), this.plat.IsMi = !!/MiuiBrowser/i.test(a), this.plat.IsSafari = !(!a.match(/Safari/i) || this.plat.IsAdr), this.plat.IsChrome = !(!a.match(/Chrome/i) || this.plat.IsAdr), this.plat.IsBaidu = !!/baidubrowser/i.test(a), this.plat.isAdr ? c.push("android") : this.plat.isAdr ? c.push("windows_phone") : this.plat.isAdr ? c.push("iPhone") : this.plat.isAdr && c.push("iPad"), b.className = c.join(" ")
        },
        jumpSite: function(a) {
            var b = navigator.userAgent, c = a.from || "";
            c = c.toLowerCase() + "";
            var d = location.href, e = this.getQueryString("boke"), e = e ? e : 0, f = this.getQueryString("vid"), g = /hots\/(.*?)?vid=/;
            try {
                this.isJump || !/MicroMessenger/i.test(b) && "sogou" !== c || (this.isJump = !0, /hots/.test(d) ? g.test(d) && this.isDebug ? location.href = "http://t.m.tv.sohu.com/play_wx?vid=" + f + "&boke=" + e : g.test(d) && this.isOnLine && (location.href = "http://wx.m.tv.sohu.com/v" + f + ".shtml?boke=" + e) : this.isOnLine && (location.href = location.href.replace(/http:\/\/m\.(tv|s)\.sohu\.com/i, "http://wx.m.tv.sohu.com")))
            } catch (h) {
                console.log(h)
            }
            return this.isJump
        },initPage: function() {
            var a = location.href;
            this.isDebug = /http:\/\/t\.m\.tv\.sohu\.com/i.test(a), this.isOnLine = /http:\/\/m\.(tv|s)\.sohu\.com/i.test(a);
            var b = this.getQueryJsonData() || {};
            this.addPlat(), this.jumpSite(b)
        }}, sohutv.initPage()
}(), function() {
    "use strict";
    var a = {level: "info",dateFormat: "yyyyMMdd hh:mm:ss",DOM: null,line: '<p class="Console-line"></p>',tgt: '<div id="Console-log" style="max-height: 200px;-webkit-overflow-scrolling:touch;overflow:auto;line-height:1.5;z-index:5000;position:fixed;left:0;top:0;width:70%;font-size:11px;background:rgba(0,0,0,.8);color:#fff;"></div>',style: "<style>.Console-line{ margin-top:-1px;padding:.5em;border-top:1px solid rgba(255,255,255,.3);width:70% } .c_info .c_log { color:white; } .c_error { color:red; } .c_warn { color:yellow; } .c_debug { color:green; } </style>",inited: !1};
    a.util = {}, a.util.getType = function(a) {
        var b, c = a;
        return ("object" == (b = typeof c) ? null === c && "null" || Object.prototype.toString.call(c).slice(8, -1) : b).toLowerCase()
    }, a.util.DateFormat = function(a, b) {
        var c = {"M+": a.getMonth() + 1,"d+": a.getDate(),"h+": a.getHours(),"m+": a.getMinutes(),"s+": a.getSeconds(),"q+": Math.floor((a.getMonth() + 3) / 3),S: a.getMilliseconds()};
        /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var d in c)
            new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 === RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
        return b
    }, a.applyData = function(a) {
        a.alisLevel = a.level.toUpperCase().substring(0, 1);
        var b = [" [ ", a.level, " ] "].join("");
        return b
    }, a.getTimestamp = function() {
        return a.util.DateFormat(new Date, a.dateFormat)
    }, a.output = function(b, c) {
        try {
            a.inited || a.init();
            var d = document.createElement("div");
            d.className = "c_" + b.level.toLowerCase() || "c_info", d.innerHTML = a.applyData(b) + " " + c, a.DOM.appendChild(d)
        } catch (e) {
            console.log("exception :" + c)
        }
    }, a._logObj = function(b) {
        var c = b || "INFO", d = {timestamp: a.getTimestamp(),level: c};
        return d
    }, a.log = function(b) {
        var c = a._logObj("LOG");
        a.output(c, b)
    }, a.debug = function(b) {
        var c = a._logObj("DEBUG");
        a.output(c, b)
    }, a.info = function(b) {
        var c = a._logObj("INFO");
        a.output(c, b)
    }, a.error = function(b) {
        var c = a._logObj("ERROR");
        a.output(c, b)
    }, a.warn = function(b) {
        var c = a._logObj("WARN");
        a.output(c, b)
    }, a.convertToText = function(a) {
        var b;
        try {
            return a ? "true" === a || ("false" === a ? !1 : "null" === a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^\[\[\{]/.test(a) ? JSON.stringify(a) : a : b) : a.toString()
        } catch (c) {
            return a
        }
    }, a.init = function() {
        if (!a.inited) {
            var b = document.createElement("style");
            b.innerHTML = a.style, document.body.appendChild(b);
            var c = document.createElement("div");
            c.innerHTML = a.tgt, document.body.appendChild(c), a.DOM = document.getElementById("Console-log"), a.inited = !0
        }
    }, window.Console = a
}();
var ENABLE_DEBUG = !1, IS_DEBUG = "false", API_KEY = "f351515304020cad28c92f70f002261c", API_URL = "/api/", API_PARAMS = {api_key: API_KEY,plat: "17",sver: "4.0",partner: "78"}, autoTrace = !0, TIPS_CODE = {100: "该内容不存在,为您推荐其他视频"}, API_PROXY_URL = "http://m.tv.sohu.com/api/", H5_URL = "http://h5.tv.sohu.com/", H5_TEST_URL = "http://h5.tv.sohu.com/";
ENABLE_DEBUG && (H5_URL = "http://t.m.tv.sohu.com/");
var SohutvJSBridge = "undefined" == typeof SohutvJSBridge ? {} : SohutvJSBridge;
"undefined" == typeof ENABLE_DEBUG && (ENABLE_DEBUG = 1);
var DEBUG = ENABLE_DEBUG = !1, Channeled = "", GlobalVideoDatas = {}, DOC = document, WIN = window, UNDEFINED = void 0, IsTouch = "ontouchstart" in WIN, UA = WIN.navigator.userAgent, AdrPadRegex = /pad|XiaoMi\/MiPad|lepad|MediaPad|GT-P|SM-T|GT-N5100|sch-i800|Nexus\s7|Nexus\s8|Nexus\s11|Kindle Fire HD|Tablet/i, IsAndroid = !(!/Android|HTC|Adr/i.test(UA) && !(WIN.navigator.platform + "").match(/Linux/i)), IsAndroidPad = !(!IsAndroid || !AdrPadRegex.test(UA) && /mobile/i.test(window.navigator.userAgent)), IsIPad = !IsAndroid && /iPad/i.test(UA), IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA), IsIOS = IsIPad || IsIPhone, IsWindowsPhone = /Windows Phone/i.test(UA), IsWindowsPad = /Windows Pad/i.test(UA), IsBlackBerry = /BB10|BlackBerry/i.test(UA), IsIEMobile = /IEMobile/i.test(UA), IsSymbian = /Symbian/i.test(UA), IsIE = !!DOC.all, IsSafari = !(!UA.match(/Safari/i) || IsAndroid), IsChrome = !(!UA.match(/Chrome/i) || IsAndroid), IsWeixin = !(!WIN.WeixinJSBridge && !/MicroMessenger/i.test(UA)), IsQQ = !!/MQQBrowser/i.test(UA), IsUC = !!/UCBrowser/i.test(UA), IsMi = !!/MiuiBrowser/i.test(UA), IsBaidu = !!/baidubrowser/i.test(UA), PixelRatio = parseFloat(WIN.devicePixelRatio) || 1, MAX_TOUCHMOVE_DISTANCE_FOR_CLICK = IsAndroid ? 10 : 6, START_EVENT = IsTouch ? "touchstart" : "mousedown", MOVE_EVENT = IsTouch ? "touchmove" : "mousemove", END_EVENT = IsTouch ? "touchend" : "mouseup", RESIZE_EVENT = "onorientationchange" in WIN ? "orientationchange" : "resize", CANCEL_EVENT = IsTouch ? "touchcancel" : "mouseup", CssTransitions = "WebKitTransitionEvent" in WIN, CssHas3d = "WebKitCSSMatrix" in WIN && "m11" in new WebKitCSSMatrix, RequestAnimationFrame = "webkitRequestAnimationFrame" in WIN, AndroidApk = "", DownloadLink = "", StartClient, getDevicePixelRatio = function() {
    var a = 1;
    try {
        a = void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : window.devicePixelRatio, a = parseFloat(a) || 1
    } catch (b) {
    }
    return a
};
PixelRatio = getDevicePixelRatio();
var IsShouSou = location.host.indexOf("m.sohu.com") > -1, ScreenSizeCorrect = 1, isGpad = function() {
    var a = 1, b = !1, c = 1, d = Math.floor(window.screen.width * c), e = Math.floor(window.screen.height * c), f = 1;
    try {
        a = Math.sqrt(d * d + e * e), f = parseFloat(a / (160 * PixelRatio))
    } catch (g) {
    }
    if ("ontouchstart" in window && IsAndroid)
        if (/mobile/i.test(UA))
            b = !1;
        else {
            var h = !!AdrPadRegex.test(UA);
            h ? b = !0 : !b && (a >= 2500 || f > 7.8) && (b = !0)
        }
    return b
};
IsAndroidPad = isGpad();
var EnterDisableAction = !1;
if (String.prototype.hasOwnProperty("trim") || (String.prototype.trim = function() {
    return this.replace(/^(\s|\r|\n|\r\n)*|(\s|\r|\n|\r\n)*$/g, "")
}), Function.prototype.hasOwnProperty("bind") || (Function.prototype.bind = function(a) {
    var b = this, c = arguments.length > 1 ? Array.slice(arguments, 1) : null;
    return function() {
        return b.apply(a || this, c)
    }
}), !IsTouch && IsIE)
    try {
        DOC.execCommand("BackgroundImageCache", !1, !0)
    } catch (e) {
        console.log("BackgroundImageCache hover", e)
    }
IsAndroid && (WIN.screen.width / WIN.innerWidth).toFixed(2) == PixelRatio.toFixed(2) && (ScreenSizeCorrect = 1 / PixelRatio);
var APP_VER = {AndroidPhone: "4.3",AndroidPad: "3.5",iPhone: "4.3",iPad: "4.3",WindowsPhone: "3.0",WindowsPad: "3.0"}, IS_EXTERNAL_PLAYER = !1;
(location.href.match(/player=1/i) || location.host.indexOf("m.sohu.com") > -1) && (IS_EXTERNAL_PLAYER = !0);
var IsUC = !1;
(UA.match(/ UC(Browser)?/i) || UA.match(/compatible;Android/i)) && (UA.match(/ LT15i /i) || (IsUC = !0));
var IsQQBrowser = UA.match(/MQQBrowser/i), h5Src = "", WebRoot = "";
"m.s.sohu.com" == location.host && (WebRoot = "http://m.tv.sohu.com");
var SetListVersion = "20131229", BlankFn = function() {
};
ENABLE_DEBUG && URL.getQueryString("wx") && (IsWeixin = !0);
var H5Channeled = IsWeixin ? "1200230001" : "1211010100", LOC = location, IsUC = !1;
(UA.match(/ UC(Browser)?/i) || UA.match(/compatible;Android/i)) && (UA.match(/ LT15i /i) || (IsUC = !0));
var IsShouSou = location.host.indexOf("m.sohu.com") > -1, hasClass = function(a, b) {
    return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
}, addClass = function(a, b) {
    -1 == (" " + a.className + " ").indexOf(" " + b + " ") && (a.className = "" === a.className ? b : a.className + " " + b)
}, removeClass = function(a, b) {
    var c, d;
    if (-1 != a.className.indexOf(b)) {
        for (c = a.className.split(" "), d = c.length - 1; d >= 0; d--)
            c[d] === b && c.splice(d, 1);
        a.className = c.join(" ")
    }
}, toggleClass = function(a, b) {
    hasClass(a, b) ? removeClass(a, b) : addClass(a, b)
}, onDomReady = function(a) {
    var b = window, c = document, d = !1, e = -1, f = 10, g = /loaded|complete/, h = "DOMContentLoaded", i = "onreadystatechange", j = "onload", k = function() {
        d === !1 && (d = !0, a && a()), b.clearInterval(e)
    }, l = function() {
        e = b.setInterval(function() {
            try {
                c.documentElement.doScroll("left"), k()
            } catch (a) {
            }
        }, f)
    }, m = function() {
        e = b.setInterval(function() {
            g.test(c.readyState) && k()
        }, f)
    };
    return g.test(c.readyState) ? (d = !0, !1) : (c.addEventListener ? (c.addEventListener(h, function() {
        c.removeEventListener(h, arguments.callee, !1), k()
    }, !1), m()) : c.attachEvent ? (c.attachEvent(i, function() {
        g.test(c.readyState) && (c.detachEvent(i, arguments.callee), k())
    }), b.attachEvent(j, function() {
        b.detachEvent(j, arguments.callee), k()
    }), !c.documentElement.doScroll || null !== b.frameElement && "undefined" != typeof b.frameElement || l()) : b[j] = function() {
        k()
    }, !0)
}, IsHistorySupport = "pushState" in history;
IsIPhone && (IsWeixin = !1), window.onDomReady = onDomReady, function(a) {
    "use strict";
    var b = function(b) {
        var c = b.match(/MQQBrowser\/(\d+\.\d+)/i), d = b.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i), e = b.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || b.match(/MicroMessenger\/((\d+)\.(\d+))/), f = b.match(/Mac\sOS\sX\s(\d+\.\d+)/), g = b.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/), h = b.match(/MiuiBrowser\/(\d+\.\d+)/i), i = b.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || b.match(/\sUC\s/), j = b.match(/IEMobile(\/|\s+)(\d+\.\d+)/), k = b.match(/(ipod\sOS)\s([\d_]+)/);
        if (a.browser = a.browser || {}, a.os = a.os || {}, window.ActiveXObject) {
            var l = 6;
            (window.XMLHttpRequest || b.indexOf("MSIE 7.0") > -1) && (l = 7), (window.XDomainRequest || b.indexOf("Trident/4.0") > -1) && (l = 8), b.indexOf("Trident/5.0") > -1 && (l = 9), b.indexOf("Trident/6.0") > -1 && (l = 10), a.browser.ie = !0, a.browser.version = l
        } else
            b.indexOf("Trident/7.0") > -1 && (a.browser.ie = !0, a.browser.version = 11);
        k && (this.os.ios = this.os.ipod = !0, this.os.version = k[2].replace(/_/g, ".")), g && (this.os.windows = !0, this.os.version = g[2]), f && (this.os.Mac = !0, this.os.version = f[1]), b.indexOf("lepad_hls") > 0 && (this.os.LePad = !0), c && (this.browser.MQQ = !0, this.browser.version = c[1]), d && (this.browser.MQQClient = !0, this.browser.version = d[1]), e && (this.browser.WeChat = !0, this.browser.version = e[1]), h && (this.browser.MIUI = !0, this.browser.version = h[1]), i && (this.browser.UC = !0, this.browser.version = i[1] || 0 / 0), !c || window.mtt && window.mtt.getBrowserParam || !a.os.android || (this.browser.UC = !0, this.browser.version = "9.6.0", this.browser.MQQ = !1), j && (this.browser.IEMobile = !0, this.browser.version = j[2]), this.os.windows && (this.os.win64 = "undefined" != typeof navigator.platform && "win64" === navigator.platform.toLowerCase() ? !0 : !1);
        var m = {iPad7: "iPad; CPU OS 7",LePad: "lepad_hls",XiaoMi: "MI-ONE",SonyDTV: "SonyDTV",SamSung: "SAMSUNG",HTC: "HTC",VIVO: "vivo"};
        for (var n in m)
            this.os[n] = -1 !== b.indexOf(m[n]);
        this.os.getNumVersion = function() {
            return parseFloat(a.os.version, "10")
        }, this.os.hasTouch = "ontouchstart" in window, this.os.hasTouch && this.os.ios && this.os.getNumVersion() < 6 && (this.os.hasTouch = !1), a.browser.WeChat && a.browser.version < 5 && (this.os.hasTouch = !1), a.extend(a.browser, {getNumVersion: function() {
                return parseFloat(a.browser.version, "10")
            },isFFCanOcx: function() {
                return a.browser.firefox && a.browser.getNumVersion() >= 3 ? !0 : !1
            },isCanOcx: function() {
                return !(!a.os.windows || !a.browser.ie && !a.browser.isFFCanOcx() && !a.browser.webkit)
            },isNotIESupport: function() {
                return !!a.os.windows && (!!a.browser.webkit || a.browser.isFFCanOcx())
            }}), a.os.isIos = a.os.ios, a.os.android = !(!a.os.android && !/Android|HTC|Adr/i.test(b)), a.os.isAndroid = a.os.android, a.os.isIphone = !a.os.isAndroid && /iPod|iPhone/i.test(b), a.os.isVivoPhone = /vivo/i.test(b), a.os.isWindowsPhone = /Windows Phone/i.test(b), a.os.isSonyPhone = /Sony/i.test(b), a.os.isWindowsPad = /Windows Pad/i.test(b), a.os.isIpad = !a.os.isAndroid && /iPad.*Mac OS/i.test(b), a.os.isAndroidPad = !!IsAndroidPad || !1, a.os.isSupportPlayVideoInline = a.os.isIpad || !a.os.isIphone, a.os.isBlackBerry = /BB10|BlackBerry/i.test(b), a.os.isIEMobile = /IEMobile/i.test(b), a.os.isSymbian = /Symbian/i.test(b), a.os.isIE = a.browser.ie && !!document.all, a.os.isCoolPad = /Coolpad/i.test(b), a.os.isBaiduBrowser = /BaiduBrowser|T5\/.*baiduboxapp/i.test(b), a.os.isUCBrowser = /UCBrowser/i.test(b), a.os.isQQBrowser = /QQBrowser/i.test(b), a.os.isOldQQBrowser = /MQQBrowser\/([1234]\.\d*||5\.[12345]\d*)\sMobile/i.test(b), a.os.isNewQQBrowser = a.os.isQQBrowser && !a.os.isOldQQBrowser, a.os.isWeixin = !(!window.WeixinJSBridge && !/MicroMessenger/i.test(b)), a.os.isPCIEBrowser = /MSIE/i.test(b), a.os.isFirefoxBrowser = /Firefox/i.test(b), a.os.isMIOne = /MI-ONE/i.test(b), a.os.isHuaWei = /HUAWEI/i.test(b), a.os.isSAMSUNG = /SAMSUNG/i.test(b), a.os.isOldWindowsPhone = /Windows\sPhone\s([1234567]\.|8\.0)/i.test(b), a.os.isNewWindowsPhone = a.os.isWindowsPhone && !a.os.isOldWindowsPhone ? !0 : !1, a.userAgent = {}, a.extend(a.userAgent, a.os), a.extend(a.userAgent, a.browser), a.userAgent.browserVersion = a.browser.version, a.userAgent.osVersion = a.os.version, a.userAgent.desc = b, a.ua = a.userAgent
    };
    b.call(a, navigator.userAgent)
}($);
var URL = {getQueryData: function(a) {
        a = a.replace(/^\?+/, "").replace(/&amp;/, "&");
        for (var b, c = a.split("&"), d = 0, e = {}; d < c.length; ) {
            if (b = c[d].split("="), b[0]) {
                var f = b[1] || "";
                try {
                    f = decodeURIComponent(f)
                } catch (g) {
                    f = unescape(f)
                }
                f = "null" === f ? null : f, e[decodeURIComponent(b[0])] = f
            }
            d++
        }
        return e
    },getQueryString: function(a, b) {
        var c, d = b ? URL.getElSearchString(b) : window.location.search.substring(1);
        return c = URL.getQueryData(d), a in c ? c[a] : null
    },getParam: function(a) {
        var b = new RegExp("(^|&?)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
        return null !== c ? unescape(c[2]) : null
    },getElSearchString: function(a) {
        var a = $(a).get(0), b = a.search || "";
        if (!b) {
            var c = a.getAttribute("FORM" == a.nodeName ? "action" : "href"), d = c.indexOf("?");
            -1 !== d && (b = c.slice(d))
        }
        return b
    },setQueryString: function(a, b) {
        var c, d, a = $(a), e = a.get(0), f = e.search, g = f || "";
        if (!f) {
            var h, i = e.nodeName;
            if ("FORM" == i) {
                if ("post" != e.method.toLowerCase()) {
                    for (c in b) {
                        d = b[c];
                        var j = $('input[name="' + c + '"]', a);
                        j ? j.val(d) : a.append($('<input type="hidden" name="' + c + '" value="' + d + '" />'))
                    }
                    return
                }
                h = a.attr("action") || location.href + ""
            } else
                h = a.attr("href") || location.href + "";
            var k = h.indexOf("?"), l = h.indexOf("#");
            -1 == l && (l = h.length), 0 > k || k > l ? (g = "", k = l) : g = h.slice(k + 1, l)
        }
        var m = URL.getQueryData(g), n = [];
        for (c in b)
            m[c] = b[c];
        for (c in m)
            d = m[c], n.push(c + (d ? "=" + encodeURIComponent(d) : ""));
        if (!(n.length < 1)) {
            var o = "?" + n.join("&");
            if (f)
                e.search = o;
            else {
                var p = "FORM" == i ? "action" : "href";
                a.attr(p, h.slice(0, k) + o + h.slice(l))
            }
        }
    },objToQueryString: function(a) {
        var b, c, d = [];
        for (b in a) {
            c = a[b];
            var e = Object.prototype.toString.call(c);
            d.push("[object Array]" === e ? b + "=" + JSON.stringify(c) : "[object Object]" === e ? b + "=" + JSON.stringify(c) : b + "=" + encodeURIComponent("undefined" == typeof c ? "" : c))
        }
        return d.join("&")
    }};
URL.updateGlobalParms = function(a, b) {
    for (var c, d, e = $("a[href],form", a), f = e.length, b = b || URL.URLGlobalParms; f--; )
        c = e.get(f), d = c.href, d && d.match(/^(sms|tel|mail)/i) || URL.setQueryString(c, b)
}, function() {
    var a = function(a, b, c) {
        try {
            if ("undefined" != typeof a && "undefined" != typeof b && "undefined" != typeof c)
                if (-1 === a.indexOf("?"))
                    a += "?" + b + "=" + c;
                else {
                    var d = a.split("?"), e = d[1], f = e.split("&"), g = !1;
                    $.each(f, function(a, d) {
                        var e = d.split("=");
                        return b === e[0] ? (g = !0, f[a] = b + "=" + c, !1) : void 0
                    }), g ? a = d[0] + "?" + f.join("&") : a += "&" + b + "=" + c
                }
        } catch (h) {
            console.log(h)
        }
        return a
    };
    URL.setParam = function(b, c, d) {
        if ("string" == typeof c && "undefined" != typeof d)
            return a(b, c, d);
        if ("object" == typeof c) {
            for (var e in c)
                b = a(b, e, c[e]);
            return b
        }
        return b
    }
}(), function(a, b, c) {
    URL.init = function() {
        var a, c = ["clientType", "clientVer", "actionVer", "plat", "startClient", "useVideoLink", "r", "player"], d = URL.getQueryData(location.search.substring(1)), e = {}, f = 0;
        IS_EXTERNAL_PLAYER && c.push("channeled");
        for (var g = c.length; g--; )
            a = c[g], d.hasOwnProperty(a) && (e[a] = d[a], f++);
        URL.URLGlobalParms = e, f > 0 && URL.updateGlobalParms(b, e)
    }, c.fn.getUrlParam = function(a, b) {
        return URL.getQueryString(a, b)
    }
}(window, document, Zepto);
var Cookie = {isEnabled: !1,set: function(a, b, c, d) {
        var e = "";
        if (0 !== c) {
            var f = new Date;
            f.setTime(f.getTime() + 36e5 * (c || 24)), e = ";expires=" + f.toGMTString()
        }
        var g = escape(a) + "=" + escape(b) + e + ";path=/" + (d ? ";domain=" + d : "");
        return document.cookie = g, !0
    },getByName: function(a) {
        var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
        return c ? c[1] : ""
    },get: function(a) {
        for (var b, c = document.cookie.split(";"), d = 0; d < c.length; d++)
            if (b = c[d].split("="), b[0].trim() == a)
                return unescape(b[1]);
        return ""
    },del: function(a, b, c) {
        var d = new Date;
        d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
    },test: function() {
        var a = "_c_t_";
        return this.set(a, "1"), this.isEnabled = "1" === this.get(a), this.del(a), this.isEnabled
    },serialize: function(a) {
        return JSON.stringify(a)
    },deserialize: function(a) {
        if ("string" != typeof a)
            return a;
        try {
            return JSON.parse(a)
        } catch (b) {
            return a || void 0
        }
    },setSession: function(a, b) {
        try {
            window.sessionStorage && window.sessionStorage.setItem(a, this.serialize(b))
        } catch (c) {
            console.log("not support session", c), this.set(a, this.serialize(b), 24)
        }
    },getSession: function(a) {
        var b = "";
        try {
            window.sessionStorage && (b = this.deserialize(window.sessionStorage.getItem(a)))
        } catch (c) {
            console.log("not support session", c), b = this.deserialize(this.get(a))
        }
        return b
    }};
if (Cookie.test(), URL && Cookie) {
    var _mtvsrc = h5Src = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
    _mtvsrc && Cookie.set("MTV_SRC", h5Src, 86400, ".sohu.com"), h5Src = Cookie.get("MTV_SRC") || _mtvsrc
}
var Refer = {};
Refer.SrcSettings = {1104: /^wx\.m\.tv\.sohu\.com$/i,1106: /^tv\.sohu\.com$|^pad\.tv\.sohu\.com$/i,1107: /^my\.tv\.sohu\.com$/i,1108: /^sports\.sohu\.com$/i,1105: /^(m|wap|s|3g)\.(tv|s)\.sohu\.com$|^(t|t1|t2)\.m\.tv\.sohu\.com$|^sohutv\.hao3608\.com$/i,1109: /^(news|auto|media|www|yule|mil)\.sohu\.com$/i,1001: /^m\.sohu\.com$|^(3g|zhibo|wap)\.sohu\.com$|^(.*)m\.sohu\.com$|^m\.club\.sohu\.com$|^api\.k\.sohu\.com$/i,1110: /^(.*)\.baidu\.com$|^(.*)baidu\.mobi$|^webapp\.cbs\.baidu\.com$/i,1112: /^(.*)hao123\.com$/i,1113: /^v\.m\.liebao\.cn$|^v\.duba\.com$/i,1114: /^(.*)2345\.com$/i,1115: /^v\.sogou\.com$|^m\.kan\.sogou\.com$|^tv\.sogou\.com$/i,1068: /^sogou\.com$|^(.*)\.sogou\.com$/i,1116: /^(.*)sm\.cn$|^(.*)uodoo\.com$/i,1006: /^tv\.uc\.cn$/i,1007: /^hao\.uc\.cn$/i,1117: /^(news|inews)\.uc\.cn$/i,1033: /^m\.video\.so\.com$/i,1075: /^(.*)(so|haosou)\.com$/i,1118: /^(.*)weibo\.com$|^(.*)weibo\.cn$/i,1119: /^(.*)qzone\.qq\.com$/i,1120: /^(.*)10086\.cn$/i,1123: /^(.*)(google|g).(.*)$/i,1121: /^(.*)wapreach\.com$|^(.*)\.app111\.com$|^(.*)homeinns\.cc$|^(hao|hao123|m)\.xiaomi\.com$/i,1122: /^video\.wapreach\.com$|^video\.browser\.miui\.com$|^v\.html5\.qq\.com$|^kanpian\.easou\.com$|^video\.nearme\.com\.cn$/i,1124: /^(.*)soso\.com$|^(.*)easou\.com$|^(.*)bing\.com$/i}, Refer.getUrlHost = function(a) {
    var b = a || "", c = /.*:\/\/([^\/]*).*/i, d = b.match(c), e = "";
    return d && (e = d[1]), e
}, Refer.getReferHost = function(a) {
    var b = a || document.referrer, c = /.*:\/\/([^\/]*).*/i, d = b.match(c), e = "";
    d && (e = d[1]);
    var f = /(\d+).(\d+).(\d+).(\d+)/i.test(e);
    return (f || !e) && (e = ""), e
}, Refer.getRefer = function() {
    var a = document.referrer;
    return void 0 == a && window.opener && (a = window.opener.location), void 0 == a && (a = ""), a
}, Refer.matchRefer = function(a, b) {
    var c = "";
    try {
        a = a.replace(/^http:\/\//, "");
        var d = b;
        void 0 == d && (d = Refer.SrcSettings);
        for (var e in d) {
            var f = d[e];
            if (f && a && f.test(a)) {
                c = e, console.log("matchRefer " + a + " , " + e + " " + f);
                break
            }
        }
    } catch (g) {
        console.log(g)
    }
    return c
}, Refer.setSrcChanneled = function() {
    var a = {MTV_SRC: "",channeled: ""};
    try {
        if (Cookie && URL) {
            var b = h5Src = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
            b && Cookie.set("MTV_SRC", h5Src, 86400, ".sohu.com");
            var c = URL.getQueryString("channeled") || "", d = Refer.getRefer() || "", e = Refer.getReferHost(d) || Refer.getUrlHost(window.location.href) || "";
            console.log("get referhost " + e + "   " + c), c = c ? c || "1212120001" : b ? "1212130001" : e.indexOf("m.sohu.com") > -1 ? "1200110001" : "1212120001", h5Src ? b = h5Src : (e && (b = Refer.matchRefer(e, Refer.SrcSettings), b.length < 8 && b >= 4 && (b = b = b.substring(0, 4) + "0001")), b || (b = "11050001"));
            var f = Cookie.get("MTV_SRC") || "";
            !f && b && (a.MTV_SRC = b, Cookie.set("MTV_SRC", b, 86400, ".sohu.com")), c && (a.channeled = c, Cookie.set("_channeled", c, 86400, ".sohu.com")), h5Src = Cookie.get("MTV_SRC") || b, console.log("Refer.js MTV_SRC:" + h5Src + ",_channeled:" + c)
        }
    } catch (g) {
        console.log(g)
    }
    return a
}, Refer.init = function() {
    var a = Refer.setSrcChanneled();
    console.log("Refer matchRefer " + JSON.stringify(a))
}(), function() {
    "use strict";
    function a() {
        try {
            return f in d && d[f]
        } catch (a) {
            return !1
        }
    }
    var b, c = {}, d = window, e = document, f = "localStorage", g = "script";
    try {
        b = d[f]
    } catch (h) {
    }
    var i = function() {
    };
    if (c.disabled = !1, c.set = i, c.get = i, c.remove = i, c.clear = i, c.transact = function(a, b, d) {
        var e = c.get(a);
        null === d && (d = b, b = null), "undefined" == typeof e && (e = b || {}), d(e), c.set(a, e)
    }, c.getAll = function() {
    }, c.forEach = function() {
    }, c.serialize = function(a) {
        return JSON.stringify(a)
    }, c.deserialize = function(a) {
        if ("string" != typeof a)
            return void 0;
        try {
            return JSON.parse(a)
        } catch (b) {
            return a || void 0
        }
    }, a())
        b = d[f], c.set = function(a, d) {
            return void 0 === d ? c.remove(a) : (b.setItem(a, c.serialize(d)), d)
        }, c.get = function(a) {
            return c.deserialize(b.getItem(a))
        }, c.remove = function(a) {
            b.removeItem(a)
        }, c.clearAll = function() {
            b.clear()
        }, c.getAll = function() {
            var a = {};
            return c.forEach(function(b, c) {
                a[b] = c
            }), a
        }, c.forEach = function(a) {
            for (var d = 0; d < b.length; d++) {
                var e = b.key(d);
                a(e, c.get(e))
            }
        };
    else if (e.documentElement.addBehavior) {
        var j, k;
        try {
            k = new ActiveXObject("htmlfile"), k.open();
            var l = "<" + g + ">document.w=window</" + g + ">";
            l += '<iframe src="/favicon.ico"></iframe>', k.write(l), k.close(), j = k.w.frames[0].document, b = j.createElement("div")
        } catch (h) {
            b = e.createElement("div"), j = e.body
        }
        var m = function(a) {
            var d = function() {
                var d = Array.prototype.slice.call(arguments, 0);
                d.unshift(b), j.appendChild(b), b.addBehavior("#default#userData"), b.load(f);
                var e = a.apply(c, d);
                return j.removeChild(b), e
            };
            return d
        }, n = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), o = function(a) {
            return a.replace(/^d/, "___$&").replace(n, "___")
        };
        c.set = m(function(a, b, d) {
            return b = o(b), void 0 === d ? c.remove(b) : (a.setAttribute(b, c.serialize(d)), a.save(f), d)
        }), c.get = m(function(a, b) {
            return b = o(b), c.deserialize(a.getAttribute(b))
        }), c.remove = m(function(a, b) {
            b = o(b), a.removeAttribute(b), a.save(f)
        }), c.clear = m(function(a) {
            var b = a.XMLDocument.documentElement.attributes;
            a.load(f);
            for (var c = 0, d = b.length; d > c; c++) {
                var e = b[c];
                a.removeAttribute(e.name)
            }
            a.save(f)
        }), c.getAll = function() {
            var a = {};
            return c.forEach(function(b, c) {
                a[b] = c
            }), a
        }, c.forEach = m(function(a, b) {
            for (var d = a.XMLDocument.documentElement.attributes, e = 0, f = d.length; f > e; e++) {
                var g = d[e];
                b(g.name, c.deserialize(a.getAttribute(g.name)))
            }
        })
    }
    try {
        var p = "__storejs__";
        c.set(p, p), c.get(p) !== p && (c.disabled = !0), c.remove(p)
    } catch (h) {
        c.disabled = !0
    }
    c.enabled = !c.disabled, "undefined" != typeof module && module.exports && this.module !== module ? module.exports = c : "function" == typeof define && define.amd && define(c), c.getStorage = function() {
        try {
            b = d[f]
        } catch (a) {
            console.log("localStorage is not supported")
        }
        return b
    }, c.clear = function(a) {
        var b = c.getStorage();
        if (b)
            if (a)
                for (var d in b)
                    0 === d.indexOf(a) && b.removeItem(d);
            else
                b.clear()
    }, d.Storage = c
}(this);
var WIN = window, DOC = document, Util = {pingback: function(a, b) {
        if (a)
            for (var c = a.split("|"), d = 0, e = c.length; e > d; d++)
                (new Image).src = c[d], ENABLE_DEBUG && void 0 !== b && (ADPingbackCount++, console.log("第" + ADPingbackCount + "个上报,第" + b + "秒:", c[d]))
    },getOSVersion: function() {
        var a = 0;
        if (IsIOS) {
            var b = UA.match(/os ([0-9_]+)/i);
            b && b[1] && (a = Util.getVersionNumber(b[1]))
        } else
            a = IsAndroid ? Util.getAndroidVersionNumber() : "4.0.1";
        return a
    },getAndroidVersionNumber: function() {
        var a = UA.match(/android(.*?);/i) || [];
        return a[1] || 0
    },getVersionNumber: function(a) {
        var b = a.replace(/_/g, ".").replace(/^([0-9]+\.[0-9]+)[0-9\.]*/, "$1");
        return parseFloat(b || 0)
    },timeFromNow: function(a) {
        var b = 60, c = 60 * b, d = 24 * c, e = 30 * d, f = 12 * e;
        return a = (+new Date - parseInt(a)) / 1e3, a >= f ? Math.floor(a / f) + "年前" : a >= e ? Math.floor(a / e) + "个月前" : a >= d ? Math.floor(a / d) + "天前" : a >= c ? Math.floor(a / c) + "小时前" : a >= b ? Math.floor(a / b) + "分钟前" : "刚刚"
    },getTotalMonth: function(a) {
        var b = new Date(a);
        return 12 * b.getFullYear() + b.getMonth()
    },secondsToTime: function(a) {
        var b = parseInt(a);
        isNaN(b) && (b = 0);
        var c = Math.floor(b / 60), a = b % 60;
        if (10 > a && (a = "0" + a), 60 > c)
            return 10 > c && (c = "0" + c), c + ":" + a;
        var d = Math.floor(c / 60);
        return c %= 60, 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), d + ":" + c + ":" + a
    },secondsToTimeText: function(a) {
        var b = parseInt(a);
        isNaN(b) && (b = 0);
        var c = Math.floor(b / 60), a = b % 60 + "秒";
        if (60 > c)
            return (c > 0 ? c + "分" : "") + a;
        var d = Math.floor(c / 60);
        return c %= 60, (d > 0 ? d + "小时" : "") + c + "分" + a
    },shortCount: function(a) {
        return a = parseInt(a), a > 1e8 ? a = Math.floor(a / 1e8) + "亿" : a > 1e4 && (a = Math.floor(a / 1e4) + "万"), a
    },shortFixedCount: function(a) {
        return a = parseFloat(a), a && a > 1e8 ? a = (a / 1e8).toFixed(1) + "亿" : a && a > 1e4 && (a = (a / 1e4).toFixed(1) + "万"), a
    },dateString: function(a) {
        var b;
        return (b = a.match(/([0-9]{4}\-[0-9]+\-[0-9]+)/)) && (a = b[1]), a
    },setLoad: function(a) {
        var a = $(a);
        return a.hasClass("_load_inited") || a.addClass("_load_inited").append($('<i class="ui_loading"><u></u><u></u><u></u></i>')), a
    },loadScript: function(a, b, c) {
        var d = DOC.getElementsByTagName("head")[0] || DOC.body, e = DOC.createElement("script"), f = !1;
        e.src = a, e.onload = e.onreadystatechange = function() {
            f || this.readyState && "loading" === this.readyState || (f = !0, b && b.apply(null, c || []), e.onload = e.onreadystatechange = null, d.removeChild(e))
        }, d.appendChild(e)
    },formatURL: function(a) {
        return (a + "").replace(/^https?:\/\/(my\.|v\.)?tv\./i, "http://m.tv.").replace("http://s.", "http://m.s.").replace("http://m.s.", "http://m.tv.").replace(/^http:\/\/(video\.)?2012/i, "http://m.s")
    },getPageOffset: function() {
        return WIN.pageYOffset || DOC.body && DOC.body.scrollTop || 0
    },getSohuDefaultApplink: function(a) {
        if (a && "string" == typeof a)
            return a;
        var b = "http://m.tv.sohu.com/app";
        return IsAndroid && (b = IsAndroidPad ? "http://upgrade.m.tv.sohu.com/channels/hdv/4.2.0/SohuTVPad_4.2.0_680_201412101735.apk" : "http://upgrade.m.tv.sohu.com/channels/hdv/4.6.0/SohuTV_4.6.0_680_201412152308.apk"), IsIPhone && (b = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8"), IsIPad && (b = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-hd/id414430589?mt=8"), IsWindowsPhone && (b = "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94"), IsWindowsPad && (b = "http://apps.microsoft.com/windows/zh-CN/app/c5ae3c2a-5573-45c2-ac63-7d67e01de6bb"), IsWeixin && (b = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sohu.sohuvideo&g_f=991881"), b
    },ajaxAppLinkBySrcPlt: function(a, b) {
        var c = b || Cookie.get("MTV_SRC") || "0", d = Util.getSohuDefaultApplink();
        c = c.substr(0, 4);
        var e = "http://m.tv.sohu.com/h5/cooperation/" + c + ".json?pos=1&platform=" + Util.getUserPt() + "&callback=?";
        return console.log("ajax url: " + e), $.ajax({url: e,type: "get",dataType: "JSONP",success: function(b) {
                d = b && b.records.length > 0 ? b.records[0].link : Util.getSohuDefaultApplink(d), a && a(d)
            },error: function() {
                d = Util.getSohuDefaultApplink(d), a && a(d)
            }}), d
    },getDownloadAppLink: function(a, b) {
        var c = Cookie.get("MTV_SRC") || "0", c = c.substr(0, 4);
        console.log("src=" + c + " ,plt=" + Util.getUserPt());
        var d = Util.getSohuDefaultApplink(), e = !1;
        d = Util.ajaxAppLinkBySrcPlt(function(b) {
            "function" == typeof a && (e = !0, a(b));
            var c = $("#new_ad_appdownload")[0];
            c && (c.href = b)
        });
        var f = !1;
        if (c && (c.indexOf("1073") > -1 || 1073 === c) && (f = !0), IsAndroid && f) {
            var g = WIN.VideoData || WIN.videoData || {};
            if (g && g.vid) {
                var h = player && player.videoData.urls.downloadUrl;
                h > 0 && (h = h[0] || ""), d = "xgm://m.tv.sohu.com/download/video?vid=" + g.vid + "&aid=" + g.sid + "&video_order=" + g.videoOrder + "&video_name=" + (g.video_name || g.tvname) + "&url_down=" + h + "&hor_high_pic=" + g.horHighPic + "&isSohuFormat=0"
            }
        }
        return e || "function" != typeof a || a(d), "function" == typeof b && b(d), d
    },getDownloadAppLinkIndex: function(a) {
        var b = "http://m.tv.sohu.com/app", c = WIN.VideoData || WIN.videoData || {};
        return URLParms.clientType && "1" === URLParms.startClient && 1 === URL.getQueryString("isappinstalled") ? c && c.vid && (b = "sohuvideo://", b += "action.cmd?action=1.1&vid=" + c.vid + "&cid=" + c.cid + "&sid=" + c.sid + "&cateCode=" + c.cateCode) : (b = Util.getSohuDefaultApplink(a), IsAndroid && (tmpapklink = Util.ajaxAppLinkBySrcPlt(null, 0), tmpapklink && (b = tmpapklink))), IS_EXTERNAL_PLAYER && DOC.referrer.match(/m\.sohu\.com/i), b
    },appLink: function() {
        {
            var a = $(this);
            a.attr("channel")
        }
        ClickTrace.pingback(a);
        var b = function(b) {
            setTimeout(function() {
                location.href = a.attr("href") || b
            }, 50)
        };
        return Util.getDownloadAppLink(b), !1
    },appLinkForDiors: function() {
        function a(a) {
            setTimeout(function() {
                location.href = a
            }, 50)
        }
        var b = ($(this), h5Src), c = "";
        switch (String(b)) {
            case "433":
                c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_433_201403101517.apk";
                break;
            case "435":
            case "1001|1100":
                c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_435_201403101517.apk";
                break;
            case "1028|1100":
                c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_436_201403101517.apk";
                break;
            default:
                c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_983_201403101517.apk"
        }
        return Util.getDownloadAppLink(c, a), !1
    },getConnectionType: function() {
        var a, b = window.navigator.connection, c = "";
        return b && (a = b.type, a == b.CELL_2G ? c = "2g" : a == b.CELL_3G ? c = "3g" : a == b.WIFI && (c = "wifi")), c
    },_isMeizu: !1,isMeizu: function() {
        var a = !1;
        if (IsAndroid)
            if (IsUC || IsQQBrowser || !UA.match(/(M9|M032) Build/i)) {
                if (UA.match(/Mac OS X/i) && !IsUC) {
                    var b = WIN.screen.width, c = WIN.screen.height;
                    (640 == b || 960 == b || 320 == b && 410 == c || 410 == b && 320 == c) && (a = !0)
                }
            } else
                a = !0;
        return Util._isMeizu = a, Util.isMeizu = function() {
            return Util._isMeizu
        }, a
    },fixVideoMask: function() {
        IsAndroid && (IsUC || IsQQBrowser) && (SohuMobilePlayer.pause(), Util.shaveWindow())
    },shaveWindow: function() {
        return WIN.scrollTo(0, Util.getPageOffset() + 1)
    },formatDateWithBar: function(a) {
        var a = a || new Date, b = a.getMonth() + 1, c = a.getDate();
        return b.toString().length < 2 && (b = "0" + b), c.toString().length < 2 && (c = "0" + c), a.getFullYear() + "-" + b + "-" + c
    },formatDateWithZh: function(a) {
        var a = a || new Date, b = a.getMonth() + 1, c = a.getDate();
        return b.toString().length < 2 && (b = "0" + b), c.toString().length < 2 && (c = "0" + c), a.getFullYear() + "年" + b + "月" + c + "日"
    },formatDateStr: function(a, b) {
        var c = {"M+": a.getMonth() + 1,"d+": a.getDate(),"h+": a.getHours(),"m+": a.getMinutes(),"s+": a.getSeconds(),"q+": Math.floor((a.getMonth() + 3) / 3),S: a.getMilliseconds()};
        /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var d in c)
            new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 === RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
        return b
    },getDownloadURL: function(a) {
        a = a || "";
        var b = a.indexOf(".mp4");
        return b > -1 && (URL.getQueryString("src") || Cookie.get("src")) && (a = a.replace("plat=17", "plat=3")), a
    },getUserPt: function() {
        var a = 5;
        if ("undefined" != typeof navigator.platform)
            for (var b = ["Win32", "Win64", "Windows", "Mac68K", "MacPC", "Macintosh", "MacIntel"], c = 0, d = b.length; d > c; c++)
                if (navigator.platform === b[c]) {
                    a = 1;
                    break
                }
        return IsIPad && (a = 2), IsIPhone && (a = 3), IsAndroid && (a = 5, /tv/i.test(UA) && (a = 6)), IsAndroidPad && (a = 4), IsWindowsPad && (a = 7), IsWindowsPhone && (a = 8), IsSymbian && (a = 9), a
    },escape: function(a) {
        return String(a).replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
    },reverse: function(a) {
        return Array.isArray(a) ? a.reverse() : String(a).split("").reverse().join("")
    },tojson: function(a) {
        return JSON.stringify(a)
    },getBrowserInfo: function() {
        var a = window.navigator.userAgent.toLowerCase();
        console.log(a);
        var b = {}, c = "webkit", d = "0.0", e = Util.getUserPt(), f = ["webkit", "webkit", "0.0"];
        try {
            f = /(opr)[\/]([\w.]+)/.exec(a) || /(UCBrowser)[ \/]([\w.]+)/.exec(a) || /(QQBrowser)[ \/]([\w.]+)/.exec(a) || /(MicroMessenger)[ \/]([\w.]+)/.exec(a) || /(BaiduBrowser)[ \/]([\w.]+)/.exec(a) || /(MiuiBrowser)[ \/]([\w.]+)/.exec(a) || /(sogou)[ \/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || ["webkit", "webkit", "0.0"], c = f[3] || f[1] || "webkit", d = f[2] || "0.0"
        } catch (g) {
            console.log(g)
        }
        try {
            d = d || "0", d = d.replace(/_|\-/g, "."), d = d.substr(0, d.indexOf(".") + 2)
        } catch (g) {
            d = "0.0", console.log(g)
        }
        try {
            b.ver = d, b.name = c, b.plat = e
        } catch (g) {
        }
        return b
    }}, EncodeUtil = {utf8to16: function(a) {
        var b, c, d, e, f, g, h, i, j;
        for (b = [], e = a.length, c = d = 0; e > c; ) {
            switch (f = a.charCodeAt(c++), f >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    b[d++] = a.charAt(c - 1);
                    break;
                case 12:
                case 13:
                    g = a.charCodeAt(c++), b[d++] = String.fromCharCode((31 & f) << 6 | 63 & g);
                    break;
                case 14:
                    g = a.charCodeAt(c++), h = a.charCodeAt(c++), b[d++] = String.fromCharCode((15 & f) << 12 | (63 & g) << 6 | 63 & h);
                    break;
                case 15:
                    switch (15 & f) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            g = a.charCodeAt(c++), h = a.charCodeAt(c++), i = a.charCodeAt(c++), j = (7 & f) << 18 | (63 & g) << 12 | (63 & h) << 6 | (63 & i) - 65536, b[d] = j >= 0 && 1048575 >= j ? String.fromCharCode(j >>> 10 & 1023 | 55296, 1023 & j | 56320) : "?";
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            c += 4, b[d] = "?";
                            break;
                        case 12:
                        case 13:
                            c += 5, b[d] = "?"
                    }
            }
            d++
        }
        return b.join("")
    },b64_decodex: function(a) {
        var b, c, d = [], e = "";
        for (b = 0, c = a.length; c > b; b += 4)
            e += EncodeUtil.b64_423(a.substr(b, 4));
        for (b = 0, c = e.length; c > b; b += 8)
            d += EncodeUtil.b2i(e.substr(b, 8));
        return d
    },b64_423: function(a) {
        for (var b = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"), c = 0, d = a.length, e = ""; d > c; c++) {
            for (var f = 0; 64 > f; f++)
                if (a.charAt(c) == b[f]) {
                    var g = f.toString(2);
                    e += ("000000" + g).substr(g.length);
                    break
                }
            if (64 == f)
                return 2 == c ? e.substr(0, 8) : e.substr(0, 16)
        }
        return e
    },b2i: function(a) {
        for (var b = 0, c = 128, d = 0; 8 > d; d++, c /= 2)
            "1" == a.charAt(d) && (b += c);
        return String.fromCharCode(b)
    }}, Passport = function() {
    var a, b = {}, c = function() {
        var a, b, c, d = ["ppinf", "ppinfo", "passport"];
        for (a = 0, b = d.length; b > a; a++)
            if (c = new RegExp("\\b" + d[a] + "\\b=(.*?)(?:$|;)").exec(document.cookie), c && c.length) {
                c = c[1];
                break
            }
        return c
    }, d = function(a) {
        var b = "";
        try {
            a = unescape(a).split("|"), ("1" == a[0] || "2" == a[0]) && (b = EncodeUtil.utf8to16(EncodeUtil.b64_decodex(a[3])))
        } catch (c) {
        }
        return b
    }, e = function(a) {
        var b, c, d, e = {};
        for (a = (a || "").split("|"), b = 0, c = a.length; c > b; b++)
            d = a[b].split(":"), d.length > 1 && (e[d[0]] = d[2]);
        return e
    }, f = function() {
        var f = c(), g = b;
        return a != f && (a = f, g = e(d(f)), b = g), g
    };
    return {getPassport: function() {
            return f().userid || ""
        },getUid: function() {
            return f().uid || ""
        },getUUID: function() {
            return f().uuid || ""
        },getQname: function() {
            return f().uniqname || ""
        }}
}();
!function() {
    "use strict";
    var a = {param: {navId: "js_nav",lsHisName: "latest_visit_history_url"},model: {pageInfo: {curPage: 1,totPage: 1,detail: {}},focusIndex: -1,touchStartX: 0,touchMoveX: 0,touchEndX: 0,isMobile: !0,pcDragFlag: !1,pcMoveInATag: !1},ctrl: {}}, b = a.param, c = a.model, d = a.ctrl;
    b.init = function(a) {
        return "undefined" != typeof a && (b.navId = a), 0 === $("#" + b.navId).length ? !1 : !0
    }, c.init = function() {
        return c.initPageInfo() && c.initFoucsIndex() ? (c.initIsMobile(), !0) : !1
    }, c.initIsMobile = function() {
        c.isMobile = "createTouch" in document
    }, c.initFoucsIndex = function() {
        return c.focusIndex = $("#" + b.navId + " .c").index(), c.focusIndex > -1 ? !0 : !1
    }, c.initPageInfo = function() {
        var a = c.pageInfo, b = c.getScreenWidth(), d = c.getNavContentWidth();
        if (-1 === d)
            return !1;
        var e = 0;
        b >= d ? a.totPage = 1 : (e = d % b, a.totPage = 0 === e ? d / b : (d - e) / b + 1);
        var f = a.detail;
        if (f[1] = 0, a.totPage > a.curPage)
            for (var g = 2, h = a.totPage; h >= g; g++)
                f[g + ""] = g !== h ? b * (g - 1) * -1 : 0 !== e ? -1 * (b * (g - 2) + e) : b * (g - 1) * -1;
        return !0
    }, c.getNavContentWidth = function() {
        var a = $("#" + b.navId + " > a"), c = a.length, d = 0, e = -1;
        return c > 0 ? ($.each(a, function(a, b) {
            b = $(b), -1 === e && (e = 1, e += parseInt(b.css("margin-left").split("px")[0], 10), e += parseInt(b.css("margin-right").split("px")[0], 10)), d += e + b.width()
        }), d) : -1
    }, c.getScreenWidth = function() {
        return $(document.body).width()
    }, d.init = function(a) {
        b.init(a) && c.init() && (d.initNavLocation(), Storage.set(b.lsHisName, window.location.href), d.cssInit(), d.iconInit(), d.eventInit())
    }, d.initNavLocation = function() {
        var a = c.getScreenWidth(), d = $("#" + b.navId + " .c").position().left;
        if (d > a) {
            var e = d % a, f = 0 === e ? d / a : (d - e) / a + 1;
            c.pageInfo.curPage = f, $("#" + b.navId).css({"-webkit-transform": "-webkit-transform 0ms",transition: "-webkit-transform 0ms"}).css({"-webkit-transform": "translate3d(" + c.pageInfo.detail[f + ""] + "px,0,0)"})
        }
    }, d.cssInit = function() {
        $("#" + b.navId).css({"-webkit-backface-visibility": "hidden","-webkit-transform": "-webkit-transform 200ms",transition: "-webkit-transform 200ms"})
    }, d.iconInit = function() {
        c.focusIndex > 0 && $(".logo em").show()
    }, d.eventInit = function() {
        var a, e, f, g = d.process;
        a = c.isMobile ? "touchstart" : "mousedown", e = c.isMobile ? "touchmove" : "mousemove", f = c.isMobile ? "touchend" : "mouseleave click", $("#" + b.navId).on(a, function(a) {
            return g.proStart(a), !1
        }), $("#" + b.navId).on(e, function(a) {
            return g.proMove(a), !1
        }), $("#" + b.navId).on(f, function() {
            g.proEnd()
        }), c.isMobile ? ($("#" + b.navId + " a").on(a, function() {
            g.down($(this))
        }), $("#" + b.navId + " a").on(f, function() {
            g.touchEnd($(this))
        })) : ($("#" + b.navId + " a").on("click", function(a) {
            g.pcNavClick($(this), a)
        }), $("#" + b.navId + " a").on("mousedown", function(a) {
            g.down($(this), a)
        }), $("#" + b.navId + " a").on("mouseleave", function() {
            g.pcAMouseLeave()
        }), $("#" + b.navId + " a").on("mouseover", function() {
            g.pcAMouseOver()
        }), $("#" + b.navId).on("mouseup", function(a) {
            g.pcMouseUp(a)
        }))
    }, d.showNavContentsByType = function(a) {
        var d = c.pageInfo, e = 0;
        "next" === a && d.curPage < d.totPage ? d.curPage++ : "prev" === a && d.curPage > 1 && d.curPage--, e = d.detail[d.curPage + ""], $("#" + b.navId).css({"-webkit-transform": "-webkit-transform 0ms",transition: "-webkit-transform 0ms"}).css({"-webkit-transform": "translate3d(" + e + "px,0,0)"})
    }, d.process = {}, d.process.touchEnd = function(a) {
        0 === c.touchMoveX && (window.location.href = a.attr("href"))
    }, d.process.down = function(a, b) {
        a.addClass("c"), c.isMobile || (c.touchMoveX = b.clientX)
    }, d.process.pcAMouseLeave = function() {
        c.pcMoveInATag = !0
    }, d.process.pcAMouseOver = function() {
        c.pcMoveInATag = !1
    }, d.process.pcMouseUp = function(a) {
        var b = d.process;
        c.pcMoveInATag && (b.proEnd(), a.preventDefault(), a.stopPropagation())
    }, d.process.pcNavClick = function(a, b) {
        var e = d.process;
        (c.isMobile && 0 !== c.touchMoveX || !c.isMobile && c.touchStartX !== c.touchMoveX) && (e.proEnd(), b.preventDefault(), b.stopPropagation())
    }, d.process.proStart = function(a) {
        c.touchStartX = c.isMobile ? a.touches[0].pageX : a.clientX, c.isMobile || (c.pcDragFlag = !0)
    }, d.process.proMove = function(a) {
        if (c.isMobile || c.pcDragFlag) {
            if ($("#" + b.navId + " a.c").length > 1) {
                var d = $("#" + b.navId + " a");
                d.removeClass("c"), $(d[c.focusIndex]).addClass("c")
            }
            c.touchMoveX = c.isMobile ? a.touches[0].pageX : a.clientX;
            var e = c.touchMoveX - c.touchStartX + c.pageInfo.detail[c.pageInfo.curPage + ""];
            $("#" + b.navId).css({"-webkit-transform": "-webkit-transform 0ms",transition: "-webkit-transform 0ms"}).css({"-webkit-transform": "translate3d(" + e + "px,0,0)"})
        }
    }, d.process.proEnd = function() {
        if (!c.isMobile) {
            if (!c.pcDragFlag)
                return;
            c.pcDragFlag = !1
        }
        if (0 !== c.touchMoveX)
            c.touchMoveX - c.touchStartX > 0 ? d.showNavContentsByType("prev") : c.touchMoveX - c.touchStartX < 0 && d.showNavContentsByType("next");
        else if ($("#" + b.navId + " a.c").length > 1) {
            var a = $("#" + b.navId + " a");
            a.removeClass("c"), $(a[c.focusIndex]).addClass("c")
        }
        $("#" + b.navId).css({"-webkit-transform": "-webkit-transform 200ms",transition: "-webkit-transform 200ms"}), c.touchMoveX = 0, c.touchStartX = 0
    }, $(document).ready(function() {
        d.init("js_nav")
    })
}(), function() {
    "use strict";
    var a = {param: {numClass: "js_history_num"},model: {},ctrl: {}}, b = a.param, c = a.model, d = a.ctrl;
    b.init = function() {
        return 0 === $("." + b.numClass).length ? !1 : !0
    }, c.storage = function(a, b) {
        var c = window.localStorage;
        return "undefined" == typeof b ? "undefined" != typeof c ? JSON.parse(c.getItem(a)) : null : void ("undefined" != typeof c && c.setItem(a, b))
    }, d.init = function() {
        if (b.init()) {
            var a = c.storage("watch_later");
            a instanceof Array && a.length > 0 && $("." + b.numClass).html(a.length)
        }
    }, $(document).ready(function() {
        d.init()
    })
}();
var Trace = function() {
    var a = 1, b = parseFloat(window.devicePixelRatio) || 1;
    $.os.android && (window.screen.width / window.innerWidth).toFixed(2) == b.toFixed(2) && (a = 1 / b);
    var c = window.screen, d = Math.floor(c.width * a) + "x" + Math.floor(c.height * a), e = Passport.getPassport(), f = "", g = "";
    return IsIOS ? (g = "ios", IsIPad ? f = "ipad" : IsIPhone && (f = "iphone")) : IsAndroid ? f = g = "android" : IsWindowsPhone && (f = g = "windowsphone"), {getUid: function() {
            return Cookie.get("SUV") || ""
        },getClientUid: function() {
            return Trace.getQueryString("uid") || ""
        },getScreenSize: function() {
            return d
        },getPassport: function() {
            return e
        },getOS: function() {
            return g
        },getPlatform: function() {
            return f
        },getVideoData: function(a) {
            var b = window.VideoData || window.videoData || {};
            return b[a] || ""
        },getQueryString: function(a) {
            var b = new RegExp("(^|&?)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
            return null !== c ? unescape(c[2]) : ""
        },getChannelSrc: function() {
            var a = Trace.getQueryString("src") || Trace.getQueryString("SRC") || Cookie.get("MTV_SRC") || "0";
            a = a.replace("|", "").replace("%7C", "");
            var b = /(\d+).(\d+).(\d+).(\d+)/i.test(window.document.domain);
            return "0" == a && IsWeixin && (a = "11040001"), "0" != a || !b && "" != window.document.domain || (a = "11050001"), a
        },getChanneled: function() {
            var a = window.VideoData || window.videoData || {}, b = Trace.getQueryString("src") || Trace.getQueryString("SRC") || "";
            b = b.replace("|", "").replace("%7C", "");
            var c = "1212120001";
            b && (c = "1212130001");
            var d = Cookie.get("_channeled") || c, e = location.href || "http://m.tv.sohu.com/";
            try {
                d = e.indexOf("hots") > -1 || "undefined" != typeof videoDataFirst && videoDataFirst ? a.channeled || Trace.getQueryString("channeled") || d : Trace.getQueryString("channeled") || a.channeled || d, IsWeixin && (d = "1211110001"), "sogou" == URL.getQueryString("from") && (d = "1200150001")
            } catch (f) {
                console.log(f)
            }
            return d
        },getConnectionType: function() {
            return Util.getConnectionType() || ""
        }}
}(), ClickTrace = {pingback: function(a, b, c) {
        var b = b || a && a.attr("position") || "", d = window.VideoData || window.videoData || {}, e = {}, f = Trace.getChanneled(), g = Trace.getVideoData("vid") || "", h = d.plid || d.aid || d.sid || "", i = location.href || "http://m.tv.sohu.com/";
        c = c || a && a.attr("details") || "";
        try {
            IsWeixin && (f = "1211110001"), e = {t: +new Date,uid: Trace.getUid(),position: b,op: "click",details: JSON.stringify(c),nid: Trace.getVideoData("nid") || "",url: encodeURIComponent(i),refer: encodeURIComponent(document.referrer || "http://m.tv.sohu.com/"),screen: Trace.getScreenSize(),os: Trace.getOS(),platform: Trace.getPlatform(),passport: Trace.getPassport(),vid: g || "",pid: h || "",channeled: f,MTV_SRC: encodeURIComponent(Trace.getChannelSrc())}
        } catch (j) {
            console.log("trace click exception ", j)
        }
        Util.pingback("http://z.m.tv.sohu.com/h5_cc.gif?" + $.param(e))
    }};
(location.href.match(/player=1/i) || location.host.indexOf("m.sohu.com") > -1) && (IS_EXTERNAL_PLAYER = !0);
var VideoTrace = {t: +new Date,playId: +new Date,inited: !1,init: function() {
        var a = 44, b = window.VideoData || window.videoData || {}, c = "";
        IsIPad ? (a = 4, c = "1h5") : IsIPhone ? (a = 41, c = "3h5") : IsAndroid ? (a = 42, c = "6h5") : IsWindowsPhone ? (a = 43, c = "11h5") : IsIEMobile && (a = 43), VideoTrace.qcPlat = c, VideoTrace.platType = a, VideoTrace.qfDomain = (Math.random() > .5 ? "qf1" : "qf2") + ".hd.sohu.com.cn", VideoTrace.qcURL = null !== URL.getQueryString("r") && b ? "http://sptjs1.hd.sohu.com.cn/h5/tttst.html" : "http://qc.hd.sohu.com.cn/caton/video/", VideoTrace.inited = !0
    },qcPingback: function(a) {
        if (!1 === VideoTrace.inited && VideoTrace.init(), "1h5" != VideoTrace.qcPlat) {
            var b = "", c = "", d = window.VideoData || window.videoData || {}, e = d.video_src || "", f = d.plid || d.aid || d.sid || "";
            IsIOS ? b = 1 : IsAndroid ? b = 2 : IsWindowsPhone && (b = 3), IsIPad ? c = "ipad" : /iPod/i.test(UA) ? c = "ipod" : IsIPhone ? c = "iphone" : IsWindowsPhone && (c = "windowsphone");
            var g = "";
            e.match(/\.m3u8/i) ? g = "m3u8" : e.match(/\.mp4/i) && (g = "mp4"), a += ["&uid=", Cookie.get("SUV") || "", "&poid=", "&plat=", VideoTrace.qcPlat, "&sver=", "&os=", b, "&sysver=", Util.getOSVersion(), "&net=", Trace.getConnectionType(), "&playmode=", "&vid=", d.vid || "", "&sid=", f, "&vtype=", g, "&pn=", c, "&duFile=", encodeURIComponent(e), "&version=", d.videoVersion || 0, "&isp2p=0", "&ltype=0", "&site=", d.site || "1", "&time=", +new Date].join(""), Util.pingback(VideoTrace.qcURL + "?" + a)
        }
    },parseChanneledJson: function() {
        var a = {}, b = window.VideoData || window.videoData || {}, c = Trace.getChanneled(), d = (b.vid || "", location.href || "http://m.tv.sohu.com/");
        return a.channeled = c || "1212120001", a.href = d, a.clientUid = Trace.getClientUid(), a
    },qfPingback: function(a) {
        !1 === VideoTrace.inited && VideoTrace.init();
        var b = window.VideoData || window.videoData || {};
        a += ["&seekto=0", "&pt=", VideoTrace.platType, "&sid=", Cookie.get("SUV") || "", "&vid=", b.vid || "", "&nid=", b.nid || "", "&ref=", encodeURIComponent(location.href), "&dom=", "&t=", VideoTrace.t++].join(""), Util.pingback("http://" + VideoTrace.qfDomain + "/dov.do?method=stat" + a)
    },DMPingback: function(a) {
        var b = Cookie.get("SUV") || "", c = window.VideoData || window.videoData || {}, d = VideoTrace.parseChanneledJson(), e = d.channeled, f = d.href || location.href, g = c.plid || c.aid || c.sid || "";
        a += ["&sid=", b, "&uid=", sid, "&ua=h5", "&vid=", c.vid || "", "&nid=", c.nid || "", "&pid=", g, "&catcode=", c.cateCode || "", "&url=", encodeURIComponent(f), "&refer=", encodeURIComponent(document.referrer || "http://m.tv.sohu.com/"), "&isHD=0", "&isp2p=0", "&type=vrs", "&systype=0", "&cateid=", c.cid, "&apikey=", API_KEY, "&trans=", $("input.trans").val() || "", "&_smuid=", Cookie.get("_smuid") || "-", "&site=", c.site || "1", "&MTV_SRC=", encodeURIComponent(Trace.getChannelSrc()), "&userid=&t=", VideoTrace.t++].join(""), Util.pingback("http://z.m.tv.sohu.com/" + a + "&channeled=" + e), a += "&pvid=", URL.getQueryString("pvid") || ""
    },DMPingbackNew: function(a, b) {
        var c = window.VideoData || window.videoData || {}, d = VideoTrace.parseChanneledJson(), e = d.channeled, f = d.href || location.href, g = c.plid || c.aid || c.sid || "";
        a = $.extend({url: f,refer: document.referrer || "http://m.tv.sohu.com/",uid: Trace.getUid(),webtype: Trace.getConnectionType(),screen: Trace.getScreenSize(),catecode: Trace.getVideoData("cateCode"),pid: g,vid: Trace.getVideoData("vid"),cateid: Trace.getVideoData("cid"),ltype: Trace.getVideoData("ltype"),company: Trace.getVideoData("company"),version: "0",type: "9001" == Trace.getVideoData("cid") ? "my" : "vrs",td: Trace.getVideoData("duration"),apikey: API_KEY,t: +new Date,os: Trace.getOS(),platform: Trace.getPlatform(),passport: Trace.getPassport(),channeled: e,site: c.site || "1",playid: VideoTrace.playId,nid: c.nid || "",MTV_SRC: encodeURIComponent(Trace.getChannelSrc())}, a), Util.pingback((b || "http://z.m.tv.sohu.com/vv.gif") + "?" + $.param(a)), window.flashStatistId && (a.channeled = window.flashStatistId, Util.pingback((b || "http://z.m.tv.sohu.com/vv.gif") + "?" + $.param(a)))
    },vv: function() {
        var a, b = window.VideoData || window.videoData || {};
        a = "undefined" != typeof b && "undefined" != typeof b.duration ? b.duration : 10, VideoTrace.qfPingback("&error=0&code=2&allno=0&vvmark=1&totTime=" + a), IS_EXTERNAL_PLAYER || Util.pingback("http://b.scorecardresearch.com/b?c1=1&c2=7395122&c3=&c4=&c5=&c6=&c11=" + (Cookie.get("SUV") || "")), VideoTrace.DMPingbackNew({site: b.site || "1",msg: "playCount",time: "0"}), VideoTrace.playId = +new Date, VideoTrace.qcPingback("code=10&duation=0")
    },realVV: function(a) {
        {
            var b = a ? (+new Date - a) / 1e3 : 0;
            window.VideoData || window.videoData || {}
        }
        VideoTrace.DMPingbackNew({msg: "videoStart",time: (+new Date - VideoTrace.playId) / 1e3}), VideoTrace.qcPingback("code=5&duation=" + b)
    },start: function() {
        var a = window.VideoData || window.videoData || {};
        ClickTrace.pingback(null, "video_play_start", JSON.stringify({vid: a.vid})), VideoTrace.qcPingback("code=15")
    },heart: function(a) {
        VideoTrace.DMPingbackNew({tc: a}, "http://z.m.tv.sohu.com/playtime.gif")
    },ended: function(a, b) {
        VideoTrace.DMPingbackNew({msg: "videoEnds",time: a}), VideoTrace.qcPingback("code=7&duration=" + a + "&ct=" + b)
    },abort: function() {
        VideoTrace.qfPingback("&code=8&error=800&allno=1&drag=-1")
    },error: function(a) {
        VideoTrace.qfPingback("&error=500&code=2&allno=1&vvmark=0"), VideoTrace.qcPingback("code=8&duation=" + (+new Date - a) / 1e3 + "&error=" + (window.VideoData.video_src ? "1000" : "401"))
    },buffer: function(a, b) {
        var c = (+new Date - b) / 1e3;
        (1 == a || 4 == a) && VideoTrace.qfPingback("&code=5&bufno=1&allbufno=" + a), VideoTrace.qcPingback("code=" + (1 == a ? 6 : 4) + "&ct=" + a + "&duation=" + c), null !== URL.getQueryString("r") && 1 == a && "undefined" != typeof RateTest && RateTest.startTest("auto")
    },autoPlay: function() {
        VideoTrace.qcPingback("code=30")
    },userClickPlay: function() {
        VideoTrace.qcPingback("code=31")
    }};
IS_EXTERNAL_PLAYER = location.href.match(/player=1/i) || location.host.indexOf("m.sohu.com") > -1 ? !0 : !1;
var cookieSUV = Cookie.get("SUV"), cookieIPLOC = Cookie.get("IPLOC");
if (!cookieSUV || !cookieIPLOC) {
    var _suv = 1e3 * +new Date + Math.round(1e3 * Math.random());
    cookieSUV || Cookie.set("SUV", _suv, 5e4, ".sohu.com"), cookieIPLOC || IS_EXTERNAL_PLAYER || Util.loadScript("http://pv.sohu.com/suv/" + _suv)
}
window.sohuPV = {pv: function(a) {
        var b = {};
        a = a || {};
        var c = window.VideoData || window.videoData || {}, d = a.channeled || Trace.getChanneled(), e = (c.vid || "", location.href || "http://m.tv.sohu.com/"), f = c.plid || c.aid || c.sid || "";
        try {
            b = {url: encodeURIComponent(e),refer: encodeURIComponent(document.referrer || "http://m.tv.sohu.com/"),uid: Trace.getUid(),webtype: Trace.getConnectionType(),screen: Trace.getScreenSize(),catecode: Trace.getVideoData("cateCode") || Trace.getVideoData("cate_code") || "",pid: f,vid: Trace.getVideoData("vid") || "",os: Trace.getOS(),platform: Trace.getPlatform(),passport: Trace.getPassport(),t: +new Date,channeled: d,MTV_SRC: encodeURIComponent(Trace.getChannelSrc())}
        } catch (g) {
            console.log("trace pv exception ", g)
        }
        ENABLE_DEBUG && console.log("trace pv ", b), Util.pingback("http://z.m.tv.sohu.com/pv.gif?" + $.param(b))
    }};
var TracePV = window.sohuPV;
if (!IS_EXTERNAL_PLAYER) {
    window._iwt_UA = "UA-sohu-123456", $(document).ready(function() {
        window.autoTrace && window.sohuPV.pv()
    }), Util.loadScript("http://tv.sohu.com/upload/Trace/iwt-min.js");
    var comsoreUrl = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    Util.loadScript(comsoreUrl, function() {
        "undefined" != typeof window.COMSCORE && window.COMSCORE.beacon({c1: "2",c2: "7395122",c3: "",c4: "",c5: "",c6: "",c15: ""})
    }), "m.s.sohu.com" === location.host ? $().ready(function() {
        Util.loadScript("http://js.sohu.com/wrating20120726.js", function() {
            var a;
            try {
                a = window._getAcc()
            } catch (b) {
            }
            a && Util.loadScript("http://sohu.wrating.com/a1.js", function() {
                window.vjAcc = a, window.wrUrl = "http://sohu.wrating.com/";
                try {
                    if (!0 === window.vjValidateTrack()) {
                        var b = window.wrUrl + "a.gif" + window.vjGetTrackImgUrl();
                        $(document.body).append('<div style="display:none"><img src="' + b + '" id="wrTagImage" /></div>'), window.vjSurveyCheck()
                    }
                } catch (c) {
                }
            })
        })
    }) : Util.loadScript("http://tv.sohu.com/upload/Trace/wrating.js")
}
!function() {
    "use strict";
    var a = window.svp || {};
    a.TYPE_CODE_MSG = {COPYRIGHT: {100: "您所在的国家或地区，不在所播放的节目版权范围",101: "该视频版权已到期，无法观看"},SUPPORT: {100: "您的浏览器不支持播放功能，请使用",101: "该视频目前只支持5分钟观看，观看完整视频，请使用",102: "UC浏览器不支持播放功能，建议使用系统浏览器或请使用",103: "直播请使用搜狐视频客户端"},REQUEST: {100: "网络超时，请刷新重试"}}, a.PLAY_MODE = {nor: "流畅",hig: "高清",sup: "超清"}, a.DEFAULT_CONFIG = {width: "100%",height: "100%",pWidth: "",pHeight: "",volume: 1,elemId: "videoTagId",dataType: "",alwaysShowControls: !1,autoplay: !0,defControls: !1,loop: !1,preload: !1,mediaType: "vod",modeType: "nor",html5SkinCss: "http://m.tv.sohu.com/mb/dist/css/play.css",posterType: "horizon",timeLimit: -1,isPauseAd: !1,pauseAdImg: "",mediaAdPlatform: "none",isCopyrightCheck: !0,androidPhoneDownloadUrl: "http://upgrade.m.tv.sohu.com/channels/hdv/4.2/SohuTV_4.2_680_201406030956.apk",androidPadDownloadUrl: "http://upgrade.m.tv.sohu.com/channels/hdv/3.5/SohuTV_3.5.0_680_201406191825.apk",iosDownloadUrl: "http://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8",winPhoneDownLoadUrl: "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94",pcDownLoadUrl: "http://m.tv.sohu.com/app/",adClose: "0",appid: "tv",debug: !1,channeled: "default",fullscreenType: 0,isRemHistory: !1}, a.$ = Zepto || jQuery, window.svp = a
}(), "undefined" == typeof svp && (svp = {}, svp.$ = window.$ || {}), function($) {
    $.fn.oriShow = function() {
        return this.css({display: "block"}), this
    }, $.fn.oriHide = function() {
        return this.css({display: "none"}), this
    };
    var extFun = {htmlLog: function(a, b) {
            0 === $("#js_htmlLog").length && $("body").append($('<div id="js_htmlLog" style="height: 200px;overflow: scroll;"></div>'));
            var c = [];
            $.isUndefined(a) || c.push("<span>" + a + "</span>"), $.isUndefined(b) || c.push("<span>" + b + "</span>"), $("#js_htmlLog").prepend(c.join(" ") + "<br>")
        },noop: function() {
        },blankFun: function() {
        },isString: function(a) {
            return "string" === $.type(a)
        },isUndefined: function(a) {
            return "undefined" === $.type(a)
        },isNumber: function(a) {
            return "number" === $.type(a)
        },isEmpty: function(a) {
            if (null == a)
                return !0;
            if (a.length > 0)
                return !1;
            if (0 === a.length)
                return !0;
            for (var b in a)
                if (hasOwnProperty.call(a, b) || null !== a[b])
                    return !1;
            return !0
        },isArray: function(a) {
            return !$.isUndefined(a) && a instanceof Array
        },merge: function(a, b) {
            for (var c in a)
                $.isUndefined(b[c]) || (a[c] = b[c]);
            return a
        },now: function() {
            return (new Date).getTime()
        },getISOTimeFormat: function() {
            var a = new Date, b = a.getFullYear(), c = a.getMonth() + 1, d = a.getDate(), e = a.getHours(), f = a.getMinutes(), g = a.getSeconds();
            return [[b, 10 > c ? "0" + c : c, 10 > d ? "0" + d : d].join("-"), [10 > e ? "0" + e : e, 10 > f ? "0" + f : f, 10 > g ? "0" + g : g].join(":")].join(" ")
        },formatSeconds: function(a) {
            a = parseInt(a);
            var b = parseInt(a / 60), c = b >= 60 ? parseInt(b / 60) : 0, d = a % 60, e = "";
            return b >= 60 && (b %= 60), c > 0 && (e += 10 > c ? "0" + c : c, e += ":"), e += 10 > b ? "0" + b : b, e += ":", e += 10 > d ? "0" + d : d
        },getHost: function() {
            var a = window.location.hostname || window.location.host, b = location.host.split(".");
            return b.length > 1 && (a = b.slice(b.length - 2).join(".")), a
        },getUrlParam: function(a, b) {
            b = b || document.location.toString();
            var c = new RegExp("(^|&|\\\\?)" + a + "=([^&]*)(&|$|#)"), d = null;
            return (d = b.match(c)) ? d[2] : ""
        },filterXSS: function(a) {
            return $.isString(a) ? (a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), a = a.replace(/\"/g, "&quot;"), a = a.replace(/\'/g, "&apos;")) : a
        },createGUID: function(a) {
            a = a || 32;
            for (var b = "", c = 1; a >= c; c++) {
                var d = Math.floor(16 * Math.random()).toString(16);
                b += d
            }
            return b
        },formatSize: function(a) {
            var b = "" + a;
            return b.indexOf("%") > 0 ? b : b.indexOf("px") > 0 ? b : /^\d+$/.test(b) ? b + "px" : b
        },isTrue: function(v) {
            return eval(svp.$.filterXSS(v))
        }};
    $.extend($, extFun), svp.Deferred = $.extend(!0, {}, $).Deferred
}(svp.$), function() {
    function a(a) {
        return a instanceof Array
    }
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o = [].slice;
    f = "1.3.2", c = "pending", e = "resolved", d = "rejected", j = function(a, b) {
        return null != a ? a.hasOwnProperty(b) : void 0
    }, l = function(a) {
        return j(a, "length") && j(a, "callee")
    }, i = function(b) {
        return l(b) ? i(Array.prototype.slice.call(b)) : a(b) ? b.reduce(function(b, c) {
            return a(c) ? b.concat(i(c)) : (b.push(c), b)
        }, []) : [b]
    }, g = function(a, b) {
        return 0 >= a ? b() : function() {
            return --a < 1 ? b.apply(this, arguments) : void 0
        }
    }, m = function(a, b) {
        return function() {
            var c;
            return c = [a].concat(Array.prototype.slice.call(arguments, 0)), b.apply(this, c)
        }
    }, h = function(a, b, c) {
        var d, e, f, g, h;
        for (g = i(a), h = [], e = 0, f = g.length; f > e; e++)
            d = g[e], h.push(d.call.apply(d, [c].concat(Array.prototype.slice.call(b))));
        return h
    }, b = function() {
        var a, f, g, j, k, l;
        return l = c, j = [], k = [], a = [], g = {}, this.promise = function(f) {
            var m, n;
            return f = f || {}, f.state = function() {
                return l
            }, n = function(a, b) {
                return function() {
                    return l === c && b.push.apply(b, i(arguments)), a() && h(arguments, g), f
                }
            }, f.done = n(function() {
                return l === e
            }, j), f.fail = n(function() {
                return l === d
            }, k), f.always = n(function() {
                return l !== c
            }, a), m = function(a, c) {
                var d, e;
                return d = new b, e = function(a, b, c) {
                    return a(c ? function() {
                        return b(c.apply(null, i(arguments)))
                    } : function() {
                        return b.apply(null, i(arguments))
                    })
                }, e(f.done, d.resolve, a), e(f.fail, d.reject, c), d
            }, f.pipe = m, f.then = m, f
        }, this.promise(this), f = function(b, d, e) {
            return function() {
                return l === c && (l = b, g = arguments, h([d, a], g, e)), this
            }
        }, this.resolve = f(e, j), this.reject = f(d, k), this.resolveWith = function() {
            var a, b;
            return b = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) : [], f(e, j, b).apply(null, a)
        }, this.rejectWith = function() {
            var a, b;
            return b = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) : [], f(d, k, b).apply(null, a)
        }, this
    }, n = function() {
        var a, c, d, e, f, h, j, k;
        for (e = new b, c = i(arguments), d = g(c.length, e.resolve), f = 0, j = c.length; j > f; f++)
            a = c[f], a.done(d);
        for (h = 0, k = c.length; k > h; h++)
            a = c[h], a.fail(function() {
                return e.reject()
            });
        return e.promise()
    }, k = function(a) {
        return a.Deferred = function() {
            return new b
        }, a.ajax = m(a.ajax, function(a, c) {
            var d, e;
            return null == c && (c = {}), e = new b, d = function(a, b) {
                return m(a, function() {
                    var a, c;
                    return c = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) : [], c && c.apply(null, a), b.apply(null, a)
                })
            }, c.success = d(c.success, e.resolve), c.error = d(c.error, e.reject), a(c), e.promise()
        }), a.ajaxTolerate = m(a.ajax, function(a, c) {
            var d, e, f = 0, g = !1;
            return null == c && (c = {}), e = new b, d = function(b, d, e) {
                return m(b, function() {
                    var b, h;
                    if (!g)
                        return h = arguments[0], b = 2 <= arguments.length ? o.call(arguments, 1) : [], e ? 1 > f ? (f++, a(c), null) : 2 == f ? (f++, g = !0, h && h.apply(null, b), d.apply(null, b)) : (f++, null) : (g = !0, h && h.apply(null, b), d.apply(null, b))
                })
            }, c.success = d(c.success, e.resolve), c.error = d(c.error, e.reject, !0), a(c), setTimeout(function() {
                g || a(c)
            }, 1e3), e.promise()
        }), a.when = n
    }, "undefined" != typeof exports ? (exports.Deferred = function() {
        return new b
    }, exports.when = n, exports.installInto = k) : (this.Deferred = function() {
        return new b
    }, this.Deferred.when = n, this.Deferred.installInto = k, this.DeferedClass = b)
}.call(svp), svp.Deferred.installInto(Zepto), function(a) {
    for (var b = 0, c = a.length; c > b; b++)
        if ("function" == typeof window[a[b]]) {
            svp.$ = window[a[b]];
            break
        }
}(["Zepto"]), function() {
    "undefined" == typeof document.DOCUMENT_NODE && (document.DOCUMENT_NODE = 9)
}(), function(a) {
    if ("undefined" == typeof a.getAsyncScript && (a.getAsyncScript = function(a, b) {
        var c = document.getElementsByTagName("head")[0] || document.body, d = document.createElement("script");
        d.async = "true", d.src = a, b && (d.onload = b), c.appendChild(d)
    }), "undefined" == typeof a.getScript && (a.getScript = function(a, b, c) {
        var d = document.getElementsByTagName("head")[0] || document.body, e = document.createElement("script"), f = !1;
        e.type = "text/javascript", e.src = a, e.onload = e.onreadystatechange = function() {
            f || this.readyState && "loading" === this.readyState || (f = !0, b && b.apply(null, c || []), e.onload = e.onreadystatechange = null, d.removeChild(e))
        }, d.appendChild(e)
    }), "undefined" == typeof a.getCSS && (a.getCSS = function(a) {
        var b = document.getElementsByTagName("head")[0] || document.body, c = document.createElement("link");
        c.href = a, c.rel = "stylesheet", c.type = "text/css", b.appendChild(c)
    }), "undefined" == typeof a.getFnName && (a.getFnName = function(a) {
        var b = "";
        return "function" == typeof a && (b = a.name || (/function ([^\(]+)/.exec(a.toString()) || [])[1] || ""), b
    }), "undefined" == typeof a.getFnArgName) {
        var b = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
        a.getFnArgName = function(a) {
            if ("function" == typeof a) {
                var c = a.toString().replace(b, ""), d = c.slice(c.indexOf("(") + 1, c.indexOf(")")).match(/([^\s,]+)/g);
                return null === d ? [] : d
            }
            return []
        }
    }
}(svp.$), function(a, b) {
    var c = {vid: "",liveId: ""};
    a.API_KEY = "f351515304020cad28c92f70f002261c", a.API_URL = "http://api.tv.sohu.com/", a.API_PROXY_URL = "http://m.tv.sohu.com/api/", a.API_PARAMS = {api_key: a.API_KEY,plat: "17",sver: "4.0",partner: "78"}, a.Helper = {formatVideoData: function(a, c) {
            var d = this, e = a, f = c, g = d.getVideoUrls(c), h = "";
            c && c.aid && (h = c.aid || "");
            var i = b.extend(!0, f, e);
            i.vid = a.vid ? a.vid : c.vid || "", i.tvid = a.tvid ? a.tvid : c.tv_id || "", i.nid = a.nid ? a.nid : c.nid || "", i.sid = a.sid ? a.sid : c.aid || h, i.plid = a.plid ? a.plid : c.aid || h, i.tvname = c.video_name || this.fotmatBasicParams(a, c, "tvname", "tv_name") || "", i.tips = c.tip || this.fotmatBasicParams(a, c, "tips", "tip") || "", i.videoCount = a.videoCount ? a.videoCount : c.video_count || 0, i.videoOrder = a.videoOrder ? a.videoOrder : c.video_order || 1, i.totalSet = a.totalSet ? a.totalSet : c.total_video_count || 0, i.cateCode = a.cateCode ? a.cateCode : c.cate_code || "", i.setListPageSize = a.setListPageSize ? a.setListPageSize : 20, i.startTime = a.startTime ? a.startTime : c.start_time || 0, i.endTime = a.endTime ? a.endTime : c.end_time || 0, i.totalDuration = a.totalDuration ? a.totalDuration : c.total_duration || 0, i.downloadSize = a.downloadSize ? a.downloadSize : c.file_size_mobile || 0, i.playCount = a.playCount ? a.playCount : c.play_count || 0, i.showDate = a.showDate ? a.showDate : c.show_date || "", i.isAds = a.isAds ? a.isAds : c.is_ads || 0, i.ipLimit = a.ipLimit ? a.ipLimit : c.ip_limit || 0, i.mobileLimit = a.mobileLimit ? a.mobileLimit : c.mobile_limit || 0, i.h5Limit = a.h5Limit ? a.h5Limit : c.h5_limit || 0, i.areaId = a.areaId ? a.areaId : c.area_id || 6, i.verHighPic = this.fotmatBasicParams(a, c, "verHighPic", "ver_high_pic") || c.video_big_pic || c.ver_big_pic || "", i.horHighPic = this.fotmatBasicParams(a, c, "horHighPic", "hor_high_pic") || c.video_big_pic || c.hor_big_pic || "", i = b.extend(!0, i, g);
            var j = ["ip_limit", "mobile_limit", "clips_duration_nor", "clips_duration_high", "clips_bytes_high", "clips_bytes_nor", "clips_bytes_super", "clips_duration_super", "url_nor", "url_high", "url_super", "url_nor_mp4", "url_high_mp4", "url_super_mp4"];
            return b.each(j, function(a, b) {
                i.hasOwnProperty(b) && delete i[b]
            }), i
        },fotmatBasicParams: function(a, b, c, d) {
            return b && b[d] ? b[d] : a[c ? c : d] || ""
        },formatPlayUrl: function(a) {
            if (a)
                var b = a.split(","), b = b.length > 0 && "" != b[0] ? b : [];
            return b
        },getVideoUrls: function(a) {
            var b = {};
            return b.durations = {nor: a && a.hasOwnProperty("clips_duration_nor") ? this.formatPlayUrl(a.clips_duration_nor) : [],hig: a && a.hasOwnProperty("clips_duration_high") ? this.formatPlayUrl(a.clips_duration_high) : [],sup: a && a.hasOwnProperty("clips_duration_super") ? this.formatPlayUrl(a.clips_duration_super) : []}, b.urls = {m3u8: {nor: a && a.hasOwnProperty("url_nor") ? this.formatPlayUrl(a.url_nor) : [],hig: a && a.hasOwnProperty("url_high") ? this.formatPlayUrl(a.url_high) : [],sup: a && a.hasOwnProperty("url_super") ? this.formatPlayUrl(a.url_super) : []},mp4: {nor: a && a.hasOwnProperty("url_nor_mp4") ? this.formatPlayUrl(a.url_nor_mp4) : [],hig: a && a.hasOwnProperty("url_high_mp4") ? this.formatPlayUrl(a.url_high_mp4) : [],sup: a && a.hasOwnProperty("url_super_mp4") ? this.formatPlayUrl(a.url_super_mp4) : []},downloadUrl: a && a.hasOwnProperty("download_url") ? this.formatPlayUrl(a.download_url) : []}, b
        },getParamsOption: function(a, c, d) {
            a = a || {};
            var e = a.vid || b.getUrlParam("vid"), f = a.site || b.getUrlParam("site");
            if (a.vid = e ? e : "", a.site = f ? f : 1, c && (a[c] = a[c] ? a[c] || b.getUrlParam(c) : d), b.getUrlParam("aid"))
                try {
                    a.aid = parseInt(b.getUrlParam("aid"))
                } catch (g) {
                }
            return a
        },loadVideoUrlByVid: function(c, d) {
            var e = this, f = {};
            c = e.getParamsOption(c);
            var g = c.vid, h = c.site, i = {};
            i.api_key = c.api_key || a.API_PARAMS.api_key, i.plat = c.plat || a.API_PARAMS.plat, i.sver = c.sver || a.API_PARAMS.sver, i.partner = c.partner || a.API_PARAMS.partner;
            var j = c.aid || "", k = {site: h};
            j && (k.aid = j);
            var l = a.API_URL + "v4/video/info/" + g + ".json?callback=?&" + b.param(b.extend({}, i, k));
            if ("" === g)
                return void console.log("videoinfo vid is null ", l);
            var m = b.Deferred();
            return b.ajaxTolerate({url: l,dataType: "jsonp"}).done(function(i) {
                if (i.data) {
                    if (f = e.formatVideoData(c, i.data), m.resolve(), !d || !b.isFunction(d))
                        return f;
                    d(f)
                } else {
                    var j = "1" == h ? 2 : 1;
                    l = a.API_URL + "v4/video/info/" + g + ".json?callback=?&" + b.param(b.extend({}, a.API_PARAMS, {site: j})), b.ajax({url: l,dataType: "jsonp",success: function(a) {
                            if (a.data) {
                                if (i = a, f = e.formatVideoData(c, i.data), m.resolve(), !d || !b.isFunction(d))
                                    return f;
                                d(f)
                            }
                        },error: function() {
                            m.reject()
                        }})
                }
            }).fail(function() {
                m.reject()
            }), m
        },loadHLSUrlByLiveId: function(d, e) {
            var f = {}, g = {}, h = b.Deferred();
            b.extend(b.extend(f, c), d), f.liveId = 0 == f.liveId || "" == f.liveId ? 147 : f.liveId;
            var i = {};
            i.api_key = d.api_key || a.API_PARAMS.api_key, i.plat = d.plat || a.API_PARAMS.plat, i.sver = d.sver || a.API_PARAMS.sver, i.partner = d.partner || a.API_PARAMS.partner;
            var j = "http://live.m.tv.sohu.com/api/live/v1/stations/" + f.liveId + "?callback=?&" + b.param({}, b.extend({}, i, {_rnd: (new Date).valueOf()}));
            return b.ajaxTolerate({url: j,dataType: "jsonp"}).done(function(a) {
                if (!a.tvStation && !a.tvStation.id)
                    return {};
                var c = a.tvStation;
                return g.liveId = c.id || "147", g.liveName = c.name || "浙江卫视test", g.liveUrl = c.liveUrl || "http://gslb.tv.sohu.com/live?cid=31&ver=seg&ckey=fME9d6wsjgYrRr&type=hls&prot=1&sig=PUP10dOmmowJw8sLRjPStw..&type=hls", g.liveIcon = c.iconBigPic || "", g.liveEnName = c.enName || "", g.ipLimit = c.ipLimit || "0", g.liveId || (g = {}), h.resolve(), e && b.isFunction(e) ? void e(g) : g
            }).fail(function() {
                h.reject()
            }), h
        },loadAlbumVideos: function(c, d) {
            var e = {}, f = b.Deferred(), g = c.aid || c.plid;
            (0 === g || "" === g) && (g = 0), c.aid = c.plid = g, c.vid = 0 === c.vid || "" === c.vid ? "" : c.vid, c.site = c.site || 1, c.page_size = c.page_size || c.pageSize || 20, c.with_trailer = c.with_trailer || 0;
            var h = {};
            h.api_key = c.api_key || a.API_PARAMS.api_key, h.plat = c.plat || a.API_PARAMS.plat, h.sver = c.sver || a.API_PARAMS.sver, h.partner = c.partner || a.API_PARAMS.partner;
            var i = "http://api.tv.sohu.com/v4/album/videos/" + c.plid + ".json?page_size=" + c.page_size + "&with_trailer=" + c.with_trailer;
            if (i += "&" + b.param(h), c.vid && 0 != c.vid && "" != c.vid ? i += "&vid=" + c.vid + "&site=" + (c.site || 1) : (c.page = c.page || 1, i += "&page=" + c.page), c.cid && 0 != c.cid && "" != c.cid && [76, 7, 13, 24].indexOf(parseInt(c.cid)) > -1 && (i += "&order=1"), d && b.isFunction(d)) {
                var j = b.getFnName(d);
                i += "&callback=?&_cb=" + j
            }
            return b.ajaxTolerate({url: i,dataType: "jsonp"}).done(function(a) {
                return e = a && a.data ? a : {}, f.resolve(), d && b.isFunction(d) ? void d(e) : e
            }).fail(function() {
                f.reject()
            }), f
        },loadSearchRecommend: function(c, d) {
            var e = {}, f = {}, g = b.Deferred();
            e.vid = 0 == c.vid || "" == c.vid ? "" : c.vid, e.cid = c.cid || 0, e.page_size = c.page_size || c.pageSize || 10, e.page = 1, e.api_key = c.api_key || a.API_PARAMS.api_key, e.plat = c.plat || a.API_PARAMS.plat, e.sver = c.sver || a.API_PARAMS.sver, e.partner = c.partner || a.API_PARAMS.partner;
            var h = "http://api.tv.sohu.com/v4/search/recommend.json?_from=h5&" + b.param(e);
            if (d && b.isFunction(d)) {
                var i = b.getFnName(d);
                h += "&callback=?&_cb=" + i
            }
            return b.ajaxTolerate({url: h,dataType: "jsonp"}).done(function(a) {
                return f = a && a.data ? a : {}, g.resolve(), d && b.isFunction(d) ? void d(f) : f
            }).fail(function() {
                g.reject()
            }), g
        },loadAlbumInfo: function(c, d) {
            var e = {}, f = {}, g = b.Deferred();
            e.aid = c.aid || c.plid || 0, e.api_key = c.api_key || a.API_PARAMS.api_key, e.plat = c.plat || a.API_PARAMS.plat, e.sver = c.sver || a.API_PARAMS.sver, e.partner = c.partner || a.API_PARAMS.partner;
            var h = "http://api.tv.sohu.com/v4/album/info/" + e.aid + ".json?_from=h5&" + b.param(e);
            if (d && b.isFunction(d)) {
                var i = b.getFnName(d);
                h += "&callback=?&_cb=" + i
            }
            return b.ajaxTolerate({url: h,dataType: "jsonp"}).done(function(a) {
                return f = a && a.data ? a : {}, g.resolve(), d && b.isFunction(d) ? void d(f) : f
            }).fail(function() {
                g.reject()
            }), g
        },loadAlbumSeriesByProgramId: function(c, d) {
            var e = {}, f = {}, g = b.Deferred();
            e.aid = c.aid || c.plid || 0, e.program_id = c.program_id || 0, e.api_key = c.api_key || a.API_PARAMS.api_key, e.plat = c.plat || a.API_PARAMS.plat, e.sver = c.sver || a.API_PARAMS.sver, e.partner = c.partner || a.API_PARAMS.partner;
            var h = "http://api.tv.sohu.com/v4/program/" + e.program_id + ".json?_from=h5&" + b.param(e);
            if (d && b.isFunction(d)) {
                var i = b.getFnName(d);
                h += "&callback=?&_cb=" + i
            }
            return b.ajaxTolerate({url: h,dataType: "jsonp"}).done(function(a) {
                return f = a && a.data ? a : {}, g.resolve(), d && b.isFunction(d) ? void d(f) : f
            }).fail(function() {
                g.reject()
            }), g
        },loadAlbumSeriesDataByPlid: function(b, c) {
            var d = {}, e = this;
            d.aid = b.aid || b.plid || 0, d.program_id = b.program_id || 0, d.api_key = b.api_key || a.API_PARAMS.api_key, d.plat = b.plat || a.API_PARAMS.plat, d.sver = b.sver || a.API_PARAMS.sver, d.partner = b.partner || a.API_PARAMS.partner, d.page_size = 50, d.page = 1, e.loadAlbumInfo(d, function(a) {
                d.page_size = a && a.data.latest_video_count ? a.data.latest_video_count : 50, e.loadAlbumVideos(d, c)
            })
        }}
}(svp, svp.$), function(a) {
    "use strict";
    a = a || {};
    var b = ($.userAgent, {model: {},view: {},ctrl: {}}), c = b.model, d = b.view, e = b.ctrl;
    c.getModeData = function(a) {
        var b = {}, c = a.modeType, d = [];
        return a && $.each(a.modeTypeList, function(a, b) {
            b !== c && d.push(b)
        }), b.curMode = c, b.selList = d, b
    }, c.getTitleData = function(a) {
        var b = {};
        return b.title = a.title || "", b
    }, c.getCtrlData = function(a) {
        var b = {};
        return b.pointList = [], $.each(a.pointList, function(c, d) {
            var e = {};
            e.left = d.time / a.duration * 100 + "%", e.desc = d.desc, b.pointList.push(e)
        }), b
    }, c.getPosterData = function(a) {
        var b = {};
        return b.poster = a.poster, b.posterType = a.posterType, b.desc = a.desc, b.latestCount = a.latestCount, b.mainActor = a.mainActor, b
    }, d.title = function(a) {
        var b = [];
        return b.push('<div class="video_title svp_title">'), b.push("<strong>"), b.push('<span class="svp_title_content">' + a.title + "</span>"), b.push("</strong>"), b.push("</div>"), b.join("")
    }, d.videoCon = function() {
        return '<div class="video"></div>'
    }, d.poster = function(a) {
        var b = [], c = ' style="background:url(' + a.poster + '); background-size: 100% 100%;"';
        return b.push('<div class="poster svp_poster"'), "horizon" === a.posterType && b.push(c), b.push(">"), "vertical" === a.posterType && (b.push('<div class="cover svp_poster_right" data-key="video_cover" data-type="image"'), b.push(c), b.push(">")), b.push("</div>"), "vertical" === a.posterType && (b.push('<div class="player_info svp_info">'), b.push('<h3 data-key="tv_name svp_info_title"></h3>'), b.push('<div data-key="tv_summary svp_info_summary">'), b.push("</div>"), b.push("</div>"), b.push("</div>")), b.join("")
    }, d.playMode = function(a) {
        var b = [];
        return "" !== a.curMode && a.selList.length > 0 && (b.push('<div class="quality_button quality_container svp_mid_mode">'), b.push(d.playModeContent(a)), b.push("</div>")), b.join("")
    }, d.playModeContent = function(b) {
        var c = [];
        return b.selList.length > 1 && (c.push('<div class="quality_definition_button svp_mid_cur_mode_btn">'), c.push('<span class="svp_mid_cur_mode" data-mode="' + b.curMode + '">' + a.PLAY_MODE[b.curMode] + "</span>"), c.push("</div>"), c.push('<div class="quality_definition_list">'), c.push('<ul class="svp_mid_mod_list" style="display: none">'), $.each(b.selList, function(b, d) {
            c.push('<li data-mode="' + d + '"><span>' + a.PLAY_MODE[d] + "</span></li>")
        }), c.push("</ul>"), c.push("</div>")), c.join("")
    }, d.midCtrl = function() {
        var a = [];
        return a.push('<div class="play_pause_con svp_mid">'), a.push('<span class="svp_mid_play" style="display:none;">'), a.push('<b class="state_play"></b>'), a.push("</span>"), a.push('<span class="svp_mid_pause" style="display:none;">'), a.push('<b class="state_pause"></b>'), a.push("</span>"), a.push('<span class="svp_mid_loading">'), a.push('<b class="state_loading"></b>'), a.push("</span>"), a.push("</div>"), a.join("")
    }, d.bottomCtrlBar = function(a) {
        var b = [];
        return b.push('<div class="slider_bar svp_ctrl_bar">'), b.push('<div class="left_btn_play">'), b.push('<div class="svp_ctrl_play"><b class="state_play"></b></div>'), b.push('<div class="svp_ctrl_pause" style="display:none;"><b class="state_pause"></b></div>'), b.push("</div>"), b.push('<div class="action_trackBar svp_ctrl_track_bar">'), b.push('<div class="trackbar">'), b.push('<b class="buffered svp_ctrl_buffer"></b>'), b.push('<div class="time-points svp_ctrl_points">'), $.each(a.pointList, function(a, c) {
            b.push('<em style="left:' + c.left + '"></em>')
        }), b.push("</div>"), b.push('<b class="played svp_ctrl_played_bar">'), b.push('<em class="handle svp_ctrl_drag_anchor"></em>'), b.push("</b>"), b.push('<em class="drag_timer svp_ctrl_drag_time">00:00</em>'), b.push("</div>"), b.push("</div>"), b.push('<div class="time svp_ctrl_time">'), b.push('<b class="current_time svp_ctrl_cur_time">00:00</b> / '), b.push('<span class="duration svp_ctrl_duration" data-key="totalDuration" data-type="time">00:00</span>'), b.push("</div>"), b.push('<div class="controllers svp_ctrl_screen">'), b.push('<div class="fullscreen disabled svp_ctrl_full_screen">'), b.push("<span></span>"), b.push("</div>"), b.push('<div class="shrinkscreen disabled svp_ctrl_shrink_screen" style="display:none;">'), b.push("<span></span>"), b.push("</div>"), b.push("</div>"), b.join("")
    }, d.msgWithBtn = function(a) {
        var b = [], c = a && a.msg ? a.msg : "";
        return b.push('<div class="appdl_download2 svp_msg_width_btn" style="display: none;">'), b.push('<div class="msg_block">'), b.push('<span class="msg svp_content">' + c + "</span>"), b.push('<a href="javascript:void(0);" class="svp_download_btn actionLink">搜狐视频客户端</a>'), b.push("</div>"), b.push("</div>"), b.join("")
    }, d.msg = function(a) {
        var b = [], c = a && a.msg ? a.msg : "";
        return b.push('<div class="appdl_download2 svp_msg" style="display: none;">'), b.push('<table class="msg_block"><tr><td>'), b.push('<span class="msg svp_content">' + c + "</span>"), b.push("</td></tr></table>"), b.push("</div>"), b.join("")
    }, d.timeLimitMsg = function(a) {
        var b = [], c = a && a.msg ? a.msg : "";
        return b.push('<div class="appdl_download2 time_limit svp_time_limit_msg" style="display: none;">'), b.push('<div class="msg_block">'), b.push('<span class="msg msg_title svp_content">只提供' + c + "分钟预览</span>"), b.push('<span class="msg msg_desc">请移至搜狐视频App观看完整版</span>'), b.push('<a href="javascript:void(0);" class="svp_download_btn actionLink">立刻观看完整版</a>'), b.push("</div>"), b.push("</div>"), b.join("")
    }, d.ctrl = function(a) {
        var b = [];
        return b.push('<div class="player_controls svp_ctrl">'), b.push(d.midCtrl()), b.push('<div class="message">'), b.push("<p></p>"), b.push("</div>"), b.push(d.bottomCtrlBar(a)), b.push('<div class="ad-img">'), b.push("<em></em>"), b.push("</div>"), b.push("</div>"), b.push("</div>"), b.join("")
    }, d.playerLoading = function() {
        var a = [];
        return a.push('<div class="player_bg_loading svp_player_bg_loading">'), a.push('<b class="player_loading_icon"></b>'), a.push("<p>努力加载中...</p>"), a.push(d.msgWithBtn()), a.push(d.msg()), a.push("</div>"), a.join("")
    }, e.makeErrorTmpl = function(b) {
        var c = [], e = $.isNumber(b.height) ? b.height + "px" : b.height, f = $.isNumber(b.width) ? b.width + "px" : b.width;
        return c.push('<div class="player inline_player" id="main_player_' + a.BaseHtml5.maxId + '" style="height:' + e + "; width:" + f + '">'), c.push(d.msgWithBtn()), c.push(d.msg()), c.push("</div>"), c.join("")
    }, e.makeTmpl = function(b) {
        var e = [], f = $.isNumber(b.height) ? b.height + "px" : b.height, g = $.isNumber(b.width) ? b.width + "px" : b.width;
        e.push('<div class="player inline_player" id="main_player_' + a.BaseHtml5.maxId + '" style="height:' + f + "; width:" + g + '">'), e.push(d.videoCon());
        var h = c.getTitleData(b);
        e.push(d.title(h));
        var i = c.getPosterData(b);
        e.push(d.poster(i));
        var j = c.getCtrlData(b);
        e.push(d.ctrl(j));
        var k = c.getModeData(b);
        return e.push(d.playMode(k)), e.push('<div class="mask-layer svp_mask_layer" style="display: none;"></div>'), e.push(d.msgWithBtn()), e.push(d.msg()), e.push(d.timeLimitMsg()), e.push("</div>"), e.join("")
    }, a.tmpl = function(a) {
        return $.isUndefined(a) ? "" : e.makeTmpl(a)
    }, a.errorTmpl = function(a) {
        return $.isUndefined(a) ? "" : e.makeErrorTmpl(a)
    }, a.updateModeTypeList = function(a) {
        var b = c.getModeData(a);
        return d.playModeContent(b)
    }, a.playerLoadingTmpl = function() {
        return d.playerLoading()
    }
}(svp), function(a, b) {
    "use strict";
    var c = b.userAgent, d = {isMediaAdContent: !1,vid: "",elemId: "",poster: "",posterType: "",mediaType: "",modeType: "",modeTypeList: [],srcType: "",width: "",height: "",volume: 0,curPlayUrl: "",srcList: {},pointList: [],alwaysShowControls: !1,autoplay: !1,defControls: !1,loop: !1,preload: !1,title: "",duration: 0,curIndex: -1,totCounts: -1,html5SkinCss: "",history: {},ipLimit: "",liveEnName: "",liveIcon: "",liveId: "",timeLimit: -1,liveUrl: "",vidList: [],vidCurIndex: -1,isPauseAd: !1,pauseAdImg: "",mediaAdPlatform: "none",copyrightRst: {rst: !0,msg: ""},appid: "",debug: !1,mainActor: "",latestCount: "",desc: "",oriUrls: null,channeled: "default",fullscreenType: 0,isRemHistory: !1}, e = function(a, c) {
        b.extend(!0, this, d), b.merge(this, a), b.isUndefined(c) || (this.isMediaAdContent || g(c), "vod" === a.mediaType ? this._initVOD(a, c) : this._initHLS(a, c))
    }, f = function(a, c) {
        var d = a.cateCode || a.cate_code || "", e = ["vid=" + a.vid, "&uid=" + Cookie.get("SUV") || "", "&plat=17", "&pt=" + Util.getUserPt(), "&prod=h5", "&pg=1", "&eye=0", "&cv=1.0.0", "&qd=" + (Action.channelNum && "0" !== Action.channelNum ? Action.channelNum : "680"), "&src=" + (Action.channelSrc && "0" !== Action.channelSrc ? Action.channelSrc : "1105"), "&cateCode=" + d.split(";")[0] || ""].join("");
        return b.isUndefined(c) || (c += (c.match(/\?/) ? "&" : "?") + e), c
    }, g = function(a) {
        var c = a.urls;
        for (var d in c)
            if ("downloadUrl" === d) {
                {
                    c[d]
                }
                if (!b.isUndefined(c[d][0]) && "" !== c[d][0]) {
                    var e = c[d][0];
                    c[d][0] = f(a, e)
                }
            } else
                for (var g in c[d])
                    b.each(c[d][g], function(b, e) {
                        c[d][g][b] = f(a, e)
                    })
    };
    e.prototype._initHLS = function(d, e) {
        var f = this;
        b.merge(this, e), f.title = e.liveName || "", f.srcType = /Android 2\./i.test(c.desc) ? "client" : a.support.isSupportM3u8() ? "m3u8" : "client", f.liveId = e.liveId, f.curPlayUrl = e.liveUrl
    }, e.prototype.getPlayList = function() {
        return this.srcList[this.modeType] || []
    }, e.prototype.getNextUrl = function() {
        var a = this.getPlayList(), c = this.curIndex + 1, d = a[c];
        return b.isUndefined(d) ? "" : d.url
    }, e.prototype.getFirstUrl = function() {
        var a = this.getPlayList(), c = a[0];
        return b.isUndefined(c) ? "" : c.url
    }, e.prototype._initVOD = function(d, e) {
        var f = this;
        f.poster = "horizon" === f.posterType ? e.horHighPic || e.verHighPic || "" : e.verHighPic || e.horHighPic || "";
        var g = e.totalDuration || e.total_duration || 0;
        f.duration = parseInt(g, 10), f.timeLimit > -1 && f.timeLimit < f.duration && (f.duration = f.timeLimit), f.title = e.tvname || e.videoName || e.video_name || "", f.mainActor = e.main_actor || "", f.latestCount = e.latest_video_count || "", f.desc = e.video_desc || "", b.isUndefined(e.srcType) ? a.isForceUseM3u8() ? f.srcType = "m3u8" : a.isForceUseDownloadUrl() ? (e.urls.mp4 = {}, e.urls.mp4.nor = e.urls.downloadUrl) : f.srcType = a.support.isSupportM3u8() ? "m3u8" : "mp4" : f.srcType = e.srcType, b.isUndefined(e.urls) || (f.oriUrls = e.urls), !b.isUndefined(e.ep) && e.ep instanceof Array && b.each(e.ep, function(a, b) {
            var c = {};
            c.time = parseInt(b.k, 10), c.desc = b.v, f.pointList.push(c)
        }), f.vid = e.vid, "default" !== f.channeled ? e.channeled = f.channeled : f.channeled = e.channeled;
        var h = !1;
        if (!b.isUndefined(e.urls)) {
            var i = e.urls[f.srcType], j = e.durations;
            for (var k in i)
                f.srcList[k] = [], i[k] instanceof Array && b.each(i[k], function(a, b) {
                    var c = {};
                    c.url = b, c.duration = "m3u8" === f.srcType ? e.totalDuration || e.total_duration || -1 : parseInt(j[k][a] || -1, 10), f.srcList[k].push(c)
                }), !h && f.srcList[k].length > 0 && (h = !0, f.totCounts = f.srcList[k].length);
            var l = function() {
                var a = {};
                a.url = "", b.isUndefined(e.urls.downloadUrl) || (a.url = e.urls.downloadUrl[0] || ""), a.duration = parseInt(f.duration || -1, 10), f.srcType = "mp4", f.modeType = "nor", f.srcList.nor = [a], f.totCounts = f.srcList.nor.length
            };
            h || "client" === f.srcType || l(), f.totCounts > 0 && (f.curIndex = 0), f.isMediaAdContent || c.isIphone || !c.isUCBrowser || "client" === f.srcType || l(), /Android 2./i.test(c.desc) && l(), f._initCurPlayUrlAndModeType()
        }
    }, e.prototype._initCurPlayUrlAndModeType = function() {
        var a = this, c = a.getPlayList(), d = ["nor", "hig", "sup"];
        b.each(d, function(d, e) {
            if (!b.isUndefined(a.srcList[e]) && a.srcList[e].length > 0) {
                if (0 === c.length)
                    return a.modeType = e, !1;
                a.modeTypeList.push(e)
            }
        }), c = a.getPlayList(), c.length > 0 && (this.curPlayUrl = c[0].url)
    }, a.VideoInfo = e
}(svp, svp.$), function(a) {
    "use strict";
    a = a || {};
    var b = $.userAgent;
    a.COOPERATOR_LIST = [/XiaoMi\/MiPad/i], a.FORBID_AUTOPLAY_LIST = [/MI[\s\-_]ONE/i, /Android\/?\s?2\../i, /XiaoMi\/MiPad/i, /SAMSUNG/i, /Windows Phone/i, /iphone/i, /GiONEE/i, /OPPP|R80/i, /HM NOTE/i, /Nexus/i, /iPad.*Mac OS/i, /HTC\sZ710e/i, /M032.*JRO03H/i, /GT-/i, /HUAWEI\sG750-T00/i, /A000/i, /qqdownloader/], a.WX_FORBID_AUTOPLAY_LIST = [/MI[\s\-_]+/i, /SM\-N90/i, /HUAWEI/i, /Coolpad/i, /E7/i, /GT\-I95/i, /GT\-N71/i, /M032.*JRO03H/i, /Android\/?\s?4\.0/i], a.FORCE_USE_DOWNLOADURL_LIST = [/M032.*JRO03H/i], a.FORCE_USE_M3U8_LIST = [], a.PLID_LIST = [], a.ADV_BLACK_LIST = [/M032.*JRO03H/i, /Android\/?\s?2\../i, /Android\/?\s?4\.0.*X907.*QQBrowser/i, /QQBrowser\/4\.2/i, /HTC8088_TD/i], a.SERVICE_BLACK_LIST = {ios: [],android: [],winPhone: []}, a.FULL_SCREEN_LIST = [/XiaoMi\/MiPad/i], a.M3U8_BLACK_LIST = {ios: [],android: [/HM\sNOTE/i, /Build\/HM.*XiaoMi\/MiuiBrowser/i, /vivo/i, /ZTE/i, /TCL/i, /Coolpad/i, /M032.*JRO03H/i, /MQQBrowser(\/4\.|\s4\.)+/i],winPhone: []}, a.MP4_BLACK_LIST = {ios: [],android: [],winPhone: []}, a.VIDEO_DOWNLOAD_SRC_LIST = ["1000", "1102"], a.VIDEO_M3U8_SRC_LIST = ["1080", "1128"], a.AD_FILTER_SRC_LIST = ["1000", "1080"];
    var c = function(a, c) {
        var d = !1;
        return !$.isUndefined(a) && $.isArray(c[a]) && $.each(c[a], function(a, c) {
            return c.test(b.desc) ? b.isQQBrowser && -1 === c.toString().indexOf("QQBrowser") ? (d = !1, !1) : (d = !0, !1) : void 0
        }), d
    }, d = function() {
        var a = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
        return "" !== a && a.length >= 4 && (a = a.substr(0, 4)), a
    };
    a.isInBlackList = function(d) {
        var e = "", f = !1;
        return b.isIphone || b.isIpad ? e = "ios" : b.isAndroid ? e = "android" : b.isWindowsPhone && (e = "winPhone"), "m3u8" === d && (c(e, a.SERVICE_BLACK_LIST) || c(e, a.M3U8_BLACK_LIST)) ? f = !0 : "mp4" === d && (c(e, a.SERVICE_BLACK_LIST) || c(e, a.MP4_BLACK_LIST)) && (f = !0), f
    }, a.isForceUseM3u8 = function() {
        var c = !1, e = d();
        return $(a.VIDEO_M3U8_SRC_LIST).indexOf(e) >= 0 && (c = !0), c || $.each(a.FORCE_USE_M3U8_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        }), c
    }, a.isForceUseDownloadUrl = function() {
        var c = !1, e = d();
        return $(a.VIDEO_DOWNLOAD_SRC_LIST).indexOf(e) >= 0 && (c = !0), c || $.each(a.FORCE_USE_DOWNLOADURL_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        }), c
    }, a.isCooperator = function() {
        var c = !1;
        return $.each(a.COOPERATOR_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        }), c
    }, a.cooperatorProcess = function(b) {
        var c = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
        "" !== c && c.length >= 4 && (c = c.substr(0, 4), $(a.VIDEO_DOWNLOAD_SRC_LIST).indexOf(c) >= 0 && b.urls.downloadUrl.length > 0 && (b.urls.mp4 = {}, b.urls.mp4.nor = b.urls.downloadUrl))
    }, a.isFullScreen = function() {
        var c = !1;
        $.each(a.FULL_SCREEN_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        });
        var d = URL.getQueryString("player") || URL.getQueryString("PLAYER") || "";
        return "1" === d && (c = !0), c
    }, a.advFilter = function() {
        var b = !1, c = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
        return c && c.indexOf("|") > -1 && (c = c.split("|")[0]), $.each(a.AD_FILTER_SRC_LIST, function(a, d) {
            return c === d ? (b = !0, !1) : void 0
        }), b
    }, a.isForbidAutoplay = function() {
        var c = !1;
        return $.each(a.FORBID_AUTOPLAY_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        }), IsWeixin && $.each(a.WX_FORBID_AUTOPLAY_LIST, function(a, d) {
            return d.test(b.desc) ? (c = !0, !1) : void 0
        }), IsAndroidPad && (c = !0), c
    }, a.isAllowPlayAdv = function(c) {
        var d = !0;
        return $.each(a.ADV_BLACK_LIST, function(a, c) {
            return c.test(b.desc) ? (d = !1, !1) : void 0
        }), a.advFilter(c) ? !1 : d
    }
}(svp), function() {
    "use strict";
    svp = svp || {};
    var a = $.userAgent;
    svp.support = {isUseHtml5: function(a) {
            var b = navigator.userAgent, c = null;
            if (/ipad|ipod|iphone|lepad_hls|IEMobile/gi.test(b))
                return !0;
            if (svp.$.os.android) {
                if (svp.support.isSupportMP4(a))
                    return !0;
                if (svp.$.browser.MQQ && svp.$.browser.getNumVersion() >= 4.2)
                    return !0;
                if (-1 !== b.indexOf("MI-ONE") || -1 !== b.indexOf("MI2"))
                    return !0;
                if (svp.$.os.version >= "4" && (c = b.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)) && c[1] >= 4.2)
                    return !0;
                if (svp.$.os.version >= "4.1")
                    return !0
            }
            return svp.support.isSupportMP4(a) || svp.support.isSupportM3u8(a) ? !0 : svp.$.browser.ie && svp.$.os.windows && svp.$.browser.getNumVersion() >= 9 ? !0 : !1
        },isUseHLS: function() {
            return svp.$.os.ios ? !0 : !1
        },isLiveUseHTML5: function() {
            return svp.$.os.ios ? !0 : svp.$.os.android && svp.$.browser.MQQ && svp.$.browser.getNumVersion() >= 4.2 ? !0 : !1
        },isUseFlash: function() {
            return svp.$.browser.ie && svp.$.os.windows ? !0 : !1
        },isSupportM3u8: function() {
            if (svp.isInBlackList("m3u8"))
                return !1;
            if (a.isIphone || a.isIpad || "m3u8" === URL.getQueryString("srcType"))
                return !0;
            var b = document.getElementsByTagName("video")[0] || document.createElement("video");
            if ("function" == typeof b.canPlayType) {
                var c = b.canPlayType("application/x-mpegURL");
                if (a.isAndroid && a.isUCBrowser)
                    return !1;
                if ("probably" === c)
                    return !0;
                if ("maybe" === c)
                    return a.isAndroid && (a.isBaiduBrowser || a.isQQBrowser) ? !0 : !1
            }
            return !1
        },isSupportWebm: function() {
            if (svp.$.os.android && svp.$.os.version >= "4.1")
                return !0;
            var a = document.getElementsByTagName("video")[0] || document.createElement("video");
            return "function" != typeof a.canPlayType || "probably" !== a.canPlayType('video/webm; codecs="vp8.0, vorbis"') && "probably" !== a.canPlayType('video/webm; codecs="vp9.0, vorbis"') ? !1 : !0
        },isSupportMP4: function() {
            if (svp.isInBlackList("mp4"))
                return !1;
            if (a.isWindowsPhone || a.isFirefoxBrowser || "mp4" === URL.getQueryString("srcType"))
                return !0;
            var b = document.getElementsByTagName("video")[0] || document.createElement("video");
            if ("function" == typeof b.canPlayType) {
                if ("" === b.canPlayType('video/mp4; codecs="mp4v.20.8"'))
                    return !1;
                if ("" === b.canPlayType('video/mp4; codecs="avc1.42E01E"') || "" === b.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))
                    return !1
            }
            return !0
        },isSupportSVG: function() {
            return document.implementation && svp.$.isFunction(document.implementation.hasFeature) ? document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") : !1
        },isEnforceMP4: function() {
            if (svp.$.os.android) {
                if (svp.$.browser.firefox)
                    return !0;
                if (svp.$.os.version >= "4.0" && svp.$.browser.MQQ && svp.$.browser.version < "4.0")
                    return !0
            }
            return !1
        }}
}(), function(a) {
    function b(a) {
        return "tagName" in a ? a : a.parentNode
    }
    function c(a, b, c, d) {
        var e = Math.abs(a - b), f = Math.abs(c - d);
        return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
    }
    function d() {
        j = null, k.last && (k.el.trigger("longTap"), k = {})
    }
    function e() {
        j && clearTimeout(j), j = null
    }
    function f() {
        g && clearTimeout(g), h && clearTimeout(h), i && clearTimeout(i), j && clearTimeout(j), g = h = i = j = null, k = {}
    }
    if (!(a.browser.WeChat && a.browser.getNumVersion() < 5 || a.os.windows && a.browser.ie || a.isFunction(a.fn.tap))) {
        var g, h, i, j, k = {}, l = 750;
        a(document).ready(function() {
            var m, n;
            a(document.body).bind("touchstart", function(c) {
                m = Date.now(), n = m - (k.last || m), k.el = a(b(c.touches[0].target)), g && clearTimeout(g), k.x1 = c.touches[0].pageX, k.y1 = c.touches[0].pageY, n > 0 && 250 >= n && (k.isDoubleTap = !0), k.last = m, j = setTimeout(d, l)
            }).bind("touchmove", function(a) {
                e(), k.x2 = a.touches[0].pageX, k.y2 = a.touches[0].pageY
            }).bind("touchend", function() {
                e(), k.x2 && Math.abs(k.x1 - k.x2) > 30 || k.y2 && Math.abs(k.y1 - k.y2) > 30 ? i = setTimeout(function() {
                    k.el && "function" == typeof k.el.trigger && (k.el.trigger("swipe"), k.el.trigger("swipe" + c(k.x1, k.x2, k.y1, k.y2)), k = {})
                }, 0) : "last" in k && (h = setTimeout(function() {
                    if (k.el && "function" == typeof k.el.trigger) {
                        var b = a.Event("tap");
                        b.cancelTouch = f, k.el.trigger(b), k.isDoubleTap ? (k.el.trigger("doubleTap"), k = {}) : g = setTimeout(function() {
                            g = null, k.el && k.el.trigger("singleTap"), k = {}
                        }, 250)
                    }
                }, 0))
            }).bind("touchcancel", f), a(window).bind("scroll", f)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
            a.fn[b] = function(a) {
                return this.bind(b, a)
            }
        })
    }
}(svp.$), function() {
    function a(a) {
        a && a.indexOf("mmg.aty.sohu.com") > -1 && (a = c.repOrAddParams(a)), console.log("adEngine trackImg URL", a);
        var b = new Image;
        b.src = a, e.push(b)
    }
    var b, c = window.vast = {}, d = new Array, e = [];
    c.parseData = function(a) {
        function e(a) {
            var b = a.split(":"), c = parseInt(b[0]), d = parseInt(b[1]), e = parseInt(b[2]), f = 3600 * c + 60 * d + e;
            return f
        }
        window.DOMParser ? (parser = new DOMParser, xmlDoc = parser.parseFromString(a, "text/xml")) : (xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), xmlDoc.async = "true", xmlDoc.loadXML(a)), console.log(a);
        for (var f = xmlDoc.getElementsByTagName("Ad"), g = 0; g < f.length; g++) {
            for (var h = {}, i = {}, j = f[g].getElementsByTagName("InLine"), k = 0; k < j.length; k++) {
                var l = j[k].tagName, m = j[k].getElementsByTagName("AdSystem")[0].tagName, n = j[k].getElementsByTagName("AdSystem")[0].childNodes[0].nodeValue;
                i[m] = n;
                var o = j[k].getElementsByTagName("AdTitle")[0].tagName, p = j[k].getElementsByTagName("AdTitle")[0].childNodes[0].nodeValue;
                i[o] = p;
                var q = j[k].getElementsByTagName("Description")[0].tagName, r = j[k].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
                i[q] = r;
                for (var s = j[k].getElementsByTagName("Impression"), t = new Array, u = 0; u < s.length; u++) {
                    var v = {}, w = {}, x = j[k].getElementsByTagName("Impression")[u].tagName, y = j[k].getElementsByTagName("Impression")[u].childNodes[0].nodeValue, y = y.replace(/\s/g, "");
                    v[x] = y;
                    var z = j[k].getElementsByTagName("Impression")[u].getAttribute("id");
                    w[z] = v, t.push(w)
                }
                i.Imp = t, i.isImp = !1;
                for (var A = j[k].getElementsByTagName("Creatives")[0], B = A.getElementsByTagName("Creative"), C = 0; C < B.length; C++) {
                    var D = B[C].getElementsByTagName("Linear")[0], E = D.getElementsByTagName("Duration")[0].tagName, F = D.getElementsByTagName("Duration")[0].childNodes[0].nodeValue;
                    i[E] = e(F);
                    for (var G = D.getElementsByTagName("MediaFiles")[0], H = G.getElementsByTagName("MediaFile"), I = new Array, J = 0; J < H.length; J++) {
                        var K = {};
                        if (H[J].hasChildNodes())
                            var L = H[J].tagName, M = H[J].childNodes[0].nodeValue, M = M.replace(/\s/g, "");
                        else
                            var M = null;
                        K[L] = M;
                        var N = H[J].getAttribute("width");
                        K.width = N;
                        var O = H[J].getAttribute("height");
                        K.height = O;
                        var P = H[J].getAttribute("type");
                        K.type = P;
                        var Q = H[J].getAttribute("vid");
                        K.vid = Q, I.push(K)
                    }
                    i.MediaFile = I;
                    for (var R = D.getElementsByTagName("VideoClicks")[0], S = R.getElementsByTagName("ClickThrough"), T = 0; T < S.length; T++) {
                        var U = S[T].tagName, V = S[T].childNodes[0].nodeValue, V = V.replace(/\s/g, "");
                        i[U] = V
                    }
                    var W = R.getElementsByTagName("ClickTracking"), X = new Array;
                    if (R.hasChildNodes()) {
                        for (var Y = 0; Y < W.length; Y++) {
                            var Z = {}, $ = W[Y].tagName, _ = W[Y].childNodes[0].nodeValue, _ = _.replace(/\s/g, "");
                            Z[$] = _;
                            var ab = W[Y].getAttribute("id");
                            Z.id = ab, X.push(Z)
                        }
                        i.ClickTracking = X
                    }
                    var bb = D.getElementsByTagName("TrackingEvents")[0];
                    if (void 0 != bb) {
                        for (var cb = bb.getElementsByTagName("Tracking"), db = new Array, eb = 0; eb < cb.length; eb++) {
                            var fb = {}, gb = cb[eb].tagName, hb = cb[eb].childNodes[0].nodeValue, hb = hb.replace(/\s/g, "");
                            fb[gb] = hb, adProTrkEvent = cb[eb].getAttribute("event"), adProTrkId = cb[eb].getAttribute("id"), adProTrkOffset = cb[eb].getAttribute("offset"), fb.event = adProTrkEvent, fb.id = adProTrkId, fb.isTrack = !1, fb.offset = null != adProTrkOffset ? e(adProTrkOffset) : adProTrkOffset, db.push(fb)
                        }
                        i.Tracking = db
                    }
                }
                for (var ib = j[k].getElementsByTagName("Extensions")[0], jb = ib.getElementsByTagName("Extension"), kb = 0; kb < jb.length; kb++)
                    for (var lb = jb[kb].getElementsByTagName("AdParams")[0], mb = (lb.getAttribute("adStyle"), lb.getAttribute("sequence"), lb.getElementsByTagName("CallbackFun")), nb = 0; nb < mb.length; nb++)
                        ;
                h[l] = i
            }
            d.push(h)
        }
        for (var ob = [], pb = {}, g = 0; g < d.length; g++) {
            var qb = d[g].InLine.MediaFile[0].MediaFile, rb = d[g].InLine.ClickThrough, sb = d[g].InLine.Duration, Q = d[g].InLine.MediaFile[0].vid;
            null != qb ? (pb.videoUrl = qb, pb.clickUrl = rb, pb.duration = sb, pb.vid = Q, pb = c.cbDataProcess(pb, d[g].InLine), ob.push(pb), pb = {}) : (pb.videoUrl = "error", pb.clickUrl = "error", pb.duration = "error", pb.vid = "error", pb = c.cbDataProcess(pb, d[g].InLine), ob.push(pb), pb = {})
        }
        b(ob);
        var tb = URL.getQueryData(location.search.substring(1));
        (tb.debug || tb.DEBUG) && Console.log("广告数据:" + JSON.stringify(d))
    }, c.getData = function(a, c) {
        "undefined" != typeof d && d instanceof Array && (d = []), b = c;
        var e = document.createElement("script");
        e.setAttribute("type", "text/javascript"), e.src = a, document.body.appendChild(e)
    }, c.trackAd = function(b, e) {
        var f = d[e], g = Math.floor(b);
        if (c.trackempty(e), void 0 != f.InLine.Tracking)
            for (var h = f.InLine.Tracking.length, i = 0; h > i; i++) {
                var j = f.InLine.Tracking[i];
                j.isTrack || g != j.offset || (a(j.Tracking), j.isTrack = !0)
            }
    }, c.trackImp = function() {
        var b = d.length, c = 0;
        for (c = 0; b > c; c++) {
            var e = d[c];
            e.InLine.isImp = !0;
            for (var f = e.InLine.Imp.length, g = 0; f > g; g++) {
                var h, i = e.InLine.Imp[g];
                for (var j in i)
                    h = i[j].Impression;
                a(h)
            }
        }
    }, c.trackempty = function(b) {
        var c = d[b];
        if (!c.InLine.isImp) {
            console.log("fff:" + b);
            for (var e = c.InLine.Imp.length, f = 0; e > f; f++) {
                var g, h = c.InLine.Imp[f];
                for (var i in h)
                    g = h[i].Impression;
                c.InLine.isImp = !0, a(g)
            }
        }
    }, c.trackAdComplete = function(b) {
        var c = d[b];
        if (void 0 != c.InLine.Tracking)
            for (var e = 0; e < c.InLine.Tracking.length; e++)
                "complete" == c.InLine.Tracking[e].event && a(c.InLine.Tracking[e].Tracking)
    }, c.trackClick = function(b) {
        var c = d[b];
        if (void 0 != c.InLine.ClickTracking)
            for (var e = c.InLine.ClickTracking.length, f = 0; e > f; f++) {
                var g = c.InLine.ClickTracking[f], h = g.ClickTracking;
                a(h)
            }
    }, c.getQueryString = function(a) {
        var b = new RegExp("(^|&?)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
        return null !== c ? unescape(c[2]) : null
    }, c.getCookie = function(a) {
        for (var b, c = document.cookie.split(";"), d = 0; d < c.length; d++)
            if (b = c[d].split("="), b[0].trim() == a)
                return unescape(b[1]);
        return ""
    }, c.repOrAddParams = function(a) {
        try {
            if ("" !== a && a.indexOf("mmg.aty.sohu.com") > -1) {
                var b = a.match(/partner=([a-zA-Z0-9\-_\|]*)/i), d = c.getQueryString("src") || c.getQueryString("SRC") || c.getCookie("MTV_SRC") || "-2";
                (null === b || b.length >= 2 && "" === b[1]) && (a = a + "&partner=" + d)
            }
        } catch (e) {
            console.log(e)
        }
        var f = a.match(/urldomain=([a-zA-Z0-9\-_\|]*)/i);
        return (null === f || f.length >= 2 && "" === f[1]) && (a = a + "&urldomain=" + window.location.host), a
    }, c.cbDataProcess = function(a, b) {
        var c = b.Imp[0].monitorServer.Impression, d = URL.getQueryData(c), e = d.p ? d.p.split(",") : [];
        return a.cnt = e.length, a
    }
}(), function(a) {
    "use strict";
    a = a || {};
    var b = $.userAgent;
    a.IosAdvertise = function(a, c) {
        var d = this, e = {param: {player: null,mediaAdPlatform: "none",adClose: "0",debug: !1,debugCurUrl: "",timeout: 2e3,timeoutFlag: !1,getAdInfoFlag: !1,addAdCallback: null,urls: {iosMedia: "http://m.aty.sohu.com/h",iosMediaDebug: "http://60.28.168.195/h"}},model: {cache: null,totDuration: 0,appid: "",curIndex: 0,adDurList: [],mediaAd: {},videoData: null},view: {},ctrl: {}}, f = e.param, g = e.model, h = (e.view, e.ctrl);
        f.init = function(a, b) {
            if ($.isUndefined(a))
                return !1;
            f.player = a, f = $.merge(f, b), null !== URL.getQueryString("adClose") && (f.adClose = URL.getQueryString("adClose")), "0" !== b.adClose && (f.adClose = b.adClose);
            var c = URL.getQueryData(location.search.substring(1));
            return (c.debug || c.DEBUG) && (f.debug = !0), !0
        }, f.reset = function() {
            f.timeoutFlag = !1, f.getAdInfoFlag = !1
        }, g.init = function(a, b) {
            g.cache = $.extend(!0, {}, a.cache), g.videoData = a.videoData, g.appid = b.appid
        }, g.reset = function() {
            g.cache = null, g.videoData = null, g.totDuration = 0, g.curIndex = 0, g.adDurList = [], g.mediaAd = {}
        }, g.getAdParam = function(a) {
            var c = {};
            return c.pt = "oad", c.plat = g.getPlatId(), c.sysver = b.osVersion, c.c = "tv", c.cat = "1", c.vc = g.getVc(a), c.pn = g.getPn(), c.al = a.plid || a.sid || a.aid || "", c.ag = "", c.st = "", c.ar = a.areaId || a.area_id || 6, c.vu = "", c.tuv = Cookie.get("MUV") || Cookie.get("SUV") || "", c.appid = g.appid, c.type = a.site && 2 === a.site || a.cid && "9001" === a.cid ? "my" : "vrs", "0" !== f.adClose && (c.adClose = f.adClose), c.vid = a.vid || "", c.tvid = a.tvid || a.tv_id || "", c.pageUrl = window.location.href, c.du = a.totalDuration || a.duration || a.total_duration || 0, c.partner = URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "-2", c
        }, g.getPlatId = function() {
            return b.isAndroid && b.phone ? "h6" : b.isIphone ? "h3" : b.isIpad ? "h1" : b.isAndroidPad ? "h0" : "unknowm"
        }, g.getVc = function(a) {
            var b = a.cateCode || a.cate_code || a.cid || "";
            return b && b.indexOf(";") > -1 && (b = b.replace(/.*?;/, "")), b
        }, g.getPn = function() {
            var a = g.getPlatId();
            return "h6" === a ? "androidphone" : "h3" === a ? "iphone" : "h16" === a ? "androidpad" : "h1" === a ? "ipad" : "unknowm"
        }, g.repOrAddParams = function(a) {
            try {
                if ("" !== a && a.indexOf("mmg.aty.sohu.com") >= 1) {
                    var b = a.match(/partner=([a-zA-Z0-9\-_\|]*)/i), c = URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "-2";
                    (null === b || b.length >= 2 && "" === b[1]) && (a = a + "&partner=" + c)
                }
            } catch (d) {
                console.log(d)
            }
            var e = a.match(/urldomain=([a-zA-Z0-9\-_\|]*)/i);
            return (null === e || e.length >= 2 && "" === e[1]) && (a = a + "&urldomain=" + window.location.host), a
        }, g.sendPingback = function(a) {
            if ("" !== a) {
                var b = a.split("|");
                $.each(b, function(a, b) {
                    var c = document.createElement("script");
                    b = g.repOrAddParams(b), console.log("上报统计URL", b), c.src = b, $("body").append(c)
                })
            }
        }, g.toString = function(a) {
            var b = [];
            for (var c in a)
                b.push(c + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        }, g.getIosAdInfo = function(a, b) {
            var c;
            f.debug ? (c = f.urls.iosMediaDebug, Console.log("debug -> ios广告请求:" + c + "?" + g.toString(a))) : c = f.urls.iosMedia, $.ajax({url: c,data: a,dataType: "jsonp",success: b})
        }, g.initAdDurList = function(a) {
            var b = [];
            return $.each(a.adDataList, function(a, c) {
                b.push(c.duration)
            }), b
        }, g.isoAdInfoProcess = function(a) {
            var b = {adVidList: [],adDataList: [],totDuration: 0,realTotalCounts: 0,emptyCounts: 0,effCounts: 0};
            if (!$.isUndefined(a) && 1 === a.status) {
                var c = a.data.oad;
                if (c instanceof Array) {
                    var d = 1, e = 1;
                    $.each(c, function(a, c) {
                        var f = {};
                        $.isUndefined(c.vid) || "" === c.vid ? f.effAdPosition = -1 : (b.adVidList.push(c.vid), f.effAdPosition = e, e++), "number" == typeof c.duration && (b.totDuration += c.duration), f.duration = c.duration || 0, f.clickUrl = c.clickurl ? c.clickurl : "", f.pingback = c.pingback || "", f.pingbacks = c.pingbacks || [], f.vid = c.vid || "", f.finishPingback = c.finishedstatistics || "";
                        var g = f.pingback ? URL.getQueryData(f.pingback) : "", h = g.p ? g.p.split(",") : [];
                        f.counts = h.length, 0 === f.duration && (b.emptyCounts += f.counts), b.realTotalCounts += f.counts;
                        for (var i = [], j = 0; j < f.counts; j++)
                            i.push(d + j);
                        d += f.counts, f.adPosition = i.join(","), b.adDataList.push(f)
                    }), b.effCounts = b.realTotalCounts - b.emptyCounts
                }
            }
            return b
        }, g.sendInnerPingback = function(a, b) {
            if ("undefined" != typeof a) {
                var c = {video_catecode: g.videoData.cateCode.split(";")[0] || "",video_plid: g.videoData.sid || g.videoData.plid || "",video_dur: g.cache.totalDuration,partner: URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "-2"};
                "video_ad_response" === a ? (c.ad_status = 1, c.ad_total_num = 0, c.ad_empty_num = 0, c.ad_eff_num = 0, c.ad_total_dur = 0) : "video_ad_play" === a ? (c.ad_is_empty = 0, c.ad_total_num = g.mediaAd.realTotalCounts, c.ad_eff_num = g.mediaAd.effCounts) : "video_ad_close" === a && (c.ad_total_num = g.mediaAd.realTotalCounts, c.ad_eff_num = g.mediaAd.effCounts);
                for (var d in b)
                    c[d] = b[d];
                console.log("发送内部行为统计数据 (" + a + "):", c), ClickTrace.pingback(null, a, c)
            }
        }, h.init = function(a, b) {
            f.init(a, b) && (g.init(a, b), h.eventInit())
        }, h.addAdvertise = function(b) {
            this.isMediaPlayed = !1, f.addAdCallback = b;
            {
                var c = f.player.cache;
                f.player.videoTag
            }
            setTimeout(function() {
                f.getAdInfoFlag || (f.timeoutFlag = !0, console.log("ios广告请求超时，直接播放视频"), g.sendInnerPingback("video_ad_response"), c.curPlayUrl = c.srcList[c.modeType][0].url, a.initVideoTag(), d.isFinishAdvReq = !0, a.adv.isMediaPlayed = !0, $.isFunction(b) && b())
            }, f.timeout), g.sendInnerPingback("video_ad_request"), h.getIosAdInfo(function(e) {
                if (!f.timeoutFlag) {
                    g.mediaAd = e;
                    var h = {ad_status: 0,ad_total_num: e.realTotalCounts,ad_empty_num: e.emptyCounts,ad_eff_num: e.effCounts,ad_total_dur: e.totDuration};
                    g.sendInnerPingback("video_ad_response", h), g.totDuration = e.totDuration;
                    var i = f.player.adv;
                    if (i.mediaAd = e, g.adDurList = g.initAdDurList(i.mediaAd), "0" === f.adClose) {
                        console.log("ios广告获取成功", e);
                        for (var j in c.srcList)
                            $.each(c.srcList[j], function(a, b) {
                                e.adVidList.length > 0 && (b.url += (b.url.indexOf("?") > -1 ? "&" : "?") + "ads=" + e.adVidList.join(","))
                            })
                    } else {
                        a.adv.isMediaPlayed = !0, console.log("ios广告已经获取成功，但是广告被屏蔽", e), g.sendInnerPingback("video_ad_close");
                        var i = f.player.adv;
                        $.each(i.mediaAd.adDataList, function(a, b) {
                            g.sendPingback(b.pingback);
                            var c = {ad_inc_num: b.counts,ad_pos: b.adPosition,ad_eff_pos: b.effAdPosition,ad_dur: b.duration,ad_vid: b.vid};
                            if (0 !== b.duration ? (console.log("ios广告上报 start:" + b.pingback), c.ad_is_empty = 1) : console.log("ios空广告上报 start:" + b.pingback), g.sendInnerPingback("video_ad_play", c), b.pingback = "", 0 !== b.pingbacks.length) {
                                var d = b.pingbacks[0];
                                0 === d.v && (g.sendPingback(d.v), console.log(0 !== b.duration ? "ios广告上报 v:" + d.v + ", curIndex: 0" : "ios空广告上报 v: " + d.v + ", curIndex: 0"))
                            }
                        })
                    }
                    c.curPlayUrl = c.srcList[c.modeType][0].url, a.initVideoTag(), d.isFinishAdvReq = !0, a.play(), $.isFunction(b) && b()
                }
            })
        }, h.updateAdv = function() {
            f.reset(), g.reset(), f.player.adv.mediaAd = null, f.player.adv.isMediaPlayed = !1, g.cache = $.extend(!0, {}, f.player.cache), g.videoData = f.player.videoData, h.addAdvertise(f.addAdCallback)
        }, h.getIosAdInfo = function(c) {
            if (b.isIphone || b.isIpad) {
                var d = g.getAdParam(g.videoData);
                g.getIosAdInfo(d, function(b) {
                    f.debug && f.debugCurUrl !== a.cache.curPlayUrl && (Console.log("广告数据:" + JSON.stringify(b)), f.debugCurUrl = a.cache.curPlayUrl), f.getAdInfoFlag = !0;
                    var d = g.isoAdInfoProcess(b);
                    c(d)
                })
            } else {
                var e = g.isoAdInfoProcess();
                c(e)
            }
        }, h.eventInit = function() {
            var a = h.process;
            f.player.addEvent("timeupdate", a.timeupdate)
        }, h.process = {}, h.process.timeupdate = function() {
            var a = this, b = (f.player.cache, a.currentTime);
            if (f.debug && f.debugCurUrl !== a.cache.curPlayUrl && (Console.log("当前播放视频地址:" + JSON.stringify(a.cache.curPlayUrl)), f.debugCurUrl = a.cache.curPlayUrl), 0 !== b) {
                var c = a.adv, d = c.mediaAd.adDataList, e = c.mediaAd.adVidList;
                if (!a.adv.isMediaPlayed && null !== f.player.adv.mediaAd)
                    if ("0" !== f.adClose)
                        a.adv.isMediaPlayed = !0, $.each(d, function(a, b) {
                            b.pingback += b.pingback.indexOf("?") > -1 ? "&" : "?", b.pingback += "adClose=" + f.adClose, g.sendPingback(b.pingback), console.log("ios广告上报 start:" + b.pingback);
                            var c = {ad_is_empty: 1,ad_inc_num: b.counts,ad_pos: b.adPosition,ad_eff_pos: b.effAdPosition,ad_dur: b.duration,ad_vid: b.vid};
                            g.sendInnerPingback("video_ad_play", c), b.pingback = ""
                        });
                    else {
                        if (b > 0 && Math.abs(b - this._lastCurTime) > 2 && (this._startPlayTime = $.now()), b - a._lastCurTime > 2)
                            return void a.seekTo(a._lastCurTime);
                        var h = 0, i = 0;
                        $.each(g.adDurList, function(c, d) {
                            return 0 === h && 0 === c && (h = d, i = d), b = parseInt(b, 10), b >= h && 0 !== c && (h += d, i = d, h >= b && (g.curIndex = c), c === g.adDurList.length - 1 && b >= h) ? (g.curIndex = c, a.$video.attr("data-adover", "true"), !1) : void 0
                        }), e.length !== d.length && $.each(d, function(a, b) {
                            if (!(a <= g.curIndex))
                                return !1;
                            if (0 === b.duration && "" !== b.pingback) {
                                if (g.sendPingback(b.pingback), console.log("ios空广告上报 start:" + b.pingback), "" !== b.pingback) {
                                    var c = {ad_inc_num: b.counts,ad_pos: b.adPosition,ad_eff_pos: b.effAdPosition,ad_dur: b.duration,ad_vid: b.vid};
                                    g.sendInnerPingback("video_ad_play", c)
                                }
                                b.pingback = "", $.each(b.pingbacks, function(a, c) {
                                    0 === c.t && (g.sendPingback(c.v), 0 === j.pingbacks.length, console.log("ios空广告上报 v: " + b.v + ", curIndex: " + a))
                                })
                            }
                        }), b > g.totDuration && g.curIndex === d.length - 1 && (a.adv.isMediaPlayed = !0), a._lastCurTime = b;
                        var j = c.mediaAd.adDataList[g.curIndex], k = parseInt(b, 10);
                        if (k -= h - i, 0 === k && "" !== j.pingback) {
                            if (g.sendPingback(j.pingback), console.log("ios广告上报 start:" + j.pingback), "" !== j.pingback) {
                                console.log("发送内部行为统计数据: video_ad_play");
                                var l = {ad_is_empty: 1,ad_inc_num: j.counts,ad_pos: j.adPosition,ad_eff_pos: j.effAdPosition,ad_dur: j.duration,ad_vid: j.vid};
                                g.sendInnerPingback("video_ad_play", l)
                            }
                            j.pingback = ""
                        }
                        $.each(j.pingbacks, function(a, b) {
                            k === b.t && (g.sendPingback(b.v), j.pingbacks.splice(a, 1), console.log("ios广告上报 v: " + b.v + ", curIndex: " + a))
                        }), k >= j.duration - 1 && "" !== j.finishPingback && (g.sendPingback(j.finishPingback), j.finishPingback = "", console.log("ios end广告上报: endIndex: " + g.curIndex))
                    }
            }
        }, h.init(a, c), this.mediaAdPlatform = c.mediaAdPlatform, this.isMediaPlayed = !1, this.isFinishAdvReq = !1, this.addAdvertise = h.addAdvertise, this.updateAdv = h.updateAdv
    }
}(svp), function(a) {
    "use strict";
    a = a || {};
    var b = $.userAgent, c = $.now();
    a.AndoridAdvertise = function(d, e) {
        var f = this, g = {param: {player: null,pauseAdConClass: "svp_ad_pause_" + c,pauseAdCloseBtnClass: "svp_ad_pause_close_" + c,mediaTimerConClass: "svp_poster_ad_time_" + c,mediaTimerClass: "svp_poster_ad_timer_" + c,adDetailBtnClass: "svp_ad_detail_" + c,isPauseAd: !1,mediaAdPlatform: "none",addAdCallback: null,adClose: "0",debug: !1,timeout: 2e3,timeoutFlag: !1,isGetFlag: !1,isValidFlag: !1,isFirstLoad: !0,ps: "",debugCurUrl: "",urls: {adrMedia: "http://m.aty.sohu.com/h",adrMediaDebug: "http://60.28.168.195/h",advIframe: "http://m.tv.sohu.com/upload/touch/public/showInIframe_new.html"}},model: {oldAdIndex: 0,curAdIndex: -1,sendRepAdIndex: -1,cache: null,appid: "",mediaAd: {},effMediaData: [],mptIndex: [],videoData: null},view: {},ctrl: {}}, h = g.param, i = g.model, j = g.view, k = g.ctrl, f = this;
        h.init = function(a, b) {
            if ($.isUndefined(a))
                return !1;
            h.player = a, h = $.merge(h, b), null !== URL.getQueryString("adClose") && (h.adClose = URL.getQueryString("adClose")), null !== URL.getQueryString("ps") && (h.ps = URL.getQueryString("ps")), "0" !== b.adClose && (h.adClose = b.adClose);
            var c = URL.getQueryData(location.search.substring(1));
            return (c.debug || c.DEBUG) && (h.debug = !0), !0
        }, h.reset = function() {
            h.timeoutFlag = !1, h.isGetFlag = !1, h.isValidFlag = !1
        }, i.init = function(a, b) {
            i.cache = $.extend(!0, {}, a.cache), i.videoData = a.videoData, i.appid = b.appid
        }, i.reset = function() {
            i.oldAdIndex = 0, i.curAdIndex = -1, i.cache = null, i.mediaAd = {}, i.effMediaData = [], i.mptIndex = []
        }, i.getQueryAdVideoURL = function(a, b) {
            var c = a.cateCode || a.cate_code || "", d = ["vid=" + a.vid, "&uid=" + Cookie.get("SUV") || "", "&plat=17", "&pt=" + Util.getUserPt(), "&prod=h5", "&pg=1&eye=0", "&cateCode=" + c.split(";")[0] || "", "&advEFId=" + a.advEFId].join("");
            return $.isUndefined(b) || (b += (b.match(/\?/) ? "&" : "?") + d), b
        }, i.getPlatId = function() {
            return b.isAndroid && b.phone ? "h6" : b.isIphone ? "h3" : b.isIpad ? "h1" : b.isAndroidPad ? "h0" : "unknowm"
        }, i.getAdParam = function(a) {
            var c = {};
            return c.pt = "oad", c.plat = i.getPlatId(), c.sver = "", c.sysver = b.osVersion, c.c = "tv", c.vc = i.getVc(a), c.pn = i.getPn(), c.al = a.plid || a.sid || a.aid || "", c.du = a.totalDuration || a.duration || a.total_duration || 0, c.vid = a.vid || "", c.tvid = a.tvid || "", c.tuv = Cookie.get("MUV") || Cookie.get("SUV") || "", c.vu = "", c.prot = "vast", c.cat = "1", c.ar = a.areaId || a.area_id || 6, c.callback = "getAdsCallback", c.json = "std", "0" !== h.adClose && (c.adClose = h.adClose), c.appid = i.appid, c.pageUrl = window.location.href, c.type = a.site && 2 === a.site || a.cid && "9001" === a.cid ? "my" : "vrs", c.ag = "", c.st = "", c.partner = URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "-2", c
        }, i.getVc = function(a) {
            var b = a.cateCode || a.cate_code || a.cid || "";
            return b && b.indexOf(";") > -1 && (b = b.replace(/.*?;/, "")), b
        }, i.getPn = function() {
            var a = i.getPlatId();
            return "h6" === a ? "androidphone" : "h3" === a ? "iphone" : "h16" === a ? "androidpad" : "h1" === a ? "ipad" : "unknowm"
        }, i.getPauseAdInfo = function(a, b) {
            b({imgUrl: "http://t12.baidu.com/it/u=3602855978,1840777505&fm=56"})
        }, i.pauseAdInfoProcess = function(a) {
            return a
        }, i.sendInnerPingback = function(a, b) {
            if ("undefined" != typeof a) {
                var c = {video_catecode: i.videoData.cateCode.split(";")[0] || "",video_plid: i.videoData.sid || i.videoData.plid || "",video_dur: i.cache.duration,partner: URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "-2"};
                "video_ad_response" === a ? (c.ad_status = 1, c.ad_total_num = 0, c.ad_empty_num = 0, c.ad_eff_num = 0, c.ad_total_dur = 0) : "video_ad_play" === a ? (c.ad_is_empty = 0, c.ad_total_num = i.mediaAd.realTotalCounts, c.ad_eff_num = i.mediaAd.effCounts) : "video_ad_close" === a && (c.ad_total_num = i.mediaAd.realTotalCounts, c.ad_eff_num = i.mediaAd.effCounts);
                for (var d in b)
                    c[d] = b[d];
                console.log("发送内部行为统计数据 (" + a + "):", c), ClickTrace.pingback(null, a, c)
            }
        }, i.getAndroidAdInfo = function(a, b) {
            var c;
            h.debug ? (c = h.urls.adrMediaDebug + "?" + i.toString(a), Console.log("debug -> android广告请求:" + c)) : c = h.urls.adrMedia + "?" + i.toString(a), setTimeout(function() {
                h.isGetFlag || (console.log("android广告请求超时，直接播放视频"), i.sendInnerPingback("video_ad_response"), h.timeoutFlag = !0, d.adv.mediaAd = i.androidAdInfoProcess(), k.process.ended())
            }, h.timeout), vast.getData(c, function(a) {
                a = i.androidAdInfoProcess(a), b(a)
            })
        }, i.androidAdInfoProcess = function(a) {
            var b = {totalDuration: 0,urls: {mp4: {nor: []},downloadUrl: []},durations: {nor: []},adDataList: [],adVidList: [],realTotalCounts: 0,emptyCounts: 0,effCounts: 0};
            if (!$.isUndefined(a) && a instanceof Array) {
                var c = 1, d = 1;
                $.each(a, function(a, e) {
                    if (!$.isUndefined(e.videoUrl)) {
                        var f = {};
                        f.duration = e.duration, f.clickUrl = e.clickUrl, f.vid = e.vid || "", f.cateCode = i.videoData.cateCode, f.advEFId = "adv_id_" + a, f.counts = parseInt(e.cnt) || 1, "error" !== e.videoUrl ? (f.src = i.getQueryAdVideoURL(f, e.videoUrl), f.effAdPosition = d, d++) : (f.src = e.videoUrl, f.effAdPosition = -1, b.emptyCounts += f.counts), $.isUndefined(e.vid) || "" === e.vid || b.adVidList.push(e.vid);
                        for (var g = [], h = 0; h < f.counts; h++)
                            g.push(c + h);
                        c += f.counts, f.adPosition = g.join(","), b.adDataList.push(f), b.urls.mp4.nor.push(f.src), b.durations.nor.push(f.duration), b.realTotalCounts += f.counts, "number" == typeof f.duration && (b.totalDuration += f.duration)
                    }
                }), b.effCounts = b.realTotalCounts - b.emptyCounts
            }
            return b
        }, i.toString = function(a) {
            var b = [];
            for (var c in a)
                b.push(c + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        }, i.getEffectiveMediaData = function(a) {
            var b, c = $.extend(!0, {}, a);
            for (b = c.adVidList.length - 1; b >= 0; b--)
                "error" === c.adVidList[b] && c.adVidList.splice(b, 1);
            for (b = c.adDataList.length - 1; b >= 0; b--) {
                var d = c.adDataList[b];
                "error" === d.duration && "error" === d.src && c.adDataList.splice(b, 1)
            }
            for (b = c.urls.mp4.nor.length - 1; b >= 0; b--)
                c.urls.mp4.nor[b].indexOf("error") > -1 && c.urls.mp4.nor.splice(b, 1);
            for (b = c.durations.nor.length - 1; b >= 0; b--)
                (c.durations.nor[b] + "").indexOf("error") > -1 && c.durations.nor.splice(b, 1);
            return c
        }, j.pauseAd = function(a) {
            var b = [];
            return b.push('<div class="ad_pause ' + h.pauseAdConClass + '" style="display: none;">'), b.push('<img src="' + a.imgUrl + '">'), b.push('<em class="' + h.pauseAdCloseBtnClass + '"></em>'), b.push("</div>"), b.join("")
        }, j.mediaTimer = function() {
            var a = [];
            return a.push('<span class="ad_time ' + h.mediaTimerConClass + '" style="display: none;">'), a.push('<span class="ad_time_timer ' + h.mediaTimerClass + '"></span>'), a.push('<span class="ad_remove" position="appdownload_adRemove">免费去广告</span>'), a.push("</span>"), a.join("")
        }, j.mediaAdvDetail = function() {
            var a = [];
            return a.push('<div class="gg_area ' + h.adDetailBtnClass + '">'), a.push('<div class="ad_detail">'), a.push("详情"), a.push("</div></div>"), a.join("")
        }, k.init = function(a, b) {
            h.init(a, b) && i.init(a, b)
        }, k.platformAdaptation = function() {
            return h.mediaAdPlatform.indexOf("android") > -1 && b.isAndroid ? !0 : h.mediaAdPlatform.indexOf("ios") > -1 && (b.isIphone || b.isIpad) ? !0 : !1
        }, k.getPauseAdView = function(a) {
            if (h.isPauseAd) {
                var b = {};
                i.getPauseAdInfo(b, function(b) {
                    a(j.pauseAd(b))
                })
            } else
                a("")
        }, k.getMediaAdView = function(a) {
            if (b.isAndroid) {
                var c = "";
                c += j.mediaTimer(), "1" !== h.ps && (c += j.mediaAdvDetail()), a(c)
            } else
                a("")
        }, k.showParamAd = function() {
            h.isPauseAd && $("." + h.pauseAdConClass).show()
        }, k.hideParamAd = function() {
            h.isPauseAd && $("." + h.pauseAdConClass).hide()
        }, k.getAndroidAdInfo = function(a) {
            var b = i.getAdParam(i.videoData);
            i.sendInnerPingback("video_ad_request"), i.getAndroidAdInfo(b, function(b) {
                if (!h.timeoutFlag) {
                    var c = {ad_status: 0,ad_total_num: b.realTotalCounts,ad_empty_num: b.emptyCounts,ad_eff_num: b.effCounts,ad_total_dur: b.totalDuration};
                    i.sendInnerPingback("video_ad_response", c), h.isGetFlag = !0, 0 !== b.totalDuration && (h.isValidFlag = !0), a(b)
                }
            })
        }, k.showMediaTimer = function() {
            $("." + h.mediaTimerConClass).css("display", "block")
        }, k.hideMediaView = function() {
            $("." + h.mediaTimerConClass).hide(), $("." + h.adDetailBtnClass).hide(), $(".ad_remove").hide()
        }, k.updateMediaTimer = function(a) {
            $("." + h.mediaTimerClass).html(a)
        }, k.addAdView = function(a) {
            h.isPauseAd && k.getPauseAdView(function(b) {
                a.$main.append(b)
            }), h.mediaAdPlatform.indexOf("android") > -1 && k.getMediaAdView(function(b) {
                a.$main.append(b)
            })
        }, k.addAdvertise = function(b) {
            var c = h.player;
            h.addAdCallback = b, k.getAndroidAdInfo(function(b) {
                if (c.adv.mediaAd = b, i.mediaAd = b, "0" === h.adClose) {
                    if (b.adDataList.length > 0 && console.log("android广告获取成功", b), c.duration = b.totalDuration, h.isFirstLoad && (k.eventInit(), h.isFirstLoad = !1), 0 === b.adDataList.length)
                        return console.log("没有获取到android广告贴片内容"), void k.process.ended();
                    if (f.isFinishAdvReq = !0, i.effMediaData = i.getEffectiveMediaData(i.mediaAd), i.effMediaData.adDataList.length > 0) {
                        var d = c.settings;
                        d.isMediaAdContent = !0, d.modeType = "nor", i.effMediaData.srcType = "mp4", c.cache = new a.VideoInfo(d, i.effMediaData), c.initVideoTag();
                        var e = function() {
                            k.addAdView(c), k.updateMediaTimer(c.duration), k.showMediaTimer()
                        };
                        c.$main && c.$main.length > 0 ? e() : c.on("loaded", function() {
                            e()
                        }), "1" === Action.startapp && c.play()
                    } else
                        i.curAdIndex = i.mediaAd.adDataList.length - 1, $.each(i.mediaAd.adDataList, function(a, b) {
                            console.log("发送android空广告上报 cIndex:" + a), vast.trackempty(a);
                            var c = {ad_inc_num: b.counts,ad_pos: b.adPosition,ad_eff_pos: b.effAdPosition,ad_dur: b.duration,ad_vid: b.vid};
                            i.sendInnerPingback("video_ad_play", c)
                        }), k.process.ended()
                } else
                    console.log("android广告已经获取成功，但是广告被屏蔽"), i.sendInnerPingback("video_ad_close"), k.process.ended()
            })
        }, k.emptyAdCheckAndReport = function(a) {
            var b = a.cache.curPlayUrl;
            $.each(i.mediaAd.adDataList, function(a, c) {
                if (a <= i.curAdIndex && "error" === c.duration && "error" === c.src && !c.reportFlag) {
                    console.log("发送android空广告上报 cIndex:" + a), i.mptIndex.push(a), vast.trackempty(a);
                    var d = {ad_inc_num: c.counts,ad_pos: c.adPosition,ad_eff_pos: c.effAdPosition,ad_dur: c.duration,ad_vid: c.vid};
                    i.sendInnerPingback("video_ad_play", d), c.reportFlag = !0
                }
                return b === c.src && a > i.oldAdIndex ? (i.curAdIndex = a, !1) : void 0
            })
        }, k.getCurAdIndex = function() {
            var a = 0, b = d.getSrc() || "";
            return $.each(i.mediaAd.adDataList, function(c, d) {
                return "error" !== d.src && b.indexOf(d.src.split("?")[1]) > -1 ? (a = c, !1) : void 0
            }), a
        }, k.updateAdv = function() {
            h.reset(), i.reset(), h.player.adv.isMediaPlayed = !1, i.cache = $.extend(!0, {}, h.player.cache), i.videoData = h.player.videoData, k.addAdvertise(h.addAdCallback)
        }, k.eventInit = function() {
            var a = k.process, b = h.player;
            b.$midPlay.on(END_EVENT, function() {
                a.play(this)
            }), b.$main.on(END_EVENT, ".ad_remove", function() {
                return a.adRemove(this), !1
            }), b.$main.on(END_EVENT, "." + h.adDetailBtnClass, function() {
                a.adDetail()
            }), b.addEvent("timeupdate", a.timeupdate), b.addEvent("pause", a.pause), b.on("ended", a.ended), h.isPauseAd && b.addEvent("playing", a.playing), b.on("error", function() {
                a.error(b)
            })
        }, k.process = {}, k.process.error = function(a) {
            try {
                console.log("广告视频报错,无法播放: ", a.videoTag.error), console.log("readyState:", a.videoTag.readyState), console.log("networkState:", a.videoTag.networkState)
            } catch (b) {
            }
            a.adv && !a.adv.isMediaPlayed && k.process.ended("error")
        }, k.process.adRemove = function(a) {
            if (ClickTrace.pingback($(a)), h.player.pause(), "1" === Action.startapp) {
                var b = Action.parserAttributes();
                b.action = "1.1", b.type = "click", Action.sendAction(b)
            }
            Action.popTips({title: "零广告看视频，请先安装搜狐视频APP"})
        }, k.process.adDetail = function() {
            if (i.mediaAd.adDataList) {
                var a = i.curAdIndex, b = h.urls.advIframe + "?url=" + encodeURIComponent(i.mediaAd.adDataList[a].clickUrl);
                console.log("android click广告上报: clickIndex: " + a), vast.trackClick(a), ClickTrace.pingback(null, "ad_detail_click"), h.player.pause(), setTimeout(function() {
                    window.open(b)
                }, 50)
            }
        }, k.process.timeupdate = function() {
            var a = h.player;
            if (h.debug && h.debugCurUrl !== a.cache.curPlayUrl && (Console.log("当前播放视频地址:" + JSON.stringify(a.cache.curPlayUrl)), h.debugCurUrl = a.cache.curPlayUrl), !a.adv.isMediaPlayed) {
                var c = a.adv, d = a.videoTag.currentTime;
                if (0 === d)
                    return;
                var e = a.currentTime;
                if (e > 0 && Math.abs(e - a._lastCurTime) > 2 && (a._startPlayTime = $.now()), b.isUCBrowser || b.isQQBrowser)
                    if (c.isMediaPlayed)
                        a._lastCurTime = e;
                    else {
                        if (e - a._lastCurTime > 1)
                            return void a.seekTo(a._lastCurTime);
                        a._lastCurTime = e
                    }
                if (-1 === i.curAdIndex && (i.curAdIndex = k.getCurAdIndex()), a.$posterCon.addClass("hidden"), a.$mid.oriHide(), a.hideMainCtrl(), k.emptyAdCheckAndReport(a), i.oldAdIndex !== i.curAdIndex)
                    return -1 === $(i.mptIndex).indexOf(i.oldAdIndex) && (console.log("android end广告上报: endIndex: " + i.oldAdIndex), vast.trackAdComplete(i.oldAdIndex)), void (i.oldAdIndex = i.curAdIndex);
                if (vast.trackAd(d, i.curAdIndex), i.sendRepAdIndex !== i.curAdIndex) {
                    var f = i.mediaAd.adDataList[i.curAdIndex], g = {ad_is_empty: 1,ad_inc_num: f.counts,ad_pos: f.adPosition,ad_eff_pos: f.effAdPosition,ad_dur: f.duration,ad_vid: f.vid};
                    i.sendInnerPingback("video_ad_play", g), i.sendRepAdIndex = i.curAdIndex
                }
                k.updateMediaTimer(a.duration - parseInt(a.currentTime, 10));
                var j = a.videoTag.duration, l = a.videoTag.currentTime;
                /SAMSUNG SM-N90/i.test(b.desc) && parseInt(j, 10) >= parseInt(l, 10) - 1 && a.cache.curIndex === a.cache.totCounts && k.process.ended()
            }
        }, k.process.ended = function(a) {
            var c = h.player;
            if (c.adv && !c.adv.isMediaPlayed) {
                f.isFinishAdvReq = !0;
                var d = function() {
                    c.$maskLayer.oriHide(), k.hideMediaView()
                };
                c.$video.attr("data-adover", "true"), "undefined" == typeof a && "error" !== a && "0" === h.adClose && h.isGetFlag && h.isValidFlag && (console.log("android end广告上报: endIndex: " + i.curAdIndex), vast.trackAdComplete(i.curAdIndex)), c.$maskLayer && c.$maskLayer.length > 0 ? d() : c.on("loaded", function() {
                    d()
                }), c.cache = i.cache, c.initVideoTag(), c.adv.isMediaPlayed = !0, c.cache.isMediaAdContent = !1;
                var e = c.adv.mediaAd.adDataList;
                if ("undefined" == typeof a && "error" !== a && i.curAdIndex < e.length - 1)
                    for (var g = i.curAdIndex + 1; g < e.length; g++) {
                        var j = "发送android" + ("0" !== h.adClose ? "" : "空") + "广告上报 cIndex:";
                        console.log(j + g), vast.trackempty(g);
                        var l = {ad_inc_num: e[g].counts,ad_pos: e[g].adPosition,ad_eff_pos: e[g].effAdPosition,ad_dur: e[g].duration,ad_vid: e[g].vid};
                        i.sendInnerPingback("video_ad_play", l)
                    }
                b.isIphone && IsWeixin || c.showMainCtrl(), b.isQQBrowser ? setTimeout(function() {
                    c.play()
                }, 50) : c.play(), $.isFunction(h.addAdCallback) && h.addAdCallback()
            }
        }, k.process.pause = function() {
            d.adv.isMediaPlayed || (d.$mid.oriShow(), d.$midPlay.oriShow(), d.$maskLayer.oriHide(), h.isPauseAd && k.showParamAd())
        }, k.process.play = function(a) {
            a.adv && !a.adv.isMediaPlayed && (a.$mid.oriHide(), a.play())
        }, k.process.playing = function() {
            k.hideParamAd()
        }, k.init(d, e), this.mediaAdPlatform = e.mediaAdPlatform, this.isMediaPlayed = !1, this.isFinishAdvReq = !1, this.isPauseAd = e.isPauseAd, this.addAdvertise = k.addAdvertise, this.updateAdv = k.updateAdv
    }
}(svp), function(a) {
    "use strict";
    a = a || {};
    var b = {param: {retryCount: 3,urls: {ipLimit: "http://api.tv.sohu.com/mobile_user/device/clientconf.json"}},model: {},view: {},ctrl: {}}, c = b.param, d = b.model, e = (b.view, b.ctrl);
    d.getIpLimitData = function(a, b) {
        $.ajax({url: c.urls.ipLimit,data: a,dataType: "jsonp",success: b})
    }, e.copyRightCheck = function(b, c) {
        var e = {};
        if (e.result = !0, e.msg = "", e.code = 100, $.isUndefined(b))
            c(e);
        else {
            var f = b.fee || b.apiData && b.apiData.fee || 0;
            if (("2" == b.mobileLimit || "1" == b.h5Limit || "0" != f) && (e.result = !1, e.msg = a.TYPE_CODE_MSG.COPYRIGHT[100], c(e)), "2" == b.h5Limit && (e.result = !1, e.msg = a.TYPE_CODE_MSG.COPYRIGHT[101], c(e)), "1" == b.ipLimit) {
                var g = {};
                $.extend(g, a.API_PARAMS, {from: "h5",poid: "1",sysver: $.userAgent.osVersion || "0"}), d.getIpLimitData(g, function(b) {
                    b.data && "1" == b.data.iplimit ? (e.result = !1, e.msg = a.TYPE_CODE_MSG.COPYRIGHT[100]) : (e.result = !0, e.msg = "版权有效"), c(e)
                })
            } else
                c(e)
        }
    }, a.copyright = e.copyRightCheck
}(svp), function(a) {
    "use strict";
    var b = function() {
        this.playerid = "", this.videoTag = null, this.$video = null, this.cache = null, this.videoData = null, this.settings = null, this.currentTime = 0, this.duration = 0, this.eventProcess = {loadstart: [],progress: [],suspend: [],abort: [],error: [],stalled: [],play: [],playing: [],pause: [],loadedmetadata: [],loadeddata: [],waiting: [],canplay: [],canplaythrough: [],seeking: [],seeked: [],timeupdate: [],ratechange: [],durationchange: [],ended: [],volumechange: []}, this.eventList = ["loaded", "loadedvideodata", "loadstart", "progress", "suspend", "abort", "error", "stalled", "play", "playing", "pause", "loadedmetadata", "loadeddata", "waiting", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"]
    };
    b.prototype.getSrc = function() {
        return this.$video.attr("src")
    }, b.prototype.setSrc = function(a) {
        this.$video.attr("src", a)
    }, b.prototype.getPoster = function() {
        return this.$video.attr("poster")
    }, b.prototype.setPoster = function(a) {
        this.$video.attr("poster", a)
    }, b.prototype.getPreLoad = function() {
        return this.$video.attr("preload")
    }, b.prototype.setPreLoad = function(a) {
        this.$video.attr("preload", a)
    }, b.prototype.getControls = function() {
        return this.$video.attr("controls")
    }, b.prototype.setControls = function(a) {
        this.$video.attr("controls", a)
    }, b.prototype.getLoop = function() {
        return this.$video.attr("loop")
    }, b.prototype.setLoop = function(a) {
        this.$video.attr("loop", a)
    }, b.prototype.getMuted = function() {
        return this.$video.attr("muted")
    }, b.prototype.setMuted = function(a) {
        this.$video.attr("muted", a)
    }, b.prototype.getPlaybackRate = function() {
        return this.$video.attr("playbackRate")
    }, b.prototype.setPlaybackRate = function(a) {
        this.$video.attr("playbackRate", a)
    }, b.prototype.getCurrentTime = function() {
        return this.$video.attr("currentTime")
    }, b.prototype.setCurrentTime = function(a) {
        this.$video.attr("currentTime", a)
    }, b.prototype.initOriginalEvent = function() {
    }, b.prototype.addEvent = function() {
    }, b.prototype.removeEvent = function() {
    }, b.prototype.fireEvent = function() {
    }, b.prototype.pause = function() {
    }, b.prototype.play = function() {
    }, b.prototype.on = function() {
    }, b.prototype.off = function() {
    }, b.prototype.trigger = function() {
    }, b.prototype.one = function() {
    }, b.prototype.htmlToElem = function() {
    }, b.prototype.showGetDataError = function() {
    }, b.prototype.showMsg = function() {
    }, b.prototype.showMsgWidthBtn = function() {
    }, b.prototype.getDuration = function() {
    }, b.prototype.seekTo = function() {
    }, b.prototype.playByMode = function() {
    }, b.prototype.updateByVodData = function() {
    }, b.prototype.updateByVideoData = function() {
    }, a.BasePlayer = b
}(svp), function(a) {
    "use strict";
    var b = $.userAgent, c = function() {
        this.eventList = this.eventList.concat(["html5error"]), this.initBaseParam()
    };
    c.prototype = new a.BasePlayer, c.maxId = 0, c.prototype.initVideoTag = function() {
        if (this.$video) {
            this.setSrc(this.cache.curPlayUrl);
            try {
                this.videoTag.pause()
            } catch (a) {
            }
            !$.isUndefined(this.$title) && this.$title.length > 0 && this.$title.html(this.cache.title)
        } else {
            var b = this.createVideoTag(this);
            this.playerid = this.cache.elemId, this.videoTag = b[0], this.$video = $(this.videoTag)
        }
    }, c.prototype.createVideoTag = function(c) {
        var d = [], e = c.cache;
        return d.push("client" === e.srcType ? '<div data-noSupport="noSupport"' : "<video"), d.push(' id="' + e.elemId + '"'), e.autoplay && !IsWeixin && d.push(" autoplay"), e.defControls && d.push(" controls"), d.push(' x-webkit-airplay="isHtml5UseAirPlay"'), IsWeixin && d.push(" webkit-playsinline"), d.push(' data-adover="false"'), e.autoplay || d.push(' preload="none"'), e.mediaAdPlatform && a.isAllowPlayAdv(c) && (e.mediaAdPlatform.indexOf("ios") > -1 && (b.isIphone || b.isIpad) || e.mediaAdPlatform.indexOf("android") > -1 && b.isAndroid) && !/QQBrowser\/4\.2/i.test(b.desc) || d.push(' src="' + e.curPlayUrl + '"'), d.push(' height="' + e.height + '"'), d.push(' width="' + e.width + '"'), b.isIphone && !IsWeixin ? d.push(' style="position:absolute; left:-200%;"') : !e.autoplay && b.isUCBrowser && d.push(' style="display: none;"'), d.push(' volume="' + e.volume + '"'), d.push(">"), $(d.join(""))
    }, c.prototype.initBaseParam = function() {
        this._MaxQstTime = 5e3, this._startTime = 0, this._loadedFlag = !1, this._timeoutFlag = !1, this._getDataFlag = !1, this._nextPreLoadImg = null, this._showErrorFlag = !1, this._startPlayTime = 0, this._bufferCount = 0, this._playCheckFlag = !1, this._playCheckTime = 6e3
    }, c.prototype.reqCheck = function() {
        var a = this;
        this._startTime = $.now(), this._timeoutFlag = !1, this._getDataFlag = !1;
        var b = setInterval(function() {
            $.now() - a._startTime > a._MaxQstTime && (clearInterval(b), a._getDataFlag || (a._timeoutFlag = !0))
        }, 100)
    }, c.prototype.copyrightCheck = function(b, c) {
        var d = this;
        b.isCopyrightCheck ? a.copyright(b.data, function(e) {
            if (e.result)
                c();
            else {
                if (d.trigger("loadedvideodata"), d.cache = new a.VideoInfo(b), d.cache.copyrightRst = {rst: e.result,msg: e.msg}, $.isUndefined(d.$video)) {
                    var f = d.createVideoTag(d);
                    d.playerid = f.id, d.videoTag = f, d.$video = $(d.videoTag)
                }
                d.showMsgWidthBtn(e.msg), c()
            }
        }) : c()
    }, c.prototype.initDoms = function() {
        var b = "#main_player_" + a.BaseHtml5.maxId;
        this.$main = $(b), this.$titleCon = $(b + " .svp_title"), this.$title = $(b + " .svp_title_content"), this.$posterCon = $(b + " .svp_poster"), this.$posterRight = $(b + " .svp_poster_right"), this.$posterAdTime = $(b + " .svp_poster_ad_time"), this.$infoCon = $(b + " .svp_info"), this.$infoTitle = $(b + " .svp_info_title"), this.$infoSummary = $(b + " .svp_info_summary"), this.$mid = $(b + " .svp_mid"), this.$midPlay = $(b + " .svp_mid_play"), this.$midPause = $(b + " .svp_mid_pause"), this.$midLoading = $(b + " .svp_mid_loading"), this.$midModeListCon = $(b + " .svp_mid_mode"), this.$mideCurModeBtn = $(b + " .svp_mid_cur_mode_btn"), this.$midCurMode = $(b + " .svp_mid_cur_mode"), this.$midModeList = $(b + " .svp_mid_mod_list"), this.$ctrlCon = $(b + " .svp_ctrl"), this.$ctrlBar = $(b + " .svp_ctrl_bar"), this.$ctrlPlay = $(b + " .svp_ctrl_play"), this.$ctrlPause = $(b + " .svp_ctrl_pause"), this.$ctrlBuffer = $(b + " .svp_ctrl_buffer"), this.$ctrlPointsCon = $(b + " .svp_ctrl_points"), this.$ctrlCurPlayedBar = $(b + " .svp_ctrl_played_bar"), this.$ctrlDragBar = $(b + " .svp_ctrl_drag_bar"), this.$ctrlTime = $(b + " .svp_ctrl_time"), this.$ctrlCurTime = $(b + " .svp_ctrl_cur_time"), this.$ctrlDuration = $(b + " .svp_ctrl_duration"), this.$ctrlDragAnchor = $(b + " .svp_ctrl_drag_anchor"), this.$ctrlTrackBar = $(b + " .svp_ctrl_track_bar"), this.$ctrlDragTime = $(b + " .svp_ctrl_drag_time"), this.$ctrlScreen = $(b + " .svp_ctrl_screen"), this.$ctrlFullScreen = $(b + " .svp_ctrl_full_screen"), this.$ctrlShrinkScreen = $(b + " .svp_ctrl_shrink_screen"), this.$maskLayer = $(b + " .svp_mask_layer"), this.$pauseAdCon = $(b + " .svp_ad_pause"), this.$pauseAdCloseBtn = $(b + " .svp_ad_pause_close"), this.$downloadBtn = $(b + " .svp_download_btn"), this.$openBtn = $(b + " .svp_open_client_btn"), this.$msg = $(b + " .svp_msg"), this.$msgWidthBtn = $(b + " .svp_msg_width_btn"), this.$timeLimitMsg = $(b + " .svp_time_limit_msg")
    }, c.prototype.initSettings = function(b) {
        var c = $.extend(!0, {}, a.DEFAULT_CONFIG);
        return $.isUndefined(b) || ($.extend(c, b), $.isUndefined(c.elemId) && (c.elemId = "sohu_video_player_" + a.BaseHtml5.maxId++), c.src = "", c.poster = ""), a.isForbidAutoplay() && (c.autoplay = !1), c
    }, c.prototype.onLoadedData = function(a, b) {
        var c = this;
        if (this._timeoutFlag)
            return void b.call(this);
        if (this._getDataFlag)
            a.call(this);
        else
            var d = setInterval(function() {
                c._timeoutFlag ? (clearInterval(d), b.call(c)) : c._getDataFlag && (clearInterval(d), a.call(c))
            }, 100)
    }, c.prototype.liveDataService = function(b, c) {
        var d = this, e = b.data, f = {};
        f.site = e.site, f.liveId = $.isUndefined(e.liveId) ? $.getUrlParam("liveId") || "147" : e.liveId, a.Helper.loadHLSUrlByLiveId(f, function(e) {
            d._getDataFlag = !0, d.settings = d.initSettings(b), d.videoData = e, d.cache = new a.VideoInfo(d.settings, d.videoData), d.trigger("loadedvideodata");
            var f = window.VideoData.channeled;
            window.VideoData = d.videoData, window.VideoData.channeled = f, window.VideoData.video_src = e.video_src, d.initVideoTag(), "function" == typeof c && c()
        })
    }, c.prototype.videoDataService = function(b, c) {
        var d = this, e = {};
        e.vid = b.data.vid, e.site = b.data.site, a.Helper.loadVideoUrlByVid(e, function(a) {
            d.updatePlayerByVideoData(a, c)
        })
    }, c.prototype.updatePlayerByVideoData = function(b, c) {
        if (a.cooperatorProcess(b), this._getDataFlag = !0, this.videoData = b, this.settings.timeLimit > -1 && (this.videoData.totalDuration = this.videoData.total_duration = this.settings.timeLimit), (this.cache && this.cache.copyrightRst.rst || !this.cache) && (this.cache = new a.VideoInfo(this.settings, this.videoData), this.trigger("loadedvideodata")), this.videoData.hike = window.VideoData ? window.VideoData.hike : "0", window.VideoData && window.VideoData.channeled) {
            var d = window.VideoData.channeled;
            window.VideoData = this.videoData, window.VideoData.channeled = d, window.VideoData.video_src = this.cache.curPlayUrl
        }
        this.initVideoTag(), "function" == typeof c && c()
    }, c.prototype.vidListService = function(a, b) {
        $.isUndefined(a.vidCurIndex) && (a.vidCurIndex = 0), a.data.vid = a.data.vidList[a.vidCurIndex], a.vidList = a.data.vidList, this.videoDataService(a, b)
    }, c.prototype.playSourceService = function(b, c) {
        this._getDataFlag = !0, this.settings = this.initSettings(b);
        var d = b.data;
        this.cache = new a.VideoInfo(this.settings), this.trigger("loadedvideodata"), this.cache.title = d.title, this.cache.curPlayUrl = d.src, this.cache.poster = d.poster, this.cache.modeType = "", window.VideoData = window.VideoData || {}, window.VideoData.video_src = d.src, this.initVideoTag(), $.isEmpty(d.src) || this.setSrc(d.src), "function" == typeof c && c()
    }, c.prototype.initParam = function(a, b) {
        var c = this;
        this._nextPreLoadImg = null, this.settings = this.initSettings(a);
        var d = a.dataType;
        $.isUndefined(a.mediaType) || "vod" === a.mediaType ? "video_data" === d ? c.copyrightCheck(a, function() {
            c.reqCheck(), c.videoDataService(a, b)
        }) : "vid_list" === d ? c.copyrightCheck(a, function() {
            c.reqCheck(), c.vidListService(a, b)
        }) : "play_source" === d && c.playSourceService(a, b) : "live_data" === d ? c.liveDataService(a, b) : "play_source" === d && c.playSourceService(a, b)
    }, c.prototype.getDataType = function(a) {
        var b = a.data;
        return b.vidList instanceof Array && b.vidList.length > 0 ? "vid_list" : $.isUndefined(b.vid) ? $.isUndefined(b.src) ? $.isUndefined(b.liveId) ? "unknown" : "live_data" : "play_source" : "video_data"
    }, c.prototype.pause = function() {
        var a = this;
        this.onLoadedData(function() {
            null === a.$video.attr("data-noSupport") && a.videoTag.pause()
        }, this.loadError)
    }, c.prototype.play = function() {
        var b = this;
        if ("client" === a.playType) {
            var c = {};
            return c.videoData = this.settings.data, c.channeled = URLParms.channeled, c.settings = this.settings, a.playInClient(c), void VideoTrace.vv()
        }
        var d = function() {
            if (null === b.$video.attr("data-noSupport"))
                try {
                    if (!this._playCheckFlag) {
                        this._playCheckFlag = !0;
                        var a = 0, c = 200, d = setInterval(function() {
                            a += c;
                            var e = a >= b._playCheckTime;
                            (e || b.currentTime > 1) && (e && (b.videoTag.pause(), b.$video.trigger("pause")), clearInterval(d))
                        }, c)
                    }
                    null !== b.$video.attr("preload") && b.$video.removeAttr("preload"), b.videoTag.play()
                } catch (e) {
                    b.$video.one("canplay", function() {
                        b.videoTag.paused && b.videoTag.play()
                    })
                }
        };
        this.onLoadedData(d, this.loadError)
    }, c.prototype.isSupportSysFullScreen = function() {
        var a = !1, b = this.videoTag;
        return b.requestFullscreen ? a = !0 : b.mozRequestFullScreen ? a = !0 : b.webkitRequestFullscreen ? a = !0 : b.webkitEnterFullscreen ? a = !0 : b.msRequestFullscreen && (a = !0), $(this.videoTag).hasClass("inline_player") && !$.isEmpty(this.cache.fullscreenType) && "1" !== this.cache.fullscreenType && (a = !1), a
    }, c.prototype.apiEnterFullScreen = function(a) {
        a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.webkitEnterFullscreen ? a.webkitEnterFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen()
    }, c.prototype.apiExitFullScreen = function(a) {
        a.exitFullscreen ? a.exitFullscreen() : a.mozCancelFullScreen ? a.mozCancelFullScreen() : a.webkitExitFullscreen ? a.webkitExitFullscreen() : a.webkitCancelFullScreen ? a.webkitCancelFullScreen() : a.msExitFullscreen && a.msExitFullscreen()
    }, c.prototype.enterSysFullScreen = function() {
        var a = this;
        !UA.match(/HS\-U950|HUAWEI_C8812|vivo/i) || IsUC || IsQQBrowser || a.videoTag.play();
        var b = function() {
            a.videoTag.paused && !IsIOS && setTimeout(function() {
                a.videoTag.play()
            }, 0)
        };
        if (this.isSupportSysFullScreen()) {
            var c = a.videoTag;
            document.addEventListener("fullscreenchange", b, !1), document.addEventListener("mozfullscreenchange", b, !1), document.addEventListener("webkitfullscreenchange", b, !1), document.addEventListener("MSFullscreenChange", b, !1), a.apiEnterFullScreen(c)
        }
        setTimeout(function() {
            a.videoTag.play()
        }, 0)
    }, c.prototype.exitSysFullScreen = function() {
        var a = this, b = a.videoTag;
        a.apiExitFullScreen(b)
    }, c.prototype.loadError = function() {
        var b = "main_player_" + a.BaseHtml5.maxId;
        this._showErrorFlag || (this._showErrorFlag = !0, 0 === $("#" + b).length && (this.cache = {}, this.cache.height = this.settings.height, this.cache.width = this.settings.width, $(this._parentDom).html(a.errorTmpl(this.cache)), this.initDoms(), this._loadedFlag = !0), this.showMsg(a.TYPE_CODE_MSG.REQUEST[100]))
    }, c.prototype.htmlToElem = function(b) {
        var c = this;
        if (0 !== $(b).length) {
            var d = function() {
                var d = "main_player_" + a.BaseHtml5.maxId;
                0 === $("#" + d).length ? ($(b).html(a.tmpl(c.cache)), c.settings.defControls && $("#" + d).addClass("def_ctrl"), $("#" + d + " .video").html(c.videoTag)) : $("#" + d).appendTo($(b)), c.initDoms(), c._loadedFlag = !0, c.trigger("loaded")
            };
            this.onLoadedData(d, c.loadError)
        }
    }, c.prototype.on = function(a, c) {
        var d = this, e = function() {
            return a = a.toLowerCase(), "loadedvideodata" === a ? void $("body").on(a, c) : void (!/SAMSUNG SM-N90/i.test(b.desc) || "ended" !== a && "onended" !== a ? d.$video.on(a, function(b) {
                if (d._loadedFlag)
                    if ("ended" === a || "onended" === a) {
                        var e = d.cache;
                        (e.curIndex === e.totCounts || -1 === e.curIndex) && c.call(d, b)
                    } else
                        c.call(d, b)
            }) : d.addEvent("timeupdate", function(a) {
                var b = (d.videoTag.duration, d.videoTag.currentTime, d.cache);
                (b.curIndex === b.totCounts || -1 === b.curIndex) && c.call(d, a)
            }))
        };
        this.onLoadedData(e, d.loadError)
    }, c.prototype.off = function(a, b) {
        return a = a.toLowerCase(), "loadedvideodata" === a ? void $("body").off(a, b) : void this.$video.off(a, b)
    }, c.prototype.trigger = function(a) {
        a = a.toLowerCase(), "loadedvideodata" === a ? $("body").trigger(a) : this.$video.trigger(a)
    }, c.prototype.one = function(a, b) {
        var c = this;
        a = a.toLowerCase(), "loadedvideodata" === a ? $("body").one(a, b) : "ended" === a ? this.$video.on(a, function() {
            c.cache.curIndex === c.cache.totCounts - 1 && c.$video.one(a, function(a) {
                b.call(c, a)
            })
        }) : this.$video.one(a, function(a) {
            b.call(c, a)
        })
    }, c.prototype.onBaseEnded = function() {
        var a = this, b = a.cache, c = b.getNextUrl();
        if (this._startPlayTime = $.now(), this._bufferCount = 0, -1 === b.curIndex && (b.curIndex = 0), "" !== c)
            this.trigger("waiting"), b.curPlayUrl = c, b.curIndex++, this.setSrc(b.curPlayUrl), setTimeout(function() {
                a.videoTag.play()
            }, 100), this.videoData.video_src = c;
        else if (b.loop && !b.isMediaAdContent) {
            this.trigger("waiting");
            var d = b.getFirstUrl();
            this.setSrc(d), this.play(), b.curPlayUrl = d, b.curIndex = -1, this.videoData.video_src = d
        } else
            b.curPlayUrl = c, b.curIndex++;
        this._nextPreLoadImg = null
    }, c.prototype.onBaseTimeupdate = function() {
        var a = this.videoTag.duration, c = this.videoTag.currentTime;
        if (20 >= a - c && null === this._nextPreLoadImg) {
            var d = this.cache, e = d.getNextUrl();
            "" !== e && (this._nextPreLoadImg = new Image, this._nextPreLoadImg.src = e)
        }
        this.currentTime = this.getCurrentTime(), this.duration = this.getDuration(), /SAMSUNG SM-N90/i.test(b.desc) && parseInt(c, 10) >= parseInt(a, 10) - 1 && this.cache.curIndex > -1 && this.fireEvent("ended")
    }, c.prototype.init = function(a, b) {
        var c = this;
        a.dataType = this.getDataType(a), this.initParam(a, function() {
            c.settings.debug && Console.log("启动debug模式"), c.initBaseEvent(), "function" == typeof b && b()
        })
    }, c.prototype.initBaseEvent = function() {
        this.initOriginalEvent(), this.addEvent("ended", this.onBaseEnded), this.addEvent("timeupdate", this.onBaseTimeupdate)
    }, c.prototype.initOriginalEvent = function() {
        var a = this, c = this.eventProcess;
        this.$video && this.$video.length > 0 && $.each(a.eventList, function(d, e) {
            $.isArray(c[e]) && (/SAMSUNG SM-N90/i.test(b.desc) && "ended" !== e || !/SAMSUNG SM-N90/i.test(b.desc)) && a.$video.on(e, function(b) {
                $(a.$video, a.$main).length > 0 && $.each(c[e], function(c, d) {
                    d.process.call(a, b)
                })
            })
        })
    }, c.prototype.addEvent = function(a, b, c) {
        var d = this.eventProcess;
        if (!$.isUndefined(a) && !$.isUndefined(d[a])) {
            var e = {};
            $.isFunction(b) ? (e.name = "_" + a + (new Date).getTime(), e.process = b, d[a].push(e)) : $.isString(b) && $.isFunction(c) && (e.name = b, e.process = c, d[a].push(e))
        }
    }, c.prototype.removeEvent = function(a, b) {
        var c = this.eventProcess;
        $.isUndefined(a) || $.isUndefined(c[a]) || ($.isUndefined(b) ? c[a] = [] : $.isString(b) && $.each(c[a], function(d, e) {
            e.name === b && c[a].splice(d, 1)
        }))
    }, c.prototype.fireEvent = function(a) {
        var b = this.eventProcess, c = this;
        $.isUndefined(a) || $.isUndefined(b[a]) || $.each(b[a], function(a, b) {
            b.process.call(c)
        })
    }, c.prototype.showMsg = function(a) {
        this.$msg && (this.$msg.find(".svp_content").html(a), this.$msg.oriShow(), this.$video && (this.pause(), this.$video.oriHide().remove(), this.$maskLayer.oriShow()))
    }, c.prototype.showMsgWidthBtn = function(a) {
        this.$msgWidthBtn && (this.$msgWidthBtn.find(".svp_content").html(a), this.$msgWidthBtn.oriShow(), this.$video && (this.pause(), this.$video.oriHide().remove(), this.$maskLayer.oriShow()))
    }, c.prototype.showTimeLimitMsg = function(a) {
        this.$timeLimitMsg && (this.$timeLimitMsg.find(".svp_content").html("只提供" + a + "分钟预览"), this.$timeLimitMsg.oriShow(), this.$video && (this.pause(), this.$video.oriHide().remove(), this.$maskLayer.oriShow()))
    }, a.BaseHtml5 = c
}(svp), function(a, b) {
    function c(a) {
        console.log(a)
    }
    var d = document, e = window, f = (e.navigator.userAgent, !!d.all), g = function(c, d) {
        var e, g, h;
        if (f)
            e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), e && (g = parseInt(e.GetVariable("$version").split(" ")[1].split(",")[0], 10));
        else {
            var i = window.navigator.plugins;
            if (i && i.length > 0 && (e = i["Shockwave Flash"]))
                for (var j = e.description.split(" "), k = 0, l = j.length; l > k; k++) {
                    var m = parseInt(j[k], 10);
                    isNaN(m) || (g = m)
                }
        }
        return g && d.vid ? (b.getScript("http://js.tv.itc.cn/base/plugin/swfobject13123101.js", function() {
            if ("9001" == d.cid || "2" == d.site)
                var e = new SWFObject("http://share.vrs.sohu.com/my/v.swf&showRecommend=0&autoplay=true&sogouBtn=0&shareBtn=0&topBarFull=0&topBar=0&topBarNor=0&skinNum=8&topBarFull=0&id=" + d.vid + "&api_key=" + a.API_KEY, "sohuplayer", "100%", "100%", "9,0,115", "#000000");
            else {
                var f = "http://tv.sohu.com/upload/swf/20140429/Main.swf", e = new SWFObject(f, "sohuplayer", "100%", "100%", "9,0,115", "#000000");
                e.addVariable("skinNum", "1"), e.addVariable("pageurl", location.href), e.addVariable("vid", d.vid), e.addVariable("pid", d.pid), e.addVariable("nid", ""), e.addVariable("seekTo", "0"), e.addVariable("jump", "0"), e.addVariable("autoplay", "true"), e.addVariable("showRecommend", "0"), e.addVariable("wmode", "Opaque"), e.addVariable("sid", Cookie.get("SUV") || d.sid), e.addVariable("api_key", a.API_KEY)
            }
            e.addParam("quality", "high"), e.addParam("allowscriptaccess", "always"), e.addParam("allowfullscreen", "true"), e.flashVars = "", h = e.getFlashHtml(), console.log("@@@@!!!!", h);
            var g = b(c.elPlayer);
            g.addClass("flash_player"), b(g, ".video").html(h)
        }), !0) : !1
    }, h = function(b, d) {
        d = d || {}, d.elPlayer = b;
        var e;
        a.Helper.loadVideoUrlByVid(d, function(a) {
            e = g(d, a)
        });
        var f = {};
        f.plid = 6807767, f.vid = 1759102, f.site = 1, f.cid = 2, f.page_size = 10, f.with_trailer = 1, f.vid || (f.page_size = 3), a.Helper.loadSearchRecommend(f, c)
    };
    a.Html5FlashPlayer = h
}(svp, svp.$), function(a, b) {
    "use strict";
    var c = b.userAgent, d = !1, e = function(c) {
        var d = b.extend(!0, {}, a.DEFAULT_CONFIG);
        this.settings = b.extend(d, c), VideoTrace.vv()
    };
    e.prototype = new a.BasePlayer, e.prototype.htmlTo = function(c) {
        var d = this.settings;
        if (b(c).length > 0 && !b.isUndefined(d.data)) {
            var e;
            b.isUndefined(d.data.vidList) ? e = d.data : (e = {}, e.vid = d.data.vidList[0]), new a.Html5FlashPlayer(c, e)
        }
    };
    var f = function(a) {
        var b = this;
        this.initPlayerParam(), this.init(a, function() {
            URL.getQueryData(location.search.substring(1));
            Action.isAutoStartClient || !/m\.tv\.sohu\.com/i.test(window.location.href) && !/10\.2\.12\.72/i.test(window.location.href) || (console.log("统计: vv"), VideoTrace.vv(), b._sendVVFlag = !0), b._timeoutFlag || b.eventPlayerInit()
        }), this.updateATagAddr()
    };
    f.prototype = new a.BaseHtml5, f.prototype.initPlayerParam = function() {
        this._ctrlShowFlag = !0, this._ctrlLockFlag = !1, this._dragFlag = !1, this._dragRangeFlag = !1, this._changeModeFlag = !1, this._mediaAdOverFlag = !1, this._firstWaitingFlag = !0, this._sendVVFlag = !1, this._sendRealVVFlag = !1, this._sendStartFlag = !1, this._sendEndFlag = !1, this._initAdvFlag = !1, this._adUpdateFlag = !1, this._makeHistoryFlag = !1, this._playByHistoryFlag = !1, this._hideMainCtrlTime = null, this._touchStratX = 0, this._touchMoveX = 0, this._moveTime = -1, this._traceHeartInterval = null, this._lastWaitingTime = 0, this._lastCurTime = 0, this._parentDom = null, this._scrollTop = 0, this.cssReset = null, this.midAniCB = function() {
        }
    }, f.prototype.showMainCtrl = function() {
        var a = this;
        if ("block" !== this.$mid.css("display") || this.$ctrlBar.hasClass("hide")) {
            this._ctrlLockFlag && this.stopUIAnimation(), this._ctrlLockFlag = !0;
            var b = function() {
                a._ctrlLockFlag = !1, a._ctrlShowFlag = !0
            };
            this.midAniCB = b, this.$mid.oriShow().animate({opacity: 1}, 500, "", b), this.$ctrlBar.removeClass("hide"), this.$titleCon.removeClass("hide"), IsWeixin || (this.$midModeList.oriHide(), this.$midModeListCon.oriShow().animate({opacity: 1}, 500))
        }
    }, f.prototype.hideMainCtrl = function() {
        var a = this;
        if ("none" !== this.$mid.css("display") || !this.$ctrlBar.hasClass("hide")) {
            this._ctrlLockFlag && this.stopUIAnimation(), this._ctrlLockFlag = !0;
            var b = function() {
                a.$mid.oriHide(), a._ctrlLockFlag = !1, a._ctrlShowFlag = !1
            };
            this.midAniCB = b, this.$mid.animate({opacity: 0}, 500, "", b), this.$ctrlBar.addClass("hide"), this.$titleCon.addClass("hide"), IsWeixin || this.$midModeListCon.animate({opacity: 0}, 500, "", function() {
                a.$midModeListCon.oriHide()
            })
        }
    }, f.prototype.stopUIAnimation = function() {
        if (null === this.cssReset) {
            var a = {Webkit: "webkit",Moz: "",O: "o"}, c = document.createElement("div"), d = "", e = {};
            b.each(a, function(a) {
                return void 0 !== c.style[a + "TransitionProperty"] ? (d = "-" + a.toLowerCase() + "-", !1) : void 0
            }), e[d + "transition-property"] = "", e[d + "transition-duration"] = "", e[d + "transition-delay"] = "", e[d + "transition-timing-function"] = "", e[d + "animation-name"] = "", e[d + "animation-duration"] = "", e[d + "animation-delay"] = "", e[d + "animation-timing-function"] = "", this.cssReset = e
        }
        this.$ctrlBar.css(this.cssReset), this.$titleCon.css(this.cssReset), this.$mid.css(this.cssReset), this.midAniCB()
    }, f.prototype.showPlayBtn = function() {
        this.$mid.oriShow().css({opacity: 1}), this.$midLoading.oriHide(), this.$midPlay.oriShow(), this.$midPause.oriHide(), this.$ctrlPause.oriHide(), this.$ctrlPlay.oriShow()
    }, f.prototype.showPauseBtn = function() {
        this.$midLoading.oriHide(), this.$midPlay.oriHide(), this.$midPause.oriShow(), this.$ctrlPause.oriShow(), this.$ctrlPlay.oriHide()
    }, f.prototype.showLoading = function() {
        this.$midPlay.oriHide(), this.$midLoading.oriShow(), this.$midPause.oriHide()
    }, f.prototype.playOrPause = function(a) {
        var d = this;
        if (this.cache.copyrightRst.rst && (this._initAdvFlag || (this.adInit(), this._initAdvFlag = !0), this.adv && this._adUpdateFlag && (this.adv.updateAdv(this), this._adUpdateFlag = !1), !this._ctrlLockFlag))
            if (clearTimeout(this._hideMainCtrlTime), "pause" === a)
                this.pause(), c.isNewWindowsPhone ? setTimeout(function() {
                    d.showPlayBtn()
                }, 300) : this.showPlayBtn(), this.showMainCtrl();
            else {
                if (this._sendVVFlag || (console.log("统计: vv"), VideoTrace.vv(), this._sendVVFlag = !0), !this._sendRealVVFlag && (/QQBrowser\/5\./i.test(c.desc) || c.isUCBrowser) && c.isIphone && (console.log("统计: reallvv"), VideoTrace.realVV(this._startPlayTime), this._sendRealVVFlag = !0, this.$video.attr("data-adover", "true"), this.cooperatorVideoAttr()), !c.isUCBrowser && !c.isQQBrowser || d.settings.autoplay || this.$video.oriShow(), (/UCBrowser\/9\./i.test(c.desc) || c.isSonyPhone || c.isVivoPhone) && c.isAndroid ? setTimeout(function() {
                    d.play()
                }, 50) : c.isWindowsPhone ? setTimeout(function() {
                    d.play()
                }, 300) : this.play(), this._startPlayTime = b.now(), c.isBaiduBrowser)
                    return void this.showPlayBtn();
                if (c.isIphone && !IsWeixin || c.isOldWindowsPhone || c.isQQBrowser)
                    return;
                if (!c.isMIOne || c.isSAMSUNG)
                    return void this.showLoading();
                this.$ctrlPlay.oriHide(), this.$ctrlPause.oriShow(), this._hideMainCtrlTime = setTimeout(function() {
                    d.hideMainCtrl()
                }, 3e3)
            }
    }, f.prototype.adInit = function() {
        var d = this.settings;
        "play_source" !== d.dataType && a.isAllowPlayAdv(this) && ((c.isIphone || c.isIpad) && d.mediaAdPlatform.indexOf("ios") > -1 ? this.adv = new a.IosAdvertise(this, d) : c.isAndroid && d.mediaAdPlatform.indexOf("android") > -1 && (this.adv = new a.AndoridAdvertise(this, d))), b.isUndefined(this.adv) || this.adv.addAdvertise(), b.isUndefined(this.adv) && this.$video.attr("data-adover", "true"), (this.cache.autoplay || c.isIphone && !IsWeixin || c.isOldWindowsPhone || c.isUCBrowser || c.isQQBrowser || c.isMIOne) && (this._ctrlShowFlag = !0)
    }, f.prototype.onMainClick = function() {
        var a = this;
        (b.isUndefined(this.adv) || this.adv.isMediaPlayed) && (clearTimeout(this._hideMainCtrlTime), this._ctrlLockFlag || (this._ctrlShowFlag ? (this.videoTag.pause && this.play(), this.hideMainCtrl()) : (this.showMainCtrl(), this._hideMainCtrlTime = setTimeout(function() {
            a.hideMainCtrl()
        }, 3e3))))
    }, f.prototype.cooperatorVideoAttr = function(c) {
        var d = this, e = function() {
            var a = d.cache.oriUrls.m3u8, c = "";
            if (0 === a[d.cache.modeType].length) {
                var e = ["nor", "hig", "sup"];
                b.each(e, function(b, d) {
                    return 0 !== a[d].length ? (c = a[d][0], !1) : void 0
                })
            } else
                c = a[d.cache.modeType][0];
            if ("" !== c && d.$video.attr("data-playUrl", c), !b.isUndefined(d.videoData.urls.downloadUrl) && !b.isUndefined(d.videoData.urls.downloadUrl[0])) {
                var f = d.videoData.urls.downloadUrl[0];
                d.$video.attr("data-downloadUrl", f)
            }
        };
        a.isCooperator() && (b.isNumber(c) && c > 0 ? setTimeout(function() {
            e()
        }, 3e3) : e())
    }, f.prototype.onPlaying = function() {
        var a = this;
        return this._sendVVFlag || (console.log("统计: vv"), VideoTrace.vv(), this._sendVVFlag = !0), clearTimeout(this._hideMainCtrlTime), c.isIphone && !IsWeixin || c.isOldWindowsPhone || c.isBaiduBrowser || c.isUCBrowser || c.isQQBrowser ? void this.$midPlay.oriShow() : (!/Android\s4\./i.test(c.desc) || c.isQQBrowser || c.isUCBrowser ? this.showPauseBtn() : this.showLoading(), void (a._dragFlag || (this._hideMainCtrlTime = setTimeout(function() {
            a.hideMainCtrl()
        }, 3e3))))
    }, f.prototype.onPlay = function() {
        var a = this, c = this.adv;
        if (!a._sendStartFlag) {
            if (!b.isUndefined(c) && !c.isMediaPlayed)
                return;
            console.log("统计: 测速start"), VideoTrace.start(), a._sendStartFlag = !0
        }
    }, f.prototype.onLoadStart = function() {
        c.isIphone && !IsWeixin || c.isOldWindowsPhone || c.isBaiduBrowser || c.isAndroid && (c.isQQBrowser || c.isUCBrowser) || c.isMIOne || /Android\/?\s?2\../i.test(c.desc) || "block" !== this.$midPause.css("display") || !this._loadedFlag || this.onWaiting();
        var a = this.adv;
        if ((b.isUndefined(a) || a.isMediaPlayed) && this._sendVVFlag) {
            var d = b.now();
            if (!this._changeModeFlag && !this._dragRangeFlag && !this._firstWaitingFlag && d - this._lastWaitingTime > 1e3) {
                var e = (d - this._startPlayTime) / 1e3;
                e > 3 && (this._bufferCount++, console.log("统计: buffer", this._bufferCount), VideoTrace.buffer(this._bufferCount, this._startPlayTime))
            }
            this._lastWaitingTime = d
        }
    }, f.prototype.onWaiting = function() {
        this.showLoading()
    }, f.prototype.onPlayerPause = function() {
        IsWeixin || (clearTimeout(this._hideMainCtrlTime), this.showPlayBtn())
    }, f.prototype.onAbort = function() {
        !this._changeModeFlag && this._mediaAdOverFlag && (console.log("统计: abort"), VideoTrace.abort())
    }, f.prototype.onPlayerTimeUpdate = function() {
        var a = this.adv, d = this, e = this.currentTime, f = this.duration;
        if (0 !== e && (this.$posterCon.hasClass("hidden") || this.$posterCon.addClass("hidden"), b.isUndefined(a) || a.isMediaPlayed)) {
            if (e > 1) {
                if (!this._sendRealVVFlag) {
                    if (!b.isUndefined(a) && !a.isMediaPlayed)
                        return;
                    console.log("统计: reallvv"), VideoTrace.realVV(this._startPlayTime), this._sendRealVVFlag = !0, this.$video.attr("data-adover", "true"), this.cooperatorVideoAttr()
                }
                this.historyRec()
            }
            /SAMSUNG SM-N90/i.test(c.desc) && 0 === e && this.showMainCtrl(), e > 0 && Math.abs(e - this._lastCurTime) > 2 && (this._startPlayTime = b.now()), (c.isIphone && !IsWeixin || c.isOldWindowsPhone) && this.$midModeList.oriHide(), this._lastCurTime = e, !this._sendEndFlag && e > f - 15 && (console.log("统计: ended"), VideoTrace.ended(e, this._bufferCount), this._sendEndFlag = !0), null === this._traceHeartInterval && (this._traceHeartInterval = setInterval(function() {
                console.log("统计: heart"), VideoTrace.heart(e)
            }, 12e4)), this._changeModeFlag = !1, this._dragRangeFlag = !1, this._firstWaitingFlag = !1, this._mediaAdOverFlag = !0, c.isIphone && !IsWeixin || c.isOldWindowsPhone || /Android\/?\s?2\../i.test(c.desc) || IsWeixin && c.isQQBrowser ? (this.$ctrlBar.removeClass("hide"), this.$titleCon.removeClass("hide"), this.showPlayBtn()) : c.isIphone && IsWeixin || c.isIpad || this.showPauseBtn();
            var g = e / f * 100 + "%";
            if (e >= f && this.cache.timeLimit === f) {
                e = f, g = "100%";
                var h = this.cache.timeLimit, i = (h - h % 60) / 60;
                i = h % 60 === 0 ? i : i + 1, d.showTimeLimitMsg(i)
            }
            e > f && (e = f), this.$ctrlCurTime.html(b.formatSeconds(e)), this.$ctrlDuration.html(b.formatSeconds(f)), this._dragFlag || this.$ctrlCurPlayedBar.css({width: g}), c.isUCBrowser && c.isIphone && parseInt(e, 10) === parseInt(f, 10) && this.onPlayerEnded()
        }
    }, f.prototype.historyRec = function() {
        var c = this;
        if (c.cache.isRemHistory && b.isFunction(a.setHistory) && 0 !== c.currentTime) {
            var d = c.videoData, e = c.cache, f = {vid: d.vid,site: d.site}, g = a.getHistory(f), h = null;
            if (c._playByHistoryFlag || e.isMediaAdContent || (g.length > 0 && (h = g[0], c.seekTo(h.playTime)), c._playByHistoryFlag = !0), !c._makeHistoryFlag) {
                var i = {sid: d.sid,vid: d.vid,site: d.site,cid: d.cid,playTime: c.currentTime,duration: d.totalDuration,title: d.tvname || ""};
                if (e.isMediaAdContent) {
                    if (null !== h && 0 !== h.flag)
                        return;
                    i.flag = "0", i.playTime = 1
                }
                a.setHistory(i), c._makeHistoryFlag = !0, setTimeout(function() {
                    c._makeHistoryFlag = !1
                }, 1e3)
            }
        }
    }, f.prototype.onUpdateBuffered = function() {
        var a = this, c = a.videoTag.buffered, d = a.duration, e = 0, f = 0, g = function(b, c) {
            a.$ctrlBuffer.css({width: (c - b) / d * 100 + "%",left: b / d * 100 + "%"})
        }, h = [];
        h = b.isUndefined(a.cache.childDurList) ? a.getChildDurationList() : a.cache.childDurList;
        try {
            e = c.start(0), f = c.end(0)
        } catch (i) {
        }
        h.length > 0 && b.each(h, function(b, c) {
            return b < a.cache.curIndex ? (e += c, void (f += c)) : !1
        }), g(e, f)
    }, f.prototype.fullOrShrink = function(a) {
        if ("fullScreen" === a)
            if ("1" === this.cache.fullscreenType)
                this.enterSysFullScreen();
            else {
                if (c.isIphone && !IsWeixin || c.isOldWindowsPhone || c.isAndroid && c.isQQBrowser && IsWeixin || c.isBaiduBrowser)
                    this.playOrPause("play");
                else {
                    this._scrollTop = b(window).scrollTop(), b("html").addClass("position_fullscreen");
                    var d = b(window).width(), e = b(window).height();
                    this.$main.width(d + "px").height(e + "px"), this.$ctrlFullScreen.oriHide(), this.$ctrlShrinkScreen.oriShow()
                }
                b(".finPic").oriHide()
            }
        else
            b("html").removeClass("position_fullscreen"), this.$main.width("100%").height("100%"), this.$ctrlFullScreen.oriShow(), this.$ctrlShrinkScreen.oriHide(), b(window).scrollTop(this._scrollTop), setTimeout(function() {
                b(".finPic").oriShow()
            }, 500)
    }, f.prototype.showOrHideModeList = function() {
        var a = this;
        clearTimeout(this._hideMainCtrlTime), "none" === a.$midModeList.css("display") ? this.$midModeList.oriShow() : (this.$midModeList.oriHide(), "block" === this.$midPause.css("display") && (!c.isIphone || c.IsWeixin || c.isUCBrowser || c.isQQBrowser) && (this._hideMainCtrlTime = setTimeout(function() {
            a.hideMainCtrl()
        }, 3e3)))
    }, f.prototype.onSelectMode = function(a) {
        this._changeModeFlag = !0;
        var c = a.attr("data-mode"), d = a.html(), e = this.$midCurMode.attr("data-mode"), f = this.$midCurMode.html();
        this.$midCurMode.attr("data-mode", c).html(d), b(a).attr("data-mode", e).html(f), this.$midModeList.oriHide(), this.playByMode(c), ClickTrace.pingback(null, "video_play_code")
    }, f.prototype.onProgressBarStart = function(a) {
        clearTimeout(this._hideMainCtrlTime), this._dragFlag = !0, this._dragRangeFlag = !0, this._touchStratX = a.touches[0].pageX, this.$ctrlDragTime.addClass("dragging")
    }, f.prototype.onProgressBarMove = function(a) {
        var c = this;
        clearTimeout(c._hideMainCtrlTime);
        var d = function(a, d) {
            c._moveTime = a, c.$ctrlDragTime.html(b.formatSeconds(a)), c.$ctrlDragTime.css({left: a / d * 100 + "%",margin: "0 0 0 -" + c.$ctrlDragTime.width() / 2 + "px"}), c.$ctrlCurPlayedBar.width(a / d * 100 + "%")
        };
        c._touchMoveX = a.touches[0].pageX;
        var e = c.$ctrlTrackBar.width(), f = c.duration, g = c.currentTime, h = f / e * (c._touchStratX - c._touchMoveX) * -1, i = g + h;
        0 > i ? d(0, f) : i > f ? d(f, f) : d(i, f)
    }, f.prototype.onProgressBarEnd = function() {
        this._dragFlag = !1, this.$ctrlDragTime.removeClass("dragging"), this.seekTo(this._moveTime), this._startPlayTime = b.now()
    }, f.prototype.onTrackBarClick = function(a, d) {
        clearTimeout(this._hideMainCtrlTimer), c.isFirefoxBrowser && (d.offsetX = d.clientX - a.offset().left);
        var e = (d.clientX ? d.clientX : d.changedTouches[0].pageX) - a.offset().left, f = a.width(), g = this.getDuration() / f * e;
        this._startPlayTime = b.now(), this.seekTo(g)
    }, f.prototype.onCtrlClick = function() {
        clearTimeout(this._hideMainCtrlTimer), c.isIphone || c.isUCBrowser || c.isQQBrowser || (this._hideMainCtrlTimer = setTimeout(this.hideMainCtrl, 3e3))
    }, f.prototype.resize = function() {
        "block" === this.$ctrlShrinkScreen.css("display") && this.$main.css({width: b(window).width(),height: b(window).height()})
    }, f.prototype.onPlayerEnded = function() {
        var a = this;
        clearInterval(this._traceHeartInterval), this._traceHeartInterval = null, this._bufferCount = 0, "vid_list" === this.settings.dataType && this.cache.vidList.length - 1 > this.settings.vidCurIndex && (this.settings.vidCurIndex++, this.initParam(this.settings, function() {
            a.setSrc(a.cache.curPlayUrl), a.$title.html(a.cache.title)
        }))
    }, f.prototype.unload = function() {
        !b.isUndefined(Notification) && b.isFunction(Notification.fire) && Notification.fire("playerOnUnLoad", [this.videoData, this.currentTime])
    }, f.prototype.onLoaded = function() {
        return "client" === this.cache.srcType ? void this.showMsgWidthBtn(a.TYPE_CODE_MSG.SUPPORT[100]) : this.cache.copyrightRst.rst ? (c.isBaiduBrowser || c.isAndroid && c.isQQBrowser && !IsWeixin || c.isUCBrowser && c.isIphone || c.isIphone && /QQBrowser\/5\./i.test(c.desc) ? (this.$ctrlTrackBar.oriHide(), this.$ctrlTime.oriHide()) : c.isAndroid && c.isUCBrowser ? (this.$ctrlTrackBar.oriShow(), this.$ctrlTime.oriShow(), this.$ctrlScreen.oriHide()) : c.isAndroid && c.isQQBrowser && IsWeixin ? (this.$ctrlTrackBar.oriHide(), this.$ctrlTime.oriHide()) : this.$ctrlDuration.html(b.formatSeconds(this.getDuration())), IsWeixin && this.$midModeListCon.oriHide(), this.showPlayBtn(), void this.playerEventService()) : void this.showMsg(this.cache.copyrightRst.msg)
    }, f.prototype.playerEventService = function() {
        var d = this, e = 0, f = setInterval(function() {
            e > 3e3 && clearTimeout(f), "string" == typeof Action.startapp && ("0" !== Action.startapp && setTimeout(function() {
                d.$midPlay.trigger(END_EVENT)
            }, 1e3), clearTimeout(f)), e += 200
        }, 200);
        if (this.$mideCurModeBtn.on(END_EVENT, function() {
            return d.showOrHideModeList(), !1
        }), this.$midModeListCon.find("li").on(END_EVENT, function() {
            return d.onSelectMode(b(this)), !1
        }), this.$midPlay.on(END_EVENT, function() {
            return d.playOrPause("play"), !1
        }), this.$ctrlPlay.on(END_EVENT, function() {
            return d.playOrPause("play"), !1
        }), this.addEvent("loadstart", this.onLoadStart), !c.isUCBrowser && !c.isQQBrowser || d.settings.autoplay || /QQBrowser\/4\.2/i.test(c.desc) || this.$video.oriHide(), this.addEvent("timeupdate", this.onPlayerTimeUpdate), !(c.isAndroid && c.isQQBrowser && !IsWeixin || (this.$ctrlFullScreen.on(END_EVENT, function() {
            return d.fullOrShrink("fullScreen"), !1
        }), c.isBaiduBrowser || (a.isFullScreen() && this.fullOrShrink("fullScreen"), c.isIphone && !IsWeixin || c.isOldWindowsPhone)))) {
            this.$ctrlCon.on(END_EVENT, function() {
                d.onMainClick()
            }), this.$midPause.on(END_EVENT, function() {
                return d.playOrPause("pause"), !1
            }), this.$ctrlPause.on(END_EVENT, function() {
                return d.playOrPause("pause"), !1
            }), this.$ctrlShrinkScreen.on(END_EVENT, function() {
                return d.fullOrShrink("shrinkScreen"), !1
            }), this.$ctrlDragAnchor.on("touchstart", function(a) {
                return d.onProgressBarStart(a), !1
            }), this.$ctrlDragAnchor.on("touchmove", function(a) {
                return d.onProgressBarMove(a), !1
            }), this.$ctrlDragAnchor.on("touchend", function() {
                return d.onProgressBarEnd(), !1
            }), this.$ctrlTrackBar.on(END_EVENT, function(a) {
                return d.onTrackBarClick(b(this), a), !1
            }), this.$ctrlBar.on(END_EVENT, function() {
                return d.onCtrlClick(), !1
            }), this.addEvent("ended", this.onPlayerEnded), IsWeixin && c.isAndroid && c.desc.match(/MI/i) && (this.firstPlayFlag = !0), !/Android\s4\.0.*OPPO/i.test(c.desc) || c.isUCBrowser || c.isQQBrowser || this.$ctrlScreen.oriHide();
            try {
                this.$ctrlDuration.html(b.formatSeconds(this.cache.duration || 0))
            } catch (g) {
            }
        }
    }, f.prototype.eventPlayerInit = function() {
        var a = this;
        this.on("loaded", function() {
            a.onLoaded()
        }), b(window).on("unload", function() {
            a.unload()
        }), this.addEvent("play", this.onPlay), this.addEvent("pause", this.onPlayerPause), this.addEvent("playing", this.onPlaying), this.addEvent("abort", this.onAbort), c.isBaiduBrowser || c.isMIOne || /Android\/?\s?2\../i.test(c.desc) || c.isAndroid && (c.isQQBrowser || c.isUCBrowser) || (IsWeixin || c.isIphone && /MQQBrowser\/5\..* Mobile/i.test(c.desc) || (this.addEvent("waiting", this.onWaiting), !c.isIphone)) && (this.addEvent("progress", this.onUpdateBuffered), this.addEvent("canplay", this.showPlayBtn), window.onorientationchange ? b(window).on("onorientationchange", function() {
            a.resize()
        }) : b(window).on("resize", function() {
            a.resize()
        }))
    }, f.prototype.curMediaSeekTo = function(a) {
        var b = this, c = function() {
            clearTimeout(b._hideMainCtrlTime), b._hideMainCtrlTime = setTimeout(function() {
                b.hideMainCtrl()
            }, 3e3)
        };
        try {
            this.videoTag.currentTime = a, c(), this.videoTag.paused && this.videoTag.play()
        } catch (d) {
            this.$video.one("canplay", function() {
                b.videoTag.currentTime = a, c(), b.videoTag.paused && b.videoTag.play()
            })
        }
    }, f.prototype.seekTo = function(a) {
        var d = this, e = this.androidAdv;
        if (!b.isUndefined(e) && !e.isMediaPlayed && c.isUCBrowser && c.isVivoPhone)
            return void this.curMediaSeekTo(a);
        var f = [];
        if (f = b.isUndefined(this.cache.childDurList) ? this.getChildDurationList() : this.cache.childDurList, /Android\s4\./i.test(c.desc) && !IsWeixin && this.onWaiting(), c.isAndroid && IsWeixin && this.onPlaying(), 1 === f.length)
            this.curMediaSeekTo(a);
        else {
            var g = 0;
            b.each(f, function(b, c) {
                if (g + c > a) {
                    var e = d.cache;
                    if (b !== e.curIndex) {
                        e.curIndex = b;
                        var f = e.srcList[e.modeType][b].url;
                        e.curPlayUrl = f, d.setSrc(f)
                    }
                    return a -= g, setTimeout(function() {
                        d.curMediaSeekTo(a)
                    }, 300), !1
                }
                g += c
            })
        }
    }, f.prototype.getMediaList = function() {
        var a = this.cache;
        return a.srcList[a.modeType] || []
    }, f.prototype.getChildDurationList = function() {
        var a = [], c = this.getMediaList();
        return b.each(c, function(b, c) {
            return -1 === c.duration || 0 === c.duration ? (a = [], !1) : void a.push(c.duration)
        }), a
    }, f.prototype.getCurrentTime = function() {
        var a = [], d = this.androidAdv;
        if (!b.isUndefined(d) && !d.isMediaPlayed && c.isUCBrowser && c.isVivoPhone)
            return this.videoTag.currentTime;
        if (a = b.isUndefined(this.cache.childDurList) ? this.getChildDurationList() : this.cache.childDurList, a.length > 1) {
            var e = this.videoTag.currentTime, f = this.cache.curIndex;
            return b.each(a, function(a, b) {
                return f > a ? void (e += b) : !1
            }), e
        }
        return this.videoTag.currentTime
    }, f.prototype.getDuration = function() {
        var a = [], c = 0, d = this.cache;
        return a = b.isUndefined(d.childDurList) ? this.getChildDurationList() : d.childDurList, c = a.length > 0 ? d.duration : this.videoTag.duration, d.timeLimit > -1 && c > d.timeLimit ? d.timeLimit : c
    }, f.prototype.buffered = function() {
    }, f.prototype.playByMode = function(a) {
        var d = this, e = this.cache;
        (!b.isUndefined(a) && e.modeType !== a || IsWeixin) && b.each(e.modeTypeList, function(b, f) {
            if (f === a) {
                d.pause();
                var g = d.currentTime, h = e.srcList[a][0].url;
                return e.curPlayUrl = h, e.curIndex = 0, e.modeType = a, d.setSrc(h), setTimeout(function() {
                    d.seekTo(g), d.play(), (c.isUCBrowser || c.isQQBrowser) && d.$video.oriShow()
                }, 50), !1
            }
        })
    }, f.prototype.updateDetailInfo = function(c) {
        var d = this;
        if (!IsWeixin) {
            this.$midModeListCon.html(a.updateModeTypeList(c));
            var e = "#" + this.$main.attr("id");
            this.$midModeListCon = b(e + " .svp_mid_mode"), this.$mideCurModeBtn = b(e + " .svp_mid_cur_mode_btn"), this.$midCurMode = b(e + " .svp_mid_cur_mode"), this.$midModeList = b(e + " .svp_mid_mod_list"), 0 === c.modeTypeList.length ? this.$midModeListCon.oriHide() : (this.$midModeListCon.oriShow(), this.$mideCurModeBtn.on(END_EVENT, function() {
                return d.showOrHideModeList(), !1
            }), this.$midModeListCon.find("li").on(END_EVENT, function() {
                return d.onSelectMode(b(this)), !1
            }))
        }
        this.$title.html(this.cache.title), "horizon" === c.posterType ? this.$posterCon.attr("style", "background:url(" + c.poster + "); background-size: 100% 100%;") : this.$posterRight.attr("style", "background:url(" + c.poster + "); background-size: 100% 100%;")
    }, f.prototype.updateUI = function() {
        clearTimeout(this._hideMainCtrlTime), this.updateDetailInfo(this.cache), this.$mid.oriShow().css({opacity: 1}), this.$midLoading.oriHide(), this.$midPlay.oriShow(), this.$midPause.oriHide(), this.$ctrlPause.oriHide(), this.$ctrlPlay.oriShow(), this.$ctrlCurTime.html(b.formatSeconds(0)), this.$ctrlDuration.html(b.formatSeconds(this.duration)), this.$ctrlCurPlayedBar.css({width: 0}), this.$ctrlDragTime.css({left: "0%"}), this.showMainCtrl(), this.showPlayBtn(), this.$posterCon.removeClass("hidden"), c.isIphone && this.$ctrlBar.oriShow()
    }, f.prototype.updateByVodData = function(a, d) {
        var e = this;
        if (!b.isUndefined(a) && !b.isUndefined(a.vid)) {
            this._sendRealVVFlag && !this._sendEndFlag && (/QQBrowser\/5\./i.test(c.desc) || c.isUCBrowser) && c.isIphone && (console.log("统计: ended"), VideoTrace.ended(this.currentTime, this._bufferCount), this._sendEndFlag = !0), b.isUndefined(this.videoData) || (this.settings.data = this.videoData, this.settings.dataType = "video_data", this.settings.isMediaAdContent = !1, a.channeled && "default" !== a.channeled && (this.settings.channeled = a.channeled)), this._sendVVFlag = !1, this._sendRealVVFlag = !1, this._sendStartFlag = !1, this._sendEndFlag = !1, this._playByHistoryFlag = !1;
            var f = a.vid;
            this.settings.data.vid = f, b.isUndefined(a.site) || (this.settings.data.site = a.site), this.pause(), this.showLoading(), this.initParam(this.settings, function() {
                if (e.cache.copyrightRst.rst) {
                    e._adUpdateFlag = !0, e.duration = e.cache.duration, e.updateUI();
                    var f = b.isUndefined(a.autoplay) ? e.cache.autoplay : a.autoplay;
                    f ? (e._sendVVFlag || (console.log("统计: vv"), VideoTrace.vv(), e._sendVVFlag = !0), e.playOrPause("play")) : (c.isUCBrowser || c.isQQBrowser && !/QQBrowser\/4\.2/i.test(c.desc)) && e.$video.oriHide(), b.isFunction(d) && d()
                }
            })
        }
    }, f.prototype.updateByVideoData = function(a, d) {
        var e = this;
        a.videoData && (this._sendRealVVFlag && !this._sendEndFlag && (/QQBrowser\/5\./i.test(c.desc) || c.isUCBrowser) && c.isIphone && (console.log("统计: ended"), VideoTrace.ended(this.currentTime, this._bufferCount), this._sendEndFlag = !0), this._sendVVFlag = !1, this._sendRealVVFlag = !1, this._sendStartFlag = !1, this._sendEndFlag = !1, this._playByHistoryFlag = !1, this.settings.data = a.videoData, this.copyrightCheck(this.settings, function() {
            e.cache.copyrightRst.rst && (e._adUpdateFlag = !0, e.updatePlayerByVideoData(a.videoData, function() {
                e.duration = e.cache.duration, e.updateUI();
                var f = b.isUndefined(a.autoplay) ? e.cache.autoplay : a.autoplay;
                f ? (e._sendVVFlag || (console.log("统计: vv"), VideoTrace.vv(), e._sendVVFlag = !0), e.playOrPause("play")) : (e.$posterCon.removeClass("hidden"), (c.isUCBrowser || c.isQQBrowser && !/QQBrowser\/4\.2/i.test(c.desc)) && e.$video.oriHide()), b.isFunction(d) && d()
            }))
        }))
    }, f.prototype.htmlTo = function(c) {
        var d = this;
        0 !== b(c).length && (this._parentDom = c, this.$playerLoading ? (b(c).html(this.$playerLoading), this.cache.autoplay && this.playOrPause("play")) : (0 === b(".svp_player_bg_loading", b(c)).length && (b(c).html(a.playerLoadingTmpl()), this.$playerLoading = b(".svp_player_bg_loading", b(c))), this.onLoadedData(function() {
            d.htmlToElem(d.$playerLoading), d.cache.autoplay && d.playOrPause("play")
        }, this.loadError)))
    }, f.prototype.updateATagAddr = function() {
        b.isUndefined(window.VideoData) || -1 === b(a.PLID_LIST).indexOf(window.VideoData.plid) || d || (setTimeout(function() {
            b.each(b("a"), function(a, c) {
                c = b(c);
                var d = c.attr("href");
                if (d && -1 === d.indexOf("javascript:void(0);") || "" === d) {
                    var e = d + (d.indexOf("?") > -1 ? "&" : "?") + "startClient=1";
                    c.attr("href", e)
                }
            })
        }, 2e3), d = !0)
    }, a.Html5Player = f, a.FlashPlayer = e
}(svp, svp.$), function(a) {
    "use strict";
    var b = function() {
        var a = $.userAgent;
        return a.isPCIEBrowser && a.version < 10 ? "flash" : "html5"
    };
    a.playerType = b();
    var c = function(a) {
        this.settings = a
    };
    c.prototype.createPlayer = function() {
        var b = this.settings, c = a.playerType, d = b.mediaType;
        return "live" === d ? new a.Html5LivePlayer(b) : "flash" === c ? new a.FlashPlayer(b) : new a.Html5Player(b)
    }, a.SohuPlayer = c
}(svp), function() {
    var a = {param: {},model: {},view: {},controller: {},event: {}}, b = a.controller, c = a.event;
    b.init = function() {
        c.init()
    }, c.init = function() {
        this.addStatistics()
    }, c.addStatistics = function() {
        $(document).on("click", "footer span a", function() {
            var a = $(this);
            return ClickTrace.pingback(a), setTimeout(function() {
                location.href = a.attr("href")
            }, 50), !1
        })
    }, b.init()
}(), $(function() {
    function a(a, b) {
        this.scroller = null, this.nav = document.getElementById(a), this.navBox = document.getElementById(b), this.init()
    }
    var b = function(a) {
        function b(a) {
            try {
                return a.offsetParent ? a.offsetLeft + b(a.offsetParent) : a.offsetLeft
            } catch (c) {
                return 0
            }
        }
        function c(a) {
            try {
                return a.offsetParent ? a.offsetTop + c(a.offsetParent) : a.offsetTop
            } catch (b) {
                return 0
            }
        }
        var d = {x: 0,y: 0};
        if (a.getBoundingClientRect) {
            var e = 0, f = 0;
            try {
                var g = a.getBoundingClientRect(), h = document.documentElement;
                e = g.left + Math.max(h.scrollLeft, document.body.scrollLeft) - h.clientLeft, f = g.top + Math.max(h.scrollTop, document.body.scrollTop) - h.clientTop
            } catch (i) {
            }
            d.x = e, d.y = f
        } else
            d.x = b(a), d.y = c(a);
        return d
    }, c = function(a, b, c) {
        function d(a) {
            var b = a.currentTarget, d = a.relatedTarget;
            e(b, d) || b == d || c.call(a.currentTarget, a)
        }
        function e(a, b) {
            try {
                return a.contains ? a != b && a.contains(b) : !!(16 & a.compareDocumentPosition(b))
            } catch (c) {
            }
        }
        window.addEventListener ? "mouseenter" == b || "mouseleave" == b ? "mouseenter" == b ? a.addEventListener("mouseover", d, !1) : a.addEventListener("mouseout", d, !1) : a.addEventListener(b, c, !1) : window.attachEvent && a.attachEvent("on" + b, c)
    }, d = function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, !1)[b]
    };
    a.prototype = {init: function() {
            this.nav && this.bind()
        },bind: function() {
            var a = this;
            this.initScroller();
            var e = a.navBox, f = this.findCurrent(), g = !0;
            if (f) {
                var h = b(e).x, i = b(f).x, j = e.offsetWidth;
                (i >= h + j || i + f.offsetWidth > h + j) && (g = !1)
            }
            if (!g) {
                var k = f.offsetLeft + f.offsetWidth / 2 - e.offsetWidth / 2;
                this.scroller.scrollTo(-k, 0, 0)
            }
            var l = "onorientationchange" in window ? "orientationchange" : "resize";
            c(window, l, function() {
                if (a.scroller) {
                    var b = function() {
                        for (var a = 0, b = 0; b < e.length; b++)
                            a += e[b].offsetWidth + parseInt(d(e[b], "marginRight"));
                        return a
                    }, c = a.navBox.getElementsByTagName("ul")[0], e = c.getElementsByTagName("li");
                    c.style.width = b() + "px", a.scroller.refresh()
                }
            })
        },findCurrent: function() {
            for (var a = this.navBox, b = a.getElementsByTagName("ul")[0], c = b.getElementsByTagName("li"), d = null, e = 0; e < c.length; e++) {
                var f = c[e];
                if (f.className && "current" == f.className) {
                    d = f;
                    break
                }
            }
            return d
        },initScroller: function() {
            var a = this.navBox, b = a.getElementsByTagName("ul")[0], c = b.getElementsByTagName("li"), e = function() {
                for (var a = 0, b = 0; b < c.length; b++)
                    a += c[b].offsetWidth + parseInt(d(c[b], "marginRight"));
                return a
            };
            b.style.width = e() + "px", this.scroller = new iScroll(this.navBox.id, {bounce: !0,vScroll: !1,hScrollbar: !1,vScrollbar: !1})
        }}, new a("mheader_nav", "mheader_navbox")
}), function(a) {
    a.Html5UI = function(a) {
        this.player = a, this.videoTag = a.getPlayer(), this.$video = a.$video
    }, a.Html5UI.fn = a.Html5UI.prototype = {init: function() {
            this.initDom(), this.controlReady()
        },initDom: function() {
        },controlReady: function() {
        }}
}(svp, svp.$), function(a, b) {
    var c = {param: {countDown: 5,hasSrc: !1,isClient: !1,sptCookie: !0,firstTime: !1,exception: ["1001"]},view: {},controller: {}}, d = c.param, e = c.view, f = c.controller;
    d.init = function() {
        Cookie.test();
        var a = URL.getQueryString("src") || URL.getQueryString("SRC");
        if (a ? (d.hasSrc = d.exception.indexOf(a) <= -1, d.src = a, a.length > 4 && (d.src = a.substr(0, 4))) : d.hasSrc = !1, d.isClient = !!URL.getQueryString("clientType"), d.sptCookie = Cookie.isEnabled, d.sptCookie) {
            var b = "firstTime", c = location.href;
            /hots/i.test(c) && (b = "firstTimeHots"), d.firstTime = !!Cookie.get(b), Cookie.set(b, 1)
        }
    }, e.splashTemplate = function() {
        var a = [];
        return a.push('<div id="splash_container">'), a.push('<div class="right_top"><span id="count_down">' + d.countDown + "</span>"), a.push('<span class="hide_btn">跳过</span>'), a.push("</div>"), a.push('<div class="splash_content">'), a.push('<span class="info"><em>升级</em> 搜狐视频，让观看速度流畅 <em>百</em> 倍</span>'), a.push('<div class="tv_client_btn install"><i></i>立即安装</div>'), a.push("</div></div>"), a.join("")
    }, f.quit = function() {
        b("#splash_container").animate({opacity: 0,marginTop: "-100%"}, {duration: 1e3,easing: "ease-in-out",complete: function() {
                b("#splash_container").remove(), b(document.body).trigger("splash:quit")
            }})
    }, f.bindEvent = function() {
        var a = "ontouchstart" in window ? "touchend" : "mouseup";
        b(document).on("touchmove", "#splash_container", function() {
            return !1
        }), b(document).on(a, ".install", function() {
            clearInterval(c), ClickTrace.pingback(null, "appdownload_cover_install"), setTimeout(function() {
                var a = d.src || "1101";
                Util.ajaxAppLinkBySrcPlt(function(a) {
                    location.href = a
                }, a)
            }, 50), f.quit()
        }), b(document).on(a, ".wake_up", function() {
            clearInterval(c), ClickTrace.pingback(null, "appdownload_cover_open");
            var a = this, b = window.VideoData || window.videoData || {}, d = Action.parserAttributes(b, a);
            Action.sendAction(d), f.quit()
        }), b(document).on(a, ".hide_btn", function() {
            return clearInterval(c), ClickTrace.pingback(null, "page_cover_skip"), setTimeout(function() {
                f.quit()
            }, 200), !1
        }), b(document).on(a, "#splash_container", function(a) {
            return b(".right_top, .splash_content").find(a.target).length > 0 ? !1 : void ClickTrace.pingback(null, "page_cover_pic")
        });
        var c = setInterval(function() {
            d.countDown--, 0 === d.countDown ? (clearInterval(c), ClickTrace.pingback(null, "page_cover_empty"), f.quit()) : b("#count_down").html(d.countDown)
        }, 1e3)
    }, f.process = function() {
        b("#splash_container").removeClass(), b("#count_down").html(d.countDown), ClickTrace.pingback(null, "page_cover_show"), f.bindEvent()
    }, f.init = function() {
        location.href.indexOf("hots") > -1 && void 0 != window.VideoData && "0" == VideoData.tabCard || (d.init(), d.firstTime || d.isClient || !d.sptCookie ? b(document.body).trigger("splash:quit") : d.hasSrc ? Action.getChannelInfo({channelSrc: d.src}, function(a) {
            1 == a.cover ? f.process() : b(document.body).trigger("splash:quit")
        }) : f.process())
    }, b(function() {
        f.init()
    }), b.extend(a.Html5UI.fn, {showSplash: function() {
            f.init()
        }})
}(svp, svp.$), $(function() {
    var tagHTML = document.getElementsByTagName("html")[0], className = [];
    $.ua.isAndroid || $.ua.HTC || (navigator.platform + "").match(/Linux/i) ? className.push("android") : $.ua.isWindowsPhone && className.push("windows_phone"), tagHTML.className = className.join(" "), function(svp) {
        var svp = svp || {}, hots = {param: {test_url: "",hotsScroll: null,isPullDown: 0,currentTab: "",currentColumnId: 0,channelArr: [],videoLists: {},video_count: -1,playLoop: {xLoop: !0,yLoop: !1},$curHotImg: null,$hotPlayer: null,isCurNext: !0,albumGotFlag: !1,albumTime: 2e3,MaxQstTime: 3e3,timeoutFlag: !1,MaxQstTimeUser: 5e3,timeoutFlagUser: !1,resetPlay: !1,startpoint: [0, 0],firstScreenData: !1,hasRecommend: !1,isPullApp: !1,settings: {data: "",elemId: "videoTagId",width: "100%",height: "100%",autoplay: !1,defControls: !1,posterType: "horizon",mediaType: "vod",modeType: "hig",volume: 1,loop: !1,timeLimit: -1,isPauseAd: !1,mediaAdPlatform: "ios,android",isCopyrightCheck: !0},ALBUM_API_PARAMS: {api_key: "f351515304020cad28c92f70f002261c",plat: "17",sver: "4.0",partner: "78",order: "1",with_trailer: 1,page_size: 20},cardTips: {installMessage: "安装搜狐视频APP，了解更多",openMessage: "打开搜狐视频APP，了解更多"},install: !0,hots_ads_statis_point: ""},model: {},view: {},ctrl: {}}, p = hots.param, m = hots.model, v = hots.view, c = hots.ctrl;
        m.getUrlParamByUrl = function(a, b) {
            var c = new RegExp("(\\?|#|&)" + a + "=([^&#]*)(&|#|$)"), b = b || location.href, d = b.match(c);
            return d ? d[2] : ""
        }, m.getStatistParam = function() {
            var a = Cookie.get("SUV"), a = a ? a : "", b = $.os, c = 5;
            b.iphone ? c = 3 : b.android && b.tablet ? c = 4 : b.android && b.phone ? c = 5 : b.tablet && navigator.platform.match(/Windows/) ? c = 7 : b.wPhone && (c = 8);
            var d = "&uid=" + a + "&prod=h5&plat=17&pt=" + c + "&pg=1";
            return d
        }, m.setChannelInfo = function(a, b, c, d, e) {
            p.channelArr.push({min_id: d || 0,max_id: e || 0,pull_down: 0,more_list: b,column_id: a,channeled: c})
        }, m.getVListTpl = function(a, b) {
            var d = (c.process, []);
            if (p.hasRecommend ? (d.push('<li class="recommend_li">'), d.push('<div class="v_info"><div class="recommend_vname">[#=opt["video_name"]#]</div></div>')) : d.push("<li>"), 0 == a && d.push('<div id="sohu_player" class="player_scope"></div>'), d.push(2 == a ? '<div class="hot_img player player_init main_player hotActionLink" id="vList_' + a + '" channeled="' + p.channelArr[p.currentTab].channeled + '" vid="[#=opt["vid"]#]" data-params="[{cid:[#=opt["cid"]#],sid:[#=opt["aid"]#],site:[#=opt["site"]#],ex2:' + p.currentColumnId + '}]" actionId="2.4">' : '<div class="hot_img player player_init main_player" id="vList_' + a + '">'), d.push(b.hor_high_pic ? '<div class="poster" style="background:url([#=opt["hor_high_pic"]#]);background-size:cover;"></div>' : '<div class="poster" style="background:url([#=opt["hor_big_pic"]#]);background-size:cover;"></div>'), d.push('<div class="player_controls"><div class="button_play"><span><b></b></span></div></div>'), d.push('<h3 class="video_title">[#=opt["video_name"]#]</h3>'), d.push('<div class="video_duration">[#=opt["total_duration"]#]</div>'), 2 == a && d.push('<div class="app_arrow"><i>App</i></div>'), d.push("</div>"), 2 == a)
                d.push('<div class="v_info">请打开搜狐视频，观看更多精彩内容</div>');
            else {
                if (d.push('<div class="v_info">'), d.push(b.album_name ? '<div class="special"><a href="/album/x[#=opt["aid"]#].shtml?channeled=1220010010" class="linkAlbum"><span class="album_name_wrap">[#=opt["album_name"]#]</span><span class="icon"></span></a></div>' : '<div class="special"><a href="/album/x[#=opt["aid"]#].shtml?channeled=1220010010" class="linkAlbum">更多<span class="icon"></span></a></div>'), d.push('<span class="next_video">下一集</span>'), b.play_count) {
                    var e = Util.shortFixedCount(b.play_count);
                    d.push('<div class="time"><span class="icon"></span>' + e + "</div>")
                } else
                    d.push('<div class="time"><span class="icon"></span>' + Util.shortFixedCount(parseInt(1e5 * Math.random())) + "</div>");
                d.push("</div>")
            }
            return p.hasRecommend && (d.push('<div class="recommend_app js_recommend_app" position="appdownload_hots_card">'), d.push('<div class="recommend_app_download">'), d.push('<i class="recommend_app_download_icon"></i>'), d.push("<span></span></div>"), d.push("</div>")), d.push("</li>"), d.join("")
        }, m.getAdsListTpl = function(a) {
            if ("" != a.img) {
                var b = [];
                return b.push('<li class="hots_ads">'), b.push("<a href = " + a.url + ' target="_blank">'), b.push('<div class="hots_banner" style="background:url(' + a.img + ');background-size:cover;"></div>'), b.push("</a></li>"), p.hots_ads_statis_point = a.text || "", b.join("")
            }
        }, m.formatVideoData = function(a, b) {
            for (var d = c.process, e = "", f = 0; f < a.length; f++) {
                var g = ++p.video_count, h = m.RenderTemplate(m.getVListTpl(g, a[f]), a[f], "opt"), i = $(h).find(".video_duration").text();
                if ($(h).find(".video_duration").text(d.formatSeconds(i)), h = $(h).find(".video_duration").text(d.formatSeconds(i)).parents("li")[0].outerHTML, void 0 != b && "" != b && 0 == p.firstScreenData)
                    for (var j = 0; j < b.length; j++)
                        g + 1 == b[j].index && (console.log("aaaa", b[j].index), h += m.getAdsListTpl(b[j]));
                e += h, void 0 == p.videoLists["vList_" + g] ? (p.videoLists["vList_" + g] = {videoData: [m.formatVideoDataItem(a[f])]}, p.videoLists["vList_" + g].curVideoIndex = 0) : p.videoLists["vList_" + g].videoData.push(m.formatVideoDataItem(a[f]))
            }
            return e
        }, m.insertList = function(a, b) {
            for (var c = 0; c < a.length; c++)
                if (void 0 == p.videoLists[b])
                    p.videoLists[b] = {videoData: [m.formatVideoDataItem(a[c])]}, p.videoLists[b].curVideoIndex = 0;
                else {
                    if (a[c].vid == p.videoLists[b].videoData[0].vid)
                        continue;
                    p.videoLists[b].videoData.push(m.formatVideoDataItem(a[c]))
                }
        }, m.formatPlayUrl = function(a) {
            if (a)
                var b = a.split(","), b = b.length > 0 && "" != b[0] ? b : [];
            return b
        }, m.formatVideoDataItem = function(a) {
            var b = a.aid || a.plid || "", c = a.total_duration || "", d = a.video_name || "", e = {vid: a.vid || "",aid: b,plid: b,sid: b,cid: a.cid || "",site: a.site || 1,cate_code: a.cate_code || "",cateCode: a.cate_code || "",horHighPic: a.hor_high_pic || "",hor_high_pic: a.hor_high_pic || "",hor_big_pic: a.hor_big_pic || "",verHighPic: a.ver_high_pic || "",ver_high_pic: a.ver_high_pic || "",total_duration: c,duration: c,video_name: d,videoName: d,tvname: d || a.album_name || "",areaId: 6,area_id: 6,tvid: a.tv_id || "",urls: {m3u8: {nor: m.formatPlayUrl(a.url_high) || m.formatPlayUrl(a.url_nor) || [],hig: [],sup: []},mp4: {nor: m.formatPlayUrl(a.download_url) || [],hig: [],sup: []},downloadUrl: m.formatPlayUrl(a.download_url) || []},durations: {nor: a.clips_duration_high ? m.formatPlayUrl(a.clips_duration_high) : (a.clips_duration_nor ? m.formatPlayUrl(a.clips_duration_nor) : [a.total_duration]) || [],hig: [],sup: []}};
            return e
        }, m.RenderTemplate = function(template, obj, obj_name) {
            eval("var " + obj_name + "=obj");
            for (var m, t = template; m = t.match(/\[#\=(.*?)#\]/); )
                t = t.replace(m[0], eval(m[1]));
            return t
        }, c.init = function() {
            var a = c.process;
            a.isResetHotPlayer(), a.getChanel(), c.eventInit(), a.statistic(), c.thirdPullApp()
        }, c.initPlayer = function() {
            var a = c.process;
            a.checkUser(), p.settings.data = p.videoLists.vList_0.videoData[0], window.hotPlayer = p.$hotPlayer = new svp.Html5Player(p.settings), p.$hotPlayer.on("loaded", function() {
                "0" == Action.startapp && p.isPullApp, "2" == Action.startapp && $(".hotActionLink").parent("li").hide()
            }), p.$hotPlayer.htmlTo($("#sohu_player")), p.$curHotImg = $("#vList_0").oriHide();
            var b = p.$curHotImg.hasClass("isRecomend") ? !0 : !1;
            window.VideoData = p.settings.data, window.VideoData.channeled = b ? m.getUrlParamByUrl("channeled") : p.channelArr[p.currentTab].channeled, a.delayCallGetAlbum("vList_0"), p.$curHotImg.parent("li").addClass("display_block"), p.$hotPlayer.on("ended", function() {
                var a = c.process;
                p.$hotPlayer.cache.isMediaAdContent || a.playNext()
            })
        }, c.initScroll = function() {
            var a = c.process;
            $(".ui-refresh").refresh({load: function(b) {
                    p.isPullDown = "up" == b ? 1 : 0, p.hotsScroll = this, a.getMoreData(b)
                }}).on("statechange", function(a) {
                a.preventDefault();
                var b = void 0 == a.data ? a._args : a.data, c = b[0], d = b[1], e = b[2];
                switch (d) {
                    case "loaded":
                        c.html("up" == e ? "点击刷新" : "上拉加载更多"), c.removeClass("moreloading");
                        break;
                    case "beforeload":
                        c.html("up" == e ? "松开立即刷新" : "松开立即加载");
                        break;
                    case "loading":
                        c.html("up" == e ? "正在刷新中..." : ""), c.addClass("moreloading");
                        break;
                    case "disable":
                        c.html("up" == e ? "对不起，没有更多内容了" : "没有更多内容")
                }
            })
        }, c.sendRecommendAction = function(a) {
            var b = window.VideoData || window.videoData || {}, c = Action.parserAttributes(b);
            c && c.site && "2" === c.site && (c.ex3 = "2"), c.action = "1.1", c.type = "click", console.log("params", c), Action.isIntentList() || void 0 != a || Action.sendAction(c), "manual" == a && Action.sendAction(c)
        }, c.thirdPullApp = function() {
            $("body").on("click", ".hotActionLink", function() {
                var a = this, b = window.VideoData || window.videoData || {}, c = Action.parserAttributes(b, a);
                c && c.site && "2" === c.site && (c.ex3 = "2"), IsIOS ? (c.action = "2.4", c.cid = "9006") : c.action = "1.1", c.type = "click", console.log("params", c), Action.sendAction(c)
            })
        }, c.eventInit = function() {
            c.process;
            $("#videoLists").on("click", ".hot_img", function() {
                var a = this;
                return p.isCurNext = !0, $(this).hasClass("hotActionLink") ? void setTimeout(function() {
                    $(a).removeClass("hotActionLink")
                }, 2e3) : void c.playEvent.call($(this))
            }), $("#videoLists").on("click", ".next_video", function() {
                var a = c.process;
                $(this).parents("li").hasClass("display_block") ? (p.isCurNext = !0, a.playNext()) : (p.isCurNext = !1, c.playEvent.call($(this).parents("li").find(".hot_img")))
            }), $(".js_hots_app_more").on("click", function() {
                var a = $(this).attr("position");
                console.log("发送行为统计点: " + a), ClickTrace.pingback(null, a), Action.gotoDownload(this)
            })
        }, c.playEvent = function() {
            var a = c.process;
            $("#sohu_player").insertBefore(this), p.$curHotImg.oriShow().parent("li").removeClass("display_block"), p.$curHotImg = this.oriHide(), this.parent("li").addClass("display_block");
            var b = this.attr("id");
            if (0 == this.parent().next().length && "none" != $(".ui-refresh-down").css("display") && $(".ui-refresh-down").trigger("click"), p.videoLists[b].videoData.length <= 1 && a.delayCallGetAlbum(b), p.isCurNext)
                a.updateById(b);
            else
                var d = setInterval(function() {
                    p.albumGotFlag && !p.timeoutFlag && (clearInterval(d), a.playNext()), p.timeoutFlag && clearInterval(d)
                }, 100)
        }, c.process = {}, c.process.reqCheck = function() {
            var a = $.now();
            p.timeoutFlag = !1, p.albumGotFlag = !1;
            var b = setInterval(function() {
                $.now() - a > p.MaxQstTime && (clearInterval(b), p.albumGotFlag || (p.timeoutFlag = !0))
            }, 100)
        }, c.process.checkUser = function() {
            var a = c.process;
            p.timeoutFlagUser = !1;
            var b = $.now(), d = setInterval(function() {
                $.now - b > p.MaxQstTimeUser && (clearInterval(d), p.timeoutFlagUser = !0), null != Action.startapp && (clearInterval(d), a.appRecommendDownlod())
            }, 100)
        }, c.process.appRecommendDownlod = function() {
            var a = Action.startapp;
            "0" == a ? (p.install = !0, $(".js_recommend_app").find("span").text(p.cardTips.installMessage), $(".js_recommend_app").on("click", function() {
                var a = $(this).attr("position");
                console.log("发送行为统计点: " + a), ClickTrace.pingback(null, a), Action.gotoDownload(this)
            })) : "1" == a ? (p.install = !1, $(".js_recommend_app").find("span").text(p.cardTips.openMessage), $(".js_recommend_app").on("click", function() {
                var a = $(this).attr("position");
                console.log("发送行为统计点: " + a), ClickTrace.pingback(null, a), c.sendRecommendAction("manual"), Action.popTips({title: "了解更多内容，请先安装搜狐视频APP"})
            })) : (p.install = !0, $(".js_recommend_app").find("span").text(p.cardTips.installMessage), $(".js_recommend_app").on("click", function() {
                var a = $(this).attr("position");
                console.log("发送行为统计点: " + a), ClickTrace.pingback(null, a), Action.gotoDownload(this)
            })), p.install || $(".js_recommend_app").addClass("is_open")
        }, c.process.updateById = function(a) {
            var b = c.process, d = p.videoLists[a].videoData[p.videoLists[a].curVideoIndex];
            window.VideoData = d, window.VideoData.channeled = p.channelArr[p.currentTab].channeled, b.updateHotPlayerByVideoData(d)
        }, c.process.playNext = function() {
            var a = c.process, b = p.$curHotImg.attr("id"), d = p.videoLists[b], e = 0;
            ++d.curVideoIndex > d.videoData.length - 1 ? (e = 0, d.curVideoIndex = 0) : e = d.curVideoIndex;
            var f = d.videoData[e];
            window.VideoData = f, window.VideoData.channeled = p.channelArr[p.currentTab].channeled, a.updateHotPlayerByVideoData(f), a.modifyPoster(f)
        }, c.process.getChanel = function() {
            var a = c.process;
            $.ajax({url: "http://m.tv.sohu.com/api/v4/mobile/column/list.json?plat=17&api_key=88a12cee7016fe81ac2ab686d918bc7c&sver=4.0&partner=1&cate_code=9006&callback=?",type: "get",dataType: "jsonp",success: function(b) {
                    if (b && 200 == b.status) {
                        p.currentTab = $("#mheader_navbox").find(".current>a").attr("data-nav-index");
                        for (var d = 0; d < b.data.columns.length; d++) {
                            var e = b.data.columns[d];
                            m.setChannelInfo(e.column_id, e.more_list, e.channeled)
                        }
                        p.currentColumnId = p.channelArr[p.currentTab].column_id;
                        var f = m.getUrlParamByUrl("vid") || void 0 != window.VideoData && "0" != VideoData.tabCard && VideoData.vid;
                        if (f) {
                            p.hasRecommend = !0, p.isPullApp = !0, p.hasRecommend && ClickTrace.pingback(null, "hots_card");
                            var g = URL.getQueryString("boke"), h = g ? 2 : 1;
                            void 0 != window.VideoData && (h = VideoData.site), a.getRecommend(f, h, c.initPlayer)
                        } else
                            a.getMoreData(!1, c.initPlayer);
                        window.isAutoPlay && !f
                    }
                }})
        }, c.process.formatSeconds = function(a) {
            var b = parseInt(a), c = b % 60, c = c >= 10 ? c : "0" + c, d = Math.floor(b / 60), d = d >= 10 ? d : "0" + d;
            return d + ":" + c
        }, c.process.getRecommend = function(a, b, d) {
            var e = c.process, f = {api_key: "f351515304020cad28c92f70f002261c",plat: "17",sver: "4.0",partner: "78",site: b || 1};
            $.ajax({url: "http://api.tv.sohu.com/v4/video/info/" + a + ".json?" + $.param(f),type: "get",dataType: "jsonp",success: function(a) {
                    $(".no_loading").oriHide(), 200 == a.status && a.data ? a.data.vid && ($("#videoLists")[p.isPullDown ? "prepend" : "append"](m.formatVideoData([a.data])), $("#videoLists li:first").find(".hot_img").addClass("isRecomend"), $("#videoLists li:first").find(".v_info").addClass("isRecomend"), $.isFunction(d) && d(), e.getMoreData(!1)) : e.getMoreData(!1, d)
                },error: function() {
                    e.getMoreData(!1, d)
                }})
        }, c.process.getMoreData = function(a, b) {
            var d = c.process, e = p.channelArr, f = e[p.currentTab].min_id || 0, g = e[p.currentTab].max_id || 0, h = $("#mheader_navbox").find("li.current").attr("more_list"), i = "api_key=695fe827ffeb7d74260a813025970bd5&plat=17&sver=3.2&min_id=" + f + "&max_id=" + g + "&pull_down=" + p.isPullDown + "&column_id=" + p.currentColumnId;
            h += i, "true" == IS_DEBUG && (h = h.replace("http://api.tv.sohu.com", "http://dev.app.yule.sohu.com")), $.ajax({url: h,type: "get",dataType: "jsonp",success: function(c) {
                    if ($(".no_loading").oriHide(), c && 200 == c.status && c.data) {
                        p.hasRecommend = !1, p.channelArr[p.currentTab].min_id = c.data.min_id, p.channelArr[p.currentTab].max_id = c.data.max_id;
                        var e = "";
                        c.data.ads && c.data.ads.length > 0 && (e = c.data.ads || ""), $("#videoLists")[p.isPullDown ? "prepend" : "append"](m.formatVideoData(c.data.videos, e)), p.hotsScroll && p.hotsScroll.afterDataLoading(a), d.hotsAdsStatistic(), $.isFunction(b) && b(), p.firstScreenData || d.getBannerBg(), p.firstScreenData = !0, window.sohuPV.pv()
                    } else
                        $(".ui-refresh-down").hide()
                }})
        }, c.process.getAlbum = function(a, b) {
            if (a.aid) {
                var d = c.process;
                d.reqCheck(), $.ajax({url: "http://api.tv.sohu.com/v4/album/videos/" + a.aid + ".json?" + $.param(p.ALBUM_API_PARAMS) + "&site=" + a.site,type: "get",dataType: "jsonp",success: function(a) {
                        a && 200 == a.status && a.data && (m.insertList(a.data.videos, b), p.albumGotFlag = !0)
                    }})
            }
        }, c.process.delayCallGetAlbum = function(a) {
            var b = c.process, d = {aid: p.videoLists[a].videoData[0].aid,site: p.videoLists[a].videoData[0].site};
            p.isCurNext ? setTimeout(function() {
                b.getAlbum(d, a)
            }, p.albumTime) : b.getAlbum(d, a)
        }, c.process.modifyPoster = function(a) {
            var b = c.process;
            p.$curHotImg.find(".poster").css({background: "url(" + a.hor_high_pic + ")",backgroundSize: "cover"}), p.$curHotImg.find(".video_title").text(a.video_name), p.$curHotImg.find(".video_duration").text(b.formatSeconds(a.total_duration)), $("#sohu_player").parent("li").hasClass("recommend_li") && $(".recommend_vname").text(a.video_name)
        }, c.process.hideNav = function() {
            var a = c.process;
            $(".ui-refresh").on(START_EVENT, a.start).on(MOVE_EVENT, a.move).on(END_EVENT, a.end)
        }, c.process.start = function(a) {
            var b = IsTouch ? a.changedTouches[0] : a;
            p.startpoint = [b.clientX, b.clientY]
        }, c.process.move = function(a) {
            var b = IsTouch ? a.changedTouches[0] : a, c = b.clientY - p.startpoint[1];
            c > 10 && $("body").removeClass("hideNav"), -10 > c && $("body").addClass("hideNav")
        }, c.process.end = function() {
        }, c.process.downloadHtml = function() {
            var a = [];
            return a.push('<li class="first_banner">'), a.push('<div id="firstBanner_bg" class="top_img" style="background-image: url(http://photocdn.sohu.com/tvmobile/20140704/140443120155046492.jpg)"></div>'), a.push('<div class="watch_more">'), a.push('<span class="info">观看更多精彩视频</span>'), a.push('<div class="good_load">'), a.push('<span class="sohu_logo"></span>立即下载</div>'), a.push("</div></li>"), a.join("")
        }, c.process.isResetHotPlayer = function() {
            var a = navigator.userAgent.match(/Android[\s\/]([0-9\._]+)/i), b = navigator.userAgent.match(/( UC(Browser)?|QQBrowser)/i);
            null == a || b || (a = Util.getVersionNumber(a[1]), 2.4 > a && (p.resetPlay = !0))
        }, c.process.updateHotPlayerByVideoData = function(a) {
            p.resetPlay ? (p.$hotPlayer = null, $("#sohu_player").html(""), p.settings.data = a, p.$hotPlayer = new svp.Html5Player(p.settings), p.$hotPlayer.htmlTo($("#sohu_player"))) : (a.autoplay = !0, p.$hotPlayer.updateByVodData(a, function() {
                IsAndroid && IsQQ ? p.$hotPlayer && p.$hotPlayer.seekTo(0) : p.$hotPlayer.play()
            }))
        }, c.process.getBannerBg = function() {
        }, c.process.redirect = function() {
            return
        }, c.process.statistic = function() {
            $(".sohu-nav-box a").on("click", function() {
                var a = $(this);
                return ClickTrace.pingback(null, "index_nav_hots"), setTimeout(function() {
                    location.href = a.attr("href")
                }, 50), !1
            }), $("#videoLists").on("click", ".hotActionLink", function() {
                ClickTrace.pingback(null, "appdownload_hots_video")
            }), $("#videoLists").on("click", ".linkAlbum", function() {
                var a = $(this);
                return ClickTrace.pingback(null, "hotspot_program"), setTimeout(function() {
                    location.href = a.attr("href")
                }, 50), !1
            }), $("#videoLists").on("click", ".next_video", function() {
                ClickTrace.pingback(null, "hotspot_next")
            }), $("#videoLists").on("click", ".isRecomend .next_video", function() {
                ClickTrace.pingback(null, "hotspot_next_first")
            })
        }, c.process.hotsAdsStatistic = function() {
            $("#videoLists").on("click", ".hots_ads", function() {
                ClickTrace.pingback(null, p.hots_ads_statis_point)
            })
        }, c.init()
    }(svp)
});
var svp = svp || {};
!function(svp) {
    "use strict";
    var IsWeixin = !(!WIN.WeixinJSBridge && !/MicroMessenger/i.test(UA)), Action = {URLProtocol: "sohuvideo" + (IsIPad ? "hd" : "") + "://",openTime: IsIOS ? 800 : 1e3,appChanneled: 1000120001,channelSrc: "0",appointUrl: "",maxEffectiveTime: 72e5,appPortArr: ["23456", "23457"],appInfoReqCounts: 0,startapp: null,updateTime: 36e5,maxSaveCounts: 10,getLocalData: function(a) {
            var b = Cookie.get("localChannelInfo"), c = [], d = null;
            if ("" !== b && null !== b && (c = JSON.parse(b)), "undefined" != typeof a) {
                for (var e = 0, f = c.length; f > e; e++) {
                    var g = c[e];
                    if (g.channelSrc === a && Date.now() < g.time + Action.updateTime) {
                        d = g;
                        break
                    }
                }
                return d
            }
            return c
        },setLoacalData: function(a) {
            var b = {};
            b.channelSrc = a.channelSrc, b.time = Date.now(), b.appointUrl = a.appointUrl, b.startapp = a.startapp;
            for (var c = (this.getLocalData(b.channelSrc), this.getLocalData()), d = !1, e = 0, f = c.length; f > e; e++) {
                var g = c[e];
                g.channelSrc === b.channelSrc && (d = !0, g.channelSrc = b.channelSrc, g.time = b.time, g.appointUrl = b.appointUrl, g.startapp = b.startapp)
            }
            d || c.unshift(b), c.length > this.maxSaveCounts && (c.length = this.maxSaveCounts), Cookie.set("localChannelInfo", JSON.stringify(c))
        },getChannelInfo: function(a, b) {
            var c = this, d = a && a.channelSrc ? a.channelSrc : this.channelSrc;
            b = "function" == typeof b ? b : function() {
            }, (d + "").length > 4 && (d = d.substr(0, 4));
            var e = {appointUrl: Util.getSohuDefaultApplink(),startapp: "1",channelSrc: d,cover: 1,isClosed: 0,timeLimit: 0,channelNum: 680,quality: "nor,hig,sup"};
            if (null !== this.getLocalData(d)) {
                var f = this.getLocalData(d);
                this.startapp = f.startapp, "undefined" == typeof f.cover && (f.cover = 1, f.isClosed = 0, f.timeLimit = 0, f.quality = "nor,hig,sup", f.channelNum = 680), b(f)
            } else {
                d = parseInt(d, 10), isNaN(d) && (d = "0");
                var g = "http://" + ("true" === IS_DEBUG ? "t." : "") + "m.tv.sohu.com/h5/cooperation/" + d + ".json?pos=1&platform=" + Util.getUserPt() + "&callback=?";
                console.log("获取下载链接ajax:", g);
                var h = new Date;
                h.setHours(0), h.setMinutes(0), h.setSeconds(0), $.ajax({data: {t: h.getTime()},url: g,type: "get",dataType: "jsonp",success: function(a) {
                        if ("undefined" != typeof a && a.records && a.records.length > 0) {
                            var d = a.records[0];
                            IsIPad || IsIPhone || IsWeixin || (e.appointUrl = c.appointUrl = d.link), e.startapp = c.startapp = "undefined" != typeof d.startapp ? d.startapp + "" : "1", e.cover = d.cover, e.isClosed = d.isClosed, e.timeLimit = d.timeLimit, e.quality = d.quality, e.channelNum = d.num, c.setLoacalData(e)
                        }
                        b(e)
                    },error: function() {
                        b(e)
                    }})
            }
        },getDownloadUrl: function(a, b) {
            b = "function" == typeof b ? b : function() {
            }, a && a.downUrl ? b(a.downUrl) : "" !== this.appointUrl ? b(this.appointUrl) : this.getChannelInfo(a, function(a) {
                b(a.appointUrl)
            })
        },gotoDownload: function(a) {
            this.getDownloadUrl(a, function(b) {
                if ("" !== b) {
                    var c = a && a.delayTime ? a.delayTime : Action.openTime;
                    setTimeout(function() {
                        window.location.href = b
                    }, c)
                }
            })
        },openIos: function(a, b) {
            if (a) {
                console.log("发送行为统计点: app2_ios_action"), ClickTrace.pingback(null, "app2_ios_action");
                var c = document.createElement("iframe");
                c.style.display = "none";
                var d, e = document.body, f = function(a, d) {
                    b && "function" == typeof b && b(d), window.removeEventListener("pagehide", g, !0), window.removeEventListener("pageshow", g, !0), c && (c.onload = null, e.removeChild(c), c = null)
                }, g = function(a) {
                    clearTimeout(d), f(a, !1)
                };
                window.addEventListener("pagehide", g, !0), window.addEventListener("pageshow", g, !0), c.onload = f, c.src = a, e.appendChild(c);
                var h = +new Date;
                d = setTimeout(function() {
                    d = setTimeout(function() {
                        var a = +new Date;
                        h - a > 1300 ? f(null, !1) : f(null, !0)
                    }, 1200)
                }, 60)
            }
        },openAndroid: function(a, b, c) {
            if (a) {
                -1 === a.indexOf("svawebsocket") && (console.log("发送行为统计点: app1_android_action"), ClickTrace.pingback(null, "app1_android_action"));
                var d = URL.getQueryData(location.search.substring(1)), e = !1, f = !1;
                if ("undefined" != typeof c && ("click" === c && (e = !0), "try" === c && (f = !0)), d.startClient && "1" === d.startClient && d.clientType || !f && (d.startClient && "2" !== d.startClient || e) && Action.isIntentList() && !/UCBrowser/i.test(UA) && -1 === a.indexOf("svawebsocket"))
                    window.location.href = a;
                else {
                    var g = document.createElement("iframe");
                    g.style.display = "none", g.src = a;
                    var h = document.body;
                    h.appendChild(g), setTimeout(function() {
                        h.removeChild(g), g.onload = null, g = null
                    }, 200)
                }
                b && "function" == typeof b && b()
            }
        },sendAction: function(a, b) {
            "" !== this.channelSrc && "0" !== this.channelSrc && (console.log("发送行为统计点: app_channel_action"), ClickTrace.pingback(null, "app_channel_action"));
            var c = Action.makeActionUrl(a), d = URL.getQueryData(location.search.substring(1));
            if ("1" === d.startClient && (console.log("发送行为统计点: appdownload_jump1"), ClickTrace.pingback(null, "appdownload_jump1")), "2" === d.startClient && (console.log("发送行为统计点: appdownload_jump2"), ClickTrace.pingback(null, "appdownload_jump2")), a.isHike && (console.log("发送行为统计点: appdownload_jump0"), ClickTrace.pingback(null, "appdownload_jump0")), IsAndroid)
                "undefined" != typeof a.type ? Action.openAndroid(c, b, a.type) : Action.openAndroid(c, b);
            else if (IsIOS)
                Action.openIos(c, b);
            else {
                console.log("发送行为统计点: app3_others_action"), ClickTrace.pingback(null, "app3_others_action");
                var e = this.getIframe();
                e.attr("src", c)
            }
        },getIframe: function() {
            var a = $("#j_redirectNativeFrame");
            return 0 === a.length && (a = $('<iframe id="j_redirectNativeFrame" style="display:none"></iframe>'), $("body").append(a)), a
        },getPopTipsView: function() {
            var a = [];
            return a.push('<div class="app_download_select js_download_select" style="display: none;">'), a.push('<div class="app_download_top">'), a.push('<span class="app_download_icon"></span>'), a.push('<span class="app_downlaod_close js_app_downlaod_close"></span>'), a.push("</div>"), a.push('<div class="app_download_title js_download_select_title"></div>'), a.push('<div class="app_downlaod js_app_downlaod" position="appdownload_floor">立即安装</div>'), a.push("</div>"), a.push('<div class="download_masklayer js_download_masklayer" style="display: none;"></div>'), a.join("")
        },popTips: function(a) {
            var b = $(".js_download_select"), c = $(".js_download_masklayer");
            (IsQQ || IsUC) && setTimeout(function() {
                $("video").length > 0 && $("video")[0].pause(), $("video").hide()
            }, 300), 0 === b.length && ($("body").append(this.getPopTipsView()), b = $(".js_download_select"), c = $(".js_download_masklayer"), $(".js_app_downlaod").on("click", function() {
                var d = $(this).attr("position");
                console.log("发送行为统计点: " + d), ClickTrace.pingback(null, d);
                var e = "undefined" != typeof a.downUrl ? {downUrl: a.downUrl} : {};
                return console.log(2222222222, e), Action.gotoDownload(e), b.oriHide(), c.oriHide(), "undefined" != typeof a && "function" == typeof a.downloadCB && a.downloadCB(), !1
            }), $(".js_app_downlaod_close").on("click", function() {
                return b.oriHide(), c.oriHide(), (IsQQ || IsUC) && setTimeout(function() {
                    $("video").show()
                }, 300), "undefined" != typeof a && "function" == typeof a.closeCB && a.closeCB(), !1
            }));
            var d = a && a.title ? a.title : "高速观看需安装搜狐视频客户端";
            $(".js_download_select_title", b).html(d), c.oriShow(), b.oriShow()
        },isIntentList: function() {
            var a = !1;
            return IsAndroid && /(SAMSUNG[\s-_]+)?SM[\s-_]+(N90|G90|T|P6)+|Nexus/i.test(UA) && (a = !0), a
        },isForceIntent: function() {
            var a = !1;
            return IsAndroid && Action.isIntentList() && !/UCBrowser/i.test(UA) && !/QQBrowser/i.test(UA) && (a = !0), a
        },getAppChanneled: function() {
            var a = window.VideoData || window.videoData || {}, b = URL.getQueryString("channeled") || a.channeled || Action.appChanneled, c = window.location.href || "http://m.tv.sohu.com/";
            try {
                (c.indexOf("hots") > -1 || c.indexOf("/x") > -1) && (b = a.channeled || URL.getQueryString("channeled") || Action.appChanneled)
            } catch (d) {
                b = Action.appChanneled, console.log(d)
            }
            return b
        },makeActionParam: function(a) {
            var b = {};
            return b.action = a.action, -1 !== $(["71", "72", "73", "74", "75", "76"]).indexOf(a.cid) && (a.cid = "28", a.cateCode = "9009"), "1.1" === b.action && (b.sid = a.sid, b.cid = a.cid, b.cateCode = a.cateCode, b.enterid = a.enterid, b.site = a.site, b.dataType = a.dataType, a.vid && "" !== a.vid && (b.vid = a.vid), a.ex1 && "1" !== a.ex1 && "" !== a.ex1 && (b.ex1 = a.ex1), a.ex2 && "" !== a.ex2 && (b.ex2 = a.ex2), a.ex3 && "" !== a.ex3 && (b.ex3 = a.ex3), a.appname && "" !== a.appname && "none" !== a.appname ? b.appname = a.appname : b.backpage = "0", a.more && !IsIOS && (b.more = a.more), IsWindowsPhone && (b.site = a.site)), ("1.2" === b.action || "2.4" === b.action) && (IsIOS ? (b.action = "2.4", b.ex1 = a.ex1, window.location.href.indexOf("/hots") > -1 ? (b.cid = a.cid, b.ex2 = a.ex2) : (b.cid = a.cateCode, b.ex2 = a.cid)) : (b.action = "1.2", b.cid = a.cid, b.cateCode = a.cateCode)), "1.17" === b.action && (b.ex1 = a.ex1, "1" === a.ex1 ? (b.vid = a.vid, b.cid = a.cid) : "3" === a.ex1 && (b.ex2 = a.ex2, b.ex3 = a.ex3)), "1.18" === b.action && (b.urls = a.urls, "" !== a.share && (b.share = a.share), "" !== a.ex1 && (b.ex1 = a.ex1), "" !== a.ex2 && (b.ex2 = a.ex2), "" !== a.ex3 && (b.ex3 = a.ex3), "" !== a.bit0 && (b.bit0 = a.bit0), "" !== a.bit1 && (b.bit1 = a.bit1)), "1.21" === b.action && (b.more = a.more, b.type = a.type), b.more = {sourcedata: {enterid: a.enterid || "4",channeled: a.channeled,preid: window.location.href}}, $.extend(!0, b.more, a.more), b.more = JSON.stringify(b.more), b
        },makeActionUrl: function(a) {
            var b = Action.URLGlobalParms;
            a.scheme = b.clientType && "1" === b.startClient || !Cookie.test() ? "sohuvideo" : "1" === b.startClient || Action.isForceIntent() ? "intent" : "sohuvideo";
            {
                var c = a.scheme, d = a.action || a.actionVer || "1.1", e = a.cateCode || "", f = a.channeled || Action.getAppChanneled();
                a.position || ""
            }
            e = e.toString().split(",")[0] || "", e = e.split(";")[0] || "", a = Action.formatArgs(a);
            var g = {action: d,vid: a.vid || "",sid: a.sid || "",cid: a.cid || "",cateCode: e,dataType: a.dataType,urls: a.urls,ex1: a.ex1 || 1,ex2: a.ex2 || "",ex3: a.ex3 || "",site: a.site || "",enterid: "4_" + f,bit0: a.bit0 || "",bit1: a.bit1 || "",type: a.type || 6,appname: "none",channeled: f,share: a.share || ""};
            g.enterid = g.enterid + "_" + this.channelSrc, a && a.action && a.site && "2" === a.site && (g.ex3 = 2, g.sid = "", g.site = "2"), a && a.more && (g.more = a.more), g = Action.makeActionParam(g), c ? c = c.replace("://", "") : (c = Action.URLProtocol, c = c.replace("://", ""));
            var h = "";
            if (IsAndroid)
                if (c.indexOf("intent") > -1) {
                    h = "intent://", h += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html");
                    var i = "#Intent;scheme=sohuvideo;package=com.sohu.sohuvideo;end";
                    h += i, console.log("android intent 1:", JSON.stringify(g))
                } else
                    h = c + "://", h += "action.cmd", h += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html"), console.log("android sohovideo:", JSON.stringify(g));
            else
                console.log("ios winphone sohovideo:", JSON.stringify(g)), console.log("ios winphone sohovideo:###", c), h = Action.URLProtocol, h += "action.cmd", h += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html");
            return console.log("makeActionUrl : " + h), h
        },URLGlobalParms: {},updateGlobalParms: function(a, b) {
            var c, d = $("a[href],form", a), e = d.length;
            for (b = b || Action.URLGlobalParms; e--; )
                c = d.get(e), URL.setQueryString(c, b)
        },formatArgs: function(a) {
            var b = a.vid || "", c = a.sid || "", d = a.url || window.location.href, e = a.action + "" || "1.1";
            if (!a)
                return a;
            if (b || c) {
                if (a.action = e, "1.1" === e && (9001 === a.cid || "2" === a.site) && (a.ex3 = 2, a.sid = "", a.site = "2"), "1.19" === e || "1.20" === e) {
                    if (!b)
                        return;
                    d = d.split("?")[0], a.urls = d, a.ex1 = "", a.ex2 = "", a.ex3 = "", "1.20" === e && (a.urls = d.replace(/play/, "index") + "," + d)
                }
                "1.17" === e && (a.ex1 = a.ex1 || 1, a.ex2 = a.ex2 || "", a.ex3 = a.ex3 || "", 2 === a.ex1 && (a.open = 1))
            } else
                (a.live || d.match(/live/i) || d.match(/\.m3u8/i)) && (a.action = a.action || "1.1", a.ex1 = a.ex1 || 3);
            return a
        },parserUrls: function() {
            !StartClient || Action.URLGlobalParms.clientType || Action.URLGlobalParms.actionVer || URL.setQueryString(this, {startClient: 1});
            for (var a, b = ["clientType", "clientVer", "actionVer", "startClient", "actionId"], c = b.length, d = URL.getQueryData(location.search.substring(1)), e = {}; c--; )
                a = b[c], d.hasOwnProperty(a) && d[a] && (e[a] = d[a]);
            Action.updateGlobalParms(DOC, e), Action.URLGlobalParms = e
        },parserAttributes: function(data, el) {
            for (var videoParmsKeys = ["vid", "cid", "sid", "plid", "cateCode", "site"], c = videoParmsKeys.length, URLParms = Action.URLGlobalParms, vd = data || window.VideoData || window.videoData || {}, args = {}; c--; ) {
                var key = videoParmsKeys[c];
                vd && vd[key] && (args[key] = vd[key]), URLParms && URLParms.hasOwnProperty(key) && URLParms[key] && (args[key] = URLParms[key])
            }
            "undefined" != typeof args.site && (args.site = args.site + "");
            var channeled = URLParms.channeled || Action.getAppChanneled();
            channeled = channeled.toString().replace("|", "").replace("%7C", "");
            var vid = args.vid || "", sch = Action.URLProtocol, downUrl = args.downUrl || "", actionId = args.actionId || args.actionVer || "1.17";
            if ("undefined" != typeof el) {
                el = $(el), channeled = el.attr("channeled") || channeled, vid = el.attr("vid") || vid;
                var _sch = el.attr("data-scheme");
                _sch && (sch = _sch.toLowerCase()), downUrl = el.attr("data-downUrl") || el.attr("data-downurl") || downUrl, actionId = el.attr("actionId") || el.attr("actionid") || "1.17", args.action = actionId, args.vid = vid, args.channeled = channeled, args.scheme = sch, args.downUrl = downUrl, args.enterid = "4_" + channeled;
                try {
                    var _params = eval(el.attr("data-params")) || [];
                    for (var i in _params) {
                        var jsonObj = _params[i] || {};
                        jsonObj && $.extend(!0, args, jsonObj)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            return vd.site && "2" === vd.site ? args.ex3 = "2" : args.ex1 = "1", args.action = actionId, args = Action.formatArgs(args), args.scheme = sch, args.downUrl = downUrl, console.log("parserAttributes:", JSON.stringify(args)), args
        },init: function() {
            this.parserUrls(), this.URLProtocol = "sohuvideo" + (IsIPad ? "hd" : "") + "://", this.channelSrcInit()
        },channelSrcInit: function() {
            return this.channelSrc = URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "0", this.channelSrc = this.channelSrc.replace("|", "").replace("%7C", ""), this.channelSrc.length > 4 && (this.channelSrc = this.channelSrc.substr(0, 4)), this.channelSrc = parseInt(this.channelSrc, 10), isNaN(this.channelSrc) && (this.channelSrc = "0"), this.channelSrc
        },addIosMeta: function() {
            var a, b, c, d = document.createElement("meta");
            IsIOS && (IsIPhone && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8", content = "app-id=458587755", content += ", app-argument=sohuvideo://action.cmd ", content += ", affiliate-data=mt=8", d.setAttribute("content", content), d.setAttribute("name", "apple-itunes-app"), b = document.getElementsByTagName("meta"), c = b[0].parentNode, c.appendChild(d)), IsIPad && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8", content = "app-id=414430589", content += ", app-argument=sohuvideo://action.cmd ", content += ", affiliate-data=mt=8", d.setAttribute("content", content), d.setAttribute("name", "apple-itunes-app"), b = document.getElementsByTagName("meta"), c = b[0].parentNode, c.appendChild(d)))
        },isEnableWebSocket: function() {
            var a = URL.getQueryData(location.search.substring(1));
            EnterDisableAction = "undefined" == typeof EnterDisableAction ? !1 : EnterDisableAction;
            var b = !0;
            return location.href.match(/player=1/i) || document.referrer.indexOf("m.sohu.com") > -1 ? b = !1 : "undefined" != typeof VideoData && "undefined" != typeof VideoData.hike && "1" === VideoData.hike && (b = !0), "undefined" != typeof a.startClient && (b = "2" === a.startClient && Action.isIntentList() ? !1 : !0), (EnterDisableAction || "undefined" == typeof window.VideoData && "undefined" == typeof window.videoData || "undefined" != typeof window.VideoData && "1" === window.VideoData.mobileLimit || !/^(m|t\.m)\.tv\.sohu\.com$|^10\.2\.12\.72:85$/i.test(window.location.host) || !Cookie.test()) && (b = !1), b
        },autoStartClient: function() {
            var a = !0;
            Action.isEnableWebSocket() || (a = !1), Action.isIntentList() && (a = !1), IsWeixin && (a = !1), "undefined" != typeof VideoData && 0 == VideoData.tabCard && (a = !1), window.location.href.match(/player=1/i) && (this.startapp = "1", a = !1);
            var b = Action.parserAttributes();
            b.action = "1.1", b.type = "try", null === this.startapp ? this.getChannelInfo(null, function(c) {
                a && "0" === c.startapp && (0 !== $("video").length && $("video")[0].pause(), Action.sendAction(b))
            }) : a && "0" === this.startapp && (0 !== $("video").length && $("video")[0].pause(), Action.sendAction(b))
        },bindAction: function() {
            Action.autoStartClient();
            var a = "ontouchstart" in window ? "touchend" : "mouseup";
            $("body").on(a, ".actionLink", function() {
                var a = this, b = window.VideoData || window.videoData || {}, c = Action.parserAttributes(b, a);
                c.action = "1.1", "0" !== Action.channelSrc && "-2" !== Action.channelSrc ? Action.sendAction(c) : IsIOS ? Action.sendAction(c, function() {
                    setTimeout(function() {
                        Action.gotoDownload()
                    }, 2e3)
                }) : IsAndroid ? Action.isForceIntent() ? Action.sendAction(c) : Action.getAppInfo(function(a) {
                    null === a ? (setTimeout(function() {
                        Action.gotoDownload()
                    }, 2e3), Action.sendAction(c)) : Action.sendAction(c)
                }) : Action.sendAction(c)
            })
        },makeWebActionUrl: function(a) {
            var b = Action.URLGlobalParms, c = "svawebsocket";
            b.clientType && "1" === b.startClient || !Cookie.test() ? c = "svawebsocket" : a.sch ? c = a.sch : ("1" === b.startClient || Action.isForceIntent()) && (c = "intent");
            var d = {action: "1.1",enterid: "4_" + Action.getAppChanneled(),more: {sourcedata: {preid: encodeURIComponent(window.location.href)}}}, e = "";
            if (IsAndroid)
                if (c.indexOf("intent") > -1) {
                    e = "intent://", e += "?" + URL.objToQueryString(d).replace(/index\.html%2C/, "index.html");
                    var f = "#Intent;scheme=svawebsocket;package=com.sohu.sohuvideo;end";
                    e += f, console.log("android intent 1:", JSON.stringify(d))
                } else
                    e = c + "://", e += "action.cmd", e += "?" + URL.objToQueryString(d).replace(/index\.html%2C/, "index.html"), console.log("android intent 2:", JSON.stringify(d));
            else
                console.log("android sohovideo:###", c), e = "svawebsocket://", e += "action.cmd", e += "?" + URL.objToQueryString(d).replace(/index\.html%2C/, "index.html");
            return console.log("makeWebActionUrl : " + e), e
        },sendWebAction: function(a, b, c) {
            var d = this, e = Action.makeWebActionUrl(a);
            if (Action.isEnableWebSocket() && e) {
                if (IsAndroid)
                    Action.openAndroid(e, b);
                else if (IsIOS)
                    Action.openIos(e, b);
                else {
                    var f = this.getIframe();
                    f.attr("src", e)
                }
                setTimeout(function() {
                    Action.getAppInfoByAjax(a, function(b) {
                        var e = null === b ? "app_ajax_fail" : "app_ajax_success";
                        console.log("发送行为统计点: " + e), ClickTrace.pingback(null, e), null === b && d.appPortArr.length - 1 >= d.appInfoReqCounts ? Action.getAppInfoByAjax(a, function(a) {
                            var d = null === b ? "app_ajax_fail" : "app_ajax_success";
                            console.log("发送行为统计点: " + d), ClickTrace.pingback(null, d), c(a)
                        }) : c(b)
                    })
                }, 200)
            }
        },getAppInfoByAjax: function(a, b) {
            var c, d = a && a.ip ? a.ip : "127.0.0.1";
            a && a.port ? c = a.port : this.appPortArr[this.appInfoReqCounts] ? (c = this.appPortArr[this.appInfoReqCounts], this.appInfoReqCounts++) : c = "23456";
            var e = {t: 1,k: "sohu1234",h5Uid: Cookie.get("SUV") || ""}, f = "http://" + d + ":" + c + "/", g = null;
            console.log("ajax getAppInfoByAjax url: " + f), $.ajax({data: e,url: f,dataType: "jsonp",success: function(a) {
                    console.log("success:  " + JSON.stringify(a)), b && "function" == typeof b && b(a)
                },error: function(a) {
                    console.log("error: " + JSON.stringify(a)), b && "function" == typeof b && b(g)
                }})
        },appInfoCheck: function(a) {
            var b = ["AndroidPhone", "AndroidPad", "iPhone", "iPad", "WindowsPhone", "WindowsPad"];
            if (a) {
                var c = a.name && "sohuVideo" === a.name ? !0 : !1, d = a.clientType && -1 !== $(b).indexOf(a.clientType) ? !0 : !1, e = a.clientVer ? !0 : !1;
                if (c && d && e)
                    return !0
            }
            return !1
        },getAppInfo: function(a) {
            var b = this, c = Storage.get("localAppInfo");
            if (console.log("localAppInfo ", c), c && c.time && Date.now() - c.time < this.maxEffectiveTime)
                "function" == typeof a && a(c);
            else {
                var d = {};
                d.sch = "svawebsocket", Action.sendWebAction(d, null, function(c) {
                    b.appInfoCheck(c) ? (c.time = Date.now(), Storage.set("localAppInfo", c)) : c = null, "function" == typeof a && a(c)
                })
            }
        }};
    Action.init(), onDomReady(Action.bindAction), window.Action = Action, svp.playInClient = function(a) {
        var b = {param: {conDom: null,settings: null,firstLoadFlag: !0},model: {videoData: null,channeled: Action.appChanneled,urlParam: {}},view: {},ctrl: {}}, c = b.param, d = b.model, e = b.view, f = b.ctrl;
        c.init = function(a) {
            $.isUndefined(a.parentDom) || 0 === $(a.parentDom).length || (c.conDom = $(a.parentDom)), $.isUndefined(a.settings) || (c.settings = a.settings)
        }, d.init = function(a) {
            return $.isUndefined(a.videoData) ? !1 : (d.videoData = a.videoData, $.isUndefined(a.channeled) && (d.channeled = a.channeled), d.urlParam = URL.getQueryData(location.search.substring(1)), !0)
        }, d.getClientUrl = function(a) {
            var b = URL.getQueryData(location.search.substring(1));
            (b.clientType || "1" === b.startClient) && (a.scheme = "sohuvideo");
            var c = Action.makeActionUrl(a);
            return c
        }, e.download = function() {
            var a = [];
            return a.push('<div class="appdl_download2">'), a.push('<div class="msg_block">'), a.push('<span class="msg">体验高清视频,请使用</span>'), a.push('<a href="javascript:void(0);" class="actionLink">搜狐视频客户端</a>'), a.push("</div>"), a.push("</div>"), a.join("")
        }, f.init = function(a) {
            if (c.init(a), d.init(a)) {
                null !== c.conDom && $(c.conDom).append(e.download());
                var a = Action.parserAttributes();
                a.action = 1.1, Action.sendAction(a), c.firstLoadFlag && (c.firstLoadFlag = !1), setTimeout(function() {
                    VideoTrace.realVV(+new Date)
                }, 200)
            }
        }, f.init(a)
    }
}(svp), function() {
    "use strict";
    var a = {param: {conTagName: "header",menuBtnClass: "js_nav_btn",menuConClass: "js_nav",maskLayerId: "js_nav_maskLayer",conDom: null,isQQBrowser: !1,isUCBrowser: !1,urls: {search: "http://api.tv.sohu.com/v4/search/hint2.json",searchGoto: "http://m.tv.sohu.com/so"}},model: {},view: {},ctrl: {}}, b = a.param, c = a.view, d = a.ctrl, e = "ontouchstart" in window ? "touchstart mousedown" : "mousedown", f = "ontouchstart" in window ? "touchend touchcancel" : "mouseup";
    b.init = function() {
        if (b.conDom = $(b.conTagName), 0 === b.conDom.length)
            return !1;
        var a = navigator.userAgent;
        return b.isUCBrowser = /UCBrowser/i.test(a), b.isQQBrowser = /MQQBrowser/i.test(a), !0
    }, c.maskLayer = function() {
        var a = [];
        return a.push('<div id="' + b.maskLayerId + '" class="nav_masklayer"></div>'), a.join("")
    }, d.init = function() {
        b.init() && (0 === $("#" + b.maskLayerId).length && b.conDom.append(c.maskLayer()), d.eventInit())
    }, d.maskLayerHandle = function(a) {
        "undefined" != typeof a && "show" === a ? $("#" + b.maskLayerId).css("display", "block") : $("#" + b.maskLayerId).css("display", "none")
    }, d.hideNav = function() {
        $("." + b.menuConClass).removeClass("show"), b.conDom.removeClass("nav_active"), (b.isQQBrowser || b.isUCBrowser) && setTimeout(function() {
            $("video").show()
        }, 300)
    }, d.showNav = function() {
        (b.isQQBrowser || b.isUCBrowser) && ($("video").length > 0 && $("video")[0].pause(), $("video").hide()), ClickTrace.pingback(null, "link_channel"), "none" === $("." + b.menuConClass).css("display") ? ($("." + b.menuConClass).css("display", "block"), setTimeout(function() {
            $("." + b.menuConClass).addClass("show")
        }, 100)) : $("." + b.menuConClass).addClass("show"), b.conDom.hasClass("search_active") && b.conDom.removeClass("search_active"), b.conDom.addClass("nav_active")
    }, d.eventInit = function() {
        var a = d.process;
        $("." + b.menuBtnClass).on("click", function() {
            return a.navShowOrHide(), !1
        }), $("#" + b.maskLayerId).on("click", function() {
            return a.maskLayerClick(), !1
        }), $("#" + b.maskLayerId).on("touchmove", function() {
            return !1
        }), $("." + b.menuConClass + " a").on(e, function() {
            a.domFocus(this)
        }), $("." + b.menuConClass + " a").on(f, function() {
            a.domBlur()
        }), $("." + b.menuConClass + " a").on("click", function() {
            var a = $(this).attr("position");
            console.log("发送行为统计点: " + a), ClickTrace.pingback(null, a)
        })
    }, d.process = {}, d.process.domFocus = function(a) {
        $("." + b.menuConClass + " a").removeClass("active"), $(a).addClass("active")
    }, d.process.domBlur = function() {
        $("." + b.menuConClass + " a").removeClass("active")
    }, d.process.navShowOrHide = function() {
        b.conDom.hasClass("nav_active") ? (d.hideNav(), d.maskLayerHandle("hide")) : (d.showNav(), d.maskLayerHandle("show"))
    }, d.process.maskLayerClick = function() {
        d.hideNav(), d.maskLayerHandle("hide")
    }, $(document).ready(function() {
        d.init()
    })
}(), function() {
    "use strict";
    var a = {param: {conTagName: "header",menuBtnClass: "js_nav_btn",maskLayerId: "js_nav_maskLayer",seracConClass: "js_nav_search",serachListConClass: "js_search_list",searchCancelBtnClass: "js_search_cancel",conDom: null,inputDom: null,serchFocusInterval: null,isFocus: !1,isSearchPage: !1,maxShowSize: 3,isQQBrowser: !1,isUCBrowser: !1,urls: {search: "http://api.tv.sohu.com/v4/search/hint2.json",searchGoto: "/so"}},model: {curKey: "none",hotsWordsList: [],curSearchList: []},view: {},ctrl: {}}, b = a.param, c = a.model, d = a.view, e = a.ctrl, f = "ontouchstart" in window ? "touchstart" : "mousedown", g = "ontouchstart" in window ? "touchend" : "mouseup";
    b.init = function() {
        if (b.conDom = $(b.conTagName), 0 === b.conDom.length || 0 === $("." + b.seracConClass).length)
            return !1;
        if (b.inputDom = $("." + b.seracConClass + " input"), 0 === b.inputDom.length)
            return !1;
        "undefined" != typeof Search && "function" == typeof Search.find && (b.isSearchPage = !0);
        var a = navigator.userAgent;
        return b.isUCBrowser = /UCBrowser/i.test(a), b.isQQBrowser = /MQQBrowser/i.test(a), !0
    }, c.search = function(a, c) {
        $.ajax({url: b.urls.search,data: a,dataType: "jsonp",success: c,error: c})
    }, c.searchProcess = function(a) {
        var b = [];
        return "undefined" != typeof a && 200 === a.status && "undefined" != typeof a.data && a.data.suggests instanceof Array && $.each(a.data.suggests, function(a, c) {
            "undefined" != typeof c.keyword && b.push(c.keyword)
        }), b
    }, c.hotsWordsProcess = function(a) {
        var b = [];
        return a instanceof Array && $.each(a, function(a, c) {
            "undefined" != typeof c.tv_name && b.push(c.tv_name)
        }), b
    }, d.main = function() {
        var a = [];
        return a.push('<ul class="serach_list ' + b.serachListConClass + '"></ul>'), a.join("")
    }, d.maskLayer = function() {
        var a = [];
        return a.push('<div id="' + b.maskLayerId + '" class="nav_masklayer"></div>'), a.join("")
    }, d.serachList = function(a, c) {
        var d = [];
        return "undefined" != typeof c && "hots" === c && 0 !== a.length && d.push('<li class="hots-title"><span>热搜词</span></li>'), $.each(a, function(a, c) {
            return a >= b.maxShowSize ? !1 : void d.push("<li>" + c + "</li>")
        }), d.join("")
    }, e.init = function() {
        if (b.init()) {
            0 === $("#" + b.maskLayerId).length && b.conDom.append(d.maskLayer()), 0 === $("." + b.serachListConClass).length && b.conDom.append(d.main());
            var a = URL.getQueryString("wd");
            if (b.inputDom.val(null !== a && "" !== a ? a : ""), b.isSearchPage) {
                b.conDom.addClass("search_active");
                var c, f = $("header").width() || 0;
                if (500 >= f) {
                    var g = $("." + b.searchCancelBtnClass).width() || 0;
                    c = f - g - 25, $("." + b.seracConClass).width(c)
                }
            }
            e.eventInit(), e.process.resize()
        }
    }, e.getHotsWords = function(a) {
        if ("function" == typeof a)
            if (c.hotsWordsList.length > 0)
                a(c.hotsWordsList);
            else {
                var b = window.hotsData || null, d = c.hotsWordsProcess(b);
                c.hotsWordsList = d, a(d)
            }
    }, e.isHotKey = function(a) {
        var b = !1;
        return "string" == typeof a && (a = a.replace(/\s*\r*\n*/gi, ""), $.each(c.hotsWordsList, function(c, d) {
            return d === a ? (b = !0, !1) : void 0
        })), b
    }, e.search = function(a) {
        if ("string" == typeof a && b.isFocus)
            if (a = a.replace(/\s*\r*\n*/gi, ""), c.curKey !== a)
                if (c.curKey = a, "" === a)
                    e.getHotsWords(function(a) {
                        e.updateSearchList(a, "hots")
                    });
                else {
                    var d = {};
                    d.api_key = "a1d4937798c1234bc5a14a4b185f493e", d.key = a, c.search(d, function(a) {
                        var b = c.searchProcess(a);
                        c.curSearchList = b, e.updateSearchList(b)
                    })
                }
            else
                e.updateSearchList()
    }, e.gotoSearchPage = function(a) {
        "undefined" != typeof a && (a = (a + "").replace(/\s*\r*\n*/gi, ""), e.process.inputBlur(), "" === a && (a = b.inputDom.attr("data-defVal")), b.isSearchPage && "undefined" != typeof Search ? (Search.find({key: a}), b.inputDom.val(a)) : setTimeout(function() {
            b.inputDom.val(""), window.location.href = b.urls.searchGoto + "?wd=" + encodeURIComponent(a)
        }, 50)), b.inputDom[0].blur()
    }, e.updateSearchList = function(a, c) {
        "undefined" != typeof a && $("." + b.serachListConClass).html(d.serachList(a, c)), "" !== $("." + b.serachListConClass).html() ? e.showSearchList() : e.hideSearchList()
    }, e.showSearchList = function() {
        e.process.domBlur(), "" !== $("." + b.serachListConClass).html() && ((b.isQQBrowser || b.isUCBrowser) && ($("video").length > 0 && $("video")[0].pause(), $("video").hide()), $("." + b.seracConClass).addClass("show"), $("." + b.serachListConClass).addClass("show"))
    }, e.hideSearchList = function() {
        $("." + b.seracConClass).removeClass("show"), $("." + b.serachListConClass).removeClass("show"), (b.isQQBrowser || b.isUCBrowser) && setTimeout(function() {
            $("video").show()
        }, 300)
    }, e.maskLayerHandle = function(a) {
        "undefined" != typeof a && "show" === a ? $("#" + b.maskLayerId).css("display", "block") : $("#" + b.maskLayerId).css("display", "none")
    }, e.setCursorLocation = function() {
        var a = b.inputDom[0], c = b.inputDom.val().length;
        setTimeout(function() {
            if (a.focus(), a.createTextRange) {
                var b = a.createTextRange();
                b.moveStart("character", c), b.collapse(), b.select()
            } else
                a.setSelectionRange && a.setSelectionRange(c, c)
        }, 500)
    }, e.eventInit = function() {
        var a = e.process;
        $("#" + b.maskLayerId).on("click", function() {
            return a.inputBlur(), !1
        }), $("." + b.seracConClass + " em").on("click", function() {
            a.searchFocus()
        }), b.inputDom.on("blur", function() {
        }), b.inputDom.on("focus", function() {
            a.searchFocus()
        }), $("." + b.searchCancelBtnClass).on("click", function() {
            return a.cancel(), !1
        }), $("." + b.serachListConClass).on(f, "li", function() {
            return a.domFocus(this), !1
        }), $("." + b.serachListConClass).on("touchcancel", "li", function() {
            return a.domBlur(), !1
        }), $("." + b.serachListConClass).on(g, "li", function() {
            return a.searchItemClick(this), !1
        }), $(window).on("resize", function() {
            a.resize()
        }), window.document.onPropertyChange && b.inputDom.on("propertychange", function() {
            a.updateSearchList(this)
        }), $(document).on("keydown", function(b) {
            a.keydown(b)
        })
    }, e.process = {}, e.process.resize = function() {
        if ($(window).width() > 540) {
            var a = $("." + b.seracConClass).offset().left;
            $("." + b.serachListConClass).css({left: a}), b.maxShowSize = 5
        } else {
            if ($("." + b.serachListConClass).css({left: 0}), b.isSearchPage) {
                b.conDom.addClass("search_active");
                var c, d = $("header").width() || 0;
                if (500 >= d) {
                    var e = $("." + b.searchCancelBtnClass).width() || 0;
                    c = d - e - 25, $("." + b.seracConClass).width(c)
                }
            }
            b.maxShowSize = 3
        }
    }, e.process.cancel = function() {
        b.isSearchPage ? window.history.go(-1) : e.process.inputBlur()
    }, e.process.searchFocus = function() {
        ClickTrace.pingback(null, "search_click"), b.conDom.hasClass("nav_active") && b.conDom.removeClass("nav_active"), e.process.inputFocus()
    }, e.process.keydown = function(a) {
        if (b.isFocus && a && 13 === a.keyCode) {
            var c = b.inputDom.val();
            e.gotoSearchPage(c)
        }
    }, e.process.searchItemClick = function(a) {
        if (a = $(a), !a.hasClass("hots-title")) {
            var b = a.html(), c = e.isHotKey(b);
            c ? ClickTrace.pingback(null, "search_hot") : ClickTrace.pingback(null, "search_relation"), e.gotoSearchPage(b)
        }
    }, e.process.updateSearchList = function(a) {
        e.search($(a).val())
    }, e.process.inputBlur = function() {
        b.isSearchPage || (b.conDom.removeClass("search_active"), $("." + b.seracConClass).css({width: "auto"})), b.inputDom[0].blur(), b.isFocus = !1, e.hideSearchList(), e.maskLayerHandle("hide"), clearInterval(b.serchFocusInterval)
    }, e.process.inputFocus = function() {
        e.setCursorLocation(), b.conDom.addClass("search_active");
        var a, c = $("header").width() || 0;
        if (b.isFocus = !0, 500 >= c) {
            var d = $("." + b.searchCancelBtnClass).width() || 0;
            a = c - d - 25, $("." + b.seracConClass).width(a)
        }
        e.maskLayerHandle("show"), window.document.onPropertyChange || (b.serchFocusInterval = setInterval(function() {
            e.process.updateSearchList(b.inputDom)
        }, 500))
    }, e.process.domFocus = function(a) {
        a = $(a), a.hasClass("hots-title") || ($("." + b.serachListConClass + " li").removeClass("active"), a.addClass("active"))
    }, e.process.domBlur = function() {
        $("." + b.serachListConClass + " li").removeClass("active")
    }, $(document).ready(function() {
        e.init()
    })
}(), WeixinJS = "undefined" == typeof WeixinJS ? {} : WeixinJS, WeixinJS.hideOptionMenu = function() {
    "undefined" != typeof WeixinJSBridge && document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.call("hideOptionMenu")
    })
}, WeixinJS.hideToolbar = function() {
    "undefined" != typeof WeixinJSBridge && document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.call("hideToolbar")
    })
};
var getVideoMetaData = function() {
    for (var a = document.getElementsByTagName("meta"), b = {}, c = 0; c < a.length; c++) {
        var d = a[c].getAttribute("name"), e = a[c].getAttribute("property"), f = a[c].getAttribute("content") || "";
        (null == d || void 0 == d || 0 == d.length) && (d = e), null != d && void 0 != d && 0 != d.length && (b[d] = f)
    }
    return b
};
WeixinJS.getVideoMetaData = window.getVideoMetaData = getVideoMetaData;
var videoMetaData = getVideoMetaData();
WeixinJS.dataForWeixin = {appId: "wxb6c82517aa33d525",MsgImg: videoMetaData["og:image"] || "http://css.tv.itc.cn/global/images/nav1/logo.gif",TLImg: videoMetaData["og:image"] || "http://css.tv.itc.cn/global/images/nav1/logo.gif",url: videoMetaData["og:url"] || encodeURIComponent(window.location.href),imgWidth: videoMetaData["og:imgWidth"] || "120",imgHeight: videoMetaData["og:imgHeight"] || "120",title: videoMetaData["og:title"] || document.getElementsByTagName("title")[0].text.split(" ")[0] || "",desc: videoMetaData.description || document.getElementsByTagName("title")[0].text.split(" ")[0] || "",callback: function() {
    }}, function() {
    var a = function() {
        if ("undefined" != typeof WeixinJSBridge) {
            var a = WeixinJS.dataForWeixin;
            if ("undefined" != typeof a) {
                var b = a.title;
                b.indexOf("搜狐视频") > -1 || (b += "-搜狐视频", a.title = b), WeixinJSBridge.on("menu:share:appmessage", function() {
                    WeixinJSBridge.invoke("sendAppMessage", {appid: a.appId,img_url: a.MsgImg,img_width: a.imgWidth,img_height: a.imgHeight,link: a.url,desc: a.desc,title: a.title}, function(b) {
                        "send_app_msg:ok" == b.err_msg && console.log(b.err_msg), a.callback()
                    })
                }), WeixinJSBridge.on("menu:share:timeline", function() {
                    a.callback(), WeixinJSBridge.invoke("shareTimeline", {img_url: a.TLImg,img_width: a.imgWidth,img_height: a.imgHeight,link: a.url,desc: a.desc,title: a.title}, function(a) {
                        "share_timeline:ok" == a.err_msg && console.log(a.err_msg)
                    })
                }), WeixinJSBridge.on("menu:general:share", function(b) {
                    var c = "#分享视频#" + a.title;
                    IsIOS && (c += a.url), b.generalShare({type: "video",content: c,title: a.title,desc: a.desc,img_url: a.TLImg,img_width: a.imgWidth,img_height: a.imgHeight,link: a.url,data_url: a.url}, function(a) {
                        WeixinJSBridge.log(a.err_msg)
                    })
                }), WeixinJSBridge.on("menu:share:weibo", function() {
                    WeixinJSBridge.invoke("shareWeibo", {content: a.title,url: a.url}, function(b) {
                        "share_weibo:ok" == b.err_msg && console.log(b.err_msg), a.callback()
                    })
                })
            }
        }
    };
    document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", a, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", a), document.attachEvent("onWeixinJSBridgeReady", a))
}();
