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
        stringify: function(object) {
            var jsonStr = '',
                jsonArr = [];

            jsonStr += '{';
            for (var key in object) {
                jsonArr.push('"' + key + '":' + '"' + object[key] + '"');
            }
            jsonStr += jsonArr.join(',');
            jsonStr += '}';

            return jsonStr;
        },

        getEvents: function() {
            $('[data-bi]').each(function() {
                var $this = $(this),
                    bi = $this.data('bi').split(',')[0];
                console.log(window.htKey + '_' + bi);
            });
        },

        paraArray2Obj: function(arr) {
            var obj = {},
                temp;
            for (var i = 0; i < arr.length; i++) {
                temp = arr[i].split(':');
                obj[$.trim(temp[0])] = $.trim(temp[1]);
            }
            return obj;
        },

        init: function() {
            $('[data-bi]').on('click', function(event) {
                var $this = $(this),
                    bi = $this.data('bi').split(','),
                    planid = bi[0],
                    parameter = bi.slice(1),
                    jsonStr = core.stringify(core.paraArray2Obj(parameter));

                // console.log(planid, jsonStr);
                if (typeof ht !== 'undefined') {
                    ht.sendCustomEvent(window.htKey + '_' + planid, jsonStr);
                }

            });
        }
    };

    core.init();

    window.bi2 = {
        getEvents: core.getEvents
    };

}());