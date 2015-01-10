(function(global) {
    "use strict";
    /** 
     * @namespace
     * @global
     */
    var hmu = global.hmu || {},
        $ = global.Zepto,
        util = hmu.util;

    var HTML_POP = '<div class="hipop" id="hipop"><div class="hipop-cont" id="hicont"></div></div>',
        HTML_POP_BG = '<div class="hipop-bg" id="popbg"></div>',
        HTML_CONFIRM = '<div class="hifunction cf"><a href="javascript:;" id="hi-confirm">确认</a><a href="javascript:;" id="hi-cancel">取消</a></div>';

    var $body = $('body'),
        WIN_H = document.documentElement.clientHeight || window.innerHeight,
        isAnimating = false,
        isOpen = false,
        animationEnd = util.animationEnd().animationend,
        $bg, $pop, $cont;

    var options = {
        beforeOpen: null,
        afterOpen: null,
        beforeClose: null,
        afterClose: null,
        afterConfirm: null,
        afterCancel: null,
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
    var _core = {

        /**
         * 自定义弹窗方法，支持id, class, 自定义html
         * @param  {string} o id, class, or string(html);
         * @param  {object} opts your options
         * @example hmu.widget.dialog.pop('.pop1',{});
         * @public
         */
        pop: function(o, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend(util.copy(options), opts || {}),
                html = '';
            if (o.indexOf('#') === 0 || o.indexOf('.') === 0) {
                html = util.getOriginHtml($(o));
            } else if (util.getType(o) === 'string') {
                html = o;
            } else {
                html = '<div class="hitext">it can\'t support your pop yet</div>';
            }

            $cont.addClass('hi-common').html(html);
            _core._showPop(option);
            $bg.on('click.offbg', _core._bindBgEvent);
        },
        /**
         * 确认框，接收字符串
         * @param  {string} str  string;
         * @param  {object} opts  your options
         * @example hmu.widget.dialog.confirm('are u sure',{afterConfirm: invokeName});
         * @public
         */
        confirm: function(str, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend(util.copy(options), opts || {}),
                html = '<div class="hitext">' + str + '</div>';
                
            $cont.addClass('hi-confirm').html(html);
            $cont.append(HTML_CONFIRM);
            _core._showPop(option);
            $bg.on('click.offbg', _core._bindBgEvent);

            $('#hi-confirm').on('click.confirm', function(){
                option.afterConfirm && option.afterConfirm();
                _core.close(option);
            });

            $('#hi-cancel').on('click.cancel', function(){
                option.afterCancel && option.afterCancel();
                _core.close(option);
            });
        },
        /**
         * 警示框
         * @param  {string} str  string;
         * @param  {object} opts  your options
         * @example hmu.widget.dialog.alert('are u sure');
         * @public
         */
        alert: function(str, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend(util.copy(options), opts || {}),
                html = '<div class="hitext">' + str + '</div>';

            $cont.addClass('hi-alert').html(html);
            _core._showPop(option);
            $bg.on('click.offbg', _core._bindBgEvent);
        },
        /**
         * 提示框, 自动消失
         * @param  {string} str  string;
         * @param  {object} opts  your options
         * @example hmu.widget.dialog.tip('yes ,u r right');
         * @public
         */
        tip: function(str, opts) {
            if(isOpen) return;
            isOpen = true;
            var option = $.extend(util.copy(options), opts || {}),
                html = '<div class="hitext">' + str + '</div>';

            $cont.addClass('hi-tip').html(html);
            _core._showPop(option);
            $bg.off('click.offbg', _core._bindBgEvent);

            setTimeout(function() {
                _core.close(opts);
            }, 1500);
        },
        /**
         * 关闭
         * @param  {object} opts  your options
         * @example hmu.widget.dialog.close();
         * @public
         */
        close: function(opts) {
            var option = $.extend(util.copy(options), opts || {});
            option.beforeClose && option.beforeClose();
            _core._hidePop(option);
        },
        _init: function() {
            $body.append(HTML_POP_BG).append(HTML_POP);
            $bg = $('#popbg');
            $pop = $('#hipop');
            $cont = $('#hicont');
        },
        _bindBgEvent:function(event){
            //prevent the spread of click
            if(!isAnimating){
                _core.close();
            }
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
            if(isAnimating) return;
            isAnimating = true;
            util.preventScroll();
            _core._setPosition(opts);
            var style = $body.attr('style').length === 0 ? '' : $body.attr('style');
            $body.css({'height': document.body.scrollHeight, 'position': 'relative'}).attr('data-style',style);

            opts.customClass && $pop.addClass(opts.customClass);

            opts.isShowbg ? $bg.removeClass('hitransparent') : $bg.addClass('hitransparent');

            _core._show($bg, opts.bgShowClass);
            _core._show($pop, opts.showClass, opts.afterOpen);
        },
        _hidePop: function(opts) {
            isOpen = false;
            util.recoverScroll();
            _core._hide($bg, opts.bgHideClass, function(){
                $body.attr('style', $body.attr('data-style'));
            });
            // callback after hide the pop cont
            _core._hide($pop, opts.hideClass,function(){
                $cont.attr('class', 'hipop-cont');
                $pop.attr({'class':'hipop','style':''});
                opts.afterClose && opts.afterClose();
            });
            $cont.html('');
        },
        _show: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.addClass('hivisible').removeClass(cls).off(animationEnd);
                invoke && invoke();
                isAnimating = false;
            });
        },
        _hide: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.removeClass(cls + ' hivisible').off(animationEnd);
                invoke && invoke();
                isAnimating = false;
            });
        }

    };

    _core._init();
    /**
     * Copyright (c) 2014 All rights reserved.
     * @version: 0.5.1
     * @author: roeis
     * @description: dialog for mobile
     * @memberof hmu.widget
     * @namespace
     * @borrows _core.pop as pop
     * @borrows _core.confirm as confirm
     * @borrows _core.alert as alert
     * @borrows _core.tip as tip
     * @borrows _core.close as close
     */
    hmu.widget.dialog = {
        pop: _core.pop,
        confirm: _core.confirm,
        alert: _core.alert,
        tip: _core.tip,
        close: _core.close
    };

})(this);