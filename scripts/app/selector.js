// define(function(){
(function(){
    'use strict';
    function query(selector, context){

        console.log('1', selector);
    }

    if (typeof define === 'function' && define.amd) {
      define([], function () {
          return query;
      });
    }
})();

//     return query;
// });

// if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
//     define( "jquery", [], function () { return jQuery; } );
// }