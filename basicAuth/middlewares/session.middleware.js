const User = require('../models/User.model')

module.exports.isAuthenticated = (req, res, next) => {
  User.findById(req.session.userId)
  .then( user => {
    
    if (user){
      
      req.currentUser = user
      res.locals.currentUser = user
        next()
    } else {
      console.log('Not autheticated')
      res.render('users/login', {message: 'You must to Authenticated'})
    }
  })
  .catch(error => {
    res.render('/login', {error})
    console.log(error)
  })
}