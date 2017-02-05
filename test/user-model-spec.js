var expect = require('chai').expect;

var User = require('../models/user');

describe('User model', function() {

  it('should not include password in find by default', function(done) {
    var email = 'testemail@example.com';
    var password = 'correct-password';
    var user = new User({email, password});
    user.save().then(() => {
      User.findOne({ email }).exec().then(user => {
          expect(user.email).to.equal(email);
          expect(user.password).to.equal(undefined);
      }).then(() => {
        User.findOne({ email }).select('+password').exec().then(user => {
          expect(user.email).to.equal(email);
          expect(user.password).not.to.equal(password);
          done();
        });
      });
    });
  });
});
