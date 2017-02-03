var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: false // TODO change to true
  },
  password: {
    type: String,
    required: false, // TODO change to true
    select: false
  },
  passwordSalt: {
    type: String,
    required: false, // TODO change to true
    select: false
  }
});

module.exports = mongoose.model('User', userSchema);
