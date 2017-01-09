var passport = require('passport');
var passportJwt = require('passport-jwt');
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var config = require('../config/config');

var config = require('../config/config');

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new JwtStrategy(params, function(payload, done) {
    var user = User.findOne({
      id: payload.id
    }, function(err, user) {
      if (err) throw err;
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
