var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

var passwordUtil = require('../util/password-util');

var UserSchema = new Schema({
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

UserSchema.statics.authenticate = function(email, candidatePassword, callback) {
  this.findOne({ email }).select('+password +passwordSalt').exec().then(user => {
    if (!user) {
      return callback(null, user);
    } else {
      passwordUtil.verifyPassword(candidatePassword, user.password, user.passwordSalt, function(err, isMatch) {
        if(err) {
          return callback(err, null);
        }

        if (isMatch === false) {
          return callback(err, null);
        }

        user.password = undefined;
        user.passwordSalt = undefined;
        callback(null, user);
      });
    }
  }).catch(err => callback(err, null));
};

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  passwordUtil.hashNewPassword(user.password, function(err, hashedPassword, newSalt) {
    if (err) return next(err);
    user.password = hashedPassword;
    user.passwordSalt = newSalt;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
