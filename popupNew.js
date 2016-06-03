/**
 * Created by h205p2 on 5/20/16.
 */

var dataRef = new Firebase('https://browsinghistory.firebaseio.com/');
var d;

var main =function () {

    var ctx= document.getElementById("chromeData").getContext("2d");
    var pieData = {};

    dataRef.on("value", function (snapshot) {

        d = snapshot.val();

        var l = [];
        var dat = [];

        var siteD = d['websites'];
        for (i in siteD) {

            l.push(i.split("_").join("."));

            var time = 0;
            for (j in siteD[i]) {
                time += parseInt(siteD[i][j]);
            }
            dat.push(time);
        }
        pieData = {
            labels: l,
            datasets: [
                {
                    data: dat
                }]
        }
        console.log(pieData);

        new Chart(ctx, {type: "pie", data: pieData});

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

$(document).ready(main);