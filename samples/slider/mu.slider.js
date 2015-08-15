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
        isVert: false,
        beforeSlide: function() {},
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
            self.isMoving = false;
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

            self.$slider.css({'position' : 'absolute'});
            // for loop
            

            if(self.opts.isVert){
                //ATTENTION: prevent global touchmove event
                window.mu && mu.util.preventScroll();
                self.$slider.css({'height': self.max * 100 + '%', 'width': '100%'});
                self.$children.css({'height': 100 / self.max + '%'});
            }else{
                self.$slider.css({'width': self.max * 100 + '%'});
                self.$children.css({'width': 100 / self.max + '%', 'height': '100%','float': 'left'});
            }

            var $cloneFirst = self.$children[0],
                $cloneLast = self.$children[self.max - 1];
                
            self.$slider.prepend($cloneLast.outerHTML).append($cloneFirst.outerHTML);

            if(self.opts.isLoop){
                self.loop();
            }
        },
        loop: function(){
            var self = this;
            if(self.index >= self.max - 1 ){
                // self.stopLoop();
                self.index = -1;
                // return;
            }
            
            self.looptime = setTimeout(function(){
                // Plus index before transform, attention when loop
                self.index ++;
                self.jump(self.index);
                self.loop();
            }, 3000);
            
        },
        stopLoop: function(){
            clearTimeout(this.looptime);
        },
        _bind: function() {
            var startPoint = 0,
                self = this;

            self.$el.swipeable({
                enableVertical: self.opts.isVert,
                start: function(data) {
                    if(self.opts.isLoop){
                        self.stopLoop();
                    }
                    startPoint = self.opts.isVert ? self.$slider.offset().top : self.$slider.offset().left;
                    if(self.animating) return;
                    
                    // ATTENTION: in mobile device, in continous quick touchevents
                    // touchstart won't fire, so set a flag forcely
                    // enable touchstart callback do properly
                    self.isMoving = true;

                    self._clearTransition();
                },
                move: function(data) {
                    if(self.animating || !self.isMoving) return;
                    var deltaX = startPoint + data.delta.x,
                        deltaY = startPoint + data.delta.y,
                        transValue = '';

                    if(self.opts.isVert){
                        transValue = 'translate(0,' + deltaY + 'px) translateZ(0)';
                    }else{
                        transValue = 'translate(' + deltaX + 'px, 0) translateZ(0)';
                    }
                    self.$slider.css({
                        '-webkit-transform': transValue,
                        'transform': transValue
                    });
                },
                end: function(data) {
                    // ATTENTION: here is flag that determine if trigger the slider
                    // one is a quick short swipe , another is distance diff
                    // if(self.animating) return;
                    self.isMoving = false;
                    var deltaValue = self.opts.isVert ? data.delta.y : data.delta.x;
                    if (data.deltatime < 250 && Math.abs(deltaValue) > 20 || Math.abs(deltaValue) > 100) {
                        if (deltaValue > 0) {
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
        _clearTransition: function(){
            this.$slider.css({
                '-webkit-transition-duration': '0s',
                'transition-duration': '0s'
            });
        },
        _destory: function(){

        },
        prev: function() {
            var idx = this.index;
            idx--;
            if (!this.opts.isLoop && idx < 0) return;
            if (this.opts.isLoop && idx < 0) {
                idx = this.max - 1;
            }
            this.jump(idx);
        },
        next: function() {
            var idx = this.index;
            idx++;
            if (!this.opts.isLoop && idx > this.max - 1) return;
            if (this.opts.isLoop && idx > this.max - 1) {
                idx = 0;
            }
            this.jump(idx);
        },
        jump: function(index) {
            var self = this,
                distance = self.opts.isVert ? self.$slider.height() : self.$slider.width(),
                value = -distance * (index / self.max),
                transValue = self.opts.isVert ? 'translate(0,' + value + 'px) translateZ(0)' : 'translate(' + value + 'px, 0) translateZ(0)';
            self.animating = true;
            // get a width of px value, because % value does not work in andriod
            self.index = index;
            self.opts.beforeSlide.call(self, self.index);
            self.$slider.css({
                '-webkit-transition-duration': '.4s',
                'transition-duration': '.4s',
                '-webkit-transform': transValue,
                'transform': transValue
            }).on(window.animationEvents.transitionEnd, function(){
                self.animating = false;
                self._clearTransition();
                self.opts.afterSlide.call(self, self.index);
            });
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