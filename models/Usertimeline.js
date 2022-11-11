const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserTimelineSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   useractivity: {
    type: String,
    required: true
  },
  useractivitylink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usertimeline = mongoose.model("usertimelinehistory", UserTimelineSchema);