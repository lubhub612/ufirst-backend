const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usertesting1Schema = new Schema({
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
module.exports = Usertesting1 = mongoose.model("usertesting1history", Usertesting1Schema);