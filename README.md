## MU for mobile

##### 包含:

    - core          核心
    - utility       常用工具方法集合    finished
    - detect        平台检测            finished
    - ajax & cache  请求相关
    - touch event   基础touch事件
    - fn            拓展$.fn            finished
    - require       简易require

##### 组件

    - dialog        弹窗                finished [document][link-dialog]
    - slidepage     页面转场
    - slider        轮播                finished [document][link-slider]
    - calendar      日历

[link-dialog]: https://github.com/Roeis/MU/tree/master/samples/dialog
[link-slider]: https://github.com/Roeis/MU/tree/master/samples/slider

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

