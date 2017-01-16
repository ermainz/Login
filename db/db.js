var mongoose = require('../db/mongoose');
var config = require('../config/config');

function connectToMongo() {
  if (process.env.ENV === 'development') {
    mongoose.connect(config.database.dev);
  } else if (process.env.ENV === 'test') {
    mongoose.connect(config.database.test);
  } else {
    throw new Exception('ENV set to production. No mongodb configured for production');
  }
}

module.exports = {
  connect: function() {
    connectToMongo();
  }
};
