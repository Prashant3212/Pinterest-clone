const mongoose = require('mongoose');
const plm= require("passport-local-mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/pinterest`)
const userData = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    
  },
  password: {
    type: String,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dp: {
    type: String, // URL to display picture
    default: ''
  },
  post: 
    [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
    }]
 }
);
userData.plugin(plm)
module.exports = mongoose.model("user",userData)