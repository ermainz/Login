var express = require('express');
var router = express.Router();

var user = require('./user');

router.use('/user', user);

router.get('/', function(req, res, next) {
  res.send('API response');
});

module.exports = router;
