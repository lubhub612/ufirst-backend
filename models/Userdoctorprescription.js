const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserDoctorPrescriptionSchema = new Schema({
  doctoremail: {
    type: String,
    required: true
  },
   patientemail: {
    type: String,
    required: true
  },
   appointmentnumber: {
    type: String,
    required: true
  },
  avatarname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  avatarhash: {
    type: String,
    required: true
  },
  uploaddate: {
     type: Date,
    default: Date.now
  }
});
module.exports = Userdoctorprescription = mongoose.model("userdoctorprescriptionhistory", UserDoctorPrescriptionSchema);