var request = require('supertest');
var app = require('../app');

describe('Requests to /api/user', function() {

  it('returns 403 forbidden if unauthenticated', function(done) {
    request(app)
    .get('/api/user')
    .expect(401, done);
  });
  // it('returns a 200 status code', function(done) {
  //   request(app)
  //   .get('/api/user')
  //   .expect(200)
  //   .end(function(error) {
  //     if (error) throw error;
  //     done();
  //   });
  // });
  // it('returns fake response', function(done) {
  //   request(app)
  //   .get('/api/user')
  //   .expect(200)
  //   .expect('user response', done);
  // });
  // it('responds with json', function(done) {
  //   request(app)
  //   .get('/api/user')
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200, done);
  // });
});
