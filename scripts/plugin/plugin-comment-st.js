

(function(global, $, undefined) {
    'use strict';

    var URL = {
            ST: 'http://api2.site.hujiang.com/SheTuan/SheTuan.ashx'
        },
        para = {
            st: {
                op: 'GetPostListByTopicID',
                topicid: 163068829881,
                page:1,
                pageSize: 50
            }
        },
        win_h = document.body.clientHeight || $(window).height(),
        wrap_h = parseInt(win_h) - 120,
        nowTime = $('#hddTime').val(),
        nowFmt = new Date(nowTime).getTime();

    var core = {
        getUserFace: function(uid, psize) {
            var level = uid.toString().substr(-4),
                firstLevel,
                secondLevel;

            firstLevel = level.substr(0,2);
            secondLevel = level.substr(2);

            return "http://i2.hjfile.cn/f" + psize + "/" + firstLevel + "/" + secondLevel + "/" + uid + ".jpg";
        },
        formatComment: function(data){
            var str = data.Body,
                emotion = data.ContentExt.Emotion,
                emo_length = emotion.length;

            if(emo_length === 0) return str.replace(/\[!--.{5,10}--\]/g, '');

            for(var i = 0; i < emo_length; i++){
                str = str.replace(emotion[i].Ref, '<img src="'+ emotion[i].Src + '" height="'+ emotion[i].Height +'" width="'+ emotion[i].Width +'">');
            }
            console.log(emotion);

            return str.replace(/\[!--.{5,10}--\]/g, '');
        },
        formatTime: function(time, now) {
            var time2 = time,
                delta,
                oldTime;

            if (time2 === null || time2 === '') return "1分钟前";

            time2 = time2.replace("T", " ").replace(/\-/g, "/");

            time2.indexOf(".") > 0 && (time2 = time2.substring(0, time2.indexOf(".")));
            // nowTime = nowTime.replace("T", " ");
            oldTime = new Date(time2).getTime();

            isNaN(oldTime) && (oldTime = new Date(time).getTime());

            delta = Math.abs(now - oldTime);

            if (oldTime <= 0 || delta < 2) return "1分钟前";
            
            var strSeconds = parseInt(delta / 1000),
                strMinute = parseInt(delta / 1000 * 60),
                strHour = parseInt(delta / 1000 * 60 * 60),
                strDay = parseInt(delta / 1000 * 60 * 60 * 24);

            // console.log(oldTime, strSeconds, strMinute, strHour, strDay);

            if (strSeconds < 50){
                return "1分钟前";
            }else if (strMinute < 60){
                return (strMinute + 1) + "分钟前";
            }else if (strMinute > 60 && strHour <= 24){
                return strHour + "小时前";
            }else if (strHour > 24 && strDay <= 10){
                return strDay + "天前";
            }else{
                return time2.split(' ')[0];
            }
        },
        getReplyList: function(topicId, height){
            para.st.topicid = topicId;
            mu.cache.ajaxData(URL.ST, para.st, function(data){
                console.log(data);
                if(data.Code === 0 && data.Value.Value !== null){
                    var it = data.Value.Value.data.PostList,
                        html = '';
                    it.reverse();

                    //click for more comments
                    // html += '<li class="reply_li">'+
                    //             '<div class="content">点击查看更多评论</div>'+
                    //         '</li>';
                    for(var i = 0, l = it.length; i < l; i++){
                        html += '<li class="reply_li">'+
                                    '<div class="info cf">'+
                                        '<a href="http://ms.hujiang.com/u/'+ it[i].PosterID +'/">'+
                                            '<img src="'+ core.getUserFace(it[i].PosterID, 48) +'" alt="">'+
                                            '<p>'+
                                                '<span class="name">'+ it[i].UserName +'</span>'+
                                                '<span class="userlevel">Lv'+ it[i].LevelID +'</span>'+
                                            '</p>'+
                                            '<p class="sec">'+
                                                '<span class="mr5">' + core.formatTime(it[i].DateAdded, nowFmt) +'</span>'+
                                                '<span>' + it[i].FloorID +'楼</span>'+
                                            '</p>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="content">'+ core.formatComment(it[i]) +'</div>'+
                                '</li>';
                    }

                    if(para.st.page === 1){
                        $('.topicList').html('').html(html);
                    }else{
                        $('.topicList').append(html);
                    }

                    
                    // scrollSubtitle.destory();
                    scrollSubtitle.init('.topicList', {
                        height: height || wrap_h,
                        pause: 3000,
                        // reverse: false,
                        afterEdge: function(count){
                            console.log('top');
                            count = 0;
                        }
                    });
                }else{
                    $('.topicList').html('<li class="reply_li"><div class="content">还没有评论哦，就等你了~</div></li>');
                }
            }, false);
        }
    };

    window.ztUtil = core;


})(this, window.Zepto || window.jQuery);
