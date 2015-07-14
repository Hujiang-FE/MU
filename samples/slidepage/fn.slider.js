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
        },
        dom: function(){
            var self = this;
            self.$children = self.$el.children();
            self.max = self.$children.length;
            self.animating = false;
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
                'width': 100 / self.max + '%',
                'float': 'left'
            });
        },
        bind: function(){
            var startPoint = 0,
                self = this;
            self.$el.swipeable({
                start: function(data){
                    startPoint = self.$slider.offset().left;
                    self.$slider.css({
                        '-webkit-transition-duration': '0s',
                        'transition-duration': '0s'
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
                    // here is flag that determine if trigger the slider
                    // one is a quick short swipe , another is distance diff
                    if(data.deltatime < 250 && Math.abs(data.delta.x) > 20 || Math.abs(data.delta.x) > 100 ){
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
                width = -self.$slider.width() * (index/self.max);
            // get width of px value, because % value does not work in andriod
            self.index = index;
            self.$slider.css({
                '-webkit-transition-duration': '.4s',
                'transition-duration': '.4s',
                '-webkit-transform': 'translate(' + width + 'px,0)' + 'translateZ(0)',
                'transform': 'translate(' + width + 'px,0)' + 'translateZ(0)'
            });
            self.opts.afterSlide.call(self, self.index);
        }
    };

    window.muSlider = Slider;

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
                console.log(instance);
                $this.data('muslider', instance);
            }else{
                console.log(data);
            }
            // return instance;
        });
    };

})(window.Zepto || window.jQuery);