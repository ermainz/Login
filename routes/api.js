var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var user = require('./user');
var authenticate = require('./authenticate');

// unauthenticated routes
router.get('/', function(req, res, next) {
  res.send('API Response');
});
router.use('/authenticate', authenticate);

router.use('/unauth-user', user);

// authenticated routes
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

router.use('/user', user);

module.exports = router;
