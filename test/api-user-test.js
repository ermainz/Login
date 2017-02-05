var request = require('supertest-as-promised');
var expect = require('chai').expect;

var app = require('../app');
var User = require('../models/user');
var testUtils = require('../test/utils/test-utilities')(app);

describe('Requests to /api/user', function() {

  beforeEach(function(done) {
    var promises = [User.remove().exec()];
    Promise.all(promises).then(() => done());
  });

  it('returns 401 forbidden if unauthenticated', function(done) {
    request(app)
    .get('/api/user')
    .expect(401, done);
  });

  it('returns list of users when authenticated', function(done) {
    var email1 = 'testusertoauth1@example.com';
    var email2 = 'testusertoauth2@example.com';
    var password1 = 'abcd1234';
    var password2 = 'abcd2468';
    var user1 = new User({email: email1, password: password1});
    var user2 = new User({email: email2, password: password2});
    Promise.all([user1.save(), user2.save()])
    .then(() => testUtils.withAuth(email1, password1))
    .then(jwt => {
      request(app)
      .get('/api/user')
      .set('Authorization', 'JWT ' + jwt)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(resp) {
        expect(resp.body.length).to.equal(2);
      }).end(done);
    });
  });

  it('whoami returns current user when authenticated', function(done) {
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
        expect(resp.body).not.to.have.property('password');
      }).end(done);
    });
  });
});
