const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserDoctorSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   doctorname: {
    type: String,
    required: true
  },
   doctorcollage: {
    type: String,
    required: true
  },
  doctoroffice: {
    type: String,
    required: true
  },
  doctorspeciality: {
    type: String,
    required: true
  },
  doctorotherspeciality: {
    type: String,
    required: true
  },
  doctorpersonal: {
    type: String,
    required: true
  },
  doctoravaliabity: {
    type: String,
    required: true
  },
  doctortiming: {
    type: String,
    required: true
  },
  doctorfees: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userdoctor = mongoose.model("userdoctordetails", UserDoctorSchema);