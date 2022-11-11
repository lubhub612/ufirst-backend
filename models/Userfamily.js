const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserFamilySchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
   familymembername: {
    type: String,
    required: true
  },
  familymemberrelationship: {
    type: String,
    required: true
  },
  familymemberdiease: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userfamily = mongoose.model("userfamilyhistory", UserFamilySchema);