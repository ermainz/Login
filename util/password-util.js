'use strict';

var LEN = 256;
var SALT_LEN = 64;
var ITERATIONS = 10000;
var DIGEST = 'sha256';

var crypto = require('crypto');

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    var len = LEN / 2;
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'));
      }
    });
  });
}

function generateNewSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LEN / 2, function(err, newSalt) {
      if (err) {
        reject(err);
      } else {
        var salt = newSalt.toString('hex');
        resolve(salt);
      }
    });
  });
};

function hashNewPassword(password) {
  return generateNewSalt().then(newSalt => {
    return hashPassword(password, newSalt).then(hashedPassword => {
      return { hashedPassword, newSalt };
    })
  })
}

function verifyPassword(candidatePassword, userPassword, userSalt, callback) {
  hashPassword(candidatePassword, userSalt).then(hashedCandidatePassword => {
    var result = hashedCandidatePassword === userPassword;
    callback(null, result);
  }).catch(err => {
    callback(err, null);
  });
}

module.exports = {
  verifyPassword: verifyPassword,
  hashNewPassword: hashNewPassword
};
