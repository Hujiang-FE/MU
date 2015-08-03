/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: common pop plugin to utility
 * --------------------------------------------------------
 */
(function($, undefined){
    'use strict';

    var mu = window.mu || {};
    window.mu = mu;
    mu.util = mu.util || {};

    // require Dialog
    if(!window.MuDialog) return;

    var dialog = new window.MuDialog('<div class="mu-pop"></div>', {
        zIndex: 9999,
        isBgCloseable: false,
        opacity: 0.7,
        classSet: 'scaleUpIn'
    });
    /**
     * tip
     * @param  {[type]} string  
     * @param  {[type]} timeout 
     * @return {[type]}         
     */
    mu.util.tip = function(string, timeout){
        var html = '<div class="mu-pop-title">提示</div><div class="mu-pop-content">' + string + '</div>';
        $.extend(dialog.options, {});

        dialog.html(html);
        dialog.open();
        setTimeout(function(){
            dialog.close();
        }, timeout || 3000);
    };
    /**
     * alert
     * @param  {[type]} string 
     * @return {[type]}        
     */
    mu.util.alert = function(string){
        var html = '<div class="mu-pop-content">' + string + '</div>'+
                    '<div class="mu-btns">'+
                    '<div class="mu-btn mu-btn-ok">确定</div>'+
                    '</div>';
        $.extend(dialog.options, {});
        dialog.html(html);
        dialog.open();
        $(document).on('click', '.mu-btn-ok', function(){
            dialog.close();
        });
    };
    /**
     * [confirm description]
     * @return {[type]} [description]
     */
    mu.util.confirm = function(string, callback){
        var html =  '<div class="mu-pop-content">' + string + '</div>' +
                    '<div class="mu-btns mu-2btns cf">'+
                    '<div class="mu-btn mu-btn-confirm">确定</div>' +
                    '<div class="mu-btn mu-btn-cancel">取消</div>'+
                    '</div>';
        $.extend(dialog.options, {});
        dialog.html(html);
        dialog.open();
        $('.mu-btn').on('click', function(){
            dialog.close();
            var $this = $(this);
            if($this.hasClass('mu-btn-confirm')){
                callback.call(this, true);
            }else{
                callback.call(this, false);
            }
        });
    };

})(window.Zepto || window.jQuery);