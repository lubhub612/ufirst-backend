const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserAppointmentSchema = new Schema({
  patientemail: {
    type: String,
    required: true
  },
   doctoremail: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  appointmentdate: {
    type: Date,
    required: true
  },
  appointmentstatus: {
    type: String,
    required: true
  },
  appointmentnumber: {
    type: String,
    required: true
  },
  appointmenttype: {
    type: String,
    required: true
  },
  appointmentissue: {
    type: String,
    required: true
  },
  prescriptionhash: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userappointment = mongoose.model("userappointmenthistory", UserAppointmentSchema);