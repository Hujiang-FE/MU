/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
(function($){
    'use strict';
    
    // demonstrate an example here, commonjs
    var slideTip = require('slideTip');

    slideTip.doSomething({
        test: 'test'
    });

    slideTip.doSomethingB();

    // or amd
    require('slideTip', function(slide){

        slide.doSomething();

    });

    require('dialog', function(dialog){

    });

})(jQuery);