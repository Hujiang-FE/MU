/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
(function(){
    'use strict';
    
    console.log('app start');


    $('.wrapper').on('mouseup', function(){
        getword();
    });
    function getword(){
        var userSelection, text;
        if (window.getSelection) { 
            //现代浏览器
            userSelection = window.getSelection();
        } 
        // if (!(text = userSelection.text)) {
        //     text = userSelection;
        // }
        var start = userSelection.anchorOffset; 
        var end = userSelection.focusOffset;

        
        console.log(start, end);
        console.log(userSelection.toString())
    }

})();