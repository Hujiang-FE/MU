/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: extend a custom touch function
 * -------------------------------------------------------------
 */

(function($) {
    'use strict';
    var start, delta, isScrolling;

    $.fn.motouch = function(invoke) {
        return this.each(function() {
            var $this = $(this);

            $this.on('touchstart', function(event) {
                var touch = event.touches[0];

                start = {
                    x: touch.clientX,
                    y: touch.clientY,
                    time: Date.now()
                };

                isScrolling = undefined;
                delta = {};

                invoke.call(this, {type: 'start',touch: touch ,start: start});

            }).on('touchmove', function(event) {
                if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

                var touch = event.touches[0];

                delta = {
                    x: touch.clientX - start.x,
                    y: touch.clientY - start.y
                };

                if (typeof isScrolling == 'undefined') {
                    isScrolling = isScrolling || Math.abs(delta.x) < Math.abs(delta.y);
                }

                if (isScrolling) return;
                event.preventDefault();
                invoke.call(this, {type: 'move',touch: touch,delta: delta});
            }).on('touchend', function(event) {
                if (isScrolling) return;
                invoke.call(this, {type: 'end',touch: {},start: start, delta: delta});
            });
        });
    };

})(window.Zepto || window.jQuery);