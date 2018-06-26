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
      console.log('error:', error); // Print the error if one occurred
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
        console.log('no user found');
        res.render('season', { queens: queens, lists: []});
      }
    })
  });

app.get('/queens/:name', function(req, res) {
  var eventUrl = "https://www.eventbriteapi.com/v3/events/search/?q=drag+rupaul+'" + req.params.name + "'&token=" + process.env.ALYSSAS_TOKEN;
  request(eventUrl, function(error, response, body) {
    var events = JSON.parse(body);
    res.render('show', { events: events.events, queen: req.params.name });
  });
  });

  app.get('/lists', isLoggedIn, function(req, res) {
    console.log(req.user.id);
    db.user.findById(req.user.id)
    .then(function(user) {
    user.getLists().then(function(lists) {
      res.render('user', {
        user: req.user,
        lists: lists
      });
      });
});
});

app.get('/lists/:id', isLoggedIn, function(req, res) {
  db.list.findById(req.params.id)
  .then(function(list) {
  list.getQueens().then(function(queens) {
    res.render('list', {
      user: req.user,
      queens: queens,
      list: list
    });
    });
});
});

app.put('/lists/:index/', function(req, res) {
    db.list.update({
      name: req.body.name,
    }, {
      where: {id: req.params.index}
    }).then(function(data) {
      res.sendStatus('200').end();
  })
});

app.post('/lists/', isLoggedIn, function(req, res) {
  db.list.create({
    name: req.body.name,
    userId: req.user.id,
  })
    .then(function(list) {
          req.flash('success', 'List created!');
          res.redirect('#');
        });
});

//adding a queen to a list

app.post('/lists/:id', isLoggedIn, function(req, res) {
  db.list.findById(req.params.id)
  .then(function(list) {
      db.queen.findOrCreate({
        where: { name: req.body.queenId }
      }).spread(function(queen, created) {
        // project.addCategory(category) :)
        list.addQueen(queen).then(function(data) {
          req.flash('success', 'Added to list!');;
          res.redirect('/lists/:id');
        });
      });
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
});

app.delete('/lists/:listId/:queenId', function(req, res) {
    console.log('queenId is ' + req.params.queenId + '  listId is' + req.params.listId)
    db.queensLists.destroy({
      where: {queenId: req.params.queenId, listId: req.params.listId  }
    })
    .then(function(data) {
      res.sendStatus(200);
  });
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

  module.exports = server;
