(function($, kr, websql) {

    var DB_VERSION_NUMBER = '1.0';
    var TIME_UPDATE = 'TIME_UPDATE';
    var TIME_PUBDATE = 'TIME_PUBDATE';
    var TIME_UPDATE_SLIDER = 'TIME_UPDATE_SLIDER';
    var TIME_INTERVAL = 1000 * 60 * 5; //更新间隔(默认十分钟)
    var TIME_INTERVAL_SLIDER = 1000 * 60 * 60; //更新间隔(默认一小时)

    var SLIDER_GUID = 'SLIDER_GUID';


    var PAGE_SIZE = 10;
    var MAX_INTEGER = Number.MAX_VALUE;

    var REGEX_SRC = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

    var IMAGE_DOWNLOAD = "IMAGE_DOWNLOAD";
    var IMAGE_DOWNLOAD_WHEN_WIFI = "true";
    var DIR_IMAGE = "_doc/image/news/";

    var SLIDER_URL = 'http://demo.dcloud.net.cn/36kr/slider.json';
    var FEED_URL = 'http://www.36kr.com/feed';
    var SQL_TABLE = 'DROP TABLE IF EXISTS kr_news;CREATE TABLE kr_news (guid TEXT PRIMARY KEY, title TEXT,author TEXT,link TEXT,cover TEXT,image TEXT,pubDate INTEGER,description TEXT);';
    var SQL_SELECT = 'SELECT guid,title,author,pubDate,cover,image FROM kr_news WHERE pubDate < ? ORDER BY pubDate DESC LIMIT ?;';
    var SQL_INSERT = 'INSERT INTO kr_news(title,author,link,guid,cover,pubDate,description) VALUES(?,?,?,?,?,?,?);';
    var SQL_SELECT_DETAIL = 'SELECT * FROM kr_news WHERE guid = ? LIMIT 1;';
    var SQL_UPDATE = 'UPDATE kr_news SET image = ? WHERE guid = ?';
    var SQL_DELETE = 'DELETE FROM kr_news';

    var UNITS = {
        '年': 31557600000,
        '月': 2629800000,
        '天': 86400000,
        '小时': 3600000,
        '分钟': 60000,
        '秒': 1000
    };
    kr.humanize = function(milliseconds) {
        var humanize = '';
        $.each(UNITS, function(unit, value) {
            if (milliseconds >= value) {
                humanize = Math.floor(milliseconds / value) + unit + '前';
                return false;
            }
            return true;
        });
        return humanize || '刚刚';
    };
    kr.format = function(milliseconds) {
        var diff = Date.now() - milliseconds;
        if (diff < UNITS['天']) {
            return kr.humanize(diff);
        }
        var date = new Date(milliseconds);
        var _format = function(number) {
            return (number < 10 ? ('0' + number) : number);
        };
        return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
    };
    kr.dbReady = function(successCallback, errorCallback) {
        html5sql.openDatabase("kr", "36Kr", 5 * 1024 * 1024);
        if (html5sql.database.version === '') {
            html5sql.changeVersion('', DB_VERSION_NUMBER, SQL_TABLE, function() {
                successCallback && successCallback(true);
            }, function(error, failingQuery) {
                errorCallback && errorCallback(error, failingQuery);
            });
        } else {
            successCallback && successCallback(false);
        }
    };
    kr.toggleDownloadWhenWifi = function(whenWifi) {
        if (whenWifi) {
            plus.storage.setItem(IMAGE_DOWNLOAD, IMAGE_DOWNLOAD_WHEN_WIFI);
        } else {
            plus.storage.removeItem(IMAGE_DOWNLOAD);
        }
    };
    kr.isDownloadWhenWifi = function() {
        return !!plus.storage.getItem(IMAGE_DOWNLOAD);
    };
    kr.isDownloadImage = function() {
        var currentType = plus.networkinfo.getCurrentType();
        if (currentType === plus.networkinfo.CONNECTION_NONE) {
            return false;
        } else if (currentType !== plus.networkinfo.CONNECTION_WIFI) {
            if (plus.storage.getItem(IMAGE_DOWNLOAD)) {
                return false;
            }
        }
        return true;
    };
    kr.clearCache = function() {
        plus.nativeUI.showWaiting('正在删除缓存...');
        kr.deleteNews(function() {
            //清除图片缓存
            plus.io.resolveLocalFileSystemURL(DIR_IMAGE, function(entry) {
                entry.removeRecursively(function() {
                    plus.nativeUI.closeWaiting();
                    plus.nativeUI.toast("缓存删除成功");
                }, function() {
                    plus.nativeUI.closeWaiting();
                });
            }, function(e) {
                plus.nativeUI.closeWaiting();
            });
            //通知首页重新拉取最新
            plus.storage.removeItem(TIME_UPDATE); //移除上次更新时间
            plus.storage.removeItem(TIME_PUBDATE); //移除最新的feed更新时间
            plus.storage.removeItem(TIME_UPDATE_SLIDER); //移除上次slider更新时间
            plus.storage.removeItem(SLIDER_GUID); //移除上次slider的guid
            plus.webview.getWebviewById("news").evalJS('getFeed("true")');
        }, function() {});
    };
    kr.downloadImage = function(name, imgUrl, successCallback, errorCallback) {
        var url = DIR_IMAGE + name.substr(-2) + "/" +
            name + (imgUrl.substring(imgUrl.lastIndexOf('.'), imgUrl.length - 7));
        return plus.downloader.createDownload(imgUrl, {
            filename: url
        }, function(download, status) {
            successCallback(download.filename);
        });
    };
    kr.getSlider = function(isLocal, successCallback) {
        if (isLocal === true) {
            successCallback(plus.storage.getItem(SLIDER_GUID));
            return;
        }
        successCallback = successCallback || isLocal;
        if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
            successCallback(plus.storage.getItem(SLIDER_GUID));
            return;
        }
        var update = parseFloat(plus.storage.getItem(TIME_UPDATE_SLIDER));
        if (update && (update + TIME_INTERVAL_SLIDER) > Date.parse(new Date())) {
            successCallback(plus.storage.getItem(SLIDER_GUID));
            return;
        }
        $.getJSON(SLIDER_URL, function(response) {
            if (response) {
                plus.storage.setItem(SLIDER_GUID, response.guid);
                plus.storage.setItem(TIME_UPDATE_SLIDER, Date.parse(new Date()) + ''); //本地更新时间
                kr.getNewsByGuid(response.guid, function(item) {
                    if (!item) { //首页封面不存在，新增
                        response.pubDate = Date.parse(response.pubDate);
                        if (response.cover) {
                            response.description = response.description.replace('<img src="' + response.cover + '" alt=""/>', '');
                        }
                        response.description = response.description.replace('<a href="http://www.36kr.com/p/201073.html?ref=kr_post_feed">36氪官方iOS应用正式上线，支持『一键下载36氪报道的移动App』和『离线阅读』</a> <a href="https://itunes.apple.com/cn/app/36ke/id593394038?l=en&mt=8" target="_blank">立即下载！</a>', '');
                        kr.addNews([
                            [response.title, response.author, response.link, response.guid, response.cover, response.pubDate, response.description]
                        ], function() {
                            successCallback(response);
                        }, function() {
                            successCallback(response);
                        });
                    } else { //返回本地存储的
                        successCallback(item);
                    }
                });
            } else {
                successCallback(plus.storage.getItem(SLIDER_GUID));
            }
        });
    };
    kr.getFeed = function(successCallback, errorCallback) {
        if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
            plus.nativeUI.toast('似乎已断开与互联网的连接', {
                verticalAlign: 'top'
            });
            successCallback(false);
            return;
        }
        var update = parseFloat(plus.storage.getItem(TIME_UPDATE));
        if (update && (update + TIME_INTERVAL) > Date.parse(new Date())) {
//          console.log('时间间隔内不请求远程(' + (TIME_INTERVAL - (Date.parse(new Date()) - update)) / 1000 + '秒后)');
            successCallback(false);
            return;
        }
        $.getFeed(FEED_URL, function(feed) {
            if (feed.items) {
                var news = [];
                var pubDate = parseFloat(plus.storage.getItem(TIME_PUBDATE));
                $.each(feed.items, function(index, item) {
                    if (pubDate && pubDate >= Date.parse(item.pubDate)) {
                        return false;
                    }
                    var matches = item.description.match(REGEX_SRC);
                    var cover = '';
                    if (matches && matches.length === 2) {
                        cover = matches[1];
//                      console.log("match:"+cover);
                        item.description = item.description.replace('<img src="' + cover + '" alt=""/>', '');
                        news.push([item.title, item.author, item.link, item.guid, cover, Date.parse(item.pubDate), item.description]);
                    }else{
                        //没有匹配到缩略图，找服务器临时抓取
                        mui.getJSON('http://demo.dcloud.net.cn/36kr/cover.php',{appid:'36Kr',url:item.link},function (response) {
                            if(response.status==1){
                                cover = response.url;
                                news.push([item.title, item.author, item.link, item.guid, cover, Date.parse(item.pubDate), item.description]);
                            }
                        })
                    }
                    //屏蔽iOS客户端推广消息
//                  item.description = item.description.replace('<a href="http://www.36kr.com/p/201073.html?ref=kr_post_feed">36氪官方iOS应用正式上线，支持『一键下载36氪报道的移动App』和『离线阅读』</a> <a href="https://itunes.apple.com/cn/app/36ke/id593394038?l=en&mt=8" target="_blank">立即下载！</a>', '');
                });
                news.reverse();
                if (news.length > 0) {
                    kr.addNews(news, function() {
                        successCallback(news.length);
                    }, function() {
                        successCallback(false);
                    });
                } else {
                    successCallback(false);
                }
            }
            plus.storage.setItem(TIME_PUBDATE, Date.parse(feed.pubDate) + ''); //订阅发布时间
            plus.storage.setItem(TIME_UPDATE, Date.parse(new Date()) + ''); //本地更新时间
        }, function(xhr) {
            errorCallback && errorCallback();
        });
    };
    kr.getNewsByGuid = function(guid, successCallback, errorCallback) {
        websql.process([{
            "sql": SQL_SELECT_DETAIL,
            "data": [guid]
        }], function(tx, results) {
            successCallback(results.rows.length > 0 && results.rows.item(0));
        }, function(error, failingQuery) {
            errorCallback && errorCallback(error, failingQuery);
        });
    };
    kr.getNews = function(latestId, pageSize, successCallback, errorCallback) {
        if (typeof latestId === 'function') {
            successCallback = latestId;
            latestId = MAX_INTEGER;
            pageSize = PAGE_SIZE;
        } else if (typeof pageSize === 'function') {
            successCallback = pageSize;
            latestId = latestId || MAX_INTEGER;
            pageSize = PAGE_SIZE;
        } else {
            latestId = latestId || MAX_INTEGER;
            pageSize = pageSize || PAGE_SIZE;
        }
        websql.process([{
            "sql": SQL_SELECT,
            "data": [latestId, pageSize]
        }], function(tx, results) {
            successCallback(results.rows);
        }, function(error, failingQuery) {
            errorCallback && errorCallback(error, failingQuery);
        });
    };
    kr.addNews = function(news, successCallback, errorCallback) {
        var sqls = [];
        $.each(news, function(index, item) {
            sqls.push({
                "sql": SQL_INSERT,
                "data": item
            })
        });
        websql.process(sqls, function(tx, results) {
            successCallback(true);
        }, function(error, failingQuery) {
            errorCallback && errorCallback(error, failingQuery);
        });

    };
    kr.updateNews = function(guid, image, successCallback, errorCallback) {
        websql.process([{
            "sql": SQL_UPDATE,
            "data": [image, guid],
        }], function(tx, results) {
            successCallback && successCallback();
        }, function(error, failingQuery) {
            errorCallback && errorCallback(error, failingQuery);
        });
    };
    kr.deleteNews = function(successCallback, errorCallback) {
        websql.process(SQL_DELETE, function(tx, results) {
            successCallback && successCallback();
        }, function(error, failingQuery) {
            errorCallback && errorCallback(error, failingQuery);
        });
    };
})(mui, kr, html5sql);