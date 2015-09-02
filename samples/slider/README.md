## MU for mobile

##### slider | 轮播

### 使用:

需要: mu [查看](https://github.com/Roeis/MU/tree/master/dist)

**推荐在$(function(){})中初始化**, 避免某些浏览器的兼容问题

    // 构造器模式
    var slider = new MuSlider('.wrapper', {
        autoSlide: false,                   //自动轮播
        isLoop: true,                       //是否创建
        speed: 500,                         //滑动速度
        isVert: false,                      //滑动方向
        beforeSlide: function() {},
        afterSlide: function() {}
    });


    // 轮播
    $('.element').muSlider({
        afterSlide: function(){
            // callback after each slide
        }
    });

    // 获取实例，稍稍繁琐
    // zepto本身的 data 方法不足，虽然zepto提供了data的拓展
    // 考虑通用性，把实例都缓存在一个对象里
    $.fn.muDialog.instances[$('.dialog').data('muDialog')];

    注：PC下也能点击滑动

######特别参数:

    isVert 是否是垂直方向的滑动
    default value : false
    垂直应用场景 : 整屏滑动, 类似页面转场, [注意:将自动禁止全局touchmove事件]
    水平应用常用 : 普通广告轮播

### API:
// 设slider为一个实例

**method: jump(number)**
    
    slider.jump(2);

**method: prev**
    
    slider.prev();

**method: next**
    
    slider.prev();



### known issue:
1.快速滑动可能导致跳跃，未测试

2.循坏可能

### log:
15/09/02 修复横竖屏的自适应问题

15/09/01 初始化可以放在document.ready中，在firefox mobile取值异常

15/08/14 新增支持PC操作
