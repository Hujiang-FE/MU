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
    return this.model + ' has done ' + this.miles + ' miles';
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
    myObject.publish = function(topic, args) {

        if (!topics[topic]) {
            return false;
        }

        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and
    // a callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function(topic, func) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));


var messageLogger = function(topics, data) {
    console.log('logging:' + topics + ': ' + data);
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

var getCurrentTime = function() {
    var date = new Date(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();

    return (m + '/' + d + '/' + y + ' ' + t);
};

function addGridRow(data) {
    console.log('updated grid component with:' + data);
}

function updateCounter(data) {
    console.log('data last updated at:' + getCurrentTime() + 'with' + data)
}

function gridUpdate(topic, data) {
    if (data !== undefined) {
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

//////////////////////////
// The Mediator Pattern //
//////////////////////////

///////////////////////////
// The Prototype Pattern //
///////////////////////////

var myCar = {
    name: 'Ford Escort',
    drive: function() {
        console.log('Weeee, i\'m driving');
    },
    panic: function() {
        console.log('wait, how do you sleep this thing?');
    }
};

var yourCar = Object.create(myCar);

console.log(yourCar);

// var vehicle = {
//     getModel: function(){
//         console.log('the Model of this vehicle is ...' + this.model);
//     }
// };
// var car = Object.create(vehicle, {
//     id: {
//         // value: MY_GLOBAL.nextId(),
//         enumerable: true
//     },
//     model: {
//         value: 'Ford',
//         enumerable: true
//     }
// });

var vehiclePrototype = {
    init: function(carModel) {
        this.model = carModel;
    },
    getModel: function() {
        console.log('the Model of this vehicle is ...' + this.model);
    }
};

function vehicle(model) {
    function F() {}
    F.prototype = vehiclePrototype;

    var f = new F();

    f.init(model);
    return f;
}

var car = vehicle("Ford Rscort");
car.getModel();

//
var beget = (function() {
    function F() {}
    return function(proto) {
        F.prototype = proto;
        return new F();
    };
}());


/////////////////////////
// The Command Pattern //
/////////////////////////

// excute this pattern's function is more like command, i think

var carManager = {
    //request information
    requestInfo: function(model, id) {
        console.log('the information for' + model + ' with ID' + id + ' is foobar');
    },

    //purchase a car
    buyVehicle: function(model, id) {
        console.log('You have successfully purchased item ' + id + ', a' + model);
    },

    // arrange a viewing
    arrangeViewing: function(model, id) {
        console.log('you have successfully booked a viewing of ' + model + ': ' + id);
    }
};

carManager.execute = function(name) {
    return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

carManager.execute('arrangeViewing', 'Ferrari', '14523');
carManager.execute('requestInfo', 'Ford Mondeo', '54323');
carManager.execute('requestInfo', 'Ford Escort', '34232');
carManager.execute('buyVehicle', 'Ford Escort', '34232');


////////////////////////
// The Facade Pattern //
////////////////////////

var module = (function() {

    var _private = {
        i: 5,
        get: function() {
            console.log("current value:" + this.i);
        },
        set: function(val) {
            this.i = val;
        },
        run: function() {
            console.log("running");
        },
        jump: function() {
            console.log("jumping");
        }
    };

    return {

        facade: function(args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    };
}());

// Outputs: "current value: 10" and "running"
module.facade({
    run: true,
    val: 10
});


/////////////////////////
// The Factory Pattern //
/////////////////////////

function Car(options) {

    // some defaults
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.color = options.color || 'sliver';
}

function Truck(options) {
    this.state = options.state || 'used';
    this.wheelSize = options.wheelSize || 'large';
    this.color = options.color || 'blue';
}

function VehicleFactory() {}

// our default vehicle class is Car
VehicleFactory.prototype.vehicleClass = Car;

VehicleFactory.prototype.createVehicle = function(options) {
    switch (options.vehicleType) {
        case 'car':
            this.vehicleClass = Car;
            break;
        case 'truck':
            this.vehicleClass = Truck;
            break;
    }
    return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: 'car',
    color: 'yellow',
    doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);

// approach #1: modify a vehicleFactory instance to use the truck class
var movingTruck = carFactory.createVehicle({
    vehicleType: 'truck',
    state: 'like new',
    color: 'red',
    wheelSize: 'small'
});

console.log(movingTruck instanceof Truck);
console.log(movingTruck);

// subclass vehicleFactory to create a factory class that builds Trucks
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
    state: 'omg,, so bad',
    color: 'pink',
    wheelSize: 'so big'
});
console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);


// Abstract Factories
var abstractVehicleFactory = (function() {
    // storage for our vehicle types
    var types = {};

    return {
        getVehicle: function(type, customizations) {
            var Vehicle = types[type];
            return Vehicle ? new Vehicle(customizations) : null;
        },

        registerVehicle: function(type, Vehicle) {
            var proto = Vehicle.prototype;
            // only register classes that fulfill the vehicle contract
            // if(proto.drive && proto.breakdown){
            types[type] = Vehicle;
            // }
            return abstractVehicleFactory;
        }
    };
}());

abstractVehicleFactory.registerVehicle('car1', Car);
abstractVehicleFactory.registerVehicle('car2', Truck);

console.log(abstractVehicleFactory.getVehicle('car1', {
    color: 'lime Green'
}));
console.log(abstractVehicleFactory.getVehicle('car2', {
    color: 'lime Green2'
}));


///////////////////////
// The Mixin Pattern //
///////////////////////
//
// here is some confusion
var Person = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = 'male';
};

// a new instance of Person can then easily be created as follows:
var clark = new Person('Clark', 'Kent');

// define a subclass constructor for 'superhero'
var Superhero = function(firstName, lastName, powers) {

    //invoke the superclass constructor on the new object
    //then use .call() to invoke the contructor as a method of the object to be initialized.
    Person.call(this, firstName, lastName);
    this.powers = powers;
};

// set Superhero's prototype to Person
Superhero.prototype = Object.create(Person.prototype);
var superman = new Superhero('clark', 'kent', ['flight', 'heat-vision']);
console.log(superman);



///////////////////////////
// The Decorator Pattern //
///////////////////////////

// the constuctor to decorate
function Macbook() {
    this.cost = function() {
        return 997;
    };
    this.screenSize = function() {
        return 11.6;
    };
}
// decorator1
function memory(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };
}
// decorator2
function engraving(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 200;
    };
}
// decorator3
function insurance(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 80;
    };
}

var mb = new Macbook();
memory(mb);
engraving(mb);
insurance(mb);

// the above example, our Decorators are overriding the MacBook()
// super-class objects .cost() function to return the current price
//  of the Macbook plus the cost of the upgrade being specified.
console.log(mb.cost(), mb.screenSize());



///////////////
// Flyweight //
///////////////


// Simulate pure virtual inheritance/"implement" keyword for JS
Function.prototype.implementsFor = function(parentClassOrObject) {
    if (parentClassOrObject.constructor === Function) {
        // Normal Inheritance
        this.prototype = new parentClassOrObject();
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    } else {
        // Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};


// Flyweight object
var CoffeeOrder = {

    // Interfaces
    serveCoffee: function(context) {},
    getFlavor: function() {}

};


// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {

    var flavor = newFlavor;

    // If an interface has been defined for a feature
    // implement the feature
    if (typeof this.getFlavor === "function") {
        this.getFlavor = function() {
            return flavor;
        };
    }

    if (typeof this.serveCoffee === "function") {
        this.serveCoffee = function(context) {
            console.log("Serving Coffee flavor " + flavor + " to table number " + context.getTable());
        };
    }

}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor(CoffeeOrder);

// CoffeeFlavor.prototype = new CoffeeOrder();

// Handle table numbers for a coffee order
function CoffeeOrderContext(tableNumber) {
    return {
        getTable: function() {
            return tableNumber;
        }
    };
}


function CoffeeFlavorFactory() {
    var flavors = {},
        length = 0;

    return {
        getCoffeeFlavor: function(flavorName) {

            var flavor = flavors[flavorName];
            if (typeof flavor === "undefined") {
                flavor = new CoffeeFlavor(flavorName);
                flavors[flavorName] = flavor;
                length++;
            }
            return flavor;
        },

        getTotalCoffeeFlavorsMade: function() {
            return length;
        }
    };
}

// Sample usage:
testFlyweight();

function testFlyweight() {


    // The flavors ordered.
    var flavors = new CoffeeFlavor(),

        // The tables for the orders.
        tables = new CoffeeOrderContext(),

        // Number of orders made
        ordersMade = 0,

        // The CoffeeFlavorFactory instance
        flavorFactory;

    function takeOrders(flavorIn, table) {
        flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
        tables[ordersMade++] = new CoffeeOrderContext(table);
    }

    flavorFactory = new CoffeeFlavorFactory();

    takeOrders('Cappuccino', 2);
    takeOrders('Cappuccino', 2);
    takeOrders('Frappe', 1);
    takeOrders('Frappe', 1);
    takeOrders('Xpresso', 1);
    takeOrders('Frappe', 897);
    takeOrders('Cappuccino', 97);
    takeOrders('Cappuccino', 97);
    takeOrders('Frappe', 3);
    takeOrders('Xpresso', 3);
    takeOrders('Cappuccino', 3);
    takeOrders('Xpresso', 96);
    takeOrders('Frappe', 552);
    takeOrders('Cappuccino', 121);
    takeOrders('Xpresso', 121);

    for (var i = 0; i < ordersMade; ++i) {
        flavors[i].serveCoffee(tables[i]);
    }
    console.log(' ');
    console.log('total CoffeeFlavor objects made: ' + flavorFactory.getTotalCoffeeFlavorsMade());
}

// look at Flyweight by implementing a system all of books in a library;
var Book = function(id, title, author, genre, pageCount, publisherID, ISBN) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
    // this.checkoutDate = checkoutDate;
    // this.checkoutMember = checkoutMember;
    // this.dueReturnDate = dueReturnDate;
    // this.availability = availability;
};
// separate out data into intrinsic and extrinsic states
// comment above is Flyweight optimized version

Book.prototype = {

    getTitle: function() {
        return this.title;
    },

    getAuthor: function() {
        return this.author;
    },

    getISBN: function() {
        return this.ISBN;
    },

    // For brevity, other getters are not shown
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {

        this.id = bookID;
        this.availability = newStatus;
        this.checkoutDate = checkoutDate;
        this.checkoutMember = checkoutMember;
        this.dueReturnDate = newReturnDate;

    },

    extendCheckoutPeriod: function(bookID, newReturnDate) {

        this.id = bookID;
        this.dueReturnDate = newReturnDate;

    },

    isPastDue: function(bookID) {

        var currentDate = new Date();
        return currentDate.getTime() > Date.parse(this.dueReturnDate);

    }
};

var BookFactory = (function() {
    var existingBooks = {}, existingBook;
    return {
        createBook: function(title, author, genre, pageCount, publisherID, ISBN){

            existingBook = existingBooks[ISBN];
            if(!!existingBook){
                return existingBook;
            }else{
                var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
                existingBooks[ISBN] = book;
                return book;
            }
        }
    };
})();

// BookRecordManager singleton
var BookRecordManager = (function(){
    var bookRecordDatabase = {};
    return {
        addBookRecord: function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ){
            var book = bookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );
 
            bookRecordDatabase[id] = {
                checkoutMember: checkoutMember,
                checkoutDate: checkoutDate,
                dueReturnDate: dueReturnDate,
                availability: availability,
                book: book
            };
        },
        updateCheckoutStatus: function( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate){
            var record = bookRecordDatabase[bookID];
            record.availability = newStatus;
            record.checkoutDate = checkoutDate;
            record.checkoutMember = checkoutMember;
            record.dueReturnDate = newReturnDate;
        },
        extendCheckoutPeriod: function(bookID, newReturnDate){
            bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
        },
        isPastDue: function(bookID){
            var currentDate = new Date();
            return currentDate.getTime() > Date.parse( bookRecordDatabase[bookID].dueReturnDate );
        }
    };

})();











// })(jQuery);