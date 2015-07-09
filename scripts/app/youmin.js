if (typeof deconcept == "undefined")
    var deconcept = new Object;
typeof deconcept.util == "undefined" && (deconcept.util = new Object),
typeof deconcept.SWFObjectUtil == "undefined" && (deconcept.SWFObjectUtil = new Object)

deconcept.SWFObject = function(e, t, n, r, i, s, o, u, a, f) {
    if (!document.getElementById)
        return;
    this.DETECT_KEY = f ? f : "detectflash",
     this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY), 
     this.params = new Object,
      this.variables = new Object,
       this.attributes = new Array,
        e && this.setAttribute("swf", e),
         t && this.setAttribute("id", t),
          n && this.setAttribute("width", n),
           r && this.setAttribute("height", r),
            i && this.setAttribute("version",
             new deconcept.PlayerVersion(i.toString().split("."))),
              this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion(),
               !window.opera && document.all && this.ins\talledVer.major > 7 && (deconcept.SWFObject.doPrepUnload = !0),
                s && this.addParam("bgcolor", s);
    var l = o ? o : "high";
    this.addParam("quality", l),
    this.setAttribute("useExpressInstall", !1),
    this.setAttribute("doExpressInstall", !1);
    var c = u ? u : window.location;
    this.setAttribute("xiRedirectUrl", c),
    this.setAttribute("redirectUrl", ""),
    a && this.setAttribute("redirectUrl", a)
};
deconcept.SWFObject.prototype = {
    useExpressInstall: function(e) {
        this.xiSWFPath = e ? e : "expressinstall.swf";
        this.setAttribute("useExpressInstall", !0);
    },
    setAttribute: function(e, t) {
        this.attributes[e] = t
    },
    getAttribute: function(e) {
        return this.attributes[e]
    },
    addParam: function(e, t) {
        this.params[e] = t
    },
    getParams: function() {
        return this.params
    },
    addVariable: function(e, t) {
        this.variables[e] = t
    },
    getVariable: function(e) {
        return this.variables[e]
    },
    getVariables: function() {
        return this.variables
    },
    getVariablePairs: function() {
        var e = new Array,
            t, n = this.getVariables();
        for (t in n)
            e[e.length] = t + "=" + n[t];
        return e
    },
    getSWFHTML: function() {
        var e = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "PlugIn"), this.setAttribute("swf", this.xiSWFPath)),
            e = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '"', e += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var t = this.getParams();
            for (var n in t)
                e += [n] + '="' + t[n] + '" ';
            var r = this.getVariablePairs().join("&");
            r.length > 0 && (e += 'flashvars="' + r + '"'), e += "/>"
        } else {
            this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "ActiveX"), this.setAttribute("swf", this.xiSWFPath)), e = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">', e += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            var i = this.getParams();
            for (var n in i)
                e += '<param name="' + n + '" value="' + i[n] + '" />';
            var s = this.getVariablePairs().join("&");
            s.length > 0 && (e += '<param name="flashvars" value="' + s + '" />'), e += "</object>"
        }
        return e
    },
    write: function(e) {
        if (this.getAttribute("useExpressInstall")) {
            var t = new deconcept.PlayerVersion([6, 0, 65]);
            this.installedVer.versionIsValid(t) && !this.installedVer.versionIsValid(this.getAttribute("version")) && (this.setAttribute("doExpressInstall", !0), 
                this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl"))), document.title = document.title.slice(0, 47) + " - Flash Player Installation",
                 this.addVariable("MMdoctitle", document.title))
        }
        if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
            var n = typeof e == "string" ? document.getElementById(e) : e;
            return n.innerHTML = this.getSWFHTML(), !0
        }
        return this.getAttribute("redirectUrl") != "" && document.location.replace(this.getAttribute("redirectUrl")), !1
    }
}, deconcept.SWFObjectUtil.getPlayerVersion = function() {
    var e = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var t = navigator.plugins["Shockwave Flash"];
        t && t.description && (e = new deconcept.PlayerVersion(t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")))
        //"Shockwave Flash 17.0 r0" --> 17, 0, 0
        //
    } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
        var n = 1,
            r = 3;
        while (n)
            try {
                r++, n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + r), e = new deconcept.PlayerVersion([r, 0, 0])
            } catch (i) {
                n = null
            }
    } else {
        try {
            var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
        } catch (i) {
            try {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                e = new deconcept.PlayerVersion([6, 0, 21]), n.AllowScriptAccess = "always"
            } catch (i) {
                if (e.major == 6)
                    return e
            }
            try {
                n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (i) {}
        }
        n != null && (e = new deconcept.PlayerVersion(n.GetVariable("$version").split(" ")[1].split(",")))
    }
    return e
}, 

deconcept.PlayerVersion = function(e) {
    this.major = e[0] != null ? parseInt(e[0]) : 0,
    this.minor = e[1] != null ? parseInt(e[1]) : 0, 
    this.rev = e[2] != null ? parseInt(e[2]) : 0
}, 
deconcept.PlayerVersion.prototype.versionIsValid = function(e) {
    return this.major < e.major ? !1 : this.major > e.major ? !0 : this.minor < e.minor ? !1 : this.minor > e.minor ? !0 : this.rev < e.rev ? !1 : !0
}, 
deconcept.util = {
    getRequestParameter: function(e) {
        var t = document.location.search || document.location.hash;
        if (e == null)
            return t;
        if (t) {
            var n = t.substring(1).split("&");
            for (var r = 0; r < n.length; r++)
                if (n[r].substring(0, n[r].indexOf("=")) == e)
                    return n[r].substring(n[r].indexOf("=") + 1)
        }
        return ""
    }
}, 

deconcept.SWFObjectUtil.cleanupSWFs = function() {
    var e = document.getElementsByTagName("OBJECT");
    for (var t = e.length - 1; t >= 0; t--) {
        e[t].style.display = "none";
        for (var n in e[t])
            typeof e[t][n] == "function" && (e[t][n] = function() {})
    }
}, deconcept.SWFObject.doPrepUnload && (deconcept.unloadSet || (deconcept.SWFObjectUtil.prepUnload = function() {
    __flash_unloadHandler = function() {}, __flash_savedUnloadHandler = function() {}, window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs)
}, window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload), deconcept.unloadSet = !0)), !document.getElementById && document.all && (document.getElementById = function(e) {
    return document.all[e]
});
var getQueryParamValue = deconcept.util.getRequestParameter,
    FlashObject = deconcept.SWFObject,
    SWFObject = deconcept.SWFObject;
(function(e) {
    e.fn.GamerSkyPlayer = function(t) {
        var n = {
            height: "428",
            width: "690",
            videoSource: "span.vd"
        };
        return t && e.extend(n, t), this.each(function() {
            var t = e(this);
            e(n.videoSource).click(function(t) {
                e(this).parent().addClass("vd"), e(this).parent().addClass("bj2"), e(this).parent().removeClass("clr"), e(this).parent().siblings("li").removeClass("vd"), e(this).parent().siblings("li").removeClass("bj2"), e(this).parent().siblings("li").addClass("clr");
                var r = e(this).attr("data-sitename"),
                    i = e(this).attr("data-vid"),
                    s = e(this).attr("data-source");
                s || (s = "");
                var o = "",
                    u = "",
                    a = !1,
                    f = "";
                switch (r) {
                    case "youku":
                        u = "http://static.youku.com/v1.0.0222/v/swf/player.swf?VideoIDS=" + i, o += "&isShowRelatedVideo=false&amp;showAd=0&amp;show_pre=1&amp;show_next=1&amp;VideoIDS=" + i + "&amp;isAutoPlay=true&amp;isDebug=false&amp;UserID=&amp;winType=interior&amp;playMovie=true&amp;RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999", a = !0, f = "http://player.youku.com/embed/" + i;
                        break;
                    case "tudou":
                        var l = /^\d+$/;
                        o = "tvcCode=-1&hd=2", u = "http://tudou.com/v/" + i + "/&autoPlay=true", i.indexOf("code:") >= 0 && (e.browser.msie ? e.browser.version == "6.0" || e.browser.version == "7.0" || e.browser.version == "8.0" || e.browser.version == "9.0" ? u = "http://tudou.com/v/" + i.replace("code:", "") + "/&autoPlay=true" : (a = !0, f = "http://www.tudou.com/programs/view/html5embed.action?code=" + i.replace("code:", "") + "&autoPlay=true") : (a = !0, f = "http://www.tudou.com/programs/view/html5embed.action?code=" + i.replace("code:", "") + "&autoPlay=true"));
                        break;
                    case "tudou2":
                        o = "tvcCode=-1&hd=2", u = "http://js.tudouui.com/bin/lingtong/PortalPlayer_60.swf?tvcCode=-1&hd=2&iid=" + i;
                        break;
                    case "ku6":
                        u = "http://player.ku6cdn.com/default/out/pv201109151705.swf?ver=108&vid=" + i + "&type=v&referer=";
                        break;
                    case "sina":
                        u = "http://p.you.video.sina.com.cn/swf/bokePlayer20130723_V4_1_42_21.swf?vid=" + i + "&clip_id=&imgurl=&auto=1&vblog=1&type=0&tabad=1&autoLoad=1&autoPlay=1&as=0&tjAD=0&tj=0&casualPlay=1&head=0&logo=0&share=0";
                        break;
                    case "qq":
                        u = "http://mat1.qq.com/news/act3/js/QQPlayer3.swf?vid=" + i + "&skin=http://mat1.qq.com/news/act3/js/skins/QQPlayerSkin.swf&autoplay=1";
                        break;
                    case "qq2":
                        u = "http://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?_v=20110829&vid=" + i + "&autoplay=1";
                        break;
                    case "pptv":
                        u = i.length > 13 ? "http://player.pptv.com/v/" + i + ".swf" : "http://player.pptv.com/cid/" + i + ".swf";
                        break;
                    case "sohu":
                    case "sohuvid":
                        u = "http://share.vrs.sohu.com/" + i + "/v.swf&skinNum=1&topBar=0&showRecommend=0&autoplay=true&api_key=e68e42f2beae6ba9ad6bd25e2653632f&fbarad=";
                        break;
                    case "sohuid":
                        u = "http://share.vrs.sohu.com/my/v.swf&topBar=1&id=" + i + "&autoplay=true&from=page";
                        break;
                    case "letv":
                        u = "http://i7.imgs.letv.com/player/swfPlayer.swf?id=" + i + "&autoplay=1&isPlayerAd=0";
                        break;
                    case "qingkong":
                        u = "http://donghua.dmzj.com/flvplayer.swf?file=http://v.qingkong.net/bp/a.php/" + i + ".mp4&autostart=true";
                        break;
                    case "cntv":
                        u = "http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId=" + i;
                        break;
                    case "56":
                        u = "http://player.56.com/v_" + i + ".swf/1030_ycc20060631.swf";
                        break;
                    case "iqiyi":
                        u = i.replace("&coop=测试&cid=", "") + "&cid=qc_105082_300395&autoplay=1&coop=coop_1010_ymxk" + "&source=" + s;
                        break;
                    case "17173":
                        u = "http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=" + i + "&refer=";
                        break;
                    case "ac":
                        u = "http://static.acfun.mm111.net/player/ACFlashPlayer.out.swf?type=page&url=http://www.acfun.tv/v/" + i;
                        break;
                    case "bi":
                        u = "http://static.hdslb.com/miniloader.swf?aid=" + i + "&page=1";
                        break;
                    default:
                        u = i
                }
                if (a) {
                    var c = '<iframe height="' + n.height + '" width="' + n.width + '" src="' + f + '" frameborder=0 allowfullscreen></iframe>';
                    r == "youku" ? (e.ajaxSetup({
                        cache: !0
                    }), e.getScript("http://player.youku.com/jsapi", function() {
                        player = new YKU.Player("gamersky_player_box", {
                            client_id: "6bfe5b183f11e7d9",
                            vid: i,
                            show_related: !1
                        })
                    })) : e("#gamersky_player_box").html(c)
                } else {
                    var h = new SWFObject(u, "gsvobject", n.width, n.height, "9.0.0", "#000000");
                    h.addParam("allowfullscreen", "true"),
                     h.addParam("allownetworking", "all"),
                      h.addParam("allowscriptaccess", "always"),
                       h.addParam("wmode", "opaque"),
                        h.addParam("quality", "high"),
                         h.addParam("flashvars", o),
                          h.write("gamersky_player_box")
                }
            }), e(n.videoSource + ":eq(0)").trigger("click")
        })
    }
})(jQuery),


function(e) {
    e.fn.VideoSeasonPage = function(t) {
        var n = {
            pageTitle: ".Page li",
            pageContent: ".Ds li",
            pageExtend: ".Extend"
        };
        return t && e.extend(n, t), this.each(function() {
            var t = e(this);
            t.find(n.pageTitle).mouseover(function() {
                e(this).hasClass("P1") && e(this).hasClass("P2")
            }).mouseout(function() {
                e(this).hasClass("P2") && e(this).attr("class", "P1")
            }), t.find(n.pageContent + ".Dss a span").mouseover(function() {
                e(this).hasClass("ds1") && e(this).attr("class", "fz ds2")
            }).mouseout(function() {
                e(this).hasClass("ds2") && e(this).attr("class", "fz ds1")
            }), t.find(n.pageTitle).click(function(r) {
                e(this).siblings("li").find("span.P3").removeClass("P3"), e(this).siblings("li").find("span").addClass("P1"), e(this).find("span.P1").removeClass("P1"), e(this).find("span").addClass("P3");
                var i = t.find(n.pageTitle).index(this);
                t.find(n.pageContent + ":eq(" + i + ")").removeClass("list1").addClass("list2"), t.find(n.pageContent + ":not(:eq(" + i + "))").removeClass("list2").addClass("list1")
            });
            var r = function() {
                    var e = t.find(".Page li").length,
                        n = window.location.href;
                    n = n.replace(/\?VideoAlbum=\d+/i, "");
                    var r = t.find("a[href$='" + n + "']").parent(),
                        i = t.find("ul.Ds li").index(r);
                    t.find(".Page li:eq(" + i + ")").trigger("click"), t.find("ul li span").attr("class", "fz ds1"), t.find("a[href$='" + n + "'] span").attr("class", "fz ds3");
                    var s = t.find("a[href$='" + n + "']");
                    s.parent().find("a[next='true']").remove(), s.parent().find("a[prev='true']").remove();
                    var o = s.parent().find("a").length,
                        u = s.parent().find("a").index(s),
                        a = parseInt(u / 8) + 1,
                        f = Math.floor(o / 8);
                    o % 8 > 0 && (f += 1);
                    if (a > 2 && f > 3) {
                        var l = (a - 2) * 8;
                        s.parent().find("a:lt(" + l + ")").hide()
                    }
                    a == f && t.find(".Page li:eq(" + (i + 1) + ")").length > 0 && s.parent().next().find("a:lt(8)").clone().appendTo(s.parent()).attr("next", "true"), a == 1 && t.find(".Page li:eq(" + (i - 1) + ")").length > 0 && s.parent().prev().find("a:gt(71)").clone().prependTo(s.parent()).attr("prev", "true"), f <= 3 && e <= 1 ? (t.find(".Extend").hide(), t.css("height", f * 32 + "px")) : (t.find(".Page").attr("class", "Page list2"), t.css("height", "144px"), t.find("ul.Ds").css("height", "96px"))
                },
                i = function() {
                    var e = window.location.href;
                    e = e.replace(/\?VideoAlbum=\d+/i, "");
                    var n = t.find("a[href$='" + e + "']");
                    n.parent().find("a").show()
                };
            t.find(".Extend").show(), t.find(".Extend").click(function(n) {
                var s = e(this).html() == "点击展开" ? "点击收起" : "点击展开";
                e(this).html(s), s == "点击收起" && (t.css("height", "auto"), t.find("ul.Ds").css("height", "auto"), t.find("a[next='true']").remove(), t.find("a[prev='true']").remove(), e.cookie("GamerSkyExtend", "1", {
                    path: "/"
                }), i()), s == "点击展开" && (e.cookie("GamerSkyExtend", "0", {
                    path: "/"
                }), r())
            }), r();
            var s = !1;
            e.cookie("GamerSkyExtend") && e.cookie("GamerSkyExtend") == "1" && (s = !0), s && t.find(".Extend").trigger("click")
        })
    }, e(document).ready(function() {
        e(".Diversity").VideoSeasonPage()
    }), e(document).ready(function() {
        var t = 0,
            n = 0;
        e("div").hasClass("ad2_2") == 1 && e(".ad2_2 ul li").each(function(t) {
            e(this).mouseover(function() {
                e(this).attr("class").indexOf("bj2") < 0 && e(this).attr("class", "vd bj1")
            }), e(this).mouseout(function() {
                e(this).attr("class").indexOf("bj2") < 0 && e(this).attr("class", "clr")
            })
        })
    })
}(jQuery),

function(e) {
    var t = "http://db2.gamersky.com/LabelJsonpAjax.aspx";
    e.fn.extend({
        supportMeInit: function(n) {
            return this.each(function() {
                var r = e.extend({
                        itemId: parseInt(e(this).attr("data-itemId")),
                        field: e(this).attr("data-field")
                    }, n),
                    i = e(this),
                    s = !1,
                    o = i.attr("data-table");
                o || (o = "PE_U_Video"), e.cookie("GamerSkySupport" + r.itemId) && (s = !0), s ? e("span.supportMe").css("cursor", "default") : e("span.supportMe").css("cursor", "pointer");
                var u = {
                    type: "updatelabel",
                    labelname: "读取支持反对率",
                    attr: {
                        itemId: r.itemId,
                        field: r.field,
                        tableName: o
                    }
                };
                e.ajax({
                    type: "GET",
                    url: t,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(u)
                    },
                    success: function(e) {
                        i.text(e.body)
                    }
                })
            })
        },
        supportMe: function(n) {
            return this.each(function() {
                var r = e(this),
                    i = e.extend({
                        itemId: parseInt(e(this).attr("data-itemId")),
                        field: e(this).attr("data-field")
                    }, n),
                    s = r.attr("data-table");
                s || (s = "PE_U_Video");
                var o = r.attr("data-auto");
                if (o && o == "true") {
                    var u = {
                        type: "updatelabel",
                        labelname: "Digg统计",
                        attr: {
                            itemId: i.itemId,
                            field: i.field,
                            tableName: s
                        }
                    };
                    e.ajax({
                        type: "GET",
                        url: t,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(u)
                        },
                        success: function(e) {}
                    })
                }
                e(this).click(function(n) {
                    var o = !1;
                    e.cookie("GamerSkySupport" + i.itemId) && (o = !0);
                    if (o)
                        return;
                    e.cookie("GamerSkySupport" + i.itemId, 1, {
                        path: "/"
                    });
                    var u = {
                        type: "updatelabel",
                        labelname: "Digg统计",
                        attr: {
                            itemId: i.itemId,
                            field: i.field,
                            tableName: s
                        }
                    };
                    e.ajax({
                        type: "GET",
                        url: t,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(u)
                        },
                        success: function(e) {
                            r.supportMeInit()
                        }
                    })
                }), r.supportMeInit()
            })
        }
    })
}(jQuery),


function(e) {
    e.fn.VideoAlbum = function(t) {
        var n = {};
        t && e.extend(n, t);
        var r = function() {
            var e = {},
                t = window.location.search.substring(1),
                n = t.split("&");
            for (var r = 0; r < n.length; r++) {
                var i = n[r].split("=");
                if (typeof e[i[0]] == "undefined")
                    e[i[0]] = i[1];
                else if (typeof e[i[0]] == "string") {
                    var s = [e[i[0]], i[1]];
                    e[i[0]] = s
                } else
                    e[i[0]].push(i[1])
            }
            return e
        }();
        return this.each(function() {
            var t = e(this),
                n = t.attr("data-generalId"),
                i = t.attr("data-generalId").split(","),
                s = "0";
            r.hasOwnProperty("VideoAlbum") && (n = r.VideoAlbum), i.length > 0 && (s = i[i.length - 1]), e.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db2.gamersky.com/videoAlbum.aspx",
                data: {
                    id: n
                },
                success: function(n) {
                    if (n.hasOwnProperty("status"))
                        switch (n.status) {
                            default:
                        } else {
                        for (var r = 0; r < n.length; r++)
                            t.find(".ImgS_1 ul").append(('<li><a href="{$ArticleUrl}?VideoAlbum=' + s + '"><img src="{$ArticlePic}" width="170" height="95" />{$TitleOriginal}</a></li>').replace("{$ArticleUrl}", n[r].ArticleUrl).replace("{$ArticlePic}", n[r].ArticlePic).replace("{$TitleOriginal}", n[r].TitleOriginal));
                        videoAlbumInit();
                        var i = window.location.href,
                            o = e(".ImgS1_2").find("a[href*='" + i + "']");
                        o.parent().addClass("BF"), o.append(e('<div class="BF_1"></div><div class="BF_2">正在播放</div>'))
                    }
                }
            })
        })
    },

    e(document).ready(function() {
        var t = window.location.href,
            n = e(".ImgS1_2").find("a[href*='" + t + "']");

        n.parent().addClass("BF"),
        n.append(e('<div class="BF_1"></div><div class="BF_2">正在播放</div>')),
        e(".ImgS").VideoAlbum()
    })
}(jQuery),


function(e) {
    e(document).ready(function() {
        e(".playArea").GamerSkyPlayer({
            height: "428",
            width: "690",
            videoSource: "span.vd"
        })

        e(".Extend[rel='Intro'][isshowintromore='true']").show(),
        e(".Extend[rel='Intro'][isshowintromore='false']").hide(),
        e(".Extend[rel='Intro']").click(function(t) {
            var n = e(this).html() == "点击展开" ? "点击收起" : "点击展开";
            e(this).html(n), n == "点击展开" ? (e(".Content .Ct[rel!='IntroMore']").show(), e(".Content .Ct[rel='IntroMore']").hide()) : (e(".Content .Ct[rel!='IntroMore']").hide(), e(".Content .Ct[rel='IntroMore']").show())
        })

        e("span.supportMe").supportMe()
    })
}(jQuery)