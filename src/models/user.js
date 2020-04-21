const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    tokens:[],
    isAdmin: Boolean
  });
  
  UserSchema.methods.generateAuthToken = function() { 
    console.log('Using key: '+process.env.myprivatekey)
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.myprivatekey);
    return token;
  }
  
  var userModel = mongoose.model('Users',UserSchema)

  module.exports = userModel