/**
 * name:
 * author: roeis
 * description:
 */
(function() {
    'use strict';
    var mu = mu || {};
    window.mu  = mu;
    mu.util = {
        cutString: function(str, len) {
            var temp,
                icount = 0,
                patrn = /[^\x00-\xff]/,
                strre = '';
            for (var i = 0; i < str.length; i++) {
                if (icount < len - 1) {
                    temp = str.substr(i, 1);
                    if (patrn.exec(temp) === null) {
                        icount = icount + 1;
                    } else {
                        icount = icount + 2;
                    }
                    strre += temp;
                } else {
                    break;
                }
            }
            return strre + "...";
        },

        setCookie: function() {
            var d = new Date(),
                offset = 8,
                utc = d.getTime() + (d.getTimezoneOffset() * 60000),
                nd = utc + (3600000 * offset),
                exp = new Date(nd);
            exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString() + ';domain=360doc.com;';
        },

        getCookie: function() {

        },

        createCtor: function(){
            
        },

        /*
        1、< 60s, 显示为“刚刚”
        2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
        3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
        4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
        5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
        */
        timeFormat: function(time, now) {
            var date = new Date(time),
                curDate = now || Date.now(),
                year = date.getFullYear(),
                month = date.getMonth() + 10,
                day = date.getDate(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                curYear = curDate.getFullYear(),
                curHour = curDate.getHours(),
                timeStr;

            if (year < curYear) {
                timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
            } else {
                var pastTime = curDate - date,
                    pastH = pastTime / 3600000;

                if (pastH > curHour) {
                    timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
                } else if (pastH >= 1) {
                    timeStr = '今天 ' + hour + ':' + minute + '分';
                } else {
                    var pastM = curDate.getMinutes() - minute;
                    if (pastM > 1) {
                        timeStr = pastM + '分钟前';
                    } else {
                        timeStr = '刚刚';
                    }
                }
            }
            console.log(timeStr);
            return timeStr;
        },

        // collection: is
        getType: function() {
            // return
        },
        isNumber: function() {

        },
        isArray: function() {

        },
        isString: function() {

        },
        isObject: function() {

        },
        isDate: function() {

        },
        timeOutInvoke: function(targetTime, now, invoke){
            if(now > targetTime){
                invoke && invoke();
            }
        }

    };

    mu.util.env = (function() {
        var os = {}, ua = navigator.userAgent,
            android = ua.match(/(Android)[\s\/]+([\d\.]+)/),
            ios = ua.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
            wp = ua.match(/(Windows\s+Phone)\s([\d\.]+)/),
            isWebkit = /WebKit\/[\d.]+/i.test(ua),
            isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(ua) && !/CriOS/i.test(ua) && !/MQQBrowser/i.test(ua))) : false;
        if (android) {
            os.android = true;
            os.version = android[2];
        }
        if (ios) {
            os.ios = true;
            os.version = ios[2].replace(/_/g, '.');
            os.ios7 = /^7/.test(os.version);
            if (ios[1] === 'iPad') {
                os.ipad = true;
            } else if (ios[1] === 'iPhone') {
                os.iphone = true;
                os.iphone5 = screen.height == 568;
            } else if (ios[1] === 'iPod') {
                os.ipod = true;
            }
        }
        if (wp) {
            os.wp = true;
            os.version = wp[2];
            os.wp8 = /^8/.test(os.version);
        }
        if (isWebkit) {
            os.webkit = true;
        }
        if (isSafari) {
            os.safari = true;
        }
        return os;
    })();

}());