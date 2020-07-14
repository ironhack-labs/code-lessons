const express = require('express');
const router = express.Router();
const User = require('../../models/User.model');
const { json } = require('express');

/* GET signup page */
router.get('/', (req, res) => {
  res.render('users/signup');
});
router.post('/', (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user
    .save()
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err);
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
