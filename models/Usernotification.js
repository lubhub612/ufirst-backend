const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserNotificationSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   usernotification: {
    type: String,
    required: true
  },
  usernotificationlink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usernotification = mongoose.model("usernotificationhistory", UserNotificationSchema);