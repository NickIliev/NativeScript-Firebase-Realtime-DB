"use strict";
var app = require("application");
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    persist: true
}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
app.start({ moduleName: 'main-page' });
//# sourceMappingURL=app.js.map