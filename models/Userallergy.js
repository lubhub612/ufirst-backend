const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserAllergySchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   allergyname: {
    type: String,
    required: true
  },
  allergytype: {
    type: String,
    required: true
  },
  allergyreason: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userallergy = mongoose.model("userallergyhistory", UserAllergySchema);