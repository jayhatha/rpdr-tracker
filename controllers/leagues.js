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
  db.team.findAll({
    where: { leagueId: req.params.id },
    include: [db.user]
  }).then(function(teams) {
    if (req.user) {
    db.team.find({
      where: { userId: req.user.id, leagueId: req.params.id }
    }).then(function(team) {
    res.render('leagues/show', {
      userTeam: team,
      teams: teams,
      league: league
    });
  });
} else {
      res.render('leagues/show', {
        teams: teams,
        league: league
      });
    }
  })
});
});

//shows the admin page for the league
router.get('/:id/manage', isLoggedIn, function(req, res) {
  db.league.find({
    where: {
      id: req.params.id
    },
    include: [db.user, db.team]
  }).then(function(team) {
    res.render('leagues/admin', {
      team: team,
    });
  })
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
        userId: req.user.id,
        role: 'admin'
      }).then(function(team) {
              req.flash('success', 'League created!');
              res.redirect('#');
        });
      });
    })



module.exports = router;
