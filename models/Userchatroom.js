const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserChatroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: { 
   type : Array,  
  default : []
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Userchatroom = mongoose.model("userchatroomhistory", UserChatroomSchema);