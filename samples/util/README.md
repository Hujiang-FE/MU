## MU for mobile

##### utility | 常用工具方法

### 使用:

需要: mu [查看](https://github.com/Roeis/MU/tree/master/dist)

-------------------------------

#### mu
    
    mu
    |--- mu.$doc        --> $(document) 缓存对象
    |--- mu.$win        --> $(window) 缓存对象
    |--- mu.UA          --> useragent
    |--- mu.hasTouch    --> boolean 是否有touch事件
    |--- mu.detect      --> object 检测浏览器对象
    |--- mu.util        --> object 常用方法集锦对象

#### mu.detect 检测浏览器
常用判断手机端环境，返回布尔值

    mu.detect.isWeixin
    mu.detect.isAndroid
    mu.detect.isIOS
    mu.detect.isMeizu
    mu.detect.isUC
    mu.detect.isQQ
    mu.detect.isWP
    

#### mu.util 常用方法集锦

**获取querystring**
**mu.util.getQueryString(name)**
    
    // eg: 当前url为http://aa.bb.com?cc=dd&ee=ff
    var queryString = mu.util.getQueryString('cc');
    // queryString --> 'dd'

**阻止全局页面滚动**
    
    mu.util.preventScroll();

**回复全局页面滚动**

    mu.util.recoverScroll();

**encode内容**
**mu.util.htmlEncode(string)**

    mu.util.htmlEncode('<div>dd</div>');

**获取元素的类型**
**mu.util.getType(object)**
    
    mu.util.getType('string')   --> string
    mu.util.getType([1,3,4])    --> array

**判断元素的类型拓展**
    
    mu.util.isNumber
    mu.util.isObject
    mu.util.isFunction
    mu.util.isArray
    mu.util.isString

**深拷贝**
**mu.util.copy(obj)**
    
    mu.util.copy({1:2,2:3,3:[12,4,5]});

**拓展**
**mu.util.extend(obj)**

    var obj = mu.util.extend({}, {test: 1}, {test2: 2});

**动态加载样式**
**mu.util.requireCss(url)**
    
    mu.util.requireCss('/styles/aa.css');

-------------------------------

#### util拓展
在引入mu.dialog.js后，在mu.util上拓展一些弹窗组件

**mu.util.tip(string, [duratime])**
    
    mu.util.tip('这是一个自动消失的小提示');

**mu.util.confirm(string, [callback])**
    
    mu.util.confirm('你确定要修改吗？', function(flag){
        if(flag){
            // do something A();
        }else{
            // do something B();
        }
    });

**mu.util.alert(string)**
    
    mu.util.alert('这是一个警示框');

-------------------------------

#### $.fn 拓展
    
###### $.fn.swipeable
元素滑动集合事件

在元素touchstart的时候做什么

在元素touchmove的时候做什么

在元素touchend的时候做什么

    $('.el').swipeable({
        start: function(data){
            // data -> {touch: touch , start: start}
        },
        move: function(data){
            // data -> {touch: touch, delta: delta}
        },
        end: function(data){
            // data -> {touch: {}, delta: delta, deltatime: deltatime}
        }
    })


###### $.fn.oneAnimationEnd
css3 动画结束回调

    $('.el').oneAnimationEnd('SomeCss3AnimationClass', function(){
        //这是就是SomeCss3AnimationClass 动画结束后的回调
        // do something
    });

同时曝露全部变量animationEvents对象, 里面各个动画事件在不同浏览器的prefix版本

比如在webkit浏览器下， animationEvents.transitionEnd --> webkitTransitionEnd
