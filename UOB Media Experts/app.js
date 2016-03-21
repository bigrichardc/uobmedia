'use strict';  

(function() {
    var app = {
        data: {},
        
        back: function () {
            app.mobile.navigate('#:back');
        },
        isOnline: function() {
            if (app.hasConnection)
                return app.hasConnection;
            else
                return false;
        },
        // Application Constructor
        initialize: function () {
        

            if (app.registerPreInitialiseCB) {
                app.receivedEvent('registerPreInitialise');
                var length = app.registerPreInitialiseCB.length - 1;
     
                do {
                    app.registerPreInitialiseCB[length]();
                } while (length--);
            }

            this.bindEvents();
            app.hasConnection = true;
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            app.receivedEvent('bindEvents');
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener('offline', this.onDeviceOffline, false);
            document.addEventListener('online', this.onDeviceOnline, false);
        },
        registerPush: function () {
            app.receivedEvent('registeredPush');
        },
        registerPreInitialise: function (callback)
        {
            if (!app.registerPreInitialiseCB)
                app.registerPreInitialiseCB = [];

            app.registerPreInitialiseCB.push(callback);
        },
        registerInitialise: function (callback) {
            if (!app.registerInitialiseCB)
                app.registerInitialiseCB = [];

            app.registerInitialiseCB.push(callback);
        },
        registerPostInitialise: function (callback) {
            if (!app.registerPostInitialiseCB)
                app.registerPostInitialiseCB = [];

            app.registerPostInitialiseCB.push(callback);
        },
        registerTimedWatcher: function (item) {
            //format of item: {every: <value in minutes>, then: function () {//a callback function; } }
            if (!app.registeredTimedObjects)
                app.registeredTimedObjects = [];

            item.updateWhen = moment().add(item.every, 'minutes').format("hh:mm:ss");

            app.registeredTimedObjects.push(item);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicity call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            app.receivedEvent('deviceready');

            var initialView = 'components/home/view.html';

            app.hasConnection = true;



            if (app.registerInitialiseCB) {
                app.receivedEvent('registerInitialise');
                var length = app.registerInitialiseCB.length - 1;

                do {
                    app.registerInitialiseCB[length]();
                } while (length--);
            }

            if (app.registerPostInitialiseCB) {
                app.receivedEvent('registerPostInitialise');
                var lengthPost = app.registerPostInitialiseCB.length - 1;

                do {
                    app.registerPostInitialiseCB[lengthPost]();
                } while (lengthPost--);
            }


            app.mobile = new kendo.mobile.Application(document.body, {
                skin: 'flat',
                // the application needs to know which view to load first
                initial: initialView,
                statusBarStyle: "black"
            }
                
                
                );

            //navigator.splashscreen.hide();
        },
        onViewChange: function(e) {
            app.receivedEvent('onViewChange');

            if (app.registeredTimedObjects) {
                var currentTime = moment().format("hh:mm:ss");

                var counter = app.registeredTimedObjects.length - 1;

                do {
                    var item = app.registeredTimedObjects[counter];

                    if (currentTime >= item.updateWhen) {
                        item.then();

                        item.updateWhen = moment().add(item.every, 'minutes').format("hh:mm:ss");

                        app.registeredTimedObjects[counter] = item;
                    }
                } while (counter--);

            };
        },
        onDeviceOffline: function () {
            app.receivedEvent('onDeviceOffline');
            app.hasConnection = false;
        },
        onDeviceOnline: function () {
            app.receivedEvent('onDeviceOnline');
            //  console.log("online!!");
            app.hasConnection = true;
        },
        /* pushReceivedEvent: function(item) {
             app.receivedEvent('pushEventReceived');
         },*/
        // Update DOM on a Received Event
        receivedEvent: function (id) {
            console.log('Received Event: ' + id);
        }

    };


    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                //transition: 'slide',
                //skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };
   if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

