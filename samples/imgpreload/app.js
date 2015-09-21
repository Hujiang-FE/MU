/**
 * -------------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.1.0
 * @author: roeis
 * @description: 
 * -------------------------------------------------------------
 */

(function($) {
    'use strict';

    var option = {
        list: null,
        loading: null,
        loaded: null
    };

    var total = 0,
        index = 0;

    var core = {
        init: function(opts){
            $.extend(option, opts);
            this.create();
            this.load();
        },

        create: function(){
            this.$view = $('.mu-preload');
        },

        // 串行回调
        load: function(){
            var self = this;
            if (index >= option.list.length ) {
                option.loaded.call(self);
                return;
            }
            this.loadImg(option.list[index], function(){
                option.loading.call(self, index);
                index ++;
                self.load();
            });
        },

        loadImg: function(imgSrc, callback){
            var image = new Image();
            image.src = imgSrc;
            image.onload = function(){
                callback();
                image.onload = null;
            };
            image.onerror = function(){
                callback();
                image.onerror = null;
            };
        },
        jumpNum: function(){
            this.jumpIndex = 0;
            this.jumpNumber();
        },
        jumpNumber: function(callback){
            var self = this;
            if(self.jumpIndex > 90){
                console.log('number end');
                return;
            }
            setTimeout(function(){
                self.jumpIndex ++;
                $('.mu-preload').find('.mu-preload-line').css('width', parseInt(self.jumpIndex));
                $('.mu-preload').find('.mu-preload-num').text(self.jumpIndex + '%');
                self.jumpNumber();
            }, 20);
        }
    };

    // make a fade one
    // 伪装一个假的loading 充当preLoading,
    // 再包一层读取图片的
    // 
    // 方案: 读一半，另一半在进入之后再读

    var imgList = [
            'http://img.zcool.cn/community/01797755d127a76ac725baa059c153.jpg',
            'http://img.zcool.cn/community/014da655d127a96ac725baa0e3aa3f.jpg',
            'http://img.zcool.cn/community/0152ad55d127af6ac725baa0be7f14.jpg',
            'http://img.zcool.cn/community/0152b455d1289532f875202fc6b385.jpg',
            'http://img.zcool.cn/community/015d2655d127bc6ac725baa02f13a0.jpg',
            'http://img.zcool.cn/community/01777f55d127bb6ac725baa0d373c7.jpg'
        ];

    // core.jumpNum();
    // 
    var prevented = mu.util.isScrollPrevented;
    mu.util.preventScroll();

    core.init({
        list: imgList,
        loading: function(index){
            var num = (index/(imgList.length - 1) * 100).toFixed(0);
            this.$view.find('.mu-preload-num').text(num + '%');
            this.$view.find('.mu-preload-line').css('width', parseInt(num * 2));
        },
        loaded: function(){
            var self = this;
            setTimeout(function(){
                self.$view.addClass('mu-fadeOut').one(window.animationEvents.animationEnd, function(){
                    self.$view.hide();
                    if(!prevented){
                        mu.util.recoverScroll();
                    }
                });
            }, 800);
        }
    });
    //


})(window.Zepto || window.jQuery);