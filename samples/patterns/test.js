/**
 * --------------------------------------------------------
 * Copyright (c) 2015 All rights reserved.
 * @version: 1.0.0
 * @author: roeis
 * @description: 
 * --------------------------------------------------------
 */
// (function($) {
'use strict';
/////////////////////////////
// the Constructor Pattern //
/////////////////////////////

// define a Car Class
function Car(model, year, miles) {

    this.model = model;
    this.year = year;
    this.miles = miles;

    //note here that toString will be redefined for each of the new object created using the Car constructor
    //so, we put it on the Car's prototype, it can be reuseful
    //this.toString = function(){
    // // do something
    //}

}
// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function() {
    return this.model + " has done " + this.miles + " miles";
};

// Usage:

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());


////////////////////////
// the Module Pattern //
////////////////////////

// ### Object literals
//this pattern that i always use, maybe it simple and easy to understand
//i think it's also can be called a singleton pattern
var myModule = {

    myProperty: "someValue",

    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: "en"
    },

    // a very basic method
    saySomething: function() {
        console.log("Where in the world is Paul Irish today?");
    },

    // output a value based on the current configuration
    reportMyConfig: function() {
        console.log("Caching is: " + (this.myConfig.useCaching ? "enabled" : "disabled"));
    },

    // override the current configuration
    updateMyConfig: function(newConfig) {

        if (typeof newConfig === "object") {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    }
};

// Outputs: Where in the world is Paul Irish today?
myModule.saySomething();

// Outputs: Caching is: enabled
myModule.reportMyConfig();

// Outputs: fr
myModule.updateMyConfig({
    language: "fr",
    useCaching: false
});

// Outputs: Caching is: disabled
myModule.reportMyConfig();

// ### Module Pattern
// it's a iife structure that return a object
// and u can control what are exported , above return, those are privacy things
// protect pieces from leaking into the global scope
// with this pattern , only public api is returned 
var myNamespace = (function() {

    var myPrivateVar, myPrivateMethod;

    // A private counter variable
    myPrivateVar = 0;

    // A private function which logs any arguments
    myPrivateMethod = function(foo) {
        console.log(foo);
    };

    return {

        // A public variable
        myPublicVar: "foo",

        // A public function utilizing privates
        myPublicFunction: function(bar) {

            // Increment our private counter
            myPrivateVar++;

            // Call our private method using bar
            myPrivateMethod(bar);

        }
    };

})();

console.log(myNamespace);

// next is an example using this pattern
var basketModule = (function() {
    // privates
    var basket = [];

    function doSomethingPrivate() {
        //...
    }

    function doSomethingElsePrivate() {
        //...
    }
    // Return an object exposed to the public
    return {
        // Add items to our basket
        addItem: function(values) {
            basket.push(values);
        },
        // Get the count of items in the basket
        getItemCount: function() {
            return basket.length;
        },
        // Public alias to a private function
        doSomething: doSomethingPrivate,
        // Get the total value of items in the basket
        getTotal: function() {
            var q = this.getItemCount(),
                p = 0;
            while (q--) {
                p += basket[q].price;
            }
            return p;
        }
    };
})();
// here we can interact like as follows
// basketModule returns an object with a public API we can use
basketModule.addItem({
    item: "bread",
    price: 0.5
});
basketModule.addItem({
    item: "butter",
    price: 0.3
});
// Outputs: 2
console.log(basketModule.getItemCount());
// Outputs: 0.8
console.log(basketModule.getTotal());
// However, the following will not work:
// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// the public API
console.log(basketModule.basket);
// This also won't work as it only exists within the scope of our
// basketModule closure, but not the returned public object
// console.log(basket);

// Global module
// here is two examples that expose a variable into global
// the second one is my solution
var myModule = (function() {
    // Module object
    var module = {};
    return module;
})();

(function() {
    // Module object
    var module = {};
    window.module = module;
})();

// when call global variable, use
// ### Toolkit And Framework-specific Module Pattern Implementations
// 
// jQuery
function library(module) {

    $(function() {
        if (module.init) {
            module.init();
        }
    });

    return module;
}

var myLibrary = library(function() {
    return {
        init: function() {
            // module implementation
        }
    };
}());

//////////////////////////////////
// The Revealing Module Pattern //
//////////////////////////////////

// it make it more clearer at the end 
// which of our functions and variables may be accessed publicly which eases readability
var myRevealingModule = (function() {

    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        console.log("Name:" + privateVar);
    }

    function publicSetName(strName) {
        privateVar = strName;
    }

    function publicGetName() {
        privateFunction();
    }

    // Reveal public pointers to
    // private functions and properties

    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };

})();

myRevealingModule.setName("Paul Kinlan");


///////////////////////////
// The Singleton Pattern //
///////////////////////////

var mySingleton = (function() {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        // Private methods and variables
        function privateMethod() {
            console.log("I am private");
        }
        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {

            // Public methods and variables
            publicMethod: function() {
                console.log("The public can see me!");
            },

            publicProperty: "I am also public",

            getRandomNumber: function() {
                return privateRandomNumber;
            }
        };

    };

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        // this phase is important
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

var myBadSingleton = (function() {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function() {
                return privateRandomNumber;
            }
        };
    };

    return {
        // Always create a new Singleton instance
        getInstance: function() {
            instance = init();
            return instance;
        }
    };

})();


// Usage:

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.

//////////////////////////
// The Observer Pattern //
//////////////////////////
//
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function() {
    return this.observerList.length;
};

ObserverList.prototype.get = function(index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function(obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function(index) {
    this.observerList.splice(index, 1);
};

//
// model a subject 
// 

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function(observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

// notify the target to do the same operation
Subject.prototype.notify = function(context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};

function Observer() {
    this.update = function() {
        // ...
    };
}

// a shallow extend function
function extend(extension, obj) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

var controlCheckbox = document.getElementById('mainCheckbox'),
    addBtn = document.getElementById('addNewObserver'),
    container = document.getElementById('observersContainer');

extend(new Subject(), controlCheckbox);

controlCheckbox.onclick = function() {
    // Clicking the checkbox will trigger notifications to its observers
    controlCheckbox.notify(controlCheckbox.checked);
};

addBtn.onclick = addNewObserver;

// Concrete Observer
function addNewObserver() {
    var check = document.createElement('input');
    check.type = 'checkbox';

    extend(new Observer(), check);

    check.update = function(value) {
        this.checked = value;
    };
    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(check);
    // Append the item to the container
    container.appendChild(check);
}

// here is worth nothing that differences between the Obsrever and Publich/Subscribe Pattern

// ### Publish/Subscribe Implementations
// 
// Publish
 
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
//      $( el ).trigger( "/login", [{username:"test", userData:"test"}] );
// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
//      dojo.publish( "/login", [{username:"test", userData:"test"}] );
// YUI: el.publish("channel", [arg1, arg2, arg3]);
//      el.publish( "/login", {username:"test", userData:"test"} );

// Subscribe
 
// jQuery: $(obj).on( "channel", [data], fn );
//      $( el ).on( "/login", function( event ){...} );
// Dojo: dojo.subscribe( "channel", fn);
//      var handle = dojo.subscribe( "/login", function(data){..} );
// YUI: el.on("channel", handler);
//      el.on( "/login", function( data ){...} );
 
// Unsubscribe
 
// jQuery: $(obj).off( "channel" );
//      $( el ).off( "/login" );
// Dojo: dojo.unsubscribe( handle );
//      dojo.unsubscribe( handle );
// YUI: el.detach("channel");
//      el.detach( "/login" );
//      


//the implementaion of publish/subscribe pattern
// 
// it also think as a simple implementaion of on/off event
// first u subscribe a eventname, or sign a event
// and u can publish this event
// 
var pubsub = {};
 
(function(myObject) {
 
    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};
 
    // An topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function( topic, args ) {
 
        if ( !topics[topic] ) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func( topic, args );
        }

        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and
    // a callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));


var messageLogger = function(topics, data){
    console.log('logging:' + topics + ': '+ data);
};

var subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

pubsub.publish('inbox/newMessage', 'hello world');

pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

pubsub.publish('inbox/newMessage', {
    sender: "hello@google.com",
    body: 'hello again'
});

pubsub.unsubscribe(subscription);

pubsub.publish('inbox/newMessage', 'hello are u still there?');

var getCurrentTime = function(){
    var date = new Date(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();

    return (m + '/' + d + '/' + y + ' ' + t);
};

function addGridRow(data){
    console.log('updated grid component with:' + data);
}
function updateCounter(data){
    console.log('data last updated at:' + getCurrentTime() + 'with' + data)
}

function gridUpdate(topic, data){
    if(data !== undefined){
        addGridRow(data);
        updateCounter(data);
    }
}

var subcriber2 = pubsub.subscribe('newDataAvailable', gridUpdate);

pubsub.publish('newDataAvailable', {
    summary: 'Apple made $5 billon',
    identifier: 'Apple',
    stockPrice: 570.11
});

pubsub.publish('newDataAvailable', {
    summary: 'microsoft made $20 million',
    identifier: 'MASt',
    stockPrice: 40.23
});

// })(jQuery);