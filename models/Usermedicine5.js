const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usermedicine5Schema = new Schema({
  doctoremail: {
    type: String,
    required: true
  },
  appointmentnumber: {
    type: String,
    required: true
  },
  medicinename: {
    type: String,
    required: true
  },
  medicinetiming: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usermedicine5 = mongoose.model("usermedicine5history", Usermedicine5Schema);