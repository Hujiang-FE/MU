/**CustomEvent polyfill https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent*/
(function () {
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

/**
 * 基于zepto的touch事件，事件只会绑定在特定的元素上，不会绑定到document上
 */
(function($) {
    'use strict';
    var t,x,y;
    var _Touch = function(el,evt){
        function createCustomEvent(touchName,e){
            var evt,
                touchDetail = e.changedTouches[0];
            if (window.CustomEvent) {
                evt = new window.CustomEvent(touchName, {
                    bubbles: true,
                    cancelable: true,
                    detail : touchDetail
                });
            } else {
                evt = document.createEvent('CustomEvent');
                //规范https://developer.mozilla.org/zh-CN/docs/Web/API/Event/CustomEvent#initCustomEvent()
                evt.initCustomEvent(touchName, true, true, detail);
            }
            return evt;
        }
        var touch = {
            el : typeof el === 'object' ? el : document.getElementById(el),
            element : el,
            moved : false, //flags if the finger has moved
            moveDirection : '',//moved direction
            startX : 0, //starting x coordinate
            startY : 0, //starting y coordinate
            hasTouchEventOccured : false, //flag touch event
            initEvt : evt,

            start : function (e) { 
                
                if (e.type === 'touchstart') {
                    this.hasTouchEventOccured = true;
                }
                this.moved = false;
                this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
                this.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
                this.moveDirection = '';
            },

            move : function (e) {
                //if finger moves more than 30px flag to cancel
                // 移动大于30px的时候认为移动了
            
                if (Math.abs(e.touches[0].clientX - this.startX) > 30 || Math.abs(e.touches[0].clientY - this.startY) > 10) {
                    if(e.touches[0].clientX - this.startX > 0){
                        this.moveDirection = 'right';
                    }
                    if(e.touches[0].clientX - this.startX < 0){
                        this.moveDirection = 'left';
                    }
                    this.moved = true;
                   
                }
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            },
            end : function (e) {
               
                var evt;
                if (this.hasTouchEventOccured) {

                    e.preventDefault();
                    //e.stopPropagation();不阻止冒泡，是为了让在父元素也能够获取到touchend事件
                    this.hasTouchEventOccured = false;
                    //return;
                }
                /*
                 * 因为tap,swipe事件都是通过封装同样的事件达到，在同一个元素上会产生touch事件的多次绑定
                 * 所以在具体构造事件的时候，还有判断传入的是否是对应的tap，swipe事件
                 */
                if (!this.moved) {//没有移动
                    if(this.initEvt == 'tap'){//不能拿到this.moved那一行去
                        evt = createCustomEvent('tap',e);
                    }
                }else{//有移动
                   
                    if(this.moveDirection == 'left' && this.initEvt == 'swipeleft'){
                        evt = createCustomEvent('swipeleft',e);
                    }else if(this.moveDirection == 'right' && this.initEvt == 'swiperight'){
                        evt = createCustomEvent('swiperight',e);
                    }
                    
                }
                // dispatchEvent returns false if any handler calls preventDefault,
                if (evt && !e.target.dispatchEvent(evt)) {
                    // in which case we want to prevent clicks from firing.
                    e.preventDefault();
                }
                //不支持preventDefault的机型，才会去click里面阻止click的原生行为
                if(!e.defaultPrevented){
                    t = +new Date();
                }
            },
            cancel : function (e) {
              
                this.hasTouchEventOccured = false;
                this.moved = false;
                this.startX = 0;
                this.startY = 0;
            },
            destroy : function(){
                var el = this.element;
                el.removeEventListener('touchstart', this, false);
                el.removeEventListener('touchmove', this, false);
                el.removeEventListener('touchend', this, false);
                el.removeEventListener('touchcancel', this, false);
                this.element = null;
            },
            handleEvent : function(e){
                 switch (e.type) {
                    case 'touchstart': this.start(e); break;
                    case 'touchmove': this.move(e); break;
                    case 'touchend': this.end(e); break;
                    case 'touchcancel': this.end(e); break;// touchcancel == touchend
                }
            }
        };

        return touch;
         
    };
    var Touch = function(el,evt){
        var func = _Touch(el,evt);

        el.addEventListener('touchstart', func, false);
        el.addEventListener('touchmove', func, false);
        el.addEventListener('touchend', func, false);
        el.addEventListener('touchcancel', func, false);

    };
    var unTouch = function(el,evt){
        _Touch(el,evt).destroy();
    };
    var oldBind = $.fn.on,
        oldUnBind = $.fn.off,
        onArray = [];
    $.fn.on = function( evt ){
        
        if( /(^| )(tap|swipeleft|swiperight)( |$)/.test( evt ) ){ 
            for(var i=0; i<this.length;i++){
                Touch( this[i],evt );
            }
        }
        return oldBind.apply( this, arguments );
    };
    $.fn.off = function( evt ){
        if( /(^| )(tap|swipeleft|swiperight)( |$)/.test( evt ) ){
            for(var i=0 ;i<this.length;i++){
               unTouch( this[i],evt );
            }
        }
        return oldUnBind.apply( this, arguments );
    };
    //去掉ghost click 详细见http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
    window.addEventListener('click', function (e) {
        var time_threshold = 500,
            space_threshold = 100;
     
        if (+new Date() - t <= time_threshold && Math.abs(e.clientX - x) <= space_threshold && Math.abs(e.clientY - y) <= space_threshold) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
}(Zepto));