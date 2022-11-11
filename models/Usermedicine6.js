const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Usermedicine6Schema = new Schema({
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
module.exports = Usermedicine6 = mongoose.model("usermedicine6history", Usermedicine6Schema);