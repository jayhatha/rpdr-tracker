require('dotenv').config();
var express = require('express');
var bp = require('body-parser');

var request = require('request');

var app = express();

app.use (express.static(__dirname + '/static'));
app.use(bp.urlencoded({ extended: false }));
app.set('view engine', 'pug');

// GET / - main index of site
app.get('/', function(req, res) {
  var rpdrUrl = 'http://www.nokeynoshade.party/api/seasons/8/queens';
  // Use request to call the API
  request(rpdrUrl, function(error, response, body) {
    var queens = JSON.parse(body);
    res.render('index', { queens: queens });
  });
});

app.listen(process.env.PORT || 3000);
