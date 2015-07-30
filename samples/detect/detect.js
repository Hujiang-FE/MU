/**
 * name: 
 * author: roeis
 * description: 
 */
(function(global, undefined){
    'use strict';

    //navigator 上输出所有信息，有用
    //
    //get a tap事件

    // 输出当前状态
    // 
    //
    //
    // isIOS
    // isAndroid
    // isUC
    // isQQ
    // isWeixin
    // isIphone
// detect.js

    var mu = global.mu || {};
    mu.detect = {
        isWeixin : function(){
            return mu.UA.indexOf('micromessenger') > -1 ? true : false;
        }(),
        isQQ: function(){

        }(),
        isAndroid: function(){

        }(),
        isIOS:function(){

        }(),

        isMeizu: function(){

        },
        ismqqbroswer: function(){
            
        }

    };


})(this);