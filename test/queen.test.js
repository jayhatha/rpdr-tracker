var expect = require('chai').expect;
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Creating a List', function() {
  it('should create successfully', function(done) {
    db.list.create({
      name: 'My Favorite Drag Queens',
    }).then(function(list) {
      list.addUser(1)
    }).then(function() {
      done();
    }).catch(function(error) {
      done(error);
    });
  });
  });

  it('should be associated with a user', function(done) {
    db.list.findById(1)
        .then(function(list) {
          list.getUser().then(function(user) {
          if (!user) throw Error();
          done();
    }).then(function() {
      done();
    }).catch(function(error) {
      done();
    });
  });
});
