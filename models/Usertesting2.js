const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usertesting2Schema = new Schema({
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
module.exports = Usertesting2 = mongoose.model("usertesting2history", Usertesting2Schema);