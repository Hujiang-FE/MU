/**
 * -------------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.1.0
 * @author: roeis
 * @description: extend a custom touch function
 * -------------------------------------------------------------
 */

(function($) {
    'use strict';
    var start, delta, isScrolling,
        _defaults = {
            enableVertical: false
        };

    $.fn.swipeable = function(opts) {
        opts = $.extend({}, _defaults, opts);
        return this.each(function() {
            var $this = $(this);

            $this
            .on('touchstart', function(event) {
                var touch = event.touches || event.originalEvent.touches;
                touch = touch[0];

                start = {
                    x: touch.clientX,
                    y: touch.clientY,
                    time: Date.now()
                };

                isScrolling = undefined;
                delta = {};
                opts.start.call(this, {touch: touch , start: start});

            })
            .on('touchmove', function(event) {
                var touch = event.touches || event.originalEvent.touches;

                if ((touch && touch.length > 1) ||event.scale && event.scale !== 1){
                    return;
                }

                touch = touch[0];

                delta = {
                    x: touch.clientX - start.x,
                    y: touch.clientY - start.y
                };

                // set a flag which detemine the page is scrolling,
                // purpose here is avoid that page can't scroll when you touch on the target which is on current function
                if (typeof isScrolling == 'undefined') {
                    isScrolling = isScrolling || Math.abs(delta.x) < Math.abs(delta.y);
                }
                if(!opts.enableVertical){
                    if (isScrolling) return;
                    event.preventDefault();
                }
                opts.move.call(this, {touch: touch, delta: delta});
            })
            .on('touchend', function() {
                if(!opts.enableVertical){
                    if (isScrolling) return;
                }
                opts.end.call(this, {touch: {},start: start, delta: delta});
            });
        });
    };

})(window.Zepto || window.jQuery);