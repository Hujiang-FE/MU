/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: determine if scroll up or down and give invoke
 * -------------------------------------------------------------
 */

(function(global) {
    'use strict';

    var h = global.hmu || {},
        $ = global.Zepto;

    var options = {
        scrollDown: function() {},
        scrollUp: function() {},
        target: window,
    };
    var scroll_pre = 0,
        scroll_cur = 0,
        delta = 0;

    h.widget.updown = {

        init: function(opts) {
            options = $.extend(options, opts);

            $(options.target).on('scroll', function(){
                scroll_cur = $(options.target).scrollTop();
                delta = scroll_cur - scroll_pre;
                scroll_pre = scroll_cur;
                
                if(delta > 0) {
                    options.scrollDown.call(this);
                }else{
                    options.scrollUp.call(this);
                }
            });
        }
    };

})(this);