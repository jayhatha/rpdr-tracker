var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');

// shows all the current user's lists
  router.get('/', isLoggedIn, function(req, res) {
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
// shows a single list
router.get('/:id', isLoggedIn, function(req, res) {
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

// updates the name and description of a list
router.put('/:index', function(req, res) {
    db.list.update({
      name: req.body.name,
      description: req.body.description
    }, {
      where: {id: req.params.index}
    }).then(function(data) {
      res.sendStatus('200').end();
  })
});

// creates a list

router.post('/', isLoggedIn, function(req, res) {
  db.list.create({
    name: req.body.name,
    description: 'my fave queens',
    userId: req.user.id
  })
    .then(function(list) {
          req.flash('success', 'List created!');
          res.redirect('#');
        });
});

//adds a queen to a list

router.post('/:id', isLoggedIn, function(req, res) {
  db.list.findById(req.params.id)
  .then(function(list) {
      db.queen.findOrCreate({
        where: { name: req.body.queenId }
      }).spread(function(queen, created) {
        list.addQueen(queen).then(function(data) {
          req.flash('success', 'Added to list!');;
          res.redirect('/lists/' + req.params.id);
        });
      });
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
});

// deletes a queen from a list
router.delete('/:listId/:queenId', function(req, res) {
    db.queensLists.destroy({
      where: {queenId: req.params.queenId, listId: req.params.listId  }
    })
    .then(function(data) {
      res.sendStatus(200);
  });
});


module.exports = router;
