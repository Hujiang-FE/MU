
(function(global) {
    'use strict';
    /**
     * Copyright (c) 2014 All rights reserved.
     * @version 1.0.0
     * @author roeis
     * @description 网站组mobile solution
     * @namespace
     * @global
     */
    var mu = global.mu = global.mu || {};

    (function($) {
        if (!$) return;
        /** 
         * 当前版本号
         * @memberof mu
         */
        mu.version = '0.10';
        mu.$doc = $(document);
        mu.$win = $(window);
        mu.hasTouch = 'ontouchstart' in window;
        /**
         * 当前navigator.userAgent
         * @memberof mu
         * @return {Boolean}
         */
        mu.UA = window.navigator.userAgent.toLowerCase();
        /**
         * isWeixin 返回当前是否在微信中打开
         * @memberof mu
         * @return {Boolean}
         */
        mu.isWeixin = function() {
            return mu.UA.indexOf('micromessenger') > -1 ? true : false;
        }();

    })(window.Zepto || window.jQuery);
    /**
     * 组件类
     * @memberof mu
     * @namespace
     */
    mu.widget = {};

})(this);