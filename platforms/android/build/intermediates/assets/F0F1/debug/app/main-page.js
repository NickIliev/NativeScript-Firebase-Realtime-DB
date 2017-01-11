"use strict";
var firebase = require("nativescript-plugin-firebase");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function setValues() {
    // to store an array of JSON objects
    firebase.setValue('/companies', [
        { name: 'Telerik', country: 'Bulgaria' },
        { name: 'Google', country: 'USA' }
    ]);
}
exports.setValues = setValues;
function pushData() {
    firebase.push('/users', {
        'first': 'Eddy',
        'last': 'Verbruggen',
        'birthYear': 1977,
        'isMale': true,
        'address': {
            'street': 'foostreet',
            'number': 123
        }
    }).then(function (res) {
        console.log("created key: " + res.key);
    });
}
exports.pushData = pushData;
function queryData() {
    var onQueryEvent = function (result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };
    firebase.query(onQueryEvent, "/companies", {
        // set this to true if you want to check if the value exists or just want the event to fire once
        // default false, so it listens continuously.
        // Only when true, this function will return the data in the promise as well!
        singleEvent: true,
        // order by company.country
        orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'since' // mandatory when type is 'child'
        },
        // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
        // use either a 'range'
        //range: {
        //    type: firebase.QueryRangeType.EQUAL_TO,
        //    value: 2000
        ///},
        // .. or 'chain' ranges like this:
        // ranges: [
        //   {
        //       type: firebase.QueryRangeType.START_AT,
        //       value: 1999
        //   },
        //   {
        //       type: firebase.QueryRangeType.END_AT,
        //       value: 2000
        //   }
        // ],
        // only the first 2 matches
        // (note that there's only 1 in this case anyway)
        limit: {
            type: firebase.QueryLimitType.LAST,
            value: 2
        }
    });
}
exports.queryData = queryData;
//# sourceMappingURL=main-page.js.map