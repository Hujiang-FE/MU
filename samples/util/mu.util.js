/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
(function(){
    'use strict';

    var core = {
        /**
         * 获取querystring
         * @param  {String} name
         * @return {String} 
         */
        getQueryString: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
                r = window.location.search.substr(1).match(reg);

            if (r !== null) return window.unescape(r[2]);
            return null;
        },
        /**
         * 阻止全局页面滚动
         */
        preventScroll: function() {
            document.addEventListener('touchmove', core._preventDefault, false);
        },
        /**
         * 回复全局页面滚动
         */
        recoverScroll: function() {
            document.removeEventListener('touchmove', core._preventDefault, false);
        },
        _preventDefault: function(e) {
            e.preventDefault();
        },
        /**
         * encode 内容
         * @param  {string} str 
         */
        htmlEncode: function(str) {
            var div = document.createElement('div'),
                text = document.createTextNode(str);
            div.appendChild(text);
            return div.innerHTML;
        },
        /**
         * decode 内容
         * @param  {string} str 
         */
        htmlDecode: function(str) {
            var div = document.createElement('div');
            div.innerHTML = str;
            return div.innerText;
        },
        /**
         * 获取元素的类型
         * @param  {any} o 目标对象
         * @return {string}   'string', 'object', 'number' etc;
         */
        getType: function(obj) {
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        },
        isNumber: function(){

        },
        /**
         * 深copy
         * @param  {array or object} obj 传入对象或数组
         * @return {object}
         */
        copy: function(obj) {
            var type = core.getType(obj),
                o = type === 'array' ? [] : {};

            if (type === 'array') {
                o = obj.slice(0);
            }
            for (var key in obj) {
                var _type = core.getType(obj[key]);
                o[key] = _type === 'object' || _type === 'array' ? core.copy(obj[key]) : obj[key];
            }
            return o;
        },
        /**
         * 动态加载样式
         * @param  {String} url 样式URL
         * @return 
         */
        requireCss: function(url){
            var node = document.createElement('link'),
                head = document.getElementsByTagName('head');

            node.type = 'text/css';
            node.rel = 'stylesheet';
            node.href = url;
            head = head.length ? head[0] : document.documentElement;
            head.appendChild(node);
        }
    };

    window.util = core;

})();