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

function hashNewPassword(password, callback) {
  return generateNewSalt().then(salt => {
    return hashPassword(password, salt).then(hashedPassword => {
      return { hashedPassword, salt };
    });
  }).then( saltAndHash => {
    var { hashedPassword, salt } = saltAndHash;
    callback(null, hashedPassword, salt);
  }).catch(err => {
    callback(err);
  });
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
