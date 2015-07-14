/**
 * -------------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.1.0
 * @author: roeis
 * @description: extend slider from swipeable
 * @dependency: $.fn.swipeable
 * -------------------------------------------------------------
 */

(function($) {
    'use strict';

    var Slider = function(el, opts){
        this.$el = $(el);
        this.opts = opts;
        this.init();
    };
    var defaults = {
        afterSlide: function(){}
    };
    Slider.prototype = {
        init: function(){
            this.opts = $.extend({}, defaults, this.opts);
            this.dom();
            this.bind();
            return this;
        },
        dom: function(){
            var self = this;
            self.$children = self.$el.children();
            self.max = self.$children.length;
            self.index = 0;

            self.$children.wrapAll('<div class="slider-wrap"></div>');
            self.$slider = $('.slider-wrap');

            self.$el.css({
                'overflow': 'hidden',
                'position': 'relative'
            });

            self.$slider.css({
                'width': self.max * 100 +'%',
                'position': 'absolute',
                '-webkit-transform': 'translateX(0%)',
                'transform': 'translateX(0%)'
            });
            self.$children.css({
                width: 100 / self.max + '%'
            });
        },
        bind: function(){
            var startPoint = 0,
                self = this;
            self.$el.swipeable({
                start: function(data){
                    startPoint = self.$slider.offset().left;
                    self.$slider.css({
                        '-webkit-transition': '-webkit-transform 0s ease',
                        'transition': 'transform 0s ease'
                    });
                },
                move: function(data){
                    var deltaX = startPoint + data.delta.x;
                        self.$slider.css({
                            '-webkit-transform': 'translateX('+ deltaX +'px)',
                            'transform': 'translateX('+ deltaX +'px)'
                        });
                    },
                end: function(data){
                    if(Math.abs(data.delta.x) > 80){
                        if(data.delta.x > 0){
                            self.index --;
                            self.index = self.index < 0 ? 0 : self.index;
                        }else{
                            self.index ++;
                            self.index = self.index > self.max - 1 ? self.max - 1 : self.index;
                        }
                    }
                    self.jump(self.index);
                }
            });
        },
        jump: function(index){
            var self = this,
                width = -self.$slider.width() * (index/5);
            // get width of px value, because % value does not work in andriod
            self.index = index;
            self.$slider.css({
                '-webkit-transition': '-webkit-transform .4s ease',
                'transition': 'transform .4s ease',
                '-webkit-transform': 'translateX('+ width +'px)',
                'transform': 'translateX('+ width +'px)'
            });
            self.opts.afterSlide.call(self, self.index);
        }
    };

    window.muSlider = Slider;

})(window.Zepto || window.jQuery);