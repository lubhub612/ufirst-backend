const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usermedicine1Schema = new Schema({
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
module.exports = Usermedicine1 = mongoose.model("usermedicine1history", Usermedicine1Schema);