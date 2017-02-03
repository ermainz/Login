var express = require('express');
var router = express.Router();
var cors = require('cors');

var jwt = require('jsonwebtoken');

var user = require('./user');
var authenticate = require('./authenticate');
var authenticationService = require('../services/authentication-service')();

router.use(cors());

router.use(authenticationService.initialize());

// unauthenticated routes
router.get('/', function(req, res, next) {
  res.json({ message: 'Login API Response'})
});
router.use('/authenticate', authenticate);

router.use('/unauth-user', user);

router.use(authenticationService.authenticate());

router.use('/user', user);

module.exports = router;
