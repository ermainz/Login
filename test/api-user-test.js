var request = require('supertest-as-promised');
var expect = require('chai').expect;

var app = require('../app');
var User = require('../models/user');
var testUtils = require('../test/utils/test-utilities')(app);

describe('Requests to /api/user', function() {

  it('returns 401 forbidden if unauthenticated', function(done) {
    request(app)
    .get('/api/user')
    .expect(401, done);
  });

  it('returns list of users when authenticated', function(done) {
    var email = 'testusertoauth@example.com';
    var password = 'abcd1234';
    var user = new User({email, password});
    user.save()
    .then(() => testUtils.withAuth(email, password))
    .then(jwt => {
      request(app)
      .get('/api/user')
      .set('Authorization', 'JWT ' + jwt)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(resp) {
        expect(resp.body.length).to.equal(3);
      }).end(done);
    });
  });

  it('returns current user when authenticated', function(done) {
    var email = 'testwhoamiuser@example.com';
    var password = 'qwerty';
    var user = new User({ email, password });
    user.save()
    .then(() => testUtils.withAuth(email, password))
    .then(jwt => {
      request(app)
      .get('/api/user/whoami')
      .set('Authorization', 'JWT ' + jwt)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(resp) {
        expect(resp.body.email).to.equal(email);
        expect(resp.body.password).to.equal(password);
      }).end(done);
    });
  });
});
