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
        autoSlide: false,
        speed: 500,
        isLoop: false,
        isVert: false,
        isHidden: true,
        beforeSlide: function() {},
        afterSlide: function() {}
    };
    Slider.prototype = {
        init: function() {
            this.opts = $.extend({}, defaults, this.opts);
            if(!this.$el.length) return;
            this._create();
            this._bind();
        },
        _create: function() {
            var self = this;
            self.$children = self.$el.children();
            self.max = self.$children.length;
            self.animating = false;     //正在动画
            self.isMoving = false;      //正在手势滑动
            self.looptime = null;
            self.index = 0;             // 起始序号
            self.clones = 0;            // 克隆数

            if(self.opts.isLoop){
                self.index = 1;
                self.clones = 2;
                self.max += self.clones;
            }

            self.$children.wrapAll('<div class="slider-wrap"></div>');
            // maintain each instance standlone, when initialize lot of instance with a same class
            // in jump function, the active target is self.$slider, and this would be current target's parent
            self.$slider = self.$children.closest('.slider-wrap');

            var child_height;
            if(self.opts.isVert){
                child_height = self.$el.height();
            }else{
                child_height = self.$children.height();
            }

            console.log(child_height)
            self.$el.css({
                'height': child_height,
                'position': 'relative'
            });

            if(self.opts.isHidden){
                self.$el.css({
                    'overflow': 'hidden'
                });
            }

            self.$slider.css({
                'position' : 'absolute'
            });

            if(self.opts.isVert){
                //ATTENTION: prevent global touchmove event
                window.mu && mu.util.preventScroll();
                self.$slider.css({'height': self.max * 100 + '%', 'width': '100%'});
                self.$children.css({'height': 100 / self.max + '%'});
            }else{
                self.$slider.css({'width': self.max * 100 + '%'});
                self.$children.css({'width': 100 / self.max + '%', 'float': 'left'});
            }

            if(self.opts.isLoop){
                self._setClone();
            }

            self._jump(self.index);

            if(self.opts.autoSlide){
                self.loop();
            }
        },
        _setClone: function(){
            if(this.opts.isLoop){
                var $cloneFirst = this.$children.eq(0).clone().addClass('mu-clone'),
                    $cloneLast = this.$children.eq(this.max - this.clones - 1).clone().addClass('mu-clone');

                this.$slider.prepend($cloneLast).append($cloneFirst);
            }
        },
        loop: function(){
            var self = this;
            if(self.index >= self.max - 1 ){
                // self.stopLoop();
                self.index = this.clones - 1;
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
                self = this,
                parentTop = self.$el.offset().top,
                parentLeft = self.$el.offset().left;

            self.$el.swipeable({
                enableVertical: self.opts.isVert,
                start: function(data) {
                    if(self.opts.autoSlide){
                        self.stopLoop();
                    }
                    // fix slider flick that are not 100% size, minus the offset
                    if(self.opts.isVert){
                        startPoint = self.$slider.offset().top - parentTop;
                    }else{
                        startPoint = self.$slider.offset().left - parentLeft;
                    }
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
                    if(!self.isMoving) return;
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

            //solve orientchange issue, it recalculate its size when screen changes
            var orientationEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
            window.addEventListener(orientationEvt, function() {
                self._jump(self.index);
            }, false);
        },
        _clearTransition: function(){
            this.$slider.css({
                '-webkit-transition-duration': '0s',
                'transition-duration': '0s'
            });
        },
        _setTransition: function(){
            this.$slider.css({
                '-webkit-transition-duration': '.4s',
                'transition-duration': '.4s'
            });
        },
        _destory: function(){

        },
        prev: function() {
            var idx = this.index;
            idx--;
            if (!this.opts.autoSlide && idx < 0) return;
            if (this.opts.autoSlide && idx < 0) {
                idx = this.max - 1;
            }
            this.jump(idx);
        },
        next: function() {
            var idx = this.index;
            idx++;
            if (!this.opts.autoSlide && idx > this.max - 1) return;
            if (this.opts.autoSlide && idx > this.max - 1) {
                idx = 0;
            }
            this.jump(idx);
        },
        jump: function(index){
            var self = this;
            self.animating = true;
            this._setTransition();
            this._jump(index, function(){
                self.index = index;
                self.opts.beforeSlide.call(self, self.index);
            });
            this._transitionCallback();
        },

        /**
         * 静态位置变化
         * @param  {[type]}   index    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        _jump: function(index, callback) {
            // get a width of px value, because % value does not work in andriod
            var distance = this.opts.isVert ? this.$slider.height() : this.$slider.width(),
                value = -distance * (index / this.max),
                transValue = this.opts.isVert ? 'translate(0,' + value + 'px) translateZ(0)' : 'translate(' + value + 'px, 0) translateZ(0)';
                
            callback && callback();
            this.$slider.css({
                '-webkit-transform': transValue,
                'transform': transValue
            });
        },
        _transitionCallback: function(){
            var self = this;
            self.$slider.one(window.animationEvents.transitionEnd, function(){
                self.animating = false;
                self._clearTransition();
                if(self.opts.isLoop){
                    if(self.index === 0){
                        self.index = self.max - self.clones;
                    }
                    if(self.index === self.max - 1){
                        self.index = 1;
                    }
                    self._jump(self.index);
                }
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