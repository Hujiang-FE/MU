(function(global) {
    "use strict";
    
    var $ = global.Zepto || global.jQuery,
        util = mu.util;

    var HTML_POP = '<div class="hipop" id="hipop"><div class="hipop-cont" id="hicont"></div></div>',
        HTML_POP_BG = '<div class="hipop-bg" id="popbg"></div>',
        WIN_H = document.documentElement.clientHeight || window.innerHeight,
        isContAnimating = false,
        isBgAnimating = false,
        isOpen = false,
        $body = $('body'),
        animationEnd = util.animationEnd().animationend,
        $bg, $pop, $cont;

    var options = {
        beforeOpen: null,
        afterOpen: null,
        beforeClose: null,
        afterClose: null,
        offset: 0,
        isMiddle: true,
        isShowbg: true,
        bgShowClass: 'hiFadeIn',
        bgHideClass: 'hiFadeOut',
        showClass: 'hiFadeInUp',
        hideClass: 'hiFadeOutUp',
        customClass: null
    };
    /**
     * @namespace
     * @global
     * @ignore
     */
    var core = {

        /**
         * 自定义弹窗方法，支持id, class, 自定义html
         * @param  {string} o id, class, or string(html);
         * @param  {object} opts your options
         * @example mu.widget.dialog.pop('.pop1',{});
         * @public
         */
        pop: function(o, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend({}, options, opts || {}),
                html = '';
            if (o.indexOf('#') === 0 || o.indexOf('.') === 0) {
                html = util.getOriginHtml($(o));
            } else if (util.getType(o) === 'string') {
                html = o;
            } else {
                html = '<div class="hitext">it can\'t support your pop yet</div>';
            }

            $cont.addClass('hi-common').html(html);
            core._showPop(option);
            $bg.on('click.offbg', function(event){
                core._bindBgEvent(event, option);
            });
        },
        /**
         * 警示框
         * @param  {string} str  string;
         * @param  {object} opts  your options
         * @example mu.widget.dialog.alert('are u sure');
         * @public
         */
        alert: function(str, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend({}, options, opts || {}),
                html = '<div class="hitext">' + str + '</div>';

            $cont.addClass('hi-alert').html(html);
            core._showPop(option);
            $bg.on('click.offbg', function(event){
                core._bindBgEvent(event, option);
            });
        },
        /**
         * 提示框, 自动消失
         * @param  {string} str  string;
         * @param  {object} opts  your options
         * @example mu.widget.dialog.tip('yes ,u r right');
         * @public
         */
        tip: function(str, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend({}, options, opts || {}),
                html = '<div class="hitext">' + str + '</div>';

            $cont.addClass('hi-tip').html(html);
            core._showPop(option);
            $bg.off('click.offbg', function(event){
                core._bindBgEvent(event, option);
            });

            setTimeout(function() {
                core.close(opts);
            }, 1500);
        },
        /**
         * 关闭
         * @param  {object} opts  your options
         * @example mu.widget.dialog.close();
         * @public
         */
        close: function(opts) {
            var option = $.extend({}, options, opts || {});
            option.beforeClose && option.beforeClose();
            core._hidePop(option);
        },
        _init: function() {
            $body.append(HTML_POP_BG).append(HTML_POP);
            $bg = $('#popbg');
            $pop = $('#hipop');
            $cont = $('#hicont');
        },
        _bindBgEvent:function(event, opts){
            //prevent the spread of click
            if(isBgAnimating || isContAnimating) return;
            core.close(opts);
            event.stopPropagation();
        },
        _setPosition: function(opts) {
            var contheight = $cont.height(),
                scrolltop = document.body.scrollTop || window.scrollY,
                offset = scrolltop + opts.offset;

            if(opts.isMiddle) {
                offset += (WIN_H - contheight) / 2;
            }

            $pop.css('top', offset);
        },
        _showPop: function(opts) {
            if(isBgAnimating || isContAnimating) return;
            isBgAnimating = isContAnimating = true;

            // util.preventScroll();
            core._setPosition(opts);
            var style = $body.attr('style') ? '' : $body.attr('style');
            $body.css({'height': document.body.scrollHeight, 'position': 'relative'}).attr('data-style',style);

            opts.customClass && $pop.addClass(opts.customClass);

            opts.isShowbg ? $bg.removeClass('hitransparent') : $bg.addClass('hitransparent');

            core._show($bg, opts.bgShowClass, function(){
                isBgAnimating = false;
            });
            core._show($pop, opts.showClass, function(){
                isContAnimating = false;
                opts.afterOpen && opts.afterOpen();
            });

            opts.beforeOpen && opts.beforeOpen();
        },
        _hidePop: function(opts) {
            isOpen = false;
            //使用recoverScroll()后，事件swipeUp, swipeDown将失效
            // util.recoverScroll();
            core._hide($bg, opts.bgHideClass, function(){
                $body.attr('style', $body.attr('data-style'));
                isBgAnimating = false;
            });
            // callback after hide the pop cont
            core._hide($pop, opts.hideClass,function(){
                $cont.attr('class', 'hipop-cont');
                $pop.attr({'class':'hipop','style':''});
                isContAnimating = false;
                opts.afterClose && opts.afterClose();
            });
            $cont.html('');
        },
        _show: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.addClass('hivisible').removeClass(cls).off(animationEnd);
                invoke && invoke();
            });
        },
        _hide: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.removeClass(cls + ' hivisible').off(animationEnd);
                invoke && invoke();
            });
        }

    };

    core._init();
    /**
     * Copyright (c) 2014 All rights reserved.
     * @version: 0.5.1
     * @author: roeis
     * @description: dialog for mobile
     * @memberof mu.widget
     * @namespace
     * @borrows core.pop as pop
     * @borrows core.confirm as confirm
     * @borrows core.alert as alert
     * @borrows core.tip as tip
     * @borrows core.close as close
     */
    mu.widget.dialog = {
        pop: core.pop,
        alert: core.alert,
        tip: core.tip,
        close: core.close
    };

})(this);