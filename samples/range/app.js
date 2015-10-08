/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
// (function(){
    'use strict';
    
    console.log('app start');

    var userSelection, text;

    $('.wrapper').on('mouseup', function(){

        getword();

    });

    // get range
    // get rangetext
    // get index, end
    // replace rangetext
    // test

    function getword(){

        if (window.getSelection) { 
            userSelection = window.getSelection();
        }

        var range = userSelection.getRangeAt(0);
        console.log(range);

        var nodeValue = range.startContainer.nodeValue;

        if(range.startContainer.parentNode.className === 'select-word'){
            return;
        }

        var start = range.startOffset,
            end = range.endOffset;

        //get start index, end index
        for(var i = start; i > 0; i--){
            if(/\s|\"|\'|\(/.test(nodeValue.charAt(i))){
                break;
            }
        }
        for(var j = start; j < nodeValue.length; j++){
            if(/\s|\,|\"|\'|\.|\!|\~|\)/.test(nodeValue.charAt(j))){
                break;
            }
        }

        console.log(i, j);

        range.setStart(userSelection.anchorNode, i+1);
        range.setEnd(userSelection.anchorNode, j);

        // cache string
        var targetStr = range.toString();

        console.log(range.toString());

        // create an new node for injection
        var node = document.createElement('span');
        node.className = 'select-word';
        node.innerHTML = range.toString();

        //delete origin content, then insert node
        range.deleteContents();
        if(targetStr){
            range.insertNode(node);
        }

        console.log(node, start, end);
    }

// })();