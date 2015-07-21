## MU for mobile "穆"

##### 包含:

    - core          核心
    - utility       常用工具方法集合
    - detect        平台检测
    - ajax & cache  请求相关
    - touch event   基础touch事件
    - fn            拓展$.fn
    - require       简易require

##### 组件

    - dialog        弹窗
    - slidepage     页面转场
    - slider        轮播
    - calendar      日历


##### how to use

    - git clone to your local enviroment
    - npm install
    - grunt server after modify the ip address in Gruntfile.js
    - do what you want

##### includes
    
    // $.fn.swipeable
    // 基础可滑动元素事件集合
    $('.element').swipeable({
        start: function(data){
            // do something at touchstart
        },
        move: function(data){
            // do something at touchmove
        },
        end: function(data){
            // do something at end
        }
    });

    // $.fn.mulider
    // 轮播
    $('.element').mulider({
        afterSlide: function(){
            // callback after each slide
        }
    });
    // get the instance of .element
    var instance = $.fn.mulider.instances[$('.element').data('mulider')];

##### about

    // this project is on progress;
    
    - Copyright (c) 2015 All rights reserved.
    - author: roeis
    - version: alpha

