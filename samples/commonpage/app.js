/**
 * -------------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.1.0
 * @author: roeis
 * @description: 
 * -------------------------------------------------------------
 */

(function($) {
    'use strict';

    var WIN_H = document.documentElement.clientHeight || window.innerHeight,
        option = {};

    var core = {
        init: function(opts){
            $.extend(option, opts);
            this.heightArr = [];
            this.resetData();
            console.log(this.heightArr);
            this.bind();
        },

        resetData: function(){
            var self = this;
            $('.page').each(function(index, ele){
                var height = $(ele).offset().top;
                self.heightArr.push({
                    scrollTop: height,
                    isTriggered: false
                });
            });
        },

        bind: function(){
            var self = this;
            mu.$win.on('scroll', function(){
                var scrollTop = mu.$win.scrollTop();
                
                self.triggerhandler(scrollTop, self.heightArr, function(index){
                    console.log(index);
                });

            });
        },

        triggerhandler: function(target, origin, callback){
            for(var i = origin.length - 1; i >= 0; i--){
                if(!origin[i].isTriggered && target > origin[i].scrollTop){
                    origin[i].isTriggered = true;
                    callback && callback(i+1);
                }
            }
        },

        isInView: function($obj, offset) {
            var objScroll = $obj.offset().top,
                winScroll = $(window).scrollTop() + WIN_H + (offset || 0);
            if (objScroll < winScroll) {
                return true;
            } else {
                return false;
            }
        },
    };

    core.init();

})(window.Zepto || window.jQuery);