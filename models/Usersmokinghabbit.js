const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserSmokinghabbitSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   smokinghabbit: {
    type: String,
    required: true
  },
  smokinghabbitstart: {
    type: Date,
    required: true
  },
  smokinghabbitend: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Usersmokinghabbit = mongoose.model("usersmokinghistory", UserSmokinghabbitSchema);