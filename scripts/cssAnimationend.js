/*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/

;(function($, window, document, undefined) {
    var s = document.body || document.documentElement,
        s = s.style,
        prefixAnimation = '',
        prefixTransition = '';

    if (s.WebkitAnimation == '') prefixAnimation = '-webkit-';
    if (s.MozAnimation == '') prefixAnimation = '-moz-';
    if (s.OAnimation == '') prefixAnimation = '-o-';

    if (s.WebkitTransition == '') prefixTransition = '-webkit-';
    if (s.MozTransition == '') prefixTransition = '-moz-';
    if (s.OTransition == '') prefixTransition = '-o-';

    $.fn.extend({
        onCSSAnimationEnd: function(callback) {
            var $this = $(this).eq(0);
            $this.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback);
            if ((prefixAnimation == '' && !('animation' in s)) || $this.css(prefixAnimation + 'animation-duration') == '0s') callback();
            return this;
        },
        onCSSTransitionEnd: function(callback) {
            var $this = $(this).eq(0);
            $this.one('webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', callback);
            if ((prefixTransition == '' && !('transition' in s)) || $this.css(prefixTransition + 'transition-duration') == '0s') callback();
            return this;
        }
    });
})(jQuery, window, document);