/**
 * -------------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.1.0
 * @author: roeis
 * @description: extend slider from swipeable
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
                '-webkit-transition': '-webkit-transform .3s ease',
                'transition': 'transform .3s ease',
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
                },
                move: function(data){
                    var deltaX = startPoint + data.delta.x;
                        self.$slider.css({
                            '-webkit-transform': 'translateX('+ deltaX +'px)',
                            'transform': 'translateX('+ deltaX +'px)',
                            '-webkit-transition': '-webkit-transform 0s ease',
                            'transition': 'transform 0s ease',
                        });
                    },
                end: function(data){
                    if(Math.abs(data.delta.x) > 100){
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
            console.log(this.opts.afterSlide);
            this.index = index;
            this.$slider.css({
                '-webkit-transform': 'translateX(-'+ index*20 +'%)',
                'transform': 'translateX(-'+ index*20 +'%)',
                '-webkit-transition': '-webkit-transform .3s ease',
                'transition': 'transform .3s ease'
            });
            this.opts.afterSlide.call(this, this.index);
        }
    };

    $.fn.muslider = function(options){
        options = $.extend({}, defaults, options);
        // this.jump = function(index){
        //     $(this).muslider('jump', index);
        // };
        return this.each(function(){
            var $this = $(this),
                data = $this.data('muslider');
            // var instance = new Slider(this, options);
            // instance.init();
            // new Slider(this, options).init();
            if (!data) {
                var instance = new Slider(this, options);
                $this.data('muslider', instance);
            }
        });
    };

})(window.Zepto || window.jQuery);