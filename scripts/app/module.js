/**
 * name: 
 * author: roeis
 * description: 
 */
// (function(){
    // 'use strict';
    
    // var app = require('./app.js');
    var uid = require('matthewmueller/uid');
    var fmt = require('yields/fmt');

    var msg = fmt('Your unique ID is %s!', uid());
    window.alert(msg);
    // module.exports = function (s) { return s.toUpperCase() + '!' };
// })();