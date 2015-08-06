/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.2
 * @author: roeis
 * @description: rewrite touch event, fix some issue in offical js
 *               it can scroll vertically when trigger the touchstart of swipe,
 *               !!when u use swipeUp and swipeDown, set document that it prevent the default touchmove event;
 * -------------------------------------------------------------
 */
(function($) {
    'use strict';
    var $elem,
        start = {},
        delta = {},
        isScrolling;

    var events = {
        start: function(event) {
            var touch = event.touches[0];

            start = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };

            $elem = $(this._parentIfText(touch.target));

            //used for testing the first touch event
            isScrolling = undefined;

            //reset delta
            delta = {};
        },

        move: function(event) {
            if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                return;
            }

            var touch = event.touches[0];

            delta = {
                x: touch.clientX - start.x,
                y: touch.clientY - start.y
            };

            //determine if scroll test has run !important!
            //return trendence if updown or leftright
            if (typeof isScrolling === 'undefined') {
                isScrolling = isScrolling || Math.abs(delta.x) < Math.abs(delta.y);
            }

            if (!isScrolling) {
                //issue: preventDefault to fire the touchmove and touchend event
                event.preventDefault();
            }
        },

        end: function(event) {
            var duration = Date.now() - start.time,
                isHorizontal = duration < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > 80,
                isVertical = duration < 250 && Math.abs(delta.y) > 20 || Math.abs(delta.y) > 80,
                isSwipeLeft = delta.x < 0,
                isSwipeUp = delta.y < 0;

            if (!isScrolling && isHorizontal) {
                $elem.trigger(isSwipeLeft ? 'swipeLeft' : 'swipeRight');
            }else if(isScrolling && isVertical){
                $elem.trigger(isSwipeUp ? 'swipeUp' : 'swipeDown');
            }
        },

        _parentIfText: function(node) {
            return 'tagName' in node ? node : node.parentNode;
        }
    };

    //     var x = Math.abs(this.te.x);
    //     var y = Math.abs(this.te.y);
    //     var t = this.te.d;
    //     var s = this.status;
    //     if (x < 5 && y < 5) {
    //         if (t < 300) s = "tap";
    //         else s = "longTap";
    //     } else if (x < options.x && y > options.y) {
    //         if (t < 250) {
    //             if (this.te.y > 0) s = "swipeDown";
    //             else s = "swipeUp";
    //         } else s = "swipe";
    //     } else if (y < options.y && x > options.x) {
    //         if (t < 250) {
    //             if (this.te.x > 0) s = "swipeRight";
    //             else s = "swipeLeft";
    //         } else s = "swipe";
    //     }
    //     if (s == this.e) {
    //         this.target.trigger(this.e);
    //         return;
    //     }

    $(document).on('touchstart', function(event) {
        events.start(event);
    }).on('touchmove', function(event) {
        events.move(event);
    }).on('touchend', function(event) {
        events.end(event);
    }).on('touchcanel', function(event) {
        delta = {};
    });

    // ['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap'].forEach(function(eventName) {
    //     $.fn[eventName] = function(callback) {
    //         return this.on(eventName, callback);
    //     };
    // });

})(window.Zepto);