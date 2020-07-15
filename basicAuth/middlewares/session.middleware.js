const User = require('../models/User.model')

module.exports.isAuthenticated = (req, res, next) => {
  User.findById(req.session.userId)
  .then( user => {
    if (user){
      req.currentUser = user
      
      res.locals.currentUser = user
      console.log(res.locals.currentUser)
        next()
    } else {
      console.log('Not authethicated')
      res.redirect('/login')
    }
  })
  .catch(error => console.log(error))
}