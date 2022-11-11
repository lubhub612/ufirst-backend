const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserVaccineSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   vaccinename: {
    type: String,
    required: true
  },
  vaccinetype: {
    type: String,
    required: true
  },
  vaccinedate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Uservaccine = mongoose.model("uservaccinehistory", UserVaccineSchema);