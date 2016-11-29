import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "http";

import firebase = require("nativescript-plugin-firebase");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
}

export function setValues() {
  // to store an array of JSON objects
  firebase.setValue(
      '/companies',
      [
        {name: 'Telerik', country: 'Bulgaria'},
        {name: 'Google', country: 'USA'}
      ]
  );
}

export function pushData() {
  firebase.push(
    '/users',
    {
      'first': 'Eddy',
      'last': 'Verbruggen',
      'birthYear': 1977,
      'isMale': true,
      'address': {
        'street': 'foostreet',
        'number': 123
      }
    }
  ).then(res => {
      console.log("created key: " + res.key);
  });
}

export function queryData() {
    var onQueryEvent = function(result) {
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
        "/companies",
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