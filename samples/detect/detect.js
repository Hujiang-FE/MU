/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: common detect about useragent
 * --------------------------------------------------------
 */
(function(global, undefined){
    'use strict';
    //navigator 上输出所有信息，有用
    var mu = global.mu = global.mu || {};
    var ua = window.navigator.userAgent.toLowerCase();
    mu.detect = {
        isWeixin : /micromessenger/.test(ua),
        isAndroid: /android/.test(ua),
        isIOS:/iphone|ipad|itouch/.test(ua),
        isMeizu: /m[0-9x]{1,3}/.test(ua),
        isUC : /ucbrowser/.test(ua),
        isQQ : /qqbrowser/.test(ua),
        isWP : /windows phone/.test(ua)
    };

})(this);