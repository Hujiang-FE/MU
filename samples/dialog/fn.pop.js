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
    

    var mu = window.mu || {};
    window.mu = mu;
    mu.util = mu.util || {};

    var dialog = new window.Dialog('<div class="mu-pop"></div>', {
                isBgCloseable: false,
                zIndex: 9999,
                classSet: 'scaleUpIn'
            });

    mu.util.tip = function(string, timeout){
        var el = '<div class="mu-pop-tip">' + string + '</div>';
        dialog.html(el);
        dialog.open();
        setTimeout(function(){
            dialog.close();
        }, timeout || 9000);
    };

    mu.util.alert = function(string){
        var el = '<div class="mu-pop-alert">' + string + '</div>'+
                '<div class="mu-btn-ok">确定</div>';
        dialog.html(el);
        dialog.open();

    };

    $(document).on('click', '.mu-btn-ok', function(){
        dialog.close();
    });
    /**
     * [confirm description]
     * @return {[type]} [description]
     */
    mu.util.confirm = function(string){
        var flag = false;

        return flag;
    };




})();