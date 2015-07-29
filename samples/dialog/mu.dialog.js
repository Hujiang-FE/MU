/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: new dialog component with animation css
 * not transition css
 * --------------------------------------------------------
 */
(function($) {
    'use strict';

    // private methods, _setPosition, _show, _hide 
    // public methods open, close
    //
    // extend Dialog to make confirm, dialog, tip, alert
    // with common style, change the default pop system
    // not support scroll element yet

    function Dialog(el, options) {
        this.$el = $(el);
        this.options = options;
        this.init();
    }

    var defaults = {
        isBgCloseable: true,                    // 点击背景是否关闭弹窗
        showClass: 'mu-scaleDownIn',            // 自定义进场动画
        closeClass: 'mu-scaleDownOut',          // 自定义出场动画
        classSet: false,                        // 样式组合
        isCenter: true,                     // custom
        zIndex: 3501,                           // 大于某一边界值
        opacity: 0.75,                          // 背景透明度
        beforeOpen: function() {},
        afterOpen: function() {},
        beforeClose: function() {},
        afterClose: function() {}
    };

    var $body = $(document.body),
        $bg = $(document.createElement('div')).addClass('mu-dialog-bglayer'),
        classSets = {
            'scaleUpIn': ['mu-scaleUpIn','mu-scaleDownOut'],
            'scaleDownIn': ['mu-scaleDownIn','mu-scaleDownOut'],
            'fadeIn':  ['mu-fadeIn','mu-fadeOut'],
            'fadeInUp':  ['mu-fadeInUp','mu-fadeOutDown'],
            // 'skewIn': ['mu-skewin','mu-skewout']     // descrepted cause of compatible
        };

    $body.append($bg);

    Dialog.prototype = {
        constructor: Dialog,
        init: function() {
            this.options = $.extend({}, defaults, this.options);
            this._create();
            this._bind();
        },

        _create: function() {
            this.$bg = $bg;
            // this.$dialog = $(document.createElement('div'));
            this.$dialog = this.$el;
            this.isOpen = false;
            
            this.$dialog.addClass('mu-dialog').show();
            // this.$dialog.append('<div class="mu-dialog-body"></div>');

            // this.$dialogBody = this.$dialog.find('.mu-dialog-body');
            // this.$dialog.append(this.$el);

            this.$dialog.css({
                'z-index' : this.options.zIndex
            });

            $body.append(this.$dialog);

            this._adjust();

            // change the class of dialog animation
            if (this.options.classSet && classSets[this.options.classSet]) {
                this.options.showClass = classSets[this.options.classSet][0];
                this.options.closeClass = classSets[this.options.classSet][1];
            }


        },

        // adjust the dialog's postion 
        // how configurable
        _adjust: function(){
            this._destroyAdjust();

            var height = this.$dialog.height();
            this.$dialog.css('height', height);

            if(this.options.isCenter){
                this.$dialog.css({
                    right: 0,
                    bottom: 0,
                    margin: 'auto'
                });
            }
        },
        
        _destroyAdjust: function(){
            this.$dialog.css({
                'height': 'auto',
                'bottom': 'auto'
            });
        },

        _bind: function() {
            // event bind
            if (this.options.isBgCloseable) {
                this.$bg.on('click', $.proxy(function() {
                    this.close();
                }, this));
            }
        },

        html: function(html){
            this.$dialog.html(html);
            this._adjust();
        },

        open: function() {
            if (this.isOpen) return;
            this.isOpen = true;

            this.options.beforeOpen.call(this);

            this._show(this.$dialog, this.options.showClass, $.proxy(function() {
                this.options.afterOpen.call(this);
            }, this));

            this._show(this.$bg, 'mu-fadeIn');
        },

        close: function() {
            if (!this.isOpen) return;
            this.isOpen = false;

            this.options.beforeClose.call(this);

            this._hide(this.$dialog, this.options.closeClass, $.proxy(function() {
                this.options.afterClose.call(this);
            }, this));

            this._hide(this.$bg, 'mu-fadeOut');
        },

        // require $.fn.oneAnimationEnd
        // encapsulate two functions that handle showing and closing the dialog
        // with css3 animation end callback
        // !important : change the property from display to visibility
        // when the dialog is unvisible, its properties still can be read
        // such as height, width etc;
        _show: function($obj, cls, callback) {
            $obj.addClass('mu-visible').oneAnimationEnd(cls, function() {
                $obj.removeClass(cls);
                callback && callback();
            });
        },
        _hide: function($obj, cls, callback) {
            $obj.oneAnimationEnd(cls, function() {
                $obj.removeClass('mu-visible').removeClass(cls);
                callback && callback();
            });
        }
    };
    
    window.Dialog = Dialog;

    $.fn.dialog = function(options){
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
            var $this = $(this),
                instance = $.fn.dialog.instances[$this.data('dialog')];

            if (!instance) {
                //cache the instance , use $.data in jquery, but in zepto data function is not fully supperted
                $.fn.dialog.instances[$.fn.dialog.instances.i] = new Dialog(this, options);
                $this.data('dialog', $.fn.dialog.instances.i);
                $.fn.dialog.instances.i++;
            }else if(typeof options === 'string' && instance[options]){
                instance[options].apply(instance, args);
            }

        });
        return this;
    };
    $.fn.dialog.instances = {
        i: 0
    };


})(window.Zepto || window.jQuery);