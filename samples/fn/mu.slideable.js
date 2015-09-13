/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 0.0.2
 * @author: roeis
 * @description: slide nav
 * -------------------------------------------------------------
 */

(function(global, $, undefined) {
    'use strict';

    function Slideable(el, opts){
        this.$el = $(el);
        this.opts = opts;
        this.init();
    }

    var defaults = {
        padding: 0
    };

    Slideable.prototype = {

            init: function() {
                this.opts = $.extend({}, defaults, this.opts);
                this._create();
                this._bind();
            },

            _create: function() {
                this.$el.wrap('<div class="mu-slideable"></div>');
                this.$wrap = this.$el.parent();
                this.widthChild = this.$el.width();
                this.$wrap.css({
                    'width': '100%',
                    'overflow': 'hidden',
                    'position': 'relative',
                    'height': this.$el.height()
                });
                this.widthParent = this.$wrap.width();
                this.max = this.widthParent - this.widthChild;
                this.animating = false;
            },

            _bind: function() {
                var self = this,
                    startPoint = 0,
                    parentLeft = self.$wrap.offset().left;

                self.$el.swipeable({
                    start: function(data){
                        startPoint = self.$el.offset().left - parentLeft;
                        self.isMoving = true;
                        self._clearTransition();
                    },
                    move: function(data){
                        if(!self.isMoving) return;
                        var deltaX = startPoint + data.delta.x;
                        self._jump(deltaX);
                    },
                    end: function(data){
                        if(!self.isMoving) return;
                        self.isMoving = false;

                        var t = data.deltatime,
                            s = data.delta.x,
                            a = 2 * s / (t * t),
                            vt = a * t,
                            offset = self.$el.offset().left,
                            distance = 0;

                        self._setTransition();

                        if(offset > 0) {
                            self._jump(0);
                        }

                        if(offset <= 0 && offset >= self.max){
                            // 数学公式
                            // s = 1/2 * a * t * t
                            // vt^2 - v0^2 = 2as
                            // 1/2 * (vt - v0 ) * t= s
                            if (Math.abs(a) > 0.001 && t < 200) {
                                distance = vt * vt / (2 * a);
                            }

                            distance += offset;
                            
                            if(distance > 0) distance = 0;
                            if(distance < self.max) distance = self.max;

                            self._jump(distance);
                        }

                        if(offset < self.max){
                            self._jump(self.max);
                        }
                    }
                });
            },

            _jump: function(value){
                var cssValue = 'translate(' + value + 'px, 0) translateZ(0)';
                this.$el.css({
                    '-webkit-transform': cssValue,
                    'transform': cssValue
                });
            },

            _clearTransition: function(){
                this.$el.css({
                    '-webkit-transition-duration': '0s',
                    'transition-duration': '0s'
                });
            },

            _setTransition: function(){
                this.$el.css({
                    '-webkit-transition-duration': '.4s',
                    'transition-duration': '.4s'
                });
            },
        };

    $.fn.slideable = function(options){
        this.each(function(){
            var instance = new Slideable(this, options);
        });
        return this;
    };

})(this, window.Zepto || window.jQuery);