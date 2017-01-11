"use strict";
var firebase = require("nativescript-plugin-firebase");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
// set new value
function setValue() {
    // to store an array of JSON objects
    firebase.setValue('/owner', { name: "Nick Iliev" }).then(function () {
        console.log("value set!");
    });
}
exports.setValue = setValue;
// create new value and update data
function updateValue() {
    firebase.update('/owner', { name: "Nikolay P. Iliev" }).then(function () {
        console.log("value updated!");
    });
}
exports.updateValue = updateValue;
// create new value and update data
// export function updateValueByKey() {
//     firebase.update(
//         '/owner/name',
//         "Native Nick"
//     ).then(() => {
//         console.log("value updated!");
//     })
// }
// creatunbg new key for existing value and updating the data
function updateValueNoOverwritting() {
    firebase.update('/owner', { address: "Sofia, Bulgaria" }).then(function () {
        console.log("key added - data updated!");
    });
}
exports.updateValueNoOverwritting = updateValueNoOverwritting;
// query all items from array fruits
function queryValues() {
    var onQueryEvent = function (result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };
    firebase.query(onQueryEvent, "/owner", {
        // set this to true if you want to check if the value exists or just want the event to fire once
        // default false, so it listens continuously.
        // Only when true, this function will return the data in the promise as well!
        singleEvent: true,
        orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'since' // mandatory when type is 'child'
        },
        limit: {
            type: firebase.QueryLimitType.FIRST,
            value: 5
        }
    });
}
exports.queryValues = queryValues;
// create an array of two items
function setArray() {
    // to store an array of JSON objects
    firebase.setValue('/fruits', [
        { id: 0, item: { name: 'Apple', country: 'Bulgaria', updateTs: firebase.ServerValue.TIMESTAMP } },
        { id: 1, item: { name: 'Tomato', country: 'Poland', updateTs: firebase.ServerValue.TIMESTAMP } },
    ]).then(function () {
        console.log("data array set!");
    });
}
exports.setArray = setArray;
// update the first item from the created array overwritting the original item at index 0
function updateItemInArray() {
    firebase.update('/fruits/0', { id: 0, item: { name: 'Appricot', country: 'Greece', updateTs: firebase.ServerValue.TIMESTAMP } }).then(function () {
        console.log("data array updated!");
    });
}
exports.updateItemInArray = updateItemInArray;
function pushData() {
    firebase.push('/fruits', { name: 'Bananas', country: 'Equador', updateTs: firebase.ServerValue.TIMESTAMP }).then(function (res) {
        console.log("created key: " + res.key);
    });
}
exports.pushData = pushData;
// query all items from array fruits
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
    firebase.query(onQueryEvent, "/fruits", {
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