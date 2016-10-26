var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.'});
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      } else {
        var token = jwt.sign(user, req.app.get('superSecret'), {
          expiresIn: '1h'
        });
        res.json({
          success: true,
          message: 'Success!',
          token: token
        })
      }
    }
  });
});

module.exports = router;
