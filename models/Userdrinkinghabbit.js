const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserDrinkinghabbitSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   drinkinghabbit: {
    type: String,
    required: true
  },
  drinkinghabbitstart: {
    type: Date,
    required: true
  },
  drinkinghabbitend: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userdrinkinghabbit = mongoose.model("userdrikinghistory", UserDrinkinghabbitSchema);