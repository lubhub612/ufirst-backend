const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usertesting3Schema = new Schema({
  doctoremail: {
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
module.exports = Usertesting3 = mongoose.model("usertesting3history", Usertesting3Schema);