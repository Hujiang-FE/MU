/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
(function($){
    'use strict';
    function Widget(el, opts){
        this.$el = $(el);
        this.opts = opts;

        this.init();
    }

    Widget.prototype = {
        init: function(){

        },
        domReady: function(){

        },
        bindEvent: function(){

        },
        destory: function(){

        }
    };

    // Widget.pubic = function(){
    //     console.log('23');
    // };

    $.fn.widget = function(options){
        return this.each(function(){
            console.log(this, options);
            new Widget(this, options);
        });
    };

})(window.Zepto || window.jQuery);