/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
// (function(){
    'use strict';
    
    console.log('app start');

    var arr  = [0,1,3,4,5,66,7];

    for(let i = 0; i < arr.length; i++){
        // console.log(i);
    }
    var a = 4;

    function test(){
        let x;
        let a = 2;
        console.log('callback next' + a);
    }

    {
        let tmp = 2;
        console.log(tmp + ' block new');
    }

    

    var a = [];
    var i = 0;
    for (let i = 0; i < 10; i++) {
        a[i] = function () {
            console.log(i);
        };
    }
    console.log(i);
    a[6]();
    // 10
    // console.log(i);

    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    console.log(map);

    // for (let [key, value] of map) {
    //     console.log(key + " is " + value);
    // }

    function* helloWorldGenerator() {
        console.log('yield 1');
        yield 'hello';

        console.log('yield 2');
        yield test();

        console.log('yield 3');
        yield 'world';

        console.log('yield 4');
        return 'ending';
    }

    var hw = helloWorldGenerator();


    // //定义类
    // class Point {

    //   constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    //   }

    //   toString() {
    //     return '('+this.x+', '+this.y+')';
    //   }

    // }

// })();