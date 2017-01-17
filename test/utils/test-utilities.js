var request = require('supertest-as-promised');

module.exports = function(app) {
  return {
    withAuth: function(email, password) {
      return request(app)
      .post('/api/authenticate')
      .send({ email, password })
      .set('Content-Type', 'application/json')
      .expect(200)
      .then( authResp => {
        return authResp.body.token;
      });
    }
  };
};
