var express = require('express');
var router = express.Router();
var debug = require('debug')('login:server');

var jwt = require('jsonwebtoken');
var User = require('../models/user');

const authFailedMessage = 'Authentication failed.';
const authSuccessMessage = 'Success!';

router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var newUser = new User({
    email, password
  });

  newUser.save(function(err) {
    if (err) throw err;
    debug("User successfully registered");
    res.json({ success: true });
  });

});

router.post('/', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: authFailedMessage});
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: authFailedMessage});
      } else {
        var token = jwt.sign(user, req.app.get('superSecret'), {
          expiresIn: '1h'
        });
        res.json({
          success: true,
          message: authSuccessMessage,
          token: token
        })
      }
    }
  });
});

module.exports = router;
