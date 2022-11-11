const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserApproveAppointmentSchema = new Schema({
  patientemail: {
    type: String,
    required: true
  },
   doctoremail: {
    type: String,
    required: true
  },
  appointmentnumber: {
    type: String,
    required: true
  },
  appointmentdate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userapproveappointment = mongoose.model("userapproveappointmenthistory", UserApproveAppointmentSchema);