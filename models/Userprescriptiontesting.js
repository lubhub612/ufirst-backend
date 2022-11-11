const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserprescriptiontestingSchema = new Schema({
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
  testingname: {
    type: String,
    required: true
  },
  testingtiming: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usertestingpresciption = mongoose.model("usertestingprescriptionhistory", UserprescriptiontestingSchema);