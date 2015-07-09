/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 0.0.2
 * @author: roeis
 * @description: slide nav
 * -------------------------------------------------------------
 */

(function(global) {
    'use strict';
    var options = {
        eachWidth: 200,
    };

    var start = {},
        timeout = null;

    var core = {

        init: function(elem, opts) {
            options = $.extend(options, opts || {});

            var $target = $(elem);

            core._initialize($target);
        },

        _initialize: function($obj) {
            var $parent,
                $children,
                obj_width = 0;

            $obj.wrap('<div class="slidewrap"></div>');
            $parent = $obj.parent();
            $parent.css({
                'overflow': 'hidden',
                'position': 'relative',
                'z-index': 999
            });

            $children = $obj.children();

            //margin, padding 不处理
            $children.each(function(){
                var $this = $(this);
                obj_width += $(this).width();
            });
            console.log(obj_width);
            $obj.css('width', obj_width);

            // // very strange issue, add 2px to avoid the last li jump to next line
            // real_width += 2;

            // // determine if it need slide
            // if (real_width > wrap_width) {
            // }
            core._bindEvent($obj);
        },

        _bindEvent: function($obj) {
            $obj.motouch(function(event) {
                switch (event.type) {
                    case 'start':
                        core._start(event, this);
                        break;
                    case 'move':
                        core._move(event, this);
                        break;
                    case 'end':
                        core._end(event, this);
                        break;
                }
            });
        },
        _start: function(event, obj) {
            start.offset = $(obj).offset().left;
            mu.util.setCss($(obj), 'transition', '0s');
        },
        _move: function(event, obj) {
            var offset = event.delta.x + start.offset;
            mu.util.setCss($(obj), 'transform', 'translate3d(' + offset + 'px,0,0)');
            console.log(event.delta.x);
        },
        _end: function(event, obj) {
            var $this = $(obj),
                isSwipeLeft = event.delta.x < 0,

                t = Date.now() - event.start.time,  //计时
                s = Math.abs(event.delta.x),        //距离
                a = 2 * s / (t * t),                //加速度
                vt = 2 * s / t,                     //末速度

                offset = $this.offset().left,       //
                distance = 0,                       //
                obj_width = $this.width(),     //
                wrap_width = $(window).width();

                console.log(obj_width, wrap_width);

            mu.util.setCss($this, 'transition', '.3s');
            checkEdge(offset);

            if (a > 0.001) {
                distance = 2 * vt * vt / (2 * a) / 5;
            }

            var overflow = 50,
                drift = isSwipeLeft ? (offset - distance) : (offset + distance);

            if (drift < (wrap_width - obj_width - overflow)) drift = wrap_width - obj_width - overflow;
            if (drift > overflow) drift = overflow;

            mu.util.setCss($this, 'transform', 'translate3d(' + drift + 'px,0,0)');

            timeout = setTimeout(function() {
                checkEdge(drift);
                timeout = null;
            }, 0);

            function checkEdge(offset) {
                if (offset > 0) {
                    mu.util.setCss($this, 'transform', 'translate3d(0,0,0)');
                }
                if (offset < wrap_width - obj_width) {
                    mu.util.setCss($this, 'transform', 'translate3d(' + (wrap_width - obj_width) + 'px,0,0)');
                }
            }
        }
    };

    $.fn.slideAd = function(options){
        return this.each(function(){
            var $elem = $(this);
            core.init($elem, options);
        });
    };

})(this);