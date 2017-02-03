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
  var {email, password} = req.body;
  if (!email || !password) {
    res.json({ success: false, message: 'Must provide email and password.' });
  } else {
    User.findOne({ email }).select('+password +passwordSalt').exec().then(user => {
      if (!user) {
        res.json({ success: false, message: authFailedMessage });
      } else {
        if (password != user.password) {
          res.json({ success: false, message: authFailedMessage });
        } else {
          var payload = {
            id: user.id
          };
          var token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: '1h'
          });
          res.json({
            success: true,
            message: authSuccessMessage,
            token: token
          });
        }
      }
    }).catch(err => {
      throw err;
    });
  }
});

module.exports = router;
