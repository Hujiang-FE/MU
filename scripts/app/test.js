/**
 * name: 测试
 * author: roeis
 * description: 测试
 */
(function() {
    'use strict';


    var page = mu.widget.pagetrans,
        dialog = mu.widget.dialog,
        option = {
            beforePageTrans: function($oupage, $inpage) {

            },
            afterPageTrans: function($oupage, $inpage, current) {
                console.log(current);

                //当前页面有社团
                if(current === $('.page').length - 1){
                    // $inpage.addClass('overscroll');
                    
                    core.animaShow($('.wrap_st'), 'hizoomIn', function(){
                        console.log('4334');
                        mu.util.recoverScroll();
                    });

                }
            },
            loop: false,
        };

    // page.init(option);

    // mu.util.preventScroll();

    $('.wrapper')
        .on('swipeUp', function(){
            page.next();
        }).on('swipeDown', function(){
            page.prev();
        });


    if(/iphone/.test(mu.UA) && /mqqbrowser/.test(mu.UA)){
        alert('34445');
        $('.st_send').css('bottom','50px');
        // alert(mu.UA);
    }

    $('.back_slide').on('click', function(){
        core.animaHide($('.wrap_st'), 'hizoomOut', function(){
            page.prev();
            mu.util.preventScroll();
        });
    });
    var isWenxinios = /iphone/.test(mu.UA) && /micromessenger/.test(mu.UA);
    // alert(mu.UA);
    // 
    var $stbody = $('.st_body');
    $('#dialog').on('click', function(){

        // $('.pop').show();
        // $('.popbg').show();
        // $('#txtComment').focus();


        if(!isWenxinios){
            $('.st_body').addClass('overhidden').removeClass('overscroll');
        }

        setTimeout(function(){
            mu.widget.dialog.pop(html_pop,{
                isMiddle: false,
                beforeOpen: function(){
                    mu.util.preventScroll();
                    // $('#txtComment').blur().focus();
                },
                afterOpen: function(){
                    // alert('1')
                    // $(window).scrollTop(0);
                },
                afterClose: function(){
                    if(!isWenxinios){
                        $stbody.addClass('overscroll').removeClass('overhidden');
                    }
                    mu.util.recoverScroll();
                }
            });
        },300);

    });
    // $('.popbg').on('click', function(){
    //     $('.pop').hide();
    //     $('.popbg').hide();
    // });

    // $('[data-bi]').on('click', function(event){
    //     var $this = $(this),
    //         bi = $this.data('bi').split(','),
    //         planid = bi[0],
    //         parameter = bi.slice(1),
    //         jsonStr = stringify(paraArray2Obj(parameter));

    //     // typeof st
    //     console.log(planid, jsonStr);
    //     if(typeof ht.sendCustomEvent === 'function'){
    //         ht.sendCustomEvent(planid, jsonStr);
    //     }

    // });

    window.getBi = function(){
        // var arr = [];
        $('[data-bi]').each(function(){
            var $this = $(this),
                bi = $this.data('bi').split(',')[0],
                globalKey = window.GaKay || '_BI_20150625_';

            console.log( + bi);
            // arr.push('' + bi);
        });
        // return arr;
    };

    function paraArray2Obj (arr){
        var obj = {},
            temp;
        for(var i = 0; i < arr.length; i++){
            temp = arr[i].split(':');
            obj[$.trim(temp[0])] = $.trim(temp[1]);
        }
        return obj;
    }

    function stringify (object) {
        var jsonStr = '',
            jsonArr = [];

        jsonStr += '{';
        for (var key in object) {
            jsonArr.push('"' + key + '":' + '"' + object[key] + '"');
        }
        jsonStr += jsonArr.join(',');
        jsonStr += '}';

        return jsonStr;
    }

    window.html_pop = '<div class="hi_reply">' +
                    '<div class="hi_reply_title">' +
                    'asdfasdf' +
                    '<div class="hi_reply_send">发送</div>' +
                    '<div class="hi_reply_cancel" >取消</div>' +
                    '</div>' +
                    '<div class="hi_reply_cont">' +
                    '<textarea id="txtComment" placeholder="我也来说两句..." maxLength="400" autofocus></textarea>' +
                    '</div>' +
                    '<div class="hi_reply_tip"></div>' +
                    '<div class="hi_reply_login" onclick="plug_st.doLogin();">以沪江用户登录</div>' +
                '</div>';

    $('.st_send').on('click', function(){

        mu.widget.dialog.pop(html_pop,{
            isMiddle: false,
        });
    });

    var animationEnd = mu.util.animationEnd().animationend;
    var core = {
        animaShow: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.addClass('hivisible').removeClass(cls).off(animationEnd);
                invoke && invoke();
            });
        },
        animaHide: function($obj, cls, invoke) {
            $obj.addClass(cls).on(animationEnd, function() {
                $obj.removeClass(cls + ' hivisible').off(animationEnd);
                invoke && invoke();
            });
        }
    }
    // $(function(){
    //     mu.widget.dialog.tip('1');
    // });

    // $('.page').transPage({

    // function con(num){
    //     num++;
    //     console.log(num);
    //     setTimeout(function(){
    //         con(num);
    //     }, 2000);
    // }
    // con(1);
    // });

})();