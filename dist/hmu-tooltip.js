(function(global) {
    "use strict";
    /** 
     * @namespace
     * @global
     */
    var hmu = global.hmu || {},
        $ = global.Zepto;

    var options = {
        text: '',
        target: '.calender',
        afterChangeMonth: null
    };

    var HTML = '<div class="hi-tooltip" id="hitooltip"></div>',
        $body = $('body'),
        $tip,
        isShow = false;

    /**
     * @namespace
     * @global
     * @ignore
     */
    var _tool = {

        init: function(opts) {
            $.extend(options, opts || {});

            _tool._initHtml();
            _tool._bindEvent();
        },
        _initHtml: function() {
            $body.append(HTML);
            $tip = $('#hitooltip');
        },
        _bindEvent: function() {
            $(document).delegate('[data-tooltip]', 'click', function() {
                var $this = $(this);
                _tool._setCont($this,$tip);
                _tool._setPos($this, $tip);
                _tool.show();
            });
        },
        _setCont: function($obj, $target){
            var text = $obj.data('tooltip');
            $target.html(text);
        },
        _setPos: function($parent, $child){
            var w1 = $parent.width(),
                h2 = $child.height(),
                w2 = $child.width(),
                offset = $parent.offset(),
                left = offset.left + w1/2 -w2/2,
                top = offset.top - h2 - 10;
            $child.css({left: left, top: top});
        },
        _getPos: function($obj) {
            var offset = $obj.offset();
            return {
                left: offset.left,
                top: offset.top
            };
        },
        show: function() {
            if(isShow) return;
            isShow = true;
            $tip.css({opacity: 1, visibility: 'visible'});
            setTimeout(function(){
                $tip.css({opacity: 0, visibility: 'hidden'});
                isShow = false;
            },1000);
        }
    };

    _tool.init();

    /**
     * Copyright (c) 2014 All rights reserved.
     * @version: 1.0.0
     * @author: roeis
     * @description: dialog for mobile
     * @memberof hmu.widget
     * @namespace
     */
    hmu.widget.tooltip = {

    };

})(this);