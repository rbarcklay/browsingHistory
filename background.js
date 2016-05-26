/**
 * Created by rbarcklay on 4/21/16.
 */

var dataRef = new Firebase('https://browsinghistory.firebaseio.com/');

var sitesRef = dataRef.child('websites');

var switchTime = 0;
var lastSite = "none";
var timeInt = 0;

chrome.tabs.onActivated.addListener(function(info) {
    timeInt = Date.now() - switchTime;
    console.log("time1: " + Date.now());
    switchTime = Date.now();

    /*hi*/


    chrome.tabs.get(info.tabId, function(tab) {
        chrome.history.getVisits({
            'url': tab.url
        }, function (visits) {
            count = visits.length;
            time = visits[count-1].visitTime;

            var a = document.createElement('a');
            a.href = tab.url;
            hName = a.hostname.split(".").join("_");

            chrome.browserAction.setBadgeBackgroundColor({
                color: '#F50591'
            });

            chrome.browserAction.setBadgeText({
                text: '' + count
            });

            console.log('The user has visited ' +
                tab.url + ' ' +
                count + ' times. Last visit at ' + time);

            dataRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                //console.log("child");
                //console.log(snapshot.child(lastSite).valueOf());

                if(snapshot.child(lastSite).exists()){ //method?
                    sitesRef.update(lastSite);
                }

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            var urlRef = sitesRef.child(lastSite);
            console.log("time2: " + timeInt);
            urlRef.push(timeInt);

            lastSite = hName;
        });
    });

});

