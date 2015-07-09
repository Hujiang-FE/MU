(function(global) {
    "use strict";
    /** 
     * @namespace
     * @public
     */
    var hmu = global.hmu || {},
        $ = global.Zepto;

    /**
     * Copyright (c) 2014 All rights reserved.
     * @version 1.0.0
     * @author roeis
     * @description 常用方法集合
     * @memberof hmu
     * @namespace
     */
    hmu.util = {
        /**
         * 获取url上的参数
         * @param  {string} name 参数的KEY
         */
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
                r = window.location.search.substr(1).match(reg);

            if (r !== null) return unescape(r[2]);
            return null;
        },
        /**
         * 设置有前缀的css，
         * @param {object} $obj  目标对象
         * @param {string} para  css属性名
         * @param {string} value css属性值
         * @example hmu.util.setCss($('#t1'),'tranform', 'rotate(45deg)');
         */
        setCss: function($obj, para, value) {
            var css = [],
                vendor = ['webkit', 'moz', 'o', ''];

            for (var i = 0, l = vendor.length; i < l; i++) {
                css[i] = vendor[i] === '' ? para : '-' + vendor[i] + '-' + para;
                $obj.css(css[i], value);
            }
        },

        goBack: function(url) {
            var refer = document.referrer,
                href = window.location.href,
                hash = window.location.hash,
                domain = document.domain;

            if (!refer && !hash) {
                window.location = url;
            } else if (refer.indexOf(domain) > -1) {
                history.back();
            } else if (hash) {
                window.location.href = href.substring(0, href.indexOf("#"));
            }
        },
        /**
         * 阻止页面滚动
         * @example hmu.util.preventScroll();
         */
        preventScroll: function() {
            document.addEventListener('touchmove', hmu.util._preventDefault, false);
        },
        /**
         * 回复页面滚动
         * @example hmu.util.recoverScroll();
         */
        recoverScroll: function() {
            document.removeEventListener('touchmove', hmu.util._preventDefault, false);
        },
        _preventDefault: function(e) {
            e.preventDefault();
        },

        /**
         * 判断是否出现在窗口内
         * @param  {object}  $obj   目标对象
         * @param  {offset}  offset 附加值，比如50，出现窗口下面50时，即为true
         * @return {Boolean}
         */
        isInView: function($obj, offset) {
            var _scrollTop = $obj.offset().top,
                scrollTop = $(window).scrollTop() + $(window).height() + (offset || 0);
            if (_scrollTop < scrollTop) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * encode 内容
         * @param  {string} str 
         */
        htmlEncode: function(str) {
            var div = document.createElement("div"),
                text = document.createTextNode(str);
            div.appendChild(text);
            return div.innerHTML;
        },
        /**
         * decode 内容
         * @param  {string} str 
         */
        htmlDecode: function(str) {
            var div = document.createElement("div");
            div.innerHTML = str;
            return div.innerText;
        },

        scrollTop: function(obj) {
            var $top = $('.go-top');
            $(window).on('scroll.gotop', function() {
                var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

                if (scrollPos >= 100) {
                    $top.show();
                } else {
                    $top.hide();
                }
            });
        },
        /**
         * 返回当前浏览器对应的css动画回调
         * @return {object} animationend transitionend
         */
        animationEnd: function() {
            var body = document.body || document.documentElement,
                transEndEventNames = {
                    'WebkitTransition': ['webkitAnimationEnd','webkitTransitionEnd','webkitAnimationIteration'],
                    'MozTransition': ['mozAnimationEnd','mozTransitionEnd','mozAnimationiteration'],
                    'OTransition': ['oanimationend ','oTransitionEnd','oAnimationiteration'],
                    'transition': ['animationEnd','transitionend','animationiteration']
                };

            for (var name in transEndEventNames) {
                if (typeof body.style[name] === 'string') {
                    return {
                        animationend: transEndEventNames[name][0],
                        transitionend: transEndEventNames[name][1],
                        animationiteration: transEndEventNames[name][2]
                    };
                }
            }
        },
        /**
         * 获取元素的类型
         * @param  {any} o 目标对象
         * @return {string}   'string', 'object', 'number' etc;
         */
        getType: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
        },
        /**
         * 深copy
         * @param  {array or object} obj 传入对象或数组
         * @return {object}
         */
        copy: function(obj) {
            var type = hmu.util.getType(obj),
                o = type === 'array' ? [] : {};

            if (type === 'array') {
                o = obj.slice(0);
            }
            for (var key in obj) {
                var _type = hmu.util.getType(obj[key]);
                o[key] = _type === 'object' || _type === 'array' ? hmu.util.copy(obj[key]) : obj[key];
            }
            return o;
        },
        /**
         * 返回目标的原HTML
         * @param  {object} $obj 目标对象
         * @return {string}      
         */
        getOriginHtml: function($obj){
            var $o = $(document.createElement("div"));
            $o.html($obj.clone());
            return $o.html();
        }
    };

    if (global.doT) {
        var doT = global.doT;
        hmu.util.dotHtml = function(tmplid, data) {
            var template = $(tmplid).html();
            return doT.template(template).apply(null, [data]);
        };
    }

})(this);