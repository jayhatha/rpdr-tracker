"use strict";

require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const request = require("request");
const ejsLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passportConfig");
const isLoggedIn = require("./middleware/isLoggedIn");
const db = require("./models");
const rowdy = require("rowdy-logger");

const app = express();
app.set("view engine", "ejs");

const rowdyResults = rowdy.begin(app);

app.use(express.static(`${__dirname}/static`));
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
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// GET / - main index of site
app.get("/", (req, res) => {
  db.list.findAll({
    include: [db.user]
  })
    .then((lists) => {
      res.render("index", {
        lists });
    });
});

app.get("/season/:id", (req, res) => {
  const rpdrUrl = `http://www.nokeynoshade.party/api/seasons/${req.params.id}/queens`;
  request(rpdrUrl, (error, response, body) => {
    if (response.statusCode === 200) {
      const queens = JSON.parse(body);
      if (req.user) {
        db.user.findById(req.user.id)
          .then((user) => {
            user.getLists().then((lists) => {
              res.render("season", { queens,
                lists });
            });
          });
      } else {
        res.render("season", { queens,
          lists: [] });
      }
    } else {
      res.render("error");
    }
  });
});

app.get("/all", (req, res) => {
  const rpdrUrl = "http://www.nokeynoshade.party/api/queens/all";
  request(rpdrUrl, (error, response, body) => {
    if (response.statusCode === 200) {
      const queens = JSON.parse(body);
      if (req.user) {
        db.user.findById(req.user.id)
          .then((user) => {
            user.getLists().then((lists) => {
              res.render("all", { queens,
                lists });
            });
          });
      } else {
        res.render("all", { queens,
          lists: [] });
      }
    } else {
      res.render("error");
    }
  });
});

// shows videos and events for one queen

app.get("/queens/:id", (req, res) => {
  const rpdrUrl = `http://www.nokeynoshade.party/api/queens/${req.params.id}/`;

  request(rpdrUrl, (error, response, body) => {
    if (response.statusCode === 200) {
      const queen = JSON.parse(body);
      const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queen.name}+rupaul+lipsync&key=${process.env.YOUTUBE_KEY}`;
      const eventUrl = `https://www.eventbriteapi.com/v3/events/search/?q=drag+rupaul+'${queen.name}'&token=${process.env.ALYSSAS_TOKEN}`;
      request(ytUrl, (error, response, body) => {
        const videos = JSON.parse(body);
        request(eventUrl, (error, response, body) => {
          const events = JSON.parse(body);
          res.render("show", { queen,
            videos,
            events: events.events });
        });
      });
    } else {
      res.render("error");
    }
  });
});

app.get("/users/:id", (req, res) => {
  db.user.findById(req.params.id)
    .then((user) => {
      user.getLists().then((lists) => {
        res.render("profile", {
          user,
          lists });
      });
    });
});

app.put("/users/:id", isLoggedIn, (req, res) => {
  db.user.update({
    name: req.body.name,
    bio: req.body.bio,
    fave: req.body.fave
  }, {
    where: { id: req.params.id }
  }).then((data) => {
    res.sendStatus("200").json(data).end();
  });
});

app.use("/auth", require("./controllers/auth"));
app.use("/lists", require("./controllers/lists"));
app.use("/leagues", require("./controllers/leagues"));
app.use("/teams", require("./controllers/teams"));
app.use("/picks", require("./controllers/picks"));

const server = app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print();
});

module.exports = server;
