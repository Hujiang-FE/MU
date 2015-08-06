
'use strict';
// (function(window, document, undefined) {
    var $log = $('#log');

    function log(string) {
        $log.prepend('<p>log: ' + string + ' at ' + Date.now() + '</p>');
    }
    $(document).on('mylib:change', function(e, from, to) {
        console.log('change on %o with data %s, %s', e.target, from, to)
    });

    $('.wrapper').on('swipeLeft', function(event) {
        log('swipeLeft, wrapper');
        event.stopPropagation();
    });

    $('.bubble1').on('swipeLeft', function(event) {
        log('swipeLeft, bubble1');
        event.stopPropagation();
    });
    $('.bubble2').on('swipeLeft', function(event) {
        log('swipeLeft, bubble2');
        event.stopPropagation();
    });


    $('.wrapper').on('tap', function(){
        log('tap wrapper');
    });
    $('.bubble1').on('tap', function(event){
        log('tap bubble1');
        event.stopPropagation();
    });
    $('.bubble2').on('tap', function(event){
        log('tap bubble2');
        event.stopPropagation();
    });
    // trigger the custom event
    $(document.body).trigger('mylib:change', ['one', 'two']);
// })(window, document);


function MyEvent() {
    // this.handler;
}
MyEvent.prototype = {
    addHandler: function(handler) {
        this.handler = handler;
    },
    fire: function() {
        this.handler && this.handler();
    },
    removeHandler: function() {
        this.handler = null;
    }
};

var my = new MyEvent();

my.addHandler(alertMessage);

my.fire();

my.removeHandler();

my.fire();

function alertMessage(){
    console.log('1');
}