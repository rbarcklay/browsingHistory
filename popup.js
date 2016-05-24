/**
 * Created by h205p2 on 5/20/16.
 */
var dataRef = new Firebase('https://browsinghistory.firebaseio.com/');
var d = {};

var main = function () {
    dataRef.on("value", function (snapshot) {
        d = snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $('.data').append("hi");

}

$(document).ready(main);
