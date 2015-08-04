/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: page transition use css3 animation
 * --------------------------------------------------------
 */
(function($, undefined) {
    'use strict';


    function Page(el, options) {
        this.$el = $(el);
        this.options = options;
        this.init();
    }


    var defaults = {
        classSet: 'slideUp',
        isLoop: true,
        pageStart: 0,
        beforeSlide: function() {},
        afterSlide: function() {}
    };

    var classSets = {
        slideUp: ['mu-moveFromBottom', 'mu-moveToTop'],
        slideDown: ['mu-moveFromTop', 'mu-moveToBottom']
    };

    // prevent global default event

    var curClass = 'mu-page-current';

    Page.prototype = {
        init: function() {
            this.options = $.extend({}, defaults, this.options);
            this._create();
        },
        _create: function() {
            this.size = this.$el.length;
            this.isAnimating = false;
            this.index = this.options.pageStart;
            this.$pageOut = this.$el.eq(this.index);
            this.$pageIn = null;

            this.$el.each(function() {
                var $this = $(this);
                $this.addClass('mu-page');
            }).eq(this.index).addClass(curClass).siblings().removeClass(curClass);
        },
        prev: function() {
            this.index--;

            if (!this.options.isLoop && this.index < 0) {
                return;
            }

            if (this.options.isLoop && this.index < 0) {
                this.index = this.size - 1;
            }
            // this._jump(this.index, )
        },
        next: function() {
            this.index++;

            if (!this.options.loop && this.index > this.size - 1) {
                return;
            }

            if (this.options.isLoop && this.index > this.size - 1) {
                index = 0;
            }
        },
        /**
         * [_jump description]
         * @param  {number} idx      [description]
         * @param  {string} inClass  [description]
         * @param  {string} outClass [description]
         * @return 
         */
        _jump: function(idx, inClass, outClass) {
            if (idx === this.index) return;
            // current page transform out
            this._animationOut(this.$pageOut, outClass, function() {

            });
            // the target page transform in
            this.$pageIn = this.$el.eq(idx);
            this._animationIn(this.$pageIn, inClass, $.proxy(function() {
                this.options.afterSlide.call(this, this.$pageOut, this.$pageIn);

                this.index = idx;
                this.$pageOut = this.$pageIn;
            }, this));
        },
        _animationOut: function($obj, cls, callback) {
            $obj.oneAnimationEnd(cls, function() {
                $obj.removeClass(cls).removeClass(curClass);
                callback();
            });
        },
        _animationIn: function($obj, cls, callback) {
            $obj.addClass(curClass).oneAnimationEnd(cls, function() {
                $obj.removeClass(cls);
                callback();
            });
        },
        destroy: function() {
            // this.$el.remove();
        },
    };

    window.MuPage = Page;

    $.fn.muPage = function(options){
        this.each(function(){
            var $this = $(this);

        });

        return this;
    };
    $.fn.muPage.instances = {
        i: 0
    };


})(window.Zepto || window.jQuery);