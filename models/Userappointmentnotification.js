const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserAppointmentNotificationSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   userappointmentnotification: {
    type: String,
    required: true
  },
  userappointmenttoken: {
    type: String,
    required: true
  },
  userappointmentnotificationlink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userappointmentnotification = mongoose.model("userappointmentnotificationhistory", UserAppointmentNotificationSchema);