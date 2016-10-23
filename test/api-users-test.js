var request = require('supertest');
var app = require('../app');

describe('Requests to /api/users', function() {
  it('returns a 200 status code', function(done) {
    request(app)
    .get('/api/users')
    .expect(200)
    .end(function(error) {
      if (error) throw error;
      done();
    });
  });
  it('returns fake response', function(done) {
    request(app)
    .get('/api/users')
    .expect(200)
    .expect('users response', done);
  });
  // it('responds with json', function(done) {
  //   request(app)
  //   .get('/api/user')
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200, done);
  // });
});
