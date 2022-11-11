const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserprescriptionmedicineSchema = new Schema({
  doctoremail: {
    type: String,
    required: true
  },
   patientemail: {
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
module.exports = Usermedicinepresciption = mongoose.model("usermedicineprescriptionhistory", UserprescriptionmedicineSchema);