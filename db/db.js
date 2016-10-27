var mongoose = require('mongoose');
var config = require('../config/config');

function connectToMongo() {
  if (process.env.ENV === 'development') {
    mongoose.connect(config.database.dev);
  } else {
    throw new Exception('ENV set to production. No mongodb configured for production');
  }
}

module.exports = {
  connect: function() {
    connectToMongo();
  }
};
