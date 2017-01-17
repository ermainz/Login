var passport = require('passport');
var passportJwt = require('passport-jwt');
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var config = require('../config/config');
var User = require('../models/user');
var ObjectId = require('../db/objectid');

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new JwtStrategy(params, function(payload, done) {
    User.findById(payload.id).exec().then(user => {
      if (user) {
        return done(null, {
          id: user.id
        });
      } else {
        return done(new Error('User not found'), null);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', config.jwtSession);
    }
  };
};
