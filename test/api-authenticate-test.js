var request = require('supertest');
var expect = require('chai').expect;

var app = require('../app');

describe('Requests to /api/authenticate', function() {

  it('returns 200 status', function(done) {
    request(app)
    .post('/api/authenticate')
    .send({ email: 'abcd', password: '1234'})
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect(function(resp) {
      var body = resp.body;
      expect(body).to.have.property('success');
      // TODO these lines should pass
      // expect(body).to.have.property('token');
      // expect(body.success).to.equal(true);
    }).end(done);
  });
});
