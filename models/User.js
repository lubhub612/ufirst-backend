const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  useremail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpharse: {
    type: String,
    required: true
  },
  usercity: {
    type: String,
    required: true
  },
  userstates: {
    type: String,
    required: true
  },
  usercountry: {
    type: String,
    required: true
  },
  useraddress1: {
    type: String,
    required: true
  },
  useraddress2: {
    type: String,
    required: true
  },
  usersmoker: {
    type: String,
    required: true
  },
  useralcholic: {
    type: String,
    required: true
  },
  userdob: {
    type: Date,
    required: true
  },
  userage: {
    type: String,
    required: true
  },
  usergender: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userrole:{
   type: String,
    required: true
  },
  userbloodgroup:{
   type: String,
    required: true
  },
  userphoneno:{
   type: String,
    required: true
  },
  userpincode:{
   type: String,
    required: true
  },
  usermedino:{
   type: String,
    required: true
  },
  token:{
   type: String,
   required: true
  },
  userstatus:{
   type: String,
   required: true
  }
  
});
module.exports = User = mongoose.model("users", UserSchema);