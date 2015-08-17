/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */

(function(){
    'use strict';
    
})();


(function(global) {
    'use strict';

    //color 
    //size
    //tool
    var options = {
        id : 'canvasPainter',
        colors: {
            red: '#E93C3C',
            orange: '#F70',
            yellow: '#FFDB1D',
            green: '#A6E634',
            aqua: '#7FFFD4',
            blue: '#347BE6',
            purple: '#9451C9',
            white: '#FFF',
            black: '#111'
        }
    };

    var isPaint = false,
        context,
        canvas,
        $canvas,
        offset = {},
        curColor,
        curSize = 4,
        // curTool = 'pen',
        curMode = 'source-over',
        /** all steps of operate */
        steps = [],
        /** each step of it */
        step = [],
        shareUrl = window.location.origin + window.location.pathname


    var _pen = {
        init: function(opts){
            $.extend(options, opts || {});
            curColor = options.colors.black;

            $canvas = $('#' + options.id);
            offset = $canvas.offset();
            canvas = document.getElementById(options.id);
            if (!canvas.getContext){
                window.alert("你的浏览器不支持该画布操作");
                return;
            }

            context = canvas.getContext('2d');
            this.context = context;
            // add PC events
            var events = hmu.hasTouch ? 'touchstart touchmove touchend touchcancel' : 'mousedown mouseup mousemove mouseleave mouseout ';
            $canvas.on(events, _pen.onEvent);

            wx_data.link = "http://channel.hujiang.com/ch_click.aspx?ch_source=" + wx_data.key + "_share_weixin&page=" + encodeURIComponent(shareUrl);
            window.weixinShare.reset(wx_data, wx_invoke);

            this.bindButton();
        },
        /** event callback */
        onEvent: function(event){
            var touch = {};
            if (event.touches && event.touches.length > 0){
                touch = event.touches[0];
            }else{
                touch = event;
            }

            switch(event.type){
                case 'touchstart':
                case 'mousedown':
                    _pen.startPaint();
                    break;
                case 'mouseup':
                case 'mouseleave':
                case 'mouseout':
                case 'touchend':
                case 'touchcanel':
                    _pen.endPaint();
                    break;
            }
            //handle except events above 
            if(isPaint && touch){
                step.pixels.push({
                    x: touch.pageX- offset.left,
                    y: touch.pageY- offset.top
                });
                _pen.render(step, 2);
            }
            // localStorage.step = steps;
        },
        startPaint: function(){
            isPaint = true;
            step = {
                color: curColor,
                size: curSize,
                pixels: [],
                mode: curMode
            };
        },
        endPaint: function(){
            if(step){
                steps.push(step);
            }
            isPaint = false;
            step = null;
            // this.renderAll(steps);
            // _pen.render();
        },
        /**
         * render one step, not all steps,
         * @param  {array} step 必填
         */
        render: function(step, type){

            var last = step.pixels.length;

            context.lineJoin = 'round';
            context.lineCap = 'round';

            context.beginPath();

            if(last <= 1){
                context.moveTo(step.pixels[0].x, step.pixels[0].y);
                context.lineTo(step.pixels[0].x + 0.1, step.pixels[0].y + 0.1);
            }else{
                switch(type){
                    //render all pixels within one step
                    case 1:
                        for(var i = 0, len = step.pixels.length; i < len; i++){
                            var dot = step.pixels[i];
                            context.lineTo(dot.x, dot.y);
                        }
                        break;
                    //when touchmove or mousemove, render two close point
                    case 2:
                        context.moveTo(step.pixels[last-2].x, step.pixels[last-2].y);
                        context.lineTo(step.pixels[last-1].x, step.pixels[last-1].y);
                        break;
                }
            }
            // context.closePath();
            // context.shadowBlur = 1;
            // context.shadowColor = step.color;

            context.globalCompositeOperation = step.mode;
            context.strokeStyle = step.color;
            context.lineWidth = step.size;
            context.stroke();
        },

        renderAll: function(steps){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            if(steps.length > 0){
                for(var i = 0, len = steps.length; i < len; i++){
                    this.render(steps[i], 1);
                }
            }
        },

        clear: function(){
            steps = [];
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        },

        cancel: function(){
            steps.pop();
            this.renderAll(steps);
        },

        bindButton: function(){
            $clear.on('tap', function(){
                _pen.clear();
            });
            $cancel.on('tap', function(){
                _pen.cancel();
            });
            $next.on('click', function(){
                $('#group2').show();
                // pop.pop('#popic',{});
            });
            $pen.on('tap', function(){
                curMode = 'source-over';
                $pen.addClass('on');
                $rubber.removeClass('on');
            });

            $rubber.on('tap', function(){
                curMode = 'destination-out';
                $rubber.addClass('on');
                $pen.removeClass('on');
            });
            $color.on('tap', function(){
                $colorBg.toggle();
            });

            $colorBg.find('a').on('tap', function(){
                var $this = $(this),
                    color = $this.attr('data-color');
                curColor = options.colors[color];
                _hide();
            });

            $('.share-wx').on('tap', function(){
                pop.pop('<div class="tip-weixin"></div>',{isMiddle: false});
            });

            function _hide(){
                $colorBg.hide();
            }
        },

    };

    try{
        if(!localStorage.userUploadKey){
            localStorage.userUploadKey = _pen.getGUID();
        }
    }catch(e){
        alert('你处于无痕模式,关闭后重试');
    }

    _pen.init();

    window.pen = _pen;

})(this);