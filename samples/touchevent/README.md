## MU for mobile

##### touch | 触屏手势事件优化

### 使用:

tap, longTap

swipeLeft, swipeRight

swipeUp, swipeDown


### 注意:
1.使用swipeUp, swipeDown时，阻止全局touchmove的默认事件;
    
    //使用swipeUp, swipeDown, 必须调用以下方法
    //
    mu.util.preventScroll();

2.阻止冒泡

    $('.bubble1').on('tap', function(event){
        console.log('tap bubble outside');
        event.stopPropagation();
    });

3.longTap将user-select设置成none，避免和浏览器长按事件冲突

###issue:
@[dail](https://github.com/dail):
所有事件都是绑在document去触发的，注意冒泡等引起的问题
jquery支持$.event.special, zepto不支持

### log
15/08/14 新增支持PC点击事件