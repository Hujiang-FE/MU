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

    // TODO : add mode such as 'slideVertical | slideHorizontal'
    // TODO : add an extra css3 animation plugin
    var defaults = {
        isLoop: true,
        pageStart: 0,
        classPrev: [],
        classNext: [],
        mode: 'vertical',                             // horizontal
        beforeSlide: function($pagein, $pageout) {},
        afterSlide: function($pagein, $pageout, index) {}
    };

    // prevent global default event

    var showCls = 'mu-page-current',
        classSets = {
            'vertical': {
                classPrev: ['mu-moveFromTop', 'mu-moveToBottom'],
                classNext: ['mu-moveFromBottom', 'mu-moveToTop']
            },
            'horizontal': {
                classPrev: ['mu-moveFromLeft', 'mu-moveToRight'],
                classNext: ['mu-moveFromRight', 'mu-moveToLeft']
            }
        };

    Page.prototype = {
        init: function() {
            this.options = $.extend({}, defaults, this.options);
            if (!this.$el.length) return;
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
            }).eq(this.index).addClass(showCls).siblings().removeClass(showCls);

            if (this.options.mode && classSets[this.options.mode]) {
                this.options.classPrev = classSets[this.options.mode].classPrev;
                this.options.classNext = classSets[this.options.mode].classNext;
            }

        },
        prev: function() {
            var idx = this.index;
            idx--;
            if (!this.options.isLoop && idx < 0) return;
            if (this.options.isLoop && idx < 0) {
                idx = this.size - 1;
            }
            this.jump(idx, this.options.classPrev[0], this.options.classPrev[1]);
        },
        next: function() {
            var idx = this.index;
            idx++;
            if (!this.options.isLoop && idx > this.size - 1) return;
            if (this.options.isLoop && idx > this.size - 1) {
                idx = 0;
            }
            this.jump(idx, this.options.classNext[0], this.options.classNext[1]);
        },
        /**
         * [jump description]
         * @param  {number} idx      [description]
         * @param  {string} inClass  [description]
         * @param  {string} outClass [description]
         * @return 
         */
        jump: function(idx, inClass, outClass) {
            if (idx === this.index || idx > this.size - 1 || this.isAnimating) return;
            this.isAnimating = true;
            //1.cache a default class for page transition, compare idx and this.index to set prev or next
            //2.enable custom class for page transition
            inClass = inClass ? inClass : idx > this.index ? this.options.classNext[0] : this.options.classPrev[0];
            outClass = outClass ? outClass : idx > this.index ? this.options.classNext[1] : this.options.classPrev[1];

            // the target page transform in
            this.$pageIn = this.$el.eq(idx);

            this.options.beforeSlide.call(this, this.$pageIn, this.$pageOut);

            this._animationOut(this.$pageOut, outClass, function() {});

            this._animationIn(this.$pageIn, inClass, $.proxy(function() {
                this.options.afterSlide.call(this, this.$pageIn, this.$pageOut, idx);
                this.isAnimating = false;
                this.index = idx;
                this.$pageOut = this.$pageIn;
            }, this));
        },
        _animationOut: function($obj, cls, callback) {
            $obj.oneAnimationEnd(cls, function() {
                $obj.removeClass(cls).removeClass(showCls);
                callback();
            });
        },
        _animationIn: function($obj, cls, callback) {
            $obj.addClass(showCls).oneAnimationEnd(cls, function() {
                $obj.removeClass(cls);
                callback();
            });
        },
        destroy: function() {
            this.$el.removeClass('mu-page').removeClass('mu-page-current');
        },
    };

    window.MuPage = Page;

    $.fn.muPage = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
            var $this = $(this),
                instance = $.fn.muPage.instances[$this.data('muPage')];

            if (!instance) {
                //cache the instance , use $.data in jquery, but in zepto data function is not fully supperted
                $.fn.muPage.instances[$.fn.muPage.instances.i] = new Page(this, options);
                $this.data('muPage', $.fn.muPage.instances.i);
                $.fn.muPage.instances.i++;
            } else if (typeof options === 'string' && instance[options]) {
                instance[options].apply(instance, args);
            }
        });
        return this;
    };
    $.fn.muPage.instances = {
        i: 0
    };


})(window.Zepto || window.jQuery);