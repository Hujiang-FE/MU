## MU for mobile

##### page transition | 页面转场

### 使用:

需要: mu [查看](https://github.com/Roeis/MU/tree/master/dist)

    // 构造器模式
    var page = new window.MuPage('.page', {
        isLoop: true,                                           //是否循环
        pageStart: 0,                                           //起始页面序号
        classPrev: ['mu-moveFromTop', 'mu-moveToBottom'],       //上一页，进场，出场
        classNext: ['mu-moveFromBottom', 'mu-moveToTop'],       //下一页，进场，出场
        beforeSlide: function() {},                             //转场前
        afterSlide: function() {}                               //转场后
    });


### API:
// 设page为一个实例

**method: prev**
    
    page.prev();

**method: next**
    
    page.next();

**method: jump(index, [inClass, outClass])**
    
    page.jump(1, 'animation1', 'animation2');

### known issue:
