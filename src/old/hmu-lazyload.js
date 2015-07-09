/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: lazyload dependency: hmu-util
 * -------------------------------------------------------------
 */
(function(global) {
    'use strict';

    var h = global.hmu || {},
        $ = global.Zepto;

    var options = {
        container: window
    };

    var _core = {

        _loadElement: function() {
            $('img[data-lazy]').each(function() {
                var $this = $(this),
                    _src = $this.attr('data-src'),
                    loaded = $this.attr('data-lazy'),
                    flag = h.util.isInView($this);
                if (flag && loaded === '0') {
                    $this.attr({
                        'src': _src,
                        'data-lazy': 1
                    });
                }
            });
        },

        init: function(opts) {
            options = $.extend(options, opts || {});
            _core._loadElement();
            $(options.container).on('scroll.lazyload', function() {
                _core._loadElement();
            });
        }
    };

    h.widget.lazyload = {
        init: _core.init
    };

})(this);