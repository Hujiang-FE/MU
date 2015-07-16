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
    function Widget(el, opts){
        this.$el = $(el);
        this.opts = opts;

        this.init();
    }

    Widget.prototype = {
        init: function(){

        },
        destory: function(){

        }
    };

    $.fn.widget = function(options){
        
    }

})();