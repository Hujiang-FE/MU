/**
 * name:
 * author: roeis
 * description:
 */
(function() {
    'use strict';

    require.config({
        baseUrl: 'scripts',
        paths: {
            jquery: 'lib/jquery-1.9.1.min',
            underscore: 'lib/underscore-min',
            app: './app',
            request: 'helper/mu/mu-cache'
        },
        shim: {
            'helper/jquery.helpers': ['jquery'],
            // 'helper/mu/mu': ['jquery']
        }
    });

    require(['app/app', 'app/data'],
        function(app, data) {
            // console.log(app, data);
            // for (var key in data) {
            //     console.log(key, data[key]);
            // }
            app.init();
        });


})();