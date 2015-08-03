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
    /** 
     * @namespace
     * @public
     */
    var hmu = global.hmu || {},
        $ = global.Zepto;
    /**
     * 这个是私有对象，直接访问不能
     * @memberof hmu.widget.pagetrans
     * @enum
     */
    var options = {
        /**
         * 转场前回调函数，处理一些BUG等
         */
        beforePageTrans: function() {},
        /**
         * 转场后回调函数
         */
        afterPageTrans: function() {},
        /**
         * 转场class对象
         */
        cls: {
            'inclass': {
                1: 'pt-moveFromRightFade',
                2: 'pt-moveFromLeftFade'
            },
            'ouclass': {
                1: 'pt-moveToLeftFade',
                2: 'pt-moveToRightFade'
            }
        },
        /** 目标对象 */
        target: '.page',
        /** 是否循环 */
        loop: true,
        /** 指定页面数量*/
        pageSize: null,
        /** 指定开始页面*/
        pageStart: 0
    };

    var isAnimating = false,
        current = 0,
        pageLength = 0,
        curClass='page-current',
        $in_page,
        $ou_page,
        endCurrPage = false,
        endNextPage = false,
        animationEnd = hmu.util.animationEnd().animationend;
    /**
     * @namespace
     * @global
     * @ignore
     */
    var _core = {
        /**
         * 初始化转场数据
         * @param  {object} opts
         * @example var page = hmu.widget.pagetrans;
         * page.init({
         *      beforePageTrans: function($out, $in){
         *          console.log($out, $in);
         *      },
         *      afterPageTrans: function($out, $in, current){
         *          console.log($out, $in, current)
         *      },
         *      loop: false
         * });
         */
        init: function(opts) {
            $.extend(options, opts || {});
            current = options.pageStart;
            _core._initClass();
        },
        _initClass: function() {
            $(options.target).each(function() {
                var $this = $(this),
                    index = $this.index();
                $this.addClass('page-' + index)
                    .data('originalClass', options.target.replace('.','')+' page-' + index)
                    .attr('id', 'page' + index);
            }).eq(current).addClass(curClass).siblings().removeClass(curClass);

            pageLength = options.pagesize || $(options.target).length;
        },
        destroy: function(){
            $(options.target).removeAttr('data-original-class').removeAttr('id');
        },
        /**
         * [jumpToPage description]
         * @param  {number} index 序号
         * @param  {string} ouclass_group_num 转出页面class组号
         * @param  {string} inclass_group_num 转近页面class组号
         */
        jumpToPage: function(index, ouclass_group_num, inclass_group_num) {
            var inclass, ouclass,
                ou_num = ouclass_group_num || 1,
                in_num = inclass_group_num || 2;
            if (isAnimating || index === current) return;

            $in_page = $('#page' + index);
            $ou_page = $('#page' + current);

            ouclass = index > current ? options.cls.ouclass[ou_num] : options.cls.ouclass[in_num];
            inclass = index > current ? options.cls.inclass[ou_num] : options.cls.inclass[in_num];

            _core._changePage($ou_page, $in_page, ouclass, inclass);
        },
        /**
         * 上一页
         */
        prev: function() {
            var index = current;
            index--;
            if (options.loop && index < 0) {
                index = pageLength - 1;
                _core.jumpToPage(index, 2, 1);
            } else if (!options.loop && index < 0) {
                return;
            } else {
                _core.jumpToPage(index);
            }
        },
        /**
         * 下一页
         */
        next: function() {
            var index = current;
            index++;
            if (options.loop && index > pageLength - 1) {
                index = 0;
                _core.jumpToPage(index, 2, 1);
            } else if (!options.loop && index > pageLength - 1) {
                return;
            } else {
                _core.jumpToPage(index);
            }
        },
        _changePage: function($oupage, $inpage, ou_class, in_class) {

            hmu.widget.pagetrans.isAnimating = isAnimating = true;
            $inpage.addClass('page-current');

            options.beforePageTrans.call(this, $oupage, $inpage);

            _core._pageAnimation($oupage, $inpage, ou_class, 1);
            _core._pageAnimation($inpage, $oupage, in_class, 2);
        },
        _pageAnimation: function($oupage, $inpage, animationclass, type) {
            $oupage.addClass(animationclass).on(animationEnd, function() {
                $oupage.off(animationEnd);
                if (type === 1) {
                    endCurrPage = true;
                    if (endNextPage) _core._afterAnimation($oupage, $inpage);
                } else {
                    endNextPage = true;
                    if (endCurrPage) _core._afterAnimation($inpage, $oupage);
                }
            });
        },
        _afterAnimation: function($oupage, $inpage) {
            endCurrPage = false;
            endNextPage = false;
            hmu.widget.pagetrans.isAnimating = isAnimating = false;
            $oupage.attr('class', $oupage.data('originalClass'));
            $inpage.attr('class', $inpage.data('originalClass') + ' page-current');

            hmu.widget.pagetrans.current = current = $inpage.index();

            options.afterPageTrans.call(this, $oupage, $inpage, current);
        }
    };
    /**
     * Copyright (c) 2014 All rights reserved.
     * @version 0.0.6
     * @author roeis
     * @description 转场动画, 事件由用户自定义绑定,提供jump，prev，next 三个方法
     * @memberof hmu.widget
     * @namespace
     * @borrows _core.init as init
     * @borrows _core.jumpToPage as jump
     * @borrows _core.prev as prev
     * @borrows _core.next as next
     */
    hmu.widget.pagetrans = {
        current: current,
        isAnimating: false,
        defaultOptions: options,
        init: _core.init,
        jump: _core.jumpToPage,
        prev: _core.prev,
        next: _core.next,
        destroy: _core.destroy
    };


})(this);