var request = require('supertest');
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
    user.save(function(err) {
      if (err) throw err;

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
    });
  });
});
