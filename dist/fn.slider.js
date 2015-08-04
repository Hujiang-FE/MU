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

    var Slider = function(el, opts) {
        this.$el = $(el);
        this.opts = opts;
        this.init();
    };
    var defaults = {
        isLoop: false,
        speed: 500,
        mode: 'horizontal',
        afterSlide: function() {}
    };
    Slider.prototype = {
        init: function() {
            this.opts = $.extend({}, defaults, this.opts);
            this._create();
            this._bind();
        },
        _create: function() {
            var self = this;
            self.$children = self.$el.children();
            self.max = self.$children.length;
            self.animating = false;
            self.looptime = null;
            self.index = 0;

            self.$children.wrapAll('<div class="slider-wrap"></div>');
            // maintain each instance standlone, when initialize lot of instance with a same class
            // in jump function, the active target is self.$slider, and this would be current target's parent
            self.$slider = self.$children.closest('.slider-wrap');

            self.$el.css({
                'overflow': 'hidden',
                'position': 'relative'
            });

            self.$slider.css({
                'width': self.max * 100 + '%',
                'position': 'absolute',
            });
            self.$children.css({
                'width': 100 / self.max + '%',
                'float': 'left'
            });

            
            if(self.opts.isLoop){
                self.loop();
            }
        },
        loop: function(){
            var self = this;
            if(self.index >= self.max - 1 ){
                clearTimeout(self.looptime);
                return;
            }
            
            self.looptime = setTimeout(function(){
                self.index ++;
                self.jump(self.index);
                self.loop();
            }, 3000);
            
        },
        _bind: function() {
            var startPoint = 0,
                self = this;
            self.$el.swipeable({
                start: function(data) {

                    startPoint = self.$slider.offset().left;
                    self.$slider.css({
                        '-webkit-transition-duration': '0s',
                        'transition-duration': '0s'
                    });
                },
                move: function(data) {
                    
                    var deltaX = startPoint + data.delta.x;
                    self.$slider.css({
                        '-webkit-transform': 'translate(' + deltaX + 'px, 0) translateZ(0)',
                        'transform': 'translate(' + deltaX + 'px, 0) translateZ(0)'
                    });
                },
                end: function(data) {
                    // here is flag that determine if trigger the slider
                    // one is a quick short swipe , another is distance diff
                    
                    if (data.deltatime < 250 && Math.abs(data.delta.x) > 20 || Math.abs(data.delta.x) > 100) {
                        if (data.delta.x > 0) {
                            self.index--;
                            self.index = self.index < 0 ? 0 : self.index;
                        } else {
                            self.index++;
                            self.index = self.index > self.max - 1 ? self.max - 1 : self.index;
                        }
                    }
                    self.jump(self.index);
                }
            });
        },
        _destory: function(){

        },
        jump: function(index) {
            var self = this,
                width = -self.$slider.width() * (index / self.max);
            // get a width of px value, because % value does not work in andriod
            self.index = index;
            self.animating = true;
            self.$slider.css({
                '-webkit-transition-duration': '.4s',
                'transition-duration': '.4s',
                '-webkit-transform': 'translate(' + width + 'px, 0) translateZ(0)',
                'transform': 'translate(' + width + 'px, 0) translateZ(0)'
            });
            self.opts.afterSlide.call(self, self.index);
        }
    };

    window.MuSlider = Slider;

    $.fn.muSlider = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
            var $this = $(this),
                instance = $.fn.muSlider.instances[$this.data('muSlider')];

            if (!instance) {
                //cache the instance , use $.data in jquery, but in zepto data function is not fully supperted
                $.fn.muSlider.instances[$.fn.muSlider.instances.i] = new Slider(this, options);
                $this.data('muSlider', $.fn.muSlider.instances.i);
                $.fn.muSlider.instances.i++;
            }else if(typeof options === 'string' && instance[options]){
                instance[options].apply(instance, args);
            }

        });
        return this;
    };

    $.fn.muSlider.instances = {
        i: 0
    };

})(window.Zepto || window.jQuery);