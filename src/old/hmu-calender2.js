(function(global) {
    "use strict";
    /** 
     * @namespace
     * @global
     */
    var hmu = global.hmu || {},
        $ = global.Zepto;

    var options = {
        target: '.calender',
        now: null, //数组
        afterChangeMonth: null,
        afterChangeDay: null,
        dayArr: ['日', '一', '二', '三', '四', '五', '六']
    };

    var now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate();

    var $datehead, $datebody,
        HTML_BODY = '<div class="hidate-head"></div><div class="hidate-body"></div>';

    var _calend = {

        init: function(opts) {
            $.extend(options, opts || {});
            if (options.now) {
                year = now[0];
                month = now[1];
                date == now[2];
            }
            _calend._initHtml();
            _calend._initDateHtml(year, month);
        },
        _initHtml: function() {
            $(options.target).html(HTML_BODY);
            $datehead = $('.hidate-head');
            $datebody = $('.hidate-body');
            var html = '<div class="day-row cf">';
            for (var i = 0; i < options.dayArr.length; i++) {
                html += '<div class="day">' + options.dayArr[i] + '</div>';
            }
            html += '</div>';
            $datehead.html(html);
        },
        _initDateHtml: function(y, m) {

            var y = y,
                m = m - 1, //m 0-11; month 1-12
                curDate = new Date(y, m, 1),
                curLength = curDate.getDay(),
                m_length = _calend._getCurLength(y, m),
                rowLength = Math.ceil((m_length + curLength) / 7), // 返回当前月几周
                html = '';
            for (var i = 0; i < 6; i++) {
                html += '<div class="day-row cf" id="dayrow' + i + '">';
                for (var j = 0; j < 7; j++) {
                    html += '<div class="day"><div class="hidt-idx">1</div></div>';
                }
                html += '</div>';
            }
            $datebody.html(html);

            _calend._fillDate(y, m);
            _calend._fillPrev(y, m, curLength);
            _calend._fillNext(y, m, curLength + m_length, rowLength - 1);

            year = y;
            month = m + 1;
            options.afterChangeMonth && options.afterChangeMonth.call(this, year, month, date);
        },
        _fillDate: function(y, m) {
            var length = _calend._getCurLength(y, m);

            for (var i = 1, j = 0; i <= length; i++) {
                var curtime = new Date(y, m, i),
                    index = curtime.getDay(),
                    date = i,
                    data = y + '-' + (m + 1) + '-' + date,
                    id = 'hidate-' + data;

                $datebody.find('.day-row').eq(j)
                    .find('.day').eq(index).data('hidate', data).attr('id', id).find('.hidt-idx').html(i);

                index === 6 && j++;
            }
        },
        changeDate: function(y, m) {
            _calend._initDateHtml(y, m);
        },
        _getCurLength: function(y, m) {
            return new Date(y, m + 1, 0).getDate();
        },
        // fill the prev month;
        _fillPrev: function(y, m, startidx) {
            var cur_m = m - 1 < 0 ? 11 : m - 1,
                cur_y = m - 1 < 0 ? y - 1 : y,
                len = _calend._getCurLength(cur_y, cur_m);

            for (var i = 0; i < startidx; i++) {
                var day = len - startidx + 1 + i,
                    data = cur_y + '-' + (cur_m + 1) + '-' + day,
                    id = 'hidate-' + data;
                $datebody.find('#dayrow0').find('.day').eq(i).addClass('hi-notcur').data('hidate', data).attr('id', id).find('.hidt-idx').html(day);
            }
        },
        // fill the next month;
        _fillNext: function(y, m, length, rowlength) {

            var cur_m = m + 1 > 11 ? 0 : m + 1,
                cur_y = m + 1 > 11 ? y + 1 : y,
                index = length % 7,
                n = Math.ceil((42 - length) / 7);

            for (var i = 6 - n, k = 1; i < 6; i++) {
                for (var j = index; j < 7; j++, k++) {
                    var data = cur_y + '-' + (cur_m + 1) + '-' + k,
                        id = 'hidate-' + data;
                    $datebody.find('#dayrow' + i).find('.day').eq(j).addClass('hi-notcur').data('hidate', data).attr('id', id).find('.hidt-idx').html(k);
                    if (j === 6) {
                        index = 0;
                    }
                }
            }
        },
        showToday: function() {
            var y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDay(),
                date = y + '-' + m + '-' + d;
            $('#hidate-' + date).addClass('day-today');
        },
        prevMonth: function() {
            _calend._prevMonth();
            _calend.changeDate(year, month);
        },
        nextMonth: function() {
            _calend._nextMonth();
            _calend.changeDate(year, month);
        },
        _prevMonth: function(){
            month--;
            if (month < 1) {
                year--;
                month = 12;
            }
        },
        _nextMonth: function() {
            month++;
            if (month > 12) {
                year++;
                month = 1;
            }
        },
        getCurDate: function() {
            return [year, month, date];
        },
        prevDay: function(){
            var length = _calend._getCurLength(year, month-2);
            date--;
            if(date < 1){
                _calend._prevMonth();
                date = length;
            }
            options.afterChangeDay && options.afterChangeDay.call(this,year, month, date);
        },
        nextDay: function(){
            var length = _calend._getCurLength(year, month-1);
            date++;
            if(date > length){
                _calend._nextMonth();
                date = 1;
            }
            options.afterChangeDay && options.afterChangeDay.call(this,year, month, date);
        }
    };
    /**
     * @namespace
     * @global
     * @ignore
     */

    /**
     * Copyright (c) 2014 All rights reserved.
     * @version: 1.0.0
     * @author: roeis
     * @description: dialog for mobile
     * @memberof hmu.widget
     * @namespace
     */
    hmu.widget.calendar = {
        init: _calend.init,
        change: _calend.changeDate,
        prevMonth: _calend.prevMonth,
        nextMonth: _calend.nextMonth,
        getCurDate: _calend.getCurDate,
        prevDay: _calend.prevDay,
        nextDay: _calend.nextDay
    };

})(this);