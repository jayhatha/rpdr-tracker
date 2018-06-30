var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var isTeamOwner = require('../middleware/isTeamOwner');
var request = require('request');

// shows one team
router.get('/:id', function(req, res) {
  db.team.find({
      where: {
        id: req.params.id
      },
      include: [db.user]
    })
    .then(function(team) {
      res.render('teams/show', {
        team: team
      });
    });
});

router.get('/:id/manage', isLoggedIn, function(req, res) {
  db.team.find({
    where: {
      id: req.params.id
    },
    include: [db.user, db.league]
  }).then(function(team) {
    request('http://www.nokeynoshade.party/api/seasons/' + team.league.season + '/queens', function(error, response, body) {
    var queens = JSON.parse(body);
    res.render('teams/manage', {
      team: team,
      queens: queens
    });
  })
})
})

module.exports = router;
