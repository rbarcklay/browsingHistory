/**
 * Created by h205p2 on 5/20/16.
 */
var dataRef = new Firebase('https://browsinghistory.firebaseio.com/');
var d;

var main = function() {
    alert("working");
    dataRef.once("value", function (snapshot) {
        d = snapshot.val();

        var pieData = [];
        var siteD = d['websites'];
        for (i in siteD) {

            var time = 0;
            for (j in siteD[i]) {
                time += parseInt(siteD[i][j]);
            }
            var o = {'sName': i, 'sTime': time}
            pieData.push(o);
        }
        console.log(pieData);
        $('.data').append("hi");

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

$(document).ready(main);




