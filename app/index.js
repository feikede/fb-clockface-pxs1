'use strict';

// Rainer Feike - Clockface 1 - based on fitbit examples

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clock = _interopDefault(require('clock'));
var document = _interopDefault(require('document'));
var userSettings = require('user-settings');
var heartRate = require('heart-rate');

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

clock.granularity = "minutes";
var myLabel = document.getElementById("myLabel");
var hrLabel = document.getElementById("myBpm");
var dateLabel = document.getElementById("myDate");
clock.ontick = function (evt) {
    var today = evt.date;
    var hours = today.getHours();
    if (userSettings.preferences.clockDisplay === "12h") {
        hours = hours % 12 || 12;
    }
    else {
        hours = zeroPad(hours);
    }
    var mins = zeroPad(today.getMinutes());
    myLabel.text = hours + ":" + mins;
    var tag = zeroPad(today.getDate());
    var monat = zeroPad(today.getMonth() + 1);
    dateLabel.text = tag + "." + monat;
};
var hrm = new heartRate.HeartRateSensor();
hrm.onreading = function () {
    hrLabel.text = hrm.heartRate + " bpm";
};
hrm.start();
