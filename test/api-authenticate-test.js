var request = require('supertest');
var app = require('../app');

describe('Requests to /api/authenticate', function() {

  it('returns 200 status', function(done) {
    request(app)
    .post('/api/authenticate')
    .send({ email: 'abcd', password: '1234'})
    .set('Content-Type', 'application/json')
    .expect(200, done);
  });
});
