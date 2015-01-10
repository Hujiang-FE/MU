/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @dependency: zepto;
 * @description: common functions collection
 * -------------------------------------------------------------
 */
(function(global) {
    'use strict';

    var h = global.hmu || {},
        $ = global.Zepto;

    h.func = {
        printWord: function($obj, str, invoke, speed) {
            var _str,
                i = 0,
                timeout = 0,
                interval = speed || 75,
                length = str.length,
                print = function() {
                    timeout = setTimeout(function() {
                        i++;
                        if (i > length) {
                            !!invoke && invoke();
                            return;
                        }
                        _str = str.substring(0, i);
                        $obj.html(_str);
                        print();
                    }, interval);
                };
            print();
        }

    };


})(this);