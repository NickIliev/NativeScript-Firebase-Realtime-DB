"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    firebase.update('/owner', { name: "Nikolay Pl. Iliev" }).then(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsdURBQTBEO0FBRTFELHdFQUF3RTtBQUN4RSxzQkFBNkIsSUFBZTtJQUN4Qyx1QkFBdUI7SUFDdkIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxDQUFDO0FBSEQsb0NBR0M7QUFFRCxnQkFBZ0I7QUFDaEI7SUFDSSxvQ0FBb0M7SUFDcEMsUUFBUSxDQUFDLFFBQVEsQ0FDYixRQUFRLEVBQ1IsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQ3pCLENBQUMsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFSRCw0QkFRQztBQUVELG1DQUFtQztBQUNuQztJQUNJLFFBQVEsQ0FBQyxNQUFNLENBQ1gsUUFBUSxFQUNSLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLENBQ2hDLENBQUMsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQVBELGtDQU9DO0FBRUQsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2Qyx1QkFBdUI7QUFDdkIseUJBQXlCO0FBQ3pCLHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCxJQUFJO0FBRUosNkRBQTZEO0FBQzdEO0lBQ0ksUUFBUSxDQUFDLE1BQU0sQ0FDWCxRQUFRLEVBQ1IsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FDakMsQ0FBQyxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBUEQsOERBT0M7QUFF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Q0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ1osU0FBUyxFQUNUO1FBQ0ksZ0dBQWdHO1FBQ2hHLDZDQUE2QztRQUM3Qyw2RUFBNkU7UUFDN0UsV0FBVyxFQUFFLElBQUk7UUFDakIsMkJBQTJCO1FBQzNCLE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUNyQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlDQUFpQztTQUNuRDtRQUNELDhGQUE4RjtRQUM5Rix1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDZDQUE2QztRQUM3QyxpQkFBaUI7UUFDakIsS0FBSztRQUNMLGtDQUFrQztRQUNsQyxZQUFZO1FBQ1osTUFBTTtRQUNOLGdEQUFnRDtRQUNoRCxvQkFBb0I7UUFDcEIsT0FBTztRQUNQLE1BQU07UUFDTiw4Q0FBOEM7UUFDOUMsb0JBQW9CO1FBQ3BCLE1BQU07UUFDTixLQUFLO1FBQ0wsMkJBQTJCO1FBQzNCLGlEQUFpRDtRQUNqRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJO1lBQ2xDLEtBQUssRUFBRSxDQUFDO1NBQ1g7S0FDSixDQUNKLENBQUM7QUFDTixDQUFDO0FBakRELDhCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcblxyXG4vLyBFdmVudCBoYW5kbGVyIGZvciBQYWdlIFwibmF2aWdhdGluZ1RvXCIgZXZlbnQgYXR0YWNoZWQgaW4gbWFpbi1wYWdlLnhtbFxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgLy8gR2V0IHRoZSBldmVudCBzZW5kZXJcclxuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbn1cclxuXHJcbi8vIHNldCBuZXcgdmFsdWVcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhbHVlKCkge1xyXG4gICAgLy8gdG8gc3RvcmUgYW4gYXJyYXkgb2YgSlNPTiBvYmplY3RzXHJcbiAgICBmaXJlYmFzZS5zZXRWYWx1ZShcclxuICAgICAgICAnL293bmVyJyxcclxuICAgICAgICB7IG5hbWU6IFwiTmljayBJbGlldlwiIH1cclxuICAgICkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZSBzZXQhXCIpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vLyBjcmVhdGUgbmV3IHZhbHVlIGFuZCB1cGRhdGUgZGF0YVxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVmFsdWUoKSB7XHJcbiAgICBmaXJlYmFzZS51cGRhdGUoXHJcbiAgICAgICAgJy9vd25lcicsXHJcbiAgICAgICAgeyBuYW1lOiBcIk5pa29sYXkgUGwuIElsaWV2XCIgfVxyXG4gICAgKS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIHVwZGF0ZWQhXCIpO1xyXG4gICAgfSlcclxufVxyXG5cclxuLy8gY3JlYXRlIG5ldyB2YWx1ZSBhbmQgdXBkYXRlIGRhdGFcclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlQnlLZXkoKSB7XHJcbi8vICAgICBmaXJlYmFzZS51cGRhdGUoXHJcbi8vICAgICAgICAgJy9vd25lci9uYW1lJyxcclxuLy8gICAgICAgICBcIk5hdGl2ZSBOaWNrXCJcclxuLy8gICAgICkudGhlbigoKSA9PiB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZSB1cGRhdGVkIVwiKTtcclxuLy8gICAgIH0pXHJcbi8vIH1cclxuXHJcbi8vIGNyZWF0dW5iZyBuZXcga2V5IGZvciBleGlzdGluZyB2YWx1ZSBhbmQgdXBkYXRpbmcgdGhlIGRhdGFcclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlTm9PdmVyd3JpdHRpbmcoKSB7XHJcbiAgICBmaXJlYmFzZS51cGRhdGUoXHJcbiAgICAgICAgJy9vd25lcicsXHJcbiAgICAgICAgeyBhZGRyZXNzOiBcIlNvZmlhLCBCdWxnYXJpYVwiIH1cclxuICAgICkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJrZXkgYWRkZWQgLSBkYXRhIHVwZGF0ZWQhXCIpO1xyXG4gICAgfSlcclxufVxyXG5cclxuLy8gcXVlcnkgYWxsIGl0ZW1zIGZyb20gYXJyYXkgZnJ1aXRzXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVZhbHVlcygpIHtcclxuICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgIG9uUXVlcnlFdmVudCxcclxuICAgICAgICBcIi9vd25lclwiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxyXG4gICAgICAgICAgICAvLyBPbmx5IHdoZW4gdHJ1ZSwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgZGF0YSBpbiB0aGUgcHJvbWlzZSBhcyB3ZWxsIVxyXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuRklSU1QsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufVxyXG5cclxuLy8gY3JlYXRlIGFuIGFycmF5IG9mIHR3byBpdGVtc1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJyYXkoKSB7XHJcbiAgICAvLyB0byBzdG9yZSBhbiBhcnJheSBvZiBKU09OIG9iamVjdHNcclxuICAgIGZpcmViYXNlLnNldFZhbHVlKFxyXG4gICAgICAgICcvZnJ1aXRzJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHsgaWQ6IDAsIGl0ZW06IHsgbmFtZTogJ0FwcGxlJywgY291bnRyeTogJ0J1bGdhcmlhJywgdXBkYXRlVHM6IGZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCB9IH0sXHJcbiAgICAgICAgICAgIHsgaWQ6IDEsIGl0ZW06IHsgbmFtZTogJ1RvbWF0bycsIGNvdW50cnk6ICdQb2xhbmQnLCB1cGRhdGVUczogZmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QIH0gfSxcclxuICAgICAgICBdXHJcbiAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSBhcnJheSBzZXQhXCIpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vLyB1cGRhdGUgdGhlIGZpcnN0IGl0ZW0gZnJvbSB0aGUgY3JlYXRlZCBhcnJheSBvdmVyd3JpdHRpbmcgdGhlIG9yaWdpbmFsIGl0ZW0gYXQgaW5kZXggMFxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSXRlbUluQXJyYXkoKSB7XHJcbiAgICBmaXJlYmFzZS51cGRhdGUoXHJcbiAgICAgICAgJy9mcnVpdHMvMCcsXHJcbiAgICAgICAgeyBpZDogMCwgaXRlbTogeyBuYW1lOiAnQXBwcmljb3QnLCBjb3VudHJ5OiAnR3JlZWNlJywgdXBkYXRlVHM6IGZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCB9IH0sXHJcbiAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSBhcnJheSB1cGRhdGVkIVwiKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXNoRGF0YSgpIHtcclxuICAgIGZpcmViYXNlLnB1c2goXHJcbiAgICAgICAgJy9mcnVpdHMnLFxyXG4gICAgICAgIHsgbmFtZTogJ0JhbmFuYXMnLCBjb3VudHJ5OiAnRXF1YWRvcicsIHVwZGF0ZVRzOiBmaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAgfVxyXG4gICAgKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXMua2V5KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBxdWVyeSBhbGwgaXRlbXMgZnJvbSBhcnJheSBmcnVpdHNcclxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5RGF0YSgpIHtcclxuICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgIG9uUXVlcnlFdmVudCxcclxuICAgICAgICBcIi9mcnVpdHNcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseS5cclxuICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxyXG4gICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdzaW5jZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGNvbXBhbmllcyAnc2luY2UnIGEgY2VydGFpbiB5ZWFyIChUZWxlcmlrJ3MgdmFsdWUgaXMgMjAwMCwgd2hpY2ggaXMgaW1hZ2luYXJ5IGJ0dylcclxuICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgICAgICAgICAgLy9yYW5nZToge1xyXG4gICAgICAgICAgICAvLyAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgLy8vfSxcclxuICAgICAgICAgICAgLy8gLi4gb3IgJ2NoYWluJyByYW5nZXMgbGlrZSB0aGlzOlxyXG4gICAgICAgICAgICAvLyByYW5nZXM6IFtcclxuICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLlNUQVJUX0FULFxyXG4gICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMTk5OVxyXG4gICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FTkRfQVQsXHJcbiAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgICAgICAvLyBvbmx5IHRoZSBmaXJzdCAyIG1hdGNoZXNcclxuICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG59Il19