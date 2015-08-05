## MU for mobile

##### slider | 轮播

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