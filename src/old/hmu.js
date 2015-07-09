
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
    var h = global.hmu = global.hmu || {};

    (function($) {
        if (!$) return;
        /** 
         * 当前版本号
         * @memberof hmu
         */
        h.version = '0.10';
        h.$doc = $(document);
        h.$win = $(window);
        h.hasTouch = 'ontouchstart' in window;
        /**
         * 当前navigator.userAgent
         * @memberof hmu
         * @return {Boolean}
         */
        h.UA = window.navigator.userAgent.toLowerCase();
        /**
         * isWeixin 返回当前是否在微信中打开
         * @memberof hmu
         * @return {Boolean}
         */
        h.isWeixin = function() {
            return h.UA.indexOf('micromessenger') > -1 ? true : false;
        }();

    })(window.Zepto);
    /**
     * 组件类
     * @memberof hmu
     * @namespace
     */
    h.widget = {};

})(this);