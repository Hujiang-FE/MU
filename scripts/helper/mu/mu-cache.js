(function(global) {
    "use strict";
    /** 
     * @namespace
     * @global
     */
    var mu = global.mu || {};

    var CACHE_PREFIX = '_HJ_cache_';
    /**
     * @namespace
     * @global
     * @ignore
     */
    var _core = {
        /**
         * 通用ajax方法，支持localstorage
         * @param  {string} url       请求的URL
         * @param  {object} parameter 请求的参数
         * @param  {function} invoke    回调函数
         * @param  {number} storage   是否需要放入localstorage, 支持传false
         * @param  {string} datatype  'jsonp' or 'json'
         * @example mu.cache.ajaxData('url', {para: 'paravalue'}, function(data){dowith(data)},false)
         * @public
         */
        ajaxData: function(url, parameter, invoke, storage, datatype) {
            var localId = '',
                url = url + '?v=' + Math.random(),
                now = Date.now(),
                oldData = {};

            for (var name in parameter) {
                localId += '_' + parameter[name];
            }

            if (storage && localStorage[CACHE_PREFIX + localId]) {

                oldData = _core.getlocalData(localId);

                if (!!oldData && (now - oldData.cacheTime > (storage * 1000 * 60 || 1000 * 60 * 10))) {
                    _core._ajaxData(url, parameter, invoke, storage, localId, datatype);
                } else {
                    !!invoke && invoke(oldData.data);
                }

            } else {
                _core._ajaxData(url, parameter, invoke, storage, localId, datatype);
            }
        },

        _ajaxData: function(url, parameter, invoke, storage, key, datatype) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: datatype || 'jsonp',
                data: parameter,
                jsonp: 'callback',
                success: function(data) {
                    !!invoke && invoke(data);
                    if (storage && key) _core.saveData(key, data);
                },
                error: function(error) {
                    console.log('请求数据失败,请重试或刷新');
                }
            });
        },
        /**
         * post请求
         * @param  {string} url       请求的URL
         * @param  {object} parameter 请求的参数
         * @param  {function} invoke    回调函数
         * @example mu.cache.postData('url', {para: 'paravalue'}, function(data){console.log(data)})
         * @public
         */
        postData: function(url, parameter, invoke) {
            $.ajax({
                type: 'POST',
                url: url,
                data: parameter,
                dataType: 'json',
                success: function(data) {
                    !!invoke && invoke(data);
                }
            });
        },
        /**
         * 会存储带前缀key的data, 前缀是： '_HJ_cache'
         * @param  {string} key   名称
         * @param  {obbject} value 对应数据，在localstorage里会存成字符串
         * @example mu.cache.save('key1', {yourdata: 'datavalue'});
         * @public
         */
        saveData: function(key, value) {
            var data = {
                data: value,
                cacheTime: Date.now()
            };
            window.localStorage[CACHE_PREFIX + key] = JSON.stringify(data);
        },
        /**
         * 取出data,不用写前缀
         * @param  {string} key   名称
         * @example mu.cache.get('key1', {yourdata: 'datavalue'});
         * @public
         */
        getlocalData: function(key) {
            if (window.localStorage[CACHE_PREFIX + key]) {
                return JSON.parse(window.localStorage[CACHE_PREFIX + key]);
            }
        },
        /**
         * 清空带前缀的data
         * @example mu.cache.clear();
         * @public
         */
        clearLocal: function() {
            var storage = window.localStorage;

            for (var key in storage) {
                if (key.indexOf(CACHE_PREFIX) === 0) storage.removeItem(key);
            }
        }
    };

    /**
     * Copyright (c) 2014 All rights reserved.
     * @version 1.1.2
     * @author roeis
     * @dependency zepto;
     * @description ajax相关，包含ajax, post , localstorage, save data, get data
     * @memberof mu
     * @namespace
     * @borrows _core.ajaxData as ajaxData
     * @borrows _core.postData as postData
     * @borrows _core.saveData as save
     * @borrows _core.getlocalData as get
     * @borrows _core.clearLocal as clear
     */
    mu.cache = {
        ajaxData: _core.ajaxData,
        postData: _core.postData,
        save: _core.saveData,
        get: _core.getlocalData,
        clear: _core.clearLocal
    };

    if(typeof define === 'function' && define.amd){
        define([], function(){
            return mu.cache;
        });
    }

})(this);