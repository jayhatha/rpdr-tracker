module.exports = function(req, res, next){
  if (!req.user) {
    console.log('no user found, must be logged in to go there')
    req.flash('error', 'You must be logged in to access that page.');
    req.session.returnTo = req.path;
    res.redirect('/auth/login');
    next();
  } else {
    next();
  }
}
