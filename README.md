## MU for mobile

###简单实用，动效拔群

一套适用于触屏端的常用方法和UI插件, 有效提升交互效果和开发效率

#### 使用mu
    
    // 全局变量 --> mu <--
    // dist文件夹
    mu.js               utility|detect|fn extend
    mu.dialog.js        弹窗
    mu.slider.js        轮播
    mu.page.js          页面转场
    mu.touch.js         手势事件优化
    mu.css              插件所需样式,可以通过mu.util.requireCss('css url')动态插入

##### 包含:

    - utility           常用工具方法            OK
    - detect            平台检测                OK
    - ajax & cache      请求相关                NF
    - touch event       基础touch事件           OK
    - fn                拓展$.fn                OK
    - require           简易require

    - dialog            弹窗                    OK
    - pagetransition    页面转场                OK
    - slider            轮播                    OK
    - calendar          日历                    NF
    - paint             画笔                    NF
    - slidepage         滑动页面                OK(vertical slider)

[文档](https://github.com/Roeis/MU/tree/master/samples/util) 常用工具方法 | mu.js

[文档](https://github.com/Roeis/MU/tree/master/samples/dialog) 弹窗 | mu.dialog.js

[文档](https://github.com/Roeis/MU/tree/master/samples/slider) 轮播 | mu.slider.js

[文档](https://github.com/Roeis/MU/tree/master/samples/pagetransition) 页面转场 | mu.page.js

[文档](https://github.com/Roeis/MU/tree/master/samples/touchevent) 事件优化 | mu.touch.js

##### 常见问题集锦

[详见](http://roeis.github.io/blog/2015/07/14/h5-issues/)

##### run this repo

    - git clone to your local enviroment
    - npm install
    - grunt server after modify the ip address in Gruntfile.js
    - do what you want

##### about

    // this project is on progress;
    
    - Copyright (c) 2015 All rights reserved.
    - author: roeis
    - version: beta

