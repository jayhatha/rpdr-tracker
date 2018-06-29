var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var isTeamOwner = require('../middleware/isTeamOwner');

// shows one team
router.get('/:id', function(req, res) {
  db.team.find({
    where: { id: req.params.id },
    include: [db.user]
  })
  .then(function(team) {
    res.render('teams/show', {
      team: team
    });
    });
});

router.get('/:id/manage', isTeamOwner, function(req, res) {
  db.team.find({
    where: { id: req.params.id },
    include: [db.user]
  })
  .then(function(team) {
    res.render('teams/show', {
      team: team
    });
    });
});


module.exports = router;
