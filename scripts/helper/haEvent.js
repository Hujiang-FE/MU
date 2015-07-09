/**
 * name: 统计
 * author: roeis
 * description: 配合ht.min.js封装整合方法。适用PC、Mobile。
 * 不引用jquery/zepto时，自行调用sendEvent
 */
(function() {
    'use strict';

    var core = {
        version: '1.0.0',
        /**
         * custom stringify, into a jsonstring
         * @param  {[type]} object
         * @return {string}
         */
        stringify: function(object) {
            var jsonStr = '';

            jsonStr += '{';
            for (var key in object) {
                jsonStr += '"' + key + '":' + '"' + object[key] + '",';
            }
            jsonStr = jsonStr.slice(0, -1);
            jsonStr += '}';

            return jsonStr;
        },
        /**
         * 固定格式的class 拆分, class会比较长, 事件回调，event必须
         * eg: _HT_8_23_param1_param2_param3
         * @param  {object} event object
         */
        sendEvent: function(event) {
            var target, cls, planId, eventId,
                jsonStr = '',
                param = {};
            if (!event) return;

            target = event.currentTarget;
            cls = target.className.match(/_HT[^ ]*/)[0].split('_');
            cls.splice(0, 2);
            if (cls.length < 3) return;
            planId = cls[0];
            eventId = cls[1];

            for (var i = 2; i < cls.length; i++) {
                param['Param' + (i - 1)] = cls[i];
            }
            // 兼容IE7, 手动拼json字符串, JSON.stringify 不支持ie7
            jsonStr = core.stringify(param);
            // jsonStr = JSON.stringify(param);
            console.log(planId, eventId, jsonStr);
            if (typeof SendEvent === 'function') {
                SendEvent(planId, eventId, jsonStr);
            }
            cls = [];
        },

        init: function() {
            if (typeof $ === 'function') {
                $(document).delegate('*[class*=_HT]', 'click', core.sendEvent);
            } else {
                console.log('请自行使用该sendEvent~');
            }
        }
    };

    core.init();

    window.ht2 = core;

}());