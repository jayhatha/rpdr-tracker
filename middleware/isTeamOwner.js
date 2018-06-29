var db = require('../models');

module.exports = function(req, res, next){
  db.team.findById(req.params.id)
  .then(function(team) {
  if (!req.user || req.user.id != team.userId) {
    req.flash('error', 'You can only manage your own teams.');
    req.session.returnTo = req.path;
    res.redirect('../');
    next();
  } else {
    res.redirect('/manage');
  }
});
}
