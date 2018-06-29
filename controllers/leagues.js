var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');

// shows ALL the leagues
router.get('/', function(req, res) {
  db.league.findAll()
  .then(function(leagues) {
    res.render('leagues/index', {
      leagues: leagues
    });
    });
});

// shows all the teams in one league
router.get('/:id', function(req, res) {
  db.league.findById(req.params.id)
  .then(function(league) {
  league.getTeams({
    include: [db.user]
  }).then(function(teams) {
    res.render('leagues/teams', {
      teams: teams,
      league: league
    });
    });
});
});

// creates a new league and adds the first team to it
router.post('/', isLoggedIn, function(req, res) {
  console.log(req.body.name);
  db.league.create({
    name: req.body.name,
    description: req.body.description,
    season: req.body.seasonId
  }).then(function(league) {
      league.createTeam({
        name: req.body.teamname,
        description: req.body.teamdesc,
        userId: req.user.id
      }).then(function(team) {
              req.flash('success', 'League created!');
              res.redirect('#');
        });
      });
    })


module.exports = router;
