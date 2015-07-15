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
                        '-webkit-transform': 'translate(' + deltaX + 'px, 0)',
                        'transform': 'translate(' + deltaX + 'px, 0)'
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
            self.$slider.css({
                '-webkit-transition-duration': '.4s',
                'transition-duration': '.4s',
                '-webkit-transform': 'translate(' + width + 'px, 0)',
                'transform': 'translate(' + width + 'px, 0)'
            });
            self.opts.afterSlide.call(self, self.index);
        }
    };

    window.Mulider = Slider;

    $.fn.mulider = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
            var $this = $(this),
                instance = $.fn.mulider.instances[$this.data('mulider')];

            if (!instance) {
                //cache the instance , use $.data in jquery, but in zepto data function is not fully supperted
                $.fn.mulider.instances[$.fn.mulider.instances.i] = new Slider(this, options);
                $this.data('mulider', $.fn.mulider.instances.i);
                $.fn.mulider.instances.i++;
            }else if(typeof options === 'string' && instance[options]){
                instance[options].apply(instance, args);
            }

        });

        return this;

        // if (methods[method]) {
        //     return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        // } else if (typeof method === 'object' || !method) {
        //     return methods.init.apply(this, arguments);
        // } else {
        //     $.error('Method "' + method + '" does not exist in pluginName plugin!');
        // }

        // var args = Array.prototype.slice.call(arguments, 1);
        // if (typeof options === "string") {
        //     //underscored methods are "private" (similar to jQuery UI's $.widget we allow this to make methods not availble via public api)
        //     options = options.replace(/^_/, "");
        //     //Check if underscore filtered method exists
        //     if (instance[options]) {
        //         //Call method with args
        //         instance[options].apply(instance, args);
        //     }
        // }
        // 

        // although it can return an Object that u want, but it break the jquery chain
        // so mostly a handy way to do this is to save the instance int the $.data object.
        // when u want to use , u can fetch the instance as a reference, eg: $('element').data('plugin').doSomething();
        // 
        // return $.fn.mulider.instances[this.data('mulider')];
        // return {
        //     $this: this,
        //     jump: function(index){
        //         this.data('mulider').jump(index);
        //     }
        // };
        // 
        // return this.each(function(){
        //     var $this = $(this),
        //         data = $this.data('muslider');
        //     if (!data) {
        //         var instance = new Slider(this, options);
        //         console.log(instance.jump);
        //         $this.data('muslider', instance);
        //         console.log($this.data('muslider').jump);
        //     }
        // });
    };

    $.fn.mulider.instances = {
        i: 0
    };

})(window.Zepto || window.jQuery);