/* global before */
/* global describe */
/* global it */

"use strict";

const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");
const db = require("../models");

before((done) => {
  db.sequelize.sync({ force: true }).then(() => {
    done();
  });
});

describe("Auth Controller", () => {
  describe("GET /auth/signup", () => {
    it("should return a 200 response", (done) => {
      request(app).get("/auth/signup").expect(200, done);
    });
  });

  describe("POST /auth/signup", () => {
    it("should redirect to / on success", (done) => {
      request(app).post("/auth/signup")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          email: "new@new.co",
          name: "Brian",
          password: "password"
        })
        .expect("Location", "/")
        .expect(302, done);
    });

    it("should redirect to /auth/signup on failure", (done) => {
      request(app).post("/auth/signup")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          email: "new",
          name: "Brian",
          password: "p"
        })
        .expect("Location", "/auth/signup")
        .expect(302, done);
    });
  });

  describe("GET /auth/login", () => {
    it("should return a 200 response", (done) => {
      request(app).get("/auth/login")
        .expect(200, done);
    });
  });

  describe("POST /auth/login", () => {
    it("should redirect to / on success", (done) => {
      request(app).post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          email: "new@new.co",
          password: "password"
        })
        .expect("Location", "/")
        .expect(302, done);
    });

    it("should redirect to /auth/login on failure", (done) => {
      request(app).post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          email: "new@new.co",
          password: "p"
        })
        .expect("Location", "/auth/login")
        .expect(302, done);
    });
  });

  describe("GET /auth/logout", () => {
    it("should redirect to /", (done) => {
      request(app).get("/auth/logout")
        .expect("Location", "/")
        .expect(302, done);
    });
  });
});
