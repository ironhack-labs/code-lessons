const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');

router.get('/signup', (req, res, next) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  // console.log('The form data: ', req.body); //<== Identifies which variables we need
  const { username, email, password } = req.body;

  const salt = bcryptjs.genSaltSync(saltRounds);

  const hashedPassword = bcryptjs.hashSync(password, salt);
  console.log(`Password hash: ${hashedPassword}`);

  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory.  Please provide your username, email, and password.' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 characters and must contain at least one number, one lowercasse, and one uppercase letter.' });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', { errorMessage: 'Username and email need to be unique.  Either username or email already exists.' });
      } else {
        next(error);
      }
    });
});

router.get('/userProfile', (req, res, next) => res.render('users/user-profile'));

module.exports = router;
