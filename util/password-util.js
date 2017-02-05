'use strict';

var LEN = 256;
var SALT_LEN = 64;
var ITERATIONS = 10000;
var DIGEST = 'sha256';

var crypto = require('crypto');

function hashPassword(password, salt, callback) {
  var len = LEN / 2;
  crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
    if (err) {
      return callback(err);
    }
    return callback(null, derivedKey.toString('hex'));
  });
}

function hashNewPassword(password, callback) {
  crypto.randomBytes(SALT_LEN / 2, function(err, newSalt) {
    if (err) {
      return callback(err);
    }

    var salt = newSalt.toString('hex');

    hashPassword(password, salt, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }
      callback(null, hashedPassword, salt);
    });
  });
}

function verifyPassword(candidatePassword, userPassword, userSalt, callback) {
  hashPassword(candidatePassword, userSalt, (err, hashedCandidatePassword, newSalt)  => {
    if (err) {
      callback(err, null);
    } else {
      var result = hashedCandidatePassword === userPassword;
      callback(null, result);
    }
  });
}

module.exports = {
  verifyPassword: verifyPassword,
  hashNewPassword: hashNewPassword
};
