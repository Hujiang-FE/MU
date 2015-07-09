/**
 * muslider
 * text scrolling
 */

(function(global, $, undefined) {
    'use strict';

    var setting = {
        height: 400,
        pause: 4000,
        reverse: true,
        afterEdge: null
    };

    var transArr = [],
        count = 0,
        timeout = null,
        $elem = null,
        $parent = null,
        offsetParent, totalHeight, childHeight,
        html_control = '<div class="subcontrol cf"><div class="sub_start">start</div><div class="sub_stop">stop</div></div>';

    var core = {
        init: function(elem, options){
            var $this = $(elem),
                $children = $this.children(),
                childHeight,totalHeight, offsetParent, initialOffset;
            $elem = $this;
            setting = $.extend(setting, options);

            // get current object
            $this.wrap('<div class="subtitle_wrap"><div class="subtitle_cont"></div></div>');

            $parent = $this.parent();

            // $(html_control).insertAfter($parent);

            offsetParent = $parent.offset().top;
            totalHeight = offsetParent + setting.height;
            childHeight = $this.height();

            $parent.css({
                height: setting.height + 'px',
                overflow: 'hidden'
            });

            core._getTransArr($children, offsetParent, childHeight - totalHeight);

            // console.log(offsetParent, 'child',childHeight, 'total', totalHeight, 'offset',childHeight - totalHeight);
            if(setting.reverse){
                initialOffset = '-'+ transArr[transArr.length - 1] +'px';
                transArr.reverse();
                transArr.shift();
                transArr.push(0);
            }else{
                initialOffset = '0px';
            }

            $this.css({
                '-webkit-transform': 'translateY('+ initialOffset +')',
                'transform': 'translateY('+ initialOffset +')',
                '-webkit-transition': '-webkit-transform 1s',
                'transition': 'transform 1s'
            });

            console.log(transArr);

            // core._bindEvent();
            // core.start();
        },

        _bindEvent: function(){
            $('.sub_stop').on('click', function(){
                $parent.data('status','pause');
                core.stop();
            });
            $('.sub_start').on('click', function(){
                $parent.data('status','play');
                core.start();
            });
        },

        _getTransArr: function(children, offsetParent, offset ){
            transArr = [];
            for(var i = 0, l = children.length; i < l; i++){
                var $child = $(children[i]),
                    step = $child.offset().top + $child.height() - offsetParent;
                if(step >= offset + offsetParent){
                    step = offset + offsetParent;
                    transArr.push(step);
                    break;
                }
                transArr.push(step);
            }
        },

        loop: function(){
            // alert(count);
            timeout = setTimeout(function(){
                if(count >= transArr.length) {
                    // $elem.css({
                    //     transform: 'translateY(0)'
                    // });
                    // count = 0;
                    setting.afterEdge.call(this, count);
                    return;
                }
                $elem.css({
                    '-webkit-transform': 'translateY(-'+ transArr[count] +'px)',
                    'transform': 'translateY(-'+ transArr[count] +'px)'
                });
                count++;
                core.loop();
            }, setting.pause);
        },

        destory: function(){
            $elem.unwrap().unwrap();
        },

        refresh: function(){
            core._getTransArr($elem.children(), offsetParent, childHeight - totalHeight);
        },

        start: function(){
            core.loop();
        },

        stop: function(){
            clearTimeout(timeout);
        },

        jump: function(){

        }

    };

    window.scrollSubtitle = core;

})(this, window.Zepto || window.jQuery);