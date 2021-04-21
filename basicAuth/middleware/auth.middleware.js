// Auth middleware function
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    // If request has a cookie with session id, allow access - next ()
    next();
  }
  else {
    // Otherwise, redirect to login
    res.redirect('/login');
  }
};

module.exports = {
  isLoggedIn
};
