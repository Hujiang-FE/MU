/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: new dialog component with animation css
 * not transition css
 * --------------------------------------------------------
 */
(function($){
    'use strict';

    // bg, fadeIn and fadeOut
    // main content
    //      fadeIn / fadeOut
    //      fadeInfromUp / fadeInToUp
    //      fadeScale
    //      fadeTranslate
    //      fadeRotate
    //      //
    //private methods, _setPosition, _show, _hide 
    //
    //public methods open, close

    function Dialog(el, options){
        this.$el = $(el);
        this.options = options;
        this.init();
    }
    var defaults = {
        isBgCloseable: true,   // 点击背景是否关闭弹窗
        showClass: 'fadeIn',
        closeClass: 'fadeOut',
        position: '',
        opacity: 0.75,
        beforeOpen: function(){},
        afterOpen: function(){},
        beforeClose: function(){},
        afterClose: function(){}
    };
    Dialog.prototype = {
        init: function(){
            this.options = $.extend({}, defaults, this.opts);
            this.opts = $.extend({}, defaults, this.opts);
            this._create();
            this._bind();
        },
        _create: function(){
            this.$bg = '';
            this.$dialog = '';
            this.isAnimating = false;
            this.isBgAnimating = false;
            this.isOpen = false;


        },
        _bind: function(){

        },
        open: function(){
            
        },
        close: function(){

        },
        _animation: function(){

        }
    };

    var $bg = $('.mu-dialog-bglayer'),
        $cont = $('.mu-dialog-modal');
    $('.btn').on('click', function(){
        // $bg.addClass('in');
        $bg.show().oneAnimationEnd('mu-fadeIn', function(){
            $bg.removeClass('mu-fadeIn');
            console.log('test');
        });
        $cont.show().oneAnimationEnd('mu-scaleUpIn', function(){
            $cont.removeClass('mu-scaleUpIn');
        });
    });

    $bg.on('click', function(){
        $bg.oneAnimationEnd('mu-fadeOut', function(){
            $bg.hide().removeClass('mu-fadeOut');
        });
        $cont.oneAnimationEnd('mu-scaleDownOut', function(){
            $cont.hide().removeClass('mu-scaleDownOut');
        });
    });

    window.MuDialog = Dialog;

    // $.fn.muDialog = function(options){

    // };


})(window.Zepto || window.jQuery);
