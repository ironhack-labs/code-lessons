const express = require('express');
const router = express.Router();
const User = require('../../models/User.model');

/* GET signup page */
router.get('/', (req, res) => {
  res.render('users/login');
});
router.post('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        user.checkPassword(req.body.password).then(match => {
          if (match) {
            req.session.userId = user._id;
            res.redirect('/private');
          } else {
            res.redirect('/main');
          }
        });
      } 
    })
    .catch(err => {
      console.log(err)
      res.render('users/signup', {
        error: {
          username: {
            message: 'user not found'
          }
        }
      });
    });
});

module.exports = router;
