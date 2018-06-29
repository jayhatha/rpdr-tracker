require('dotenv').config();
var express = require('express');
var bp = require('body-parser');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passportConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require('./models');

var app = express();
app.set('view engine', 'ejs');

app.use (express.static(__dirname + '/static'));
app.use(bp.urlencoded({ extended: false }));
app.use(ejsLayouts);

// this needs to come before you app.use passport!
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// attaches current user to res for all routes, also attaches flash messages
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// GET / - main index of site
app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/season/:id', function(req, res) {
    var rpdrUrl = 'http://www.nokeynoshade.party/api/seasons/' + req.params.id+ '/queens';
    request(rpdrUrl, function(error, response, body) {
      if (response.statusCode == 200){
      var queens = JSON.parse(body);
      if (req.user) {
        db.user.findById(req.user.id)
        .then(function(user) {
        console.log('user found');
        user.getLists().then(function(lists) {
          res.render('season', { queens: queens, lists: lists });
        })
    })

      } else {
        console.log('no user found, showing season queens');
        res.render('season', { queens: queens, lists: []});
      }
    } else
      res.render('error');
    })
  });

  app.get('/all', function(req, res) {
    var rpdrUrl = 'http://www.nokeynoshade.party/api/queens/all';
    request(rpdrUrl, function(error, response, body) {
      if (response.statusCode == 200){
      var queens = JSON.parse(body);
      if (req.user) {
        db.user.findById(req.user.id)
        .then(function(user) {
        console.log('user found');
        user.getLists().then(function(lists) {
          res.render('all', { queens: queens, lists: lists });
        })
    })

      } else {
        console.log('no user found, showing season queens');
        res.render('season', { queens: queens, lists: []});
      } } else
        res.render('error');
    })
  });

  // shows videos and events for one queen

app.get('/queens/:id', function(req, res) {
  var rpdrUrl = "http://www.nokeynoshade.party/api/queens/" + req.params.id + "/";


  request(rpdrUrl, function(error, response, body) {
    if (response.statusCode == 200){
      var queen = JSON.parse(body);
      console.log("my queen is " + queen.name);
      var ytUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + queen.name + "+rupaul+lipsync&key=" + process.env.YOUTUBE_KEY;
      var eventUrl = "https://www.eventbriteapi.com/v3/events/search/?q=drag+rupaul+'" + queen.name + "'&token=" + process.env.ALYSSAS_TOKEN;
        request(ytUrl, function(error, response, body) {
            var videos = JSON.parse(body);
              request(eventUrl, function(error, response, body) {
              var events = JSON.parse(body);
              console.log(videos.items[0].id.videoId);
              res.render('show', { queen: queen, videos: videos, events: events.events });
                });
          });
        } else
          res.render('error');
        });
});





app.use('/auth', require('./controllers/auth'));
app.use('/lists', require('./controllers/lists'));
app.use('/leagues', require('./controllers/leagues'));
app.use('/teams', require('./controllers/teams'));

var server = app.listen(process.env.PORT || 3000);

  module.exports = server;
