/**
 * name:
 * author: roeis
 * description:
 */
(function() {
    'use strict';
    define(['jquery', 'underscore', 'request', 'helper/jquery.helpers', 'helper/mu/mu'],
        function($, _, request) {

            var core = {
                init: function() {
                    console.log('app start');

                    var videoSrc = 'http://v.youku.com/v_show/id_XOTUwMzAzMDEy_ev_5.html?from=y1.3-idx-uhome-1519-20887.205805-205902.8-2';
                    var videoSrc2 = 'http://www.tudou.com/listplay/cJn6UVxpAnQ/4rTvmsg1owo.html';

                    // http://www.tudou.com/albumplay/O8GDpd7v8RA/I1eGdoJAoDg.html
                    //http://www.tudou.com/albumplay/39KUVVh-kQw/9ok6TcHmmw0.html
                    //http://www.tudou.com/programs/view/MoXUCp_56d4/?fr=rec2
                    //http://www.tudou.com/programs/view/zzcARQApkUs/
                    //http://www.tudou.com/albumplay/RsfQldH8q6s.html
                    // var ts = core.filter([1, 3, 4], function(num, idx) {
                    //     return num % 2 === 0;
                    // });
                    // console.log(request, mu);
                    // 

                    require(['scripts/app/data.js'], function(data){
                        console.log(data);
                    });

                    // 需要下一页的预加载图片,
                    // console.log(arr);
                    var arr = ["url(http://i2.w.hjfile.cn/news/201505/201505063343846725.png)", "url(http://i2.w.hjfile.cn/news/201503/201503311185099372.png)", "none", "url(http://i2.w.hjfile.cn/news/201505/201505075085590639.png)", "url(http://i2.w.hjfile.cn/news/201505/201505065344392070.png)", "none", "url(http://i2.w.hjfile.cn/news/201505/201505073042988117.jpg)", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505074185983553.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505075065507793.png)", "url(http://i2.w.hjfile.cn/news/201505/201505074251099169.png)", "url(http://i2.w.hjfile.cn/news/201505/201505074260400636.png)", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505075221363075.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505075224303636.png)", "url(http://i2.w.hjfile.cn/news/201505/201505075232069385.png)", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505076011212353.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505076013820171.png)", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505081243641143.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505081250598860.png)", "url(http://i2.w.hjfile.cn/news/201505/201505081254984755.png)", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505083312776380.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505083320723227.png)", "url(http://i2.w.hjfile.cn/news/201505/201505083324207639.png)", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505084285812976.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505084294758332.png)", "url(http://i2.w.hjfile.cn/news/201505/201505084301414562.png)", "url(http://i2.w.hjfile.cn/news/201505/201505084311989620.png)", "url(http://i2.w.hjfile.cn/news/201505/201505084315436567.png)", "none", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505085412160022.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505085421058569.png)", "url(http://i2.w.hjfile.cn/news/201505/201505085425788355.jpg)", "url(http://i2.w.hjfile.cn/news/201505/201505085432975828.png)", "url(http://i2.w.hjfile.cn/news/201505/201505085483176177.png)", "url(http://i2.w.hjfile.cn/news/201505/201505085460457254.png)", "none", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/2015051110401842516.jpg)", "url(http://i2.w.hjfile.cn/news/201505/2015051110405531681.png)", "url(http://i2.w.hjfile.cn/news/201505/2015051110413412991.png)", "none", "none", "none", "none", "none", "url(http://i2.w.hjfile.cn/news/201505/201505111063260915.jpg)"];

                        arr = _.filter(arr, function(value, idx){
                            return value !== 'none';
                        });
                        // arr = _.each(arr, function(element, idx){
                        //     var src = element.match(/http[^)]*/)[0],
                        //         img = new Image();
                        //     img.src = src;
                        //     // img.onload = function(){
                        //     //     console.log(idx, 'success');
                        //     // };
                        // });
                    core.getData();


                    //get img width and height;
                    var img_url = 'http://greensock.com/wp-content/uploads/2014/04/fast.png';

                    var img = new Image();

                    img.src = img_url;
                    
                    function check(){
                        console.log('check', 'width:', img.width);
                    }

                    var set = setInterval(check, 40);

                    if(img.complete){
                        console.log('complete', 'width:', img.width);
                    }else{
                        img.onload = function(){
                            console.log('load', 'width:', img.width, 'height', img.height);
                            console.log(img);
                            clearInterval(set);
                        };
                    }

                    var need = require;
                    // need(['helper/haEvent'], function(){
                    //     console.log(ht2);
                    // });
                    var id = 2312755;
                    // var vsrc = 'http://static.hdslb.com/miniloader.swf?aid=' + id + '&page=1';
                    // console.log(vsrc)
                    // vsrc

                    // $.ajax({
                    //     url:'http://www.bilibili.com/m/html5?aid=2312755&page=1', 
                    //     dataType: 'jsonp'
                    // });

                    var regYouku = /youku\.com/;
                    // sendEvent(12, 434, '')
                    if(regYouku.test(videoSrc)){
                        // need(['http://player.youku.com/jsapi'], function(){

                        //     var html = '<div id="youkuplayer" style="width:100%;height:200px"></div>';
                        //     // console.log(YKU);
                        //     $('.wrapper').append(html);
                        //     var player = new YKU.Player('youkuplayer',{
                        //         styleid: '0',
                        //         client_id: 'b051e0b225e7051b',
                        //         vid: 'XOTUwMzAzMDEy'
                        //     });
                        // });

                        $.ajaxSetup({
                            cache: !0
                        });
                        $.getScript("http://player.youku.com/jsapi", function() {
                            var html = '<div id="youkuplayer" style="width:100%;height:200px"></div>';
                            $('.wrapper').append(html);
                            var player = new YKU.Player("youkuplayer", {
                                client_id: "6bfe5b183f11e7d9",
                                vid: 'XOTUwMzAzMDEy',
                                show_related: !1
                            });
                        });
                    }

                    //youku id  /id_[^.]*/, match 出优酷ID

                    //接口
                    //bilibili ： http://www.bilibili.com/m/html5?aid=2312755&page=1
                    //iqiyi 获取mp4原地址，播放视频。video标签
                    //letv 同上
                    
                    // need('Video', function(module){
                    //     console.log(module);
                    // }, function(error){
                    //     console.log(error);
                    // });
                    

                    //图片获取大小


                    // console.log(mu.cache);
                    // $(document).delegate('*[class*=_HT]', 'click', core._sendEvent);
                },

                getData: function() {
                    var url = {
                            st: 'http://api2.site.hujiang.com/SheTuan/SheTuan.ashx'
                        },
                        para = {
                            st: {
                                op: 'GetPostListByTopicID',
                                topicid: 163068829881,
                                page: 1,
                                pageSize: 50
                            }
                        };
                    $.log('loadding...');
                    request.ajaxData(url.st, para.st, function(data) {
                        // console.log(data);
                        $.log('loaded', data);
                    }, false);
                }
            };

            return core;

        });
})();

/**
 * name: 
 * author: roeis
 * description: 
 */
(function(){
    'use strict';
    
    var Tab = function(element){
        
    }
})();