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
        tapTimeout = null,
        longTapTimeout = null,
        isScrolling;

    var $log = $('#log');

    function log(string) {
        $log.append('<p>log: ' + string + '</p>');
    }

    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout);
        longTapTimeout = null;
    }

    var events = {
        start: function(event) {

            var touches = event.touches || event.originalEvent.touches,
                touch = touches[0];

            start = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
            $elem = $(this._parentIfText(touch.target));

            //used for testing the first touch event
            isScrolling = undefined;

            //reset delta
            delta = {
                x : 0,
                y : 0
            };

            longTapTimeout = setTimeout(function(){
                longTapTimeout = null;
                $elem.trigger('longTap');
                log('longTap');
            }, 700);
        },

        move: function(event) {
            var touches = event.touches || event.originalEvent.touches,
                touch = touches[0];
            if (touches.length > 1 || event.scale && event.scale !== 1) return;

            cancelLongTap();

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
            
            console.log('#time : ', duration);
            console.log('#delta : ', delta);
            cancelLongTap();


            if (!isScrolling && isHorizontal) {
                $elem.trigger(isSwipeLeft ? 'swipeLeft' : 'swipeRight');
                log(isSwipeLeft ? 'swipeLeft' : 'swipeRight');
            }else if(isScrolling && isVertical){
                $elem.trigger(isSwipeUp ? 'swipeUp' : 'swipeDown');
                log(isSwipeUp ? 'swipeUp' : 'swipeDown');
            }
            console.log($elem);
            console.log($(event.target).context);

            tapTimeout = setTimeout(function(){
                tapTimeout = null;
                if(Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5 && duration < 300) {
                    var evt = $.Event('tap');

                    // evt.cancelTouch = function(){
                    //     if (tapTimeout) clearTimeout(tapTimeout);
                    //     if (longTapTimeout) clearTimeout(longTapTimeout);
                    // };
                    
                    $elem.trigger(evt);
                    
                    log('tap');
                }
            }, 0);
            // event.cancelBubble=true;
        },

        _parentIfText: function(node) {
            return 'tagName' in node ? node : node.parentNode;
        }
    };

    $(document).on('touchstart', function(event) {
        events.start(event);
    }).on('touchmove', function(event) {
        events.move(event);
    }).on('touchend', function(event) {
        events.end(event);
    }).on('touchcanel', function() {
        delta = {};
    });

    ['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap'].forEach(function(eventName) {
        $.fn[eventName] = function(callback) {
            return this.on(eventName, callback);
        };
    });

})(window.Zepto || window.jQuery);