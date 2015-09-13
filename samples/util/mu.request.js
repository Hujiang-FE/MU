/**
 * -------------------------------------------------------------
 * Copyright (c) 2014 All rights reserved.
 * @version: 1.1.2
 * @author: roeis
 * @dependency: zepto;
 * @description: ajax, request, localstorage, cache data
 * -------------------------------------------------------------
 */
(function(global, $) {
    'use strict';

    var mu = global.mu,
        CACHE_PREFIX = '_H_cache_',
        option = {
            url: '',
            data: {},
            success: null,
            error: null,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'jsonp',
            storage: false,     //单位: 分钟
        };

    var core = {

        get: function(opts) {
            opts = $.extend({}, option, opts);

            var storageId,
                cacheData,
                now = Date.now();

            opts.url += '?v=' + Math.random();

            // get a fake uid
            for (var key in opts.data) {
                storageId += '_' + opts.data[key];
            }

            // storage 判断缓存数据是否存在
            //      存在 -> 判断时间是否需要更新
            //          1 -> 重新请求
            //          0 -> 处理数据
            //      不存 -> 重新请求

            if (opts.storage && localStorage[CACHE_PREFIX + storageId]) {

                cacheData = core.getData(storageId);

                if (cacheData && (now - cacheData.cacheTime > opts.storage * 1000 * 60)) {
                    core._ajaxData(opts, storageId);
                } else {
                    opts.success && opts.success(cacheData.data);
                }

            } else {
                core._ajaxData(opts, storageId);
            }
        },

        _ajaxData: function(opts, storageId) {
            opts = $.extend({}, option, opts);
            $.ajax({
                type: 'GET',
                url: opts.url,
                dataType: opts.dataType,
                data: opts.data,
                jsonp: 'callback',
                success: function(data) {
                    opts.success && opts.success(data);
                    if (opts.storage && storageId) {
                        core.saveData(storageId, data);
                    }
                },
                error: function(err) {
                    opts.error && opts.error(err);
                }
            });
        },

        post: function(opts) {
            opts = $.extend({}, option, opts);
            $.ajax({
                type: 'POST',
                url: opts.url,
                data: opts.data,
                contentType: opts.contentType,
                dataType: opts.dataType,
                success: function(data) {
                    opts.success && opts.success(data);
                },
                error: function(err) {
                    opts.error && opts.error(err);
                }
            });
        },

        saveData: function(key, value) {
            var data = {
                data: value,
                cacheTime: Date.now()
            };
            localStorage[CACHE_PREFIX + key] = JSON.stringify(data);
        },

        getData: function(key) {
            if (localStorage[CACHE_PREFIX + key]) {
                return JSON.parse(window.localStorage[CACHE_PREFIX + key]);
            }
            return false;
        },

        clearData: function() {
            for (var key in localStorage) {
                if (key.indexOf(CACHE_PREFIX) === 0) localStorage.removeItem(key);
            }
        }
    };

    mu.request = core;

})(this, window.Zepto || window.jQuery);