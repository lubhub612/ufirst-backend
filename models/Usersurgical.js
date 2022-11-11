const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserSurgicalSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   surgeryplace: {
    type: String,
    required: true
  },
  surgerytype: {
    type: String,
    required: true
  },
  surgerydate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usersurgical = mongoose.model("usersurgicalhistory", UserSurgicalSchema);