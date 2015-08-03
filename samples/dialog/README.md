## MU for mobile

##### dialog | 弹窗

##### 使用:
    // 构造器
    var dialog = new window.MuDialog('<div class="dialog">test</div>', {
        isBgCloseable: true,                    // 点击背景是否关闭弹窗
        showClass: 'mu-scaleDownIn',            // 自定义弹窗进场动画, css3 animation
        hideClass: 'mu-scaleDownOut',           // 自定义弹窗出场动画
        classSet: 'scaleDownIn',                // 样式组合, scaleUpIn, scaleDownIn, fadeIn, fadeInUp
        isCenter: true,
        zIndex: 1000,                           // 大于这个值
        opacity: 0.8,                           // 背景透明度
        beforeOpen: function() {},
        afterOpen: function() {},
        beforeClose: function() {},
        afterClose: function() {}
    });
    
    // zepto
    $('<div class="dialog">test</div>').muDialog({
        // options
    });
    
    $('.dialog').muDialog('open');

##### API:
    // 设dialog为一个实例
    open : 
        dialog.open();
    
    close :
        dialog.close();

    html :
        dialog.html('your markup here')