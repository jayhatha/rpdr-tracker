# DRAG RACE DATABASE

[![Build Status](https://travis-ci.org/jayhatha/rpdr-tracker.svg?branch=master)](https://travis-ci.org/jayhatha/rpdr-tracker)

As a huge fan of *RuPaul's Drag Race*, and with Season 10 finishing up during project week, I thought this would be a perfect time to build the missing app for Drag Race fans.

I didn't quite get all the way there in a week, but this was the vision:

* You'd be able to make and share lists of your favorite queens. Or your least favorite. Or your dream season of *RuPaul's Drag Race All-Stars*. Or just Violet Chachki 30 times. Whatever you want!

* You'd be able to see any queen's upcoming live appearances using the EventBrite API, and YouTube videos of their performances.

I accomplished those goals, but there was one more thing I wanted to—and it turned out to be 5 to 10 times harder than the rest of the project combined.

* You'd be able to join a Drag Race fantasy league (I swear this is a real thing!) with your friends or coworkers or strangers from the internet.

Breaking that down a little further:
    * You'd be able to create and name your team, and pick which queens you think will do best on each week of the show.
    * Whoever started the league would be able to enter information about the week's performances (who won, who lost, who lipsynced for their life) and click a button to score everyone's picks accordingly.
    * Each player would be able to see a table showing how their picks performed.
    * Each league would have a leaderboard showing the current standings.
    * There would also be an overall leaderboard, letting you compare your picks to the top point-getters in ALL leagues.

I have not yet accomplished these goals, but I'm well on my way. More on that below!

**TECHNOLOGIES USED**

Front-End: HTML/EJS, CSS, JS, jQuery, Materialize
Back-End: Node, Express, Postgres, Sequelize, bcrypt
Testing: Mocha/Chai
CI: Travis
Hosting: Heroku

After doing all my styling and responsiveness from scratch on the previous project, I decided to use Materialize for this one, both because I wanted to get more experience with it and because it offered a whole bunch of components I wanted for the site, including a nav bar and modals.


**BACK-END**

Drag Race Database relies on the unofficial RuPaul's Drag Race API, No Key, No Shade (nokeynoshade.party) for info about each season and queen. It gets event data from Eventbrite and videos from YouTube.

Here's an ER diagram showing what's going on with the back end of this thing, including the tables for the yet-to-be-finished fantasy league features:

![erd](/screengrabs/dragraceerd.png)


And here's a list of all routes the app uses:

(╯°□°）╯︵ ┻━┻
┌────────┬─────────────────────────┐
│ Method │ Path                    │
├────────┼─────────────────────────┤
│ GET    │ /                       │
├────────┼─────────────────────────┤
│ GET    │ /season/:id             │
├────────┼─────────────────────────┤
│ GET    │ /all                    │
├────────┼─────────────────────────┤
│ GET    │ /queens/:id             │
├────────┼─────────────────────────┤
│ GET    │ /users/:id              │
├────────┼─────────────────────────┤
│ PUT    │ /users/:id              │
├────────┼─────────────────────────┤
│ GET    │ /auth/signup            │
├────────┼─────────────────────────┤
│ GET    │ /auth/login             │
├────────┼─────────────────────────┤
│ POST   │ /auth/signup            │
├────────┼─────────────────────────┤
│ POST   │ /auth/login             │
├────────┼─────────────────────────┤
│ GET    │ /auth/logout            │
├────────┼─────────────────────────┤
│ GET    │ /lists                  │
├────────┼─────────────────────────┤
│ GET    │ /lists/:id              │
├────────┼─────────────────────────┤
│ PUT    │ /lists/:index           │
├────────┼─────────────────────────┤
│ POST   │ /lists                  │
├────────┼─────────────────────────┤
│ POST   │ /lists/:id              │
├────────┼─────────────────────────┤
│ DELETE │ /lists/:listId/:queenId │
├────────┼─────────────────────────┤
│ DELETE │ /lists/:listId          │
├────────┼─────────────────────────┤
│ GET    │ /leagues                │
├────────┼─────────────────────────┤
│ GET    │ /leagues/:id            │
├────────┼─────────────────────────┤
│ GET    │ /leagues/:id/manage     │
├────────┼─────────────────────────┤
│ POST   │ /leagues                │
├────────┼─────────────────────────┤
│ GET    │ /teams/:id              │
├────────┼─────────────────────────┤
│ GET    │ /teams/:id/manage       │
├────────┼─────────────────────────┤
│ POST   │ /picks/:id              │
└────────┴─────────────────────────┘

**ABOUT THAT FANTASY LEAGUE STUFF**

I did manage to build about half of the features I'll eventually need for the fantasy league, including creating all the necessary tables. I added the ability to create a league and a team, and to make picks.

Still to do:

   * A UI refresh — there was only so much I could while building a full-stack app in a week.
   * let admins enter the data for each week's performances, and score the league's picks accordingly
   * let users join public leagues, or request approval to join private ones
   * let admins approve or deny requests to join
