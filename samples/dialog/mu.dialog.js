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

    function Dialog(el, options){
        this.$el = $(el);
        this.options = options;
        this.init();
    }

    Dialog.prototype = {
        init: function(){

        },
        pop: function(){

        },
        close: function(){

        }
    };

    var $bg = $('.mu-dialog-bglayer');

    $('.btn').on('click', function(){
        // $bg.addClass('in');
        $bg.oneTransitionEnd('in', function(){
            console.log('test');
        });
    });

    $bg.on('click', function(){

        $bg.removeClass('in').one(window.animationEvents.transitionEnd, function(){
            console.log('test2');
        });
    });


})(window.Zepto || window.jQuery);
