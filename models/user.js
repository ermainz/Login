var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  email: String,
  password: String
}));
