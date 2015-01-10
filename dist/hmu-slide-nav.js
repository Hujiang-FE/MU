(function(global) {
    'use strict';

    var hmu = global.hmu,
        util = hmu.util,
        $ = global.Zepto;

    var options = {
        /** 目标 */
        target: '.slide-nav',
        /** 是否有外边距，边距值 */
        padding: 0
    };
    var start = {},
        timeout = null;

    var _nav = {

        init: function(opts) {
            options = $.extend(options, opts || {});

            var $target = $(options.target);

            _nav._initialize($target);
        },

        _initialize: function($obj) {

            $obj.each(function() {

                var $this = $(this),
                    $ul = $this.find('ul'),
                    $child = $this.find('li'),
                    real_width = 0,
                    wrap_width = $(window).width() - options.padding * 2;

                $.each($child, function() {
                    var w = $(this).width();
                    real_width += w;
                });

                $ul.css('width', real_width);

                // determine if it need slide
                if (real_width > wrap_width) {
                    _nav._bindEvent($ul, real_width, wrap_width);
                }

            });
        },

        _bindEvent: function($obj, w1, w2) {
            $obj.motouch(function(event) {
                switch (event.type) {
                    case 'start':
                        _nav._start(event, this);
                        break;
                    case 'move':
                        _nav._move(event, this);
                        break;
                    case 'end':
                        _nav._end(event, this, w1, w2);
                        break;
                }
            });
        },
        _start: function(event, obj) {
            start.offset = $(obj).offset().left;
            util.setCss($(obj), 'transition', '0s');
        },
        _move: function(event, obj) {
            var offset = event.delta.x + start.offset;
            util.setCss($(obj), 'transform', 'translate3d(' + offset + 'px,0,0)');

        },
        _end: function(event, obj, w1, w2) {
            var $this = $(obj),
                isSwipeLeft = event.delta.x < 0,
                t = Date.now() - event.start.time,
                s = Math.abs(event.delta.x),
                a = 2 * s / (t * t),
                vt = 2 * s / t,
                offset = $this.offset().left,
                distance = 0;

            util.setCss($this, 'transition', '.3s');

            checkEdge(offset);
            if (a > 0.001) {
                distance = 2 * vt * vt / (2 * a);
            }

            var overflow = 50,
                drift = isSwipeLeft ? (offset - distance) : (offset + distance);

            drift < (w2 - w1 - overflow) && function(){ drift = w2 - w1 - overflow; }();
            drift > overflow && function(){ drift = overflow; }();

            util.setCss($this, 'transform', 'translate3d(' + drift + 'px,0,0)');

            timeout = setTimeout(function() {
                checkEdge(drift);
                timeout = null;
            }, 0);

            function checkEdge(offset) {
                if (offset > 0) {
                    util.setCss($this, 'transform', 'translate3d(0,0,0)');
                }
                if (offset < w2 - w1) {
                    util.setCss($this, 'transform', 'translate3d(' + (w2 - w1) + 'px,0,0)');
                }
            }
        }
    };

    hmu.widget.slidenav = {
        init: _nav.init
    };
})(this);