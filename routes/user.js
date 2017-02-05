var express = require('express');
var router = express.Router();

var debug = require('debug')('login:server');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/whoami', function(req, res, next) {
  User.findById(req.user.id).exec().then(user => {
    res.json(user);
  }).catch(err => {
    debug('Error finding user', e);
    res.status(500).json({ msg: 'Error finding user'});
  });
});

module.exports = router;
