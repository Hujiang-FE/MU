// hmu-search module
// zhouzhou 7-11
// require zepto apply mobile
(function(win) {
    win.hmuso = {
        inserthtml: function(target) {
            var html = '';
            html += '<div class="container"><div class="search"><div class="row"><div class="col-8"><input type="text" id="search-text" placeholder="输入你想查询的内容" maxlength="32"></div><div class="col-2"><a href="javascript:;" class="search-btn">搜索</a></div></div></div></div>';
            //ware insertafter function
            $(html).insertafter(target);
        },
        init: function(target) {
            hmuso.inserthtml(target);
            $('.search-btn').bind('click', function() {
                hmuso.searchword();
            });
            $('#search-text').bind('keydown', function() {
                hmuso.entersearch();
            });
            $(window).scroll(function() {
                var h = $(window).scrolltop();
                h > 50 ? $('.search').addclass('fix-top') : $('.search').removeclass('fix-top');
                h > 50 ? $(target).css('margin-bottom', '56px') : $(target).css('margin-bottom', '0');
            });
        },
        searchword: function() {
            var text = encodeuricomponent($.trim($('#search-text').val()));
            if (text === '') {
                return false;
            }
            // jump to the regular url
            var para = $.param({
                    key: text
                }),
                url = '/app/search_result.html?' + para;
            window.location.href = url;
        },
        entersearch: function() {
            var event = window.event || arguments.callee.caller.arguments[0];
            if (event.keycode == 13) {
                hmuso.searchword();
            }
        }
    }
})(window);
