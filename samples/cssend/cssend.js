/**
 * name: css3 animationEnd transition callback
 * author: roeis
 * version: 1.0.0
 * description: add extension on fn, onAnimationEnd, onTransitionEnd;
 */
(function($) {
    'use strict';
    var animationend = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

    // css3Events: function() {
    //         var body = document.body || document.documentElement,
    //             transEndEventNames = {
    //                 'WebkitTransition': ['webkitAnimationEnd','webkitTransitionEnd','webkitAnimationIteration'],
    //                 'MozTransition': ['mozAnimationEnd','mozTransitionEnd','mozAnimationiteration'],
    //                 'OTransition': ['oanimationend ','oTransitionEnd','oAnimationiteration'],
    //                 'transition': ['animationEnd','transitionend','animationiteration']
    //             };

    //         for (var name in transEndEventNames) {
    //             if (typeof body.style[name] === 'string') {
    //                 return {
    //                     animationend: transEndEventNames[name][0],
    //                     transitionend: transEndEventNames[name][1],
    //                     animationiteration: transEndEventNames[name][2]
    //                 };
    //             }
    //         }
    //     }

    $.fn.addCss3 = function(cls, callback){
        $(this[0]).addClass(cls).one(animationend, callback);
        return this;
    };

})(window.Zepto || window.jQuery);

// var support = { animations : Modernizr.cssanimations },
//     animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
//     animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
//     onEndAnimation = function( el, callback ) {
//         var onEndCallbackFn = function( ev ) {
//             if( support.animations ) {
//                 if( ev.target != this ) return;
//                 this.removeEventListener( animEndEventName, onEndCallbackFn );
//             }
//             if( callback && typeof callback === 'function' ) { callback.call(); }
//         };
//         if( support.animations ) {
//             el.addEventListener( animEndEventName, onEndCallbackFn );
//         }
//         else {
//             onEndCallbackFn();
//         }
//     };


/*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/

// ;(function($, window, document, undefined) {
//     var s = document.body || document.documentElement,
//         s = s.style,
//         prefixAnimation = '',
//         prefixTransition = '';

//     if (s.WebkitAnimation == '') prefixAnimation = '-webkit-';
//     if (s.MozAnimation == '') prefixAnimation = '-moz-';
//     if (s.OAnimation == '') prefixAnimation = '-o-';

//     if (s.WebkitTransition == '') prefixTransition = '-webkit-';
//     if (s.MozTransition == '') prefixTransition = '-moz-';
//     if (s.OTransition == '') prefixTransition = '-o-';

//     $.fn.extend({
//         onCSSAnimationEnd: function(callback) {
//             var $this = $(this).eq(0);
//             $this.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback);
//             if ((prefixAnimation == '' && !('animation' in s)) || $this.css(prefixAnimation + 'animation-duration') == '0s') callback();
//             return this;
//         },
//         onCSSTransitionEnd: function(callback) {
//             var $this = $(this).eq(0);
//             $this.one('webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', callback);
//             if ((prefixTransition == '' && !('transition' in s)) || $this.css(prefixTransition + 'transition-duration') == '0s') callback();
//             return this;
//         }
//     });
// })(jQuery, window, document);