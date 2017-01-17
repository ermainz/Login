var request = require('supertest-as-promised');
var expect = require('chai').expect;

var app = require('../app');
var User = require('../models/user');

describe('Requests to /api/authenticate', function() {

  it('returns 200 status with success false for unknown user', function(done) {
    request(app)
    .post('/api/authenticate')
    .send({ email: 'somerandomemail234097234@example.com', password: '1234'})
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect(function(resp) {
      var body = resp.body;
      expect(body.success).to.equal(false);
    }).end(done);
  });

  it('returns 200 status with success true for known user', function(done) {
    var email = 'testemail@example.com';
    var password = 'abcd1234';
    var user = new User({email, password});
    user.save().then(() => {
      request(app)
      .post('/api/authenticate')
      .send({ email, password })
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(function(resp) {
        var body = resp.body;
        expect(body.success).to.equal(true);
        expect(body).to.have.property('token');
      }).end(done);
    }).catch(done);
  });

  it('returns 200 status with success true when registering new user', function(done) {
    var email = 'anothertestemail@example.com';
    var password = 'abcd1234';

    User.findOne({ email }).exec().then(user => {
      expect(user).to.equal(null);
      request(app)
      .post('/api/authenticate/register')
      .send({ email, password })
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(resp => {
        var body = resp.body;
        expect(body.success).to.equal(true);
      })
      .end(() => {
        User.findOne({ email }).exec().then(user => {
          expect(user).to.have.property('email');
          expect(user).to.have.property('password');
          expect(user.email).to.equal(email);
        }).then(done).catch(done);
      });
    }).catch(done);
  });
});
