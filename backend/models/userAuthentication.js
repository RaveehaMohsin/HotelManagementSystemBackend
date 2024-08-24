const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: false,
    },
    Contact: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique:true
    },
    Username: {
      type: String,
      required: true,
      unique:true
    },
    Password: {
      type: String,
      required: true
    },
    Role:{
      type: String,
      required: true
    }
  });

  const Users = mongoose.model('Users', userAuthSchema, 'Users');
  
  module.exports = Users;