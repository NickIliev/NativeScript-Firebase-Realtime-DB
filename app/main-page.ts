import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "http";

import firebase = require("nativescript-plugin-firebase");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
}

// set new value
export function setValue() {
    // to store an array of JSON objects
    firebase.setValue(
        '/owner',
        { name: "Nick Iliev" }
    ).then(() => {
        console.log("value set!")
    })
}

// create new value and update data
export function updateValue() {
    firebase.update(
        '/owner',
        { name: "Nikolay Pl. Iliev" }
    ).then(() => {
        console.log("value updated!");
    })
}

// creatunbg new key for existing value and updating the data
export function updateValueNoOverwritting() {
    firebase.update(
        '/owner',
        { address: "Sofia, Bulgaria" }
    ).then(() => {
        console.log("key added - data updated!");
    })
}

// query all items from array fruits
export function queryValues() {
    var onQueryEvent = function (result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };

    firebase.query(
        onQueryEvent,
        "/owner",
        {
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
        }
    );
}

// create an array of two items
export function setArray() {
    // to store an array of JSON objects
    firebase.setValue(
        '/fruits',
        [
            { id: 0, item: { name: 'Apple', country: 'Bulgaria', updateTs: firebase.ServerValue.TIMESTAMP } },
            { id: 1, item: { name: 'Tomato', country: 'Poland', updateTs: firebase.ServerValue.TIMESTAMP } },
        ]
    ).then(() => {
        console.log("data array set!")
    })
}

// update the first item from the created array overwritting the original item at index 0
export function updateItemInArray() {
    firebase.update(
        '/fruits/0',
        { id: 0, item: { name: 'Appricot', country: 'Greece', updateTs: firebase.ServerValue.TIMESTAMP } },
    ).then(() => {
        console.log("data array updated!");
    })
}

export function pushData() {
    firebase.push(
        '/fruits',
        { name: 'Bananas', country: 'Equador', updateTs: firebase.ServerValue.TIMESTAMP }
    ).then(res => {
        console.log("created key: " + res.key);
    });
}

// query all items from array fruits
export function queryData() {
    var onQueryEvent = function (result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };

    firebase.query(
        onQueryEvent,
        "/fruits",
        {
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
        }
    );
}