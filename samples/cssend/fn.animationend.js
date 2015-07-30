/**
 * name: css3 animationEvent callback
 * author: roeis
 * version: 1.0.0
 * description: add animation extension on $.fn;
 */
(function($) {
    'use strict';
    var animationEvent = function() {
            var body = document.body || document.documentElement,
                animationEventNames = {
                    'WebkitTransition': ['webkitAnimationEnd','webkitTransitionEnd','webkitAnimationIteration', 'webkitAnimationStart'],
                    'OTransition': ['oanimationend ','oTransitionEnd otransitionend','oanimationiteration', 'oanimationstart'],
                    'transition': ['animationEnd','transitionend','animationiteration', 'animationstart']
                };

            for (var name in animationEventNames) {
                if (typeof body.style[name] === 'string') {
                    return {
                        animationStart: animationEventNames[name][3],
                        animationIteration: animationEventNames[name][2],
                        animationEnd: animationEventNames[name][0],
                        transitionEnd: animationEventNames[name][1]
                    };
                }
            }
            return false;
        };

    var animationEvents = animationEvent(),
        fnNames = {
            'animationStart': animationEvents.animationStart,
            'animationIteration': animationEvents.animationIteration,
            'animationEnd': animationEvents.animationEnd,
            'transitionEnd': animationEvents.transitionEnd
        };

    window.animationEvents = animationEvents;
    /**
     * callback after adding one css animation that ends
     * @param  {String}   cls      
     * @param  {Function} callback 
     * @return {Object}            
     */
    $.fn.oneAnimationEnd = function (cls, callback){
        $(this[0]).addClass(cls).one(fnNames.animationEnd, function(){
            callback && callback.call(this);
        });
        return this;
    };
    
})(window.Zepto || window.jQuery);
