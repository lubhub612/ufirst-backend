const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserPrescriptionSchema = new Schema({
  patientemail: {
    type: String,
    required: true
  },
  avatarname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  avatarhash: {
    type: String,
    required: true
  },
  uploaddate: {
     type: Date,
    default: Date.now
  }
});
module.exports = Userprescription = mongoose.model("userprescriptionhistory", UserPrescriptionSchema);