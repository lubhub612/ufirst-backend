const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usertesting6Schema = new Schema({
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
module.exports = Usertesting6 = mongoose.model("usertesting6history", Usertesting6Schema);