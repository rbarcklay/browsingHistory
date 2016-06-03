/**
 * Created by h205p2 on 5/20/16.
 */

var dataRef = new Firebase('https://browsinghistory.firebaseio.com/');
var data;

function sortData(arr) {
    arr.sort(function(a, b) {
        return b.time - a.time;
    });
    return arr;
};

//gets top ten websites from all browsing history
function tenSites(arr) {
    var sortedTen = sortData(arr).slice(0,10);
    var sites = [];
    for (i in sortedTen) {
        sites.push(sortedTen[i].label);
    }
    return sites;
};

function tenTimes(arr) {
    var sortedTen = sortData(arr).slice(0,10);
    var times = [];
    for (i in sortedTen) {
        times.push(sortedTen[i].time);
    }
    return times;
};

var main =function () {

    var ctx= document.getElementById("chromeData").getContext("2d");
    var pieData = {};
    var tempData = [];

    dataRef.on("value", function (snapshot) {

        data = snapshot.val();
        //var tempData = [];

        var siteD = data['websites'];
        for (i in siteD) {

            var time = 0;
            for (j in siteD[i]) {
                time += parseInt(siteD[i][j]);
            }

            var label = i.split("_").join(".");
            tempData.push({label: label, time: time});
        }

        var l = tenSites(tempData);
        var d = tenTimes(tempData);

        pieData = {
            labels: l,
            datasets: [
                {
                    data: d,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#99ff99",
                        "#9999ff",
                        "#ff66cc",
                        "#0066cc",
                        "#ffff99",
                        "#79d279",
                        "#cc6699"
                    ]
                }]
        }

        //console.log(pieData);

        new Chart(ctx, {type: "pie", data: pieData});

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

$(document).ready(main);