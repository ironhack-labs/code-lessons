const User = require('../models/User.model')
const mongoose = require('mongoose')


// ------ GET ------- //
// INDEX
module.exports.index = (req, res, next) => {
  res.render('index', { title: 'App created with Ironhack generator 🚀' })
}
//SIGNUP
module.exports.signup = (req, res, next) => {
  res.render('users/signup')
}
// LOGIN 
module.exports.login = (req, res, next ) => {
  res.render('users/login');
}
// MAIN 
module.exports.main = (req, res, next ) => {
  res.render('users/main');
}
// PRIVATE 
module.exports.private = (req, res, next ) => {
  res.render('users/private' );
}

// ------ POST ------- //
//SIGNUP
module.exports.doSignup = (req, res, next) => {
  const user = new User (req.body)
  user.save()
    .then((user) => res.render('users/login', { message: 'Please, login to see private'}))
    .catch(next)
}


//LOGIN
module.exports.doLogin =(req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        user.checkPassword(req.body.password)
        .then(match => {
          if (match) {
            console.log(user, match)
            req.session.userId = user._id
            res.redirect('/main')
          } else {
            res.render('users/login', { message: 'Email or password incorrect' })
          }
        });
      } else {
        res.render('users/login', { message: 'Email or password incorrect' })
      } 
    })
    .catch(err => {
      console.log(err)
      
    });
}
