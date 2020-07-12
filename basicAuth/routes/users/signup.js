const express = require('express');
const router = express.Router();
const User = require('../../models/User.model')

/* GET signup page */
router.get('/', (req, res) => {
  res.render('users/signup')
  
 });
router.post('/', (req, res) => {
   const user = new User(req.body)
   user.save()
   .then(res.redirect('/'))
   .catch((err) => {
     res.render("users/signup", { error: err.errors, user})
   })
  
 

});

module.exports = router;