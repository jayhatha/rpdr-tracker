var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var isTeamOwner = require('../middleware/isTeamOwner');

// /picks/:id - creates a pick for a team for the selected week, so we can add queens to it

router.get('/', function (req, res) {
  res.render('picks');
});

router.post('/:id', isLoggedIn, function (req, res) {
  db.team.findById(req.params.id)
    .then(function (team) {
      db.pick.findOrCreate({
        where: { weekId: req.body.week, queenId: req.body.queen }
      }).spread(function (pick, created) {
        team.addPick(pick).then(function (data) {
          res.redirect('/teams/' + req.params.id + '/manage');
        });
      });
    }).catch(function (error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
