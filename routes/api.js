var express = require('express');
var router = express.Router();

var users = require('./users');

router.use('/users', users);

router.get('/', function(req, res, next) {
  res.send('API response');
});

module.exports = router;
