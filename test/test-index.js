// var expect = require('chai').expect;
// var chai = require('chai');
// var should = chai.should();
// var db = require('../models');
// var chaiHttp = require('chai-http');
// var server = require('../index');
// var supertest = require('supertest');
// var api = supertest('http://localhost:3000');
//
// chai.use(chaiHttp);
//
// describe('queens', function () {
//   it('should list ALL queens on /all', function (done) {
//     chai.request(server)
//       .get('/all')
//       .end(function (err, res) {
//         res.should.have.status(200);
//         done();
//       });
//   });
//
//   it('should list a SINGLE queen on /queen/<id> GET', function (done) {
//     chai.request(server)
//       .get('/queens/11')
//       .end(function (err, res) {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });
//
// // describe('list', function () {
// //   var token;
// //   before(function (done) {
// //     chai.request(server)
// //       .post('/auth/login')
// //       .send({
// //         email: 'p@p.com',
// //         password: 'pppppppp'
// //       })
// //       .end(function (err, res) {
// //         if (err) throw err;
// //         token = { access_token: res.body.token };
// //         console.log(token);
// //         done();
// //       });
// //   });
// //
// //   it('should add a  list on /lists POST', function (done) {
// //     chai.request(server)
// //       .post('/lists')
// //       .send({
// //         'name': 'New Test List'
// //       })
// //       .query(token)
// //       .end(function (err, res) {
// //         if (err) throw err;
// //         res.should.have.status(200);
// //         done();
// //       });
// //   });
// //
// //   it('should update a SINGLE list on /list/<id> PUT');
// //   it('should delete a SINGLE queen on /list/<id> DELETE');
// //
// // });
//
// describe('user', function () {
//   var token;
//   before(function (done) {
//     chai.request(server)
//       .post('/auth/login')
//       .send({
//         email: 'p@p.com',
//         password: 'pppppppp'
//       })
//       .end(function (err, res) {
//         if (err) throw err;
//         token = { access_token: res.body.token };
//         console.log(token);
//         done();
//       });
//   });
//
//   it('should update the userinfo', function (done) {
//     chai.request(server)
//       .put('/users/1')
//       .send({
//         name: 'SuccessfulUser',
//         bio: 'big success',
//         fave: 'Chad Michaels'
//       })
//       .query(token)
//       .end(function (err, res) {
//         if (err) throw err;
//         res.should.have.status(200);
//         done();
//       });
//   });
// });
