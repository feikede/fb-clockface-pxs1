import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const hrLabel = document.getElementById("myBpm");
const dateLabel = document.getElementById("myDate");
const dateLabelMonth = document.getElementById("myDateMonth");

const monthNames = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni",
  "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  let tag = util.zeroPad(today.getDate());
  let monat = today.getMonth();
  dateLabel.text = `${tag}`;
  console.log("Monat is: " + monat);
  dateLabelMonth.text = monthNames[monat];
}

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare a even handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  //console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();
