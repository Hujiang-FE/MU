/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: hmu utility
 * -------------------------------------------------------------
 */
(function(global) {
    "use strict";

    var h = global.hmu || {},
        $ = global.Zepto;

    var RE_UNLEGAL = /[^\w\u4e00-\u9fa5]/g,
        RE_DWORD = /[^\x00-\xff]/g,
        RE_NOTNUM = /[^\d]/g;

    var _core = {

        getLength: function(str){
            return str.replace(RE_DWORD, 'xx').length;
        }

    }

    h.validate = _core;

})(this);