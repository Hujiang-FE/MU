
(function(){

    'use strict';

    var core = {
        test: function(){
            console.log('test, from select2');
        }
    };

    if(typeof define === 'function' && define.amd){
        define(['vender/app/selector'], function(query){
            core.test2 = function(){
                query('gromsdf');
            };
            return core;
        })
    }
    window.select2 = core;

})();