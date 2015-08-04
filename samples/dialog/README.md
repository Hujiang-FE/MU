## MU for mobile

##### dialog | 弹窗

##### 使用:

需要: mu

    // 构造器模式
    var dialog = new window.MuDialog('<div class="dialog">test</div>', {
        isBgCloseable: true,                    // 点击背景是否关闭弹窗
        showClass: 'mu-scaleDownIn',            // 自定义弹窗进场动画, css3 animation
        hideClass: 'mu-scaleDownOut',           // 自定义弹窗出场动画
        classSet: 'scaleDownIn',                // 样式组合, scaleUpIn, scaleDownIn, fadeIn, fadeInUp
        isCenter: true,
        zIndex: 1000,                           
        opacity: 0.8,                           // 背景的透明度
        beforeOpen: function() {},
        afterOpen: function() {},
        beforeClose: function() {},
        afterClose: function() {}
    });
    
######交互效果:
默认提供了几套弹窗交互效果
classSet: 'scaleUpIn|...'

如果需要自定义弹窗效果, 修改 classSet: false
修改showClass和hideClass

######位置:
默认将元素取得高度后居中

如果需要自定义, 修改 isCenter: false
此时直接以实例化的该元素的样式为准
PS: 元素实例化后 postion: fixed

    // zepto|jquery 插件模式
    $('<div class="dialog">test</div>').muDialog({
        // options
    });
    
    $('.dialog').muDialog('open');
    
    // 获取实例，稍稍繁琐
    // zepto本身的 data 方法不足，虽然zepto提供了data的拓展
    // 考虑通用性，把实例都缓存在一个对象里
    $.fn.muDialog.instances[$('.dialog').data('muDialog')];

##### API:
// 设dialog为一个实例
method: open 
    
    dialog.open();

method: close
    
    dialog.close();

method: html(string)
    
    dialog.html('your markup here')

引用该组件后，在mu.util工具方法中拓展以下方法

mu.util.tip(string, [duratime])
    
    mu.util.tip('这是一个自动消失的小提示');

mu.util.confirm(string, [callback])
    
    mu.util.confirm('你确定要修改吗？', function(flag){
        if(flag){
            // do something A();
        }else{
            // do something B();
        }
    });

mu.util.alert(string)
    
    mu.util.alert('这是一个警示框');




##### known issue:
1.在魅族自带浏览器显示效果异常, 在魅族的微信中显示效果正常